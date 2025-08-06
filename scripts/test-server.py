#!/usr/bin/env python3
"""
Simple HTTP server for testing static site
"""
import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

def start_test_server():
    """Start HTTP server in static-site directory"""
    
    # Change to static-site directory
    static_site_dir = Path('../static-site')
    if not static_site_dir.exists():
        print("Static site directory not found!")
        return
    
    os.chdir(static_site_dir)
    
    PORT = 8081
    HOST = '127.0.0.1'
    
    class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', '*')
            super().end_headers()
    
    print("=" * 50)
    print("ProductHub Static Site Test Server")
    print("=" * 50)
    print(f"Server URL: http://{HOST}:{PORT}")
    print(f"Serving from: {static_site_dir.absolute()}")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    print()
    print("Test these pages:")
    print(f"  Homepage: http://{HOST}:{PORT}/")
    print(f"  Products: http://{HOST}:{PORT}/products.html")
    print(f"  Blog: http://{HOST}:{PORT}/blog.html")
    print(f"  About: http://{HOST}:{PORT}/about.html")
    print(f"  Sample Article: http://{HOST}:{PORT}/articles/iphone-15-pro-review.html")
    print()
    
    try:
        with socketserver.TCPServer((HOST, PORT), MyHTTPRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")
    except Exception as e:
        print(f"Server error: {e}")

if __name__ == "__main__":
    start_test_server()