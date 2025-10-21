import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="src\assets\D-code-logo.png"
                alt="Company Logo"
              />
            </Link>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden sm:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-75 px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={20} />
              </div>
            </div>
          </div>
          

          {/* Navigation Icons - hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
            </Link>
            <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5 text-gray-600" />
            </Link>
            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5 text-gray-600" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> :<Menu className="h-6 w-6" /> }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* Mobile search bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={20} />
              </div>
            </div>

            {/* Mobile navigation links */}
            <Link
              to="/cart"
              className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Heart className="h-5 w-5 mr-2" />
              Wishlist
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <User className="h-5 w-5 mr-2" />
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;