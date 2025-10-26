# ========== 1. Base image untuk build ==========
FROM node:20-alpine AS builder

# Tambahkan dependency minimal agar jaringan dan SSL berfungsi
RUN apk add --no-cache bash curl ca-certificates

# Set working directory
WORKDIR /app

# Install pnpm secara langsung (bukan via corepack)
RUN npm install -g pnpm@latest

# Copy package files dulu (agar caching efisien)
COPY package.json pnpm-lock.yaml ./

# Install dependencies (pakai frozen-lockfile agar konsisten)
RUN pnpm install --frozen-lockfile

# Copy semua source code
COPY . .

# Build project TypeScript
RUN pnpm run build


# ========== 2. Base image untuk runtime ==========
FROM node:20-alpine AS runner

RUN apk add --no-cache ca-certificates
WORKDIR /app

# Install pnpm runtime
RUN npm install -g pnpm@latest

# Copy file dari builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set port dan jalankan
ENV PORT=3000
EXPOSE 3000

CMD ["pnpm", "start"]
