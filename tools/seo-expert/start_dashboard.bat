@echo off
echo ========================================
echo  CoreLTB SEO Expert - Dashboard
echo ========================================
echo.

REM Sprawdz czy venv istnieje i aktywuj
if exist "venv\Scripts\activate.bat" (
    echo Aktywuje venv...
    call venv\Scripts\activate.bat
    echo.
)

echo Uruchamianie dashboardu...
echo Dashboard otworzy sie w przegladarce za chwile
echo.
echo Aby zatrzymac, wcisnij Ctrl+C
echo.
echo ========================================
echo.

REM Uruchom streamlit dashboard
py -m streamlit run dashboard.py

pause
