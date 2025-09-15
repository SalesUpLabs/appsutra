import { Review } from './types'

const GITHUB_API_BASE = 'https://api.github.com'
const REPO_OWNER = 'salesuplabs'
const REPO_NAME = 'appsutra'

// GitHub API rate limits are generous for public data, but we should cache responses
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(key)
  const now = Date.now()

  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data
  }

  const data = await fetcher()
  cache.set(key, { data, timestamp: now })
  return data
}

export async function getProductReviews(productName: string): Promise<Review[]> {
  const cacheKey = `reviews-${productName}`

  return cachedFetch(cacheKey, async () => {
    try {
      // Search for issues with the review label and product name
      const searchQuery = `repo:${REPO_OWNER}/${REPO_NAME} is:issue label:review "${productName}" in:title`
      const url = `${GITHUB_API_BASE}/search/issues?q=${encodeURIComponent(searchQuery)}&sort=created&order=desc&per_page=50`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data = await response.json()

      return data.items.map((issue: any): Review => ({
        id: issue.id,
        title: issue.title,
        body: issue.body || '',
        user: {
          login: issue.user.login,
          avatar_url: issue.user.avatar_url,
        },
        created_at: issue.created_at,
        labels: issue.labels.map((label: any) => ({
          name: label.name,
          color: label.color,
        })),
        html_url: issue.html_url,
      }))
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
      return []
    }
  })
}

export async function getAllReviews(): Promise<Review[]> {
  const cacheKey = 'all-reviews'

  return cachedFetch(cacheKey, async () => {
    try {
      // Get all issues with the review label
      const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/issues?labels=review&state=open&sort=created&direction=desc&per_page=100`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const issues = await response.json()

      return issues.map((issue: any): Review => ({
        id: issue.id,
        title: issue.title,
        body: issue.body || '',
        user: {
          login: issue.user.login,
          avatar_url: issue.user.avatar_url,
        },
        created_at: issue.created_at,
        labels: issue.labels.map((label: any) => ({
          name: label.name,
          color: label.color,
        })),
        html_url: issue.html_url,
      }))
    } catch (error) {
      console.error('Failed to fetch all reviews:', error)
      return []
    }
  })
}

export function extractRatingFromLabels(labels: Review['labels']): number | null {
  // Look for rating labels like "rating-5", "5-stars", etc.
  const ratingLabel = labels.find(label =>
    label.name.match(/^(rating-|stars-|⭐)\d$/i) ||
    label.name.match(/^\d[-\s]?(star|rating)/i)
  )

  if (!ratingLabel) return null

  const match = ratingLabel.name.match(/\d/)
  return match ? parseInt(match[0]) : null
}

export function parseReviewBody(body: string): {
  pros?: string[]
  cons?: string[]
  context?: string
  rating?: number
} {
  const sections: any = {}

  // Try to extract structured information from the review body
  // This assumes the GitHub issue template is used

  // Extract pros
  const prosMatch = body.match(/(?:pros|what.*like|positive)[\s\S]*?(?=\n\n|\ncons|\n##|\ncontext|$)/i)
  if (prosMatch) {
    const prosText = prosMatch[0].replace(/^.*?:\s*/i, '').trim()
    sections.pros = prosText.split(/\n[-*•]/).map(item => item.trim()).filter(Boolean)
  }

  // Extract cons
  const consMatch = body.match(/(?:cons|what.*improve|negative|issues)[\s\S]*?(?=\n\n|\n##|\ncontext|$)/i)
  if (consMatch) {
    const consText = consMatch[0].replace(/^.*?:\s*/i, '').trim()
    sections.cons = consText.split(/\n[-*•]/).map(item => item.trim()).filter(Boolean)
  }

  // Extract context
  const contextMatch = body.match(/(?:context|background|team|company)[\s\S]*?(?=\n\n|\n##|$)/i)
  if (contextMatch) {
    sections.context = contextMatch[0].replace(/^.*?:\s*/i, '').trim()
  }

  // Try to extract rating from text
  const ratingMatch = body.match(/(?:rating|score|stars?).*?(\d)(?:\/5|\s*star)/i)
  if (ratingMatch) {
    sections.rating = parseInt(ratingMatch[1])
  }

  return sections
}

export function getReviewUrl(productName: string): string {
  const issueTitle = `Review: ${productName}`
  const templateParams = new URLSearchParams({
    template: 'review.yml',
    title: issueTitle,
    product: productName,
  })

  return `https://github.com/${REPO_OWNER}/${REPO_NAME}/issues/new?${templateParams.toString()}`
}

export async function getRecentActivity(): Promise<{
  totalReviews: number
  recentReviews: Review[]
  topReviewedProducts: string[]
}> {
  const cacheKey = 'recent-activity'

  return cachedFetch(cacheKey, async () => {
    const allReviews = await getAllReviews()

    // Get recent reviews (last 10)
    const recentReviews = allReviews.slice(0, 10)

    // Extract product names and count occurrences
    const productCounts: { [key: string]: number } = {}
    allReviews.forEach(review => {
      const match = review.title.match(/Review:\s*(.+)/i)
      if (match) {
        const productName = match[1].trim()
        productCounts[productName] = (productCounts[productName] || 0) + 1
      }
    })

    // Get top reviewed products
    const topReviewedProducts = Object.entries(productCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([product]) => product)

    return {
      totalReviews: allReviews.length,
      recentReviews,
      topReviewedProducts,
    }
  })
}