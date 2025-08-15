import { headers } from 'next/headers'
import { getDomainConfig } from '@/lib/domain'
import Header from '@/components/Header'

export default async function ComparePage() {
  const headersList = headers()
  const host = headersList.get('host') || 'localhost:3000'
  
  const domainConfig = getDomainConfig(host)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        siteTitle={domainConfig?.seo.title || 'ProductHub'} 
        logo={domainConfig?.theme?.logo}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Comparison</h1>
          <div className="w-20 h-1 bg-primary-600 rounded"></div>
        </div>

        {/* Coming Soon Section */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Comparison Tool Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We&apos;re building an advanced product comparison tool to help you make better decisions. 
              Compare features, prices, and specifications side by side.
            </p>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">What You Can Expect</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Side-by-side Comparison</h4>
              <p className="text-sm text-gray-600">Compare multiple products in an easy-to-read format</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Price Tracking</h4>
              <p className="text-sm text-gray-600">Track price changes and find the best deals</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Smart Recommendations</h4>
              <p className="text-sm text-gray-600">Get personalized recommendations based on your needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Feature Highlighting</h4>
              <p className="text-sm text-gray-600">Highlight key differences and unique features</p>
            </div>
          </div>
        </div>

        {/* Popular Comparisons Preview */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Comparisons</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-2">iPhone vs Samsung Galaxy</h4>
              <p className="text-sm text-gray-600">Compare the latest flagship smartphones</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-2">MacBook vs ThinkPad</h4>
              <p className="text-sm text-gray-600">Professional laptop comparison</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-2">Air Purifiers</h4>
              <p className="text-sm text-gray-600">Find the best air purifier for your home</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-2">Gaming Headsets</h4>
              <p className="text-sm text-gray-600">Compare gaming audio equipment</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-2">Smart Watches</h4>
              <p className="text-sm text-gray-600">Fitness trackers and smartwatches</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-2">Robot Vacuums</h4>
              <p className="text-sm text-gray-600">Automated cleaning solutions</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6">Be the first to know when our comparison tool launches!</p>
          <a
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Browse Products Instead
          </a>
        </div>
      </main>
    </div>
  )
}