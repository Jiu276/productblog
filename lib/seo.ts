import { Product, BlogPost } from '@/types'

/**
 * 生成产品页面的结构化数据 (JSON-LD)
 */
export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: extractBrandFromProduct(product.name)
    },
    offers: {
      '@type': 'Offer',
      price: product.price.current,
      priceCurrency: product.price.currency,
      availability: 'https://schema.org/InStock',
      url: product.officialUrl,
      seller: {
        '@type': 'Organization',
        name: 'ProductHub'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1
    },
    review: generateProductReviews(product),
    additionalProperty: product.features.map(feature => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature
    })),
    category: product.category,
    sku: product.id,
    url: `https://producthub.com/products/${product.slug}`
  }
}

/**
 * 生成文章页面的结构化数据 (JSON-LD)
 */
export function generateArticleJsonLd(article: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage || '/og-image.jpg',
    author: {
      '@type': 'Person',
      name: article.author?.name || 'ProductHub Team',
      url: article.author?.bio || 'https://producthub.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ProductHub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://producthub.com/logo.png'
      }
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    articleSection: article.category,
    keywords: article.tags?.join(', '),
    wordCount: estimateWordCount(article.content),
    url: `https://producthub.com/blog/${article.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://producthub.com/blog/${article.slug}`
    }
  }
}

/**
 * 生成组织信息的结构化数据
 */
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ProductHub',
    url: 'https://producthub.com',
    logo: 'https://producthub.com/logo.png',
    description: 'Professional product review and promotion platform',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@producthub.com'
    },
    sameAs: [
      'https://twitter.com/ProductHub',
      'https://facebook.com/ProductHub',
      'https://linkedin.com/company/ProductHub'
    ]
  }
}

/**
 * 生成网站导航的结构化数据
 */
export function generateSiteNavigationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: 'https://producthub.com',
    hasPart: [
      {
        '@type': 'SiteNavigationElement',
        name: 'Product Reviews',
        url: 'https://producthub.com/products'
      },
      {
        '@type': 'SiteNavigationElement', 
        name: 'Blog',
        url: 'https://producthub.com/blog'
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Compare',
        url: 'https://producthub.com/compare'
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'About',
        url: 'https://producthub.com/about'
      }
    ]
  }
}

/**
 * 生成搜索页面的结构化数据
 */
export function generateSearchActionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://producthub.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://producthub.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

// 辅助函数
function extractBrandFromProduct(productName: string): string {
  // 简单的品牌提取逻辑，可以根据需要改进
  const brands = ['iPhone', 'Samsung', 'MacBook', 'Dell', 'HP', 'Lenovo', 'Sony', 'LG']
  const foundBrand = brands.find(brand => 
    productName.toLowerCase().includes(brand.toLowerCase())
  )
  return foundBrand || 'Generic'
}

function generateProductReviews(product: Product) {
  // 生成示例评论结构化数据
  return [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.rating,
        bestRating: 5
      },
      author: {
        '@type': 'Person',
        name: 'ProductHub Expert Review'
      },
      reviewBody: `Professional review of ${product.name}. ${product.shortDescription}`,
      publisher: {
        '@type': 'Organization',
        name: 'ProductHub'
      }
    }
  ]
}

function estimateWordCount(content: string): number {
  return content.split(/\s+/).length
}

/**
 * 生成页面的SEO metadata
 */
export function generatePageMetadata(
  title: string,
  description: string,
  keywords?: string[],
  images?: string[],
  url?: string
) {
  return {
    title,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title,
      description,
      url: url || 'https://producthub.com',
      images: images?.map(image => ({
        url: image,
        width: 1200,
        height: 630,
        alt: title
      })) || []
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images || []
    }
  }
}