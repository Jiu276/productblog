import { Product } from '@/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  title?: string
  showAll?: boolean
  emptyMessage?: string
}

export default function ProductGrid({ products, title, showAll = false, emptyMessage = "No products available" }: ProductGridProps) {
  const displayProducts = showAll ? products : products.slice(0, 6)

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <section className="py-8">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <div className="w-20 h-1 bg-primary-600 rounded"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {!showAll && products.length > 6 && (
        <div className="text-center mt-8">
          <button className="bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors">
            View More Products
          </button>
        </div>
      )}
    </section>
  )
}