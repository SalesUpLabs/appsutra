import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// Slugify function (same as frontend)
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Load schema and categories
const schema = JSON.parse(fs.readFileSync("schema/product.schema.json", "utf8"));
const categories = JSON.parse(fs.readFileSync("schema/categories.json", "utf8"));

// Initialize AJV with format validation
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

// Find all listing files
const files = await fg(["listings/**/*.md"], { dot: false });

if (files.length === 0) {
  console.log("ℹ No listing files found");
  process.exit(0);
}

const slugs = new Set();
const names = new Set();
let failed = false;
let validCount = 0;

console.log(`🔍 Validating ${files.length} listing(s)...\n`);

for (const file of files) {
  const basename = path.basename(file, '.md');
  const directoryName = path.dirname(file).split(/[/\\]/).pop();

  try {
    const raw = fs.readFileSync(file, "utf8");

    // Parse YAML front-matter
    const { data, content } = matter(raw);

    if (!data || Object.keys(data).length === 0) {
      console.error(`❌ ${file}: No YAML front-matter found`);
      failed = true;
      continue;
    }

    // Validate against JSON Schema
    const isValid = validate(data);
    if (!isValid) {
      console.error(`❌ ${file}: Schema validation failed`);
      validate.errors.forEach(error => {
        console.error(`   - ${error.instancePath || 'root'}: ${error.message}`);
      });
      failed = true;
      continue;
    }

    // Generate slug from name
    const generatedSlug = slugify(data.name);

    // Generate categorySlug from category
    const generatedCategorySlug = slugify(data.category);

    // Check filename matches generated slug
    if (generatedSlug !== basename) {
      console.error(`❌ ${file}: Filename "${basename}" doesn't match generated slug "${generatedSlug}" from name "${data.name}"`);
      failed = true;
      continue;
    }

    // Check directory matches generated categorySlug
    if (generatedCategorySlug !== directoryName) {
      console.error(`❌ ${file}: Directory "${directoryName}" doesn't match generated categorySlug "${generatedCategorySlug}" from category "${data.category}"`);
      failed = true;
      continue;
    }

    // Check category is valid (checking against display names or slugs)
    const categorySlugValid = categories.includes(generatedCategorySlug);
    const categoryNameValid = categories.includes(data.category);

    if (!categorySlugValid && !categoryNameValid) {
      console.error(`❌ ${file}: Invalid category "${data.category}". Valid categories: ${categories.join(', ')}`);
      failed = true;
      continue;
    }

    // Check for duplicate slugs
    if (slugs.has(generatedSlug)) {
      console.error(`❌ ${file}: Duplicate slug "${generatedSlug}" (generated from name "${data.name}")`);
      failed = true;
      continue;
    }
    slugs.add(generatedSlug);

    // Check for duplicate names (case insensitive)
    const lowerName = data.name.toLowerCase();
    if (names.has(lowerName)) {
      console.error(`❌ ${file}: Duplicate name "${data.name}" (case insensitive)`);
      failed = true;
      continue;
    }
    names.add(lowerName);

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.updated_at)) {
      console.error(`❌ ${file}: Invalid date format "${data.updated_at}". Use YYYY-MM-DD`);
      failed = true;
      continue;
    }

    // Check date is not in the future
    const updateDate = new Date(data.updated_at);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today

    if (updateDate > today) {
      console.error(`❌ ${file}: Updated date "${data.updated_at}" cannot be in the future`);
      failed = true;
      continue;
    }

    console.log(`✅ ${file}: Valid`);
    validCount++;

  } catch (error) {
    console.error(`❌ ${file}: Error reading/parsing file - ${error.message}`);
    failed = true;
  }
}

console.log(`\n📊 Validation Summary:`);
console.log(`   Valid: ${validCount}`);
console.log(`   Total: ${files.length}`);
console.log(`   Failed: ${files.length - validCount}`);

if (failed) {
  console.log(`\n❌ Validation failed`);
  process.exit(1);
} else {
  console.log(`\n✅ All listings are valid!`);
}