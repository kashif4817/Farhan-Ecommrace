'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useProductCache } from '@/contexts/ProductCacheContext';
import ProductCardMinimal from '@/components/ProductCardMinimal';
import FooterMinimal from '@/components/FooterMinimal';
import { ArrowLeft, Search, Loader2, Filter, X } from 'lucide-react';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');
  const { searchProducts, loading: cacheLoading } = useProductCache();

  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (!cacheLoading && query) {
      performSearch();
    }
  }, [query, cacheLoading]);

  useEffect(() => {
    applyFilters();
  }, [results, selectedCategory, priceRange, sortBy]);

  const performSearch = () => {
    setLoading(true);
    const searchResults = searchProducts(query);
    setResults(searchResults);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...results];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category_id === selectedCategory);
    }

    // Price range filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(p => {
        const price = p.product_variants?.[0]?.price || p.base_price;
        const finalPrice = Math.max(0, price - (p.discount_percentage || 0));

        switch(priceRange) {
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

    // Sort
    filtered.sort((a, b) => {
      const priceA = (a.product_variants?.[0]?.price || a.base_price) - (a.discount_percentage || 0);
      const priceB = (b.product_variants?.[0]?.price || b.base_price) - (b.discount_percentage || 0);

      switch(sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'discount':
          return (b.discount_percentage || 0) - (a.discount_percentage || 0);
        default:
          return 0;
      }
    });

    setFilteredResults(filtered);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setSortBy('relevance');
  };

  const categories = [...new Set(results.map(p => ({ id: p.category_id, name: p.categories?.name })))];
  const hasActiveFilters = selectedCategory !== 'all' || priceRange !== 'all' || sortBy !== 'relevance';

  if (loading || cacheLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white sticky top-12 z-30 border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-3 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <Search className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600" />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Search Results
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm truncate">
                {query && `"${query}"`} - {filteredResults.length} {filteredResults.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {results.length > 0 && (
        <div className="bg-white border-b sticky top-28 sm:top-24 z-20">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3">
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs sm:text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => cat.id && (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              {/* Price Range Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="text-xs sm:text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Prices</option>
                <option value="under2000">Under Rs. 2,000</option>
                <option value="2000-5000">Rs. 2,000 - 5,000</option>
                <option value="5000-10000">Rs. 5,000 - 10,000</option>
                <option value="above10000">Above Rs. 10,000</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs sm:text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="discount">Highest Discount</option>
              </select>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex-1 py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 sm:gap-2 pb-20">
              {filteredResults.map((product) => (
                <ProductCardMinimal
                  key={product.id}
                  product={product}
                  variants={product.product_variants || []}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {results.length === 0 ? 'No products found' : 'No products match your filters'}
              </h3>
              <p className="text-gray-500 mb-4">
                {results.length === 0
                  ? `We couldn't find any products matching "${query}"`
                  : 'Try adjusting your filters to see more results'
                }
              </p>
              {results.length === 0 ? (
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Browse All Products
                </Link>
              ) : (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  <X className="h-5 w-5" />
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Minimal Footer */}
      <FooterMinimal />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
