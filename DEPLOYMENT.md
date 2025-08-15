# 🚀 ProductBlog 部署指南

本文档提供 ProductBlog 项目的完整部署指南，包括多种部署方案和配置选项。

## 📋 部署前检查清单

### 环境要求
- [ ] Node.js 18.0+
- [ ] npm 8.0+ 或 yarn 1.22+
- [ ] Git 已安装
- [ ] 项目依赖已安装 (`npm install`)

### 代码质量检查
```bash
# 类型检查
npm run type-check

# 代码质量检查
npm run lint

# 格式检查
npm run format:check

# 构建测试
npm run build
```

### 资源完整性检查
- [ ] 所有图片资源已准备就绪
- [ ] 本地图片文件存在于 `public/images/` 目录
- [ ] 占位图 SVG 文件完整
- [ ] 文章数据配置正确

## 🌐 部署方案

### 1. Vercel 部署（推荐）

Vercel 是 Next.js 的最佳部署平台，提供零配置部署体验。

#### 快速部署

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel

# 4. 生产环境部署
vercel --prod
```

#### 配置文件

创建 `vercel.json` 配置文件：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/blog/:slug",
      "destination": "/blog/:slug",
      "permanent": false
    }
  ]
}
```

#### 环境变量设置

```bash
# 在 Vercel 后台设置环境变量
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-ga-id
```

### 2. Netlify 部署

Netlify 适合静态站点和 JAMstack 应用。

#### 部署步骤

```bash
# 1. 构建项目
npm run build

# 2. 安装 Netlify CLI
npm i -g netlify-cli

# 3. 登录 Netlify
netlify login

# 4. 部署
netlify deploy

# 5. 生产环境部署
netlify deploy --prod
```

#### Netlify 配置

创建 `netlify.toml` 配置文件：

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. 静态站点部署

对于不需要服务器端渲染的场景，可以导出为静态站点。

#### 静态导出

```bash
# 1. 修改 next.config.js
# 添加 output: 'export'

# 2. 构建并导出
npm run build
npm run export

# 3. 部署 out/ 目录到任何静态托管服务
```

#### 支持的静态托管平台

- **GitHub Pages**: 免费静态托管
- **GitLab Pages**: GitLab 集成托管
- **Cloudflare Pages**: 全球 CDN 加速
- **Firebase Hosting**: Google 托管服务
- **Amazon S3**: AWS 静态网站托管

### 4. Docker 部署

容器化部署适合自建服务器和云平台。

#### Dockerfile

```dockerfile
# 多阶段构建优化镜像大小
FROM node:18-alpine AS base

# 安装依赖阶段
FROM base AS deps
WORKDIR /app

# 复制 package 文件
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用
RUN npm run build

# 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# 设置正确的权限
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  productblog:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://your-domain.com
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
    networks:
      - productblog-network

networks:
  productblog-network:
    driver: bridge
```

#### 部署命令

```bash
# 构建镜像
docker build -t productblog .

# 运行容器
docker run -p 3000:3000 productblog

# 使用 Docker Compose
docker-compose up -d
```

### 5. 云平台部署

#### Amazon Web Services (AWS)

```bash
# 使用 AWS Amplify
npm i -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

#### Google Cloud Platform (GCP)

```bash
# 使用 Google App Engine
gcloud app deploy
```

#### Microsoft Azure

```bash
# 使用 Azure Static Web Apps
az staticwebapp create \
  --name productblog \
  --resource-group myResourceGroup \
  --source https://github.com/username/product-blog
```

## ⚙️ 配置优化

### Next.js 配置优化

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 性能优化
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react']
  },
  
  // 图片优化
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  
  // 压缩优化
  compress: true,
  
  // 安全头部
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

### 性能监控

```javascript
// lib/analytics.ts
export function trackPageView(url: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_location: url
    })
  }
}

export function trackEvent(action: string, category: string, label?: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label
    })
  }
}
```

## 🔍 性能优化

### 构建优化

```bash
# 分析构建包大小
npm run analyze

# 优化构建
npm run build --max-old-space-size=4096
```

### CDN 配置

```javascript
// 配置 CDN 加速
const CDN_URL = process.env.NODE_ENV === 'production' 
  ? 'https://cdn.your-domain.com' 
  : ''

export const assetPrefix = CDN_URL
```

### 缓存策略

```nginx
# nginx 配置示例
location /images/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔒 安全配置

### 环境变量管理

```bash
# .env.local (本地开发)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-ga-id

# .env.production (生产环境)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-production-ga-id
```

### CSP 配置

```javascript
// 内容安全策略
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`
```

## 📊 监控与维护

### 健康检查

```javascript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  })
}
```

### 日志监控

```javascript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({ level: 'info', message, meta, timestamp: new Date() }))
  },
  error: (message: string, error?: Error, meta?: any) => {
    console.error(JSON.stringify({ level: 'error', message, error: error?.stack, meta, timestamp: new Date() }))
  }
}
```

## 🆘 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清理缓存
   npm run clean
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **图片加载失败**
   - 检查图片路径是否正确
   - 验证图片文件是否存在
   - 检查图片格式支持

3. **部署后页面空白**
   - 检查 basePath 配置
   - 验证静态资源路径
   - 查看浏览器控制台错误

### 性能问题排查

```bash
# 检查包大小
npm run analyze

# 性能测试
lighthouse https://your-domain.com

# 检查图片优化
npm run build -- --experimental-debug
```

## 📞 支持与联系

如有部署问题，请参考以下资源：

- **项目文档**: [README.md](./README.md)
- **Issue 追踪**: GitHub Issues
- **技术支持**: support@productblog.com

---

**祝您部署顺利！🚀**