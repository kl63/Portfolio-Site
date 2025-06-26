# Use a lightweight Node.js Alpine image
FROM node:18-alpine
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Set NODE_PATH to ensure modules can be found
ENV NODE_PATH=/app/node_modules
ENV PATH=$PATH:/app/node_modules/.bin

# Install minimal dependencies
RUN apk add --no-cache libc6-compat

# Copy package.json first
COPY package.json ./

# Create a minimal package.json with just the dependencies we need
RUN npm install --no-package-lock --legacy-peer-deps \
    tailwindcss@3.4.0 postcss@8.4.33 autoprefixer@10.4.16 @tailwindcss/typography@0.5.10 \
    react-is

# Copy configuration files
COPY tailwind.config.js postcss.config.js ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY setup-paths.mjs ./

# Copy application files
COPY app ./app
COPY components ./components
COPY content ./content
COPY lib ./lib
COPY public ./public

# Install all dependencies
RUN npm install --legacy-peer-deps

# Make sure Tailwind is accessible system-wide 
RUN ln -s /app/node_modules/.bin/tailwindcss /usr/local/bin/tailwindcss

# Verify tailwindcss is available
RUN tailwindcss --help

# Create a postcss.config.js file if it doesn't exist
RUN if [ ! -f postcss.config.js ]; then \
    echo 'module.exports = {plugins: {tailwindcss: {}, autoprefixer: {}}}' > postcss.config.js; \
    fi

# Fix path aliases
RUN node setup-paths.mjs

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]