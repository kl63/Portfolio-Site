#!/bin/sh
set -e

echo "➡️ Setting up project dependencies..."

# Install all dependencies first
if [ -f package-lock.json ]; then
  echo "📦 Installing dependencies from package-lock.json..."
  npm install --legacy-peer-deps
elif [ -f yarn.lock ]; then
  echo "📦 Installing dependencies from yarn.lock..."
  yarn install --frozen-lockfile --ignore-engines
elif [ -f pnpm-lock.yaml ]; then
  echo "📦 Installing dependencies from pnpm-lock.yaml..."
  corepack enable pnpm
  pnpm install --frozen-lockfile --no-strict-peer-dependencies
else
  echo "❌ No lockfile found"
  exit 1
fi

# Force install required packages for Tailwind CSS
echo "🎨 Installing Tailwind CSS and related packages..."
npm install --no-save --legacy-peer-deps tailwindcss@3.4.0 postcss@8.4.33 autoprefixer@10.4.16 @tailwindcss/typography@0.5.10

# Create necessary config files for Tailwind CSS
echo "⚙️ Setting up Tailwind CSS configuration..."

if [ ! -f tailwind.config.js ]; then
  echo "module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};" > tailwind.config.js
fi

if [ ! -f postcss.config.js ]; then
  echo "module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};" > postcss.config.js
fi

# Setup path aliases for @/*
echo "🔗 Setting up path aliases..."
mkdir -p node_modules/@
ln -sf $(pwd) node_modules/@/

# Set Next.js output to standalone
echo "🏗️ Configuring Next.js..."
if [ -f next.config.js ]; then
  if ! grep -q "output: 'standalone'" next.config.js; then
    echo "Adding standalone output to next.config.js"
    sed -i 's/const nextConfig = {/const nextConfig = {\n  output: "standalone",/g' next.config.js
  fi
fi

echo "✅ Setup completed successfully!"
