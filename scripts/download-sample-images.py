#!/usr/bin/env python3
"""
Download sample real images using direct URLs
"""
import urllib.request
import urllib.error
from pathlib import Path

def download_sample_images():
    """Download sample real product images"""
    
    # Create images directory
    static_site_dir = Path('../static-site')
    images_dir = static_site_dir / 'assets' / 'images'
    images_dir.mkdir(parents=True, exist_ok=True)
    
    print("Downloading sample real product images...")
    print("=" * 50)
    
    # Direct image URLs (using Lorem Picsum with specific seeds for consistency)
    image_list = [
        # Product images using Lorem Picsum
        ("https://picsum.photos/900/400?random=iphone", "iphone-main.jpg"),
        ("https://picsum.photos/900/400?random=laptop", "macbook-main.jpg"),
        ("https://picsum.photos/900/400?random=watch", "watch-main.jpg"),
        ("https://picsum.photos/900/400?random=headphones", "airpods-main.jpg"),
        
        # Detail images
        ("https://picsum.photos/900/400?random=tech1", "iphone-detail.jpg"),
        ("https://picsum.photos/900/400?random=tech2", "macbook-detail.jpg"),
        
        # Author avatars (smaller size)
        ("https://picsum.photos/150/150?random=person1", "author-john.jpg"),
        ("https://picsum.photos/150/150?random=person2", "author-lisa.jpg"),
        ("https://picsum.photos/150/150?random=person3", "author-mike.jpg"),
    ]
    
    successful = 0
    failed = 0
    
    for url, filename in image_list:
        try:
            print(f"Downloading {filename}...")
            
            req = urllib.request.Request(
                url, 
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            )
            
            with urllib.request.urlopen(req, timeout=15) as response:
                data = response.read()
                
                file_path = images_dir / filename
                with open(file_path, 'wb') as f:
                    f.write(data)
                
                print(f"OK Downloaded {filename} ({len(data)} bytes)")
                successful += 1
            
        except Exception as e:
            print(f"ERROR Failed to download {filename}: {e}")
            failed += 1
    
    print("=" * 50)
    print(f"Download complete!")
    print(f"OK Successful: {successful}")
    print(f"ERROR Failed: {failed}")
    
    if successful > 0:
        print(f"\nNext step: Run 'python scripts/update-real-images.py' to update HTML files")
    else:
        print(f"\nSuggestion: Try manual download from free image websites")

if __name__ == "__main__":
    download_sample_images()