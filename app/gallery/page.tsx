'use client'

import DashboardNavbar from '../components/NavBar/DashboardNavbar';
import { useState } from 'react';
import { IconsProvider } from '../../context/IconsContext';
import IconsGrid from '../components/IconsGrid';
import ImagesGrid from '../components/ImagesGrid';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('icons');
  const [searchTerm, setSearchTerm] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>(
    JSON.parse(localStorage.getItem('galleryImages') || '[]')
  );

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-26">
          <div className="flex justify-center items-center mb-8 flex-col">
            <h1 className="text-3xl font-bold mb-2">Gallery</h1>
            <p className="text-lg text-[#8E8E93] mb-8">Browse all your generated icons and designs in one place.</p>
            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              Create New Icon
            </button> */}
          </div>
          <div className=" rounded-lg  p-6">
            <div className="mb-6 flex justify-center">
              <div className="flex justify-center space-x-2 bg-[#F2F2F7] rounded-xl p-2">
                <button
                  onClick={() => setActiveTab('icons')}
                  className={`px-4 py-0.5 rounded-lg ${
                    activeTab === 'icons'
                      ? 'bg-white text-[#007AFF]'
                      : 'bg-[#F2F2F7] text-[#8E8E93]'
                  }`}
                >
                  Icons
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`px-4 py-0.5 rounded-lg ${
                    activeTab === 'categories'
                      ? 'bg-white text-[#007AFF]'
                      : 'bg-[#F2F2F7] text-[#8E8E93]'
                  }`}
                >
                  Categories
                </button>
              </div>
            </div>
              {/* <div className="flex items-center space-x-4">
                <select className="border rounded-lg px-3 py-2">
                  <option value="name">Name</option>
                  <option value="category">Category</option>
                </select>
                <input
                  type="text"
                  placeholder="Search..."
                  className="border rounded-lg px-3 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div> */}
            </div>
            {activeTab === 'icons' ? (
              <IconsProvider>
                <IconsGrid />
              </IconsProvider>
            ) : (
              <ImagesGrid images={galleryImages} />
            )}
          </div>
        </div>
   
    )
}
