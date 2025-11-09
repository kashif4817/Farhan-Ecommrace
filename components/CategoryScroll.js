'use client';

import { DollarSign, GraduationCap, PenTool, Heart, Plane } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

// Icon mapping for categories
const categoryIcons = {
  'Investing': DollarSign,
  'Homework': GraduationCap,
  'Writing': PenTool,
  'Health': Heart,
  'Travel': Plane,
};

export default function CategoryScroll({ categories }) {
  const scrollRef = useRef(null);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Categories Container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.name] || DollarSign;

          return (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="flex-shrink-0"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                <IconComponent className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
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
