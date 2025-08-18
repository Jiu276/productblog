'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Search, Clock, Tag, Star } from 'lucide-react'
import { search, SearchResult } from '@/lib/search'
import { products } from '@/data/products'
import { articles } from '@/data/articles'
import { Product, BlogPost } from '@/types'
import SearchBar from '@/components/SearchBar'
import ProductImage from '@/components/ProductImage'
import LoadingSpinner from '@/components/LoadingSpinner'
import Header from '@/components/Header'
import { getDomainConfig } from '@/lib/domain'

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  // Get domain config for header
  const host = typeof window !== 'undefined' ? window.location.host : 'localhost:3000'
  const domainConfig = getDomainConfig(host)
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    } else {
      setResults([])
      setTotalResults(0)
    }
  }, [searchQuery])

  const performSearch = async (query: string) => {
    setLoading(true)
    try {
      // 模拟搜索延迟
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const searchResults = search(products, articles, query, {
        limit: 50,
        includeProducts: true,
        includeArticles: true
      })
      
      setResults(searchResults)
      setTotalResults(searchResults.length)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    // 更新 URL
    const url = new URL(window.location.href)
    if (query) {
      url.searchParams.set('q', query)
    } else {
      url.searchParams.delete('q')
    }
    window.history.replaceState({}, '', url.toString())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        siteTitle={domainConfig?.seo.title || 'ProductHub'} 
        logo={domainConfig?.theme?.logo}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 搜索栏 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-6 w-6 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">Search</h1>
          </div>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            placeholder="Search products, articles, tags..."
          />
        </div>

        {/* 搜索结果状态 */}
        {searchQuery.trim() && (
          <div className="mb-6">
            {loading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <LoadingSpinner size="sm" />
                <span>Searching...</span>
              </div>
            ) : (
              <p className="text-gray-600">
                Found <span className="font-semibold text-gray-900">{totalResults}</span> results
                {searchQuery && (
                  <>
                    for: <span className="font-semibold text-primary-600">&ldquo;{searchQuery}&rdquo;</span>
                  </>
                )}
              </p>
            )}
          </div>
        )}

        {/* 搜索结果 */}
        {!loading && results.length > 0 && (
          <div className="space-y-6">
            {results.map((result, index) => (
              <SearchResultCard key={`${result.type}-${index}`} result={result} />
            ))}
          </div>
        )}

        {/* 无结果状态 */}
        {!loading && searchQuery.trim() && results.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              Try using different keywords or check spelling
            </p>
            <div className="text-sm text-gray-500">
              <p>Search suggestions:</p>
              <ul className="mt-2 space-y-1">
                <li>• Use more general keywords</li>
                <li>• Check if spelling is correct</li>
                <li>• Try using product brand or model</li>
              </ul>
            </div>
          </div>
        )}

        {/* 默认状态 */}
        {!searchQuery.trim() && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start searching</h3>
            <p className="text-gray-600">Enter keywords to search products and articles</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SearchResultCard({ result }: { result: SearchResult }) {
  if (result.type === 'product') {
    const product = result.item as Product
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <ProductImage
              src={product.images[0]}
              alt={product.name}
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Product
                  </span>
                  {product.tags.slice(0, 2).map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                >
                  {product.name}
                </Link>
                <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                  {product.shortDescription}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-primary-600">
                    ${product.price.current}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (result.type === 'article') {
    const article = result.item as BlogPost
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Article
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {new Date(article.publishedAt).toLocaleDateString('en-US')}
              </div>
              {article.tags?.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${article.slug}`}
              className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors block"
            >
              {article.title}
            </Link>
            <p className="text-gray-600 mt-2 text-sm line-clamp-3">
              {article.excerpt}
            </p>
            {article.author && (
              <div className="mt-3 text-xs text-gray-500">
                Author: {article.author.name}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function SearchPageContent() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  )
}