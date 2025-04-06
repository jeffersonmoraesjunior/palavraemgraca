import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const QUALITY = 80; // Adjust quality as needed (0-100)
const MIN_WIDTH = 1200; // Minimum width for Google Discover

async function optimizeImages() {
    try {
        // Read all files from the images directory
        const files = await fs.readdir(IMAGES_DIR);
        
        // Process each file
        for (const file of files) {
            const filePath = path.join(IMAGES_DIR, file);
            const fileExt = path.extname(file).toLowerCase();
            
            // Only process image files
            if (['.jpg', '.jpeg', '.png'].includes(fileExt)) {
                const fileName = path.basename(file, fileExt);
                const outputPath = path.join(IMAGES_DIR, `${fileName}.webp`);
                
                console.log(`Processing: ${file}`);

                // Get image metadata
                const metadata = await sharp(filePath).metadata();
                
                // Calculate new dimensions maintaining aspect ratio
                let width = metadata.width;
                let height = metadata.height;
                
                if (width < MIN_WIDTH) {
                    const aspectRatio = width / height;
                    width = MIN_WIDTH;
                    height = Math.round(MIN_WIDTH / aspectRatio);
                    console.log(`Resizing image to meet minimum width requirement: ${width}x${height}`);
                }
                
                // Process the image
                await sharp(filePath)
                    .resize(width, height, {
                        fit: 'inside',
                        withoutEnlargement: false
                    })
                    .webp({ quality: QUALITY })
                    .toFile(outputPath);
                
                console.log(`Converted ${file} to WebP format`);
                
                // Get file sizes for comparison
                const originalSize = (await fs.stat(filePath)).size;
                const newSize = (await fs.stat(outputPath)).size;
                const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
                
                console.log(`Size reduction: ${savings}% (${(originalSize/1024).toFixed(2)}KB → ${(newSize/1024).toFixed(2)}KB)`);
                
                // Delete the original file
                await fs.unlink(filePath);
                console.log(`Deleted original file: ${file}\n`);
            }
        }
        
        console.log('Image optimization complete!');
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImages(); 