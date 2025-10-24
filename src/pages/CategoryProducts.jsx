import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/Products';

const CategoryProducts = () => {
  const { id } = useParams();
  const filtered = products.filter((p) => (p.category || '').toLowerCase() === id.toLowerCase());

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">&larr; Back</Link>
        </div>
        <h2 className="text-2xl font-semibold mb-4 capitalize">{id}</h2>
        {filtered.length === 0 ? (
          <div className="text-gray-600">No products found for this category.</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
