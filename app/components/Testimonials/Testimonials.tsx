import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa';
import Link from 'next/link';

const Testimonials = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-semibold text-gray-900 mb-4 font-inter">
            What Our <span className="bg-gradient-to-b from-[#5C2ED1] to-[#A175FF] text-transparent bg-clip-text ">Happy Users</span>  Say!
          </h2>
          <p className="text-lg text-[#8E8E93] font-inter">
            Smarter, faster, and way more fun here's what makes IconWizard your
          </p>
          <p className="text-lg text-[#8E8E93] font-inter">
            ultimate creative companion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D1D1D6] min-h-[280px] flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <Image
                src="/images/person 1.svg"
                alt="Sarah Johnson"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Emma Watson</h3>
                <p className="text-[#8E8E93] text-sm">UXUI Designer</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">
              As a designer, visuals matter most. IconWizard saved me hours by generating sleek, iOS-style app icons with just a few inputs. The AI suggestions are pure gold. This tool belongs in every designer's kit.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <img src="/images/link.svg" alt="" />

            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D1D1D6] min-h-[280px] flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <Image
                src="/images/person 2.svg"
                alt="Michael Chen"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Andrew Garfield</h3>
                <p className="text-[#8E8E93] text-sm">Full Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">
            I'm not a designer, but I care about clean UI. IconWizard lets me generate pixel-perfect icons without diving into Figma. It's like having a design partner on standby 24/7!
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <img src="/images/link.svg" alt="" />

            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D1D1D6] min-h-[280px] flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <Image
                src="/images/person 3.svg"
                alt="Emma Rodriguez"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Sydney Sweeney</h3>
                <p className="text-[#8E8E93] text-sm">Marketing Expert</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">
            Consistent branding is everything in marketing. IconWizard helped me produce beautiful, brand-specific icons that instantly grabbed attention. It's fast, intuitive, and super smart!
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <img src="/images/link.svg" alt="" />
            </div>
            
          </div>
          
        </div>
        <div className="flex justify-center mt-12">
          <Link
            href="/demo"
            className="text-white px-8 py-3 rounded-2xl text-lg font-medium transition-colors bg-[#1E1E2F] font-inter flex items-center space-x-2"
          >
            <img src="/images/load.svg" alt="" className="w-5 h-5" />
            <span>Load more</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
