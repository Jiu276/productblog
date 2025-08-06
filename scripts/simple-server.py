#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# 切换到构建输出目录
os.chdir('.next/server/app')

PORT = 8080
HOST = '0.0.0.0'

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_GET(self):
        if self.path == '/':
            self.path = '/page.html'
        return super().do_GET()

print("=== ProductHub 简易服务器 ===")
print(f"正在启动服务器...")
print(f"服务器地址: http://{HOST}:{PORT}")
print(f"本地访问: http://localhost:{PORT}")
print("按 Ctrl+C 停止服务器")
print("=" * 30)

try:
    with socketserver.TCPServer((HOST, PORT), MyHTTPRequestHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n服务器已停止")
except Exception as e:
    print(f"启动失败: {e}")