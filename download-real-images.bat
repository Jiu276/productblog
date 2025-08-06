@echo off
echo =================================================
echo ProductHub Real Images Download Helper
echo =================================================
echo.
echo This script will help you download real product images.
echo.
echo STEP 1: Manual Download (Recommended)
echo ----------------------------------------
echo 1. Open your browser
echo 2. Visit these free image websites:
echo    - Pexels.com
echo    - Unsplash.com
echo    - Pixabay.com
echo.
echo 3. Search for and download these images:
echo    - iPhone 15 Pro photos (save as: iphone-main.jpg, iphone-detail.jpg)
echo    - MacBook Pro photos (save as: macbook-main.jpg, macbook-detail.jpg)  
echo    - Apple Watch photos (save as: watch-main.jpg, watch-detail.jpg)
echo    - AirPods Pro photos (save as: airpods-main.jpg, airpods-detail.jpg)
echo    - Professional headshots (save as: author-john.jpg, author-lisa.jpg)
echo.
echo 4. Save all images to: static-site\assets\images\
echo.
echo STEP 2: Update HTML Files
echo ----------------------------------------
echo After downloading images, run: python scripts\update-real-images.py
echo.
echo Press any key to open the images folder...
pause
start explorer "static-site\assets\images"
echo.
echo Press any key to open Pexels website...
pause
start https://www.pexels.com/search/iphone/
echo.
echo Download complete? Run the update script:
echo python scripts\update-real-images.py
pause