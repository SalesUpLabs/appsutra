import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
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

export function isIndianCompany(locations: string[]): boolean {
  return locations.some(location =>
    location.toLowerCase().includes('india') ||
    location.toLowerCase().includes('indian')
  )
}