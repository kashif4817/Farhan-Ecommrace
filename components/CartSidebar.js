'use client';

import { X, Plus, Minus, Trash2, Send } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Button from './Button';

export default function CartSidebar() {
  const {
    cart,
    isOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Format message for WhatsApp
    let message = '*New Order from Farhan Ainak Point*\n\n';
    message += '*Order Details:*\n';

    cart.forEach((item, index) => {
      const price = item.variant ? item.variant.price : item.product.base_price;
      const discountAmount = item.product.discount_percentage || 0; // This is PKR amount, not percentage
      const finalPrice = Math.max(0, price - discountAmount);
      const variantName = item.variant ? ` (${item.variant.name})` : '';

      message += `\n${index + 1}. *${item.product.name}${variantName}*\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: Rs. ${finalPrice.toFixed(2)} each\n`;
      message += `   Subtotal: Rs. ${(finalPrice * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total Amount: Rs. ${getCartTotal().toFixed(2)}*\n\n`;
    message += 'Please confirm this order. Thank you!';

    const whatsappNumber = '03171640134';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    clearCart();
    toggleCart();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm mt-2">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                  const price = item.variant
                    ? item.variant.price
                    : item.product.base_price;
                  const discountAmount = item.product.discount_percentage || 0; // This is PKR amount, not percentage
                  const finalPrice = Math.max(0, price - discountAmount);

                  return (
                    <div
                      key={`${item.product.id}-${item.variant?.id || 'base'}`}
                      className="bg-gray-50 rounded-lg p-3 space-y-3"
                    >
                      <div className="flex gap-3">
                        {item.product.image_url && (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {item.product.name}
                          </h3>
                          {item.variant && (
                            <p className="text-sm text-gray-600">
                              {item.variant.name}
                            </p>
                          )}
                          <p className="text-blue-600 font-bold mt-1">
                            Rs. {finalPrice.toFixed(2)}
                          </p>
                          {discountAmount > 0 && (
                            <p className="text-xs text-gray-500 line-through">
                              Rs. {price.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.variant?.id,
                                item.quantity - 1
                              )
                            }
                            className="p-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.variant?.id,
                                item.quantity + 1
                              )
                            }
                            className="p-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.variant?.id)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">
                  Rs. {getCartTotal().toFixed(2)}
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                variant="success"
                className="w-full flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Order via WhatsApp</span>
              </Button>
              <button
                onClick={clearCart}
                className="w-full text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors text-sm"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
