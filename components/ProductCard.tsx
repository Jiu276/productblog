import Link from 'next/link'
import { Product } from '@/types'
import { Star, ExternalLink } from 'lucide-react'
import ProductImage from './ProductImage'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.price.original 
    ? Math.round(((product.price.original - product.price.current) / product.price.original) * 100)
    : 0

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover-lift overflow-hidden border border-gray-100">
      <div className="relative group">
        <Link href={`/products/${product.slug}`}>
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-56 sm:h-64 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
            fallbackCategory={product.category}
          />
        </Link>
        {discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            -{discountPercentage}%
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 sm:p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 font-medium">
            {product.rating} <span className="text-gray-400">({product.reviewCount.toLocaleString()})</span>
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-bold text-primary-600">
              ${product.price.current.toLocaleString()}
            </span>
            {product.price.original && (
              <span className="text-lg text-gray-400 line-through">
                ${product.price.original.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-lg text-center font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            View Details
          </Link>
          <a
            href={product.affiliate?.url || product.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 px-4 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
            title="Visit Store"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}