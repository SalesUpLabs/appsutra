import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPricing(pricing: string): string {
  // Clean up pricing text and highlight Indian pricing
  return pricing
    .replace(/₹/g, '₹')
    .replace(/\bINR\b/g, '₹')
    .replace(/\bper month\b/gi, '/mo')
    .replace(/\bper user\b/gi, '/user')
}

export function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remove markdown formatting and extract first paragraph
  const plainText = content
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/^[-*+]\s+/gm, '') // Remove list markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  if (plainText.length <= maxLength) return plainText

  const truncated = plainText.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getCategoryDisplayName(slug: string): string {
  const categoryNames: { [key: string]: string } = {
    crm: 'CRM',
    hr: 'HR',
    marketing: 'Marketing',
    finance: 'Finance',
    support: 'Customer Support',
    analytics: 'Analytics',
    security: 'Security',
    devtools: 'Developer Tools',
    accounting: 'Accounting'
  }

  return categoryNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)
}

export function getTrialStatus(trial?: boolean): string {
  return trial ? 'Free Trial Available' : 'No Free Trial'
}

export function isIndianCompany(locations: string[]): boolean {
  return locations.some(location =>
    location.toLowerCase().includes('india') ||
    location.toLowerCase().includes('indian')
  )
}

export function formatListingUrl(category: string, slug: string): string {
  return `/${category}/${slug}`
}

export function formatGitHubUrl(path: string): string {
  return `https://github.com/salesuplabs/appsutra/blob/main/${path}`
}