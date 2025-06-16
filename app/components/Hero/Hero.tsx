'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/auth-provider';
import ReviewCard from '../ReviewCard';

const Hero = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Grid Background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-grids.png"
          alt=""
          fill
          className="object-cover w-full h-full opacity-100"
          priority
        />
      </div>

      <div className="relative z-10">
        {/* Top Content Section */}
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div className="flex items-center mb-6 bg-[#A175FF1A] backdrop-blur-sm px-4 py-2 rounded-full text-sm w-fit mx-auto">
                <span className="text-purple-500 mr-1.5">✨</span>
                <span className='text-[#A175FF] text-lg font-inter font-medium'>Get free credits on Sign-up</span>
              </div>
              <h1 className="text-6xl font-semibold text-gray-900 leading-tight font-inter">
                Generate <span className="bg-gradient-to-b from-[#5C2ED1] to-[#A175FF] text-transparent bg-clip-text tracking-wider">Designer-Grade</span> iOS App Icons in Seconds
              </h1>
              <div className="space-y-1">
                <p className="text-xl text-[#8E8E93] font-inter">
                  Just enter your app name and purpose our AI handles the rest.
                </p>
                <p className="text-xl text-[#8E8E93] font-inter">
                  No design skills needed.
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white px-8 py-3 rounded-lg text-lg font-medium hover:opacity-90 transition-all border border-[#A175FF] font-inter"
                  >
                    Get Started Free {'->'}
                  </Link>
                ) : (
                  <button
                    onClick={() => router.push('/auth/signin')}
                    className="bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white px-8 py-3 rounded-lg text-lg font-medium hover:opacity-90 transition-all border border-[#A175FF] font-inter cursor-pointer"
                  >
                    Get Started Free {'->'}
                  </button>
                )}
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors bg-[#1E1E2F] font-inter flex items-center space-x-2 cursor-pointer"
                >
                  <img src="/images/write.svg" alt="" className="w-5 h-5" />
                  <span>Write Review</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Image Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10" />
          <div className="absolute inset-0 flex justify-center">
            <div className="w-[80%] h-full relative">
              <video
                src="/images/video.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="rounded-lg shadow-lg p-6 w-[508px] mx-auto">
            <ReviewCard onClose={() => setShowReviewModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;