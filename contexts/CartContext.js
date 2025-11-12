'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, variant = null) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          (variant ? item.variant?.id === variant.id : !item.variant)
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [...prevCart, { product, variant, quantity: 1 }];
    });

    // Show toast after state update
    toast.success('Product added to cart', {
      duration: 500,
      position: 'top-center',
      style: {
        background: '#10b981',
        color: '#fff',
        fontSize: '14px',
        padding: '8px 16px',
      },
    });
  };

  const removeFromCart = (productId, variantId = null) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.product.id === productId &&
            (variantId ? item.variant?.id === variantId : !item.variant))
      )
    );
  };

  const updateQuantity = (productId, variantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        (variantId ? item.variant?.id === variantId : !item.variant)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.variant ? item.variant.price : item.product.base_price;
      const discountAmount = item.product.discount_percentage || 0; // This is PKR amount, not percentage
      const finalPrice = Math.max(0, price - discountAmount);
      return total + finalPrice * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.length;
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
