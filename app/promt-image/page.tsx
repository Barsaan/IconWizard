'use client'

import React, { useState } from 'react';
import DashboardNavbar from '../components/NavBar/DashboardNavbar';
import { generateImage } from '@/app/lib/openai';
import { FiLoader } from 'react-icons/fi';
import CustomDropdown from '../components/CustomDropdown';

const PromptImageGenerator = () => {
  // Load saved state from localStorage
  const savedPrompt = localStorage.getItem('savedPrompt') || '';
  const savedImage = localStorage.getItem('savedImage');
  const savedStyle = localStorage.getItem('savedStyle') || 'studio_ghibli';
  const savedFormat = localStorage.getItem('savedFormat') || 'png';
  const savedGalleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
  const savedSize = localStorage.getItem('savedSize') || 'square';
  const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  const [imageUrl, setImageUrl] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(savedImage || null);
  const [galleryImages, setGalleryImages] = useState(savedGalleryImages);
  const [favorites, setFavorites] = useState(savedFavorites);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(savedPrompt);
  const [style, setStyle] = useState(savedStyle);
  const [format, setFormat] = useState(savedFormat);
  const [size, setSize] = useState(savedSize);
  const [isGhibliSelected, setIsGhibliSelected] = useState(format === 'ghibli');

  // Save state to localStorage when it changes
  React.useEffect(() => {
    localStorage.setItem('savedPrompt', prompt);
    localStorage.setItem('savedImage', generatedImage || '');
    localStorage.setItem('savedStyle', style);
    localStorage.setItem('savedFormat', format);
    localStorage.setItem('savedSize', size);
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [prompt, generatedImage, style, format, size, galleryImages, favorites]);

  // Add generated image to gallery
  const addToGallery = (imageUrl: string) => {
    const newGallery = [...galleryImages, imageUrl];
    setGalleryImages(newGallery);
  };

  // Handle image generation
  const handleGenerate = async () => {
    if (!prompt || !style || !format || !size) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // Create a refined prompt combining user input and selected style
      const refinedPrompt = `${prompt} in ${style} style, ${format} format, ${size} size`;
      console.log('Generating image with prompt:', refinedPrompt);

      // Clear any existing generated image
      setGeneratedImage(null);

      // Generate the image
      const imageUrl = await generateImage(refinedPrompt);
      
      // Update generated image
      setGeneratedImage(imageUrl);
      
      // Add to gallery
      const newGallery = [...galleryImages, imageUrl];
      setGalleryImages(newGallery);
      localStorage.setItem('galleryImages', JSON.stringify(newGallery));

      // Save the prompt that generated this image
      localStorage.setItem('savedPrompt', prompt);
      localStorage.setItem('savedStyle', style);
      localStorage.setItem('savedFormat', format);
      localStorage.setItem('savedSize', size);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImageUrl(base64Image);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing uploaded image:', error);
      alert('Failed to process the image. Please try again.');
    }
  };

  const handleCopyImage = async () => {
    if (!generatedImage) return;
    
    try {
      // Fetch the image as a blob
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      alert('Image copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy image:', err);
      alert('Failed to copy image to clipboard');
    }
  };

  const handleAddToFavorites = () => {
    if (!generatedImage) return;
    
    if (!favorites.includes(generatedImage)) {
      const newFavorites = [...favorites, generatedImage];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      alert('Added to favorites!');
    } else {
      alert('This image is already in your favorites!');
    }
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-generated-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-16 md:py-28">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E1E2F] mb-2">AI Image Generation</h1>
          <p className="text-md md:text-lg text-[#6F6F87]">State-of-art AI Image Generation Models from ChatGPT and OpenAI</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="lg:w-[508px]">
            <div className="bg-white rounded-[24px] shadow-sm p-6 h-auto">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#1E1E2F] mb-2">Upload Image</h3>
                <p className="text-sm text-[#6F6F87]">Upload an image or provide an image URL</p>
              </div>

              <div className="mb-6">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  id="imageUpload" 
                />
                <label 
                  htmlFor="imageUpload" 
                  className="border-2 border-dashed border-[#D1D1D6] rounded-xl p-4 text-center flex flex-col items-center justify-center cursor-pointer hover:border-[#5C2ED1] h-[304px]"
                >
                  <img src="/images/drag-drop.svg" alt="Drag and drop" width={34} height={34} className="mb-2"/>
                  <p className="text-sm md:text-base text-[#8E8E93]">Drag and drop your image file</p>
                  <p className="text-xs md:text-sm text-[#8E8E93] mt-1">Click or drag files to upload</p>
                </label>
              </div>

              {imageUrl && (
                <div className="mb-6">
                  <img 
                    src={imageUrl} 
                    alt="Uploaded" 
                    className="w-full h-[200px] object-contain rounded-lg"
                  />
                </div>
              )}

              {/* Prompt Section (Only shown when not Ghibli) */}
              {format !== 'ghibli' ? (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#1E1E2F] mb-2">Prompt</h3>
                  <div className="mb-4">
                    <textarea
                      className="w-full px-4 py-2 text-sm transition-colors duration-150 bg-[#F2F2F7] text-[#1E1E2F] rounded-lg focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                      rows={4}
                      placeholder="Describe what do you want to see..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <img src="/images/ghibli.svg" alt="Ghibli style" className="w-full  object-contain" />
                </div>
              )}

              {/* Style Selection */}
              <div>
                <div className="mb-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <CustomDropdown
                        value={format}
                        onChange={(value) => {
                          setFormat(value);
                          setIsGhibliSelected(value === 'ghibli');
                        }}
                        options={[
                          { value: '', label: 'No Style' },
                          { value: 'ghibli', label: 'Ghibli' },
                          { value: 'cartoon', label: 'Cartoon' },
                          { value: 'realistic', label: 'Realistic' }
                        ]}
                      />
                    </div>
                    <div className="flex-1">
                      <CustomDropdown
                        value={size}
                        onChange={setSize}
                        options={[
                          {
                            value: 'square',
                            label: 'Square',
                            icon: '/images/Rectangle.png'
                          }
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={loading || !prompt || !style || !format || !size}
                  className={`w-full text-white py-3 mt-12 rounded-lg text-md transition-colors duration-150 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] hover:bg-[#4a25a1] cursor-pointer'} flex items-center justify-center space-x-2`}
                >
                  {loading ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    <img src="/images/starsstreak-white.svg" alt="startstreak" className="w-5 h-5 text-white" />
                  )}
                  <span>{loading ? 'Generating...' : 'Generate'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Output Section) */}
          <div className="lg:w-[508px]">
            <div className="bg-white rounded-[24px] shadow-sm p-6 h-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#1E1E2F]">Output</h3>
                <div className="flex space-x-2">
                  {/* Refresh Button */}
                  <button 
                    onClick={handleGenerate}
                    disabled={!generatedImage || loading}
                    className='bg-[#F2F2F7] h-[28px] w-[28px] rounded-md flex items-center justify-center hover:bg-[#E5E5F7] disabled:opacity-50'
                  >
                    <img src="/images/refresh.svg" alt="refresh" />
                  </button>

                  {/* Expand Button */}
                  <button 
                    onClick={() => generatedImage && window.open(generatedImage, '_blank')}
                    disabled={!generatedImage}
                    className='bg-[#F2F2F7] h-[28px] w-[28px] rounded-md flex items-center justify-center hover:bg-[#E5E5F7] disabled:opacity-50'
                  >
                    <img src="/images/expand.svg" alt="expand" />
                  </button>

                  {/* Favorite Button */}
                  <button 
                    onClick={handleAddToFavorites}
                    disabled={!generatedImage}
                    className='bg-[#F2F2F7] h-[28px] w-[28px] rounded-md flex items-center justify-center hover:bg-[#E5E5F7] disabled:opacity-50'
                  >
                    <img src="/images/favourate.svg" alt="favourite" />
                  </button>

                  {/* Copy Button */}
                  <button 
                    onClick={handleCopyImage}
                    disabled={!generatedImage}
                    className='bg-[#F2F2F7] h-[28px] w-[28px] rounded-md flex items-center justify-center hover:bg-[#E5E5F7] disabled:opacity-50'
                  >
                    <img src="/images/copy.svg" alt="copy" />
                  </button>
                </div>
              </div>

              {/* Image Preview Section */}
              <div className="border-2 border-[#D1D1D6] rounded-xl p-4 mb-6" style={{
                height: isGhibliSelected ? '580px' : '488px'
              }}>
                {loading ? (
                  <div className="aspect-square rounded-xl p-4 text-center flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#5C2ED1]"></div>
                    <p className="text-sm text-[#007AFF] mt-4">Generating your image...</p>
                  </div>
                ) : (
                  <div className="aspect-square rounded-xl p-4 text-center flex flex-col items-center justify-center">
                    {generatedImage ? (
                      <img 
                        src={generatedImage}
                        alt="Generated"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div>
                          <img src="/images/generated.svg" alt="generated" className="w-full h-full" />
                        </div>
                        <p className="text-sm text-[#007AFF]">Your AI Generated image</p>
                        <p className="text-sm text-[#007AFF]">preview will appear here</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4 mb-4">
                <div className="flex-1">
                  <button 
                    onClick={handleCopyImage}
                    disabled={!generatedImage}
                    className="w-full flex items-center space-x-3 bg-[#F2F2F7] hover:bg-[#E5E5F7] px-6 py-2 rounded-lg text-sm text-[#1E1E2F] disabled:opacity-50"
                  >
                    <img src="/images/copy.svg" alt="copy" className="w-5 h-5" />
                    <span>Copy Image</span>
                  </button>
                </div>
                <div className="flex-1">
                  <button 
                    onClick={handleAddToFavorites}
                    disabled={!generatedImage}
                    className="w-full flex items-center space-x-3 bg-[#F2F2F7] hover:bg-[#E5E5F7] px-6 py-2 rounded-lg text-sm text-[#1E1E2F] disabled:opacity-50"
                  >
                    <img src="/images/favourate.svg" alt="favourite" className="w-5 h-5" />
                    <span>Add to Favourites</span>
                  </button>
                </div>
              </div>

              {/* Download Button */}
              <button 
                onClick={handleDownloadImage}
                disabled={!generatedImage}
                className={`w-full text-white py-3 mt-11 rounded-lg text-md transition-colors duration-150 bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] hover:bg-[#4a25a1] flex items-center justify-center space-x-2 disabled:opacity-50`}
              >
                <img src="/images/download.svg" alt="download" className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* My Results Section */}
        <div className="my-36">
          <h2 className="text-2xl font-semibold text-[#1E1E2F] mb-2 text-center">My Results</h2>
          <p className="text-lg text-[#8E8E93] mb-6 text-center">All your AI generated images</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1016px] mx-auto">
            {/* Left Card */}
            <div className="bg-white rounded-3xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center overflow-hidden">
                    <img src="/images/ghibli2.svg" alt="Ghibli style" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-[#1E1E2F]">Ghibli style</span>
                </div>
                <button className="p-1 hover:bg-[#F2F2F7] rounded-full">
                  <img src="/images/close.svg" alt="close" className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Image 1 */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img src="/images/ghibli2.svg" alt="Ghibli image 1" className="w-full h-full object-cover" />
                </div>
                {/* Image 2 */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img src="/images/ghibli3.svg" alt="Ghibli image 2" className="w-full h-full object-cover" />
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

            {/* Right Card */}
            <div className="bg-white rounded-3xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center overflow-hidden">
                    <img src="/images/ghibli2.svg" alt="Ghibli style" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-[#1E1E2F]">Ghibli style</span>
                </div>
                <button className="p-1 hover:bg-[#F2F2F7] rounded-full">
                  <img src="/images/close.svg" alt="close" className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Image 1 */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img src="/images/ghibli2.svg" alt="Ghibli image 1" className="w-full h-full object-cover" />
                </div>
                {/* Image 2 */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img src="/images/ghibli3.svg" alt="Ghibli image 2" className="w-full h-full object-cover" />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptImageGenerator;