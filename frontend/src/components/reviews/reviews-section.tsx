'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, Star, ExternalLink } from 'lucide-react'
import { ReviewCard } from './review-card'
import { Review } from '@/lib/types'
import { getProductReviews, getReviewUrl, extractRatingFromLabels, parseReviewBody } from '@/lib/github'

interface ReviewsSectionProps {
  productName: string
}

export function ReviewsSection({ productName }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [averageRating, setAverageRating] = useState<number | null>(null)

  useEffect(() => {
    async function loadReviews() {
      try {
        const productReviews = await getProductReviews(productName)
        setReviews(productReviews)

        // Calculate average rating
        const ratings = productReviews
          .map(review => {
            const labelRating = extractRatingFromLabels(review.labels)
            const bodyRating = parseReviewBody(review.body).rating
            return labelRating || bodyRating
          })
          .filter((rating): rating is number => rating !== null)

        if (ratings.length > 0) {
          const avg = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          setAverageRating(Math.round(avg * 10) / 10) // Round to 1 decimal
        }
      } catch (error) {
        console.error('Failed to load reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [productName])

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Reviews</h2>

          {reviews.length > 0 ? (
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {averageRating && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(averageRating)
                            ? 'text-yellow-400 fill-current'
                            : i < averageRating
                            ? 'text-yellow-400 fill-current opacity-50'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-lg font-medium text-gray-900">
                      {averageRating}
                    </span>
                  </>
                )}
              </div>
              <span className="text-gray-600">
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">
              No reviews yet. Be the first to share your experience!
            </p>
          )}

          {/* Write Review Button */}
          <Link
            href={getReviewUrl(productName)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Write a Review
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Help the community by sharing your experience with {productName}.
              Your review will help others make informed decisions.
            </p>
          </div>
        )}

        {/* View All Reviews Link */}
        {reviews.length > 6 && (
          <div className="text-center mt-8">
            <Link
              href={`https://github.com/salesuplabs/appsutra/issues?q=is%3Aissue+label%3Areview+"${encodeURIComponent(productName)}"+in%3Atitle`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              View All {reviews.length} Reviews
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Review Guidelines */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Review Guidelines</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Share your honest experience with specific features and use cases</li>
            <li>• Include context about your team size and industry</li>
            <li>• Be constructive and helpful to the community</li>
            <li>• Focus on the product, not personal attacks</li>
          </ul>
        </div>
      </div>
    </section>
  )
}