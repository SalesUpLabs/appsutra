import Link from 'next/link'
import { CheckCircle, ExternalLink, Star, MapPin } from 'lucide-react'
import { Listing } from '@/lib/types'
import { formatPricing, isIndianCompany, formatListingUrl, formatDate } from '@/lib/utils'

interface ListingCardProps {
  listing: Listing
  showCategory?: boolean
}

export function ListingCard({ listing, showCategory = false }: ListingCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              <Link href={formatListingUrl(listing.category, listing.slug)}>
                {listing.name}
              </Link>
            </h3>
            {listing.verified && (
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            )}
          </div>

          {showCategory && (
            <span className="text-sm text-gray-500 capitalize">
              {listing.category}
            </span>
          )}
        </div>

        <Link
          href={listing.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {listing.excerpt}
      </p>

      {/* Pricing */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-900">
          {formatPricing(listing.pricing)}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {listing.trial && (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
            Free Trial
          </span>
        )}

        {isIndianCompany(listing.locations) && (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
            🇮🇳 Indian
          </span>
        )}

        {listing.use_cases && listing.use_cases.slice(0, 2).map(useCase => (
          <span
            key={useCase}
            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
          >
            {useCase}
          </span>
        ))}
      </div>

      {/* Locations */}
      {listing.locations.length > 0 && (
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{listing.locations.slice(0, 2).join(', ')}</span>
          {listing.locations.length > 2 && (
            <span className="ml-1">+{listing.locations.length - 2} more</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Updated {formatDate(listing.updated_at)}</span>

        <Link
          href={formatListingUrl(listing.category, listing.slug)}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}