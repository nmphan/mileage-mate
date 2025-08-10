# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Copy files from builder
COPY --from=builder /app/package.json .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Runtime config
ENV PORT=8080
EXPOSE 8080

# Use `next start` directly
CMD ["npm", "start"]