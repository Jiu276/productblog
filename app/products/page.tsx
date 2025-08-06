import { headers } from 'next/headers'
import { getDomainConfig, getProductsForDomain } from '@/lib/domain'
import { getProductsByIds } from '@/data/products'
import Header from '@/components/Header'
import FilteredProductList from '@/components/FilteredProductList'

export default async function ProductsPage() {
  const headersList = headers()
  const host = headersList.get('host') || 'localhost:3000'
  
  const domainConfig = getDomainConfig(host)
  const productIds = getProductsForDomain(host)
  const products = getProductsByIds(productIds)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        siteTitle={domainConfig?.seo.title || 'ProductHub'} 
        logo={domainConfig?.theme?.logo}
      />
      
      <main>
        <FilteredProductList 
          products={products}
          title="All Products"
        />
      </main>
    </div>
  )
}