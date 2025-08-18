import ImageTester from '@/components/ImageTester'

export default function TestImagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Image Compatibility Test Page</h1>
        <ImageTester />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Image Testing - ProductBlog',
  description: 'Test article image compatibility and fallback mechanisms'
}