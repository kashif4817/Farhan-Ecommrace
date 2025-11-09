'use client';

import { Package, Truck, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Package className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Shipping Policy</h1>
            <p className="text-lg text-emerald-50">
              Fast, reliable delivery to your doorstep
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Overview */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-8 border border-emerald-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Overview</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center">
              <Clock className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">2-5 Business Days</p>
              <p className="text-sm text-gray-600">Delivery Time</p>
            </div>
            <div className="text-center">
              <Truck className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">Free Shipping</p>
              <p className="text-sm text-gray-600">Orders Over Rs. 5000</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">Nationwide</p>
              <p className="text-sm text-gray-600">All Major Cities</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-100">
          {/* Shipping Methods */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Truck className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Shipping Methods</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Standard Delivery</h3>
                <p className="text-gray-600 mb-2">
                  Delivery within 3-5 business days for most locations across Pakistan.
                </p>
                <p className="text-sm text-gray-500">
                  Cost: Rs. 200 (Free for orders over Rs. 5000)
                </p>
              </div>

              <div className="border-l-4 border-teal-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Express Delivery</h3>
                <p className="text-gray-600 mb-2">
                  Fast delivery within 2-3 business days for major cities (Karachi, Lahore, Islamabad, Rawalpindi).
                </p>
                <p className="text-sm text-gray-500">
                  Cost: Rs. 350
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Same Day Delivery (Karachi Only)</h3>
                <p className="text-gray-600 mb-2">
                  Order before 12 PM and receive your eyewear the same day within Karachi city limits.
                </p>
                <p className="text-sm text-gray-500">
                  Cost: Rs. 500
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Areas */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Shipping Areas</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We currently ship to all major cities and towns across Pakistan, including:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi',
                'Faisalabad', 'Multan', 'Peshawar', 'Quetta',
                'Sialkot', 'Gujranwala', 'Hyderabad', 'And many more...'
              ].map((city, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">{city}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Processing Time */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Processing Time</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Orders are typically processed within 24 hours (Monday-Saturday). Orders placed on Sunday will be processed the next business day.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 mb-1">Custom Orders</p>
                  <p className="text-sm text-amber-800">
                    Prescription lenses and custom frames may require additional 3-7 business days for processing before shipping.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Order Tracking */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Order Tracking</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Once your order is shipped, you will receive:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">A confirmation message via WhatsApp with tracking details</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Real-time updates on your order status</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Estimated delivery date</span>
              </li>
            </ul>
          </section>

          {/* Shipping Charges */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Truck className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Shipping Charges</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Order Value</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Shipping Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Below Rs. 5,000</td>
                    <td className="px-4 py-3 text-gray-700">Rs. 200 (Standard)</td>
                  </tr>
                  <tr className="bg-emerald-50">
                    <td className="px-4 py-3 text-gray-700 font-medium">Rs. 5,000 and above</td>
                    <td className="px-4 py-3 text-emerald-700 font-semibold">FREE Shipping!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Important Notes */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Important Notes</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Delivery times may vary during peak seasons or public holidays</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Please ensure someone is available to receive the package at the delivery address</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">We are not responsible for delays caused by incorrect address information provided by the customer</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">For fragile items (like eyewear), we use special packaging to ensure safe delivery</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Questions About Shipping?</h2>
          <p className="text-emerald-50 mb-6">
            Our customer service team is here to help you with any shipping inquiries.
          </p>
          <a
            href="tel:+923171640134"
            className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg"
          >
            Contact Us: 03171640134
          </a>
        </div>
      </div>
    </div>
  );
}
