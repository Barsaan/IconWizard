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
              <h1 className="text-[32px] font-semibold text-[#1E1E2F] mb-4">IconWizard: AI-Powered app Icon Generator</h1>
              <div className="text-base text-[#6F6F87] flex items-center justify-center">
                <span className="mr-2">June 8, 2025</span>
                <span className="flex items-center">•</span>
                <span className="ml-2">3 min read</span>
              </div>
            </div>

            <div className="mb-8">
              <img 
                src="/images/Blog 1.png" 
                alt="IconWizard Blog" 
                className="w-full  object-cover rounded-lg"
              />
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Welcome to IconWizard</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Want to create professional-looking app icons in only a few moments? Meet IconWizard — your go-to AI-powered icon generator that helps developers, designers, and creators craft custom app icons in seconds.</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Today, we will introduce IconWizard, show you how it functions, and explain why it’s the top choice for those who want to create a striking app icon with no trouble or excess cost.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">What does IconWizard do?</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">IconWizard is a cutting-edge AI app icon generator that allows users to create stunning, professional-quality icons by simply entering a few prompts.</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Whether you're creating a mobile app, starting a business, or building a project for personal use, IconWizard allows you to have your app's identity ready immediately.</p>
                <div className="bg-[#A175FF1A] p-6 rounded-lg">
                <p className="text-[#A175FF] text-base font-normal ">Without prior knowledge of design, people can easily create their own unique icons for their app by specifying its name, what it does, and what style it has</p>
              </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">How IconWizard works?</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Let me show you how to use IconWizard to design your app icon:</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4 font-bold underline">1. Give Basic Information</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Specify the app’s name, write its description, and choose the industry from the list.</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4 font-bold underline">2. Choose How Your Icons Should Look</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">You can use designs like:</p>
                <ul className="list-disc list-inside text-base text-[#6F6F87] leading-relaxed mb-4">
                  <li>Flat</li>
                  <li>3D</li>
                  <li>Gradient</li>
                  <li>Minimal</li>
                  <li>Pixel</li>
                  <li>Neon</li>
                </ul>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4 font-bold underline">3. AI-Prompt ideas</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">After Specifying the app’s name, write its description, and click the AI-Prompt ideas button and AI will generate the Icon ideas for you.</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4 font-bold underline">4. Generate & Download</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">With IconWizard, everything is completed for you and a high-res icon is downloaded.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Key Aspects</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4 font-bold ">✅ Automated Icons Creation with AI</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Generate icons fast by using the AI suggestions it provides for various sectors and styles.</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4 font-bold ">✅ Turn Image into a Beautiful Icon</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Put in any sketch or reference image you have and IconWizard will use AI to make it into a fully polished icon.</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4 font-bold ">✅ Varied Forms and Messages</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Choose from:</p>
                <ul className="list-disc list-inside text-base text-[#6F6F87] leading-relaxed mb-4">
                  <li>Clear and simple symbol icons</li>
                  <li>Contemporary icons with lots of shading</li>
                  <li>3D icons</li>
                  <li>Pixel art</li>
                  <li>Neon glow</li>
                  <li>Clay-style illustrations</li>
                  <li>and more.</li>
                </ul>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">You should use the results of this test to determine how to use and structure your images.  Take any image and rely on the system for an accurate prompt for image-to-icon conversion.</p>
                
                <p className="text-base text-[#6F6F87] leading-relaxed font-bold ">(Coming Soon)</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Use our <span className='font-bold'>mockup</span> generator to view your icon the way it will appear in the store, on mobiles, or package design</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Which Users Should Try IconWizard?</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">If you’re looking for a tool that does these exact things, <span className='font-bold'>IconWizard</span> is a great option.</p>
                <ul className="list-disc list-inside text-base text-[#6F6F87] leading-relaxed mb-4">
                  <li><span className='font-bold'>Startups & Indie Makers</span>:Set up a clear brand image even if you do not hire a designer.</li>
                  <li><span className='font-bold'>UX/UI Designers</span>:Streamline the generation of new ideas and change icons.</li>
                  <li><span className='font-bold'>Marketers & Content Creators</span>Create visually impressive materials for a product or brand’s launch.</li>
                </ul>
                <p className="text-base text-[#6F6F87] leading-relaxed ">Are you in a hurry to design an app icon? </p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Pass over Figma and Photoshop when making your mock-ups.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Why IconWizard Over Others?</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">Thanks to AI and unique prompts, IconWizard gives you original icons that adjust to your app’s style instead of just offering the same designs many times over.</p>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">You get to combine AI image creation and real-time design tips — which helps you create in a quick, well-controlled way.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-4">Final Thoughts</h2>
                <p className="text-base text-[#6F6F87] leading-relaxed mb-4">If you don’t like the usual icons and want to put less effort into design, IconWizard will make your brand stand out.</p>
              </section>
              <div className="bg-[#A175FF1A] p-6 rounded-lg">
                <p className="text-[#A175FF] text-base font-normal ">You can build an icon fast, fully customize it, and get great results even without any design training.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;