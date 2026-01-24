// FeaturedProducts.jsx
import React from "react";
import { products } from "../../data/data";
import ProductCard from "../ProductCard";

 
export default function FeaturedProducts() {
  return (
    <section className="py-10 md:py-16 bg-gray">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            FEATURED PRODUCTS
          </h2>

          <button className="bg-red text-white px-6 py-2.5 rounded-full text-sm md:text-base font-medium hover:bg-red-800 transition-colors duration-300 whitespace-nowrap">
            View All
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
