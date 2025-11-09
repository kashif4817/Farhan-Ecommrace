'use client';

import { ShoppingCart, Eye, Flame, Zap } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function DealCard({ product, variants = [] }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const hasVariants = variants && variants.length > 0;
  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.base_price;
  const discount = product.discount_percentage || 0;
  const finalPrice = displayPrice - (displayPrice * discount) / 100;
  const savings = displayPrice - finalPrice;

  const handleAddToCart = () => {
    if (hasVariants && !selectedVariant) {
      alert('Please select a variant');
      return;
    }
    addToCart(product, selectedVariant);
  };

  const getDiscountBadgeColor = () => {
    if (discount >= 30) return 'from-orange-500 to-red-600';
    if (discount >= 15) return 'from-emerald-500 to-teal-600';
    return 'from-purple-500 to-pink-600';
  };

  const isHotDeal = discount >= 30;

  return (
    <>
      <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Hot Deal Ribbon */}
        {isHotDeal && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 text-xs font-bold flex items-center gap-1 rounded-bl-lg shadow-lg">
              <Flame className="h-3 w-3" />
              HOT DEAL
            </div>
          </div>
        )}

        <div className="relative">
          {/* Product Image */}
          <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-300 text-5xl font-bold">
                  {product.name.charAt(0)}
                </span>
              </div>
            )}

            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Discount Badge */}
          <div className="absolute top-3 left-3">
            <div className={`bg-gradient-to-r ${getDiscountBadgeColor()} text-white px-3 py-1.5 rounded-lg shadow-lg`}>
              <p className="text-lg font-bold leading-none">{discount}%</p>
              <p className="text-[10px] font-semibold">OFF</p>
            </div>
          </div>

          {/* Quick View Button */}
          <button
            onClick={() => setShowDetails(true)}
            className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-50 hover:scale-110"
          >
            <Eye className="h-4 w-4 text-emerald-700" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category Tag */}
          {product.categories && (
            <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded">
              {product.categories.name}
            </span>
          )}

          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Variants */}
          {hasVariants && (
            <div className="flex flex-wrap gap-1">
              {variants.slice(0, 3).map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`
                    px-2 py-1 rounded text-xs font-medium transition-all
                    ${
                      selectedVariant?.id === variant.id
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {variant.name}
                </button>
              ))}
              {variants.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{variants.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Price Section */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                Rs. {finalPrice.toFixed(0)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                Rs. {displayPrice.toFixed(0)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600">
              <Zap className="h-3 w-3" />
              <span className="text-xs font-semibold">
                Save Rs. {savings.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Details Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              {/* Close Button */}
              <button
                onClick={() => setShowDetails(false)}
                className="float-right text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>

              {/* Product Image */}
              {product.image_url && (
                <div className="relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <div className={`bg-gradient-to-r ${getDiscountBadgeColor()} text-white px-4 py-2 rounded-lg shadow-lg`}>
                      <p className="text-2xl font-bold leading-none">{discount}%</p>
                      <p className="text-xs font-semibold">OFF</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h2>

                {product.description && (
                  <p className="text-gray-600">{product.description}</p>
                )}

                {/* Variants */}
                {hasVariants && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Available Variants:
                    </h3>
                    <div className="space-y-2">
                      {variants.map((variant) => (
                        <div
                          key={variant.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="font-medium">{variant.name}</span>
                          <span className="text-emerald-600 font-bold">
                            Rs. {variant.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price and Savings */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Original Price:</span>
                    <span className="text-lg text-gray-500 line-through">
                      Rs. {displayPrice.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Discount:</span>
                    <span className="text-lg font-bold text-orange-600">
                      -{discount}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg">
                    <span className="text-gray-900 font-semibold">Final Price:</span>
                    <span className="text-3xl font-bold text-emerald-600">
                      Rs. {finalPrice.toFixed(0)}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-emerald-600 font-semibold">
                      You save Rs. {savings.toFixed(0)}!
                    </p>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    handleAddToCart();
                    setShowDetails(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
