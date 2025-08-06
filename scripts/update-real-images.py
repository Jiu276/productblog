#!/usr/bin/env python3
"""
Update HTML files to use real product images
"""
import os
import re
from pathlib import Path

def update_images_in_html():
    """Update all HTML files to use real images"""
    
    static_site_dir = Path('../static-site')
    articles_dir = static_site_dir / 'articles'
    images_dir = static_site_dir / 'assets' / 'images'
    
    if not articles_dir.exists():
        print("Articles directory not found!")
        return
    
    print("Updating HTML files to use real images...")
    print("=" * 50)
    
    # Image mapping: old filename -> new filename
    image_mappings = {
        # Product images
        'iphone-realistic.svg': 'iphone-main.jpg',
        'macbook-realistic.svg': 'macbook-main.jpg', 
        'smartwatch-realistic.svg': 'watch-main.jpg',
        'airpods-realistic.svg': 'airpods-main.jpg',
        'author-realistic.svg': 'author-john.jpg',
        
        # Fallback mappings
        'iphone-placeholder.svg': 'iphone-main.jpg',
        'macbook-placeholder.svg': 'macbook-main.jpg',
        'placeholder.svg': 'iphone-main.jpg',  # Default to iPhone
        'avatar.svg': 'author-john.jpg'
    }
    
    # Check which real images exist
    available_images = []
    for jpg_file in ['iphone-main.jpg', 'macbook-main.jpg', 'watch-main.jpg', 'airpods-main.jpg', 'author-john.jpg', 'author-lisa.jpg']:
        if (images_dir / jpg_file).exists():
            available_images.append(jpg_file)
    
    if not available_images:
        print("ERROR: No real images found in assets/images/")
        print("Please download images first using the guide or batch file.")
        print("Expected files: iphone-main.jpg, macbook-main.jpg, watch-main.jpg, etc.")
        return
    
    print(f"Found {len(available_images)} real images:")
    for img in available_images:
        print(f"  - {img}")
    print()
    
    total_files = 0
    total_replacements = 0
    
    # Process all HTML files in articles directory
    for html_file in articles_dir.glob('*.html'):
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_replacements = 0
            
            # Replace images based on article type
            article_name = html_file.stem.lower()
            
            # Determine which real image to use based on article name
            if 'iphone' in article_name:
                target_image = 'iphone-main.jpg' if 'iphone-main.jpg' in available_images else available_images[0]
            elif 'macbook' in article_name:
                target_image = 'macbook-main.jpg' if 'macbook-main.jpg' in available_images else available_images[0]
            elif 'watch' in article_name or 'smartwatch' in article_name:
                target_image = 'watch-main.jpg' if 'watch-main.jpg' in available_images else available_images[0]
            elif 'airpods' in article_name:
                target_image = 'airpods-main.jpg' if 'airpods-main.jpg' in available_images else available_images[0]
            else:
                target_image = available_images[0]  # Use first available image
            
            # Replace product images
            for old_img, new_img in image_mappings.items():
                if new_img in available_images:
                    pattern = f'src="../assets/images/{old_img}"'
                    replacement = f'src="../assets/images/{new_img}"'
                    new_content, count = re.subn(re.escape(pattern), replacement, content)
                    if count > 0:
                        content = new_content
                        file_replacements += count
            
            # Replace author avatars
            author_pattern = r'src="../assets/images/(author-realistic\.svg|avatar\.svg)"'
            if 'author-john.jpg' in available_images:
                content, count = re.subn(author_pattern, 'src="../assets/images/author-john.jpg"', content)
                file_replacements += count
            
            if file_replacements > 0:
                # Write back the modified content
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"OK {html_file.name}: {file_replacements} images updated")
                total_replacements += file_replacements
            else:
                print(f"-- {html_file.name}: No changes needed")
            
            total_files += 1
            
        except Exception as e:
            print(f"ERROR processing {html_file.name}: {e}")
    
    print("=" * 50)
    print(f"Processed {total_files} files")
    print(f"Made {total_replacements} image replacements")
    
    if total_replacements > 0:
        print("SUCCESS: All HTML files updated to use real images!")
        print("Refresh your browser to see the changes.")
    else:
        print("No changes were needed.")

if __name__ == "__main__":
    update_images_in_html()