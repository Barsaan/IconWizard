'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../providers/auth-provider';
const DashboardNavbar = () => {
  const [isAIDropdownOpen, setIsAIDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedAIItem, setSelectedAIItem] = useState<string | null>(null);
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) {
    return (
      <nav className="fixed w-full z-50 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-8 border-b border-[#6F6F8780]">
          <div className="flex justify-between items-center h-16 w-full">
            <div className="flex items-center">
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Get user metadata safely
  const userMetadata = user?.user_metadata || {};

  return (
    <nav className="fixed w-full z-50 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8 border-b border-[#6F6F8780]">
        <div className="flex justify-between items-center h-16 w-full">
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

           {/* Center - Dashboard Navigation Links */}
          <div className="flex-1 hidden md:flex items-center justify-center space-x-8">
            <Link href="/dashboard" className="text-[#49454F] hover:text-gray-900 font-inter flex items-center space-x-2 px-3 py-2 rounded-md gap-1">
             <img src="/images/dashboard.svg" alt="Dashboard" />
              Dashboard
            </Link>

            {/* AI Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAIDropdownOpen(!isAIDropdownOpen)}
                className="text-[#49454F] hover:text-gray-900 font-inter flex items-center space-x-2 px-3 py-2 rounded-md gap-1 cursor-pointer"
              >
                <img src="/images/starstreak.svg" alt="AI Tools" />
                AI Tools
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isAIDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isAIDropdownOpen && (
                <div className="absolute left-0 mt-3 w-[480px] rounded-2xl bg-white border border-[#E5E5EA] p-2">
                  <div className="flex gap-6 bg-white rounded-2xl">
                    <div className="w-1/2 py-1">
                      <Link 
                        href="/icon-generator" 
                        className={`block px-4 py-2 text-base text-[#1E1E2F] ${pathname === '/icon-generator' ? 'bg-[#F2F2F7] rounded-xl pl-4' : 'hover:bg-[#F9F9F9]'} cursor-pointer whitespace-nowrap`}
                        onClick={() => setSelectedAIItem('icon-generator')}
                      >
                        Icon Generator
                      </Link>
                      <Link 
                        href="/image-promt" 
                        className={`block px-4 py-2 text-base text-[#1E1E2F] ${pathname === '/image-promt' ? 'bg-[#F2F2F7] rounded-xl pl-4' : 'hover:bg-[#F9F9F9]'} cursor-pointer whitespace-nowrap`} 
                        onClick={() => setSelectedAIItem('image-promt')}
                      >
                        Image to Prompt
                      </Link>
                      <Link 
                        href="/promt-image" 
                        className={`block px-4 py-2 text-base text-[#1E1E2F] ${pathname === '/promt-image' ? 'bg-[#F2F2F7] rounded-xl pl-4' : 'hover:bg-[#F9F9F9]'} cursor-pointer whitespace-nowrap`} 
                        onClick={() => setSelectedAIItem('promt-image')}
                      >
                        Prompt to Image
                      </Link>
                      <Link 
                        href="/dashboard/ai-tools/icon-optimizer" 
                        className={`block pl-4 py-2 text-base text-[#1E1E2F] ${pathname === '/dashboard/ai-tools/icon-optimizer' ? 'bg-[#F2F2F7] rounded-xl pl-4' : 'hover:bg-[#F9F9F9]'} cursor-pointer whitespace-nowrap`} 
                        onClick={() => setSelectedAIItem('icon-optimizer')}
                      >
                        <div className="flex items-center gap-1">
                          Studio Ghibli style
                          <span className="text-xs bg-[#FFC700] text-black px-2 py-0.5 rounded-[40px] italic">New</span>
                        </div>
                      </Link>
                    </div>
                    <div className="w-1/2 py-1">
                      <Link 
                        href="/dashboard/ai-tools/icon-batch" 
                        className={`block px-4 py-2 text-base text-[#1E1E2F] ${pathname === '/dashboard/ai-tools/icon-batch' ? 'bg-[#F2F2F7] rounded-xl pl-4' : 'hover:bg-[#F9F9F9]'} cursor-pointer whitespace-nowrap`} 
                        onClick={() => setSelectedAIItem('icon-batch')}
                      >
                        Disney style
                      </Link>
                      <Link 
                        href="/dashboard/ai-tools/icon-export" 
                        className={`block px-4 py-2 text-base text-[#1E1E2F] ${pathname === '/dashboard/ai-tools/icon-export' ? 'bg-[#F2F2F7] rounded-xl pl-4' : 'hover:bg-[#F9F9F9]'} cursor-pointer whitespace-nowrap`} 
                        onClick={() => setSelectedAIItem('linkedin-headshot')}
                      >
                        LinkedIn headshot
                      </Link>
                      <Link 
                        href="/dashboard/ai-tools/icon-export" 
                        className={`block px-3 py-2 text-base text-[#1E1E2F] ${pathname === '/dashboard/ai-tools/icon-export' ? 'bg-[#F2F2F7] rounded-xl pl-4' : 'hover:bg-[#F9F9F9]'} cursor-pointer whitespace-nowrap`} 
                        onClick={() => setSelectedAIItem('logo-mockup')}
                      >
                        Logo Mockup generator
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/gallery" className="text-[#49454F] hover:text-gray-900 font-inter flex items-center space-x-2 px-3 py-2 rounded-md gap-1">
             <img src="/images/gallery.svg" alt="Gallery" />
              Gallery
            </Link>
            <Link href="/favorites" className="text-[#49454F] hover:text-gray-900 font-inter flex items-center space-x-2 px-3 py-2 rounded-md gap-1">
             <img src="/images/favourates.svg" alt="Favorites" />
              Favorites
            </Link>
          </div>

          {/* Right side - User Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              {user ? (
                <>
                  {user.user_metadata?.avatar_url ? (
                    <Image 
                      src={user.user_metadata.avatar_url}
                      alt="Profile" 
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <img 
                      src="/images/profile-placeholder.png" 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </>
              ) : (
                <>
                  <img 
                    src="/images/profile-placeholder.png" 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                </>
              )}
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-3 border-b">
                  <div className="flex items-center space-x-3">
                    {user ? (
                      <>
                        <Image 
                          src={user.user_metadata?.avatar_url || '/images/profile-placeholder.png'}
                          alt="Profile" 
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.user_metadata?.full_name || 'User'}</p>
                          <p className="text-xs text-[#8E8E93]">{user.email}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <img 
                          src="/images/profile-placeholder.png" 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">User</p>
                          <p className="text-xs text-[#8E8E93]">user@example.com</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="py-1">
                  <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </Link>
                  <Link href="/dashboard/api-keys" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    API Keys
                  </Link>
                  <Link href="/dashboard/billing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Billing
                  </Link>
                  <Link href="/dashboard/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Help
                  </Link>
                  <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsAIDropdownOpen(!isAIDropdownOpen)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isAIDropdownOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-[#8E8E93] hover:text-gray-900 hover:bg-gray-50">
              Dashboard
            </Link>
            <Link href="/dashboard/generate" className="block px-3 py-2 rounded-md text-[#8E8E93] hover:text-gray-900 hover:bg-gray-50">
              Generate
            </Link>
            <Link href="/dashboard/gallery" className="block px-3 py-2 rounded-md text-[#8E8E93] hover:text-gray-900 hover:bg-gray-50">
              Gallery
            </Link>
            <Link href="/dashboard/favorites" className="block px-3 py-2 rounded-md text-[#8E8E93] hover:text-gray-900 hover:bg-gray-50">
              Favorites
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
