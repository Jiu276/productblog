// Image service for static HTML pages
// This is a JavaScript version of the image service utilities

// Color themes for different content types
const contentColors = {
  product: {
    smartphones: { bg: '4f46e5', text: 'ffffff' }, // Indigo
    laptops: { bg: '059669', text: 'ffffff' }, // Emerald  
    'home-appliances': { bg: 'dc2626', text: 'ffffff' }, // Red
    wearables: { bg: 'f59e0b', text: 'ffffff' }, // Amber
    audio: { bg: '7c3aed', text: 'ffffff' }, // Violet
    gaming: { bg: 'ef4444', text: 'ffffff' }, // Red
    default: { bg: '6366f1', text: 'ffffff' } // Blue
  },
  blog: {
    reviews: { bg: '3b82f6', text: 'ffffff' }, // Blue
    guides: { bg: '10b981', text: 'ffffff' }, // Emerald
    news: { bg: 'f59e0b', text: 'ffffff' }, // Amber  
    tutorials: { bg: '8b5cf6', text: 'ffffff' }, // Purple
    default: { bg: '6b7280', text: 'ffffff' } // Gray
  },
  hero: { bg: '1f2937', text: 'ffffff' }, // Dark gray
  feature: { bg: '3b82f6', text: 'ffffff' }, // Blue
  avatar: { bg: '6366f1', text: 'ffffff' } // Indigo
};

// Enhanced DummyImage with theme colors
function getDummyImageWithTheme(text, contentType, category, width = 400, height = 300) {
  let colors;
  
  if (contentType === 'product' && category && contentColors.product[category]) {
    colors = contentColors.product[category];
  } else if (contentType === 'blog' && category && contentColors.blog[category]) {
    colors = contentColors.blog[category];
  } else if (contentColors[contentType]) {
    colors = contentColors[contentType];
  } else {
    colors = contentColors.product.default;
  }
  
  const encodedText = encodeURIComponent(text);
  return `https://dummyimage.com/${width}x${height}/${colors.bg}/${colors.text}?text=${encodedText}`;
}

// Generate product images
function getProductImage(title, category = 'default', width = 400, height = 300) {
  return getDummyImageWithTheme(title, 'product', category, width, height);
}

// Generate blog post images
function getBlogImage(title, category = 'default', width = 400, height = 300) {
  const shortTitle = title.length > 20 ? title.substring(0, 20) + '...' : title;
  return getDummyImageWithTheme(shortTitle, 'blog', category, width, height);
}

// Generate hero/banner images
function getHeroImage(title, subtitle, width = 1200, height = 600) {
  const text = subtitle ? `${title}|${subtitle}` : title;
  return getDummyImageWithTheme(text, 'hero', undefined, width, height);
}

// Generate feature/section images  
function getFeatureImage(title, width = 300, height = 200) {
  return getDummyImageWithTheme(title, 'feature', undefined, width, height);
}

// Generate user avatar images
function getAvatarImage(name, width = 100, height = 100) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  return getDummyImageWithTheme(initials, 'avatar', undefined, width, height);
}

// Smart image selector - automatically chooses best image service based on content
function getSmartImage(options) {
  const { title, type, category, width = 400, height = 300 } = options;
  
  switch (type) {
    case 'product':
      return getProductImage(title, category, width, height);
    case 'blog':
      return getBlogImage(title, category, width, height);
    case 'hero':
      return getHeroImage(title, undefined, width, height);
    case 'feature':
      return getFeatureImage(title, width, height);
    case 'avatar':
      return getAvatarImage(title, width, height);
    default:
      return getDummyImageWithTheme(title, 'feature', category, width, height);
  }
}

// Utility function to create image element with automatic fallback
function createImageElement(src, alt, className = '', width, height) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.className = className;
  if (width) img.width = width;
  if (height) img.height = height;
  img.loading = 'lazy';
  
  // Add error handling
  img.onerror = function() {
    this.style.display = 'none';
    if (this.nextElementSibling && this.nextElementSibling.classList.contains('fallback-placeholder')) {
      this.nextElementSibling.style.display = 'flex';
    }
  };
  
  return img;
}

// Utility function to replace placeholder divs with actual images
function replacePlaceholderWithImage(placeholderElement, imageUrl, alt) {
  const img = createImageElement(imageUrl, alt, placeholderElement.className);
  
  // Create fallback div
  const fallbackDiv = document.createElement('div');
  fallbackDiv.className = placeholderElement.className + ' fallback-placeholder';
  fallbackDiv.style.display = 'none';
  fallbackDiv.innerHTML = placeholderElement.innerHTML;
  
  // Replace placeholder with image and fallback
  placeholderElement.parentNode.insertBefore(img, placeholderElement);
  placeholderElement.parentNode.insertBefore(fallbackDiv, placeholderElement);
  placeholderElement.remove();
}

// Global utility for easy access
window.ImageService = {
  getProductImage,
  getBlogImage,
  getHeroImage,
  getFeatureImage,
  getAvatarImage,
  getSmartImage,
  createImageElement,
  replacePlaceholderWithImage
};