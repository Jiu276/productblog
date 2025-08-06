#!/bin/bash

echo "启动ProductHub网站..."
echo "构建项目..."
npm run build

echo "启动服务器..."
echo "网站将在 http://localhost:3000 启动"
echo "按 Ctrl+C 停止服务器"

npm start