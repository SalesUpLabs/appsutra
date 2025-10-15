import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, CheckCircle, MapPin, Calendar, Github, Star, MessageSquare } from 'lucide-react'
// import { Header } from '@/components/layout/header'
// import { Footer } from '@/components/layout/footer'
import { ListingCard } from '@/components/listings/listing-card'
import { getListingBySlug, getAllListings, getRelatedListings } from '@/lib/listings'
import { formatPricing, isIndianCompany, formatDate, getCategoryDisplayName } from '@/lib/utils'

interface ProductPageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const listings = await getAllListings()
  return listings.map((listing) => ({
    category: listing.category,
    slug: listing.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category, slug } = await params
  const listing = await getListingBySlug(category, slug)

  if (!listing) {
    return {
      title: 'Product Not Found - AppSutra',
    }
  }

  return {
    title: `${listing.name} - ${getCategoryDisplayName(listing.category)} Software | AppSutra`,
    description: listing.excerpt || `${listing.name} is a ${listing.category} solution. ${formatPricing(listing.pricing)}. ${listing.trial ? 'Free trial available.' : ''}`,
    keywords: [listing.name, ...listing.keywords || [], listing.category, 'software', 'SaaS', 'India'],
    openGraph: {
      title: `${listing.name} - ${getCategoryDisplayName(listing.category)} Software`,
      description: listing.excerpt || `${listing.name} is a ${listing.category} solution`,
      type: 'website',
      images: listing.logo ? [{ url: listing.logo }] : [],
    },
  }
}

function parseMarkdownContent(content: string) {
  // Simple markdown parsing - in production, you'd use a proper markdown parser
  const sections = content.split(/^##\s+/m).filter(Boolean)
  const parsed: { [key: string]: string } = {}

  sections.forEach(section => {
    const lines = section.trim().split('\n')
    const title = lines[0].replace(/^\*\*|\*\*$/g, '').trim()
    const body = lines.slice(1).join('\n').trim()
    parsed[title.toLowerCase()] = body
  })

  return parsed
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params
  const listing = await getListingBySlug(category, slug)

  if (!listing) {
    notFound()
  }

  const relatedListings = await getRelatedListings(listing, 3)
  const categoryName = getCategoryDisplayName(listing.category)
  const parsedContent = parseMarkdownContent(listing.content)

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}

      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/search" className="hover:text-blue-600">Directory</Link>
            <span>/</span>
            <Link href={`/${listing.category}`} className="hover:text-blue-600 capitalize">
              {categoryName}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{listing.name}</span>
          </div>
        </div>
      </nav>

      {/* Product Header */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{listing.name}</h1>
                    {listing.verified && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-4">{listing.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {categoryName}
                    </span>

                    {listing.trial && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Free Trial
                      </span>
                    )}

                    {isIndianCompany(listing.locations) && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        🇮🇳 Indian Company
                      </span>
                    )}

                    {listing.verified && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Pricing</h3>
                  <p className="text-lg font-semibold text-gray-900">{formatPricing(listing.pricing)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Locations</h3>
                  <p className="text-sm text-gray-900">{listing.locations.join(', ')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Last Updated</h3>
                  <p className="text-sm text-gray-900">{formatDate(listing.updated_at)}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="https://github.com/salesuplabs/appsutra/issues/new?template=review.yml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Write Review
                </Link>

                {listing.listing_owner_github && (
                  <Link
                    href={`https://github.com/${listing.listing_owner_github.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Maintained by {listing.listing_owner_github}
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Use Cases */}
              {listing.use_cases && listing.use_cases.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Use Cases</h3>
                  <div className="space-y-2">
                    {listing.use_cases.map(useCase => (
                      <span
                        key={useCase}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full mr-2 mb-2"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Integrations */}
              {listing.integrations && listing.integrations.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
                  <div className="space-y-2">
                    {listing.integrations.slice(0, 10).map(integration => (
                      <div key={integration} className="text-sm text-gray-600">
                        • {integration}
                      </div>
                    ))}
                    {listing.integrations.length > 10 && (
                      <div className="text-sm text-gray-500">
                        +{listing.integrations.length - 10} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Contact */}
              {listing.contact_email && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                  <Link
                    href={`mailto:${listing.contact_email}`}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    {listing.contact_email}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="prose prose-lg max-w-none">
              {/* Render parsed content sections */}
              {parsedContent.about && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {parsedContent.about}
                  </div>
                </div>
              )}

              {parsedContent['key features'] && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {parsedContent['key features']}
                  </div>
                </div>
              )}

              {parsedContent.pricing && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {parsedContent.pricing}
                  </div>
                </div>
              )}

              {parsedContent['for indian businesses'] && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">For Indian Businesses</h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {parsedContent['for indian businesses']}
                  </div>
                </div>
              )}

              {/* Fallback for any remaining content */}
              {!parsedContent.about && (
                <div className="text-gray-700 whitespace-pre-line">
                  {listing.content}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedListings.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedListings.map((relatedListing) => (
                <ListingCard
                  key={relatedListing.slug}
                  listing={relatedListing}
                  showCategory={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* <Footer /> */}
    </div>
  )
}