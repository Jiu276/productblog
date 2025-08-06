#!/usr/bin/env python3
"""
Fix image links in static site articles
Replace external picsum.photos URLs with local placeholder images
"""
import os
import re
from pathlib import Path

def fix_images_in_articles():
    """Replace external image URLs with local placeholders"""
    
    static_site_dir = Path('../static-site')
    articles_dir = static_site_dir / 'articles'
    
    if not articles_dir.exists():
        print("Articles directory not found!")
        return
    
    print("Fixing image links in articles...")
    print("=" * 50)
    
    # Pattern to match picsum.photos URLs
    avatar_pattern = r'src="https://picsum\.photos/50/50\?random=\d+"'
    image_pattern = r'src="https://picsum\.photos/900/400\?random=\d+"'
    
    # Replacement URLs
    avatar_replacement = 'src="../assets/images/avatar.svg"'
    image_replacement = 'src="../assets/images/placeholder.svg"'
    
    total_files = 0
    total_replacements = 0
    
    # Process all HTML files in articles directory
    for html_file in articles_dir.glob('*.html'):
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Replace avatar images (50x50)
            content, avatar_count = re.subn(avatar_pattern, avatar_replacement, content)
            
            # Replace main images (900x400)
            content, image_count = re.subn(image_pattern, image_replacement, content)
            
            total_count = avatar_count + image_count
            
            if total_count > 0:
                # Write back the modified content
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"OK {html_file.name}: {avatar_count} avatars + {image_count} images = {total_count} total")
                total_replacements += total_count
            else:
                print(f"- {html_file.name}: No changes needed")
            
            total_files += 1
            
        except Exception as e:
            print(f"ERROR processing {html_file.name}: {e}")
    
    print("=" * 50)
    print(f"Processed {total_files} files")
    print(f"Made {total_replacements} image replacements")
    print("All external images replaced with local placeholders!")

if __name__ == "__main__":
    fix_images_in_articles()