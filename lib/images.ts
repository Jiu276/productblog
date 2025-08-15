// Enhanced image service utilities for automatic image generation

export interface ImageConfig {
  width?: number
  height?: number
  category?: string
  seed?: string
  backgroundColor?: string
  textColor?: string
}

export interface BlogImageConfig extends ImageConfig {
  blogCategory?: 'reviews' | 'guides' | 'news' | 'tutorials'
  authorName?: string
}

export interface ContentImageConfig extends ImageConfig {
  contentType?: 'product' | 'blog' | 'hero' | 'feature' | 'avatar'
  title?: string
  subtitle?: string
}

// More reliable image sources
export function getLoremFlickrImage(query: string, config: ImageConfig = {}): string {
  const { width = 400, height = 300 } = config
  const searchQuery = encodeURIComponent(query.replace(/\s+/g, ','))
  return `https://loremflickr.com/${width}/${height}/${searchQuery}`
}

// DummyImage for reliable placeholders
export function getDummyImage(text: string, config: ImageConfig = {}): string {
  const { width = 400, height = 300 } = config
  const bgColor = '4f46e5' // Primary blue
  const textColor = 'ffffff'
  const encodedText = encodeURIComponent(text)
  return `https://dummyimage.com/${width}x${height}/${bgColor}/${textColor}?text=${encodedText}`
}

// Placeholder.com for placeholder images
export function getPlaceholderImage(config: ImageConfig = {}): string {
  const { width = 400, height = 300, category = 'product' } = config
  return `https://via.placeholder.com/${width}x${height}/6366F1/FFFFFF?text=${encodeURIComponent(category)}`
}

// Picsum (Lorem Picsum) for random high-quality images
export function getPicsumImage(config: ImageConfig = {}): string {
  const { width = 400, height = 300, seed } = config
  const baseUrl = 'https://picsum.photos'
  const seedParam = seed ? `/seed/${seed}` : ''
  
  return `${baseUrl}${seedParam}/${width}/${height}`
}

// Generate product-specific images based on product data
export function generateProductImages(productName: string, category: string, productId: string): string[] {
  const queries = [
    productName.toLowerCase(),
    category.replace('-', ' '),
    `${category} product`,
    `modern ${category}`,
  ]
  
  return queries.map((query, index) => 
    getPicsumImage({ 
      width: 400, 
      height: 300, 
      seed: `${productId}-${index}` 
    })
  )
}

// Fallback image service with multiple reliable sources
export function getProductImage(productName: string, category: string, index: number = 0): string {
  // Use more reliable image sources
  const sources = [
    () => getDummyImage(`${productName}`, { width: 400, height: 300 }),
    () => getLoremFlickrImage(category, { width: 400, height: 300 }),
    () => getPicsumImage({ seed: `${productName}-${index}` }),
    () => getPlaceholderImage({ category: productName }),
  ]
  
  // Return the first source (DummyImage with product name)
  return sources[0]()
}

// Generate images for product carousel
export function generateCarouselImages(productName: string, category: string, count: number = 3): string[] {
  return Array.from({ length: count }, (_, index) => 
    getProductImage(productName, category, index)
  )
}

// Color themes for different content types
export const contentColors = {
  product: {
    smartphones: { bg: '4f46e5', text: 'ffffff' }, // Indigo
    laptops: { bg: '059669', text: 'ffffff' }, // Emerald  
    'home-appliances': { bg: 'dc2626', text: 'ffffff' }, // Red
    wearables: { bg: 'f59e0b', text: 'ffffff' }, // Amber
    audio: { bg: '7c3aed', text: 'ffffff' }, // Violet
    gaming: { bg: 'ef4444', text: 'ffffff' }, // Red
    default: { bg: '6366f1', text: 'ffffff' } // Blue
  },
  blog: {
    reviews: { bg: '3b82f6', text: 'ffffff' }, // Blue
    guides: { bg: '10b981', text: 'ffffff' }, // Emerald
    news: { bg: 'f59e0b', text: 'ffffff' }, // Amber  
    tutorials: { bg: '8b5cf6', text: 'ffffff' }, // Purple
    default: { bg: '6b7280', text: 'ffffff' } // Gray
  },
  hero: { bg: '1f2937', text: 'ffffff' }, // Dark gray
  feature: { bg: '3b82f6', text: 'ffffff' }, // Blue
  avatar: { bg: '6366f1', text: 'ffffff' } // Indigo
}

// Category-specific image queries
export const categoryImageQueries: Record<string, string[]> = {
  'smartphones': ['smartphone', 'mobile phone', 'iphone', 'android phone'],
  'laptops': ['laptop', 'macbook', 'notebook computer', 'laptop computer'],
  'home-appliances': ['home appliance', 'kitchen appliance', 'smart home', 'modern appliance'],
  'wearables': ['smartwatch', 'fitness tracker', 'wearable device', 'smart watch'],
  'audio': ['headphones', 'speaker', 'audio equipment', 'wireless headphones'],
  'gaming': ['gaming setup', 'gaming gear', 'gaming keyboard', 'gaming mouse'],
}

