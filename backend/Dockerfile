# ─────────────────────────────────────────
# Stage 1: Install dependencies
# ─────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ─────────────────────────────────────────
# Stage 2: Production image
# ─────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Add a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production deps and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Temp upload directory
RUN mkdir -p ./public/temp && chown -R appuser:appgroup ./public/temp

USER appuser

EXPOSE 4000

ENV NODE_ENV=production

CMD ["node", "index.js"]
