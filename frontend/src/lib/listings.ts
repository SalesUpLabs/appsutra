import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Listing, Category } from './types'
import { extractExcerpt, getCategoryDisplayName } from './utils'

// Path to the listings directory (relative to the project root)
const LISTINGS_DIR = path.join(process.cwd(), '..', 'listings')
const CATEGORIES_FILE = path.join(process.cwd(), '..', 'schema', 'categories.json')

export async function getAllListings(): Promise<Listing[]> {
  if (!fs.existsSync(LISTINGS_DIR)) {
    console.warn('Listings directory not found:', LISTINGS_DIR)
    return []
  }

  const listings: Listing[] = []
  const categories = fs.readdirSync(LISTINGS_DIR, { withFileTypes: true })

  for (const categoryDir of categories) {
    if (!categoryDir.isDirectory()) continue

    const categoryPath = path.join(LISTINGS_DIR, categoryDir.name)
    const files = fs.readdirSync(categoryPath)

    for (const file of files) {
      if (!file.endsWith('.md')) continue

      const filePath = path.join(categoryPath, file)
      const slug = path.basename(file, '.md')

      try {
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)

        // Validate required fields
        if (!data.name || !data.slug || !data.category) {
          console.warn(`Skipping invalid listing: ${filePath}`)
          continue
        }

        const listing: Listing = {
          // YAML front-matter
          name: data.name,
          slug: data.slug,
          category: data.category,
          website: data.website,
          logo: data.logo || null,
          pricing: data.pricing,
          locations: data.locations || [],
          use_cases: data.use_cases || [],
          keywords: data.keywords || [],
          trial: data.trial || false,
          integrations: data.integrations || [],
          contact_email: data.contact_email || null,
          listing_owner_github: data.listing_owner_github || null,
          verified: data.verified || false,
          updated_at: data.updated_at,

          // Parsed content
          content,
          excerpt: extractExcerpt(content),

          // Computed fields
          filePath: path.relative(process.cwd(), filePath),
          lastModified: fs.statSync(filePath).mtime,
        }

        listings.push(listing)
      } catch (error) {
        console.error(`Error parsing listing ${filePath}:`, error)
      }
    }
  }

  // Sort by verified status first, then by name
  return listings.sort((a, b) => {
    if (a.verified !== b.verified) {
      return b.verified ? 1 : -1
    }
    return a.name.localeCompare(b.name)
  })
}

export async function getListingBySlug(
  category: string,
  slug: string
): Promise<Listing | null> {
  const filePath = path.join(LISTINGS_DIR, category, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    const listing: Listing = {
      // YAML front-matter
      name: data.name,
      slug: data.slug,
      category: data.category,
      website: data.website,
      logo: data.logo || null,
      pricing: data.pricing,
      locations: data.locations || [],
      use_cases: data.use_cases || [],
      keywords: data.keywords || [],
      trial: data.trial || false,
      integrations: data.integrations || [],
      contact_email: data.contact_email || null,
      listing_owner_github: data.listing_owner_github || null,
      verified: data.verified || false,
      updated_at: data.updated_at,

      // Parsed content
      content,
      excerpt: extractExcerpt(content),

      // Computed fields
      filePath: path.relative(process.cwd(), filePath),
      lastModified: fs.statSync(filePath).mtime,
    }

    return listing
  } catch (error) {
    console.error(`Error parsing listing ${filePath}:`, error)
    return null
  }
}

export async function getListingsByCategory(category: string): Promise<Listing[]> {
  const listings = await getAllListings()
  return listings.filter(listing => listing.category === category)
}

export async function getCategories(): Promise<Category[]> {
  const listings = await getAllListings()

  // Get category names from schema file
  let categoryNames: string[] = []
  if (fs.existsSync(CATEGORIES_FILE)) {
    try {
      const categoriesData = fs.readFileSync(CATEGORIES_FILE, 'utf8')
      categoryNames = JSON.parse(categoriesData)
    } catch (error) {
      console.error('Error reading categories file:', error)
    }
  }

  // Count listings per category
  const categoryCounts: { [key: string]: number } = {}
  listings.forEach(listing => {
    categoryCounts[listing.category] = (categoryCounts[listing.category] || 0) + 1
  })

  // Create category objects
  const categories: Category[] = categoryNames.map(slug => ({
    slug,
    name: getCategoryDisplayName(slug),
    count: categoryCounts[slug] || 0,
  }))

  // Sort by count descending
  return categories.sort((a, b) => b.count - a.count)
}

export async function getFeaturedListings(limit: number = 6): Promise<Listing[]> {
  const listings = await getAllListings()

  // Prioritize verified listings, then by update date
  const featured = listings
    .filter(listing => listing.verified || listing.trial)
    .sort((a, b) => {
      if (a.verified !== b.verified) {
        return b.verified ? 1 : -1
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })

  return featured.slice(0, limit)
}

export async function getRelatedListings(
  currentListing: Listing,
  limit: number = 4
): Promise<Listing[]> {
  const listings = await getAllListings()

  // Filter out the current listing
  const others = listings.filter(listing => listing.slug !== currentListing.slug)

  // Score based on category match, use cases overlap, and keywords overlap
  const scored = others.map(listing => {
    let score = 0

    // Same category gets highest score
    if (listing.category === currentListing.category) {
      score += 10
    }

    // Shared use cases
    const sharedUseCases = listing.use_cases?.filter(useCase =>
      currentListing.use_cases?.includes(useCase)
    ) || []
    score += sharedUseCases.length * 3

    // Shared keywords
    const sharedKeywords = listing.keywords?.filter(keyword =>
      currentListing.keywords?.includes(keyword)
    ) || []
    score += sharedKeywords.length * 2

    // Verified listings get bonus
    if (listing.verified) {
      score += 1
    }

    return { listing, score }
  })

  // Sort by score and return top results
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.listing)
}