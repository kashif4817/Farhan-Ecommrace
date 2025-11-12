'use client';

import { useRef } from 'react';
import Link from 'next/link';

export default function CategoryScroll({ categories }) {
  const scrollRef = useRef(null);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        Categories - Quick Access
      </h3>
      {/* Categories Container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="flex-shrink-0"
            >
              <div className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-sm hover:shadow-md">
                <span className="text-sm font-medium whitespace-nowrap">
                  {category.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
