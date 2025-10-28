import React from "react";

// Replace with your actual image asset paths and alt text
const brands = [
  { name: "ikea", image: "/assets/ikea-brand-logo.png" },
  { name: "Joyalukkas", image: "/assets/joyallukas-brand-logo.png" },
  { name: "Tanishq", image: "/assets/tanishq-brand-logo.png" },
  { name: "Malabar", image: "/assets/malabar-brand-logo.png" },
  { name: "Zara", image: "/assets/zara-brand-logo.png" },
  { name: "Rayban", image: "/assets/rayban-brand-logo.png" },
  { name: "casio", image: "/assets/casio-brand-logo.png" },
];

const BrandEngagement = () => (
  <section className="py-12 px-2 max-w-7xl mx-auto w-full">
           <h3 className="text-center text-lg font-medium text-gray-700 mb-6">Brand Stores</h3>
    <div className="flex flex-wrap justify-center gap-8">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="bg-white rounded flex items-center justify-center w-36 h-28 
            transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <img
            src={brand.image}
            alt={brand.name}
            className="h-25 w-25 object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </section>
);

export default BrandEngagement;
