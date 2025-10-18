// Extended Product Types for Enhanced Product Detail Pages
// Based on the structure from t.js

export interface Integration {
  title: string
}

export interface PricingInfo {
  amount: number | null // null for custom pricing
  currency: string // e.g., "INR", "USD"
  currencySymbol: string // e.g., "₹", "$"
  period: string // e.g., "month", "year"
  perUnit?: string | null // e.g., "user", "employee", null for flat rate
  isCustom?: boolean // true for custom pricing
}

export interface PricingPlan {
  name: string
  pricing: PricingInfo
  description: string // supports **bold** markdown syntax
}

export interface PricingDetails {
  desc: string
  plans: PricingPlan[] // maximum 4 plans
}

export interface KeyFeature {
  title: string
  desc: string
}

export interface KeyFeatures {
  description: string
  features: KeyFeature[] //maximum 8 features
}

export interface BuyingGuideItem {
  question: string
  why: string
  answer: string
}

// Enhanced Product structure with all extended fields
export interface Product {
  icon: string
  name: string
  company: string
  freeplan: boolean
  freeplanpricing: string
  category: string
  categorySlug: string
  slug: string
  useCases: string[]
  keywords: string[]
  integration: Integration[]
  description: string // markdown content
  locations: string[]
  website: string
  keyFeatures: KeyFeatures
  buyingGuide: BuyingGuideItem[]
  pricing: PricingDetails
}
