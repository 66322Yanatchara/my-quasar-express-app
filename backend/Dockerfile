# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Generate Prisma Client
# Workaround for prisma.config.ts loading issue in Alpine
RUN if [ -f prisma.config.ts ]; then mv prisma.config.ts prisma.config.ts.bak; fi
RUN npx prisma generate

# Build TypeScript to dist
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# Only if you need non-code files like prisma schema in runtime for migrations, though client matches
COPY --from=builder /app/prisma ./prisma

# Create logs dir
RUN mkdir -p ../logs

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

EXPOSE 3000

CMD ["node", "dist/server.js"]