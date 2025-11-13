'use client';

import Link from 'next/link';

export default function FooterMinimal() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm mb-3">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="/about" className="hover:text-emerald-400 transition-colors">
            About
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">
            Contact
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
            Privacy
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="/return-policy" className="hover:text-emerald-400 transition-colors">
            Returns
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Farhan Ainak Point. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
