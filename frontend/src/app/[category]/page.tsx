import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ListingCard } from '@/components/listings/listing-card'
import { getListingsByCategory, getCategories } from '@/lib/listings'
import { getCategoryDisplayName } from '@/lib/utils'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryName = getCategoryDisplayName(params.category)
  const listings = await getListingsByCategory(params.category)

  if (listings.length === 0) {
    return {
      title: 'Category Not Found - AppSutra',
    }
  }

  return {
    title: `${categoryName} Software - AppSutra Directory`,
    description: `Discover the best ${categoryName.toLowerCase()} software for Indian businesses. Compare ${listings.length} verified solutions with transparent pricing and reviews.`,
    keywords: [categoryName.toLowerCase(), 'software', 'SaaS', 'India', 'business tools'],
    openGraph: {
      title: `${categoryName} Software - AppSutra Directory`,
      description: `Discover the best ${categoryName.toLowerCase()} software for Indian businesses. Compare ${listings.length} verified solutions with transparent pricing and reviews.`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const listings = await getListingsByCategory(params.category)
  const categoryName = getCategoryDisplayName(params.category)

  if (listings.length === 0) {
    notFound()
  }

  // Separate verified and unverified listings
  const verifiedListings = listings.filter(listing => listing.verified)
  const unverifiedListings = listings.filter(listing => !listing.verified)

  // Stats
  const trialCount = listings.filter(listing => listing.trial).length
  const indianCount = listings.filter(listing =>
    listing.locations.some(loc => loc.toLowerCase().includes('india'))
  ).length

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Category Hero */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {categoryName} Software
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Discover {listings.length} verified {categoryName.toLowerCase()} solutions
              designed for Indian businesses with transparent pricing and community reviews.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900">{listings.length}</span>
                <span>Products</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900">{verifiedListings.length}</span>
                <span>Verified</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900">{trialCount}</span>
                <span>Free Trials</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900">{indianCount}</span>
                <span>Indian Companies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Sorting */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {listings.length} {categoryName} Solutions
              </h2>
              <p className="text-sm text-gray-600">
                All solutions are community-verified and regularly updated
              </p>
            </div>

            {/* Filter/Sort Controls - Placeholder for future implementation */}
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Sort by: Recommended</option>
                <option>Newest First</option>
                <option>A-Z</option>
                <option>Verified First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Listings */}
      {verifiedListings.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verified Solutions
            </h2>
            <p className="text-gray-600 mb-8">
              Hand-picked solutions verified by our expert team
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifiedListings.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Other Listings */}
      {unverifiedListings.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Community Submitted
            </h2>
            <p className="text-gray-600 mb-8">
              Additional solutions submitted by the community
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unverifiedListings.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Missing a {categoryName} Solution?
          </h2>
          <p className="text-gray-600 mb-8">
            Help grow our directory by submitting {categoryName.toLowerCase()} tools
            you use and recommend to the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/salesuplabs/appsutra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit a Product
            </a>
            <a
              href="https://github.com/salesuplabs/appsutra/issues/new?template=review.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Write a Review
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}