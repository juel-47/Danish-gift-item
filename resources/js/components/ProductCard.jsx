import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const ProductCard = ({product}) => {
  const { settings } = usePage().props;
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`
                bg-white rounded-xl overflow-hidden border border-black/30 shadow-lg hover:shadow-md 
                transition-all duration-300    
              `} >
      {/* Product Image */}
      <div className="aspect-square relative bg-gray-100 overflow-hidden flex items-center justify-center">
        <Link href={`/product-details/${product.slug}`} className="w-full h-full flex items-center justify-center">
          {product.thumb_image && !imageError ? (
            <img
              src={product.thumb_image.startsWith('http') ? product.thumb_image : (product.thumb_image.startsWith('storage/') ? `/${product.thumb_image}` : `/storage/${product.thumb_image}`)}
              alt={product.name || "Product Image"}
              onError={() => setImageError(true)}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 opacity-40">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.587-1.587a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">No Image</span>
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 text-start">
        <Link href={`/product-details/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 min-h-10 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-2">
            {product.offer_price && product.offer_price > 0 ? (
                <>
                    <span className="text-sm font-semibold text-red-600">
                        {settings?.currency_icon || '$'}{product.offer_price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                        {settings?.currency_icon || '$'}{product.price}
                    </span>
                </>
            ) : (
                <span className="text-sm font-semibold text-gray-900">
                    {settings?.currency_icon || '$'}{product.price}
                </span>
            )}
        </div>

        <p className="mt-1 text-xs font-medium flex items-center gap-1.5">
          <span className={product.qty > 0 ? "text-green-600" : "text-red-500"}>●</span>
          {product.qty > 0 ? `In Stock ${product.qty}` : "Out of Stock"}
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