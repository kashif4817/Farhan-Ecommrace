'use client';

import { Home, Tag, ShoppingCart, Phone, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function BottomNav() {
  const { getCartCount, toggleCart } = useCart();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path) => pathname === path;

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Tag, label: 'Deals', href: '/deals' },
    { icon: ShoppingCart, label: 'Cart', action: 'cart' },
    { icon: Phone, label: 'Contact', href: '/contact' },
    { icon: Menu, label: 'Menu', action: 'menu' },
  ];

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Deals', href: '/deals' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Return Policy', href: '/return-policy' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ];

  const handleNavClick = (item) => {
    if (item.action === 'cart') {
      toggleCart();
    } else if (item.action === 'menu') {
      setShowMenu(!showMenu);
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = item.href && isActive(item.href);

            if (item.href) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                    active
                      ? 'text-emerald-600'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                    {item.icon === ShoppingCart && getCartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {getCartCount()}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${active ? 'text-emerald-600' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              );
            } else {
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                    item.action === 'menu' && showMenu
                      ? 'text-emerald-600'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                    {item.icon === ShoppingCart && getCartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {getCartCount()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </button>
              );
            }
          })}
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      {showMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMenu(false)}>
          <div
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b">
                <h3 className="text-lg font-bold text-gray-900">Menu</h3>
                <button
                  onClick={() => setShowMenu(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setShowMenu(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Need help?</p>
                <a
                  href="tel:+923171640134"
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all"
                >
                  Call: 03171640134
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add padding to bottom of page content on mobile to prevent content being hidden behind nav */}
      <style jsx global>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 4rem;
          }
        }

        .safe-area-inset-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
