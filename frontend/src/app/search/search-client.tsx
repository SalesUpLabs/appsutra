'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import Fuse from 'fuse.js'
import { ProductCard } from '@/components/listings/product-card'
import { Product } from '@/types/product'
import { SearchFilters, Category } from '@/lib/types'
import { getPopularSearchTerms } from '@/lib/search'

interface SearchClientProps {
  allProducts: Product[]
  allCategories: Category[]
}

export default function SearchClient({ allProducts, allCategories }: SearchClientProps) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || undefined,
    trial: searchParams.get('trial') === 'true' ? true : undefined,
  })

  const popularTerms = getPopularSearchTerms()

  // Fuse.js configuration
  const fuse = useMemo(() => {
    return new Fuse(allProducts, {
      keys: [
        { name: 'name', weight: 0.3 },
        { name: 'keywords', weight: 0.25 },
        { name: 'useCases', weight: 0.2 },
        { name: 'category', weight: 0.15 },
        { name: 'description', weight: 0.1 },
      ],
      threshold: 0.4,
      minMatchCharLength: 2,
      includeScore: true,
    })
  }, [allProducts])

  // Perform client-side search with fuse.js
  const searchResults = useMemo(() => {
    let filteredProducts = allProducts

    // Apply filters
    filteredProducts = filteredProducts.filter(product => {
      // Category filter
      if (filters.category && product.categorySlug !== filters.category) {
        return false
      }

      // Trial filter
      if (filters.trial !== undefined && product.trialPlan !== filters.trial) {
        return false
      }

      // Pricing filter
      if (filters.pricing) {
        const hasFreePlan = product.pricing.plans.some(plan => plan.pricing.amount === 0)
        const hasPaidPlan = product.pricing.plans.some(plan => plan.pricing.amount !== null && plan.pricing.amount > 0)

        switch (filters.pricing) {
          case 'free':
            if (!hasFreePlan) return false
            break
          case 'paid':
            if (!hasPaidPlan) return false
            break
          case 'freemium':
            if (!hasFreePlan || !hasPaidPlan) return false
            break
        }
      }

      return true
    })

    // Apply text search if query exists
    if (query.trim()) {
      const fuseResults = fuse.search(query.trim())
      const fuseProductSlugs = new Set(fuseResults.map(r => r.item.slug))
      filteredProducts = filteredProducts.filter(p => fuseProductSlugs.has(p.slug))
    }

    return filteredProducts
  }, [allProducts, filters, query, fuse])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === prev[key] ? undefined : value,
    }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined).length

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}

      {/* Search Header */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Search Software Solutions
            </h1>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for CRM, HR, Marketing tools..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter'}
              />
            </div>

            {/* Popular Search Terms */}
            {!query && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularTerms.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {searchResults.length} results
                {query && ` for "${query}"`}
              </h2>
              {searchResults.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Found in {allCategories.length} categories
                </p>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <X className="h-4 w-4" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {allCategories.map(category => (
                      <option key={category.slug} value={category.slug}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Trial Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trial Available
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.trial === true}
                        onChange={() => handleFilterChange('trial', true)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Free trial</span>
                    </label>
                  </div>
                </div>

                {/* Pricing Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing Model
                  </label>
                  <select
                    value={filters.pricing || ''}
                    onChange={(e) => handleFilterChange('pricing', e.target.value || undefined)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Pricing</option>
                    <option value="free">Free</option>
                    <option value="freemium">Freemium</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  showCategory={!filters.category}
                />
              ))}
            </div>
          ) : query || activeFilterCount > 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setQuery('')
                  clearFilters()
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
              <p className="text-gray-600">
                Enter a search term above or try one of the popular searches
              </p>
            </div>
          )}
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
