'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center p-8 max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-red-100">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We apologize for the inconvenience. An unexpected error occurred while loading this page.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
              Error Details (Development Only)
            </summary>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm font-medium text-gray-700 mb-2">Error Message:</p>
              <p className="text-sm text-red-600 mb-4">{error.message}</p>
              
              {error.digest && (
                <>
                  <p className="text-sm font-medium text-gray-700 mb-2">Error Digest:</p>
                  <p className="text-sm text-gray-600 font-mono mb-4">{error.digest}</p>
                </>
              )}
              
              <p className="text-sm font-medium text-gray-700 mb-2">Stack Trace:</p>
              <pre className="text-xs text-gray-600 bg-white p-3 rounded border overflow-auto max-h-40">
                {error.stack}
              </pre>
            </div>
          </details>
        )}
      </div>
    </div>
  )
}