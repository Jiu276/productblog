import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/static/',
          '*.json',
          '/search'  // 暂时不让搜索引擎索引搜索页面
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/products/',
          '/blog/',
          '/about',
          '/compare'
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
        ],
      }
    ],
    sitemap: 'https://producthub.com/sitemap.xml',
    host: 'https://producthub.com'
  }
}