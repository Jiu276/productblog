import { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'smartphone-x1',
    name: 'SmartPhone X1 Pro',
    slug: 'smartphone-x1-pro',
    description: 'Latest flagship smartphone with advanced AI camera system and ultra-long battery life. Features a 6.7-inch OLED display with 120Hz refresh rate for the ultimate smooth user experience.',
    shortDescription: 'Flagship smartphone with AI camera system and ultra-long battery life',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop'
    ],
    price: {
      current: 4999,
      original: 5999,
      currency: 'USD'
    },
    rating: 4.8,
    reviewCount: 1250,
    features: [
      '6.7-inch OLED display',
      '120Hz refresh rate',
      'AI triple camera system',
      '5000mAh large capacity battery',
      '65W fast charging',
      '256GB storage'
    ],
    pros: [
      'Excellent photography performance',
      'Strong battery life',
      'Outstanding display quality',
      'Smooth system performance'
    ],
    cons: [
      'Relatively high price',
      'Slightly heavy body',
      'Charger sold separately'
    ],
    officialUrl: 'https://official-store.com/smartphone-x1',
    affiliate: {
      url: 'https://affiliate-link.com/smartphone-x1',
      commission: 5
    },
    category: 'smartphones',
    tags: ['flagship phone', 'AI photography', 'long battery life'],
    seoTitle: 'SmartPhone X1 Pro Review - Best Flagship Phone 2024',
    seoDescription: 'In-depth review of SmartPhone X1 Pro, detailed analysis of photography, battery life, and performance, providing professional purchase recommendations.',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'laptop-pro',
    name: 'LaptopPro 16"',
    slug: 'laptopro-16',
    description: 'Professional laptop with latest processor and dedicated graphics card, perfect for creative professionals and gamers. 16-inch 4K display provides excellent visual experience.',
    shortDescription: 'Professional laptop, 4K display, high-performance configuration',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'
    ],
    price: {
      current: 12999,
      original: 14999,
      currency: 'USD'
    },
    rating: 4.7,
    reviewCount: 890,
    features: [
      '16-inch 4K display',
      'Latest processor',
      '32GB RAM',
      '1TB SSD storage',
      'Dedicated graphics card',
      'All-day battery life'
    ],
    pros: [
      'Powerful performance',
      'Accurate screen colors',
      'Good heat dissipation',
      'Comfortable keyboard feel'
    ],
    cons: [
      'Relatively heavy weight',
      'Expensive price',
      'Fan noise slightly loud'
    ],
    officialUrl: 'https://official-store.com/laptop-pro',
    category: 'laptops',
    tags: ['professional laptop', '4K screen', 'high performance'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'air-purifier-max',
    name: 'AirPure Max Smart Air Purifier',
    slug: 'airpure-max',
    description: 'Smart air purifier with HEPA filter and activated carbon layer, effectively removes PM2.5, formaldehyde and other harmful substances. Supports APP remote control and air quality monitoring.',
    shortDescription: 'Smart air purifier, HEPA filter, APP control',
    images: [
      '/images/airpure-max-main.jpg',
      '/images/airpure-max-main.jpg',
      '/images/airpure-max-main.jpg'
    ],
    price: {
      current: 1899,
      original: 2299,
      currency: 'USD'
    },
    rating: 4.6,
    reviewCount: 650,
    features: [
      'HEPA H13 filter',
      'Activated carbon layer',
      'Smart air quality monitoring',
      'APP remote control',
      'Silent mode',
      'Coverage area 60㎡'
    ],
    pros: [
      'Significant purification effect',
      'Quiet operation',
      'High level of intelligence',
      'Simple and elegant design'
    ],
    cons: [
      'High filter replacement cost',
      'Large size',
      'Occasional APP connection issues'
    ],
    officialUrl: 'https://official-store.com/air-purifier-max',
    category: 'home-appliances',
    tags: ['air purifier', 'smart home', 'HEPA'],
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z'
  },
  {
    id: 'smartwatch-z2',
    name: 'SmartWatch Z2 Fitness Pro',
    slug: 'smartwatch-z2-fitness-pro',
    description: 'Advanced fitness smartwatch with 7-day battery life, heart rate monitoring, GPS tracking, and water resistance up to 50m. Features comprehensive health monitoring including sleep tracking, stress monitoring, and blood oxygen measurement.',
    shortDescription: 'Advanced fitness smartwatch with 7-day battery and comprehensive health monitoring',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=800&h=600&fit=crop'
    ],
    price: {
      current: 299,
      original: 399,
      currency: 'USD'
    },
    rating: 4.5,
    reviewCount: 2150,
    features: [
      '1.4-inch AMOLED display',
      '7-day battery life',
      'GPS tracking',
      'Heart rate monitor',
      '50m water resistance',
      '100+ workout modes'
    ],
    pros: [
      'Excellent battery life',
      'Accurate fitness tracking',
      'Comfortable to wear',
      'Great value for money'
    ],
    cons: [
      'Limited third-party apps',
      'Basic notification features',
      'Plastic build quality'
    ],
    officialUrl: 'https://official-store.com/smartwatch-z2',
    affiliate: {
      url: 'https://affiliate-link.com/smartwatch-z2',
      commission: 6
    },
    category: 'wearables',
    tags: ['smartwatch', 'fitness tracker', 'health monitor', 'GPS'],
    seoTitle: 'SmartWatch Z2 Fitness Pro Review - Best Budget Fitness Watch 2024',
    seoDescription: 'Comprehensive review of SmartWatch Z2 Fitness Pro. Detailed analysis of fitness tracking, battery life, and health monitoring features.',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },
  {
    id: 'wireless-headphones-ultra',
    name: 'UltraSound Pro Wireless Headphones',
    slug: 'ultrasound-pro-wireless',
    description: 'Premium wireless headphones with active noise cancellation, 40-hour battery life, and studio-quality sound. Features Bluetooth 5.3, quick charge technology, and comfortable over-ear design for extended listening sessions.',
    shortDescription: 'Premium wireless headphones with ANC and 40-hour battery',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop'
    ],
    price: {
      current: 249,
      original: 349,
      currency: 'USD'
    },
    rating: 4.7,
    reviewCount: 1840,
    features: [
      'Active noise cancellation',
      '40-hour battery life',
      'Bluetooth 5.3',
      'Quick charge (5min = 2hr)',
      'Studio-quality drivers',
      'Comfortable padding'
    ],
    pros: [
      'Exceptional sound quality',
      'Long battery life',
      'Effective noise cancellation',
      'Comfortable for long use'
    ],
    cons: [
      'Bulky design',
      'No wireless charging case',
      'Heavy for travel'
    ],
    officialUrl: 'https://official-store.com/ultrasound-pro',
    category: 'audio',
    tags: ['wireless headphones', 'noise cancellation', 'premium audio'],
    createdAt: '2024-01-09T00:00:00Z',
    updatedAt: '2024-01-09T00:00:00Z'
  },
  {
    id: 'gaming-keyboard-rgb',
    name: 'RGB Mechanical Gaming Keyboard Pro',
    slug: 'rgb-mechanical-gaming-keyboard',
    description: 'Professional mechanical gaming keyboard with customizable RGB lighting, hot-swappable switches, and programmable keys. Features ultra-responsive mechanical switches, dedicated media controls, and premium aluminum construction.',
    shortDescription: 'Professional mechanical gaming keyboard with RGB and hot-swap switches',
    images: [
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=800&h=600&fit=crop'
    ],
    price: {
      current: 159,
      original: 199,
      currency: 'USD'
    },
    rating: 4.6,
    reviewCount: 920,
    features: [
      'Hot-swappable switches',
      'Customizable RGB lighting',
      'Aluminum frame',
      'Programmable keys',
      'Dedicated media controls',
      'USB-C connectivity'
    ],
    pros: [
      'Excellent build quality',
      'Customizable switches',
      'Beautiful RGB effects',
      'Responsive for gaming'
    ],
    cons: [
      'Loud typing sound',
      'Learning curve for customization',
      'No wireless option'
    ],
    officialUrl: 'https://official-store.com/gaming-keyboard-rgb',
    category: 'gaming',
    tags: ['gaming keyboard', 'mechanical', 'RGB', 'hot-swappable'],
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z'
  },
  {
    id: 'tablet-pro-12',
    name: 'TabletPro 12" Creative Edition',
    slug: 'tabletpro-12-creative',
    description: 'Professional 12-inch tablet designed for creative professionals. Features Apple M2 chip, 12.9-inch Liquid Retina display, Apple Pencil support, and all-day battery life. Perfect for digital art, design work, and productivity.',
    shortDescription: 'Professional 12-inch tablet with M2 chip for creative work',
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=600&fit=crop'
    ],
    price: {
      current: 899,
      original: 1099,
      currency: 'USD'
    },
    rating: 4.8,
    reviewCount: 1560,
    features: [
      '12.9-inch Liquid Retina display',
      'Apple M2 chip',
      'Apple Pencil support',
      '256GB storage',
      '10-hour battery life',
      'USB-C connectivity'
    ],
    pros: [
      'Powerful performance',
      'Excellent display quality',
      'Great for digital art',
      'Long battery life'
    ],
    cons: [
      'Expensive accessories',
      'No headphone jack',
      'Limited ports'
    ],
    officialUrl: 'https://official-store.com/tabletpro-12',
    category: 'laptops',
    tags: ['tablet', 'creative', 'apple pencil', 'productivity'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'smart-coffee-maker',
    name: 'BrewMaster Smart Coffee Maker',
    slug: 'brewmaster-smart-coffee-maker',
    description: 'Smart coffee maker with app control, programmable brewing schedules, and precision temperature control. Features built-in grinder, multiple brew strength options, and automatic cleaning cycle. Compatible with voice assistants.',
    shortDescription: 'Smart coffee maker with app control and built-in grinder',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567339567655-6ba1bc3ce7b4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop'
    ],
    price: {
      current: 399,
      original: 499,
      currency: 'USD'
    },
    rating: 4.4,
    reviewCount: 780,
    features: [
      'Built-in coffee grinder',
      'App remote control',
      'Programmable brewing',
      'Temperature control',
      'Voice assistant compatible',
      'Auto-cleaning cycle'
    ],
    pros: [
      'Convenient app control',
      'Fresh ground coffee',
      'Consistent brewing quality',
      'Easy to clean'
    ],
    cons: [
      'Noisy grinder',
      'Large footprint',
      'Requires frequent maintenance'
    ],
    officialUrl: 'https://official-store.com/brewmaster-smart',
    category: 'home-appliances',
    tags: ['smart home', 'coffee maker', 'app control', 'grinder'],
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug)
}

export function getProductsByIds(ids: string[]): Product[] {
  return products.filter(product => ids.includes(product.id))
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}