import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AppSutra - Open SaaS Directory',
  description: 'India-first, community-driven directory of SaaS products with transparent reviews and expert recommendations.',
  keywords: ['SaaS', 'directory', 'India', 'business software', 'reviews'],
  authors: [{ name: 'SalesUp Labs' }],
  openGraph: {
    title: 'AppSutra - Open SaaS Directory',
    description: 'India-first, community-driven directory of SaaS products with transparent reviews and expert recommendations.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppSutra - Open SaaS Directory',
    description: 'India-first, community-driven directory of SaaS products with transparent reviews and expert recommendations.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}