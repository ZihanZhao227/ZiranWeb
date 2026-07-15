# ZiranLab 项目文档

## 基本信息
- 内部名:ZiranWeb / 对外品牌:ZiranLab
- 框架:Next.js 16 App Router + TypeScript + Tailwind CSS
- 部署:Vercel(GitHub push自动部署)
- 正式域名:https://ziranlab.com
- DNS:Cloudflare
- 内容数据:Notion API(@notionhq/client)
- 动效:Framer Motion(motion/react)
- 分析:Google Analytics 4

## 环境变量(不提交GitHub,.env.local+Vercel均已配置)
NOTION_API_KEY=...
NOTION_DB_EVERYDAY=...
NOTION_DB_INEDIBLE=...
NOTION_DB_MEDLEY=...
NEXT_PUBLIC_SUPPORT_ENABLED=false
NEXT_PUBLIC_KOFI_URL=https://ko-fi.com/ziranlab
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-6V0C4PC8K0

## 修改原则
- 每次任务只动明确批准的文件
- 完成后必须跑 npm run lint && npm run build
- 汇报新增/修改了哪些文件
- 不自动执行git commit/push

## 默认禁止修改(未经明确批准)
- lib/notion.ts
- components/SplitLanding.tsx
- components/PoetryWave.tsx
- components/LuoshenBanner.tsx
- components/StatsCounter.tsx
- components/GoogleAnalytics.tsx
- lib/analytics.ts
- components/StoryToggle.tsx
- components/ExperienceList.tsx
- components/ExperienceIcon.tsx

## 设计系统

### 配色(globals.css中定义)
--moss: #BCE0DF        薄荷蓝,主强调色
--moss-dark: #2C4F4D   深松石,文字和hover
--moss-light: #D8EFEE  浅薄荷蓝,hover背景
--paper: #F7F6F2       米白背景
--ink: #141412         正文黑

### 字体
- 标题:Fraunces(font-heading)
- 正文:Newsreader(font-body)
- 品牌/标签:monospace

### 导航顺序(SiteHeader.tsx)
ZIRANLAB / About / Work / Shelf / Studio / Support🩵

---

## 模块状态

### A. 关于我(About) — 已完成
文件:app/about/page.tsx

页面结构(从上到下,不要改动顺序):
1. 简介区:左文字+右profile.jpg(白色边框rotate 1.5deg)
2. EXPERIENCE列表:ExperienceList组件(可展开/折叠,公司logo+链接)
   数据在page.tsx顶部EXPERIENCE数组,用户自己改文字
3. About Those Experience:StoryToggle组件(点击区域涟漪+粒子+中英切换)
   文字在components/StoryToggle.tsx的EN_PARAGRAPHS和ZH_PARAGRAPHS
4. EXPERIENCE MOMENTS:5张横滑照片(ff1/ff2/purdue1/purdue2/yw1)
   数据在page.tsx顶部MOMENTS数组,caption用户自填
5. BEYOND WORK:hobby文字+9张照片(travel1-3/bake1-2/halloween1-4)
   数据在page.tsx顶部BEYOND_PHOTOS数组
6. 联系方式(Email/GitHub/LinkedIn)
7. StatsCounter统计条
8. PoetryWave诗句字幕+粒子海浪(最底部,不动)

关键组件:
- components/ExperienceList.tsx('use client',展开/折叠,Framer Motion)
- components/ExperienceIcon.tsx('use client',logo图片+fallback文字)
- components/StoryToggle.tsx('use client',六层涟漪+12粒子+中英切换)
- app/about/photo-strip.module.css(隐藏scrollbar)

照片路径:public/photos/
企业logo:logo-datamine.png / logo-yuewen.png / logo-ff.png

待用户自填:
- MOMENTS和BEYOND_PHOTOS数组里的caption字段(目前是"xxx caption"占位)
- BEYOND WORK的文字段落
- data/projects.json里的真实GitHub链接

