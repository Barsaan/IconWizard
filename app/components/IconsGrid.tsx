'use client'

import { useIcons, Icon } from '../../context/IconsContext';
import Image from 'next/image';
import { useState } from 'react';
import { FiMaximize } from 'react-icons/fi';

export default function IconsGrid() {
  const { icons, removeIcon } = useIcons();
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

  const handleCloseModal = () => {
    setSelectedIcon(null);
  };

  const handleDelete = (icon: Icon) => {
    removeIcon(icon.id);
    setSelectedIcon(null);
  };

  const handleExpand = (icon: Icon) => {
    setSelectedIcon(icon);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {icons.map((icon: Icon) => (
          <div key={icon.id} className="bg-white rounded-lg p-4 shadow-md">
            <div className="relative w-full h-48 mb-4 cursor-pointer" onClick={() => handleExpand(icon)}>
              <Image
                src={icon.url}
                alt={icon.appName}
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                <FiMaximize className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-1">{icon.appName}</h3>
            <p className="text-gray-600 text-sm mb-4">{icon.description}</p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => handleDelete(icon)}
                className="p-2 hover:bg-red-100 rounded-full text-red-500"
                title="Delete"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button 
                onClick={() => navigator.clipboard.writeText(icon.url)}
                className="p-2 hover:bg-blue-100 rounded-full text-blue-500"
                title="Copy URL"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedIcon && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedIcon?.appName}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative w-full h-[400px] mb-4">
              <img
                src={selectedIcon?.url || ''}
                alt={selectedIcon?.appName || ''}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-gray-600 mb-4">{selectedIcon?.description}</p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => handleDelete(selectedIcon)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button 
                onClick={() => navigator.clipboard.writeText(selectedIcon.url)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
      <div onClick={handleCloseModal} className={`fixed inset-0 ${selectedIcon ? 'block' : 'hidden'}`} />
    </>
  );
}
