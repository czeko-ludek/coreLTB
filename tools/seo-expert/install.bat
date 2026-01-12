@echo off
echo ========================================
echo  CoreLTB SEO Expert - Instalacja
echo ========================================
echo.
echo Sprawdzanie Pythona...
echo.

REM Check if Python is installed (prefer py over python)
py --version >nul 2>&1
if %errorlevel% neq 0 (
    python --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo.
        echo [BLAD] Python nie jest zainstalowany!
        echo.
        echo Pobierz Python z: https://www.python.org/downloads/
        echo Zaznacz "Add Python to PATH" podczas instalacji!
        echo.
        pause
        exit /b 1
    ) else (
        set PYTHON_CMD=python
    )
) else (
    set PYTHON_CMD=py
)

echo Python zainstalowany: OK
echo.
echo ========================================
echo  Instalacja Dependencies
echo ========================================
echo.
echo To moze potrwac 2-3 minuty...
echo.

REM Install dependencies
%PYTHON_CMD% -m pip install --upgrade pip
%PYTHON_CMD% -m pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo.
    echo [BLAD] Instalacja nie powiodla sie!
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Instalacja Zakonczona!
echo ========================================
echo.
echo Co dalej?
echo.
echo 1. Skonfiguruj API keys:
echo    - Skopiuj .env.example do .env
echo    - Wypelnij GEMINI_API_KEY i ANTHROPIC_API_KEY
echo.
echo 2. Uruchom dashboard:
echo    - Kliknij dwukrotnie: start_dashboard.bat
echo.
echo Dokumentacja: README.md
echo Quick Start: QUICK-START.md
echo.
pause
