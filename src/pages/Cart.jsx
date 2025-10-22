import React from 'react'
import { useCartState, useCartDispatch } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart } = useCartState();
  const dispatch = useCartDispatch();

  // Cart totals
  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/,/g, '')) * item.quantity, 0);
  const delivery = 150;
  const discount = 0.2 * subtotal; // Example 20%
  const total = subtotal - discount + delivery;

  return (
    <div className="min-h-[80vh] bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-6 rounded-lg font-bold transition-colors duration-200"
          >
            <ArrowRight size={20} className="rotate-180" />
            Back to Home
          </Link>
        </div>
        {/* Checkout Progress Bar */}
        <div className="mb-8 flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white font-semibold">1</span>
            <span className="mt-2 text-sm font-medium">Cart</span>
          </div>
          <div className="w-12 h-1 bg-gray-200 mx-2"></div>
          <div className="flex flex-col items-center text-gray-400">
            <span className="w-8 h-8 flex items-center justify-center rounded-full font-semibold border border-gray-300">2</span>
            <span className="mt-2 text-sm font-medium">Details</span>
          </div>
          <div className="w-12 h-1 bg-gray-200 mx-2"></div>
          <div className="flex flex-col items-center text-gray-400">
            <span className="w-8 h-8 flex items-center justify-center rounded-full font-semibold border border-gray-300">3</span>
            <span className="mt-2 text-sm font-medium">Complete</span>
          </div>
        </div>
        {/* Cart Layout */}
        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">Your cart is empty.</p>
            <Link to="/" className="text-blue-600 underline mt-4 inline-block">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-5">Your Cart</h2>
              <div className="space-y-6 cursor-pointer">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center justify-between px-4 py-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow gap-4 sm:gap-0"
                  >
                    {/* Product Image */}
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-40 h-40 rounded-xl border object-cover shadow ring-1 ring-gray-200 bg-white mb-2 sm:mb-0"
                    />
                    {/* Info */}
                    <div className="flex flex-col flex-1 min-w-0 sm:ml-5 w-full sm:w-auto text-center sm:text-left">
                      <span className="font-semibold text-base text-gray-900 truncate">{item.name}</span>
                      <span className="text-sm text-gray-500 mt-1">{item.brand}</span>
                    </div>
                    {/* Qty Controls */}
                    <div className="flex items-center gap-2 sm:mr-6 mt-2 sm:mt-0 ">
                      <button
                        onClick={() => dispatch({ type: 'DECREASE_QTY', payload: item.id })}
                        className="p-2 rounded bg-white border hover:bg-gray-100 transition cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-1 px-3 py-1 bg-gray-200 rounded font-semibold text-base leading-tight">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: 'INCREASE_QTY', payload: item.id })}
                        className="p-2 rounded bg-white border hover:bg-gray-100 transition cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {/* Price as a 'pill' */}
                    <span className="inline-block sm:mr-6 bg-gray-900 text-white px-4 py-2 rounded-full font-bold text-base tracking-wide shadow-sm mt-2 sm:mt-0 cursor-not-allowed">
                      ₹{parseFloat(item.price.replace(/,/g, '')) * item.quantity}
                    </span>
                    {/* Remove */}
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                      className="p-2 bg-red-50 hover:bg-red-100 rounded-xl text-red-500 transition flex items-center mt-2 sm:mt-0"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
              <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
              <div>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:ring-blue-200 mb-2"
                  placeholder="Coupon Code"
                />
                <button className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 w-full">Apply</button>
              </div>
              <div className="text-sm text-gray-500 flex flex-col gap-2 mt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount (20%)</span>
                  <span className="font-medium text-red-500">-₹{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-900">₹{delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2 text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button className="bg-gray-900 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                Go to Checkout <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart