import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://producthub.com'),
  title: {
    template: '%s | ProductHub',
    default: 'ProductHub - Professional Product Reviews & Buying Guides'
  },
  description: 'Professional product review and promotion platform, providing you with the most authentic product experiences and purchase recommendations for smartphones, laptops, and consumer electronics.',
  keywords: [
    'product reviews',
    'buying guides', 
    'smartphone reviews',
    'laptop reviews',
    'consumer electronics',
    'product comparison',
    'tech reviews'
  ],
  authors: [{ name: 'ProductHub Team' }],
  creator: 'ProductHub',
  publisher: 'ProductHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://producthub.com',
    siteName: 'ProductHub',
    title: 'ProductHub - Professional Product Reviews & Buying Guides',
    description: 'Professional product review and promotion platform, providing you with the most authentic product experiences and purchase recommendations.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ProductHub - Professional Product Reviews',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProductHub - Professional Product Reviews & Buying Guides',
    description: 'Professional product review and promotion platform, providing you with the most authentic product experiences and purchase recommendations.',
    images: ['/og-image.jpg'],
    creator: '@ProductHub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}