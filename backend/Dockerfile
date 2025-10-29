## Multi-stage Dockerfile for NestJS backend
# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev for build)
RUN npm ci --production=false

# Copy source
COPY . ./

# Build project
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
