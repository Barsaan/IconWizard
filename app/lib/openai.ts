import OpenAI from 'openai';

// Get API key from environment variables
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

// Log API key status
console.log('OpenAI API Key:', apiKey ? 'Key Present' : 'Key Missing');

if (!apiKey) {
  console.error('No OpenAI API key found. Please set NEXT_PUBLIC_OPENAI_API_KEY in your environment variables.');
}

// Fallback image generation when no API key is available
const fallbackIcons = [
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMzAwIDMwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiPgogIDxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNWY1ZjUiIC8+CiAgPHRleHQgeD0iNTAiIHk9IjE1MCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgeD0iNTAlIj5JY29uPC90ZXh0Pgo8L3N2Zz4='
];

// Generate a detailed, creative prompt for icon generation
export const generateImagePrompt = async (description: string) => {
  // If no API key, return a simple description
  if (!apiKey) {
    return `A simple icon representing ${description}`;
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: "You are a creative icon design assistant. Generate a precise, vivid description for an icon based on the given input."
        },
        {
          role: "user", 
          content: `Create a minimalist, modern icon design description for: ${description}. 
          Focus on key visual elements, color suggestions, and stylistic approach. 
          Provide a detailed prompt that clearly represents the concept.`
        }
      ],
      max_tokens: 150
    });

    // Extract the generated prompt
    const generatedPrompt = chatCompletion.choices[0].message.content || 
      `Minimalist icon of ${description}. Simple, clean, vector-style illustration.`;
    
    return generatedPrompt;
  } catch (error) {
    console.error('Error generating image prompt:', error);
    return `A simple icon representing ${description}`;
  }
};

// Generate icon image 
export const generateImage = async (prompt: string) => {
  console.log('Generating image with prompt:', prompt);
  console.log('API Key Status:', apiKey ? 'Available' : 'Not Available');

  // If no API key, return a random fallback icon
  if (!apiKey) {
    console.warn('No OpenAI API Key found. Using fallback icon.');
    return fallbackIcons[Math.floor(Math.random() * fallbackIcons.length)];
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    console.log('OpenAI Client initialized');

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid"
    });

    console.log('OpenAI Image Generation Response:', response);

    // Return the URL of the generated image
    const imageUrl = response.data[0].url || fallbackIcons[0];
    console.log('Generated Image URL:', imageUrl);

    return imageUrl;
  } catch (error) {
    console.error('Error generating icon image:', error);
    // Log the full error details
    console.error('Full Error Details:', JSON.stringify(error, null, 2));
    // Return a random fallback icon
    return fallbackIcons[Math.floor(Math.random() * fallbackIcons.length)];
  }
};