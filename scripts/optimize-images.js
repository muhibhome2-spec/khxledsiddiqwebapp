import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  const inputPath = path.join(publicDir, 'Khaled-Siddiq.jpeg');
  const outputPath = path.join(publicDir, 'Khaled-Siddiq.webp');

  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log('Input image not found, skipping optimization');
      return;
    }

    // Convert to WebP with optimization
    await sharp(inputPath)
      .webp({ 
        quality: 85,
        effort: 6 
      })
      .resize(1920, null, { 
        withoutEnlargement: true,
        fastShrinkOnLoad: false 
      })
      .toFile(outputPath);

    console.log('✅ Image optimized successfully: Khaled-Siddiq.webp');
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`📊 Original: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`📊 Optimized: ${(optimizedSize / 1024).toFixed(1)}KB`);
    console.log(`💾 Savings: ${savings}%`);
    
  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
  }
}

optimizeImages();