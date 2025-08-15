import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Script from 'next/script'
import { getDomainConfig } from '@/lib/domain'
import { getProductBySlug } from '@/data/products'
import { generateProductJsonLd } from '@/lib/seo'
import Header from '@/components/Header'
import ProductCarousel from '@/components/ProductCarousel'
import ProsAndCons from '@/components/ProsAndCons'
import { Star, ExternalLink, ShoppingCart } from 'lucide-react'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const headersList = headers()
  const host = headersList.get('host') || 'localhost:3000'
  
  const domainConfig = getDomainConfig(host)
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const discountPercentage = product.price.original 
    ? Math.round(((product.price.original - product.price.current) / product.price.original) * 100)
    : 0

  const productJsonLd = generateProductJsonLd(product)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 结构化数据 */}
      <Script
        id="product-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <Header 
        siteTitle={domainConfig?.seo.title || 'ProductHub'} 
        logo={domainConfig?.theme?.logo}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <ProductCarousel images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-lg text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-primary-600">
                ${product.price.current.toLocaleString()}
              </span>
              {product.price.original && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price.original.toLocaleString()}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    Save {discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 mb-6">{product.shortDescription}</p>

            {/* Buy Buttons */}
            <div className="flex space-x-4 mb-8">
              <a
                href={product.affiliate?.url || product.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy Now
              </a>
              <a
                href={product.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Official Store
              </a>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Sections */}
        <div className="mt-16 space-y-12">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Overview</h2>
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pros and Cons */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pros & Cons</h2>
            <ProsAndCons pros={product.pros} cons={product.cons} />
          </section>

          {/* Specifications Table */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Product Name</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.name}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Category</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category.replace('-', ' ')}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Rating</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.rating}/5.0 ({product.reviewCount} reviews)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">Price</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${product.price.current.toLocaleString()}
                      {product.price.original && (
                        <span className="ml-2 text-gray-400 line-through">
                          ${product.price.original.toLocaleString()}
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Purchase?</h3>
            <p className="text-primary-100 mb-6">
              Get the best deal on {product.name} from our trusted partners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={product.affiliate?.url || product.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy Now - ${product.price.current.toLocaleString()}
              </a>
              <a
                href="/products"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                View More Products
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }

  const keywords = [
    product.name,
    ...product.tags,
    product.category,
    'review',
    'buying guide',
    'price comparison'
  ]

  return {
    title: product.seoTitle || `${product.name} Review - Professional Analysis & Buying Guide`,
    description: product.seoDescription || `In-depth review of ${product.name}. ${product.shortDescription} Compare prices, features, and get expert recommendations.`,
    keywords: keywords.join(', '),
    authors: [{ name: 'ProductHub Expert Team' }],
    openGraph: {
      type: 'article',
      title: product.name,
      description: product.shortDescription,
      images: product.images.map(image => ({
        url: image,
        width: 800,
        height: 600,
        alt: product.name
      })),
      url: `https://producthub.com/products/${product.slug}`,
      siteName: 'ProductHub',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
    alternates: {
      canonical: `https://producthub.com/products/${product.slug}`
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  const { products } = await import('@/data/products')
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}