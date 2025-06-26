# -------- BASE IMAGE --------
    FROM node:18-alpine AS base

    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    ENV NODE_OPTIONS=--max-old-space-size=512
    
    WORKDIR /app
    
    RUN apk add --no-cache libc6-compat
    
    # -------- DEPENDENCIES --------
    FROM base AS deps
    
    COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
    
    RUN \
      if [ -f yarn.lock ]; then yarn install --frozen-lockfile --ignore-engines && yarn add --dev --ignore-engines tailwindcss autoprefixer postcss; \
      elif [ -f package-lock.json ]; then npm install --legacy-peer-deps && npm install --save-dev --legacy-peer-deps tailwindcss autoprefixer postcss; \
      elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile --no-strict-peer-dependencies && pnpm add -D --no-strict-peer-dependencies tailwindcss autoprefixer postcss; \
      else echo "No lockfile found" && exit 1; \
      fi
    
    # -------- BUILDER --------
    FROM base AS builder
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY --from=deps /app/package.json ./package.json
    COPY . .
    
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
    
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    COPY --from=builder --chown=nextjs:nodejs /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
    
    USER nextjs
    
    EXPOSE 3000
    ENV PORT=3000
    CMD ["node", "server.js"]
    