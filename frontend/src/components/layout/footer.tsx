import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  const categories = [
    { name: 'CRM', href: '/crm' },
    { name: 'HR', href: '/hr' },
    { name: 'Marketing', href: '/marketing' },
    { name: 'Finance', href: '/finance' },
    { name: 'Support', href: '/support' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Security', href: '/security' },
    { name: 'DevTools', href: '/devtools' },
    { name: 'Accounting', href: '/accounting' },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="font-bold text-xl text-gray-900">AppSutra</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              India-first, community-driven directory of SaaS products.
              Discover vetted solutions with transparent reviews and expert recommendations.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/salesuplabs/appsutra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/salesuplabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/salesup-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              More Categories
            </h3>
            <ul className="space-y-2">
              {categories.slice(5).map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/search"
                  className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  View All →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 SalesUp Labs. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="https://github.com/salesuplabs/appsutra/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
              >
                Contributing
              </Link>
              <Link
                href="https://github.com/salesuplabs/appsutra/issues/new?template=review.yml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
              >
                Write Review
              </Link>
              <Link
                href="https://appsutra.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}