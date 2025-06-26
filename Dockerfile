# Simple one-stage build to ensure all dependencies are properly installed
FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
RUN npm install --legacy-peer-deps

# Explicitly install Tailwind CSS and related packages
RUN npm install --save-dev --legacy-peer-deps tailwindcss@3.4.0 postcss@8.4.33 autoprefixer@10.4.16 @tailwindcss/typography@0.5.10

# PostCSS configuration - we'll use the project's own tailwind.config.js

# Only create postcss.config.js if it doesn't exist in the project
RUN if [ ! -f postcss.config.js ]; then echo "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };" > postcss.config.js; fi

# Copy project files
COPY . .

# Set up environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Run the setup script to fix path aliases
RUN node setup-paths.mjs

# Build the application
RUN npm run build

# Set the command to run the application
CMD ["npm", "start"]