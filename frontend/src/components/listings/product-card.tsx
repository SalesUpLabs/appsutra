import Link from 'next/link'
import { ExternalLink, MapPin } from 'lucide-react'
import { Product } from '@/types/product'
import { isIndianCompany } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  showCategory?: boolean
}

export function ProductCard({ product, showCategory = false }: ProductCardProps) {
  // Extract first paragraph from description as excerpt
  const excerpt = product.description.split('\n\n')[0].replace(/\*\*/g, '').slice(0, 150)

  // Format pricing display
  const formatPricing = () => {
    if (product.pricing.plans.length === 0) {
      return product.pricing.desc
    }
    const firstPlan = product.pricing.plans[0]
    if (firstPlan.pricing.isCustom || firstPlan.pricing.amount === null) {
      return 'Custom Pricing'
    }
    if (firstPlan.pricing.amount === 0) {
      return 'Free'
    }
    return `${firstPlan.pricing.currencySymbol}${firstPlan.pricing.amount}/${firstPlan.pricing.period}`
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              <Link href={`/${product.categorySlug}/${product.slug}`}>
                {product.name}
              </Link>
            </h3>
          </div>

          {showCategory && (
            <span className="text-sm text-gray-500 capitalize">
              {product.category}
            </span>
          )}

          {product.company && (
            <p className="text-xs text-gray-500 mt-1">{product.company}</p>
          )}
        </div>

        <Link
          href={product.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {excerpt}
      </p>

      {/* Pricing */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-900">
          {formatPricing()}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.trialPlan && (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
            Free Trial
          </span>
        )}

        {isIndianCompany(product.locations) && (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
            🇮🇳 Indian
          </span>
        )}

        {product.useCases && product.useCases.slice(0, 2).map(useCase => (
          <span
            key={useCase}
            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
          >
            {useCase}
          </span>
        ))}
      </div>

      {/* Locations */}
      {product.locations.length > 0 && (
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{product.locations.slice(0, 2).join(', ')}</span>
          {product.locations.length > 2 && (
            <span className="ml-1">+{product.locations.length - 2} more</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-end text-xs">
        <Link
          href={`/${product.categorySlug}/${product.slug}`}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}
