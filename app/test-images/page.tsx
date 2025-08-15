import ImageTester from '@/components/ImageTester'

export default function TestImagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">图片适配度测试页面</h1>
        <ImageTester />
      </div>
    </div>
  )
}

export const metadata = {
  title: '图片测试 - ProductBlog',
  description: '测试文章图片适配度和回退机制'
}