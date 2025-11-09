'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import DealBannerSlider from '@/components/DealBannerSlider';
import DealCard from '@/components/DealCard';
import { Loader2, Tag, TrendingDown, Zap, Clock } from 'lucide-react';

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);

      // Fetch products with discounts
      const { data: products, error } = await supabase
        .from('products')
        .select(`
          *,
          product_variants (*),
          categories (*)
        `)
        .gt('discount_percentage', 0)
        .eq('is_active', true)
        .order('discount_percentage', { ascending: false });

      if (error) throw error;

      setDeals(products || []);
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner Slider */}
      <DealBannerSlider deals={deals.slice(0, 5)} />

      {/* Deals Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-4">
              <Tag className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-semibold text-orange-800">Limited Time Offers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Hot Deals & Promotions
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Grab amazing discounts on premium eyewear. Save big on your favorite brands!
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <Zap className="h-4 w-4" />
              All Deals ({deals.length})
            </button>

            <button
              onClick={() => setSelectedFilter('hot')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedFilter === 'hot'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              <TrendingDown className="h-4 w-4" />
              Hot Deals (30%+ OFF)
            </button>

            <button
              onClick={() => setSelectedFilter('medium')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedFilter === 'medium'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <Tag className="h-4 w-4" />
              Best Value (15-29% OFF)
            </button>

            <button
              onClick={() => setSelectedFilter('low')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedFilter === 'low'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <Clock className="h-4 w-4" />
              Quick Deals (Up to 15% OFF)
            </button>
          </div>

          {/* Deal Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 text-center border border-orange-100">
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {deals.filter(d => d.discount_percentage >= 30).length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Hot Deals</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center border border-emerald-100">
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
                {Math.max(...deals.map(d => d.discount_percentage))}%
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Max Discount</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-100">
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                {deals.length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Total Deals</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-100">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                Rs. {Math.round(deals.reduce((sum, d) => sum + (d.base_price * d.discount_percentage / 100), 0))}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Total Savings</p>
            </div>
          </div>

          {/* Deals Grid */}
          {filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredDeals.map((deal) => (
                <DealCard
                  key={deal.id}
                  product={deal}
                  variants={deal.product_variants || []}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No deals found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Don't Miss Out on These Amazing Deals!
          </h2>
          <p className="text-emerald-50 mb-6">
            Limited stock available. Shop now and save big on quality eyewear.
          </p>
          <a
            href="tel:+923171640134"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-emerald-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            <span>Call Now: 03171640134</span>
          </a>
        </div>
      </section>
    </div>
  );
}