### B. 作品展示(Work) — 已完成
文件:app/work/page.tsx, components/ProjectCard.tsx,
     types/project.ts, data/projects.json
- 项目卡片(进行中/已完工分组)
- 施工中黄黑封条(进行中项目)
- hover浮起+薄荷蓝边框+tags标签
- videoUrl字段预留(暂时null)
- 待用户自填:真实GitHub链接和项目描述

### C. 博客书架(Everything Bagel) — 已完成
文件:app/shelf/, components/shelf/, lib/notion.ts

已完成:
- 三层路由:/shelf → /shelf/[category] → /shelf/[category]/[id]
- 三个分类:Everyday / Inedible / Medley
- 数据源:Notion API,三个数据库(Name/Date/Public字段)
- 书架视觉:薄荷蓝#BCE0DF木书架+书脊3D效果
  (上沿#D8EFEE,下沿#8BBFB8,hover抽书translateY -22px)
- 阅读页:ScrollLit"慢读。"+drop cap首字母(Fraunces,#2C4F4D)
- 文章底部Support入口(分类化文案)
- 路由大小写自动重定向
- LuoshenBanner.tsx洛神赋图视差背景(shelf页底部)
  图片:public/images/luoshen-scroll.png

待做:
- 阅读页左侧目录导航(从Notion Heading提取,Prompt C)
- Notion彩色词渲染(Prompt C)

### D. AI聊天助手 — 未开始(P1)
- 第一版:GitHub查询+function calling+预留RAG接口
- 需要:Anthropic API key(console.anthropic.com,按token计费)
- 开始条件:Studio页面完成后

### E1. 打赏预告态 — 已完成
- 导航栏"Support🩵"
- 点击弹出Coming Soon弹窗
- 每篇文章底部分类化文案
- GA4 support_click事件已接入
- 开启方式:NEXT_PUBLIC_SUPPORT_ENABLED改true重新部署

### E2. 正式支付 — 等EAD落地
- Ko-fi:https://ko-fi.com/ziranlab(已建)
- Stripe:账户已建,待ziranlab.com验证通过后完成
- PayPal:暂停,待EAD和经营主体明确
- ⚠️ 需先向学校国际学生办公室确认OPT期间合法收款时间点

### F. GA4 — 已完成
- Measurement ID:G-6V0C4PC8K0
- GoogleAnalytics.tsx已接入layout.tsx
- support_click已实现

### G. Studio — 导航入口已有,页面未建
- SiteHeader.tsx已有Studio链接指向/studio
- 内容:剧本/游戏文案/短篇小说/艺术实验
- 待做:占位页面(Prompt D,最轻量)

### H. 多语言 — 未来功能
- 导航栏地球图标+语言选择器
- Notion AI翻译工作流
- 开始条件:C/E/F稳定后

### I. 评论区 — 未来功能(需Supabase)

### J. 商店 — P2暂不做

---

## 动效组件清单(已完成)
- FadeIn.tsx:滚动淡入
- WordReveal.tsx:逐词揭示标题
- ScrollLit.tsx:滚动点亮("慢读。")
- PoetryWave.tsx:诗句字幕+粒子海浪(about底部)
- LuoshenBanner.tsx:洛神赋图视差(shelf底部)
- StatsCounter.tsx:数字统计条(about底部)
- StoryToggle.tsx:六层涟漪+粒子+中英切换(about)
- ExperienceList.tsx:展开/折叠经历详情(about)

## 待做优先级
1. [今天] Prompt D — /studio占位页(10分钟)
2. [今天] Prompt C — 阅读页左侧目录+Notion彩色词
3. [本周] D模块AI助手(需Anthropic API key)
4. [外部] Stripe完成验证(域名已上线,可以回填)
5. [外部] 国际学生办公室确认收款合法性
6. [未来] 单页滚动架构改造
7. [未来] 多语言i18n
8. [未来] 评论区
9. [未来] E2正式支付

## Git规范
提交信息用中文语义化描述,不自动执行commit/push