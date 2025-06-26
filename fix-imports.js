// Script to symlink @ directory to root for Docker builds
import fs from 'fs';
import path from 'path';

console.log('Setting up path aliases for Docker build...');

// Create node_modules/@
try {
  if (!fs.existsSync(path.join(process.cwd(), 'node_modules', '@'))) {
    fs.mkdirSync(path.join(process.cwd(), 'node_modules', '@'), { recursive: true });
  }
  
  // Create symlink from node_modules/@ to project root
  const targetPath = path.join(process.cwd(), 'node_modules', '@');
  const linkPath = process.cwd();
  
  // Create symlink
  fs.symlinkSync(linkPath, path.join(targetPath, 'root'), 'dir');
  
  console.log('Successfully created path alias symlinks');
} catch (error) {
  console.error('Error setting up path aliases:', error);
  process.exit(1);
}
