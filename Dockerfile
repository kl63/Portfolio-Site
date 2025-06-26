# -------- BASE IMAGE --------
    FROM node:18-alpine AS base

    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    ENV NODE_OPTIONS=--max-old-space-size=512
    
    WORKDIR /app
    
    # Required for native dependencies
    RUN apk add --no-cache libc6-compat
    
    # -------- DEPENDENCIES --------
    FROM base AS deps
    
    # Copy only lockfiles and package.json for layer caching
    COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
    
    # Install dependencies with fallback support and legacy peer deps
    RUN \
      if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
      elif [ -f package-lock.json ]; then npm install --legacy-peer-deps; \
      elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
      else echo "No lockfile found" && exit 1; \
      fi \
      && npm install --save-dev @tailwindcss/postcss --legacy-peer-deps
    
    # -------- BUILDER --------
    FROM base AS builder
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    # Only run production build, no lint installs
    RUN \
      if [ -f yarn.lock ]; then yarn build; \
      elif [ -f package-lock.json ]; then npm run build; \
      elif [ -f pnpm-lock.yaml ]; then pnpm run build; \
      else echo "No lockfile found" && exit 1; \
      fi
    
    # -------- RUNNER --------
    FROM base AS runner
    
    RUN addgroup --system --gid 1001 nodejs && \
        adduser --system --uid 1001 nextjs && \
        mkdir .next && \
        chown -R nextjs:nodejs /app
    
    WORKDIR /app
    
    # Copy the production build from builder
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    COPY --from=builder --chown=nextjs:nodejs /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
    
    USER nextjs
    
    EXPOSE 3000
    ENV PORT=3000
    CMD ["node", "server.js"]
    