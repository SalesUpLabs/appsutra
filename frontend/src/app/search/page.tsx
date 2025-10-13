'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
// import { Header } from '@/components/layout/header'
// import { Footer } from '@/components/layout/footer'
import { ListingCard } from '@/components/listings/listing-card'
import { searchListings, getPopularSearchTerms } from '@/lib/search'
import { getCategories } from '@/lib/listings'
import { Listing, SearchFilters, Category } from '@/lib/types'
import { getCategoryDisplayName } from '@/lib/utils'

function SearchContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<Listing[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || undefined,
    verified: searchParams.get('verified') === 'true' ? true : undefined,
    trial: searchParams.get('trial') === 'true' ? true : undefined,
  })

  const popularTerms = getPopularSearchTerms()

  // Load categories on mount
  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  // Perform search
  const performSearch = useCallback(async () => {
    setLoading(true)
    try {
      const searchResult = await searchListings(query, filters)
      setResults(searchResult.listings)
      setTotal(searchResult.total)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [query, filters])

  // Search on query or filter changes
  useEffect(() => {
    performSearch()
  }, [performSearch])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === prev[key] ? undefined : value
    }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined).length

  return (
    <div className="min-h-screen ">

      {/* Search Header */}
      <section className=" py-12">
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
                onKeyDown={(e) => e.key === 'Enter' && performSearch()}
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
                {loading ? 'Searching...' : `${total} results`}
                {query && ` for "${query}"`}
              </h2>
              {!loading && total > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Found in {categories.length} categories
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                    {categories.map(category => (
                      <option key={category.slug} value={category.slug}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Verification Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.verified === true}
                        onChange={() => handleFilterChange('verified', true)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Verified only</span>
                    </label>
                  </div>
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((listing) => (
                <ListingCard
                  key={listing.slug}
                  listing={listing}
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

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        {/* <Header /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-16 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}