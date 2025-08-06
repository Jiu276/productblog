#!/usr/bin/env python3
"""
Download real product images for the static site
"""
import os
import requests
import time
from pathlib import Path

def download_image(url, filename, images_dir):
    """Download an image from URL"""
    try:
        print(f"Downloading {filename}...")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        file_path = images_dir / filename
        with open(file_path, 'wb') as f:
            f.write(response.content)
        
        print(f"✓ Downloaded {filename} ({len(response.content)} bytes)")
        return True
        
    except Exception as e:
        print(f"✗ Failed to download {filename}: {e}")
        return False

def download_real_images():
    """Download real product images"""
    
    # Create images directory
    static_site_dir = Path('../static-site')
    images_dir = static_site_dir / 'assets' / 'images'
    images_dir.mkdir(parents=True, exist_ok=True)
    
    print("Downloading real product images...")
    print("=" * 50)
    
    # Image URLs from Unsplash (free to use)
    image_list = [
        # iPhone images
        ("https://images.unsplash.com/photo-1592286838774-b2e60a2d0111?w=900&h=400&fit=crop", "iphone-main.jpg"),
        ("https://images.unsplash.com/photo-1580910051074-3eb694886505?w=900&h=400&fit=crop", "iphone-detail.jpg"),
        
        # MacBook images  
        ("https://images.unsplash.com/photo-1541807084-5f52b1e10ec0?w=900&h=400&fit=crop", "macbook-main.jpg"),
        ("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=400&fit=crop", "macbook-detail.jpg"),
        
        # Smart watch images
        ("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=400&fit=crop", "smartwatch-main.jpg"),
        ("https://images.unsplash.com/photo-1544117519-31a4b719223d?w=900&h=400&fit=crop", "smartwatch-detail.jpg"),
        
        # AirPods images
        ("https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=900&h=400&fit=crop", "airpods-main.jpg"),
        
        # Smart home images
        ("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=400&fit=crop", "smarthome-main.jpg"),
        ("https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=900&h=400&fit=crop", "smarthome-detail.jpg"),
        
        # Electric vehicle images
        ("https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=900&h=400&fit=crop", "ev-main.jpg"),
        
        # Comparison images
        ("https://images.unsplash.com/photo-1567721913486-6585f069b332?w=900&h=400&fit=crop", "phone-comparison.jpg"),
        
        # Author avatars
        ("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", "author-1.jpg"),
        ("https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", "author-2.jpg"),
        ("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", "author-3.jpg"),
    ]
    
    successful = 0
    failed = 0
    
    for url, filename in image_list:
        if download_image(url, filename, images_dir):
            successful += 1
        else:
            failed += 1
        
        # Small delay to be respectful to the server
        time.sleep(1)
    
    print("=" * 50)
    print(f"Download complete!")
    print(f"✓ Successful: {successful}")
    print(f"✗ Failed: {failed}")
    
    # Create a mapping file for easy reference
    mapping_file = images_dir / 'image-mapping.txt'
    with open(mapping_file, 'w') as f:
        f.write("Image Mapping for ProductHub Static Site\n")
        f.write("=" * 40 + "\n\n")
        f.write("iPhone Articles:\n")
        f.write("- iphone-main.jpg (main product image)\n")
        f.write("- iphone-detail.jpg (detail/feature image)\n\n")
        f.write("MacBook Articles:\n")
        f.write("- macbook-main.jpg (main product image)\n")
        f.write("- macbook-detail.jpg (detail/feature image)\n\n")
        f.write("SmartWatch Articles:\n")
        f.write("- smartwatch-main.jpg (main product image)\n")
        f.write("- smartwatch-detail.jpg (detail/feature image)\n\n")
        f.write("AirPods Articles:\n")
        f.write("- airpods-main.jpg (main product image)\n\n")
        f.write("Smart Home Articles:\n")
        f.write("- smarthome-main.jpg (main product image)\n")
        f.write("- smarthome-detail.jpg (detail/feature image)\n\n")
        f.write("Electric Vehicle Articles:\n")
        f.write("- ev-main.jpg (main product image)\n\n")
        f.write("Comparison Articles:\n")
        f.write("- phone-comparison.jpg (comparison image)\n\n")
        f.write("Author Avatars:\n")
        f.write("- author-1.jpg (male author)\n")
        f.write("- author-2.jpg (female author)\n")
        f.write("- author-3.jpg (male author)\n")
    
    print(f"✓ Created image mapping file: {mapping_file}")

if __name__ == "__main__":
    download_real_images()