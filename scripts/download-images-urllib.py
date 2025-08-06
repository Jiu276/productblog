#!/usr/bin/env python3
"""
Download real product images using urllib (no external dependencies)
"""
import urllib.request
import urllib.error
import time
from pathlib import Path

def download_image(url, filename, images_dir):
    """Download an image from URL using urllib"""
    try:
        print(f"Downloading {filename}...")
        
        # Create request with headers
        req = urllib.request.Request(
            url, 
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        )
        
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            
            file_path = images_dir / filename
            with open(file_path, 'wb') as f:
                f.write(data)
            
            print(f"OK Downloaded {filename} ({len(data)} bytes)")
            return True
        
    except Exception as e:
        print(f"ERROR Failed to download {filename}: {e}")
        return False

def download_real_images():
    """Download real product images"""
    
    # Create images directory
    static_site_dir = Path('../static-site')
    images_dir = static_site_dir / 'assets' / 'images'
    images_dir.mkdir(parents=True, exist_ok=True)
    
    print("Downloading real product images...")
    print("=" * 50)
    
    # Using more reliable direct image URLs
    image_list = [
        # iPhone images - using more direct URLs
        ("https://source.unsplash.com/900x400/?iphone,smartphone", "iphone-main.jpg"),
        ("https://source.unsplash.com/900x400/?iphone,technology", "iphone-detail.jpg"),
        
        # MacBook images  
        ("https://source.unsplash.com/900x400/?macbook,laptop", "macbook-main.jpg"),
        ("https://source.unsplash.com/900x400/?laptop,computer", "macbook-detail.jpg"),
        
        # Smart watch images
        ("https://source.unsplash.com/900x400/?smartwatch,watch", "smartwatch-main.jpg"),
        ("https://source.unsplash.com/900x400/?applewatch,wearable", "smartwatch-detail.jpg"),
        
        # AirPods images
        ("https://source.unsplash.com/900x400/?airpods,headphones", "airpods-main.jpg"),
        
        # Smart home images
        ("https://source.unsplash.com/900x400/?smarthome,iot", "smarthome-main.jpg"),
        ("https://source.unsplash.com/900x400/?alexa,voice", "smarthome-detail.jpg"),
        
        # Electric vehicle images
        ("https://source.unsplash.com/900x400/?tesla,electric-car", "ev-main.jpg"),
        
        # Comparison images
        ("https://source.unsplash.com/900x400/?smartphones,comparison", "phone-comparison.jpg"),
        
        # Author avatars - smaller size
        ("https://source.unsplash.com/100x100/?portrait,man", "author-1.jpg"),
        ("https://source.unsplash.com/100x100/?portrait,woman", "author-2.jpg"),
        ("https://source.unsplash.com/100x100/?professional,business", "author-3.jpg"),
    ]
    
    successful = 0
    failed = 0
    
    for url, filename in image_list:
        if download_image(url, filename, images_dir):
            successful += 1
        else:
            failed += 1
        
        # Small delay to be respectful to the server
        time.sleep(2)
    
    print("=" * 50)
    print(f"Download complete!")
    print(f"OK Successful: {successful}")
    print(f"ERROR Failed: {failed}")

if __name__ == "__main__":
    download_real_images()