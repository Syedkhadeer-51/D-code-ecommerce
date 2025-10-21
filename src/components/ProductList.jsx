import React from 'react'
import ProductCard from './ProductCard'
import { products } from '../data/Products'

const ProductList = () => {
  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-xs mx-auto sm:max-w-full md:max-w-7xl4'> 
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
    </>
  )
}

export default ProductList      