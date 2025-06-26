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

# Create tailwind.config.js if it doesn't exist
RUN echo 'module.exports = {\n\
  content: [\"./pages/**/*.{js,ts,jsx,tsx}\", \"./components/**/*.{js,ts,jsx,tsx}\", \"./app/**/*.{js,ts,jsx,tsx}\"],\n\
  theme: {\n\
    extend: {},\n\
  },\n\
  plugins: [],\n\
};' > tailwind.config.js

# Create postcss.config.js if it doesn't exist
RUN echo 'module.exports = {\n\
  plugins: {\n\
    tailwindcss: {},\n\
    autoprefixer: {},\n\
  },\n\
};' > postcss.config.js

# Copy project files
COPY . .

# Set up environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# Set the command to run the application
CMD ["npm", "start"]