import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { getDomainConfig } from '@/lib/domain'
import { getArticleBySlug, getRecentArticles } from '@/data/articles'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const headersList = headers()
  const host = headersList.get('host') || 'localhost:3000'
  
  const domainConfig = getDomainConfig(host)
  const article = getArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }
  
  const relatedArticles = getRecentArticles(3).filter(a => a.id !== article.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        siteTitle={domainConfig?.seo.title || 'ProductHub'} 
        logo={domainConfig?.theme?.logo}
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary-600">首页</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-primary-600">博客</Link></li>
            <li>/</li>
            <li className="text-gray-900">{article.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {article.excerpt}
          </p>
          
          <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {article.author.avatar && (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-gray-900">{article.author.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              {article.readTime} 分钟阅读
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {article.content}
          </div>
        </article>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">标签</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">相关文章</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <article key={relatedArticle.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                  {relatedArticle.featuredImage && (
                    <div className="aspect-video relative">
                      <Image
                        src={relatedArticle.featuredImage}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                        {relatedArticle.category}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      <Link 
                        href={`/blog/${relatedArticle.slug}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {relatedArticle.title}
                      </Link>
                    </h4>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {relatedArticle.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${relatedArticle.slug}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      阅读更多 →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const { articles } = await import('@/data/articles')
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const article = getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  }
}