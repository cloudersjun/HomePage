# 宠店营销Agent 官方网站

宠店营销Agent的官方宣传网站，介绍产品功能、定价方案和使用指南。

## 🚀 快速开始

### 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建

```bash
npm run build
```

构建产物在 `out/` 目录下。

## 📦 部署

参考 [DEPLOY.md](./DEPLOY.md) 了解如何部署到阿里云服务器。

简版部署：

```bash
# 1. 构建
npm run build

# 2. 上传到服务器
rsync -avz out/ root@your-server:/opt/apps/HomePage/out/

# 3. 配置Nginx（参考nginx.conf）
# 4. 重载Nginx
sudo systemctl reload nginx
```

## 🏗 项目结构

```
pet-marketing-website/
├── app/
│   ├── page.tsx           # 首页（单页应用）
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/
│   ├── Navbar.tsx         # 导航栏
│   ├── Footer.tsx         # 页脚
│   ├── HeroSection.tsx    # Hero区域
│   ├── FeaturesSection.tsx # 功能介绍
│   ├── PricingSection.tsx # 定价方案
│   └── AboutSection.tsx   # 关于我们
├── public/                # 静态资源
├── nginx.conf             # Nginx配置模板
├── deploy.sh              # 部署脚本
└── DEPLOY.md              # 部署文档
```

## 🎨 设计特点

- **温馨可爱风**：采用橙色/粉色渐变主题，贴合宠物行业温暖亲切的形象
- **响应式设计**：完美适配桌面端和移动端
- **流畅动画**：使用Framer Motion实现优雅的交互动画
- **SEO友好**：Next.js静态生成，搜索引擎可索引

## 🛠 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **图标**: Lucide React
- **部署**: 静态导出 + Nginx

## 📝 更新日志

### v1.0.0
- 首页Hero区域
- 功能介绍（6大核心功能）
- 定价方案（试用/基础/专业）
- 关于我们和联系方式
- 响应式设计适配
- 部署脚本和文档

## 📄 License

MIT
