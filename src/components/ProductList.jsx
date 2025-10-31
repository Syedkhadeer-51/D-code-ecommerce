import React from 'react'
import ProductCard from './ProductCard'
import { products } from '../data/Products'

const ProductList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList