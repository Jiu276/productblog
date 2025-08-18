import { headers } from 'next/headers'
import { getDomainConfig } from '@/lib/domain'
import { getRecentArticles } from '@/data/articles'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

export default async function BlogPage() {
  const headersList = headers()
  const host = headersList.get('host') || 'localhost:3000'
  
  const domainConfig = getDomainConfig(host)
  const articles = getRecentArticles(12)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        siteTitle={domainConfig?.seo.title || 'ProductHub'} 
        logo={domainConfig?.theme?.logo}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog & Reviews</h1>
          <div className="w-20 h-1 bg-primary-600 rounded"></div>
          <p className="text-gray-600 mt-4">
            Discover the latest product reviews, buying guides, and tech insights
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              {article.featuredImage && (
                <div className="aspect-video relative">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {article.readTime} min read
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {article.author.avatar && (
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {article.author.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString('en-US')}
                      </p>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Articles Yet</h2>
              <p className="text-gray-600">
                We&apos;re working on bringing you amazing content. Check back soon!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}