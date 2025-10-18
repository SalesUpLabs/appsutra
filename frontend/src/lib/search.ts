import Fuse from 'fuse.js'
import { SearchFilters, SearchResult } from './types'
import { Product } from '@/types/product'
import { getAllProducts } from './listings'

// Fuse.js configuration for fuzzy search
const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.3 },
    { name: 'keywords', weight: 0.25 },
    { name: 'useCases', weight: 0.2 },
    { name: 'category', weight: 0.15 },
    { name: 'description', weight: 0.1 },
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
  const allProducts = await getAllProducts()

  // Apply filters first
  let filteredProducts = allProducts.filter(product => {
    // Category filter (check against categorySlug)
    if (filters.category && product.categorySlug !== filters.category) {
      return false
    }

    // Trial filter
    if (filters.trial !== undefined && product.trialPlan !== filters.trial) {
      return false
    }

    // Location filter
    if (filters.locations && filters.locations.length > 0) {
      const hasLocation = filters.locations.some(location =>
        product.locations.some(productLocation =>
          productLocation.toLowerCase().includes(location.toLowerCase())
        )
      )
      if (!hasLocation) return false
    }

    // Use cases filter
    if (filters.use_cases && filters.use_cases.length > 0) {
      if (!product.useCases) return false
      const hasUseCase = filters.use_cases.some(useCase =>
        product.useCases!.some(productUseCase =>
          productUseCase.toLowerCase().includes(useCase.toLowerCase())
        )
      )
      if (!hasUseCase) return false
    }

    // Pricing filter (check if product has free plan)
    if (filters.pricing) {
      const hasFreePlan = product.pricing.plans.some(plan => plan.pricing.amount === 0)
      const hasPaidPlan = product.pricing.plans.some(plan => plan.pricing.amount !== null && plan.pricing.amount > 0)

      switch (filters.pricing) {
        case 'free':
          if (!hasFreePlan) return false
          break
        case 'paid':
          if (!hasPaidPlan) return false
          break
        case 'freemium':
          if (!hasFreePlan || !hasPaidPlan) return false
          break
      }
    }

    return true
  })

  // Apply text search if query provided
  if (query.trim()) {
    const fuse = new Fuse(filteredProducts, fuseOptions)
    const searchResults = fuse.search(query.trim())
    filteredProducts = searchResults.map(result => result.item)
  }

  // Apply limit if specified
  if (limit && limit > 0) {
    filteredProducts = filteredProducts.slice(0, limit)
  }

  // Generate category counts for faceted search
  const categoryCounts: { [key: string]: number } = {}
  allProducts.forEach(product => {
    if (product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase())) ||
        product.useCases?.some(u => u.toLowerCase().includes(query.toLowerCase()))) {
      categoryCounts[product.categorySlug] = (categoryCounts[product.categorySlug] || 0) + 1
    }
  })

  return {
    listings: filteredProducts,
    total: filteredProducts.length,
    categories: categoryCounts,
  }
}

export async function getSearchSuggestions(query: string, limit: number = 5): Promise<string[]> {
  if (!query.trim() || query.length < 2) return []

  const allProducts = await getAllProducts()
  const suggestions = new Set<string>()

  // Collect suggestions from names, keywords, and use cases
  allProducts.forEach(product => {
    // Product names
    if (product.name.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(product.name)
    }

    // Keywords
    product.keywords?.forEach(keyword => {
      if (keyword.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(keyword)
      }
    })

    // Use cases
    product.useCases?.forEach(useCase => {
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