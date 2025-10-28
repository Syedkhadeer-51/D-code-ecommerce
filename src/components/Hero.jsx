import React from "react";

const Hero = () => {
  const handleScroll = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-white min-h-[420px]">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: "url('/assets/d-code-hero-image.png')",
        }}
        aria-hidden
      />

      {/* Responsive grid: 1 col mobile, 12 cols desktop */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-8 pb-12 min-h-[420px] grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 items-center">
        {/* Image left, hidden visually but background persists */}
        <div className="hidden md:block md:col-span-8" />
        {/* Content right */}
        <div className="col-span-1 md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left py-8 px-2 md:px-8 bg-transparent md:bg-transparent">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-2 leading-tight drop-shadow">
            Introducing The <br />
            <span className="text-gray-900">Last Day Collection</span>
          </h1>
          <p className="text-gray-700 mb-4 md:mb-6">
            Ring, Occasion Pieces, Pandora & more collection
          </p>
          <button
            onClick={handleScroll}
            className="border border-red-400 text-red-500 hover:bg-red-500 hover:text-white font-medium px-6 py-2 rounded transition mb-3 md:mb-0"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
