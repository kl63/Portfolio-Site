# Simple one-stage build to ensure all dependencies are properly installed
FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy all project files first to get configurations
COPY . .

# Install all dependencies 
RUN npm install --legacy-peer-deps

# Explicitly install and link Tailwind CSS and related packages globally
RUN npm install -g tailwindcss postcss autoprefixer

# Also install Tailwind locally to ensure it's in the right context
RUN npm install --save-dev --legacy-peer-deps tailwindcss@3.4.0 postcss@8.4.33 autoprefixer@10.4.16 @tailwindcss/typography@0.5.10

# Ensure postcss.config.js exists
RUN if [ ! -f postcss.config.js ]; then \
    echo 'module.exports = {plugins: {tailwindcss: {}, autoprefixer: {}}}' > postcss.config.js; \
    fi

# Set up environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PATH="/app/node_modules/.bin:$PATH"

# Run the setup script to fix path aliases
RUN node setup-paths.mjs

# Build the application
RUN npm run build

# Set the command to run the application
CMD ["npm", "start"]