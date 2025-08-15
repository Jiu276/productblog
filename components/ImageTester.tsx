'use client'

import { useState } from 'react'
import BlogImage from './BlogImage'
import OptimizedImage from './OptimizedImage'
import { getBlogImage } from '@/lib/images'
import { resolveImage, getCategoryDefaultImage } from '@/lib/image-mappings'

interface ImageTestResult {
  title: string
  category: string
  resolvedImage: string
  categoryDefault: string
  smartImage: string
}

export default function ImageTester() {
  const [results, setResults] = useState<ImageTestResult[]>([])
  
  const testCases = [
    { title: 'iPhone 15 Pro In-Depth Review', category: 'smartphones' },
    { title: 'MacBook Pro M3 Review', category: 'laptops' },
    { title: 'AirPods Pro 2 Review', category: 'audio' },
    { title: 'iphone-15-pro-review', category: 'smartphones' },
    { title: 'Random Article Title', category: 'wearables' },
    { title: 'Test Blog Post', category: 'gaming' }
  ]
  
  const runTests = () => {
    const testResults = testCases.map(testCase => ({
      title: testCase.title,
      category: testCase.category,
      resolvedImage: resolveImage(testCase.title, testCase.category),
      categoryDefault: getCategoryDefaultImage(testCase.category),
      smartImage: getBlogImage(testCase.title, testCase.category)
    }))
    
    setResults(testResults)
  }
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">图片适配度测试</h2>
      
      <button 
        onClick={runTests}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
      >
        运行测试
      </button>
      
      {results.length > 0 && (
        <div className="space-y-8">
          {results.map((result, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
              <p className="text-gray-600 mb-4">分类: {result.category}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-medium mb-2">BlogImage组件</h4>
                  <BlogImage 
                    title={result.title}
                    category={result.category}
                    width={200}
                    height={150}
                    className="rounded border"
                  />
                  <p className="text-xs text-gray-500 mt-1">{result.smartImage}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">OptimizedImage组件</h4>
                  <OptimizedImage 
                    title={result.title}
                    category={result.category}
                    alt={result.title}
                    width={200}
                    height={150}
                    className="rounded border"
                    placeholder="blur"
                    priority={false}
                  />
                  <p className="text-xs text-gray-500 mt-1">优化版本</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">直接解析</h4>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={result.resolvedImage}
                    alt="Resolved"
                    width={200}
                    height={150}
                    className="rounded border object-cover"
                  />
                  <p className="text-xs text-gray-500 mt-1">{result.resolvedImage}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">分类默认</h4>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={result.categoryDefault}
                    alt="Category Default"
                    width={200}
                    height={150}
                    className="rounded border object-cover"
                  />
                  <p className="text-xs text-gray-500 mt-1">{result.categoryDefault}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">测试说明</h3>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          <li>智能解析结果：使用 BlogImage 组件，包含错误处理和回退机制</li>
          <li>直接解析：直接使用 resolveImage 函数的结果</li>
          <li>分类默认：使用分类对应的默认图片</li>
          <li>如果看到 &quot;AI Generated&quot; 标签，表示使用了生成的占位图</li>
        </ul>
      </div>
    </div>
  )
}