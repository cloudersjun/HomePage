#!/bin/bash
# 宠店营销Agent 官方网页 - 一键部署脚本
# 使用前：chmod +x deploy.sh && ./deploy.sh

set -e

# 配置变量（修改为你的实际值）
SERVER_IP="your_server_ip"
SERVER_USER="root"
DEPLOY_PATH="/var/www/petmarketing-website"
DOMAIN="mineclaw.top"

echo "=== 宠店营销Agent 官方网页 部署开始 ==="

# 1. 构建项目
echo "→ 构建项目..."
npm run build

# 2. 检查构建产物
if [ ! -d "out" ]; then
    echo "❌ 构建失败，out目录不存在"
    exit 1
fi

echo "✓ 构建成功，产物在 out/ 目录"

# 3. 上传到服务器
echo "→ 上传文件到服务器 ${SERVER_USER}@${SERVER_IP}:${DEPLOY_PATH}..."

# 创建远程目录
ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p ${DEPLOY_PATH}"

# 同步文件（使用rsync，支持增量更新）
if command -v rsync &> /dev/null; then
    rsync -avz --delete out/ ${SERVER_USER}@${SERVER_IP}:${DEPLOY_PATH}/
else
    # 备用方案：使用scp
    scp -r out/* ${SERVER_USER}@${SERVER_IP}:${DEPLOY_PATH}/
fi

echo "✓ 文件上传成功"

# 4. 配置Nginx（首次部署需要）
echo ""
echo "→ 是否需要配置Nginx？（首次部署选y，更新选n）"
read -p "[y/N]: " configure_nginx

if [ "$configure_nginx" = "y" ] || [ "$configure_nginx" = "Y" ]; then
    echo ""
    echo "=== Nginx 配置指南 ==="
    echo ""
    echo "请在服务器上执行以下操作："
    echo ""
    echo "1. 创建或更新Nginx配置文件："
    echo "   sudo nano /etc/nginx/sites-available/petmarketing"
    echo ""
    echo "2. 参考项目中的 nginx.conf 文件，将域名替换为: ${DOMAIN}"
    echo ""
    echo "3. 申请SSL证书（如果是新域名）："
    echo "   sudo systemctl stop nginx"
    echo "   sudo certbot certonly --standalone -d ${DOMAIN}"
    echo "   sudo systemctl start nginx"
    echo ""
    echo "4. 启用配置："
    echo "   sudo ln -sf /etc/nginx/sites-available/petmarketing /etc/nginx/sites-enabled/"
    echo "   sudo rm -f /etc/nginx/sites-enabled/default"
    echo "   sudo nginx -t"
    echo "   sudo systemctl reload nginx"
    echo ""
fi

# 5. 验证部署
echo "→ 验证部署..."
echo ""
echo "请检查以下URL是否正常访问："
echo "  - 首页: https://${DOMAIN}"
echo "  - 健康检查: https://${DOMAIN}/health"
echo ""
echo "=== 部署完成 ==="
echo ""
echo "后续更新只需运行："
echo "  ./deploy.sh"
