'use client';

import { Shield, Lock, Eye, UserCheck, Database, Bell } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-emerald-50">
              Your privacy is important to us. Learn how we protect your data.
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
            At Farhan Ainak Point, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-100">
          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600 mb-2">When you place an order or register on our site, we may collect:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Order history and preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                <p className="text-gray-600 mb-2">When you visit our website, we automatically collect:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Process and fulfill your orders</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Communicate with you about your orders, inquiries, or customer service issues</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Send you promotional materials and special offers (with your consent)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Improve our website, products, and services</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Detect and prevent fraud or security issues</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">Comply with legal obligations</span>
              </li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Service Providers</h3>
                <p className="text-gray-600 text-sm">
                  Third-party companies that help us operate our business (e.g., payment processors, shipping companies, marketing platforms). They are contractually obligated to protect your information.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Legal Requirements</h3>
                <p className="text-gray-600 text-sm">
                  When required by law or to protect our rights, we may disclose your information to law enforcement or regulatory authorities.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Business Transfers</h3>
                <p className="text-gray-600 text-sm">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information:
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Secure SSL encryption for data transmission</li>
                <li>• Secure servers and databases with restricted access</li>
                <li>• Regular security audits and updates</li>
                <li>• Payment information is processed through secure, PCI-compliant payment gateways</li>
                <li>• Employee training on data protection practices</li>
              </ul>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
            </div>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700"><strong>Access:</strong> Request a copy of the personal information we hold about you</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700"><strong>Correction:</strong> Request correction of inaccurate or incomplete information</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700"><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700"><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <span className="text-gray-700"><strong>Object:</strong> Object to processing of your personal information for certain purposes</span>
              </li>
            </ul>
            <p className="text-gray-600 mt-4 text-sm">
              To exercise these rights, please contact us at <a href="tel:+923171640134" className="text-emerald-600 hover:underline">03171640134</a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Provide personalized content and advertisements</li>
              <li>Analyze website traffic and performance</li>
            </ul>
            <p className="text-gray-600 mt-3 text-sm">
              You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Children's Privacy</h2>
            </div>
            <p className="text-gray-600">
              Our website and services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Changes to This Policy</h2>
            </div>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700"><strong>Farhan Ainak Point</strong></p>
              <p className="text-gray-700">Phone: <a href="tel:+923171640134" className="text-emerald-600 hover:underline">03171640134</a></p>
              <p className="text-gray-700">Email: info@farhanainakpoint.com</p>
              <p className="text-gray-700">Address: Main Market, City Center, Karachi, Pakistan</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
