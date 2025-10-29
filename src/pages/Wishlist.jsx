import React, { useState } from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Search } from 'lucide-react';

const WishlistCard = ({ item, onRemove, onBuy, navigate }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col">
      <div 
        className="relative cursor-pointer" 
        onClick={() => navigate(`/product/${item.id}`)}
      >
        <img 
          src={item.thumbnail} 
          alt={item.name} 
          className="w-full h-48 object-cover mb-4 bg-gray-50 rounded-lg hover:opacity-90 transition-opacity"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm hover:bg-red-50"
        >
          <Heart className="w-5 h-5 text-red-500 fill-current" />
        </button>
      </div>
      <h3 
        className="font-medium text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-gray-700"
        onClick={() => navigate(`/product/${item.id}`)}
      >
        {item.name}
      </h3>
      <div className="flex items-center mb-1">
        <div className="flex items-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < (item.rating || 4) ? "fill-current" : "text-gray-300"} />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">(12)</span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="text-red-500 font-semibold">₹{item.price.toLocaleString()}</div>
        <button 
          onClick={() => onBuy(item)}
          className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const { wishlist } = useCartState();
  const dispatch = useCartDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredItems = wishlist.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuy = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button and Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Favorites</h1>
        <p className="text-gray-600 mb-4">Find your saved items and get ready to order them.</p>
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="search favorites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
          <Link 
            to="/" 
            className="inline-block bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onRemove={(id) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id })}
              onBuy={handleBuy}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist