'use client';

import Link from 'next/link';

export default function CategoryScroll({ categories, showLimit = 6 }) {
  if (!categories || categories.length === 0) {
    return null;
  }

  const displayedCategories = categories.slice(0, showLimit);
  const hasMore = categories.length > showLimit;

  console.log('Categories in CategoryScroll:', categories.map(c => ({ name: c.name, image_url: c.image_url })));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 uppercase tracking-wide">
          Shop by Category
        </h3>
        {hasMore && (
          <Link
            href="/categories"
            className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium whitespace-nowrap"
          >
            View All →
          </Link>
        )}
      </div>

      {/* Horizontal Scrollable Categories */}
      <div
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group flex-shrink-0"
            >
              <div className="flex flex-col items-center w-20 sm:w-24">
                {/* Category Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-200 shadow-md group-hover:shadow-lg transition-all duration-300 mb-2 relative">
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      style={{ display: 'block' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
                      <span className="text-2xl sm:text-3xl text-emerald-600">📦</span>
                    </div>
                  )}
                </div>

                {/* Category Name */}
                <h4 className="text-xs sm:text-sm font-semibold text-gray-800 text-center line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200 w-full">
                  {category.name}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
