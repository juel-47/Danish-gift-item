// PopularCategories.jsx
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function PopularCategories({categories}) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-10 md:py-16 bg-gray">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            POPULAR CATEGORIES
          </h2>

          {/* <button className="bg-red text-white px-6 py-2.5 rounded-full text-sm md:text-base font-medium hover:bg-red-800 transition-colors duration-300">
            View All
          </button> */}
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={12}
            slidesPerView={2}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              480: {
                slidesPerView: 2.5,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 32,
              },
            }}
          >
            {categories.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center">
                    {item.image && !imageErrors[item.id] ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={() => handleImageError(item.id)}
                        className="w-47 h-full object-contain scale-50 group-hover:scale-75 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
                         <div className="w-12 h-12 bg-gray-200 rounded-full opacity-30" />
                      </div>
                    )}
                  </div>

                  <p className="mt-3 text-center text-sm md:text-base font-medium text-gray-700 group-hover:text-red transition-colors">
                    {item.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button className="swiper-button-prev-custom absolute -left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-3 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-red transition-colors">
            <span className="text-2xl md:text-3xl">←</span>
          </button>

          <button className="swiper-button-next-custom absolute -right-8 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-3 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-red transition-colors">
            <span className="text-2xl md:text-3xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
