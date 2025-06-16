'use client';

import { useState, useEffect } from 'react';
import { isStyleFavorited, toggleFavorite } from '../../lib/supabase/favorites';

interface FavoriteButtonProps {
  styleId: string;
  styleName: string;
  styleImage: string;
}

export default function FavoriteButton({ styleId, styleName, styleImage }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, [styleId]);

  const checkFavoriteStatus = async () => {
    try {
      const favorited = await isStyleFavorited(styleId);
      setIsFavorited(favorited);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const newStatus = await toggleFavorite(styleId, styleName, styleImage);
      if (newStatus !== undefined) {
        setIsFavorited(newStatus);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="w-6 h-6 hover:text-red-500 transition-colors"
    >
      <svg 
        fill={isFavorited ? "currentColor" : "none"} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
}