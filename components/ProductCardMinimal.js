'use client';

import Link from 'next/link';

export default function ProductCardMinimal({ product, variants = [] }) {
  const displayPrice = product.base_price;
  const discountAmount = product.discount_percentage || 0; // This is PKR amount, not percentage
  const finalPrice = Math.max(0, displayPrice - discountAmount);
  const discountPercentage = displayPrice > 0 ? Math.round((discountAmount / displayPrice) * 100) : 0;

  // Show only one badge with priority: discount > hot > new > bestseller
  const getBadge = () => {
    if (discountAmount > 0) {
      return (
        <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
          -{discountPercentage}%
        </span>
      );
    }
    if (product.is_hot_item) {
      return (
        <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
          HOT
        </span>
      );
    }
    if (product.is_new_arrival) {
      return (
        <span className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
          NEW
        </span>
      );
    }
    if (product.is_best_seller) {
      return (
        <span className="bg-purple-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
          BEST
        </span>
      );
    }
    return null;
  };

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-gray-300 text-4xl font-bold">
                {product.name.charAt(0)}
              </span>
            </div>
          )}

          {/* Single Badge - Top Left */}
          {getBadge() && (
            <div className="absolute top-1.5 left-1.5">
              {getBadge()}
            </div>
          )}

          {/* Free Delivery Badge */}
          {finalPrice >= 5000 && (
            <div className="absolute top-1.5 right-1.5">
              <span className="bg-emerald-600 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded shadow-sm">
                FREE
              </span>
            </div>
          )}

          {/* Stock Badge - Removed to always show products */}
        </div>

        {/* Product Info */}
        <div className="p-1">
          {/* Product Name - 2 lines */}
          <h3 className="text-[9px] sm:text-[10px] text-gray-800 line-clamp-2 mb-0.5 min-h-[1.5rem] leading-tight font-medium">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-0.5 flex-wrap">
            <span className="text-emerald-600 font-bold text-[11px] sm:text-xs">
              Rs. {finalPrice.toFixed(0)}
            </span>
            {discountAmount > 0 && (
              <>
                <span className="text-gray-400 text-[8px] line-through">
                  Rs. {displayPrice.toFixed(0)}
                </span>
                <span className="text-red-600 text-[8px] font-semibold">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>

        </div>
      </div>
    </Link>
  );
}
