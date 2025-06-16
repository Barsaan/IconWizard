'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/auth-provider';

type ParallaxIcon = {
  src: string;
  alt: string;
  top: string;
  left?: string;
  right?: string;
  animationClass: string;
  delay?: number;
};

const icons: ParallaxIcon[] = [
  { src: '/images/pet.svg', alt: 'Pet', top: '10rem', left: '2.5rem', animationClass: 'float-up', delay: 0 },
  { src: '/images/gaming.svg', alt: 'Gaming', top: '1.5rem', left: '12.5rem', animationClass: 'float-left', delay: 0.1 },
  { src: '/images/health.svg', alt: 'Health', top: '13rem', left: '20rem', animationClass: 'float-diagonal-1', delay: 0.2 },
  { src: '/images/eco.svg', alt: 'Eco', top: '23rem', left: '8.5rem', animationClass: 'float-right', delay: 0.3 },
  { src: '/images/Cooking app.svg', alt: 'Cooking', top: '27rem', left: '42.5rem', animationClass: 'float-up', delay: 0.4 },
  { src: '/images/plant.svg', alt: 'Plant', top: '3.75rem', left: '33rem', animationClass: 'float-left', delay: 0.5 },
  { src: '/images/interior app 1.svg', alt: 'Interior', top: '10rem', right: '2.5rem', animationClass: 'float-diagonal-2', delay: 0.6 },
  { src: '/images/Calender.svg', alt: 'Calendar', top: '1.5rem', right: '12.5rem', animationClass: 'float-right', delay: 0.7 },
  { src: '/images/Education app 1.svg', alt: 'Education', top: '13rem', right: '20rem', animationClass: 'float-up', delay: 0.8 },
  { src: '/images/camera.svg', alt: 'Camera', top: '23rem', right: '8.5rem', animationClass: 'float-left', delay: 0.9 },
  { src: '/images/travel.svg', alt: 'Travel', top: '23.75rem', right: '41.25rem', animationClass: 'float-diagonal-1', delay: 1 },
  { src: '/images/pet.svg', alt: 'Pet2', top: '3.75rem', right: '33rem', animationClass: 'float-diagonal-2', delay: 1.1 },
];

const StartBuilding = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="relative py-48 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating icons */}
      {icons.map((icon, index) => (
        <div
          key={index}
          className="absolute w-24 h-24"
          style={{ top: icon.top, left: icon.left, right: icon.right }}
        >
          <div
            className={`w-full h-full rounded-xl overflow-hidden ${icon.animationClass}`}
            style={{ animationDelay: `${icon.delay ?? 0}s` }}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        <div className="flex items-center justify-center mb-6">
          <img src="/images/ctamainicon.svg" alt="" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2 font-inter">
          Start building on{' '}
          <span className="bg-gradient-to-b from-[#5C2ED1] to-[#A175FF] text-transparent bg-clip-text">
            IconWizard
          </span>
        </h2>

        <p className="text-lg text-[#8E8E93] font-inter mb-8">
          Unleash the power of AI
        </p>

        {user ? (
          <Link
            href="/dashboard"
            className="px-8 py-3 inline-block bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white rounded-2xl text-lg font-medium hover:opacity-90 transition-all border border-[#A175FF] font-inter"
          >
            Try Now For Free {'->'}
          </Link>
        ) : (
          <button
            onClick={() => router.push('/auth/signin')}
            className="px-8 py-3 inline-block bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white rounded-2xl text-lg font-medium hover:opacity-90 transition-all border border-[#A175FF] font-inter cursor-pointer"
          >
            Try Now For Free {'->'}
          </button>
        )}
      </div>

      {/* Embedded CSS animations */}
      <style jsx>{`
        @keyframes float-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-left {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-10px); }
        }

        @keyframes float-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }

        @keyframes float-diagonal-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }

        @keyframes float-diagonal-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 10px); }
        }

        .float-up {
          animation: float-up 2s ease-in-out infinite;
        }

        .float-left {
          animation: float-left 4s ease-in-out infinite;
        }

        .float-right {
          animation: float-right 2s ease-in-out infinite;
        }

        .float-diagonal-1 {
          animation: float-diagonal-1 2s ease-in-out infinite;
        }

        .float-diagonal-2 {
          animation: float-diagonal-2 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default StartBuilding;
