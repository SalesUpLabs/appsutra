export interface Listing {
  // YAML front-matter
  name: string
  slug: string
  category: string
  website: string
  logo?: string | null
  pricing: string
  locations: string[]
  use_cases?: string[]
  keywords?: string[]
  trial?: boolean
  integrations?: string[]
  contact_email?: string | null
  listing_owner_github?: string | null
  verified: boolean
  updated_at: string

  // Parsed content
  content: string
  excerpt?: string

  // Computed fields
  filePath: string
  lastModified?: Date
}

export interface Category {
  slug: string
  name: string
  description?: string
  count: number
}

export interface Review {
  id: number
  title: string
  body: string
  user: {
    login: string
    avatar_url: string
  }
  created_at: string
  labels: {
    name: string
    color: string
  }[]
  html_url: string
}

export interface SearchFilters {
  category?: string
  pricing?: 'free' | 'paid' | 'freemium'
  trial?: boolean
  verified?: boolean
  locations?: string[]
  use_cases?: string[]
}

export interface SearchResult {
  listings: Listing[]
  total: number
  categories: { [key: string]: number }
}