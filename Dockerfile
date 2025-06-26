# Use a lightweight Node.js Alpine image
FROM node:18-alpine
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install minimal dependencies
RUN apk add --no-cache libc6-compat

# Copy only the necessary files for the build
COPY package.json ./
COPY tailwind.config.js postcss.config.js ./
COPY app ./app
COPY components ./components
COPY content ./content
COPY lib ./lib
COPY public ./public
COPY next.config.js ./
COPY setup-paths.mjs ./
COPY tsconfig.json ./

# Install production dependencies with minimal cache
RUN npm install --production --no-package-lock --no-optional --legacy-peer-deps

# Install only the absolutely required dev dependencies (Tailwind CSS)
RUN npm install --no-package-lock --no-optional --no-save --legacy-peer-deps tailwindcss postcss autoprefixer @tailwindcss/typography

# Run setup script and build
RUN node setup-paths.mjs
RUN npm run build

# Remove unnecessary files to save space
RUN rm -rf node_modules/.cache && rm -rf /root/.npm

# Start the application
CMD ["npm", "start"]