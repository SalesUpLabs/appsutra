import Fuse from 'fuse.js'
import { Listing, SearchFilters, SearchResult } from './types'
import { getAllListings } from './listings'

// Fuse.js configuration for fuzzy search
const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.3 },
    { name: 'keywords', weight: 0.25 },
    { name: 'use_cases', weight: 0.2 },
    { name: 'category', weight: 0.15 },
    { name: 'excerpt', weight: 0.1 },
  ],
  threshold: 0.4, // Lower = more strict matching
  minMatchCharLength: 2,
  includeScore: true,
}

export async function searchListings(
  query: string = '',
  filters: SearchFilters = {},
  limit?: number
): Promise<SearchResult> {
  const allListings = await getAllListings()

  // Apply filters first
  let filteredListings = allListings.filter(listing => {
    // Category filter
    if (filters.category && listing.category !== filters.category) {
      return false
    }

    // Trial filter
    if (filters.trial !== undefined && listing.trial !== filters.trial) {
      return false
    }

    // Verified filter
    if (filters.verified !== undefined && listing.verified !== filters.verified) {
      return false
    }

    // Location filter
    if (filters.locations && filters.locations.length > 0) {
      const hasLocation = filters.locations.some(location =>
        listing.locations.some(listingLocation =>
          listingLocation.toLowerCase().includes(location.toLowerCase())
        )
      )
      if (!hasLocation) return false
    }

    // Use cases filter
    if (filters.use_cases && filters.use_cases.length > 0) {
      if (!listing.use_cases) return false
      const hasUseCase = filters.use_cases.some(useCase =>
        listing.use_cases!.some(listingUseCase =>
          listingUseCase.toLowerCase().includes(useCase.toLowerCase())
        )
      )
      if (!hasUseCase) return false
    }

    // Pricing filter
    if (filters.pricing) {
      const pricingLower = listing.pricing.toLowerCase()
      switch (filters.pricing) {
        case 'free':
          if (!pricingLower.includes('free')) return false
          break
        case 'paid':
          if (pricingLower.includes('free') && !pricingLower.includes('paid')) return false
          break
        case 'freemium':
          if (!pricingLower.includes('free') || !pricingLower.includes('paid')) return false
          break
      }
    }

    return true
  })

  // Apply text search if query provided
  if (query.trim()) {
    const fuse = new Fuse(filteredListings, fuseOptions)
    const searchResults = fuse.search(query.trim())
    filteredListings = searchResults.map(result => result.item)
  }

  // Apply limit if specified
  if (limit && limit > 0) {
    filteredListings = filteredListings.slice(0, limit)
  }

  // Generate category counts for faceted search
  const categoryCounts: { [key: string]: number } = {}
  allListings.forEach(listing => {
    if (listing.name.toLowerCase().includes(query.toLowerCase()) ||
        listing.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase())) ||
        listing.use_cases?.some(u => u.toLowerCase().includes(query.toLowerCase()))) {
      categoryCounts[listing.category] = (categoryCounts[listing.category] || 0) + 1
    }
  })

  return {
    listings: filteredListings,
    total: filteredListings.length,
    categories: categoryCounts,
  }
}

export async function getSearchSuggestions(query: string, limit: number = 5): Promise<string[]> {
  if (!query.trim() || query.length < 2) return []

  const allListings = await getAllListings()
  const suggestions = new Set<string>()

  // Collect suggestions from names, keywords, and use cases
  allListings.forEach(listing => {
    // Product names
    if (listing.name.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(listing.name)
    }

    // Keywords
    listing.keywords?.forEach(keyword => {
      if (keyword.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(keyword)
      }
    })

    // Use cases
    listing.use_cases?.forEach(useCase => {
      if (useCase.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(useCase)
      }
    })
  })

  return Array.from(suggestions).slice(0, limit)
}

export function getPopularSearchTerms(): string[] {
  return [
    'CRM',
    'HR Management',
    'Project Management',
    'Email Marketing',
    'Analytics',
    'Customer Support',
    'Accounting',
    'Video Conferencing',
    'Payment Gateway',
    'Inventory Management',
  ]
}