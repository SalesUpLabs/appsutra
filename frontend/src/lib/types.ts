import { Product } from '@/types/product'

export interface Category {
  slug: string
  name: string
  description?: string
  count: number
}

export interface SearchFilters {
  category?: string
  pricing?: 'free' | 'paid' | 'freemium'
  trial?: boolean
  locations?: string[]
  use_cases?: string[]
}

export interface SearchResult {
  listings: Product[]
  total: number
  categories: { [key: string]: number }
}