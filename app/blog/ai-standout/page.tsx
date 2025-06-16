'use client';

import React from 'react';
import DashboardNavbar from '../../components/NavBar/DashboardNavbar';
import { useRouter } from 'next/navigation';

const BlogPost = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <DashboardNavbar />
      
      <div className="container mx-auto px-4 py-28">
        <div className="lg:w-[1120px] mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-[#6F6F87] hover:text-[#1E1E2F] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          </div>
          
          <article className=" p-6">
            <div className="mb-8 text-center">
              <h1 className="text-[32px] font-semibold text-[#1E1E2F] mb-4">How IconWizard Stands Out from Other AI Icon Generators</h1>
              <div className="text-base text-[#6F6F87] flex items-center justify-center">
                <span className="mr-2">June 8, 2025</span>
                <span className="flex items-center">•</span>
                <span className="ml-2">3 min read</span>
              </div>
            </div>

            <div className="mb-8">
              <img 
                src="/images/Blog 2.png" 
                alt="IconWizard Blog" 
                className="w-full  object-cover rounded-lg"
              />
            </div>

            <div className="space-y-8">
              <section>
              <p className="text-base text-[#6F6F87] leading-relaxed mb-4 font-bold ">"IconWizard is the world’s first and most accurate AI-powered icon generator available online." </p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Icon generators usually supply templates that are similar to each other. This website has many more features than you may think. It’s a next-gen AI icon generator that lets you craft high-quality, custom app icons in seconds. Whether you want to generate app icons online using text prompts, upload your sketch, or even use a reference image IconWizard brings your vision to life </p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Our tools can be useful to people who aren’t professional designers. In development, making your own apps or simply creative, you’ll be sure to appreciate all of these useful features.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Creating icons by using suggestions from AI</h2>
               <ul className="list-disc list-inside text-base text-[#6F6F87] leading-relaxed mb-4">
                <li>You can upload any image or describe about icon and right away get a AI prompt ideas ready to use.</li>
              </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Changes in style include:</h2>
                <ul className="list-disc list-inside text-base text-[#6F6F87] leading-relaxed mb-4">
                <li>Ghibli</li>
                <li>Anime</li>
                <li>Disney</li>
                <li>Professional LinkedIn headshots</li>
                <li>Mockup generator</li>
                <li>And other genres</li>
              </ul>
              </section>


              <section>
              <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Rates are flexible:</h2>
<ul className="list-disc list-inside text-base text-[#6F6F87] leading-relaxed mb-4">
  <li>3 trials are offered first</li>
</ul>
<p className="text-base text-[#6F6F87] leading-relaxed mb-4">After which payments are made for your usage.</p>
              
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Everyone can use IconWizard:</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">If you’re looking for a tool that does these exact things, <span className='font-bold'>IconWizard</span> is a great option.</p>
                <ul className="list-disc list-inside text-base text-[#6F6F87] leading-relaxed mb-4">
                  <li><span className='font-bold'>Anyone</span>: You do need any design experience to start generating Icon.</li>
                  <li><span className='font-bold'>Startups & Indie Makers</span>: Set up a clear brand image even if you do not hire a designer.</li>
                  <li><span className='font-bold'>UX/UI Designers & Graphic Designers</span>: Streamline the generation of new ideas and change icons.</li>
                  <li><span className='font-bold'>Marketers & Content Creators</span>:Create visually impressive materials for a product or brand’s launch.</li>
                </ul>
                <p className="text-base text-[#6F6F87] leading-relaxed ">You can simple copy the Icons from IconWizard and paste it over Figma, Photoshop or any design apps. Saves your precious time!</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Why IconWizard Over Others?</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Thanks to AI and unique prompts, IconWizard gives you original icons that adjust to your app’s style instead of just offering the same designs many times over. </p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">You get to combine AI image creation and real-time design tips — which helps you create in a quick, well-controlled way.</p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Final Thoughts</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">If you don’t like the usual icons and want to put less effort into design, IconWizard will make your brand stand out. </p>
              </section>

              
              <div className="bg-[#A175FF1A] p-6 rounded-lg">
                <p className="text-[#A175FF] text-base font-normal ">You can build an icon fast, fully customize it, and get great results even without any design experience.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;