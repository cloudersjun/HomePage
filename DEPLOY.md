# 宠店营销Agent 官方网页部署指南

本文档描述如何将官方网页部署到阿里云服务器，与现有后端API共享Nginx。

## 目录

- [架构概览](#架构概览)
- [前置准备](#前置准备)
- [第一步：构建项目](#第一步构建项目)
- [第二步：上传到服务器](#第二步上传到服务器)
- [第三步：配置Nginx](#第三步配置nginx)
- [第四步：验证部署](#第四步验证部署)

---

## 架构概览

```
用户访问 mineclaw.top
              │
              ▼
        Nginx (443 SSL)
              │
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
官方网页(静态)      后端API (/api/)
/out                FastAPI:8000
```

## 前置准备

- [ ] 已完成PetMarketing后端部署（参考 `PetMarketing/docs/deployment.md`）
- [ ] 拥有一个已备案的域名（如 `mineclaw.top`）
- [ ] 域名DNS已解析到阿里云服务器IP
- [ ] 服务器上已有Nginx和SSL证书

---

## 第一步：构建项目

在本地开发完成后，构建静态文件：

```bash
cd /Users/yujun/workspace/HomePage/pet-marketing-website
npm run build
```

构建产物在 `out/` 目录下。

---

## 第二步：上传到服务器

将构建产物上传到阿里云服务器：

```bash
# 方法1：使用scp上传
scp -r out/* root@你的服务器IP:/opt/apps/HomePage/out/

# 方法2：使用rsync（推荐，支持增量更新）
rsync -avz out/ root@你的服务器IP:/opt/apps/HomePage/out/
```

或者通过Git部署：

```bash
# 在服务器上
cd /opt/apps
git clone <你的仓库地址> HomePage
cd HomePage
npm install
npm run build
```

---

## 第三步：配置Nginx

更新Nginx配置，使静态网页和后端API共存：

```bash
# 在服务器上编辑Nginx配置
sudo nano /etc/nginx/sites-available/homepage
```

完整配置示例（将 `mineclaw.top` 替换为你的真实域名）：

```nginx
# HTTP -> HTTPS 强制跳转
server {
    listen 80;
    server_name mineclaw.top;
    return 301 https://$host$request_uri;
}

# HTTPS 服务
server {
    listen 443 ssl;
    server_name mineclaw.top;

    # SSL 证书
    ssl_certificate     /etc/letsencrypt/live/mineclaw.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mineclaw.top/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # 上传文件大小限制
    client_max_body_size 50M;

    # 根路径：官方网页（静态文件）
    location / {
        root /opt/apps/HomePage/out;
        index index.html;
        try_files $uri $uri/ /index.html;  # SPA路由支持
        expires 1d;
        add_header Cache-Control "public, immutable";
    }

    # 反向代理到 FastAPI 后端
    location /api/ {
        proxy_pass         http://127.0.0.1:8000;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    # 后端生成的图片静态文件
    location /static/ {
        alias /app/storage/;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # 健康检查
    location /health {
        proxy_pass http://127.0.0.1:8000;
    }
}
```

### 申请SSL证书（如果是新域名）

```bash
# 停止Nginx
sudo systemctl stop nginx

# 申请证书
sudo certbot certonly --standalone -d mineclaw.top

# 启动Nginx
sudo systemctl start nginx
```

### 部署配置

```bash
# 启用配置
sudo ln -sf /etc/nginx/sites-available/homepage /etc/nginx/sites-enabled/homepage

# 禁用默认配置
sudo rm -f /etc/nginx/sites-enabled/default

# 测试配置语法
sudo nginx -t

# 重载Nginx
sudo systemctl reload nginx
```

---

## 第四步：验证部署

```bash
# 验证网页访问
curl https://mineclaw.top
# 应返回HTML内容

# 验证后端API
curl https://mineclaw.top/health
# 应返回：{"status":"ok","env":"production"}

# 验证图片服务
# 访问 https://mineclaw.top/static/xxx.jpg
```

---

## 日常更新

```bash
# 本地修改代码后
cd /Users/yujun/workspace/HomePage/pet-marketing-website
npm run build

# 上传到服务器
rsync -avz out/ root@你的服务器IP:/opt/apps/HomePage/out/

# 无需重启Nginx，文件更新后立即生效
```

---

## 常见问题

**Q: 访问网页显示404**

检查Nginx配置中的 `root` 路径是否正确，确保 `try_files` 配置存在。

**Q: API请求失败**

确认 `/api/` 路径的代理配置正确，后端服务正在运行。

**Q: SSL证书过期**

```bash
sudo certbot renew
sudo systemctl reload nginx
```
