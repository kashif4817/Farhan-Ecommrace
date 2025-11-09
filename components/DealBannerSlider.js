'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import Link from 'next/link';

export default function DealBannerSlider({ deals }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (deals.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === deals.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [deals.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? deals.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === deals.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!deals || deals.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 overflow-hidden">
      {/* Slider Container */}
      <div className="relative h-[400px] sm:h-[450px] lg:h-[500px]">
        {deals.map((deal, index) => {
          const discount = deal.discount_percentage || 0;
          const originalPrice = deal.base_price;
          const finalPrice = originalPrice - (originalPrice * discount / 100);

          return (
            <div
              key={deal.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="grid lg:grid-cols-2 gap-8 items-center h-full py-12">
                  {/* Left Content */}
                  <div className="text-white space-y-6 z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <Tag className="h-5 w-5" />
                      <span className="text-sm font-semibold">
                        {deal.categories?.name || 'Special Offer'}
                      </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      {deal.name}
                    </h2>

                    <p className="text-lg sm:text-xl text-emerald-50 line-clamp-3">
                      {deal.description || 'Amazing deal on quality eyewear. Limited time offer!'}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-4">
                      <div>
                        <p className="text-sm text-emerald-100 mb-1">Now Only</p>
                        <p className="text-5xl sm:text-6xl font-bold">
                          Rs. {finalPrice.toFixed(0)}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-2xl text-emerald-100 line-through">
                          Rs. {originalPrice.toFixed(0)}
                        </p>
                        <div className="inline-block mt-2 px-3 py-1 bg-orange-500 rounded-lg">
                          <p className="text-xl font-bold text-white">
                            {discount}% OFF
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Link
                        href={`/category/${deal.category_id || ''}`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                      >
                        <span>Shop Now</span>
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="relative hidden lg:block">
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                      {deal.image_url ? (
                        <img
                          src={deal.image_url}
                          alt={deal.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                          <span className="text-9xl font-bold text-white/30">
                            {deal.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Floating Discount Badge */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white rotate-12">
                        <div className="text-center -rotate-12">
                          <p className="text-3xl font-bold text-white leading-none">
                            {discount}%
                          </p>
                          <p className="text-xs font-semibold text-white">OFF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {deals.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-emerald-700 rounded-full p-2 sm:p-3 shadow-lg transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-emerald-700 rounded-full p-2 sm:p-3 shadow-lg transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {deals.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
