# ZiranLab 项目文档

## 基本信息
- 内部名:ZiranWeb / 对外品牌:ZiranLab
- 框架:Next.js App Router + TypeScript + Tailwind CSS
- 部署:Vercel(GitHub push自动部署)
- 正式域名:https://ziranlab.com
- DNS:Cloudflare
- 内容数据:Notion API
- 动效:Motion / Framer Motion
- 分析:Google Analytics 4

## 环境变量(不提交GitHub)
NOTION_API_KEY=...
NOTION_DB_EVERYDAY=...
NOTION_DB_INEDIBLE=...
NOTION_DB_MEDLEY=...
NEXT_PUBLIC_SUPPORT_ENABLED=false
NEXT_PUBLIC_KOFI_URL=https://ko-fi.com/ziranlab
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-6V0C4PC8K0

## 修改原则
每次任务只动明确批准的文件。完成后必须跑:
npm run lint
npm run build

并汇报新增/修改了哪些文件。不自动执行git commit/push。

## 默认禁止修改
- app/about/page.tsx 的文字内容
- app/work/page.tsx 的文字内容
- lib/notion.ts
- data/projects.json 的项目描述和链接
- components/SplitLanding.tsx
- 任何未明确批准的文件

## 设计系统

### 配色(CSS变量名保留moss,但颜色已升级为薄荷蓝)
```css
--moss: #BCE0DF        /* 薄荷蓝,主强调色 */
--moss-dark: #2C4F4D   /* 深松石,文字和hover */
--moss-light: #D8EFEE  /* 浅薄荷蓝,hover背景 */
--paper: #F7F6F2       /* 米白背景 */
--ink: #141412         /* 正文黑 */
```

### 字体
- 标题:Fraunces
- 正文:Newsreader
- 品牌标识:monospace

### SiteHeader品牌文字
"Ziran / Lab" 改为 "ZIRANLAB",样式:
- font-family: monospace
- font-size: 14px
- letter-spacing: 0.08em
- text-transform: uppercase

## 模块状态

### A. 关于我 — 核心已完成
文件:app/about/page.tsx
待用户自填:GitHub/LinkedIn真实链接
允许:FadeIn、WordReveal、数字统计条

### B. 作品展示 — 核心已完成
文件:app/work/page.tsx、components/ProjectCard.tsx、types/project.ts、data/projects.json
允许:FadeIn、hover动效、tags标签、videoUrl字段预留

### C. 博客书架 — 已完成并接入Notion
总标题:Everything Bagel
分类:Everyday / Inedible / Medley
路由:/shelf → /shelf/[category] → /shelf/[category]/[id]
允许:封面FadeIn、阅读页ScrollLit、文章底部Support入口

### D. AI聊天助手 — 未开始(P1)
等视觉/Support/GA4稳定后开始

### E1. 打赏预告态 — 前端未实现
- Ko-fi URL:https://ko-fi.com/ziranlab
- NEXT_PUBLIC_SUPPORT_ENABLED=false时:弹出Coming Soon弹窗
- NEXT_PUBLIC_SUPPORT_ENABLED=true时:新标签页打开Ko-fi
- 导航栏按钮文案:"支持一下 ☕"
- 弹窗标题:"Support is coming soon"
- 弹窗正文:"The support page is ready, but payments are not open yet. Thank you for wanting to support ZiranLab."
- 每次点击都发GA4的support_click事件

### E2. 正式支付 — 等EAD和主体明确后开启
把NEXT_PUBLIC_SUPPORT_ENABLED改为true重新部署即可

### F. GA4 — 平台已建,代码未接入
Measurement ID:G-6V0C4PC8K0
环境变量:NEXT_PUBLIC_GA_MEASUREMENT_ID
ID缺失时网站正常运行不报错

### G. 商店 — P2暂不做
### H. 多语言 — 未来功能
### I. 评论区 — 未来功能

## 动效规范(全部需要检测prefers-reduced-motion)

### FadeIn组件
文件:components/FadeIn.tsx
- 'use client'
- whileInView,once:true
- 初始:opacity 0,y 20
- 结束:opacity 1,y 0
- transition: duration 0.5, ease [0.25,0.1,0.25,1.0]
- reduced motion:直接显示children不做位移

### WordReveal组件
文件:components/WordReveal.tsx
- 'use client'
- 按空格split成词数组
- 每词motion.span,delay=index×0.08s
- 初始:opacity 0,y 12
- transition: duration 0.4,ease easeOut
- reduced motion:直接显示纯文字

### ScrollLit组件
文件:components/ScrollLit.tsx
- 'use client'
- 按字符split
- useScroll+useTransform
- 默认opacity 0.2,随滚动进度点亮到1
- reduced motion:全部opacity 1

### ProjectCard升级
- motion.div替换最外层div
- whileHover: scale 1.02,duration 0.25
- hover:薄荷蓝边框1.5px
- 卡片背景:#F5F1EC
- tags标签:背景#BCE0DF,文字#2C4F4D,11px monospace
- types/project.ts新增:tags?: string[],videoUrl?: string|null
- 暂不实现视频播放

### About数字统计条
文件:components/StatsCounter.tsx(新建)
- 三栏:N projects(从projects.json动态读) / 3 blog categories / 2026
- 数字:Fraunces,text-3xl
- countUp动画:requestAnimationFrame,800ms
- 区块上方0.5px薄荷蓝横线,三栏间0.5px薄荷蓝竖线
- reduced motion:直接显示最终数字

## 执行批次
- Batch 1:全局换色+FadeIn+SiteHeader品牌文字
- Batch 2:WordReveal+统计条+ProjectCard+ScrollLit
- Batch 3:Support入口+Coming Soon弹窗+GA4
- Batch 4:提交部署