import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className=" text-[#1E1E2F] font-inter text-base pt-16 pb-4 bg-[#F9F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-sm text-[#8E8E93] transition-colors">Generate App Icons</Link></li>
              <li><Link href="/pricing" className="text-sm text-[#8E8E93]  transition-colors">Image to Style</Link></li>
              <li><Link href="/templates" className="text-sm text-[#8E8E93]  transition-colors">Prompt to Image</Link></li>
              <li><Link href="/updates" className="text-sm text-[#8E8E93] transition-colors">Prompt to Image</Link></li>
              <li><Link href="/updates" className="text-sm text-[#8E8E93] transition-colors">Dashboard (if logged in)</Link></li>

            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-[#8E8E93]  transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-sm text-[#8E8E93]  transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-[#8E8E93]  transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/documentation" className="text-sm text-[#8E8E93]  transition-colors">Tutorials</Link></li>
              <li><Link href="/guides" className="text-sm text-[#8E8E93]  transition-colors">How It Works</Link></li>
              <li><Link href="/api" className="text-sm text-[#8E8E93]  transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-[#8E8E93] transition-colors">Terms of Service </Link></li>
              <li><Link href="/terms" className="text-sm text-[#8E8E93] transition-colors">Privacy policy</Link></li>
              <li><Link href="/cookies" className="text-sm text-[#8E8E93] transition-colors">Refund policy</Link></li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Social</h3>
            <ul className="space-y-3">
              <li><Link href="https://twitter.com" className="text-sm text-[#8E8E93]  transition-colors">Twitter / X</Link></li>
              <li><Link href="https://linkedin.com" className="text-sm text-[#8E8E93] transition-colors">Buy me coffee</Link></li>
           
            </ul>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="pt-8 text-center">
          <p className="text-gray-400">
            © 2025 IconWizard. Built with 💖️ to make your app stand out.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 