import React from "react";
import { Link } from "react-router-dom";

const FEATURED = [
  {
    id: 1,
    image: "/assets/ring-ad.png",
    heading: "Culture of Ring Design",
    description: "Get the latest platinum ring collection!",
    buttonText: "SHOP MORE",
    link: "/products/rings"
  },
  {
    id: 2,
    image: "/assets/bangles-ad.png",
    heading: "New Bangles Collection",
    description: "Catch the light of the latest trend!",
    buttonText: "SHOP MORE",
    link: "/products/bangles"
  }
];

const FeaturedProducts = () => (
  <section className="p-4 max-w-6xl md:max-w-full mx-auto">
           <h3 className="text-center text-lg font-medium text-gray-700 mb-6">Featured Products</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {FEATURED.map((item) => (
        <div
          key={item.id}
          className="relative overflow-hidden rounded shadow bg-white"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.heading}
            className="w-full h-60 object-cover md:h-64"
          />
          {/* Overlay text, top right */}
          <div className="absolute top-0 right-0 left-0 flex flex-col items-end pt-6 pr-6 pointer-events-none">
            <div className="w-full flex flex-col items-end">
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1 text-right">
                {item.heading}
              </h3>
              {item.description && (
                <div className="text-xs text-gray-500 mb-2 text-right">
                  {item.description}
                </div>
              )}
              <Link
                to={item.link}
                className="pointer-events-auto border border-gray-700 hover:bg-gray-900 hover:text-white transition text-gray-800 text-xs px-4 py-2 rounded mt-1"
              >
                {item.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedProducts;
