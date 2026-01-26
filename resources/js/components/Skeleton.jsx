import React from 'react';

const Skeleton = ({ className = "" }) => {
  return (
    <div className={`bg-gray-200 animate-pulse rounded-lg ${className}`}></div>
  );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden border border-black/30 shadow-sm animate-pulse">
            {/* Image Placeholder */}
            <div className="aspect-square bg-gray-200"></div>
            
            {/* Content Placeholder */}
            <div className="p-3 sm:p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                
                <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-12"></div>
                </div>
                
                <div className="space-y-2 mt-4">
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
}

export default Skeleton;
