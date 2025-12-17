#!/bin/bash
# ==========================================
# Online Maktab - Codespaces Startup Script
# ==========================================
# Bu skript GitHub Codespaces'da ishlatiladi
# Avtomatik HTTPS URL'larni sozlaydi
# ==========================================

set -e

echo "=========================================="
echo "  🎓 Online Maktab - Codespaces"
echo "=========================================="
echo

# Codespaces muhitini aniqlash
if [ -n "$CODESPACE_NAME" ]; then
    BACKEND_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
    FRONTEND_URL="https://${CODESPACE_NAME}-5173.app.github.dev"

    echo "✅ GitHub Codespaces aniqlandi"
    echo "📡 Backend URL: $BACKEND_URL"
    echo "🌐 Frontend URL: $FRONTEND_URL"
    echo

    # Environment o'zgaruvchilarini eksport qilish
    export VITE_API_URL=$BACKEND_URL
    export CORS_ORIGINS="*"

    echo "🚀 Docker Compose ishga tushirilmoqda..."
    echo

    # Docker Compose ishga tushirish
    docker compose -f docker-compose.codespaces.yml up --build
else
    echo "⚠️  Codespaces muhiti aniqlanmadi"
    echo "📍 Localhost rejimida ishga tushirilmoqda..."
    echo

    docker compose up --build
fi

