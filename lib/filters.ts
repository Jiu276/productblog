import { Product, FilterState, PriceRange } from '@/types'

export const priceRanges: PriceRange[] = [
  { min: 0, max: 500, label: 'Under $500' },
  { min: 500, max: 1000, label: '$500-1000' },
  { min: 1000, max: 3000, label: '$1000-3000' },
  { min: 3000, max: 5000, label: '$3000-5000' },
  { min: 5000, max: 10000, label: '$5000-10000' },
  { min: 10000, max: Infinity, label: 'Over $10000' },
]

export const categories = [
  { id: 'smartphones', name: 'Smartphones', slug: 'smartphones' },
  { id: 'laptops', name: 'Laptops', slug: 'laptops' },
  { id: 'home-appliances', name: 'Home Appliances', slug: 'home-appliances' },
  { id: 'wearables', name: 'Wearables', slug: 'wearables' },
  { id: 'audio', name: 'Audio Devices', slug: 'audio' },
  { id: 'gaming', name: 'Gaming Devices', slug: 'gaming' },
]

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  let filtered = [...products]

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category)
  }

  // Filter by price range
  if (filters.priceRange) {
    filtered = filtered.filter(product => {
      const price = product.price.current
      return price >= filters.priceRange!.min && price <= filters.priceRange!.max
    })
  }

  // Filter by rating
  if (filters.minRating) {
    filtered = filtered.filter(product => product.rating >= filters.minRating!)
  }

  // Filter by tags
  if (filters.tags.length > 0) {
    filtered = filtered.filter(product =>
      filters.tags.some(tag => product.tags.includes(tag))
    )
  }

  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Sort
  switch (filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price.current - b.price.current)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price.current - a.price.current)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'popular':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount)
      break
    default:
      break
  }

  return filtered
}

export function getAllTags(products: Product[]): string[] {
  const allTags = products.flatMap(product => product.tags)
  const uniqueTags = Array.from(new Set(allTags))
  return uniqueTags.sort()
}

export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 }
  
  const prices = products.map(product => product.price.current)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}

export function getInitialFilterState(): FilterState {
  return {
    tags: [],
    sortBy: 'popular'
  }
}