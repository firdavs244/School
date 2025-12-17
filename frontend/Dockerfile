# ==========================================
# Frontend Dockerfile - Development & Codespaces
# ==========================================

# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build argument for API URL
# Codespaces va localhost uchun default
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# ==========================================
# Production stage - serve with nginx
# ==========================================
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create entrypoint script for runtime API URL injection
RUN echo '#!/bin/sh' > /docker-entrypoint.d/40-inject-api-url.sh && \
    echo 'if [ -n "$VITE_API_URL" ]; then' >> /docker-entrypoint.d/40-inject-api-url.sh && \
    echo '  find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|http://localhost:8000|$VITE_API_URL|g" {} \;' >> /docker-entrypoint.d/40-inject-api-url.sh && \
    echo 'fi' >> /docker-entrypoint.d/40-inject-api-url.sh && \
    chmod +x /docker-entrypoint.d/40-inject-api-url.sh

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

