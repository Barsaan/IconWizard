'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DashboardNavbar from '../components/NavBar/DashboardNavbar';
import { generateImagePrompt } from '@/app/lib/openai';
import OpenAI from 'openai';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

const ImagePromptGenerator = () => {
  const [selectedTab, setSelectedTab] = useState('uploadFile');
  const [imageUrl, setImageUrl] = useLocalStorage('image-url', '');
  const [previewImage, setPreviewImage] = useLocalStorage('preview-image', null);
  const [generatedPrompt, setGeneratedPrompt] = useLocalStorage('generated-prompt', '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!previewImage) return;
    
    setLoading(true);
    try {
      // Send the image file to our API route
      const formData = new FormData();
      const imageBlob = await fetch(previewImage).then(r => r.blob());
      formData.append('image', imageBlob, 'image.png');

      const response = await fetch('/api/image-analysis', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.details || 'Failed to analyze image');
      }

      const result = await response.json();
      console.log('API Response:', result);
      const description = result.description || 'Unable to analyze image';
      
      // Generate a detailed prompt using OpenAI
      const prompt = await generateImagePrompt(description);
      setGeneratedPrompt(prompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
      setError('Failed to generate prompt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-red-500 text-center mb-4">{error}</p>
            <button
              onClick={() => setError(null)}
              className="w-full bg-[#5C2ED1] text-white py-2 px-4 rounded-lg hover:bg-[#4a25a1]"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-16 md:py-28">
        {/* Page Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E1E2F] mb-2">Image to Prompt generator</h1>
          <p className="text-md md:text-lg text-[#6F6F87]">Upload an image or paste a URL to instantly extract a detailed AI </p>
          <p className="text-md md:text-lg text-[#6F6F87]">prompt</p>
        </div>

        {/* Main Content Area: Two Columns */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Left Column (Upload Section) */}
          <div className="lg:w-[508px]">
            <div className="bg-white rounded-[24px] shadow-sm p-6 h-auto">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#1E1E2F] mb-2">Upload Image</h3>
                <p className="text-sm text-[#6F6F87]">Upload an image or provide an image URL</p>
              </div>

              {/* Tab Navigation */}
              <div className="bg-[#F2F2F7] mb-6 rounded-xl p-1">
                <nav className="flex space-x-4" aria-label="Tabs">
                  <button
                    onClick={() => setSelectedTab('uploadFile')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium text-[#007AFF] ${
                      selectedTab === 'uploadFile' 
                        ? ' border-[#5C2ED1] text-[#5C2ED1] bg-white rounded-lg'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <img src={selectedTab === 'uploadFile' ? '/images/upload-coloured.svg' : '/images/upload.svg'} alt="upload" className="w-5 h-5" />
                    <span>Upload File</span>
                  </button>
                  <button
                    onClick={() => setSelectedTab('imageUrl')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium text-[#007AFF] ${
                      selectedTab === 'imageUrl'
                        ? ' border-[#5C2ED1] text-[#5C2ED1] bg-white rounded-lg'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <img src={selectedTab === 'imageUrl' ? '/images/copy-coloured.svg' : '/images/copy-url.svg'} alt="upload" className="w-5 h-5" />
                    <span>Image URL</span>
                  </button>
                </nav>
              </div>

              {/* Upload Section */}
              <div className="mb-4">
                {selectedTab === 'uploadFile' ? (
                   <div 
                     className="border-2 border-dashed border-[#D1D1D6] rounded-xl p-4 text-center flex flex-col items-center justify-center cursor-pointer hover:border-[#5C2ED1] h-[304px] relative"
                     onDragOver={(e) => {
                       e.preventDefault();
                       e.stopPropagation();
                     }}
                     onDrop={(e) => {
                       e.preventDefault();
                       e.stopPropagation();
                       const file = e.dataTransfer.files[0];
                       if (file && file.type.startsWith('image/')) {
                         const reader = new FileReader();
                         reader.onload = (event) => {
                           setImageUrl(event.target?.result as string);
                           setPreviewImage(event.target?.result as string);
                         };
                         reader.readAsDataURL(file);
                       }
                     }}
                   >
                     {!previewImage ? (
                       <>
                         <img src="/images/drag-drop.svg" alt="Drag and drop" width={34} height={34} className="mb-2"/>
                         <p className="text-sm md:text-base text-[#8E8E93]">Drag and drop your image file</p>
                         <p className="text-xs md:text-sm text-[#8E8E93] mt-1">Click or drag files to upload</p>
                       </>
                     ) : (
                       <div className="w-full h-full relative">
                         <Image 
                           src={previewImage} 
                           alt="Preview" 
                           fill 
                           className="object-contain"
                           priority
                         />
                       </div>
                     )}
                   </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full text-sm mb-66 px-4 py-2 border-2 border-[#D1D1D6] rounded-xl focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button 
                onClick={handleGenerate}
                className={`w-full text-white py-3 rounded-lg  text-md transition-colors duration-150 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] hover:bg-[#4a25a1]'}`}
                disabled={loading}
              >
                <div className="flex items-center justify-center space-x-2">
                  <img src="/images/generate.svg" alt="generate" className="w-5 h-5" />
                  <span>{loading ? 'Generating...' : '1 Generate Prompt'}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column (Generated Prompt) */}
          <div className="lg:w-[508px]">
            <div className="bg-white rounded-[24px] shadow-sm p-6 h-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#1E1E2F]">Generated Prompt</h3>
              </div>

              {/* Generated Prompt Section */}
              <div className="border-2 border-[#D1D1D6] rounded-xl p-4 mb-4 h-[396px] overflow-y-auto">
                <textarea
                  value={generatedPrompt}
                  readOnly
                  rows={16}
                  className="w-full px-4 py-3 border-0 rounded-xl focus:ring-0 focus:border-0 bg-transparent text-sm text-[#1E1E2F] placeholder:text-[#8E8E93] resize-none"
                  placeholder="The generated prompt will appear here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button 
                  onClick={() => {
                    if (generatedPrompt) {
                      navigator.clipboard.writeText(generatedPrompt);
                    }
                  }}
                  className="flex items-center space-x-2 bg-[#F2F2F7] hover:bg-[#E5E5F7] px-3 py-1.5 rounded-lg text-md text-[#1E1E2F]"
                >
                  <img src="/images/copy2.svg" alt="copy" className="w-4 h-4" />
                  <span>Copy Format</span>
                </button>
                <button 
                  onClick={handleGenerate}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-md transition-colors duration-150 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white hover:bg-[#4a25a1]'}`}
                  disabled={loading}
                >
                  <img src="/images/generate.svg" alt="generate" className="w-4 h-4" />
                  <span>Generate Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePromptGenerator;
