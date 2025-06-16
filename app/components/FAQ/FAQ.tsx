'use client'


import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is IconWizard?",
      answer: "IconWizard is an AI-powered tool that helps you generate modern, professional app icons. Simply provide your app name and industry, and our AI will create stunning icons that match your brand's style."
    },
    {
      question: "How does IconWizard work?",
      answer: "Our process is simple: 1) Enter your app name and industry, 2) Choose your preferred style or upload a reference, 3) Let our AI generate multiple icon options, 4) Download your favorite design in various sizes and formats."
    },
    {
      question: "What styles of icons can I create?",
      answer: "IconWizard supports various styles including iOS-style modern icons, custom styles, and more. You can also upload your own reference image to match your desired style perfectly."
    },
    {
      question: "What file formats are supported?",
      answer: "We support all major icon formats including PNG, SVG, and ICO. You can download your icons in multiple sizes to ensure compatibility across different platforms and devices."
    },
    {
      question: "How long does it take to generate icons?",
      answer: "Our AI generates icons almost instantly! You'll have your custom icons ready to download within seconds of submitting your request."
    },
    {
      question: "Can I customize the generated icons?",
      answer: "Yes! You can customize colors, styles, and other elements of your icons. Our AI will adapt to your preferences to create the perfect match for your brand."
    },
    {
      question: "Do I need design experience to use IconWizard?",
      answer: "Not at all! IconWizard is designed to be user-friendly for everyone, from professional designers to complete beginners. Our AI handles the complex design work for you."
    },
    {
      question: "What sizes are the icons available in?",
      answer: "We provide icons in all standard sizes needed for various platforms, including iOS, Android, and web applications. This includes sizes from 16x16 to 1024x1024 pixels."
    },
    {
      question: "Can I use the icons commercially?",
      answer: "Yes! All icons generated through IconWizard are yours to use in any project, including commercial applications. You retain full rights to the generated designs."
    },
    {
      question: "How many icons can I generate?",
      answer: "The number of icons you can generate depends on your subscription plan. We offer various plans to suit different needs, from individual developers to large teams."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We're confident you'll love your icons, but if you're not completely satisfied, you can generate new options or contact our support team for assistance."
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-semibold text-gray-900 mb-4 font-inter">
            Frequently Asked <span className="bg-gradient-to-b from-[#5C2ED1] to-[#A175FF] text-transparent bg-clip-text">Questions</span>
          </h2>
          <p className="text-lg text-[#8E8E93] font-inter">
            These are the most commonly asked questions about IconWizard.
          </p>
          <p className="text-lg text-[#8E8E93] font-inter">
            Can't find what you're looking for? Contact us!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#E5E5EA] rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
               
<img src="/images/drowpdown.svg" alt="" 
className={`w-5 h-5 transition-transform ${
  openIndex === index ? 'transform rotate-180' : ''
}`}
/>

              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-[#D1D1D6]">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 