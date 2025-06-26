# Use Node.js 18
FROM node:18

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files
COPY package.json ./

# Install dependencies including Tailwind CSS explicitly
RUN npm install
RUN npm install --save-dev tailwindcss postcss autoprefixer @tailwindcss/typography

# Copy the rest of the application
COPY . .

# Create postcss.config.js if not exists
RUN if [ ! -f postcss.config.js ]; then \
    echo 'module.exports = {plugins: {tailwindcss: {}, autoprefixer: {}}}' > postcss.config.js; \
    fi

# Fix path aliases
RUN node setup-paths.mjs

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]