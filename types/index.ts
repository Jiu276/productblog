export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  images: string[]
  price: {
    current: number
    original?: number
    currency: string
  }
  rating: number
  reviewCount: number
  features: string[]
  pros: string[]
  cons: string[]
  officialUrl: string
  affiliate?: {
    url: string
    commission?: number
  }
  category: string
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  publishedAt: string
  updatedAt: string
  category: string
  tags: string[]
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
  relatedProducts?: string[]
  readTime: number
}

export interface DomainConfig {
  domain: string
  products: string[]
  theme?: {
    primaryColor?: string
    logo?: string
    favicon?: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  analytics?: {
    googleAnalyticsId?: string
    facebookPixelId?: string
  }
}

export interface Review {
  id: string
  productId: string
  author: {
    name: string
    avatar?: string
    verified: boolean
  }
  rating: number
  title: string
  content: string
  helpful: number
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  parentId?: string
}

export interface FilterOptions {
  categories: string[]
  priceRange: {
    min: number
    max: number
  }
  rating: number
  tags: string[]
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
}

export interface PriceRange {
  min: number
  max: number
  label: string
}

export interface FilterState {
  category?: string
  priceRange?: PriceRange
  minRating?: number
  tags: string[]
  sortBy: FilterOptions['sortBy']
  searchQuery?: string
}