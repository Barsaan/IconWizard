import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Features = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-semibold text-gray-900 mb-4 font-inter">
            Why You'll Love <span className="bg-gradient-to-b from-[#5C2ED1] to-[#A175FF] text-transparent bg-clip-text ">IconWizard🪄</span> 
          </h2>
          <p className="text-lg text-[#8E8E93] font-inter">
            Smarter, faster, and way more fun here's what makes IconWizard your
          </p>
          <p className="text-lg text-[#8E8E93] font-inter">
            go-to creative partner.
          </p>
        </div>

        {/* First Feature Section */}
        <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/feature 1.svg"
              alt="iOS Style Modern Icons"
              width={600}
              height={400}
              className="rounded-2xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-[#A175FF] font-semibold mb-2 text-sm">iOS-STYLE MODERN ICONS</p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-inter">🧠 AI-Powered Modern Icons</h3>
            <div className="text-[#8E8E93] mb-6">
              <p>Want to generate modern app icons that stand out?</p>
              <p>No problem. Just submit your app name and industry, and let</p>
              <p>AI do the heavy-lifting.</p>
            </div>
            <Link
              href="/icon-generator"
              className="text-[#8E8E93] bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all border border-[#A175FF] inline-block transition-colors"
            >
              Try now
            </Link>
          </div>
        </div>

        {/* Second Feature Section */}
        <div className="flex flex-col md:flex-row-reverse items-start gap-12 mb-20">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/feature 2.svg"
              alt="Custom Style Icons"
              width={600}
              height={400}
              className="rounded-2xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-[#A175FF] font-semibold mb-2 text-sm">CUSTOM STYLE ICONS</p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-inter">🎨 Style Your Way</h3>
            <div className="text-[#8E8E93] mb-6">
              <p>After you upload an image, we will transform that image</p>
              <p>into beautiful AI generated styles, from Ghibli, Disney,</p>
              <p>anime, pencil sketch styles and more. One image, certainly</p>
              <p>lots of styles.</p>

            </div>
            <Link
              href="/prompt-image"
              className="text-[#8E8E93] bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all border border-[#A175FF] inline-block transition-colors"
            >
              Try now
            </Link>
          </div>
        </div>

        {/* Third Feature Section */}
        <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/feature 3.svg"
              alt="Instant Download"
              width={600}
              height={400}
              className="rounded-2xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-[#A175FF] font-semibold mb-2 text-sm">INSTANT DOWNLOAD</p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-inter">✨ Quick & Easy</h3>
            <div className="text-[#8E8E93] mb-6">
              <p>Type your idea or select a prompt we suggest, and </p>
              <p> instantly create visually stunning images created just to</p>
              <p>suit your imagination - no design experience required.</p>
            </div>

            
            <Link
              href="/promt-image"
              className="text-[#8E8E93] bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all border border-[#A175FF] inline-block transition-colors"
            >
              Try now
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-start gap-12 mb-20">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/feature 4.svg"
              alt="Custom Style Icons"
              width={600}
              height={400}
              className="rounded-2xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-[#A175FF] font-semibold mb-2 text-sm">CUSTOM STYLE ICONS</p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-inter">🖼️ Style Your Way</h3>
            <div className="text-[#8E8E93] mb-6">
              <p>Just upload any image or paste a url of your image, and</p>
              <p>IconWizard will generate specific prompts, so you can</p>
              <p>remake, remix or iterate using AI.</p>
            </div>

              
            <Link
              href="/image-promt"
              className="text-[#8E8E93] bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all border border-[#A175FF] inline-block transition-colors"
            >
              Try now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
