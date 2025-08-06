'use client'

import { useState, useMemo } from 'react'
import { Product, FilterState } from '@/types'
import { filterProducts, getAllTags, getInitialFilterState } from '@/lib/filters'
import ProductFilter from './ProductFilter'
import ProductGrid from './ProductGrid'
import SearchBar from './SearchBar'

interface FilteredProductListProps {
  products: Product[]
  title?: string
}

export default function FilteredProductList({ products, title }: FilteredProductListProps) {
  const [filters, setFilters] = useState<FilterState>(getInitialFilterState())
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const availableTags = useMemo(() => getAllTags(products), [products])
  
  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters)
  }, [products, filters])

  const handleSearchChange = (searchQuery: string) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: searchQuery || undefined
    }))
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {title && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <div className="w-20 h-1 bg-primary-600 rounded"></div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          searchQuery={filters.searchQuery || ''}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <ProductFilter
            filters={filters}
            onFiltersChange={handleFiltersChange}
            availableTags={availableTags}
            isOpen={isFilterOpen}
            onToggle={toggleFilter}
          />
        </div>

        {/* Product List */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Found <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
            </p>
            
            {/* Mobile close filter button */}
            {isFilterOpen && (
              <button
                onClick={toggleFilter}
                className="lg:hidden text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Close Filter
              </button>
            )}
          </div>

          <ProductGrid
            products={filteredProducts}
            showAll={true}
            emptyMessage={
              filters.searchQuery || filters.category || filters.priceRange || filters.minRating || filters.tags.length > 0
                ? "No products found matching your criteria. Please try adjusting your filters."
                : "No products available"
            }
          />
        </div>
      </div>
    </div>
  )
}