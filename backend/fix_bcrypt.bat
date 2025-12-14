@echo off
echo ==========================================
echo   Fixing Bcrypt Version Issue
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/3] Activating virtual environment...
call Scripts\activate.bat

echo.
echo [2/3] Uninstalling old bcrypt...
pip uninstall bcrypt -y

echo.
echo [3/3] Installing compatible bcrypt version...
pip install bcrypt==4.1.2

echo.
echo ==========================================
echo   Bcrypt Fixed!
echo ==========================================
echo.
echo Now restart your backend server:
echo   uvicorn app.main:app --reload
echo.
pause

