#!/usr/bin/env python3
"""
Simple link tester for static site
"""
import os
import re
from pathlib import Path

def extract_links(html_content):
    """Extract relative links from HTML content"""
    link_pattern = r'href="([^"]*\.html[^"]*)"'
    return re.findall(link_pattern, html_content)

def test_static_site_links():
    """Test all links in static site"""
    static_site_dir = Path('../static-site')
    
    if not static_site_dir.exists():
        print("Static site directory not found!")
        return
    
    print("Testing static site links...")
    print("=" * 50)
    
    # Get all HTML files
    html_files = list(static_site_dir.glob('**/*.html'))
    
    all_links = []
    file_issues = []
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            links = extract_links(content)
            relative_path = html_file.relative_to(static_site_dir)
            
            print(f"File: {relative_path}")
            
            for link in links:
                if not link.startswith('http'):  # Only check relative links
                    # Resolve link relative to current file
                    if str(relative_path).startswith('articles/'):
                        # Link from articles directory
                        if link.startswith('../'):
                            target_path = static_site_dir / link[3:]  # Remove '../'
                        else:
                            target_path = html_file.parent / link
                    else:
                        # Link from root directory
                        if link.startswith('./'):
                            target_path = static_site_dir / link[2:]  # Remove './'
                        else:
                            target_path = static_site_dir / link
                    
                    if target_path.exists():
                        print(f"  ✓ {link}")
                    else:
                        print(f"  ✗ {link} -> {target_path} (NOT FOUND)")
                        file_issues.append(f"{relative_path}: {link}")
                    
                    all_links.append((str(relative_path), link, str(target_path)))
            
            print()
            
        except Exception as e:
            print(f"Error reading {html_file}: {e}")
    
    print("=" * 50)
    if file_issues:
        print(f"Found {len(file_issues)} broken links:")
        for issue in file_issues:
            print(f"  - {issue}")
    else:
        print("All relative links are valid! ✓")
    
    print(f"Total files checked: {len(html_files)}")
    print(f"Total links checked: {len([l for l in all_links if not l[1].startswith('http')])}")

if __name__ == "__main__":
    test_static_site_links()