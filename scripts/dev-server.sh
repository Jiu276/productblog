#!/bin/bash

echo "=== ProductHub 开发服务器启动 ==="
echo "当前系统: $(uname -a)"
echo "当前目录: $(pwd)"
echo "IP地址: $(hostname -I | awk '{print $1}')"

echo ""
echo "正在启动开发服务器..."
echo "服务器将在以下地址启动:"
echo "- http://localhost:3000"
echo "- http://127.0.0.1:3000"
echo "- http://$(hostname -I | awk '{print $1}'):3000"

echo ""
echo "如果您在Windows中使用WSL，请在Windows浏览器中访问:"
echo "- http://localhost:3000"
echo "- http://127.0.0.1:3000"

echo ""
echo "按 Ctrl+C 停止服务器"
echo "================================"

# 启动开发服务器，绑定到所有接口
npx next dev -H 0.0.0.0 -p 3000