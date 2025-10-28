import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/Products';
import { categoryDetails } from '../data/CategoryDetails';
import { Search } from 'lucide-react';

const CategoryProducts = () => {
  const { id } = useParams();
  const filtered = products.filter((p) => (p.category || '').toLowerCase() === id.toLowerCase());
  const details = categoryDetails[id] || {
    title: id.charAt(0).toUpperCase() + id.slice(1),
    description: "Explore our collection",
    subcategories: {},
    brands: []
  };

  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[600px] bg-gray-100">
        <div className="absolute inset-0">
          <img 
            src={details.bannerImage} 
            alt={details.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-start">
          <Link to="/" className="text-white mb-4 hover:underline pt-15">&larr; Back to Home</Link>
          <h1 className="text-4xl font-bold text-white mb-4">{details.title}</h1>
          <p className="text-gray-100 max-w-2xl">{details.description}</p>
        </div>
      </div>

      {/* Subcategories Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {Object.entries(details.subcategories).map(([name, { items }]) => (
            <div key={name} className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-medium text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">{items} items</p>
            </div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <option>Category</option>
              {Object.keys(details.subcategories).map(sub => (
                <option key={sub}>{sub}</option>
              ))}
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <option>Price</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>
        </div>
           {/* Brands Section */}
        {details.brands.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">Available Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {details.brands.map((brand) => (
                <div key={brand} className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="font-medium text-gray-900">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filtered.map((p) => <ProductCard key={p.id} product={p} category={id} />)}
          </div>
        )}

     
      </div>
    </section>
  );
};

export default CategoryProducts;
