import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, category }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-lg p-4 m-3 flex flex-col justify-between bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="overflow-hidden rounded-md h-50 w-full mb-4">
        <img 
          className="h-full w-full object-cover" 
          src={product.thumbnail} 
          alt={product.name} 
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h2 className="font-semibold text-xl mb-1 truncate" title={product.name}>
          {product.name}
        </h2>
        <p className="text-blue-600 font-bold text-lg mb-2">
          ₹{product.price}
        </p>
        <p 
          className="text-gray-600 text-sm flex-grow overflow-hidden line-clamp-3" 
          title={product.description}
        >
          {product.description}
        </p>
      </div>
      <Link
        to={`/product/${product.id}`}
        state={category ? { fromCategory: category } : undefined}
        className="mt-4 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
      >
        View in 3D
      </Link>
    </div>
  )
}

export default ProductCard
