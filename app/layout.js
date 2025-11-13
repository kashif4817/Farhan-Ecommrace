import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { ProductCacheProvider } from "@/contexts/ProductCacheContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import BottomNav from "@/components/BottomNav";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Farhan Ainak Point - Your Vision, Our Mission",
  description: "Browse our collection of quality eyewear at Farhan Ainak Point",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProductCacheProvider>
          <CartProvider>
            <Toaster />
            <Navbar />
            <CartSidebar />
            {children}
            <BottomNav />
          </CartProvider>
        </ProductCacheProvider>
      </body>
    </html>
  );
}
