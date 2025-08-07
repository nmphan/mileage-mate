# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (for caching)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev  # Install prod-only deps (no devDependencies)

# Copy the rest of the app
COPY . .

# Build the app (outputs to `.next/`)
RUN npm run build

# Stage 2: Production-ready image
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables (adjust if needed)
ENV NODE_ENV=production
ENV PORT=8080

# Expose port (Cloud Run overrides this automatically)
EXPOSE 8080

# Start the app
CMD ["npm", "start"]