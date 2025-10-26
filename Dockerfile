# ========== 1. Base image untuk build ==========
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files dulu (agar caching efisien)
COPY package.json pnpm-lock.yaml ./

# Install dependencies (pakai frozen-lockfile agar konsisten)
RUN pnpm install --frozen-lockfile

# Copy semua source code
COPY . .

# Build project TypeScript (hasil build ke /app/dist)
RUN pnpm run build


# ========== 2. Base image untuk runtime ==========
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm di runtime
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy hanya file penting dari builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Gunakan port environment atau default 3000
ENV PORT=3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["pnpm", "start"]
