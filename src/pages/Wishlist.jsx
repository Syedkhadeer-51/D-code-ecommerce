import React from 'react'
import { useCartState, useCartDispatch } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useCartState();
  const dispatch = useCartDispatch();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <div>
          <p>Your wishlist is empty.</p>
          <Link to="/" className="text-blue-600 underline mt-2 inline-block">Continue shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded shadow">
              <div className="flex items-center gap-4">
                <img src={item.thumbnail} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.brand}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold">₹{item.price}</div>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item.id })}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist