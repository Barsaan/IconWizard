import { generateImagePrompt, generateImage } from '@/app/lib/openai';

// Function to migrate Runware URLs to OpenAI generated icons
export async function migrateIconUrls(icons: any[]) {
  const migratedIcons = [];

  for (const icon of icons) {
    // Check if the icon is from Runware
    if (icon.url.includes('im.runware.ai')) {
      try {
        // Generate a new icon using the existing description or app name
        const prompt = icon.description || icon.appName || 'An icon representing a generic app';
        const refinedPrompt = await generateImagePrompt(prompt);
        const newIconUrl = await generateImage(refinedPrompt);

        // Create a new icon object with the updated URL
        migratedIcons.push({
          ...icon,
          url: newIconUrl,
          originalUrl: icon.url // Keep a reference to the original URL
        });
      } catch (error) {
        console.error(`Failed to migrate icon: ${icon.id}`, error);
        // Fallback: keep the original icon
        migratedIcons.push(icon);
      }
    } else {
      // If not a Runware URL, keep the icon as is
      migratedIcons.push(icon);
    }
  }

  return migratedIcons;
}

// Optional: Run migration script
async function runMigration() {
  // Retrieve icons from localStorage
  const savedIconsStr = localStorage.getItem('generatedIcons');
  if (savedIconsStr) {
    const savedIcons = JSON.parse(savedIconsStr);
    const migratedIcons = await migrateIconUrls(savedIcons);
    
    // Save migrated icons back to localStorage
    localStorage.setItem('generatedIcons', JSON.stringify(migratedIcons));
    console.log('Icon migration completed');
  }
}

// Uncomment to run migration
// runMigration();
