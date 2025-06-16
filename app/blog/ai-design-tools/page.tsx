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
              <img src="/images/Blog 4.png" alt="AI Design Tools: A Comprehensive Guide" className="w-full rounded-lg mb-8" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#1E1E2F] mb-4">AI Design Tools: A Comprehensive Guide</h1>
              <p className="text-base text-[#6F6F87]">May 18, 2025</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Get an in-depth look at the most popular AI design tools available today. From icon generators to full design systems, discover which tools can best enhance your creative process.</p>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Top AI Design Tools</h2>
                <ul className="list-disc list-inside text-base text-[#6F6F87] leading-relaxed mb-4">
                  <li>Icon generators</li>
                  <li>Design system builders</li>
                  <li>UI/UX prototyping tools</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Best Practices</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Tips for integrating AI tools into your design workflow effectively.</p>
              </section>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
