const HF_API_KEY = process.env.HF_API_KEY || '';
const MODEL_NAME = 'Salesforce/blip-image-captioning-large';

export const generateImagePrompt = async (imageUrl: string) => {
  try {
    if (!HF_API_KEY) {
      throw new Error('HuggingFace API key is not configured');
    }

    // If it's a base64 data URL, convert it to a blob
    if (imageUrl.startsWith('data:')) {
      const binary = atob(imageUrl.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(array)], { type: 'image/png' });
      const formData = new FormData();
      formData.append('inputs', blob);

      const response = await window.fetch(`https://api-inference.huggingface.co/models/${MODEL_NAME}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
        body: formData,
      });

      const result = await response.json();
      return result[0]?.generated_text || 'Unable to generate caption';
    }

    // If it's a regular image URL
    const response = await window.fetch(`https://api-inference.huggingface.co/models/${MODEL_NAME}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: imageUrl }),
    });

    const result = await response.json();
    return result[0]?.generated_text || 'Unable to generate caption';
  } catch (error) {
    console.error('Error generating image prompt:', error);
    throw new Error('Failed to generate prompt. Please try again.');
  }
};
