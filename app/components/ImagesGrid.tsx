import React from 'react';

interface ImagesGridProps {
  images: string[];
}

const ImagesGrid: React.FC<ImagesGridProps> = ({ images }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No images in gallery yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((imageUrl, index) => (
        <div key={index} className="relative group">
          <div 
            onClick={() => window.open(imageUrl, '_blank')}
            className="w-full h-48 rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 group-hover:scale-105 bg-white"
          >
            <img
              src={imageUrl}
              alt={`Generated ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = 'data:image/png;base64,' + imageUrl;
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagesGrid;
