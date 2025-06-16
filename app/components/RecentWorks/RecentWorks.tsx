'use client';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const icons = [
  '/images/crypto.svg',
  '/images/Cooking app.svg',
  '/images/plant.svg',
  '/images/Finance.svg',
  '/images/fitness.svg',
  '/images/fitness 1 1.svg',
  '/images/gaming.svg',
  '/images/ecommerce 1.svg',
  '/images/Calender.svg',
  '/images/eco.svg',
  '/images/travel.svg',
  '/images/pet.svg',
  '/images/music discover 1.svg',
  '/images/music 1.svg',
  '/images/mental.svg',
  '/images/language.svg',
  '/images/Education app 1.svg',
  '/images/Journal app 1.svg',
  '/images/interior app 1.svg',
  '/images/camera.svg',
  '/images/Cooking app.svg',

];

const RecentWorks = () => {
  return (
    <div className="py-20 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-[40px] font-semibold text-gray-900 mb-2 font-inter">
          Recent <span className="bg-gradient-to-b from-[#5C2ED1] to-[#A175FF] text-transparent bg-clip-text">Works</span>
        </h2>
        <p className="text-lg text-[#8E8E93] font-inter">
          Let AI show how easy it is to create strong, unique and 
        </p>
        <p className="text-lg text-[#8E8E93] font-inter">top-quality app icons in just a few seconds.</p>
      </div>

      <div className="relative mt-12 space-y-12">
  {/* Left gradient image */}
  <div className="absolute left-0 top-0 h-full w-48 z-10 pointer-events-none">
    <Image
      src="/images/gradient-left.svg"
      alt="Left gradient"
      fill
      className="object-cover"
    />
  </div>

  {/* Right gradient image */}
  <div className="absolute right-0 top-0 h-full w-48 z-10 pointer-events-none">
    <Image
      src="/images/gradient-left.svg"
      alt="Right gradient"
      fill
      className="object-cover rotate-180"
    />
  </div>

  {/* Marquee Rows */}
  <Marquee direction="left" speed={50} gradient={false}>
    {icons.map((icon, index) => (
      <div key={`top-${index}`} className="w-24 h-24 mr-8 rounded-xl overflow-hidden shrink-0">
        <Image
          src={icon}
          alt={`Icon ${index}`}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </Marquee>

  <Marquee direction="right" speed={50} gradient={false}>
    {icons.map((icon, index) => (
      <div key={`bottom-${index}`} className="w-24 h-24 mr-8 rounded-xl overflow-hidden shrink-0">
        <Image
          src={icon}
          alt={`Icon ${index}`}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </Marquee>
</div>

    </div>
  );
};

export default RecentWorks;