'use client';

import { Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ProductFilter({
  products,
  onFilterChange,
  showCategoryFilter = false,
  categories = []
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    priceRange: 'all',
    gender: 'all',
    frameType: 'all',
    sortBy: 'default'
  });

  // Extract unique values from products
  const genders = [...new Set(products.map(p => p.gender).filter(Boolean))];
  const frameTypes = [...new Set(products.map(p => p.frame_type).filter(Boolean))];

  const applyFilters = (newFilters) => {
    setSelectedFilters(newFilters);

    let filtered = [...products];

    // Category filter
    if (newFilters.category !== 'all') {
      filtered = filtered.filter(p => p.category_id === newFilters.category);
    }

    // Price range filter
    if (newFilters.priceRange !== 'all') {
      filtered = filtered.filter(p => {
        const price = p.product_variants?.[0]?.price || p.base_price;
        const finalPrice = Math.max(0, price - (p.discount_percentage || 0));

        switch(newFilters.priceRange) {
          case 'under2000':
            return finalPrice < 2000;
          case '2000-5000':
            return finalPrice >= 2000 && finalPrice <= 5000;
          case '5000-10000':
            return finalPrice >= 5000 && finalPrice <= 10000;
          case 'above10000':
            return finalPrice > 10000;
          default:
            return true;
        }
      });
    }

    // Gender filter
    if (newFilters.gender !== 'all') {
      filtered = filtered.filter(p => p.gender === newFilters.gender);
    }

    // Frame Type filter
    if (newFilters.frameType !== 'all') {
      filtered = filtered.filter(p => p.frame_type === newFilters.frameType);
    }

    // Sort
    filtered.sort((a, b) => {
      const priceA = (a.product_variants?.[0]?.price || a.base_price) - (a.discount_percentage || 0);
      const priceB = (b.product_variants?.[0]?.price || b.base_price) - (b.discount_percentage || 0);

      switch(newFilters.sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'discount':
          return (b.discount_percentage || 0) - (a.discount_percentage || 0);
        case 'name-az':
          return a.name.localeCompare(b.name);
        case 'name-za':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    onFilterChange(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    applyFilters(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: 'all',
      priceRange: 'all',
      gender: 'all',
      frameType: 'all',
      sortBy: 'default'
    };
    setSelectedFilters(defaultFilters);
    applyFilters(defaultFilters);
  };

  const hasActiveFilters = Object.values(selectedFilters).some(v => v !== 'all' && v !== 'default');
  const activeFilterCount = Object.values(selectedFilters).filter(v => v !== 'all' && v !== 'default').length;

  const handleMobileFilterChange = (filterType, value) => {
    handleFilterChange(filterType, value);
    // Auto-close after selection for better mobile UX
    setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div className="bg-white border-b sticky top-12 z-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
        {/* Mobile Filters - Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
            {showCategoryFilter && categories.length > 0 && (
              <select
                value={selectedFilters.category}
                onChange={(e) => handleMobileFilterChange('category', e.target.value)}
                className={`flex-shrink-0 text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                  selectedFilters.category !== 'all'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            )}

            <select
              value={selectedFilters.priceRange}
              onChange={(e) => handleMobileFilterChange('priceRange', e.target.value)}
              className={`flex-shrink-0 text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                selectedFilters.priceRange !== 'all'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              <option value="all">Price</option>
              <option value="under2000">Under 2K</option>
              <option value="2000-5000">2K - 5K</option>
              <option value="5000-10000">5K - 10K</option>
              <option value="above10000">Above 10K</option>
            </select>

            {genders.length > 0 && (
              <select
                value={selectedFilters.gender}
                onChange={(e) => handleMobileFilterChange('gender', e.target.value)}
                className={`flex-shrink-0 text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                  selectedFilters.gender !== 'all'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <option value="all">Gender</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            )}

            <select
              value={selectedFilters.sortBy}
              onChange={(e) => handleMobileFilterChange('sortBy', e.target.value)}
              className={`flex-shrink-0 text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                selectedFilters.sortBy !== 'default'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              <option value="default">Sort</option>
              <option value="price-low">Price ↑</option>
              <option value="price-high">Price ↓</option>
              <option value="newest">Newest</option>
              <option value="discount">Discount</option>
              <option value="name-az">A-Z</option>
              <option value="name-za">Z-A</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold border border-red-300 hover:bg-red-100 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          {showCategoryFilter && categories.length > 0 && (
            <select
              value={selectedFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="text-xs sm:text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          )}

          <select
            value={selectedFilters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="text-xs sm:text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Prices</option>
            <option value="under2000">Under Rs. 2,000</option>
            <option value="2000-5000">Rs. 2,000 - 5,000</option>
            <option value="5000-10000">Rs. 5,000 - 10,000</option>
            <option value="above10000">Above Rs. 10,000</option>
          </select>

          {genders.length > 0 && (
            <select
              value={selectedFilters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="text-xs sm:text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Genders</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          )}

          {frameTypes.length > 0 && (
            <select
              value={selectedFilters.frameType}
              onChange={(e) => handleFilterChange('frameType', e.target.value)}
              className="text-xs sm:text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Frame Types</option>
              {frameTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}

          <select
            value={selectedFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="text-xs sm:text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="discount">Highest Discount</option>
            <option value="name-az">Name: A-Z</option>
            <option value="name-za">Name: Z-A</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs sm:text-sm font-medium"
            >
              <X className="h-3.5 w-3.5" />
              Clear All
            </button>
          )}

          {activeFilterCount > 0 && (
            <span className="text-xs text-gray-500 bg-emerald-50 px-2 py-1 rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
