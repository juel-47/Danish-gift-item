// HeroSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const slides = [
  {
    title: "Discover Authentic Danish Souvenirs",
    description:
      "Handcrafted treasures that bring the spirit of Denmark to your home",
    image:
      "/hero1.webp",
    buttonText: "Shop Now",
  }, 
  {
    image:
      "/hero-banner.png",
 
  },
];

const HeroSlider = () => {
  return (
    <div className="relative w-full h-[70vh] min-h-150 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".custom-swiper-button-prev",
          nextEl: ".custom-swiper-button-next",
        }}
        pagination={{
          el: ".custom-swiper-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-dot"></span>`;
          },
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
        
            <div className="h-full flex items-center bg-red">
              <div className="container mx-auto px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left Content - Text */}
                  <div className="text-white space-y-6 md:space-y-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 max-w-xl">
                      {slide.description}
                    </p>

                    <div>
                      <button
                        className="
                          bg-red-600 hover:bg-red-700 
                          text-white font-medium 
                          px-8 py-4 rounded-full
                          transition-all duration-300
                          transform hover:scale-105
                          shadow-lg
                        "
                      >
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="hidden lg:block">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-[520px] object-cover"
                      />
                      {/* Optional subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        className="
          custom-swiper-button-prev 
          absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20
          w-14 h-14 md:w-16 md:h-16 
          flex items-center justify-center 
          rounded-full bg-white/20 backdrop-blur-sm
          text-white hover:bg-white/40 transition-all
          border border-white/30
        "
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        className="
          custom-swiper-button-next 
          absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20
          w-14 h-14 md:w-16 md:h-16 
          flex items-center justify-center 
          rounded-full bg-white/20 backdrop-blur-sm
          text-white hover:bg-white/40 transition-all
          border border-white/30
        "
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Custom Pagination Dots */}
      <div
        className="
          custom-swiper-pagination 
          absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          flex gap-4
        "
      />
    </div>
  );
};

export default HeroSlider;