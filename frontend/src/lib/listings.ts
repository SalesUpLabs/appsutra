import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Category } from './types'
import { Product } from '@/types/product'
import { getCategoryDisplayName, slugify } from './utils'

// Path to the listings directory (root level, outside frontend)
const LISTINGS_DIR = path.join(process.cwd(), '..', 'listings')
const CATEGORIES_FILE = path.join(process.cwd(), '..', 'schema', 'categories.json')

export async function getCategories(): Promise<Category[]> {
  const products = await getAllProducts()

  // Get category names (slugs) from schema file
  let categorySlugs: string[] = []
  if (fs.existsSync(CATEGORIES_FILE)) {
    try {
      const categoriesData = fs.readFileSync(CATEGORIES_FILE, 'utf8')
      categorySlugs = JSON.parse(categoriesData)
    } catch (error) {
      console.error('Error reading categories file:', error)
    }
  }

  // Count products per category
  const categoryCounts: { [key: string]: number } = {}
  products.forEach(product => {
    categoryCounts[product.categorySlug] = (categoryCounts[product.categorySlug] || 0) + 1
  })

  // Create category objects
  const categories: Category[] = categorySlugs.map(slug => ({
    slug,
    name: getCategoryDisplayName(slug),
    count: categoryCounts[slug] || 0,
  }))

  // Sort by count descending
  return categories.sort((a, b) => b.count - a.count)
}

// ===== Product Functions (Markdown-based) =====

/**
 * Get all products from markdown files (organized in category folders)
 */
export async function getAllProducts(): Promise<Product[]> {
  if (!fs.existsSync(LISTINGS_DIR)) {
    console.warn('Listings directory not found:', LISTINGS_DIR)
    return []
  }

  const products: Product[] = []
  const categories = fs.readdirSync(LISTINGS_DIR, { withFileTypes: true })

  for (const categoryDir of categories) {
    // Only process directories
    if (!categoryDir.isDirectory()) continue

    const categoryPath = path.join(LISTINGS_DIR, categoryDir.name)
    const files = fs.readdirSync(categoryPath)

    for (const file of files) {
      // Only process markdown files
      if (!file.endsWith('.md')) continue

      const filePath = path.join(categoryPath, file)

      try {
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContent)

        // Validate required fields
        if (!data.name || !data.category) {
          console.warn(`Skipping invalid product: ${filePath} (missing name or category)`)
          continue
        }

        // Auto-generate slugs from name and category fields (not from folder/filename)
        const slug = slugify(data.name)
        const categorySlug = slugify(data.category)

        // Map YAML front-matter to Product type
        const product: Product = {
          icon: data.icon,
          name: data.name,
          company: data.company,
          trialPlan: data.trialPlan || false,
          trialPlanPricing: data.trialPlanPricing || '',
          category: data.category,
          categorySlug: categorySlug, // Auto-generated from category field
          slug: slug, // Auto-generated from name field
          useCases: data.useCases || [],
          keywords: data.keywords || [],
          integration: data.integration || [],
          description: data.description || '',
          locations: data.locations || [],
          website: data.website,
          keyFeatures: data.keyFeatures || { description: '', features: [] },
          buyingGuide: data.buyingGuide || [],
          pricing: data.pricing || { desc: '', plans: [] },
        }

        products.push(product)
      } catch (error) {
        console.error(`Error parsing product ${filePath}:`, error)
      }
    }
  }

  return products
}

/**
 * Get a single product by category slug and product slug
 * Searches through all products to find matching category and product
 */
export async function getProductBySlug(
  categorySlug: string,
  slug: string
): Promise<Product | null> {
  const products = await getAllProducts()

  // Find product matching both category slug and product slug
  const product = products.find(
    p => p.categorySlug === categorySlug && p.slug === slug
  )

  return product || null
}

/**
 * Get products by category slug
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getAllProducts()
  return products.filter(product => product.categorySlug === categorySlug)
}