#!/bin/bash
# ==========================================
#   Online Maktab - Development Mode
# ==========================================

echo "=========================================="
echo "  Online Maktab - Development Mode"
echo "=========================================="
echo

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "[ERROR] Docker is not running!"
    echo "Please start Docker and try again."
    exit 1
fi

echo "[INFO] Docker is running..."
echo

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "[INFO] Creating .env file from example..."
    cp .env.example .env
fi

echo "[INFO] Building and starting containers..."
echo

docker-compose up --build

