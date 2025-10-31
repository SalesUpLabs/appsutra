#!/usr/bin/env node
/**
 * Build Data Package Script
 *
 * Compiles all Markdown listings into a single JSON file for distribution as @appsutra/data package.
 * This script:
 * 1. Discovers all listing files in listings/ directory
 * 2. Parses YAML front-matter and markdown content
 * 3. Validates against product.schema.json
 * 4. Auto-generates slug and categorySlug fields
 * 5. Outputs to dist/listings.json
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import glob from 'fast-glob';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import slugify from 'slugify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const LISTINGS_DIR = path.join(ROOT_DIR, 'listings');
const SCHEMA_PATH = path.join(ROOT_DIR, 'schema', 'product.schema.json');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_PATH = path.join(DIST_DIR, 'listings.json');

// Initialize Ajv validator
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

interface Listing {
  slug: string;
  categorySlug: string;
  [key: string]: any;
}

/**
 * Generate a URL-friendly slug from a string
 */
function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
}

/**
 * Parse a listing file and extract front-matter + content
 */
async function parseListing(filePath: string): Promise<Listing | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);

    // Auto-generate slug from name
    if (!data.name) {
      console.error(`❌ Missing 'name' field in ${filePath}`);
      return null;
    }

    const slug = generateSlug(data.name);

    // Auto-generate categorySlug from category
    if (!data.category) {
      console.error(`❌ Missing 'category' field in ${filePath}`);
      return null;
    }

    const categorySlug = generateSlug(data.category);

    // Extract filename and expected slug
    const filename = path.basename(filePath, '.md');
    const expectedSlug = slug;

    if (filename !== expectedSlug) {
      console.warn(`⚠️  Filename mismatch in ${filePath}: expected ${expectedSlug}.md, got ${filename}.md`);
    }

    // Return listing with auto-generated fields
    return {
      ...data,
      slug,
      categorySlug,
      body: content.trim(),
      _filePath: path.relative(ROOT_DIR, filePath)
    };
  } catch (error) {
    console.error(`❌ Error parsing ${filePath}:`, error);
    return null;
  }
}

/**
 * Validate listing against JSON Schema
 */
function validateListing(listing: Listing, validator: any, filePath: string): boolean {
  // Create a copy without our added fields for validation
  const { slug, categorySlug, body, _filePath, ...dataToValidate } = listing;

  const valid = validator(dataToValidate);

  if (!valid) {
    console.error(`\n❌ Schema validation failed for ${filePath}:`);
    if (validator.errors) {
      validator.errors.forEach((err: any) => {
        console.error(`  - ${err.instancePath} ${err.message}`);
        if (err.params) {
          console.error(`    ${JSON.stringify(err.params)}`);
        }
      });
    }
    return false;
  }

  return true;
}

/**
 * Main build function
 */
async function buildData(): Promise<void> {
  console.log('🚀 Building AppSutra data package...\n');

  // Load and compile schema
  console.log('📋 Loading schema...');
  const schemaContent = await fs.readFile(SCHEMA_PATH, 'utf8');
  const schema = JSON.parse(schemaContent);
  const validate = ajv.compile(schema);
  console.log('✅ Schema loaded\n');

  // Find all listing files
  console.log('🔍 Discovering listing files...');
  const files = await glob('listings/**/*.md', {
    cwd: ROOT_DIR,
    absolute: true
  });
  console.log(`✅ Found ${files.length} listing files\n`);

  // Parse all listings
  console.log('📝 Parsing listings...');
  const listings: Listing[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const listing = await parseListing(file);
    if (listing) {
      // Validate against schema
      if (validateListing(listing, validate, file)) {
        listings.push(listing);
        console.log(`  ✅ ${listing.name} (${listing.slug})`);
      } else {
        errors.push(file);
      }
    } else {
      errors.push(file);
    }
  }

  console.log(`\n✅ Successfully parsed ${listings.length} listings`);

  if (errors.length > 0) {
    console.error(`\n❌ ${errors.length} listings failed validation:`);
    errors.forEach(file => console.error(`  - ${path.relative(ROOT_DIR, file)}`));
    process.exitCode = 1;
  }

  // Create dist directory
  console.log('\n📦 Creating output directory...');
  await fs.mkdir(DIST_DIR, { recursive: true });

  // Write output
  console.log('💾 Writing listings.json...');
  await fs.writeFile(
    OUTPUT_PATH,
    JSON.stringify(listings, null, 2),
    'utf8'
  );

  // Generate summary stats
  const categories = new Set(listings.map(l => l.categorySlug));
  const stats = {
    total: listings.length,
    categories: categories.size,
    categoryBreakdown: Array.from(categories).reduce((acc, cat) => {
      acc[cat] = listings.filter(l => l.categorySlug === cat).length;
      return acc;
    }, {} as Record<string, number>)
  };

  console.log('\n📊 Build Statistics:');
  console.log(`  Total listings: ${stats.total}`);
  console.log(`  Categories: ${stats.categories}`);
  console.log('\n  Breakdown by category:');
  Object.entries(stats.categoryBreakdown)
    .sort(([, a], [, b]) => b - a)
    .forEach(([cat, count]) => {
      console.log(`    ${cat.padEnd(20)} ${count} listings`);
    });

  console.log(`\n✅ Build complete! Output: ${path.relative(ROOT_DIR, OUTPUT_PATH)}`);
  console.log(`📦 Package ready for publishing as @appsutra/data\n`);
}

// Run the build
buildData().catch(error => {
  console.error('\n❌ Build failed:', error);
  process.exit(1);
});
