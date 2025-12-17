@echo off
echo ==========================================
echo   Online Maktab - Development Mode
echo ==========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo [INFO] Docker is running...
echo.

REM Create .env if not exists
if not exist ".env" (
    echo [INFO] Creating .env file from example...
    copy .env.example .env
)

echo [INFO] Building and starting containers...
echo.

docker-compose up --build

pause

