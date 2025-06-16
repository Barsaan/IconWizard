'use client';

import { useState } from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('usage');

  const usagePlans = [
    {
      title: 'Single Generation',
      price: '$0',
      features: [
        '1 Image Generation',
        '~ 60 Second generation time',
        'High quality output',
        'Instant download',
      ],
    },
    {
      title: 'Bundle Pack',
      price: '$5',
      features: [
        '5 Image Generation',
        '~ 60 Second generation time',
        'High quality output',
        'Instant download',
        '50% Discount',
      ],
      isPopular: true,
    },
  ];

  const monthlyPlans = [
    {
      title: 'Free Plan',
      price: '$0',
      features: [
        '1 Image Generation',
        '~ 60 Second generation time',
        'High quality output',
        'Instant download',
      ],
    },
    {
      title: 'Pro Plan',
      price: '$499',
      features: [
        'Generates 100 image generations',
        'AI image-to-prompt',
        'Unlock all styles (Ghibli, Disney, 3D)',
        'Upload sketches & reference images',
        'Commercial usage rights',
        'PNG & SVG downloads',
        'Community support',
      ],
      isPopular: true,
    },
    {
      title: 'Pro Plan',
      price: '$999',
      features: [
        'Unlimited Image Generation',
        'AI image-to-prompt',
        'Unlock all styles (Ghibli, Disney, 3D)',
        'Upload sketches & reference images',
        'Commercial usage rights',
        'Remove Background',
        'PNG & SVG downloads',
        'Community support',
        'Email Support',
      ],
    },
  ];

  const PricingCard = ({ title, price, features, isPopular, buttonText = 'Get Started', buttonLink = '#' }: PricingCardProps) => (
    <div className="w-[335px] bg-white rounded-3xl shadow-sm p-6 border-8 border-[#F2F2F7] flex-shrink-0 relative">
      {isPopular && (
        <div className="absolute top-[-8px] right-[-8px]">
          <img src="/images/Stars2.png" alt="popular" className=" rounded-3xl" style={{ filter: 'none' }} />
        </div>
      )}
      <h3 className="text-sm  text-[#1E1E2F] mb-4 text-left">{title}</h3>
      <div className="text-2xl font-medium text-[#1E1E2F] mb-4 text-left">{price}
        {activeTab === 'usage' ? (
          title === 'Single Generation' ? (
            <span className="text-sm font-normal text-[#8E8E93] ml-2">/Generation</span>
          ) : title === 'Bundle Pack' ? (
            <span className="text-sm font-normal text-[#8E8E93] ml-2">/Bundle</span>
          ) : null
        ) : (
          <span className="text-sm font-normal text-[#8E8E93] ml-2">per month</span>
        )}
      </div>
      <div className="flex items-center mb-6">
        <img src="/images/pricing-star.svg" alt="star" className="w-6 h-6 text-yellow-500" />
        {activeTab === 'usage' ? (
          title === 'Single Generation' ? (
            <span className="ml-2 text-sm text-[#1E1E2F]">1 Icon/Image Generation</span>
          ) : title === 'Bundle Pack' ? (
            <span className="ml-2 text-sm text-[#1E1E2F]">5 Icons/Image Generation</span>
          ) : null
        ) : (
          <span className="ml-2 text-sm text-[#1E1E2F]">
            {title === 'Free Plan' ? '3 Credits' : price === '$499' ? '100 Credits' : 'Unlimited Credits'}
          </span>
        )}
      </div>
      <button className={`w-full ${isPopular ? 'bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white hover:bg-[#4a25a1]' : 'bg-[#F2F2F7] text-[#6F6F87] hover:bg-[#E5E5EA]'} py-3 rounded-xl transition-colors mb-6`}>
        {buttonText}
      </button>

      {activeTab === 'monthly' && (
        <div className='text-left text-[#8E8E93] text-sm mb-6' >
          FEATURES
          {title === 'Free Plan' ? (
            <p className='text-[#8E8E93] text-xs mt-1'>Perfect to <span className='text-[#5C2ED1]'>explore IconWizard</span> </p>
          ) : title === 'Pro Plan' && price === '$499' ? (
            <p className='text-[#8E8E93] text-xs mt-1'>For <span className='text-[#5C2ED1]'>active creators & teams</span></p>
          ) : title === 'Pro Plan' && price === '$999' ? (
            <p className='text-[#8E8E93] text-xs mt-1'>For <span className='text-[#5C2ED1]'>heavy users & professionals</span></p>
          ) : null}
        </div>
      )}
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="">
              <img src="/images/checkmark.svg" alt="check" className="w-5 h-5" />
            </span>
            <span className="text-sm text-[#1E1E2F]">{feature}</span>
          </div>
        ))}
      </div>
     
    </div>
    
  );

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[40px] font-semibold text-gray-900 mb-2 font-inter">
          IconWizard <span className="bg-gradient-to-b from-[#5C2ED1] to-[#A175FF] text-transparent bg-clip-text">Pricing</span> Plans
        </h2>
        <p className="text-lg text-[#8E8E93] font-inter mb-10">
          Create stunning icons & images with flexible plans built for everyone.
        </p>

        <div className="mb-6 flex justify-center">
          <div className="flex justify-center space-x-2 bg-[#F2F2F7] rounded-xl  p-2">
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-4 py-0.5 rounded-lg ${
                activeTab === 'usage'
                  ? 'bg-white text-[#007AFF]'
                  : 'bg-[#F2F2F7] text-[#8E8E93]'
              }`}
            >
              Usage Plan
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4  rounded-lg ${
                activeTab === 'monthly'
                  ? 'bg-white text-[#007AFF]'
                  : 'bg-[#F2F2F7] text-[#8E8E93]'
              }`}
            >
              Monthly Plan
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-4xl mx-auto">
          {activeTab === 'usage' ? (
            usagePlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))
          ) : (
            monthlyPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))
          )}
        </div>
      </div>
      {activeTab === 'usage' && (
        <div className="mt-8 flex items-center justify-center space-x-2">
          <img src="/images/cofeee.png" alt="coffee" className="w-5 h-5 text-[#5C2ED1]" />
          <span className="text-sm text-[#6F6F87]">Cheaper than your daily Coffee, Just give it a try!</span>
        </div>
      )}
    </div>
  );
}