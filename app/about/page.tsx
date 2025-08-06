import { headers } from 'next/headers'
import { getDomainConfig } from '@/lib/domain'
import Header from '@/components/Header'

export default async function AboutPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">About Us</h1>
          <div className="w-20 h-1 bg-primary-600 rounded"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At ProductHub, we&apos;re dedicated to providing honest, comprehensive, and unbiased product reviews 
              to help consumers make informed purchasing decisions. Our team of experienced reviewers tests 
              and evaluates products across various categories to bring you the most accurate information.
            </p>
            <p className="text-gray-600 mb-6">
              We believe that everyone deserves access to reliable product information before making a purchase. 
              That&apos;s why we&apos;re committed to transparency, thorough testing, and clear communication in all our reviews.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-500">Products Reviewed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">10K+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What Sets Us Apart</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Hands-on Testing</h4>
                  <p className="text-sm text-gray-600">Every product is thoroughly tested in real-world conditions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Unbiased Reviews</h4>
                  <p className="text-sm text-gray-600">Our opinions are independent and not influenced by manufacturers</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Expert Analysis</h4>
                  <p className="text-sm text-gray-600">Our team brings years of experience in technology and consumer products</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Regular Updates</h4>
                  <p className="text-sm text-gray-600">We keep our reviews current with software updates and long-term usage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <p className="text-gray-600 mb-6">
            Have a product you&apos;d like us to review? Questions about our testing process? We&apos;d love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@producthub.com"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}