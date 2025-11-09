'use client';

import { ShoppingCart, Glasses } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { getCartCount, toggleCart } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Logo and Cart */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
              <Glasses className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                Farhan Ainak Point
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                Your Vision, Our Mission
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium text-sm"
            >
              Home
            </Link>
            <Link
              href="/deals"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium text-sm"
            >
              Deals
            </Link>
            <Link
              href="#categories"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium text-sm"
            >
              Categories
            </Link>
            <Link
              href="#products"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium text-sm"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium text-sm"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium text-sm"
            >
              Contact
            </Link>
          </div>

          {/* Cart Button - Desktop Only */}
          <div className="hidden md:flex items-center">
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Row - Mobile and Desktop */}
        <div className="pb-3 md:pb-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
