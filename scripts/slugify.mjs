import slugify from "slugify";

/**
 * Generate a URL-friendly slug from a product name
 * @param {string} name - Product name
 * @returns {string} - URL-friendly slug
 */
export function generateSlug(name) {
  return slugify(name, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
}

/**
 * Validate if a slug meets our requirements
 * @param {string} slug - Slug to validate
 * @returns {boolean} - Whether slug is valid
 */
export function isValidSlug(slug) {
  // Check pattern: lowercase letters, numbers, and hyphens only
  const pattern = /^[a-z0-9-]+$/;

  if (!pattern.test(slug)) {
    return false;
  }

  // Check length constraints
  if (slug.length < 2 || slug.length > 50) {
    return false;
  }

  // Can't start or end with hyphen
  if (slug.startsWith('-') || slug.endsWith('-')) {
    return false;
  }

  // Can't have consecutive hyphens
  if (slug.includes('--')) {
    return false;
  }

  return true;
}

// CLI functionality for direct usage
if (process.argv[2]) {
  const input = process.argv[2];
  const slug = generateSlug(input);

  console.log(`Input: ${input}`);
  console.log(`Slug: ${slug}`);
  console.log(`Valid: ${isValidSlug(slug)}`);
}