#!/bin/bash
# ==========================================
#   Online Maktab - Production Deployment
# ==========================================

set -e

echo "=========================================="
echo "  Online Maktab - Production Deployment"
echo "=========================================="
echo

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "[ERROR] Docker is not running!"
    exit 1
fi

# Check if .env.prod exists
if [ ! -f ".env.prod" ]; then
    echo "[ERROR] .env.prod file not found!"
    echo "Please create .env.prod from .env.prod.example"
    exit 1
fi

# Load environment variables
export $(cat .env.prod | grep -v '^#' | xargs)

echo "[INFO] Environment: $ENVIRONMENT"
echo "[INFO] Domain: $DOMAIN"
echo

# Check if SSL certificates exist
if [ ! -d "certbot/conf/live/$DOMAIN" ]; then
    echo "[WARNING] SSL certificates not found!"
    echo "Running initial certificate request..."

    # Start nginx for certificate challenge
    docker-compose -f docker-compose.prod.yml up -d nginx

    # Request certificate
    docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        -d $DOMAIN \
        -d www.$DOMAIN \
        -d api.$DOMAIN \
        --email admin@$DOMAIN \
        --agree-tos \
        --no-eff-email

    # Stop nginx
    docker-compose -f docker-compose.prod.yml down
fi

echo "[INFO] Building and starting production containers..."
echo

docker-compose -f docker-compose.prod.yml up --build -d

echo
echo "=========================================="
echo "  Deployment Complete!"
echo "=========================================="
echo "  Frontend: https://$DOMAIN"
echo "  API: https://api.$DOMAIN"
echo "=========================================="
echo

# Show logs
docker-compose -f docker-compose.prod.yml logs -f

