import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// Load schema and categories
const schema = JSON.parse(fs.readFileSync("schema/listing.schema.json", "utf8"));
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
  const expectedCategory = path.dirname(file).split('/').pop();

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

    // Check category matches directory
    if (data.category !== expectedCategory) {
      console.error(`❌ ${file}: Category "${data.category}" doesn't match directory "${expectedCategory}"`);
      failed = true;
      continue;
    }

    // Check category is valid
    if (!categories.includes(data.category)) {
      console.error(`❌ ${file}: Invalid category "${data.category}". Valid categories: ${categories.join(', ')}`);
      failed = true;
      continue;
    }

    // Check filename matches slug
    if (data.slug !== basename) {
      console.error(`❌ ${file}: Filename "${basename}" doesn't match slug "${data.slug}"`);
      failed = true;
      continue;
    }

    // Check for duplicate slugs
    if (slugs.has(data.slug)) {
      console.error(`❌ ${file}: Duplicate slug "${data.slug}"`);
      failed = true;
      continue;
    }
    slugs.add(data.slug);

    // Check for duplicate names (case insensitive)
    const lowerName = data.name.toLowerCase();
    if (names.has(lowerName)) {
      console.error(`❌ ${file}: Duplicate name "${data.name}" (case insensitive)`);
      failed = true;
      continue;
    }
    names.add(lowerName);

    // Check content exists
    if (!content || content.trim().length === 0) {
      console.error(`❌ ${file}: No content found after YAML front-matter`);
      failed = true;
      continue;
    }

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