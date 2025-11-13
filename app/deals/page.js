'use client';

import { useEffect, useState } from 'react';
import { useProductCache } from '@/contexts/ProductCacheContext';
import ProductCardMinimal from '@/components/ProductCardMinimal';
import FooterMinimal from '@/components/FooterMinimal';
import { Loader2, Tag, TrendingDown, Zap, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DealsPage() {
  const { loading: cacheLoading, getDeals } = useProductCache();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (!cacheLoading) {
      setDeals(getDeals());
      setLoading(false);
    }
  }, [cacheLoading]);

  const filterDeals = (deals) => {
    if (selectedFilter === 'all') return deals;

    if (selectedFilter === 'hot') {
      return deals.filter(deal => deal.discount_percentage >= 30);
    }

    if (selectedFilter === 'medium') {
      return deals.filter(deal => deal.discount_percentage >= 15 && deal.discount_percentage < 30);
    }

    if (selectedFilter === 'low') {
      return deals.filter(deal => deal.discount_percentage < 15);
    }

    return deals;
  };

  const filteredDeals = filterDeals(deals);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white sticky top-16 z-30 border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-3 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <Tag className="h-10 w-10 sm:h-12 sm:w-12 text-orange-600" />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Hot Deals & Promotions
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm truncate">
                {deals.length} amazing deals available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Section */}
      <section className="flex-1 py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              All ({deals.length})
            </button>

            <button
              onClick={() => setSelectedFilter('hot')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedFilter === 'hot'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
              }`}
            >
              <TrendingDown className="h-3.5 w-3.5" />
              30%+ OFF
            </button>

            <button
              onClick={() => setSelectedFilter('medium')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedFilter === 'medium'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              15-29% OFF
            </button>

            <button
              onClick={() => setSelectedFilter('low')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedFilter === 'low'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              Up to 15% OFF
            </button>
          </div>

          {/* Deals Grid */}
          {filteredDeals.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 sm:gap-2 pb-20">
              {filteredDeals.map((deal) => (
                <ProductCardMinimal
                  key={deal.id}
                  product={deal}
                  variants={deal.product_variants || []}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No deals found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Minimal Footer */}
      <FooterMinimal />
    </div>
  );
}
