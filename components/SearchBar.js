'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useProductCache } from '@/contexts/ProductCacheContext';
import Link from 'next/link';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const { searchProducts } = useProductCache();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = searchProducts(searchQuery);
      setSuggestions(results.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, searchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="w-full relative">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
            placeholder="Search for eyewear, sunglasses..."
            className="w-full pl-4 pr-20 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-700 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <p className="text-xs text-gray-500 px-3 py-2">Quick Results</p>
            {suggestions.map((product) => {
              const displayPrice = product.product_variants?.[0]?.price || product.base_price;
              const discountAmount = product.discount_percentage || 0;
              const finalPrice = Math.max(0, displayPrice - discountAmount);

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => {
                    setShowSuggestions(false);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-gray-300 text-lg">📦</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {product.brand && `${product.brand} • `}
                      {product.categories?.name}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-emerald-600">
                      Rs. {finalPrice.toFixed(0)}
                    </p>
                    {discountAmount > 0 && (
                      <p className="text-xs text-gray-400 line-through">
                        Rs. {displayPrice.toFixed(0)}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
          {suggestions.length >= 5 && (
            <div className="border-t border-gray-200 p-2">
              <button
                onClick={() => {
                  handleSearch({ preventDefault: () => {} });
                }}
                className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2"
              >
                View all results for "{searchQuery}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
