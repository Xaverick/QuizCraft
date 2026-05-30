# ─────────────────────────────────────────
# Stage 1: Build the React app
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# API URL is baked in at build time
ARG VITE_API_URL
ENV VITE_SERVER_URL=$VITE_API_URL
ENV VITE_LOCALHOST=$VITE_API_URL

RUN npm run build

# ─────────────────────────────────────────
# Stage 2: Serve with nginx
# ─────────────────────────────────────────
FROM nginx:1.25-alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
