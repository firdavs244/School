@echo off
echo ==========================================
echo   ONLINE MAKTAB - Backend Server
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/3] Activating virtual environment...
call Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Could not activate virtual environment!
    pause
    exit /b 1
)

echo.
echo [2/3] Checking database...
if exist school.db (
    echo Database exists: school.db
) else (
    echo Creating new database...
)

echo.
echo [3/3] Starting Uvicorn server...
echo.
echo ==========================================
echo   Backend URL: http://127.0.0.1:8000
echo   API Docs:    http://127.0.0.1:8000/docs
echo ==========================================
echo.
echo Press Ctrl+C to stop the server
echo ==========================================
echo.

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

if errorlevel 1 (
    echo.
    echo ERROR: Failed to start server!
    echo.
    echo Possible solutions:
    echo 1. Check if port 8000 is already in use
    echo 2. Make sure all dependencies are installed: pip install -r requirements.txt
    echo 3. Check for syntax errors in Python files
    echo.
    pause
)

