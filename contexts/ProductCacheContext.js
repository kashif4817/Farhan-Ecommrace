'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const ProductCacheContext = createContext();

const CACHE_KEY = 'farhan_products_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export function ProductCacheProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    initializeCache();
  }, []);

  const initializeCache = async () => {
    try {
      setLoading(true);

      // Try to load from localStorage first
      const cached = localStorage.getItem(CACHE_KEY);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;

        // If cache is still valid, use it
        if (age < CACHE_DURATION) {
          setProducts(data.products || []);
          setCategories(data.categories || []);
          setLastUpdate(timestamp);
          setLoading(false);
          return;
        }
      }

      // Cache is expired or doesn't exist, fetch fresh data
      await refreshCache();
    } catch (error) {
      console.error('Error initializing cache:', error);
      setLoading(false);
    }
  };

  const refreshCache = async () => {
    try {
      setLoading(true);

      // Fetch all categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (categoriesError) throw categoriesError;

      // Fetch all products with variants
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          categories (*),
          product_variants (*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      const timestamp = Date.now();
      const cacheData = {
        data: {
          products: productsData || [],
          categories: categoriesData || []
        },
        timestamp
      };

      // Save to localStorage
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      setProducts(productsData || []);
      setCategories(categoriesData || []);
      setLastUpdate(timestamp);
    } catch (error) {
      console.error('Error refreshing cache:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = (query) => {
    if (!query || query.trim() === '') return [];

    const lowerQuery = query.toLowerCase().trim();

    return products.filter(product => {
      const nameMatch = product.name?.toLowerCase().includes(lowerQuery);
      const brandMatch = product.brand?.toLowerCase().includes(lowerQuery);
      const descriptionMatch = product.description?.toLowerCase().includes(lowerQuery);
      const categoryMatch = product.categories?.name?.toLowerCase().includes(lowerQuery);
      const colorMatch = product.color?.toLowerCase().includes(lowerQuery);
      const materialMatch = product.material?.toLowerCase().includes(lowerQuery);

      return nameMatch || brandMatch || descriptionMatch || categoryMatch || colorMatch || materialMatch;
    });
  };

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.category_id === categoryId);
  };

  const getDeals = () => {
    return products.filter(product => product.discount_percentage > 0)
      .sort((a, b) => b.discount_percentage - a.discount_percentage);
  };

  const value = {
    products,
    categories,
    loading,
    lastUpdate,
    refreshCache,
    searchProducts,
    getProductsByCategory,
    getDeals,
    isCacheValid: lastUpdate && (Date.now() - lastUpdate) < CACHE_DURATION
  };

  return (
    <ProductCacheContext.Provider value={value}>
      {children}
    </ProductCacheContext.Provider>
  );
}

export function useProductCache() {
  const context = useContext(ProductCacheContext);
  if (!context) {
    throw new Error('useProductCache must be used within ProductCacheProvider');
  }
  return context;
}
