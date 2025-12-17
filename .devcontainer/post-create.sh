#!/bin/bash
# ==========================================
# GitHub Codespaces - Post Create Script
# ==========================================

echo "=========================================="
echo "  Online Maktab - Codespaces Setup"
echo "=========================================="

# Codespaces API URL'ni aniqlash
if [ -n "$CODESPACE_NAME" ]; then
    # Codespaces'da ishlayapmiz
    BACKEND_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
    FRONTEND_URL="https://${CODESPACE_NAME}-5173.app.github.dev"

    echo "[INFO] Running in GitHub Codespaces"
    echo "[INFO] Backend URL: $BACKEND_URL"
    echo "[INFO] Frontend URL: $FRONTEND_URL"

    # Environment o'zgaruvchilarini o'rnatish
    export VITE_API_URL=$BACKEND_URL
    export CORS_ORIGINS="$FRONTEND_URL,$BACKEND_URL"

    # .env faylini yaratish
    cat > .env << EOF
VITE_API_URL=$BACKEND_URL
CORS_ORIGINS=$FRONTEND_URL,$BACKEND_URL
DATABASE_URL=sqlite:///./school.db
SECRET_KEY=codespaces-dev-secret-key-$(date +%s)
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=development
EOF

    echo "[SUCCESS] Environment configured for Codespaces"
else
    echo "[INFO] Running locally"
fi

echo ""
echo "=========================================="
echo "  Setup Complete!"
echo "=========================================="
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "=========================================="
