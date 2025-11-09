'use client';

import { FileText, Shield, AlertTriangle, Scale, CreditCard, Ban } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg text-emerald-50">
              Please read these terms carefully before using our services
            </p>
            <p className="text-sm text-emerald-100 mt-2">
              Last Updated: November 2025
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-8 border border-emerald-100">
          <p className="text-gray-700 leading-relaxed">
            Welcome to Farhan Ainak Point. By accessing our website and using our services, you agree to be bound by these Terms and Conditions. Please read them carefully. If you do not agree with any part of these terms, you should not use our website or services.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-100">
          {/* Agreement to Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Agreement to Terms</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              These Terms and Conditions constitute a legally binding agreement between you and Farhan Ainak Point. By using our website, making a purchase, or engaging with our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
            </p>
          </section>

          {/* Use of Website */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Use of Website</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-600">You agree to use our website only for lawful purposes. You must not:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Use the website in any way that violates applicable laws or regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Attempt to gain unauthorized access to any part of the website</span>
                </li>
                <li className="flex items-start gap-3">
                  <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Engage in any activity that interferes with or disrupts the website</span>
                </li>
                <li className="flex items-start gap-3">
                  <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Use automated systems or software to extract data from the website</span>
                </li>
                <li className="flex items-start gap-3">
                  <Ban className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Impersonate or attempt to impersonate Farhan Ainak Point or any employee</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Product Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Product Information & Availability</h2>
            </div>
            <div className="space-y-3">
              <p className="text-gray-600">
                We strive to provide accurate product descriptions, images, and pricing. However:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Product colors may vary slightly from images due to monitor settings</li>
                <li>We do not warrant that product descriptions are accurate, complete, or error-free</li>
                <li>Prices and availability are subject to change without notice</li>
                <li>We reserve the right to limit quantities or refuse orders</li>
                <li>In case of errors, we reserve the right to cancel or refuse orders</li>
              </ul>
            </div>
          </section>

          {/* Orders & Payment */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Orders & Payment</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Order Acceptance</h3>
                <p className="text-gray-600 text-sm">
                  All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or suspected fraudulent activity.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Payment Terms</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Payment must be received in full before order fulfillment. We accept:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm ml-4">
                  <li>Cash on Delivery (COD)</li>
                  <li>Bank transfers</li>
                  <li>Online payment methods</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Pricing</h3>
                <p className="text-gray-600 text-sm">
                  All prices are in Pakistani Rupees (PKR) and include applicable taxes unless otherwise stated. We reserve the right to change prices at any time without prior notice.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping & Delivery */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Shipping & Delivery</h2>
            </div>
            <p className="text-gray-600 mb-3">
              Shipping and delivery terms are outlined in our Shipping Policy. Key points:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Risk of loss transfers to you upon delivery</li>
              <li>You are responsible for providing accurate delivery information</li>
              <li>We are not liable for delays caused by courier services or circumstances beyond our control</li>
            </ul>
          </section>

          {/* Returns & Refunds */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Returns & Refunds</h2>
            </div>
            <p className="text-gray-600">
              Our return and refund policy is detailed in our Return Policy page. Returns are accepted within 7 days of delivery, subject to conditions. Custom prescription lenses are generally non-returnable unless defective.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
            </div>
            <p className="text-gray-600 mb-3">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Farhan Ainak Point or its content suppliers and is protected by copyright and intellectual property laws.
            </p>
            <p className="text-gray-600">
              You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700 text-sm space-y-2">
                  <p>
                    To the fullest extent permitted by law, Farhan Ainak Point shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Your use or inability to use our website or services</li>
                    <li>Any unauthorized access to your personal information</li>
                    <li>Errors or omissions in product descriptions or pricing</li>
                    <li>Delays or failures in delivery</li>
                  </ul>
                  <p>
                    Our total liability to you for any claim shall not exceed the amount you paid for the specific product or service giving rise to the claim.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Warranty Disclaimer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Warranty Disclaimer</h2>
            </div>
            <p className="text-gray-600 mb-3">
              Our website and services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>The website will be uninterrupted, secure, or error-free</li>
              <li>Defects will be corrected</li>
              <li>The website is free of viruses or harmful components</li>
              <li>Results from using the website will be accurate or reliable</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Governing Law & Jurisdiction</h2>
            </div>
            <p className="text-gray-600">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Karachi, Pakistan.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Modifications to Terms</h2>
            </div>
            <p className="text-gray-600">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after changes constitutes acceptance of the modified terms. We encourage you to review these terms periodically.
            </p>
          </section>

          {/* Severability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Severability</h2>
            </div>
            <p className="text-gray-600">
              If any provision of these Terms and Conditions is found to be invalid or unenforceable, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700"><strong>Farhan Ainak Point</strong></p>
              <p className="text-gray-700">Phone: <a href="tel:+923171640134" className="text-emerald-600 hover:underline">03171640134</a></p>
              <p className="text-gray-700">Email: info@farhanainakpoint.com</p>
              <p className="text-gray-700">Address: Main Market, City Center, Karachi, Pakistan</p>
            </div>
          </section>
        </div>

        {/* Acknowledgment */}
        <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-center text-white">
          <p className="text-emerald-50">
            By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
