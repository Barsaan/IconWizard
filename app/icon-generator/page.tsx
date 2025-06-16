'use client'

import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/auth-provider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DashboardNavbar from '../components/NavBar/DashboardNavbar';
import { FiChevronDown, FiChevronUp, FiUploadCloud, FiRefreshCw, FiMaximize, FiHeart, FiCopy } from 'react-icons/fi';
import { generateImagePrompt, generateImage } from '@/app/lib/openai';
import { useIcons, Icon } from '../../context/IconsContext';

const IconGenerator = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPromptIdeas, setShowPromptIdeas] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [favorites, setFavorites] = useState<{ id: string; name: string; icon: string; timestamp: string }[]>([]);
  const { addIcon } = useIcons();
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [generatedIcon, setGeneratedIcon] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedResolution, setSelectedResolution] = useState('1024x1024');
  const [selectedFormat, setSelectedFormat] = useState('PNG');

  // Load persisted state on component mount
  useEffect(() => {
    const savedPrompt = localStorage.getItem('iconGeneratorPrompt');
    const savedGeneratedIcon = localStorage.getItem('iconGeneratorIcon');
    const savedAppName = localStorage.getItem('iconGeneratorAppName');
    const savedAppDescription = localStorage.getItem('iconGeneratorAppDescription');

    if (savedPrompt) setPrompt(savedPrompt);
    if (savedGeneratedIcon) setGeneratedIcon(savedGeneratedIcon);
    if (savedAppName) setAppName(savedAppName);
    if (savedAppDescription) setAppDescription(savedAppDescription);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (prompt) localStorage.setItem('iconGeneratorPrompt', prompt);
    if (generatedIcon) localStorage.setItem('iconGeneratorIcon', generatedIcon);
    if (appName) localStorage.setItem('iconGeneratorAppName', appName);
    if (appDescription) localStorage.setItem('iconGeneratorAppDescription', appDescription);
  }, [prompt, generatedIcon, appName, appDescription]);

  const handleGenerate = async () => {
    // Clear previous localStorage if needed
    localStorage.removeItem('iconGeneratorIcon');
    setGeneratedIcon(null);

    if (!prompt.trim()) {
      alert('Please enter a prompt description');
      return;
    }

    setLoading(true);
    setGenerationProgress(0);
    try {
      // Simulate progress 
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });
      }, 1000);

      // Generate refined prompt
      console.log('Generating refined prompt with:', prompt);
      const refinedPrompt = await generateImagePrompt(prompt);
      console.log('Refined Prompt:', refinedPrompt);

      // Generate icon using OpenAI
      console.log('Generating icon with refined prompt');
      const iconUrl = await generateImage(refinedPrompt);
      console.log('Generated Icon URL:', iconUrl);

      // Clear progress interval
      clearInterval(progressInterval);
      setGenerationProgress(100);

      // Add the generated icon to the gallery
      const newIcon: Icon = {
        id: crypto.randomUUID(),
        url: iconUrl,
        appName: appName || 'Generated Icon',
        description: refinedPrompt,
        timestamp: new Date().toISOString()
      };
      
      addIcon(newIcon);
      setGeneratedIcon(iconUrl);
      setLoading(false);
    } catch (error) {
      console.error('Icon generation error:', error);
      alert('Failed to generate icon. Please check the console for details.');
      setLoading(false);
    }
  };

  const downloadImage = (imageUrl: string, format: string, name: string) => {
    // Create a server-side proxy download function
    const proxyDownload = async () => {
      try {
        // Send the image URL to an API route for download
        const response = await fetch('/api/download-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            imageUrl, 
            format, 
            name: name || 'generated-icon' 
          }),
        });

        if (!response.ok) {
          throw new Error('Download proxy failed');
        }

        // Get the blob from the response
        const blob = await response.blob();

        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        
        // Set filename with appropriate extension
        const filename = `${name || 'generated-icon'}.${format.toLowerCase()}`;
        link.download = filename;
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Proxy download failed:', error);
        alert('Failed to download image. Please try again or contact support.');
      }
    };

    // Execute the proxy download
    proxyDownload();
  };

  // Clear localStorage when component unmounts or when you want to reset
  const clearPersistedState = () => {
    localStorage.removeItem('iconGeneratorPrompt');
    localStorage.removeItem('iconGeneratorIcon');
    localStorage.removeItem('iconGeneratorAppName');
    localStorage.removeItem('iconGeneratorAppDescription');
    
    // Reset state
    setPrompt('');
    setGeneratedIcon(null);
    setAppName('');
    setAppDescription('');
  };

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-16 md:py-28">
        {/* Page Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E1E2F] mb-2">iOS App Icon Generator</h1>
          <p className="text-md md:text-lg text-[#6F6F87]">Smart AI tool to create professional iOS app icons in just a few </p>
          <p className="text-md md:text-lg text-[#6F6F87]">clicks</p>
        </div>

        {/* Main Content Area: Two Columns */}
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left Column (Inputs) */}
          <div className="lg:w-2/3 space-y-8">
            {/* App Name & Description Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <div className="mb-6">
                <label htmlFor="appName" className="block text-lg font-semibold text-[#1E1E2F] mb-2">
                  App Name
                </label>
                <input
                  type="text"
                  id="appName"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                  placeholder="Type your app name"
                />
              </div>
              <div> 
                <label htmlFor="appDescription" className="block text-lg font-semibold text-[#1E1E2F] mb-2">
                  App Description
                </label>
                <input
                  id="appDescription"
                  value={appDescription}
                  onChange={(e) => setAppDescription(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                  placeholder="Describe your app’s purpose..."
                />
                <p className="text-sm text-[#6F6F87] mt-2 mb-4">
                  Describe your app to help generate a relevant icon
                </p>
              </div>
            </div>

            {/* Prompt Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#1E1E2F]">Prompt for your Icon</h3>
                  <button
                    onClick={() => setShowPromptIdeas(!showPromptIdeas)}
                    className="flex items-center space-x-2 bg-[#A175FF33] text-[#A175FF] hover:bg-[#A175FF44] px-4 py-2 rounded-lg text-sm"
                  >
                    <Image src="/images/ai-promt.svg" alt="AI Prompt Ideas" width={20} height={20} unoptimized={true} />
                    <span>AI Prompt Ideas</span>
                  </button>
                </div>
                {showPromptIdeas && (
                  <div className="bg-[#F5F5FF] rounded-lg p-4 mb-4">
                    <p className="text-sm text-[#6F6F87]">Here are some examples of great icon prompts:</p>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm text-[#1E1E2F]">"A minimalist dog paw for a pet app"</li>
                      <li className="text-sm text-[#1E1E2F]">"A modern camera icon with a soft gradient"</li>
                      <li className="text-sm text-[#1E1E2F]">"A clean, geometric clock for a time management app"</li>
                    </ul>
                  </div>
                )}
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent"
                  placeholder="e.g., 'A minimalist dog paw for a pet app'"
                />
                <p className="text-sm text-[#6F6F87] mt-2">
                  For best results - start with modern app icon featuring (main element), on (color/gradient) background, iOS style
                </p>
              </div>
            </div>

            {/* Upload & Style Reference Cards Container */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full sm:w-1/2 bg-white rounded-3xl shadow-sm py-8 px-6 md:px-8">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold text-[#1E1E2F]">Upload Logo</h3>
                  <span className="text-sm bg-[#FFC700] text-black px-2 py-0.5 rounded-[40px]">Pro</span>
                </div>
                <div className="border-2 border-dashed border-[#D1D1D6] rounded-xl p-4  text-center flex flex-col items-center justify-center cursor-pointer hover:border-[#5C2ED1] h-[120px] md:h-[140px]">
                  <Image src="/images/drag-drop.svg" alt="Drag and drop" width={34} height={34} className="mb-2" unoptimized={true} />
                  <p className="text-sm md:text-base text-[#8E8E93]">Drag and drop your logo file</p>
                  <p className="text-xs md:text-sm text-[#8E8E93] mt-1">Click or drag files to upload</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 bg-white rounded-3xl shadow-sm py-8 px-6 md:px-8">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold text-[#1E1E2F]">Style Reference</h3>
                  <span className="text-sm bg-[#FFC700] text-black px-2 py-0.5 rounded-[40px]">Pro</span>
                </div>
                <div className="border-2 border-dashed border-[#D1D1D6] rounded-xl p-4 text-center flex flex-col items-center justify-center cursor-pointer hover:border-[#5C2ED1] h-[120px] md:h-[140px]">
                  <Image src="/images/drag-drop.svg" alt="Drag and drop" width={34} height={34} className="mb-2" unoptimized={true} />
                  <p className="text-sm md:text-base text-[#8E8E93]">Drag and drop your style image</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end items-center">
              <button 
                onClick={handleGenerate}
                className={`text-white py-3 px-6 rounded-xl font-medium text-base transition-colors duration-150 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] hover:bg-[#4a25a1]'}`}
                disabled={loading}
              >
                <div className="flex items-center space-x-2">
                  <Image src="/images/generate.svg" alt="generate" width={20} height={20} unoptimized={true} />
                  <span>{loading ? 'Generating...' : 'Generate Icon'}</span>
                </div>
              </button>
            </div>
           
          </div>

          {/* Right Column (Output) */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#1E1E2F]">Output</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleGenerate}
                    className={`bg-[#F2F2F7] h-[28px] w-[28px] rounded-md flex items-center justify-center hover:bg-[#E5E5F7] transition-colors duration-150 ${loading ? 'cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    <Image src="/images/refresh.svg" alt="refresh" width={20} height={20} unoptimized={true} />
                  </button>
                  <button
                    onClick={() => {
                      if (generatedIcon) {
                        addIcon({
                          id: Date.now().toString(),
                          url: generatedIcon,
                          appName,
                          description: appDescription,
                          timestamp: new Date().toISOString()
                        });
                        alert('Icon added to favorites!');
                      }
                    }}
                    className='bg-[#F2F2F7] h-[28px] w-[28px] rounded-md flex items-center justify-center hover:bg-[#E5E5F7] transition-colors duration-150'
                  >
                    <Image src="/images/favourate.svg" alt="favorite" width={20} height={20} unoptimized={true} />
                  </button>
                  <button
                    onClick={async () => {
                      if (generatedIcon) {
                        try {
                          // Create a new canvas and image element
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d');
                          if (!ctx) {
                            throw new Error('Failed to get 2D context from canvas');
                          }
                          const img = new HTMLImageElement();
                          
                          // Set up image loading
                          img.crossOrigin = 'Anonymous';
                          img.src = generatedIcon;
                          
                          // Wait for image to load
                          await new Promise<void>((resolve) => {
                            img.onload = () => {
                              // Set canvas size to match image
                              canvas.width = img.width;
                              canvas.height = img.height;
                              
                              // Draw image to canvas
                              ctx?.drawImage(img, 0, 0);
                              
                              // Convert canvas to PNG data URL
                              const dataUrl = canvas.toDataURL('image/png');
                              
                              // Convert to blob
                              fetch(dataUrl).then(response => 
                                response.blob().then(blob => {
                                  // Create clipboard item
                                  const imageData = new ClipboardItem({
                                    'image/png': blob
                                  });
                                  
                                  // Copy to clipboard
                                  navigator.clipboard.write([imageData]).then(() => {
                                    alert('Icon copied to clipboard!');
                                  }).catch(error => {
                                    console.error('Error copying to clipboard:', error);
                                    alert('Failed to copy icon. Please try again.');
                                  });
                                })
                              ).catch(error => {
                                console.error('Error converting to blob:', error);
                                alert('Failed to copy icon. Please try again.');
                              });
                              resolve();
                            };
                          });
                        } catch (error) {
                          console.error('Error copying image:', error);
                          alert('Failed to copy icon. Please try again.');
                        }
                      }
                    }}
                    className='bg-[#F2F2F7] h-[28px] w-[28px] rounded-md flex items-center justify-center hover:bg-[#E5E5F7] transition-colors duration-150'
                  >
                    <Image src="/images/copy.svg" alt="copy" width={20} height={20} unoptimized={true} />
                  </button>
                  <button
                    onClick={() => {
                      if (generatedIcon) {
                        // Create a modal overlay
                        const modal = document.createElement('div');
                        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                        
                        // Create the expanded image container
                        const container = document.createElement('div');
                        container.className = 'bg-white rounded-lg p-8 max-w-2xl mx-4';
                        // ...
                      }
                    }}
                    className='bg-[#F2F2F7] h-[28px] w-[28px] rounded-md flex items-center justify-center hover:bg-[#E5E5F7] transition-colors duration-150'
                  >
                    <Image src="/images/expand.svg" alt="expand" width={20} height={20} unoptimized={true} />
                  </button>
                </div>
              </div>
              {loading ? (
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative w-64 h-64">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#5C2ED1]"></div>
                    </div>
                  </div>
                  <div className="text-gray-600">Generating your icon...</div>
                </div>
              ) : (
                <div className="border-2 border-[#D1D1D6] rounded-xl aspect-square flex items-center justify-center mb-6 p-4 relative">
                  {generatedIcon ? (
                    <Image 
                      src={generatedIcon} 
                      alt="Generated Icon" 
                      fill 
                      style={{ objectFit: 'contain' }} 
                      className="rounded-xl"
                      unoptimized={true}
                    />
                  ) : (
                    <div className="text-gray-500 text-center">
                      <img src="" alt="" />
                     
                      <p className='text-[#8E8E93] text-sm'> Your Icon Preview</p>
                      <p className='text-[#8E8E93] text-sm'> will appear here</p>
                    </div>
                  )}
                </div>
              )}
              <div>
                <h4 className="text-lg font-semibold text-[#1E1E2F] mb-3">Download Option</h4>
                <div className="mb-4">
                  <label htmlFor="resolution" className="block text-sm font-medium text-[#1E1E2F] mb-1">Resolution</label>
                  <select
                    id="resolution"
                    value={selectedResolution}
                    onChange={(e) => setSelectedResolution(e.target.value)}
                    className="w-full px-3 py-2.5   bg-[#F2F2F7] rounded-xl focus:ring-1 focus:ring-[#5C2ED1] focus:border-[#5C2ED1] text-sm"
                  >
                    <option value="1024x1024">1024x1024 px</option>
                    <option value="512x512">512x512 px</option>
                    <option value="256x256">256x256 px</option>
                    <option value="128x128">128x128 px</option>
                    <option value="64x64">64x64 px</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="format" className="block text-sm font-medium text-[#1E1E2F] mb-1">Format</label>
                  <select
                    id="format"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full px-3 py-2.5   bg-[#F2F2F7] rounded-xl focus:ring-1 focus:ring-[#5C2ED1] focus:border-[#5C2ED1] text-sm"
                  >
                    <option value="PNG">PNG</option>
                    <option value="SVG">SVG</option>
                    <option value="JPG">JPG</option>
                  </select>
                </div>
                <button 
                  onClick={() => {
                    if (generatedIcon) {
                      downloadImage(generatedIcon, selectedFormat, appName);
                    }
                  }}
                  className={`flex  justify-center gap-2 w-full text-white py-3 rounded-lg font-semibold text-md transition-colors duration-150 ${!generatedIcon || loading ? 'bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white cursor-not-allowed' : 'bg-gradient-to-b from-[#5C2ED1CC] to-[#A175FF] text-white hover:bg-[#4a25a1]'}`}
                  disabled={!generatedIcon || loading}
                >
                  <Image src="/images/download.svg" alt="download" width={20} height={20} unoptimized={true} />
                  {loading && !generatedIcon ? 'Generating...' : (generatedIcon ? 'Download Icon' : 'Download')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          
       
    
  );
};

export default IconGenerator;
