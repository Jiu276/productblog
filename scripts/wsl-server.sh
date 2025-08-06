#!/bin/bash

echo "=== ProductHub WSL网络配置启动 ==="

# 获取WSL的IP地址
WSL_IP=$(hostname -I | awk '{print $1}')
echo "WSL IP地址: $WSL_IP"

# 检查是否在WSL2环境
if grep -q "microsoft" /proc/version && grep -q "WSL2" /proc/version 2>/dev/null; then
    echo "检测到WSL2环境"
    echo ""
    echo "在Windows中，请使用以下命令查找WSL IP："
    echo "在Windows PowerShell中运行: wsl hostname -I"
    echo ""
    echo "然后在浏览器中访问: http://\$WSL_IP:3000"
    echo "例如: http://$WSL_IP:3000"
else
    echo "检测到WSL1或其他环境"
    echo "直接访问: http://localhost:3000"
fi

echo ""
echo "=== 启动开发服务器 ==="
echo "服务器绑定到所有接口..."

# 设置环境变量以确保Next.js绑定到所有接口
export HOSTNAME=0.0.0.0

# 启动服务器
npx next dev -H 0.0.0.0 -p 3000