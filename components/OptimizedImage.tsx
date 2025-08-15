'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getBlogImage } from '@/lib/images'
import { getFallbackImage } from '@/lib/image-mappings'

interface OptimizedImageProps {
  src?: string
  alt: string
  title?: string
  category?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export default function OptimizedImage({ 
  src,
  alt,
  title,
  category = 'default',
  width = 400, 
  height = 300, 
  className = '', 
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) {
  // Smart image URL resolution
  const smartImageUrl = title ? getBlogImage(title, category, { width, height }) : src
  const [imgSrc, setImgSrc] = useState(smartImageUrl || src || '')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      
      // Try category fallback first
      const fallbackUrl = getFallbackImage(category)
      if (fallbackUrl && fallbackUrl !== imgSrc) {
        setImgSrc(fallbackUrl)
        return
      }
      
      // Generate smart fallback if we have title/category info
      if (title) {
        const generatedUrl = getBlogImage(title, category, { width, height })
        if (generatedUrl !== imgSrc) {
          setImgSrc(generatedUrl)
          return
        }
      }
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Generate low-quality placeholder if needed
  const generateBlurDataURL = () => {
    if (blurDataURL) return blurDataURL
    
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="20%" y="40%" width="60%" height="20%" fill="#e5e7eb"/>
      </svg>
    `
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
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
        className={`transition-all duration-300 ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? generateBlurDataURL() : undefined}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto'
        }}
        unoptimized={imgSrc.startsWith('http') && !imgSrc.startsWith('/images')}
      />
      
      {hasError && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          Smart Image
        </div>
      )}
      
      {/* SEO enhancement: add structured data for images */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "url": imgSrc,
            "name": alt,
            "description": alt,
            "width": width,
            "height": height
          })
        }}
      />
    </div>
  )
}