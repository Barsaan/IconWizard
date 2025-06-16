'use client';

import React from 'react';
import DashboardNavbar from '../../components/NavBar/DashboardNavbar';

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <DashboardNavbar />
      
      <div className="container mx-auto px- py-38">
        <div className="lg:w-[1120px] mx-auto">
          <article className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <img src="/images/Blog 3.png" alt="AI-Powered Branding: Maintaining Consistency" className="w-full rounded-lg mb-8" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#1E1E2F] mb-4">AI-Powered Branding: Maintaining Consistency</h1>
              <p className="text-base text-[#6F6F87]">May 25, 2025</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Dive into the world of AI-powered branding and discover how AI can help maintain brand consistency while creating unique and engaging visual elements. Learn about the latest trends and case studies.</p>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Key Benefits of AI in Branding</h2>
                <ul className="list-disc list-inside text-base text-[#6F6F87] leading-relaxed mb-4">
                  <li>Consistent color schemes across all brand assets</li>
                  <li>Automated logo variations for different contexts</li>
                  <li>Brand guideline enforcement through AI</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Case Studies</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Real-world examples of successful AI-powered branding implementations.</p>
              </section>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
