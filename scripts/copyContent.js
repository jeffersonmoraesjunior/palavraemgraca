import fs from 'fs';
import path from 'path';

const sourceDir = path.resolve(process.cwd(), 'src/contents/posts');
const targetDir = path.resolve(process.cwd(), 'public/contents/posts');

console.log('Source directory:', sourceDir);
console.log('Target directory:', targetDir);

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Get list of files in source directory
const files = fs.readdirSync(sourceDir);
console.log('Found', files.length, 'files in', sourceDir + ':', files);

// Copy each file
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  console.log('Copying file:', {
    from: sourcePath,
    to: targetPath
  });
  
  fs.copyFileSync(sourcePath, targetPath);
  console.log('Copied:', file);
});

console.log('Content files copied successfully!');
console.log('Blog plugin initialized with directory:', targetDir); 