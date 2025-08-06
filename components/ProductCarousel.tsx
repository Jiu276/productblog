'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductImage from './ProductImage'

interface ProductCarouselProps {
  images: string[]
  productName: string
}

export default function ProductCarousel({ images, productName }: ProductCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <ProductImage
          src={images[currentImage]}
          alt={`${productName} - Image ${currentImage + 1}`}
          width={600}
          height={600}
          className="w-full h-full object-cover"
          priority
          fallbackCategory="product"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex space-x-2 mt-4 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                index === currentImage
                  ? 'border-primary-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <ProductImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                fallbackCategory="product"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}