'use client'

import { useState } from 'react'
import { FilterState, PriceRange } from '@/types'
import { priceRanges, categories } from '@/lib/filters'
import { ChevronDown, X, Filter } from 'lucide-react'

interface ProductFilterProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableTags: string[]
  isOpen: boolean
  onToggle: () => void
}

export default function ProductFilter({ 
  filters, 
  onFiltersChange, 
  availableTags,
  isOpen,
  onToggle 
}: ProductFilterProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    tags: false
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category
    })
  }

  const handlePriceRangeChange = (priceRange: PriceRange) => {
    onFiltersChange({
      ...filters,
      priceRange: filters.priceRange?.min === priceRange.min && 
                  filters.priceRange?.max === priceRange.max 
                  ? undefined 
                  : priceRange
    })
  }

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      minRating: filters.minRating === rating ? undefined : rating
    })
  }

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    
    onFiltersChange({
      ...filters,
      tags: newTags
    })
  }

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    onFiltersChange({
      ...filters,
      sortBy
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      tags: [],
      sortBy: 'popular'
    })
  }

  const hasActiveFilters = filters.category || filters.priceRange || filters.minRating || filters.tags.length > 0

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Filter className="w-4 h-4" />
          <span>Filter</span>
          {hasActiveFilters && (
            <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1">
              {(filters.category ? 1 : 0) + 
               (filters.priceRange ? 1 : 0) + 
               (filters.minRating ? 1 : 0) + 
               filters.tags.length}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white rounded-lg shadow-sm border p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filter Options</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-sm font-medium text-gray-900">Product Category</h4>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.category && (
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.category === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-sm font-medium text-gray-900">Price Range</h4>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.price && (
            <div className="mt-3 space-y-2">
              {priceRanges.map((range, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
                    onChange={() => handlePriceRangeChange(range)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="text-sm font-medium text-gray-900">Minimum Rating</h4>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.rating && (
            <div className="mt-3 space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{rating} stars & up</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Tag Filter */}
        {availableTags.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => toggleSection('tags')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-medium text-gray-900">Product Tags</h4>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.tags ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.tags && (
              <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Selected Filters */}
        {hasActiveFilters && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Selected Filters</h4>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <span className="inline-flex items-center bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                  {categories.find(c => c.id === filters.category)?.name}
                  <button
                    onClick={() => handleCategoryChange(filters.category!)}
                    className="ml-1 hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {filters.priceRange && (
                <span className="inline-flex items-center bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                  {filters.priceRange.label}
                  <button
                    onClick={() => onFiltersChange({ ...filters, priceRange: undefined })}
                    className="ml-1 hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {filters.minRating && (
                <span className="inline-flex items-center bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                  {filters.minRating} stars & up
                  <button
                    onClick={() => handleRatingChange(filters.minRating!)}
                    className="ml-1 hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {filters.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                  {tag}
                  <button
                    onClick={() => handleTagChange(tag)}
                    className="ml-1 hover:text-primary-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}