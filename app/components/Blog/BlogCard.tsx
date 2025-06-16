import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

const BlogCard = ({ title, description, imageUrl, date }: BlogCardProps) => {
  const postSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  let staticRoute = '';
  switch (title) {
    case 'IconWizard: AI-Powered app Icon Generator':
      staticRoute = 'ai-powered-icon-generator';
      break;
    case 'How IconWizard Stands Out from Other AI Icon Generators':
      staticRoute = 'ai-standout';
      break;
    case 'AI-Powered Branding: Maintaining Consistency':
      staticRoute = 'ai-branding';
      break;
    case 'AI Design Tools: A Comprehensive Guide':
      staticRoute = 'ai-design-tools';
      break;
    default:
      staticRoute = postSlug;
  }
  
  return (
    <Link href={`/blog/${staticRoute}`} className="block">
      <div className="bg-white rounded-[24px] shadow-sm p-6 h-auto">
        <div className="relative h-[350px] w-full mb-6">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#1E1E2F]">{title}</h3>
          <p className="text-sm text-[#6F6F87] line-clamp-3">{description}</p>
          <div className="flex items-center justify-between pt-4">
            <span className="text-sm text-[#6F6F87]">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
