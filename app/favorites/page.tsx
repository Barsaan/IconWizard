

'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../providers/auth-provider';
import { useRouter } from 'next/navigation';

interface Favorite {
  id: string;
  name: string;
  image: string;
}

const Favorites = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    loadFavorites();
  }, [user]);

  const loadFavorites = () => {
    setLoading(true);
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (id: string) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.id !== id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No favorites yet. Generate some icons and save them as favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="bg-white rounded-3xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center overflow-hidden">
                    <img src={favorite.image} alt={`${favorite.name} style`} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-[#1E1E2F]">{favorite.name}</span>
                </div>
                <button 
                  onClick={() => removeFavorite(favorite.id)}
                  className="p-1 hover:bg-[#F2F2F7] rounded-full"
                >
                  <img src="/images/close.svg" alt="close" className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Image 1 */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={favorite.image} alt={`${favorite.name} image 1`} className="w-full h-full object-cover" />
                </div>
                {/* Image 2 */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={favorite.image} alt={`${favorite.name} image 2`} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <button className="p-2 hover:bg-[#F2F2F7] rounded-full">
                  <img src="/images/favourate.svg" alt="favourite" className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-[#F2F2F7] rounded-full">
                  <img src="/images/download-black.svg" alt="download" className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-[#F2F2F7] rounded-full">
                  <img src="/images/share.svg" alt="share" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;