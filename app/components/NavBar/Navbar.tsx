'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '../../providers/auth-provider';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (!user) {
      router.push('/auth/signin');
    } else {
      router.push(path);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed w-full z-50  backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <Image
                src="/images/logo.svg"
                alt="IconWizard Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-gray-900 font-inter">IconWizard</span>
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-[#8E8E93] hover:text-gray-900 font-inter flex items-center cursor-pointer"
              >
                AI Tools
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleNavigation('/icon-generator')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer w-full text-left"
                    >
                      Icon Generator
                    </button>
                    <button
                      onClick={() => handleNavigation('/image-promt')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer w-full text-left"
                    >
                      Image to Prompt
                    </button>
                    <button
                      onClick={() => handleNavigation('/promt-image')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer w-full text-left"
                    >
                      Prompt to Image
                    </button>
                    <button
                      onClick={() => handleNavigation('/tools/icon-optimizer')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer w-full text-left"
                    >
                      Icon Optimizer
                    </button>
                    <button
                      onClick={() => handleNavigation('/tools/icon-batch')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer w-full text-left"
                    >
                      Batch Processing
                    </button>
                    <button
                      onClick={() => handleNavigation('/tools/icon-export')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer w-full text-left"
                    >
                      Export Options
                    </button>
                  </div>
                </div>
              )}
            </div>
            <a href="#pricing" className="text-[#8E8E93] hover:text-gray-900 cursor-pointer">
              Pricing
            </a>
            {user ? (
              <Link href="/dashboard" className="text-[#8E8E93] hover:text-gray-900 cursor-pointer">
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => router.push('/auth/signin')}
                className="text-[#8E8E93] hover:text-gray-900 cursor-pointer"
              >
                Dashboard
              </button>
            )}
          </div>

          {/* Right side - Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                href="/dashboard"
                className="bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white px-4 py-2 rounded-lg hover:bg-[#4a25a1] transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/signin" className="text-[#8E8E93] hover:text-gray-900 px-3 py-2">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white px-4 py-2 rounded-lg hover:bg-[#4a25a1] transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 