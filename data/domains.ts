import { DomainConfig } from '@/types'

export const domainConfigs: DomainConfig[] = [
  {
    domain: 'tech-reviews.com',
    products: ['smartphone-x1', 'laptop-pro', 'smartwatch-elite'],
    theme: {
      primaryColor: '#2563eb',
      logo: '/logos/tech-reviews-logo.png'
    },
    seo: {
      title: 'Tech Reviews - Latest Technology Product Reviews',
      description: 'Professional technology product review platform covering the latest phones, laptops, smartwatches and more',
      keywords: ['tech reviews', 'phone reviews', 'laptop reviews', 'smartwatch reviews']
    },
    analytics: {
      googleAnalyticsId: 'G-XXXXXXXXXX'
    }
  },
  {
    domain: 'home-essentials.com',
    products: ['air-purifier-max', 'robot-vacuum-pro', 'smart-thermostat'],
    theme: {
      primaryColor: '#059669',
      logo: '/logos/home-essentials-logo.png'
    },
    seo: {
      title: 'Home Essentials - Smart Home Product Recommendations',
      description: 'Curated smart home products to make your home more comfortable and intelligent',
      keywords: ['smart home', 'air purifiers', 'robot vacuums', 'smart thermostats']
    }
  },
  {
    domain: 'fitness-gear.com',
    products: ['fitness-tracker', 'protein-powder-premium', 'yoga-mat-pro'],
    theme: {
      primaryColor: '#dc2626',
      logo: '/logos/fitness-gear-logo.png'
    },
    seo: {
      title: 'Fitness Gear - Professional Fitness Equipment Recommendations',
      description: 'Professional fitness equipment reviews and recommendations to help you achieve your perfect physique',
      keywords: ['fitness equipment', 'fitness trackers', 'protein powder', 'yoga mats']
    }
  },
  {
    domain: 'localhost:3000',
    products: ['smartphone-x1', 'laptop-pro', 'air-purifier-max', 'smartwatch-z2', 'wireless-headphones-ultra', 'gaming-keyboard-rgb', 'tablet-pro-12', 'smart-coffee-maker'],
    seo: {
      title: 'ProductHub - Professional Product Reviews',
      description: 'Professional product review and promotion platform providing you with authentic product experiences and purchase recommendations',
      keywords: ['product reviews', 'product recommendations', 'buying guide', 'product comparison']
    }
  },
  {
    domain: 'localhost:3001',
    products: ['smartphone-x1', 'laptop-pro', 'air-purifier-max', 'smartwatch-z2', 'wireless-headphones-ultra', 'gaming-keyboard-rgb', 'tablet-pro-12', 'smart-coffee-maker'],
    seo: {
      title: 'ProductHub - Professional Product Reviews',
      description: 'Professional product review and promotion platform providing you with authentic product experiences and purchase recommendations',
      keywords: ['product reviews', 'product recommendations', 'buying guide', 'product comparison']
    }
  }
]