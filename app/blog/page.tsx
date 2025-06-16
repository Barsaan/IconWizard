'use client';

import React from 'react';
import DashboardNavbar from '../components/NavBar/DashboardNavbar';
import BlogCard from '../components/Blog/BlogCard';

const blogPosts = [
  {
    title: 'IconWizard: AI-Powered app Icon Generator',
    description: 'Discover how AI technology is revolutionizing the way we create and design icons. Learn about the latest advancements in AI-powered icon generation and how it can benefit your design workflow.',
    imageUrl: '/images/Blog 1.png',
    date: 'June 8, 2025'
  },
  {
    title: 'How IconWizard Stands Out from Other AI Icon Generators',
    description: 'Explore the best practices for integrating AI into your design process. From generating icons to creating entire design systems, learn how to leverage AI effectively while maintaining creative control.',
    imageUrl: '/images/Blog 2.png',
    date: 'June 1, 2025'
  },
  {
    title: 'AI-Powered Branding: Maintaining Consistency',
    description: 'Dive into the world of AI-powered branding and discover how AI can help maintain brand consistency while creating unique and engaging visual elements. Learn about the latest trends and case studies.',
    imageUrl: '/images/Blog 3.png',
    date: 'May 25, 2025'
  },
  {
    title: 'AI Design Tools: A Comprehensive Guide',
    description: 'Get an in-depth look at the most popular AI design tools available today. From icon generators to full design systems, discover which tools can best enhance your creative process.',
    imageUrl: '/images/Blog 4.png',
    date: 'May 18, 2025'
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <DashboardNavbar />
      
      <div className="container mx-auto px- py-38">
        <div className="lg:w-[1120px] mx-auto">
          {/* Page Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-[#1E1E2F] mb-2">Blog</h1>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post, index) => (
              <BlogCard
                key={index}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                
                date={post.date}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {blogPosts.slice(2).map((post, index) => (
              <BlogCard
                key={index + 2}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                date={post.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
