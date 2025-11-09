'use client';

import Link from 'next/link';

export default function ProductCardMinimal({ product, variants = [] }) {
  const displayPrice = product.base_price;
  const discount = product.discount_percentage || 0;
  const finalPrice = displayPrice - (displayPrice * discount / 100);

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100">
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

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                -{discount}%
              </span>
            )}
            {product.is_hot_item && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                HOT
              </span>
            )}
            {product.is_new_arrival && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                NEW
              </span>
            )}
            {product.is_best_seller && (
              <span className="bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                BESTSELLER
              </span>
            )}
          </div>

          {/* Free Delivery Badge */}
          {finalPrice >= 5000 && (
            <div className="absolute top-2 right-2">
              <span className="bg-emerald-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase">
                Free Delivery
              </span>
            </div>
          )}

          {/* Stock Badge */}
          {product.stock_quantity <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-2.5">
          {/* Brand */}
          {product.brand && (
            <p className="text-[10px] text-gray-500 uppercase mb-1">{product.brand}</p>
          )}

          {/* Product Name - 2 lines */}
          <h3 className="text-xs sm:text-sm text-gray-800 line-clamp-2 mb-2 min-h-[2.5rem] leading-tight">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-orange-600 font-bold text-base sm:text-lg">
              Rs. {finalPrice.toFixed(0)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-gray-400 text-xs line-through">
                  Rs. {displayPrice.toFixed(0)}
                </span>
                <span className="text-orange-600 text-xs font-medium">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock Info */}
          {product.stock_quantity > 0 && product.stock_quantity <= product.low_stock_threshold && (
            <div className="mt-1">
              <span className="text-[10px] text-red-600 font-semibold">
                Only {product.stock_quantity} left!
              </span>
            </div>
          )}

          {/* Features */}
          <div className="mt-1.5 flex flex-wrap gap-1">
            {product.gender && (
              <span className="text-[10px] text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                {product.gender}
              </span>
            )}
            {product.frame_type && (
              <span className="text-[10px] text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                {product.frame_type}
              </span>
            )}
          </div>

          {/* Sale Badge */}
          {product.is_on_sale && discount > 0 && (
            <div className="mt-1.5 flex items-center gap-1">
              <span className="bg-yellow-100 text-yellow-700 text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase">
                Flash Sale
              </span>
              <span className="text-[10px] text-gray-600">Save Rs.{(displayPrice - finalPrice).toFixed(0)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
