import fs from 'fs';
import path from 'path';

const sourceDir = path.resolve(process.cwd(), 'src/contents/posts');
const publicDir = path.resolve(process.cwd(), 'public/contents/posts');

console.log('Source directory:', sourceDir);
console.log('Public directory:', publicDir);

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Get list of files in source directory
const files = fs.readdirSync(sourceDir);
console.log('Found', files.length, 'files in source directory:', files);

// Copy each file to public directory
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const publicPath = path.join(publicDir, file);
  
  console.log('Copying file:', {
    from: sourcePath,
    to: publicPath
  });
  
  fs.copyFileSync(sourcePath, publicPath);
  console.log('Copied:', file);
});

console.log('Content files copied successfully!');
console.log('Blog plugin initialized with directory:', publicDir); 