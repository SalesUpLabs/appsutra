import Link from 'next/link'
import { ExternalLink, Star } from 'lucide-react'
import { Review } from '@/lib/types'
import { extractRatingFromLabels, parseReviewBody } from '@/lib/github'
import { formatDate } from '@/lib/utils'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const rating = extractRatingFromLabels(review.labels)
  const parsed = parseReviewBody(review.body)
  const displayRating = rating || parsed.rating

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={review.user.avatar_url}
            alt={review.user.login}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">@{review.user.login}</p>
            <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
          </div>
        </div>

        <Link
          href={review.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* Rating */}
      {displayRating && (
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < displayRating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {displayRating}/5 stars
          </span>
        </div>
      )}

      {/* Structured Content */}
      {parsed.pros && parsed.pros.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">👍 What they liked:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {parsed.pros.slice(0, 3).map((pro, i) => (
              <li key={i} className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {parsed.cons && parsed.cons.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-red-800 mb-2">👎 Areas for improvement:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {parsed.cons.slice(0, 3).map((con, i) => (
              <li key={i} className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Context */}
      {parsed.context && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">📊 Context:</h4>
          <p className="text-sm text-gray-700 line-clamp-2">{parsed.context}</p>
        </div>
      )}

      {/* Fallback to body if no structured data */}
      {!parsed.pros && !parsed.cons && !parsed.context && review.body && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 line-clamp-3">{review.body}</p>
        </div>
      )}

      {/* Labels */}
      {review.labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {review.labels
            .filter(label => !label.name.startsWith('rating-') && label.name !== 'review')
            .slice(0, 3)
            .map(label => (
              <span
                key={label.name}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                style={{
                  backgroundColor: `#${label.color}20`,
                  color: `#${label.color}`,
                }}
              >
                {label.name}
              </span>
            ))}
        </div>
      )}

      {/* Read More Link */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link
          href={review.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Read full review on GitHub →
        </Link>
      </div>
    </div>
  )
}