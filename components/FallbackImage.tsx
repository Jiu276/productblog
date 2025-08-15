interface FallbackImageProps {
  productName: string
  category: string
  width?: number
  height?: number
  className?: string
}

export default function FallbackImage({ 
  productName, 
  category, 
  width = 400, 
  height = 300,
  className = ""
}: FallbackImageProps) {
  // Create a simple SVG placeholder
  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect x="10%" y="10%" width="80%" height="60%" rx="8" fill="#4f46e5"/>
      <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
        ${productName}
      </text>
      <text x="50%" y="65%" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="12">
        ${category.replace('-', ' ').toUpperCase()}
      </text>
      <circle cx="20%" cy="25%" r="15" fill="white" opacity="0.8"/>
      <circle cx="80%" cy="80%" r="20" fill="#059669" opacity="0.6"/>
    </svg>
  `
  
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`
  
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={dataUrl}
      alt={productName}
      width={width}
      height={height}
      className={className}
    />
  )
}