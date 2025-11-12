'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import CategoryScroll from '@/components/CategoryScroll';
import ProductCardMinimal from '@/components/ProductCardMinimal';
import Footer from '@/components/Footer';
import { ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (categoriesError) throw categoriesError;

      setCategories(categoriesData || []);

      // Fetch products for each category (limit to 2 rows = 4 products on mobile, 6 on desktop)
      const productsPromises = categoriesData.map(async (category) => {
        const { data: products, error } = await supabase
          .from('products')
          .select(`
            *,
            product_variants (*)
          `)
          .eq('category_id', category.id)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;

        return { categoryId: category.id, products: products || [] };
      });

      const productsResults = await Promise.all(productsPromises);
      const productsMap = {};
      productsResults.forEach(({ categoryId, products }) => {
        productsMap[categoryId] = products;
      });

      setCategoryProducts(productsMap);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 sm:py-5 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1622519407650-3df9883f76e5?w=1200&auto=format&fit=crop"
            alt="Eyewear collection"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-1">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
              Welcome to Farhan Ainak Point
            </h1>
            <p className="text-[10px] sm:text-xs text-emerald-50 max-w-2xl mx-auto">
              Your Vision, Our Mission - Browse our collection of quality eyewear
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section id="categories" className="py-3 bg-white">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <CategoryScroll categories={categories} />
          </div>
        </section>
      )}

      {/* Products by Category Section */}
      <section id="products" className="py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 space-y-4">
          {categories.map((category) => {
            const products = categoryProducts[category.id] || [];
            if (products.length === 0) return null;

            return (
              <div key={category.id} className="space-y-2">
                {/* Category Header */}
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      {category.name}
                    </h2>
                    {category.subtitle && (
                      <p className="text-xs text-gray-600 mt-0.5">{category.subtitle}</p>
                    )}
                  </div>
                  {products.length > 6 && (
                    <Link
                      href={`/category/${category.id}`}
                      className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors group"
                    >
                      <span>View All</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 sm:gap-2">
                  {products.slice(0, 12).map((product) => (
                    <ProductCardMinimal
                      key={product.id}
                      product={product}
                      variants={product.product_variants || []}
                    />
                  ))}
                </div>

                {/* See More Button (Mobile) */}
                {products.length > 10 && (
                  <div className="flex justify-center">
                    <Link
                      href={`/category/${category.id}`}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all font-medium shadow-md"
                    >
                      <span>View All {category.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products available at the moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
