// This script creates a symlink for path aliases to work in Docker
import fs from 'fs';
import path from 'path';

console.log('Setting up path aliases for Next.js in Docker...');

try {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');

  // Make sure node_modules/@/ directory exists
  if (!fs.existsSync(path.join(nodeModulesPath, '@'))) {
    fs.mkdirSync(path.join(nodeModulesPath, '@'), { recursive: true });
  }

  // Create symbolic links for common directories
  const componentsDir = path.join(process.cwd(), 'components');
  const appDir = path.join(process.cwd(), 'app');
  const libDir = path.join(process.cwd(), 'lib');

  if (fs.existsSync(componentsDir)) {
    fs.symlinkSync(componentsDir, path.join(nodeModulesPath, '@', 'components'), 'dir');
    console.log('Symlinked @/components');
  }

  if (fs.existsSync(appDir)) {
    fs.symlinkSync(appDir, path.join(nodeModulesPath, '@', 'app'), 'dir');
    console.log('Symlinked @/app');
  }

  if (fs.existsSync(libDir)) {
    fs.symlinkSync(libDir, path.join(nodeModulesPath, '@', 'lib'), 'dir');
    console.log('Symlinked @/lib');
  }

  console.log('Path aliases setup completed successfully!');
} catch (error) {
  console.error('Error setting up path aliases:', error);
  // Don't exit with error as this might be a non-critical issue
}
