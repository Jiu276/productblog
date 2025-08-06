'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getBlogImage } from '@/lib/images'

interface BlogImageProps {
  title: string
  category?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  src?: string // Optional original image source
}

export default function BlogImage({ 
  title,
  category = 'default',
  width = 400, 
  height = 300, 
  className = '', 
  priority = false,
  src
}: BlogImageProps) {
  // Generate smart image URL based on title and category
  const smartImageUrl = getBlogImage(title, category, { width, height })
  const [imgSrc, setImgSrc] = useState(src || smartImageUrl)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      // Fallback to smart generated image
      setImgSrc(smartImageUrl)
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      )}
      <Image
        src={imgSrc}
        alt={title}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        unoptimized={true} // Allow external images
      />
      {hasError && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          AI Generated
        </div>
      )}
    </div>
  )
}