import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'makeup', label: 'Makeup', icon: '/assets/makeup.png' },
  { id: 'jewellery', label: 'Jewellery', icon: '/assets/jewellery.png' },
  { id: 'watches', label: 'Watches', icon: '/assets/watches.png' },
  { id: 'eyewear', label: 'Eyewear', icon: '/assets/eyewear.png' },
  { id: 'accessories', label: 'Accessories', icon: '/assets/accessories.png' },
  { id: 'footwear', label: 'Footwear', icon: '/assets/footwear.png' },
  { id: 'furniture', label: 'Furniture', icon: '/assets/furniture.png' },
];



const CategoryList = () => {
  return (
    <section className="py-8" id='categories'>
      <div className="max-w-6xl md:max-w-full mx-auto px-2">
        <h3 className="text-center text-lg font-medium text-gray-700 mb-6">Explore our Categories</h3>

        <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center gap-2 focus:outline-none">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center bg-white shadow`}>
                {cat.icon ? (
                  <img src={cat.icon} alt={cat.label} className="w-25 h-25 object-contain" />
                ) : (
                  <span className="font-semibold text-lg text-gray-700">{cat.label[0]}</span>
                )}
              </div>
              <span className="text-xs text-gray-600 tracking-widest">{cat.label.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
 