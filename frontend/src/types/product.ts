// Extended Product Types for Enhanced Product Detail Pages
// Based on the structure from t.js

export interface Integration {
  icon: string
  title: string
}

export interface PricingPlan {
  icon: string
  title: string
  pricing: string // e.g., "Rs.1,200/mo" or "Custom Pricing"
  desc: string
  link: string
}

export interface PricingDetails {
  desc: string
  plans: PricingPlan[]
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
