'use client';

import { ShoppingCart, X, CheckCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartToast({ productName, onClose }) {
  const { toggleCart } = useCart();

  const handleViewCart = () => {
    toggleCart();
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl border-2 border-emerald-500 overflow-hidden max-w-md w-full">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Added to Cart!</h3>
              <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{productName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleViewCart}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all font-medium text-sm flex items-center justify-center gap-1.5 shadow-md"
          >
            <ShoppingCart className="h-4 w-4" />
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}
