'use client'

import { useEffect } from 'react';
import DashboardNavbar from '../components/NavBar/DashboardNavbar';
import { useAuth } from '../providers/auth-provider';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { GeneratorCard } from '../components/GeneratorCard';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [favorites, setFavorites] = useState<any[]>([]);

  // Function to handle favorite/unfavorite
  const handleFavorite = (id: string, name: string, image: string) => {
    try {
      // Check if already favorited
      const isAlreadyFavorite = favorites.some(fav => fav.id === id);
      
      if (isAlreadyFavorite) {
        // Remove from favorites
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        // Add to favorites
        const newFavorite = { id, name, image };
        const updatedFavorites = [...favorites, newFavorite];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  useEffect(() => {
    console.log('Loading favorites from localStorage');
    const savedFavorites = localStorage.getItem('favorites');
    console.log('Saved favorites:', savedFavorites);
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      console.log('Parsed favorites:', parsedFavorites);
      setFavorites(parsedFavorites);
    }
  }, []);

  // Check if user is undefined (initializing state)
  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Use useEffect for redirection to avoid render phase updates
  useEffect(() => {
    // Redirect to sign-in if not authenticated
    if (!user && pathname === '/dashboard') {
      router.push('/auth/signin');
    }
    // Redirect to landing page if authenticated but on sign-in page
    if (user && pathname === '/auth/signin') {
      router.push('/');
    }
  }, [user, router, pathname]);

  // If not authenticated and not initializing, show error message
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-28 text-center">
        <h1 className="text-2xl font-semibold text-black mb-2">Dashboard</h1>
        <p className="text-lg text-[#8E8E93] mb-8">
        Transform your photos into magical AI-generated styles in just one click.
        </p>

        {/* Filter chips */}
        <div className="flex flex-col gap-4 mb-8 justify-center w-full">
          <div className="flex justify-center gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-[#A175FF] to-[#A175FF] via-[#5C2ED1] via-50% text-white rounded-full text-sm">
              New
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 text-sm">
              Trending
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 text-sm">
              All
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 text-sm">
              Illustration
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 text-sm">
              Mockup
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 text-sm">
              Ghibli
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 text-sm">
              Disney
            </button>
          </div>
          <div className="flex justify-center gap-2">
            <button className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 text-sm">
              Chibi sticker
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 text-sm">
              Headshot
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 flex items-center gap-1 text-sm">
              Expand
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Generator cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <GeneratorCard
            id="ghibli"
            name="Ghibli style"
            image="/images/ghibli.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 2 */}
          <GeneratorCard
            id="linkedin"
            name="AI Linkedin Headshots Generator"
            image="/images/linkdin-headshot.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 3 */}
          <GeneratorCard
            id="packaging"
            name="Packaging Mockup Generator"
            image="/images/moackup.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 4 */}
          <GeneratorCard
            id="3d"
            name="3D Logo Mockup Generator"
            image="/images/3D.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 5 */}
          <GeneratorCard
            id="disney"
            name="Disney-Style Characters"
            image="/images/disney.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 6 */}
          <GeneratorCard
            id="custom"
            name="Custom Action Figures with AI"
            image="/images/custom.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 7 */}
          <GeneratorCard
            id="chibi"
            name="Chibi-Style Stickers"
            image="/images/chibli.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 8 */}
          <GeneratorCard
            id="hand-drawn"
            name="Hand-Drawn Sketches"
            image="/images/hand-drawn.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 9 */}
          <GeneratorCard
            id="anime"
            name="Anime-Style Art"
            image="/images/anime.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 11 */}
          <GeneratorCard
            id="oil"
            name="Oil Painting style"
            image="/images/oil.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 12 */}
          <GeneratorCard
            id="brand"
            name="Brand Moodboards"
            image="/images/brand.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 13 */}
          <GeneratorCard
            id="selfie"
            name="AI Selfies to Headshots"
            image="/images/ai-selfie.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 14 */}
          <GeneratorCard
            id="pixar"
            name="Pixar Style Figures"
            image="/images/pixar.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 15 */}
          <GeneratorCard
            id="pet"
            name="AI Chibi Pet Portrait"
            image="/images/ai-chibli.svg"
            onFavorite={handleFavorite}
          />
          {/* Card 4 */}
          <GeneratorCard
            id="3d"
            name="3D Logo Mockup Generator"
            image="/images/3D.svg"
            onFavorite={handleFavorite}
          />
         
        </div>
      </div>
    </div>
  )
}