// Blog category specific queries
export const blogCategoryQueries: Record<string, string[]> = {
  'reviews': ['review', 'test', 'evaluation', 'comparison'],
  'guides': ['guide', 'tutorial', 'how to', 'tips'],
  'news': ['news', 'update', 'announcement', 'industry'],
  'tutorials': ['tutorial', 'step by step', 'learning', 'education']
}

// Get category-specific images
export function getCategoryImages(category: string, count: number = 3): string[] {
  return Array.from({ length: count }, (_, index) => {
    return getPicsumImage({ seed: `${category}-${index}` })
  })
}

// Enhanced DummyImage with theme colors
export function getDummyImageWithTheme(text: string, contentType: 'product' | 'blog' | 'hero' | 'feature' | 'avatar', category?: string, config: ImageConfig = {}): string {
  const { width = 400, height = 300 } = config
  
  let colors: { bg: string; text: string }
  if (contentType === 'product' && category) {
    colors = contentColors.product[category as keyof typeof contentColors.product] || contentColors.product.default
  } else if (contentType === 'blog' && category) {
    colors = contentColors.blog[category as keyof typeof contentColors.blog] || contentColors.blog.default
  } else if (contentType === 'hero') {
    colors = contentColors.hero
  } else if (contentType === 'feature') {
    colors = contentColors.feature
  } else if (contentType === 'avatar') {
    colors = contentColors.avatar
  } else {
    colors = contentColors.product.default
  }
  
  const encodedText = encodeURIComponent(text)
  return `https://dummyimage.com/${width}x${height}/${colors.bg}/${colors.text}?text=${encodedText}`
}

import { resolveImage, getCategoryDefaultImage } from './image-mappings'

// Generate blog post images with smart local fallback
export function getBlogImage(title: string, category: string = 'default', config: BlogImageConfig = {}): string {
  const { width = 400, height = 300 } = config
  
  // Use smart image resolver
  const resolvedImage = resolveImage(title, category)
  
  // If we got a real image path (not a placeholder), return it
  if (resolvedImage && !resolvedImage.includes('placeholder')) {
    return resolvedImage
  }
  
  // Use category default if available
  const categoryImage = getCategoryDefaultImage(category)
  if (categoryImage && !categoryImage.includes('placeholder')) {
    return categoryImage
  }
  
  // Fallback to theme-based dummy image for better visual consistency
  const shortTitle = title.length > 20 ? title.substring(0, 20) + '...' : title
  return getDummyImageWithTheme(shortTitle, 'blog', category, { width, height })
}

// Generate multiple blog images for carousel
export function generateBlogImages(titles: string[], category: string = 'default', config: BlogImageConfig = {}): string[] {
  return titles.map(title => getBlogImage(title, category, config))
}

// Generate hero/banner images
export function getHeroImage(title: string, config: ContentImageConfig = {}): string {
  const { width = 1200, height = 600, subtitle } = config
  const text = subtitle ? `${title}|${subtitle}` : title
  
  return getDummyImageWithTheme(text, 'hero', undefined, { width, height })
}

// Generate feature/section images  
export function getFeatureImage(title: string, config: ContentImageConfig = {}): string {
  const { width = 300, height = 200 } = config
  
  return getDummyImageWithTheme(title, 'feature', undefined, { width, height })
}

// Generate user avatar images
export function getAvatarImage(name: string, config: ContentImageConfig = {}): string {
  const { width = 100, height = 100 } = config
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  
  return getDummyImageWithTheme(initials, 'avatar', undefined, { width, height })
}

// Smart image selector - automatically chooses best image service based on content
export function getSmartImage(content: {
  title: string
  type: 'product' | 'blog' | 'hero' | 'feature' | 'avatar'
  category?: string
  width?: number
  height?: number
}): string {
  const { title, type, category, width = 400, height = 300 } = content
  
  const config = { width, height }
  
  switch (type) {
    case 'product':
      return getProductImage(title, category || 'default')
    case 'blog':
      return getBlogImage(title, category, config)
    case 'hero':
      return getHeroImage(title, config)
    case 'feature':
      return getFeatureImage(title, config)
    case 'avatar':
      return getAvatarImage(title, config)
    default:
      return getDummyImageWithTheme(title, 'feature', category, config)
  }
}

// Utility function for JavaScript files (returns image URL)
export function getImageForJS(title: string, type: string, category?: string, width?: number, height?: number): string {
  return getSmartImage({
    title,
    type: type as 'product' | 'blog' | 'hero' | 'feature' | 'avatar',
    category,
    width,
    height
  })
}