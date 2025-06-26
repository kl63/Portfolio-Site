FROM node:18-alpine
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Install Tailwind CSS globally to ensure it's available for the build
RUN npm install -g tailwindcss postcss autoprefixer

# Copy package files first
COPY package.json ./

# Copy essential files for the build
COPY tailwind.config.js postcss.config.js ./
COPY app ./app
COPY components ./components
COPY content ./content
COPY lib ./lib
COPY public ./public
COPY next.config.js next.config.ts ./
COPY setup-paths.mjs ./
COPY tsconfig.json ./

# Install dependencies with production flag to save space
RUN npm install --only=prod --legacy-peer-deps
# Install only the dev dependencies we absolutely need
RUN npm install --save-dev tailwindcss@3.4.0 postcss@8.4.33 autoprefixer@10.4.16 @tailwindcss/typography@0.5.10

# Set up environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Fix path aliases
RUN node setup-paths.mjs

# Build the application
RUN npm run build

# Start the app
CMD ["npm", "start"]