'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductCache } from '@/contexts/ProductCacheContext';
import ProductCardMinimal from '@/components/ProductCardMinimal';
import ProductFilter from '@/components/ProductFilter';
import FooterMinimal from '@/components/FooterMinimal';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { categories, loading: cacheLoading, getProductsByCategory } = useProductCache();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cacheLoading && params.id) {
      const cat = categories.find(c => c.id === params.id);
      setCategory(cat || null);

      const prods = getProductsByCategory(params.id);
      setProducts(prods);
      setFilteredProducts(prods);

      setLoading(false);
    }
  }, [params.id, categories, cacheLoading]);

  const handleFilterChange = (filtered) => {
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500 mb-4">Category not found</p>
        <Link
          href="/"
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Category Header */}
      <div className="bg-white sticky top-12 z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-3 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            {category.image_url && (
              <div className="flex-shrink-0">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover shadow-sm"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                {category.name}
              </h1>
              {category.subtitle && (
                <p className="text-gray-600 text-xs sm:text-sm truncate">{category.subtitle}</p>
              )}
              <p className="text-gray-500 text-xs">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {filteredProducts.length !== products.length && ` (of ${products.length} total)`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      {products.length > 0 && (
        <ProductFilter
          products={products}
          onFilterChange={handleFilterChange}
          showCategoryFilter={false}
          categories={[]}
        />
      )}

      {/* Products Grid - Same layout as home page */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 pb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">
              {products.length === 0
                ? 'No products available in this category yet'
                : 'No products match your filters'
              }
            </p>
            {products.length > 0 && (
              <p className="text-gray-400 text-sm">
                Try adjusting your filters to see more products
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 sm:gap-2">
            {filteredProducts.map((product) => (
              <ProductCardMinimal
                key={product.id}
                product={product}
                variants={product.product_variants || []}
              />
            ))}
          </div>
        )}
      </div>

      {/* Minimal Footer */}
      <FooterMinimal />
    </div>
  );
}
