'use client';

import { useEffect, useState } from 'react';
import { useProductCache } from '@/contexts/ProductCacheContext';
import CategoryScroll from '@/components/CategoryScroll';
import ProductCardMinimal from '@/components/ProductCardMinimal';
import ProductFilter from '@/components/ProductFilter';
import Footer from '@/components/Footer';
import { ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { categories, products, loading, getProductsByCategory } = useProductCache();
  const [categoryProducts, setCategoryProducts] = useState({});
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!loading && categories.length > 0) {
      const productsMap = {};
      categories.forEach((category) => {
        const categoryProds = getProductsByCategory(category.id);
        productsMap[category.id] = categoryProds.slice(0, 14);
      });
      setCategoryProducts(productsMap);
      setFilteredCategoryProducts(productsMap);
    }
  }, [categories, products, loading]);

  const handleFilterChange = (filteredProducts) => {
    // Group filtered products by category
    const productsMap = {};
    categories.forEach((category) => {
      const categoryProds = filteredProducts.filter(p => p.category_id === category.id);
      productsMap[category.id] = categoryProds.slice(0, 14);
    });
    setFilteredCategoryProducts(productsMap);
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

      {/* Filters Section */}
      {products.length > 0 && (
        <ProductFilter
          products={products}
          onFilterChange={handleFilterChange}
          showCategoryFilter={true}
          categories={categories}
        />
      )}

      {/* Products by Category Section */}
      <section id="products" className="py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 space-y-4">
          {categories.map((category) => {
            const products = filteredCategoryProducts[category.id] || [];
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
                  <Link
                    href={`/category/${category.id}`}
                    className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors group"
                  >
                    <span>Show More</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 sm:gap-2">
                  {products.slice(0, 14).map((product) => (
                    <ProductCardMinimal
                      key={product.id}
                      product={product}
                      variants={product.product_variants || []}
                    />
                  ))}
                </div>

                {/* See More Button (Mobile) */}
                {products.length > 14 && (
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
