import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({product}) => {
  return (
    <div
      className={`
                bg-white rounded-xl overflow-hidden border border-black/30 shadow-lg hover:shadow-md 
                transition-all duration-300    
              `} >
      {/* Product Image */}
      <div className="aspect-square relative bg-gray p-4 flex items-center justify-center">
        <Link to="/product-details" >
          <img
            src={product.image ? (product.image.startsWith('http') ? product.image : (product.image.startsWith('storage/') ? `/${product.image}` : `/storage/${product.image}`)) : '/storage/uploads/default.jpg'}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 text-start">
        <Link to="/product-details">
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 min-h-10 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 text-sm font-semibold text-gray-900">
          {product.price}
        </p>

        <p className="mt-1 text-xs font-medium flex items-center   gap-1.5">
          <span className="text-green-600">●</span>
          In Stock 10
        </p>

        <button
          className="
                    mt-3 w-full bg-red text-white 
                    py-2 px-4 rounded-lg text-sm font-medium
                    hover:bg-red-800 active:scale-98 transition-all duration-200
                    flex items-center justify-center gap-2 cursor-pointer
                  "
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;