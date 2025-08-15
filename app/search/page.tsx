import { Metadata } from 'next'
import SearchPageContent from './SearchPageContent'

export const metadata: Metadata = {
  title: 'Search Products & Articles',
  description: 'Search through our comprehensive database of product reviews, buying guides, and tech articles. Find the perfect product for your needs.',
  keywords: 'search products, product search, tech reviews search, buying guides search',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Search Products & Articles - ProductHub',
    description: 'Search through our comprehensive database of product reviews, buying guides, and tech articles.',
    type: 'website',
  },
}

export default function SearchPage() {
  return <SearchPageContent />
}