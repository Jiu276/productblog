// Image mapping and naming conventions for the ProductBlog project

export interface ImageMapping {
  articleId: string
  title: string
  category: string
  mainImage: string
  detailImages?: string[]
  fallbackImage?: string
}

// Article image mappings
export const articleImageMappings: ImageMapping[] = [
  {
    articleId: 'iphone-15-pro-review',
    title: 'iPhone 15 Pro In-Depth Review',
    category: 'smartphones',
    mainImage: '/images/articles/iphone-15-pro-main.jpg',
    detailImages: [
      '/images/articles/iphone-15-pro-detail-1.jpg',
      '/images/articles/iphone-15-pro-detail-2.jpg'
    ],
    fallbackImage: '/images/placeholders/smartphone-placeholder.svg'
  },
  {
    articleId: 'macbook-pro-m3-review',
    title: 'MacBook Pro M3 Review',
    category: 'laptops',
    mainImage: '/images/articles/macbook-pro-m3-main.jpg',
    detailImages: [
      '/images/articles/macbook-pro-m3-detail-1.jpg',
      '/images/articles/macbook-pro-m3-detail-2.jpg'
    ],
    fallbackImage: '/images/placeholders/laptop-placeholder.svg'
  },
  {
    articleId: 'airpods-pro-2-review',
    title: 'AirPods Pro 2 Review',
    category: 'audio',
    mainImage: '/images/articles/airpods-pro-2-main.jpg',
    detailImages: [
      '/images/articles/airpods-pro-2-detail-1.jpg',
      '/images/articles/airpods-pro-2-detail-2.jpg'
    ],
    fallbackImage: '/images/placeholders/audio-placeholder.svg'
  },
  {
    articleId: 'smartwatch-buying-guide',
    title: '2024 Smartwatch Buying Guide',
    category: 'wearables',
    mainImage: '/images/articles/smartwatch-guide-main.jpg',
    fallbackImage: '/images/placeholders/wearable-placeholder.svg'
  },
  {
    articleId: 'smart-home-tutorial',
    title: 'Smart Home Beginner\'s Guide',
    category: 'smart-home',
    mainImage: '/images/articles/smart-home-guide-main.jpg',
    fallbackImage: '/images/placeholders/smart-home-placeholder.svg'
  },
  {
    articleId: 'gaming-setup-guide',
    title: 'Ultimate Gaming Setup Guide 2024',
    category: 'gaming',
    mainImage: '/images/articles/gaming-setup-guide-main.jpg',
    fallbackImage: '/images/placeholders/gaming-placeholder.svg'
  }
]

// Category-based default images
export const categoryDefaultImages: Record<string, string> = {
  'smartphones': '/images/articles/iphone-15-pro-main.jpg',
  'laptops': '/images/articles/macbook-pro-m3-main.jpg',
  'audio': '/images/articles/airpods-pro-2-main.jpg',
  'wearables': '/images/placeholders/wearable-placeholder.svg',
  'smart-home': '/images/placeholders/smart-home-placeholder.svg',
  'gaming': '/images/placeholders/gaming-placeholder.svg',
  'default': '/images/placeholders/product-placeholder.svg'
}

// Image naming convention guide
export const namingConvention = {
  // Format: {category}-{product-name}-{variant}.{ext}
  // Examples:
  // - smartphones-iphone-15-pro-main.jpg
  // - laptops-macbook-pro-m3-main.jpg
  // - audio-airpods-pro-2-main.jpg
  
  patterns: {
    mainImage: '{category}-{product-slug}-main.{ext}',
    detailImage: '{category}-{product-slug}-detail-{index}.{ext}',
    comparisonImage: '{category}-{product-slug}-vs-{competitor}.{ext}',
    placeholder: '{category}-placeholder.svg'
  },
  
  directories: {
    articles: '/images/articles/',
    products: '/images/products/',
    placeholders: '/images/placeholders/',
    authors: '/images/authors/',
    categories: '/images/categories/'
  }
}

// Helper functions
export function getArticleImage(articleId: string): string | null {
  const mapping = articleImageMappings.find(m => m.articleId === articleId)
  return mapping?.mainImage || null
}

export function getArticleImageByTitle(title: string): string | null {
  const mapping = articleImageMappings.find(m => 
    m.title.toLowerCase().includes(title.toLowerCase()) ||
    title.toLowerCase().includes(m.title.toLowerCase())
  )
  return mapping?.mainImage || null
}

export function getCategoryDefaultImage(category: string): string {
  return categoryDefaultImages[category] || categoryDefaultImages['default']
}

export function getFallbackImage(category: string): string {
  const mapping = articleImageMappings.find(m => m.category === category)
  return mapping?.fallbackImage || categoryDefaultImages[category] || categoryDefaultImages['default']
}

// Smart image resolver
export function resolveImage(identifier: string, category?: string): string {
  // Try article ID first
  let image = getArticleImage(identifier)
  if (image) return image
  
  // Try article title
  image = getArticleImageByTitle(identifier)
  if (image) return image
  
  // Use category default
  if (category) {
    return getCategoryDefaultImage(category)
  }
  
  // Final fallback
  return categoryDefaultImages['default']
}