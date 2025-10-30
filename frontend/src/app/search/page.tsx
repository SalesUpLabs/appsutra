import { Suspense } from 'react'
import { Search } from 'lucide-react'
import { getAllProducts, getCategories } from '@/lib/listings'
import SearchClient from './search-client'

export default async function SearchPage() {
  // Fetch data server-side
  const allProducts = await getAllProducts()
  const allCategories = await getCategories()

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl max-h-[20rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
      }
    >
      <SearchClient allProducts={allProducts} allCategories={allCategories} />
    </Suspense>
  )
}
