import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Rotate3D } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import ProductMesh from '../scene/ProductMesh'
import { useCartDispatch, useCartState } from '../context/CartContext'

const ProductCard = ({ product, category }) => {
  const [show3D, setShow3D] = useState(false)
  const dispatch = useCartDispatch()
  const navigate = useNavigate()

  const formattedPrice = typeof product.price === 'number'
    ? product.price.toLocaleString('en-IN')
    : product.price

  const { wishlist } = useCartState()
  const isWishlisted = wishlist.some((it) => it.id === product.id)

  const addToWishlist = (e) => {
    e.stopPropagation()
    if (isWishlisted) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id })
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product })
    }
  }

  const handleBuy = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    // close modal if open and optionally navigate
    setShow3D(false)
  }

  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="relative rounded-md overflow-hidden bg-gray-50 mb-3">
        <div className="w-full h-56 sm:h-64 md:h-48 lg:h-56">
          <img
            className="w-full h-full object-cover"
            src={product.thumbnail}
            alt={product.name}
          />
        </div>

       
        <button
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={addToWishlist}
          aria-pressed={isWishlisted}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-sm ${isWishlisted ? 'bg-red-50 hover:bg-red-100' : 'bg-white hover:bg-gray-100'}`}
        >
          <Heart
            className={`w-5 h-5 ${isWishlisted ? 'text-red-500' : 'text-pink-500'}`}
            fill={isWishlisted ? 'currentColor' : 'none'}
          />
        </button>

       
        <button
          aria-label="view-3d"
          onClick={(e) => { e.stopPropagation(); setShow3D(true) }}
          className="absolute top-14 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 flex items-center justify-center"
        >
          <Rotate3D className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="px-1">
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2" title={product.name}>
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <div className="text-gray-900 font-semibold text-lg">₹{formattedPrice}</div>
        </div>

        <p className="text-gray-500 text-sm mb-3 line-clamp-3" title={product.description}>
          {product.description}
        </p>

        <Link
          to={`/product/${product.id}`}
          state={category ? { fromCategory: category } : undefined}
          className="block text-center bg-pink-50 text-pink-600 border border-pink-100 font-medium py-2 rounded-md hover:bg-pink-100 transition-colors"
        >
          View Details
        </Link>
      </div>

      {/* 3D Modal */}
      {show3D && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm"   onClick={(e) => {
      // Only close if backdrop itself is clicked, not its children
      if (e.target === e.currentTarget) setShow3D(false)
    }}>
          <div className="bg-white/95 w-[90%] md:w-3/4 lg:w-2/3 rounded-xl overflow-hidden relative">
          

            <div className="w-full h-[520px] bg-gray-50">
              <Canvas className="w-full h-full" camera={{ position: [0, 2, 5], fov: product.fov || 20 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} />
                <Suspense fallback={null}>
                  <ProductMesh modelUrl={product.model} position={product.position} rotation={product.rotation} />
                </Suspense>
                <OrbitControls makeDefault enablePan enableZoom enableRotate />
                <Environment preset="city" />
              </Canvas>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{product.name}</h4>
                <div className="text-gray-900 font-semibold">₹{formattedPrice}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBuy}
                  className="bg-pink-600 text-white px-5 py-2 rounded-full font-medium hover:bg-pink-700"
                >
                  Buy
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="bg-pink-600 text-white px-5 py-2 rounded-full font-medium hover:bg-pink-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
