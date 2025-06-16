import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Parse the request body
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const buffer = await imageFile.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    // Use GPT-4 Vision API to analyze the image
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an image analysis assistant specialized in generating prompts for image generation. Focus on identifying key visual elements, colors, styles, and compositions that would be important for recreating this image.'
        },
        {
          role: 'user',
          content: [
            { 
              type: 'text', 
              text: 'Analyze this image and provide a detailed description focusing on visual elements that would be important for image generation. Include specific details about colors, composition, style, and any notable features.' 
            },
            { 
              type: 'image_url', 
              image_url: { 
                url: `data:image/png;base64,${base64}`, 
                detail: 'high' 
              } 
            }
          ]
        }
      ]
    });

    const description = response.choices[0].message.content || 'Unable to analyze image';
    return NextResponse.json({ description });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}