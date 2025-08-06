import { DomainConfig } from '@/types'
import { domainConfigs } from '@/data/domains'

export function getDomainConfig(hostname: string): DomainConfig | null {
  const config = domainConfigs.find(config => 
    config.domain === hostname || 
    config.domain.replace('www.', '') === hostname.replace('www.', '')
  )
  
  return config || null
}

export function getProductsForDomain(hostname: string): string[] {
  const config = getDomainConfig(hostname)
  return config?.products || []
}

export function isDomainConfigured(hostname: string): boolean {
  return getDomainConfig(hostname) !== null
}

export function getAllConfiguredDomains(): string[] {
  return domainConfigs.map(config => config.domain)
}

export function getDefaultDomainConfig(): DomainConfig {
  return {
    domain: 'localhost:3000',
    products: ['default-product'],
    seo: {
      title: 'ProductHub - Professional Product Reviews',
      description: 'Professional product review and promotion platform providing you with authentic product experiences and purchase recommendations',
      keywords: ['product reviews', 'product recommendations', 'buying guide', 'product comparison']
    }
  }
}