'use client';

import { RotateCcw, CheckCircle, XCircle, Clock, Package, AlertCircle } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <RotateCcw className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Return & Exchange Policy</h1>
            <p className="text-lg text-emerald-50">
              Your satisfaction is our priority. Easy returns within 7 days.
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
              <p className="font-semibold text-gray-900">7 Days</p>
              <p className="text-sm text-gray-600">Return Window</p>
            </div>
            <div className="text-center">
              <Package className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">Original Packaging</p>
              <p className="text-sm text-gray-600">Required</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">Easy Process</p>
              <p className="text-sm text-gray-600">Hassle-Free Returns</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-100">
          {/* Return Eligibility */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Return Eligibility</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We want you to be completely satisfied with your purchase. You may return or exchange products within 7 days of delivery if:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">The product is unused, unworn, and in original condition</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">All original tags, labels, and packaging are intact</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">You have the original invoice or proof of purchase</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">The product has not been damaged or altered</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Lenses are not scratched or damaged</span>
              </li>
            </ul>
          </section>

          {/* Non-Returnable Items */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Non-Returnable Items</h2>
            </div>
            <p className="text-gray-600 mb-4">
              For hygiene and quality reasons, the following items cannot be returned or exchanged:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Custom prescription lenses (unless defective)</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Products with visible signs of wear or use</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Items purchased during final sale or clearance (if specified)</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Contact lenses and eye drops</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Items without original packaging or tags</span>
              </li>
            </ul>
          </section>

          {/* How to Return */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <RotateCcw className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">How to Return or Exchange</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Contact Us</h3>
                    <p className="text-gray-600 text-sm">
                      Call us at <a href="tel:+923171640134" className="text-emerald-600 hover:underline">03171640134</a> or message us on WhatsApp within 7 days of receiving your order. Provide your order number and reason for return.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Get Approval</h3>
                    <p className="text-gray-600 text-sm">
                      Our team will review your request and provide a return authorization if eligible. We'll send you instructions for the return process.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Pack the Item</h3>
                    <p className="text-gray-600 text-sm">
                      Carefully pack the product in its original packaging with all accessories, tags, and the original invoice. Ensure the item is well protected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Ship or Drop Off</h3>
                    <p className="text-gray-600 text-sm">
                      Either ship the item back to us using our provided address, or visit our store in person. We recommend using a trackable shipping method.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Receive Refund/Exchange</h3>
                    <p className="text-gray-600 text-sm">
                      Once we receive and inspect the returned item (usually within 3-5 business days), we'll process your refund or send your exchange item.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Refund Process</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Approved refunds will be processed as follows:
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Cash on Delivery orders:</strong> Refund via bank transfer or store credit (your choice)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Online payment orders:</strong> Refund to original payment method within 7-10 business days
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>Shipping charges:</strong> Non-refundable unless the return is due to our error
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Defective Products */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Defective or Damaged Products</h2>
            </div>
            <p className="text-gray-600 mb-4">
              If you receive a defective or damaged product:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Contact us immediately (within 48 hours of delivery)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Provide photos of the defect or damage</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">We'll arrange a free replacement or full refund (including shipping)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">No return shipping cost for defective items</span>
              </li>
            </ul>
          </section>

          {/* Important Notes */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Important Notes</h2>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
              <p className="text-amber-900">
                <strong>Please note:</strong>
              </p>
              <ul className="space-y-2 text-amber-800 text-sm">
                <li>• Return shipping costs are the customer's responsibility unless the item is defective</li>
                <li>• We reserve the right to refuse returns that don't meet our policy criteria</li>
                <li>• Processing time for returns may be longer during peak seasons</li>
                <li>• Store credit never expires and can be used for future purchases</li>
                <li>• For hygiene reasons, please do not try on products extensively before deciding to return</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Need Help With a Return?</h2>
          <p className="text-emerald-50 mb-6">
            Our customer service team is ready to assist you with your return or exchange.
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
