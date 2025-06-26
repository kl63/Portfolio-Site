FROM node:18-alpine AS dependencies
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Copy package files first for better layer caching
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm install --legacy-peer-deps

# Development dependencies - explicitly install Tailwind CSS and related packages
FROM node:18-alpine AS devdeps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
COPY --from=dependencies /app/node_modules ./node_modules

# Install development dependencies, including Tailwind
RUN npm install --only=dev --legacy-peer-deps
RUN npm install --save-dev tailwindcss@3.4.0 postcss@8.4.33 autoprefixer@10.4.16 @tailwindcss/typography@0.5.10

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy all dependencies from previous stages
COPY --from=devdeps /app/node_modules ./node_modules

# Copy all app files
COPY . .

# Create postcss config if missing
RUN if [ ! -f postcss.config.js ]; then \
    echo 'module.exports = {plugins: {tailwindcss: {}, autoprefixer: {}}}' > postcss.config.js; \
    fi

# Fix path aliases if needed
RUN node setup-paths.mjs

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy the built app and necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Start the app
CMD ["node", "server.js"]