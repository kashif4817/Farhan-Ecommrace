'use client';

import { ShoppingCart, Glasses } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { getCartCount, toggleCart } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Row - Logo, Search, and Navigation */}
        <div className="flex items-center justify-between gap-4 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <img
              src="/logo.png"
              alt="Farhan Ainak Point"
              className="h-9 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Navigation Links - Right Side */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <Link
              href="/"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium text-[15px]"
            >
              Home
            </Link>
            <Link
              href="/deals"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium text-[15px]"
            >
              Deals
            </Link>
            <Link
              href="#categories"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium text-[15px]"
            >
              Categories
            </Link>
            <Link
              href="#products"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium text-[15px]"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium text-[15px]"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium text-[15px]"
            >
              Contact
            </Link>

            {/* Cart Icon for Desktop */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
