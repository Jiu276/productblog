'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getPlaceholderImage, getSmartImage } from '@/lib/images'
import { getFallbackImage } from '@/lib/image-mappings'

interface ProductImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fallbackCategory?: string
  contentType?: 'product' | 'blog' | 'hero' | 'feature' | 'avatar'
  smartFallback?: boolean // Use smart image generation as primary fallback
}

export default function ProductImage({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  className = '', 
  priority = false,
  fallbackCategory = 'product',
  contentType = 'product',
  smartFallback = true
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    console.log('ProductImage error for src:', imgSrc)
    if (!hasError) {
      setHasError(true)
      
      // Try category-specific fallback first
      const categoryFallback = getFallbackImage(fallbackCategory)
      if (categoryFallback && categoryFallback !== imgSrc) {
        console.log('Trying category fallback:', categoryFallback)
        setImgSrc(categoryFallback)
        return
      }
      
      // Use smart image generation as fallback
      if (smartFallback) {
        const smartImg = getSmartImage({
          title: alt,
          type: contentType,
          category: fallbackCategory,
          width,
          height
        })
        console.log('Using smart image fallback:', smartImg)
        setImgSrc(smartImg)
      } else {
        // Final fallback to placeholder image
        const placeholder = getPlaceholderImage({ width, height, category: fallbackCategory })
        console.log('Using placeholder fallback:', placeholder)
        setImgSrc(placeholder)
      }
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto'
        }}
        unoptimized={imgSrc.startsWith('http')} // Only disable optimization for external images
      />
      {hasError && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Generated Image
        </div>
      )}
    </div>
  )
}