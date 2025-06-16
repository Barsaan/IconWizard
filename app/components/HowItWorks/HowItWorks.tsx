import React from 'react';
import Image from 'next/image';

const HowItWorks = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[40px] font-semibold text-gray-900 mb-2 font-inter">
            <span className='bg-gradient-to-b from-[#5C2ED1] to-[#A175FF] text-transparent bg-clip-text'>How </span>It Works
        </h2>
        <p className="text-lg text-[#8E8E93] font-inter ">
          You can design attractive custom app icons using only 3 Easy Steps. Type 
        </p>
        <p className="text-lg text-[#8E8E93] font-inter mb-16">in your app name, pick out a style and let our AI do the work.</p>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
          {/* Card 1 */}
          <div className="w-[420px] h-[379px] bg-white rounded-[24px] p-6 shadow-lg md:mr-3 flex flex-col border border-[#E5E5EA]">
            <div className="w-full h-[280px] relative">
              <Image
                src="/images/step 1 illustration.png"
                alt="Step 1"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4">
              <p className="text-[#A175FF] font-semibold mb-1">Step 1</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Describe your App</h3>
              <p className="text-[#8E8E93] text-sm">Enter your app name and purpose in the text field. Our AI will provide smart suggestions to help generate the perfect icon.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-[420px] h-[379px] bg-white rounded-[24px] p-6 shadow-lg my-6 md:my-0 md:mx-3 flex flex-col border border-[#E5E5EA]">
            <div className="w-full h-[280px] relative">
              <Image
                src="/images/step 2 illustration.png"
                alt="Step 2"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4">
              <p className="text-[#A175FF] font-semibold mb-1">Step 2</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Customize or Upload</h3>
              <p className="text-[#8E8E93] text-sm">You can choose the icon style and your preferred colour palette, submit an image of your idea or ask AI to do the work!</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-[420px] h-[379px] bg-white rounded-[24px] p-6 shadow-lg md:ml-3 flex flex-col border border-[#E5E5EA]">
            <div className="w-full h-[280px] relative">
              <Image
                src="/images/step 3 illustration.png"
                alt="Step 3"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4">
              <p className="text-[#A175FF] font-semibold mb-1">Step 3</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Generate & Download</h3>
              <p className="text-[#8E8E93] text-sm">Just press "Generate" and IconWizard will make your icons instantly, suited to your choices. Instantly download the app!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
