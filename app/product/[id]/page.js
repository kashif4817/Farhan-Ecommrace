'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ShoppingCart, ArrowLeft, Package, CheckCircle, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      // Fetch product with category and variants
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select(`
          *,
          categories (*),
          product_variants (*)
        `)
        .eq('id', params.id)
        .single();

      if (productError) throw productError;

      setProduct(productData);
      setVariants(productData.product_variants || []);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (variants.length > 0 && !selectedVariant) {
      alert('Please select a variant');
      return;
    }
    addToCart(product, selectedVariant);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </button>
      </div>
    );
  }

  const displayPrice = selectedVariant ? selectedVariant.price : product.base_price;
  const discount = product.discount_percentage || 0;
  const finalPrice = displayPrice - (displayPrice * discount / 100);
  const savings = displayPrice - finalPrice;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-gray-300 text-6xl font-bold">
                    {product.name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount > 0 && (
                  <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded">
                    -{discount}% OFF
                  </span>
                )}
                {product.is_hot_item && (
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                    HOT ITEM
                  </span>
                )}
                {product.is_new_arrival && (
                  <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded">
                    NEW ARRIVAL
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {product.brand && <span className="font-medium">{product.brand}</span>}
              {product.brand && product.categories && <span>•</span>}
              {product.categories && <span>{product.categories.name}</span>}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            )}

            {/* Price Section */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-orange-600">
                  Rs. {finalPrice.toFixed(0)}
                </span>
                {discount > 0 && (
                  <span className="text-xl text-gray-400 line-through">
                    Rs. {displayPrice.toFixed(0)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-emerald-600 font-semibold">
                  You save Rs. {savings.toFixed(0)} ({discount}%)
                </p>
              )}
            </div>

            {/* Variants */}
            {variants.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Select Variant:
                </label>
                <div className="flex flex-wrap gap-3">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      {variant.name}
                      <span className="block text-xs text-gray-500">
                        Rs. {variant.price.toFixed(0)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Specifications */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                {product.gender && (
                  <>
                    <dt className="text-gray-600">Gender:</dt>
                    <dd className="font-medium text-gray-900">{product.gender}</dd>
                  </>
                )}
                {product.frame_type && (
                  <>
                    <dt className="text-gray-600">Frame Type:</dt>
                    <dd className="font-medium text-gray-900">{product.frame_type}</dd>
                  </>
                )}
                {product.lens_type && (
                  <>
                    <dt className="text-gray-600">Lens Type:</dt>
                    <dd className="font-medium text-gray-900">{product.lens_type}</dd>
                  </>
                )}
                {product.color && (
                  <>
                    <dt className="text-gray-600">Color:</dt>
                    <dd className="font-medium text-gray-900">{product.color}</dd>
                  </>
                )}
                {product.material && (
                  <>
                    <dt className="text-gray-600">Material:</dt>
                    <dd className="font-medium text-gray-900">{product.material}</dd>
                  </>
                )}
                {product.weight && (
                  <>
                    <dt className="text-gray-600">Weight:</dt>
                    <dd className="font-medium text-gray-900">{product.weight}</dd>
                  </>
                )}
                <dt className="text-gray-600">Stock:</dt>
                <dd className={`font-medium ${product.stock_quantity > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {product.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of Stock'}
                </dd>
              </dl>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700">
                  {finalPrice >= 5000 ? (
                    <span className="font-semibold text-emerald-600">Free Delivery</span>
                  ) : (
                    <span>Delivery: Rs. 200</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700">7 Days Return Policy</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700">Secure Packaging</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-white text-lg font-semibold rounded-xl transition-all shadow-lg ${
                product.stock_quantity > 0
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              <span>{product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
