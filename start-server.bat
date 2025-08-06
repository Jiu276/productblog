@echo off
echo Starting ProductHub Static Site Server...
echo.
cd /d "%~dp0static-site"
echo Serving from: %CD%
echo Server URL: http://127.0.0.1:8082
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8082
pause