# --- Stage 1: Build the app ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manager files first (better cache)
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy app source
COPY . .

# Build the TypeScript code
RUN pnpm build


# --- Stage 2: Run the app ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only built files + necessary runtime files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/index.js"]
