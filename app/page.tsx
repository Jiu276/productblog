import { headers } from 'next/headers'
import { getDomainConfig, getProductsForDomain } from '@/lib/domain'
import { getProductsByIds } from '@/data/products'
import { getFeaturedArticles } from '@/data/articles'
import Header from '@/components/Header'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'
import Image from 'next/image'

export default async function HomePage() {
  const headersList = headers()
  const host = headersList.get('host') || 'localhost:3000'
  
  const domainConfig = getDomainConfig(host)
  const productIds = getProductsForDomain(host)
  const products = getProductsByIds(productIds)
  const featuredArticles = getFeaturedArticles(3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        siteTitle={domainConfig?.seo.title || 'ProductHub'} 
        logo={domainConfig?.theme?.logo}
      />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Product Review Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Providing you with authentic product experiences and purchase recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Browse Products
              </a>
              <a
                href="/blog"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Read Reviews
              </a>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ProductGrid 
            products={products} 
            title="Featured Product Recommendations"
          />
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Reviews & Guides</h2>
                <p className="text-gray-600 text-lg">Professional insights and buying guides to help you make informed decisions</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {featuredArticles.map((article) => (
                  <article key={article.id} className="bg-gray-50 rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
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
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                        <Link 
                          href={`/blog/${article.slug}`}
                          className="hover:text-primary-600 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {article.author.avatar && (
                            <Image
                              src={article.author.avatar}
                              alt={article.author.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          )}
                          <span className="text-sm text-gray-500">
                            {article.author.name}
                          </span>
                        </div>
                        
                        <Link 
                          href={`/blog/${article.slug}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          阅读更多 →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link 
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-gray-600 text-lg">Professional, objective, and trustworthy product review platform</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Reviews</h3>
                <p className="text-gray-600">In-depth experience with every product, providing the most objective review reports</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Updates</h3>
                <p className="text-gray-600">Bringing you the latest product review content as soon as possible</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Centered</h3>
                <p className="text-gray-600">Always centered on user needs, providing the most valuable purchase recommendations</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ProductHub</h3>
              <p className="text-gray-400">Professional product review and promotion platform</p>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Product Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/products?category=smartphones" className="hover:text-white">Smartphones</a></li>
                <li><a href="/products?category=laptops" className="hover:text-white">Laptops</a></li>
                <li><a href="/products?category=home-appliances" className="hover:text-white">Home Appliances</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Content</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/blog" className="hover:text-white">Review Articles</a></li>
                <li><a href="/compare" className="hover:text-white">Product Comparison</a></li>
                <li><a href="/about" className="hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@producthub.com</li>
                <li>Phone: +1-400-123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProductHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}