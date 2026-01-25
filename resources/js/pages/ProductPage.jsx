 // ShopPage.jsx
import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { products } from "../data/data";

const ProductPage = () => {
  const [activeFilters, setActiveFilters] = useState({
    price: [200, 1200],
    colors: [],
    sizes: [],
    categories: [],          // ← NEW
    brands: [],              // ← NEW
    sort: "newest",
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
 
 
  // Available filter options
  const categories = ["Apparel", "Accessories", "Home & Kitchen", "Jewelry", "Souvenirs"];
  const brands = ["Copenhagen Collection", "Nordic Soul", "Danish Gifts"];

  const toggleFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const removeFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((v) => v !== value),
    }));
  };

  const clearAllFilters = () =>
    setActiveFilters({
      price: [200, 1200],
      colors: [],
      sizes: [],
      categories: [],
      brands: [],
      sort: "newest",
    });

  // Simple filtering logic
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      activeFilters.categories.length === 0 ||
      activeFilters.categories.includes(product.category);

    const matchBrand =
      activeFilters.brands.length === 0 ||
      activeFilters.brands.includes(product.brand);

    return matchCategory && matchBrand;
    // You can later add colors, sizes, price range...
  });

  // Optional: sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (activeFilters.sort === "price-low") return a.price - b.price;
    if (activeFilters.sort === "price-high") return b.price - a.price;
    // "newest" → keep original order (or implement date logic)
    return 0;
  });

  return (
    <div className="min-h-screen">
      <div className="container px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <Breadcrumb
          customItems={[
            { name: "Danish Souvenirs", url: "/souvenirs" },
            { name: "Apparel", url: "/souvenirs/apparel" }, // or current category
          ]}
        /> 

        {/* ==================== FILTER & SORT BAR ==================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              All Products
            </h2>
            <span className="text-gray-600">
              ({sortedProducts.length} items)
            </span>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <select
              value={activeFilters.sort}
              onChange={(e) =>
                setActiveFilters((prev) => ({ ...prev, sort: e.target.value }))
              }
              className="border border-gray rounded-lg px-4 py-2 bg-white text-gray-700 text-sm md:text-base outline-0"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="popular">Most Popular</option>
            </select>

            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden bg-white border border-gray px-5 py-2 rounded-lg font-medium"
            >
              Filters
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(activeFilters.categories.length > 0 ||
          activeFilters.brands.length > 0 ||
          activeFilters.colors.length > 0 ||
          activeFilters.sizes.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeFilters.categories.map((cat) => (
              <div
                key={cat}
                className="bg-red-50 text-[var(--color-red)] px-4 py-1.5 rounded-full text-sm flex items-center gap-2"
              >
                {cat}
                <button
                  onClick={() => removeFilter("categories", cat)}
                  className="font-bold text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}

            {activeFilters.brands.map((brand) => (
              <div
                key={brand}
                className="bg-red-50 text-[var(--color-red)] px-4 py-1.5 rounded-full text-sm flex items-center gap-2"
              >
                {brand}
                <button
                  onClick={() => removeFilter("brands", brand)}
                  className="font-bold text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}

            {activeFilters.colors.map((color) => (
              <div
                key={color}
                className="bg-red-50 text-[var(--color-red)] px-4 py-1.5 rounded-full text-sm flex items-center gap-2"
              >
                {color}
                <button
                  onClick={() => removeFilter("colors", color)}
                  className="font-bold text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}

            {activeFilters.sizes.map((size) => (
              <div
                key={size}
                className="bg-red-50 text-[var(--color-red)] px-4 py-1.5 rounded-full text-sm flex items-center gap-2"
              >
                Size {size}
                <button
                  onClick={() => removeFilter("sizes", size)}
                  className="font-bold text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}

            <button
              onClick={clearAllFilters}
              className="text-gray-600 hover:text-[var(--color-red)] text-sm underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white p-6 rounded-xl border border-[var(--color-gray)] sticky top-6">
              <h3 className="text-lg font-bold mb-6">Filters</h3>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Price Range</h4>
                <div className="space-y-2">
                  <input type="range" min="0" max="2000" className="w-full" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>DKK 0</span>
                    <span>DKK 2000+</span>
                  </div>
                </div>
              </div>

              {/* Categories - Multi Select */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.categories.includes(cat)}
                        onChange={() => toggleFilter("categories", cat)}
                        className="h-4 w-4 text-[var(--color-red)] border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands - Multi Select */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Brands</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.brands.includes(brand)}
                        onChange={() => toggleFilter("brands", brand)}
                        className="h-4 w-4 text-[var(--color-red)] border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Colors</h4>
                <div className="flex flex-wrap gap-3">
                  {["Red", "White", "Black", "Navy", "Green"].map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleFilter("colors", c)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        activeFilters.colors.includes(c)
                          ? "border-[var(--color-red)] scale-110 shadow-md"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{
                        backgroundColor:
                          c.toLowerCase() === "red"
                            ? "#A60A07"
                            : c.toLowerCase(),
                      }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="font-medium mb-4">Sizes</h4>
                <div className="grid grid-cols-5 gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleFilter("sizes", s)}
                      className={`border rounded-md py-2 text-sm font-medium transition-all ${
                        activeFilters.sizes.includes(s)
                          ? "border-[var(--color-red)] bg-red-50 text-[var(--color-red)]"
                          : "border-[var(--color-gray)] hover:border-[var(--color-red)]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {sortedProducts.map((product) => (
                 <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="bg-red text-white cursor-pointer px-10 py-3.5 rounded-lg font-medium hover:bg-red-800 transition-colors">
                Load More Products
              </button>
            </div>
          </main>
        </div>

        {/* Mobile Filters – ADD CATEGORIES & BRANDS */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:hidden">
            <div className="bg-white w-full rounded-t-2xl max-h-[85vh] overflow-y-auto">
              <div className="p-5 border-b border-gray flex justify-between items-center">
                <h3 className="text-xl font-bold">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="p-5 space-y-8">
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-4">Categories</h4>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.categories.includes(cat)}
                          onChange={() => toggleFilter("categories", cat)}
                          className="h-5 w-5 text-red border-gray-300 rounded"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="font-medium mb-4">Brands</h4>
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters.brands.includes(brand)}
                          onChange={() => toggleFilter("brands", brand)}
                          className="h-5 w-5 text-red border-gray-300 rounded"
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
 
                  {/* Colors */}
                  <div>
                    <h4 className="font-medium mb-4">Colors</h4>
                    <div className="flex flex-wrap gap-3">
                      {["Red", "White", "Black", "Navy", "Green"].map((c) => (
                        <button
                          key={c}
                          onClick={() => toggleColor(c)}
                          className={`w-12 h-12 rounded-full border-2 transition-all ${
                            activeFilters.colors.includes(c)
                              ? "border-[var(--color-red)] scale-110 shadow-md"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          style={{
                            backgroundColor:
                              c.toLowerCase() === "red"
                                ? "#A60A07"
                                : c.toLowerCase(),
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h4 className="font-medium mb-4">Sizes</h4>
                    <div className="grid grid-cols-5 gap-3">
                      {["S", "M", "L", "XL", "XXL"].map((s) => (
                        <button
                          key={s}
                          onClick={() => toggleSize(s)}
                          className={`border rounded-md py-3 text-base font-medium transition-all ${
                            activeFilters.sizes.includes(s)
                              ? "border-[var(--color-red)] bg-red-50 text-[var(--color-red)]"
                              : "border-[var(--color-gray)] hover:border-[var(--color-red)]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                
              </div>

              <div className="p-5 border-t border-gray flex gap-4">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 border border-gray-400 py-3 rounded-lg font-medium"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-red text-white py-3 rounded-lg font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        {/* ... remains unchanged ... */}
      </div>
    </div>
  );
};

export default ProductPage;