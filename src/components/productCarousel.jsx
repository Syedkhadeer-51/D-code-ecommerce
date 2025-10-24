import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Replace with your product data
const products = [
  {
    id: 1,
    image: "/assets/makeup-carousel.png",
    category: "MAKEUP",
    name: "Floral Fantasy Eyeshadow Palette",
    price: "Rs. 59.00 – Rs. 39.00"
  },
  {
    id: 2,
    image: "/assets/watch-carousel.png",
    category: "WATCHES",
    name: "Elegant Silver Wristwatch",
    price: "Rs. 3199.00"
  },
  {
    id: 3,
    image: "/assets/eyewear-carousel.png",
    category: "EYEWEAR",
    name: "UV protection Sunglasses",
    price: "Rs. 2249.00"
  },
  {
    id: 4,
    image: "/assets/shoe-carousel.png",
    category: "FOOTWEAR",
    name: "The new converse shoes",
    price: "Rs. 2159.00"
  },
  {
    id: 5,
    image: "/assets/carousel-furniture.png",
    category: "Furniture",
    name: "Comfortable bean bags",
    price: "Rs. 1599.00"
  },
  {
    id: 6,
    image: "/assets/shoe-carousel.png",
    category: "Accessories",
    name: "Circle of Light Heart Earrings",
    price: "Rs. 159.00"
  },

];

const ProductCarousel = () => {
  const [index, setIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const containerRef = useRef();

  // Responsive visible count
  const getVisibleCount = () => {
    if (screenWidth < 640) return 1; // mobile
    if (screenWidth < 768) return 2; // small tablet
    if (screenWidth < 1280) return 3; // tablet/laptop
    return 4; // desktop
  };

  const visibleCount = getVisibleCount();

  // Create an array with duplicated items for infinite scroll
  const extendedProducts = [...products, ...products.slice(0, visibleCount)];
  const totalSlides = Math.ceil(products.length / visibleCount);

  // Update screen width on resize
  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToSlide = (i) => {
    setIndex(i);
  };

  const handleLeft = () => {
    setIndex(prev => {
      if (prev === 0) {
        // If at the start, jump to the end
        return totalSlides - 1;
      }
      return prev - 1;
    });
  };

  const handleRight = () => {
    setIndex(prev => {
      if (prev >= totalSlides - 1) {
        // If at the end, jump to the start
        return 0;
      }
      return prev + 1;
    });
  };

  const getWidth = () => {
    if (screenWidth < 640) return "w-full flex-shrink-0 px-3 pb-2"; // mobile - full width
    if (screenWidth < 768) return "w-1/2 flex-shrink-0 px-3 pb-2"; // small tablet - 2 items
    if (screenWidth < 1280) return "w-1/3 flex-shrink-0 px-3 pb-2"; // tablet/laptop - 3 items
    return "w-1/4 flex-shrink-0 px-3 pb-2"; // desktop - 4 items
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-8">
      {/* Carousel */}
      <div className="relative">
        <button
          aria-label="Scroll Left"
          onClick={handleLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white shadow rounded-full p-2 border border-gray-200"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          aria-label="Scroll Right"
          onClick={handleRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white shadow rounded-full p-2 border border-gray-200"
        >
          <ChevronRight size={22} />
        </button>
        {/* Track */}
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * 100}%)`
            }}
          >
            {extendedProducts.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className={getWidth()}>
                <div className="bg-white rounded-xl shadow flex flex-col items-center py-4 px-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 object-contain mb-2"
                  />
                  <div className="text-xs text-gray-400 mt-2 uppercase tracking-wide">
                    {item.category}
                  </div>
                  <div className="font-medium text-lg text-gray-700 mt-1">{item.name}</div>
                  <div className="text-gray-800 text-base font-semibold mt-1">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {[...Array(totalSlides)].map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${index === i ? "bg-gray-800" : "bg-gray-300"
              }`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
