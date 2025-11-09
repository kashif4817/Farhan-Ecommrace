'use client';

import { ShoppingCart, Tag, Eye } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';

export default function ProductCard({ product, variants = [] }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const hasVariants = variants && variants.length > 0;
  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.base_price;
  const discount = product.discount_percentage || 0;
  const finalPrice = displayPrice - (displayPrice * discount) / 100;

  const handleAddToCart = () => {
    if (hasVariants && !selectedVariant) {
      alert('Please select a variant');
      return;
    }
    addToCart(product, selectedVariant);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-[4/3] overflow-hidden bg-gray-50">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <span className="text-gray-400 text-3xl font-bold">
                  {product.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-500 text-white">
                -{discount}%
              </span>
            </div>
          )}

          {/* Quick View Button */}
          <button
            onClick={() => setShowDetails(true)}
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-2">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-[2.5rem]">
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
                    px-2 py-0.5 rounded text-xs font-medium transition-colors
                    ${
                      selectedVariant?.id === variant.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {variant.name}
                </button>
              ))}
              {variants.length > 3 && (
                <span className="px-2 py-0.5 text-xs text-gray-500">
                  +{variants.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              Rs. {finalPrice.toFixed(0)}
            </span>
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {displayPrice.toFixed(0)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium rounded-md hover:from-emerald-700 hover:to-teal-700 transition-all shadow-sm"
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
                className="float-right text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {/* Product Image */}
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}

              {/* Product Details */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h2>

                {product.description && (
                  <p className="text-gray-600">{product.description}</p>
                )}

                {product.ingredients && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Ingredients:
                    </h3>
                    <p className="text-gray-600">{product.ingredients}</p>
                  </div>
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
                          <span className="text-blue-600 font-bold">
                            Rs. {variant.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price and Add to Cart */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700">Price:</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-blue-600">
                        Rs. {finalPrice.toFixed(2)}
                      </span>
                      {discount > 0 && (
                        <div className="text-sm text-gray-500 line-through">
                          Rs. {displayPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart();
                      setShowDetails(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
