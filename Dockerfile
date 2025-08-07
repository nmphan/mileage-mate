# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (include devDependencies for build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY . .

# Set Node.js environment
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Runtime configuration
ENV NODE_ENV=production
ENV PORT 8080
EXPOSE 8080

# CMD ["npm", "start"]
CMD ["node", "node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "8080"]