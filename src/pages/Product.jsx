import React from 'react';
import { products } from '../data/Products';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Share2, Star, CircleChevronLeft, Rotate3D, ZoomIn } from 'lucide-react';
import ProductMesh from '../scene/ProductMesh';
import { useCartDispatch } from '../context/CartContext';



const Product = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  if (!product) {
    return <div>Product not found</div>;
  }
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Back to Home Button */}
        <div className="mb-8 flex">
          <Link
            to="/"
            className="bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-6 rounded-lg font-bold transition-colors duration-200 flex items-center"
          >
            <CircleChevronLeft size={20} className="text-white mr-2" />

            Back to Home
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-xl p-6">
          {/* Left: 3D Canvas */}
          <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 rounded-xl p-4">
            <div className="w-full h-[320px] md:h-[440px] max-w-lg">
              <Canvas className="w-full h-full" camera={{ position: [0, 2, 5], fov: product.fov || 20 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} />
                <Suspense fallback={null}>
                  <ProductMesh modelUrl={product.model} />
                </Suspense>
                <OrbitControls makeDefault enablePan enableZoom enableRotate />
                <Environment preset="city" />
              </Canvas>
              {/* 3D Interaction Instructions */}
              <div className="my-3 bg-gray-100 rounded-md py-2 px-4 text-gray-700 text-xs flex items-center gap-3 shadow-sm w-fit mx-auto">
                <span className="flex items-center gap-1">
                  <Rotate3D size={18} className="mr-1" />
                  <span>Orbit: Drag with mouse</span>
                </span>
                <span className="flex items-center gap-1 border-l pl-3">
                  <ZoomIn size={18} className="mr-1" />
                  <span>Zoom: Use Scroll wheel</span>
                </span>

              </div>
            </div>
          </div>
          {/* Right: Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {/* Price & Info */}
            <div className="mb-1">
              <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded font-semibold mr-2">
                {product.discount ? `-${product.discount}%` : ''}
              </span>
              <span className="text-sm font-light text-gray-500">{product.brand}</span>
            </div>
            <h1 className="font-semibold text-2xl mb-1">{product.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
              <span className="flex items-center text-yellow-500 text-base">
                <Star fill="currentColor" size={18} className="mr-1" />
                {product.ratings}
                <span className="text-xs text-gray-600 ml-1">(12 reviews)</span>
              </span>
            </div>
            {/* Description as bullet points */}
            <ul className="text-gray-700 text-sm mb-4 list-disc list-inside space-y-1">
              <li>{product.description}</li>
              <li>High-quality materials and craftsmanship.</li>
              <li>Perfect for everyday use and special occasions.</li>
            </ul>
            {/* CTA Button */}
            <button
              onClick={() => {
                // add to cart and navigate to cart page
                dispatch({ type: 'ADD_TO_CART', payload: product });
                navigate('/cart');
              }}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 mt-3 mb-2 rounded-lg font-bold transition-colors duration-200"
            >
              Add To Cart
            </button>
            {/* Wishlist and share row */}
            <div className="flex items-center gap-6 mb-6">
              <button
                onClick={() => {
                  dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
                  navigate('/wishlist');
                }}
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
              >
                <Heart size={18} className="mr-1" /> Wishlist
              </button>
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                <Share2 size={18} className="mr-1" /> Share
              </button>
            </div>
            {/* Delivery, Shipping & Payment info */}
            <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm">
              <div className="mb-1 text-gray-700">Estimated Delivery: <span className="font-medium">Up to 4 business days</span></div>
              <div className="mb-1 text-gray-700">Free Shipping & Returns: <span className="font-medium">On all orders over ₹2000</span></div>
              <div className="mt-2 flex gap-4 items-center">
                <span className="font-medium text-gray-600">Guaranteed Safe And Secure Checkout:</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
