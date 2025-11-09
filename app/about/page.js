'use client';

import { Eye, Heart, Award, Users, Target, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Farhan Ainak Point</h1>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
              Your trusted partner for quality eyewear and exceptional vision care since establishment
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Our Mission */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              At Farhan Ainak Point, our mission is to provide exceptional quality eyewear and professional eye care services to our community. We are committed to helping you see the world more clearly while looking your best. Every pair of glasses we offer is carefully selected to ensure both style and functionality.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-lg">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and preferred eyewear destination in Pakistan, known for our exceptional customer service, premium quality products, and affordable pricing. We envision a future where everyone has access to quality vision care and stylish eyewear that enhances their confidence and lifestyle.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 sm:p-12 mb-16 border border-emerald-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto space-y-4 text-gray-700 leading-relaxed">
            <p>
              Farhan Ainak Point was founded with a simple yet powerful vision: to make quality eyewear accessible to everyone. What started as a small optical shop has grown into a trusted name in the eyewear industry, serving thousands of satisfied customers.
            </p>
            <p>
              Our founder, with years of experience in optical services, recognized the need for a place where customers could find premium eyewear at affordable prices, backed by expert guidance and exceptional service. This vision continues to drive us every day.
            </p>
            <p>
              Today, we offer an extensive collection of frames, sunglasses, and optical solutions from leading brands, along with comprehensive eye care services. Our team of experienced professionals is dedicated to helping you find the perfect eyewear that matches your style, needs, and budget.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Why Choose Us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: 'Quality Products',
                description: 'We offer only premium quality eyewear from trusted brands and manufacturers'
              },
              {
                icon: Users,
                title: 'Expert Staff',
                description: 'Our trained professionals provide personalized service and expert advice'
              },
              {
                icon: Heart,
                title: 'Customer First',
                description: 'Your satisfaction is our priority. We go the extra mile to ensure you\'re happy'
              },
              {
                icon: Sparkles,
                title: 'Latest Trends',
                description: 'Stay fashionable with our collection of the latest eyewear styles and designs'
              },
              {
                icon: CheckCircle,
                title: 'Affordable Pricing',
                description: 'Premium quality doesn\'t mean premium prices. We offer competitive rates'
              },
              {
                icon: Eye,
                title: 'Comprehensive Care',
                description: 'From eye tests to lens fitting, we provide complete optical care services'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-lg w-fit mb-4">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Integrity', desc: 'We conduct business with honesty and transparency' },
              { label: 'Excellence', desc: 'We strive for excellence in everything we do' },
              { label: 'Innovation', desc: 'We embrace new technologies and trends' },
              { label: 'Community', desc: 'We\'re committed to serving our local community' }
            ].map((value, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{value.label}</h3>
                  <p className="text-gray-600 text-sm">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Eyewear?</h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Visit our store today or browse our collection online. Our expert team is here to help you!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-emerald-700 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-3 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-all border-2 border-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
