@echo off
echo ========================================
echo  Instalacja Dependencies dla SEO Expert
echo ========================================
echo.

REM Sprawdz czy jestesmy w venv
if exist "venv\Scripts\activate.bat" (
    echo Aktywuje venv...
    call venv\Scripts\activate.bat
) else (
    echo [INFO] Nie znaleziono venv - instalacja globalna
)

echo.
echo Instalacja bibliotek...
echo.

py -m pip install --upgrade pip
py -m pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo.
    echo [BLAD] Instalacja nie powiodla sie!
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Instalacja Zakonczona!
echo ========================================
echo.
echo Mozesz teraz uruchomic dashboard:
echo   start_dashboard.bat
echo.
pause
