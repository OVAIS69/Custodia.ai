@echo off
SETLOCAL EnableDelayedExpansion

echo ===================================================
echo   CUSTODIA - Local Development Launcher
echo ===================================================

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH.
    pause
    exit /b
)

:: Check for Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    pause
    exit /b
)

:: 1. Start Backend
echo.
echo [1/2] Starting Backend Server...
if exist "venv\Scripts\activate.bat" (
    start "Custodia Backend" cmd /k "venv\Scripts\activate && uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000"
) else (
    echo [WARNING] venv not found. Attempting to run with global python...
    start "Custodia Backend" cmd /k "python -m uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000"
)

:: 2. Start Frontend
echo.
echo [2/2] Starting Frontend Application...
cd frontend
start "Custodia Frontend" cmd /k "npm run dev"

echo.
echo ===================================================
echo   All systems go!
echo   - Backend: http://localhost:8000/docs
echo   - Frontend: http://localhost:3000
echo ===================================================
echo.
pause
