'use client';

import { useState, useEffect } from 'react';

interface GeneratorCardProps {
  id: string;
  name: string;
  image: string;
  onFavorite: (id: string, name: string, image: string) => void;
  isFavorite?: boolean;
}

export function GeneratorCard({ id, name, image, onFavorite, isFavorite = false }: GeneratorCardProps) {
  const [isFavorited, setIsFavorited] = useState(isFavorite);

  useEffect(() => {
    setIsFavorited(isFavorite);
  }, [isFavorite]);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite(id, name, image);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-6">
        <h3 className="text-lg font-medium text-[#1E1E2F]">{name}</h3>
        <button 
          onClick={toggleFavorite}
          className={`${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill={isFavorited ? 'currentColor' : 'none'} stroke={isFavorited ? 'none' : 'currentColor'} strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="relative px-6 pb-6">
        <img 
          src={image} 
          alt={`${name} preview`} 
          className="w-full object-cover rounded-3xl"
        />
      </div>
    </div>
  );
}
