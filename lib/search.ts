import { Product } from '@/types'
import { BlogPost } from '@/types'

export interface SearchResult {
  type: 'product' | 'article'
  item: Product | BlogPost
  score: number
}

/**
 * 输入验证和清理
 */
export function validateAndCleanSearchQuery(query: string): string {
  if (!query || typeof query !== 'string') {
    return ''
  }
  
  // 长度限制
  if (query.length > 100) {
    throw new Error('Search query too long (max 100 characters)')
  }
  
  // 清理 HTML 标签和特殊字符
  const cleaned = query
    .replace(/<[^>]*>/g, '') // 移除 HTML 标签
    .replace(/[<>]/g, '') // 移除尖括号
    .trim()
  
  return cleaned
}

/**
 * 搜索产品
 */
export function searchProducts(products: Product[], query: string): SearchResult[] {
  const cleanQuery = validateAndCleanSearchQuery(query)
  if (!cleanQuery) return []
  
  const queryLower = cleanQuery.toLowerCase()
  const results: SearchResult[] = []
  
  products.forEach(product => {
    let score = 0
    
    // 产品名称匹配 (权重最高)
    if (product.name.toLowerCase().includes(queryLower)) {
      score += 10
    }
    
    // 短描述匹配
    if (product.shortDescription.toLowerCase().includes(queryLower)) {
      score += 8
    }
    
    // 完整描述匹配
    if (product.description.toLowerCase().includes(queryLower)) {
      score += 6
    }
    
    // 标签匹配
    product.tags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) {
        score += 5
      }
    })
    
    // 分类匹配
    if (product.category.toLowerCase().includes(queryLower)) {
      score += 4
    }
    
    // 功能特性匹配
    product.features.forEach(feature => {
      if (feature.toLowerCase().includes(queryLower)) {
        score += 3
      }
    })
    
    // SEO标题匹配
    if (product.seoTitle?.toLowerCase().includes(queryLower)) {
      score += 7
    }
    
    if (score > 0) {
      results.push({
        type: 'product',
        item: product,
        score
      })
    }
  })
  
  return results
}

/**
 * 搜索文章
 */
export function searchArticles(articles: BlogPost[], query: string): SearchResult[] {
  const cleanQuery = validateAndCleanSearchQuery(query)
  if (!cleanQuery) return []
  
  const queryLower = cleanQuery.toLowerCase()
  const results: SearchResult[] = []
  
  articles.forEach(article => {
    let score = 0
    
    // 标题匹配 (权重最高)
    if (article.title.toLowerCase().includes(queryLower)) {
      score += 10
    }
    
    // 摘要匹配
    if (article.excerpt.toLowerCase().includes(queryLower)) {
      score += 8
    }
    
    // 内容匹配
    if (article.content.toLowerCase().includes(queryLower)) {
      score += 5
    }
    
    // 标签匹配
    if (article.tags?.some(tag => tag.toLowerCase().includes(queryLower))) {
      score += 6
    }
    
    // 分类匹配
    if (article.category?.toLowerCase().includes(queryLower)) {
      score += 4
    }
    
    if (score > 0) {
      results.push({
        type: 'article',
        item: article,
        score
      })
    }
  })
  
  return results
}

/**
 * 综合搜索
 */
export function search(
  products: Product[], 
  articles: BlogPost[], 
  query: string,
  options?: {
    limit?: number
    includeProducts?: boolean
    includeArticles?: boolean
  }
): SearchResult[] {
  const { 
    limit = 20, 
    includeProducts = true, 
    includeArticles = true 
  } = options || {}
  
  let results: SearchResult[] = []
  
  if (includeProducts) {
    results = results.concat(searchProducts(products, query))
  }
  
  if (includeArticles) {
    results = results.concat(searchArticles(articles, query))
  }
  
  // 按分数排序并限制结果数量
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * 获取搜索建议
 */
export function getSearchSuggestions(
  products: Product[], 
  articles: BlogPost[], 
  query: string,
  limit: number = 5
): string[] {
  const cleanQuery = validateAndCleanSearchQuery(query)
  if (!cleanQuery || cleanQuery.length < 2) return []
  
  const queryLower = cleanQuery.toLowerCase()
  const suggestions = new Set<string>()
  
  // 从产品名称中提取建议
  products.forEach(product => {
    if (product.name.toLowerCase().includes(queryLower)) {
      suggestions.add(product.name)
    }
    
    // 从标签中提取建议
    product.tags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.add(tag)
      }
    })
  })
  
  // 从文章标题中提取建议
  articles.forEach(article => {
    if (article.title.toLowerCase().includes(queryLower)) {
      suggestions.add(article.title)
    }
  })
  
  return Array.from(suggestions).slice(0, limit)
}