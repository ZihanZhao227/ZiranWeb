# ZiranLab 项目文档

## 基本信息
- 内部名:ZiranWeb / 对外品牌:ZiranLab
- 框架:Next.js App Router + TypeScript + Tailwind CSS
- 部署:Vercel(GitHub push自动部署)
- 正式域名:https://ziranlab.com
- DNS:Cloudflare
- 内容数据:Notion API(@notionhq/client)
- 动效:Framer Motion
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

## 设计系统

### 配色
--moss: #BCE0DF        薄荷蓝,主强调色
--moss-dark: #2C4F4D   深松石,文字和hover
--moss-light: #D8EFEE  浅薄荷蓝,hover背景
--paper: #F7F6F2       米白背景
--ink: #141412         正文黑

### 字体
- 标题:Fraunces
- 正文:Newsreader
- 品牌/标签/monospace区域:monospace

### 导航顺序(SiteHeader.tsx)
ZIRANLAB / About / Work / Shelf / Studio / 支持一下☕

---

## 模块状态

### A. 关于我(About) — 改版进行中
文件:app/about/page.tsx

已完成:
- 基础版页面(个人介绍+邮箱/GitHub/LinkedIn)
- WordReveal标题动效
- StatsCounter数字统计条(4 projects / 3 blog categories / 2026)
- PoetryWave诗句字幕+粒子海浪(页面最底部,不动)

待做(About改版 Prompt A):
页面结构从上到下:
1. 简介区(两栏:左文字+右个人照)
   - 标题:"Hi, I'm Zihan. You can call me Hannah."
   - 一段简短介绍(目前在做什么,欢迎来看)
   - 右侧照片:public/photos/profile.jpg,竖向3:4比例,
     白色边框,轻微旋转1.5deg,有轻微阴影
2. EXPERIENCE列表(公司logo占位框+职位+时间)
   - The Data Mine, Purdue | Undergraduate Researcher | Jan–May 2026
   - China Literature · Tencent | Editorial Intern | Nov 2022–Mar 2023
   - Fred & Farid Shanghai | Account Executive Intern | Jul–Nov 2022
   - logo框预留img标签,src指向public/photos/logo-{name}.png,
     加载失败时显示文字缩写fallback
3. THE LONGER VERSION(中英切换段落)
   - 默认英文,点击"← 看中文版"按钮切换
   - 切换时用Framer Motion做水波纹涟漪效果+轻微闪光
   - 英文版:关于gap year、两段实习的故事
   - 中文版:同一故事的中文版本
   - 文字内容由用户自己在tsx里手动修改,代码只搭结构
4. EXPERIENCE MOMENTS(5张横滑照片墙)
   - 照片文件:ff1.jpg / ff2.jpg / yw1.jpg / purdue1.jpg / purdue2.jpg
   - 路径:public/photos/
   - 每张照片白色边框,各自有不同角度微旋转(-2deg到+2deg)
   - hover时显示caption文字(文字内容留空字符串,用户自填)
   - 可左右横向滚动,隐藏scrollbar
5. BEYOND WORK(hobby区域)
   - 一段hobby文字(用户自填)
   - 9张小照片网格(3张旅行+2张烘焙+4张万圣节)
   - 文件:travel1-3.jpg / bake1-2.jpg / halloween1-4.jpg
   - 照片略小,flex-wrap排列,各有微旋转,铺满宽度
6. 联系方式(已有,保留不动)
7. StatsCounter(已有,保留不动)
8. PoetryWave+粒子海浪(已有,保留不动)

### B. 作品展示(Work) — 已完成
文件:app/work/page.tsx, components/ProjectCard.tsx,
     types/project.ts, data/projects.json
已完成:
- 项目卡片列表(进行中/已完工分组)
- 施工中封条(黄黑,进行中项目)
- ProjectCard升级:hover浮起+薄荷蓝边框+tags标签
- videoUrl字段预留(暂时null)
待做:
- 用户自己回填真实GitHub链接和项目描述

### C. 博客书架(Everything Bagel) — 视觉升级进行中
文件:app/shelf/, components/shelf/, lib/notion.ts

已完成:
- 三层路由:/shelf → /shelf/[category] → /shelf/[category]/[id]
- 真实Notion数据接入(Everyday/Inedible/Medley三个数据库)
- 目录页(01·标题格式,Public字段过滤)
- 阅读页(ScrollLit"慢读。"效果,文章底部Support入口)
- 封面FadeIn动效
- 路由大小写自动重定向

待做(Shelf视觉升级 Prompt B):
1. 书架封面改版:
   - 整体容器:薄荷蓝(#BCE0DF)背景书架,
     上沿#D8EFEE,下沿#8BBFB8,模拟木板立体感
   - 每本书做成竖向书脊形状,左侧深色细条模拟阴影
   - hover时translateY(-22px),cubic-bezier(0.34,1.4,0.64,1)弹性动效
   - hover显示书名tooltip(#2C4F4D背景,米白文字)
   - 颜色:Everyday=#F0EAD8/文字#5C4A32,
     Inedible=渐变(#3D5A30→#2A2048→#5A2A18),
     Medley=渐变(#C5BBA8,#ADBFBC,#BCAFCA)
   - 点击仍保持现有路由跳转不变

待做(阅读页升级 Prompt C — 较重):
2. 阅读页首字母drop cap:
   - 第一段第一字float:left,font-size:3.5em,Fraunces字体,
     颜色#2C4F4D,line-height:0.8,margin-right:4px
3. 左侧目录导航:
   - 从Notion Heading 1/2/3提取目录
   - 左侧fixed悬浮,滚动时高亮当前章节
   - 当前章节后显示薄荷叶图标(🍃或SVG)
4. Notion彩色词渲染:
   - API返回的rich_text中含color字段,映射到对应CSS颜色
   - 支持Notion全部高亮色

### D. AI聊天助手 — 未开始(P1)
计划:
- 第一版只做GitHub查询(function calling)
- 接口预留RAG扩展位(不写死)
- Next.js API route统一入口(chat/route.ts)
- tool列表数组声明,第一版注册getGithubProjects
- 预留answerAboutMe/getProjectDetail(暂不实现)
需要:Anthropic API key(console.anthropic.com注册,按token计费)
开始条件:About改版完成+书架视觉升级稳定后

### E1. 打赏预告态 — 已完成
- 导航栏"支持一下☕"按钮(薄荷蓝背景)
- 点击弹出Coming Soon弹窗
- 每篇文章底部按分类显示不同文案
- GA4 support_click事件已接入
- NEXT_PUBLIC_SUPPORT_ENABLED=false(当前关闭)

### E2. 正式支付 — 等EAD落地后开启
- Ko-fi:https://ko-fi.com/ziranlab(账户已建)
- Stripe:账户已建,待网站上线后完成验证
- PayPal:暂停,待EAD和经营主体明确
- 国内:微信/支付宝赞赏码图片(待准备)
- 开启方式:把NEXT_PUBLIC_SUPPORT_ENABLED改为true重新部署

### F. GA4数据分析 — 已完成
- Measurement ID:G-6V0C4PC8K0
- GoogleAnalytics.tsx已接入layout.tsx
- support_click自定义事件已实现
- 待验证:Vercel部署后GA4 Realtime是否收到数据

### G. Studio — 导航入口已加,页面未建
内容规划(待做 Prompt D):
- 剧本/游戏文案/短篇小说/艺术实验/天马行空想法
- 页面结构参考Shelf,但内容不走Notion,直接手写
- 暂时做一个占位页面(/studio),显示"Coming Soon"
  风格与全站一致,加一句说明文字

### H. 多语言 — 未来功能
- 导航栏地球图标+语言选择器
- 中英文可切换(About的中英切换是局部预览版)
- 内容翻译由Notion AI手动生成后存为独立字段
- 开始条件:C/E/F全部稳定后

### I. 评论区 — 未来功能
- 需要Supabase或Firebase
- 敏感词过滤+防垃圾机制
- 开始条件:主体功能稳定后

### J. 商店 — P2暂不做
- 未来跳转Gumroad/淘宝,不自建购物车

---

## 已完成的动效组件
- FadeIn.tsx:滚动淡入(about/work/shelf均已接入)
- WordReveal.tsx:逐词揭示(about标题)
- ScrollLit.tsx:滚动点亮(shelf阅读页"慢读。")
- PoetryWave.tsx:诗句字幕+粒子海浪(about底部)
- LuoshenBanner.tsx:洛神赋图视差背景(shelf底部)
- StatsCounter.tsx:数字统计条(about底部)

## 照片文件规范
路径:public/photos/
文件列表(用户自己放):
- profile.jpg        个人照(约3:4竖向)
- ff1.jpg ff2.jpg    FF实习
- yw1.jpg            阅文实习
- purdue1.jpg purdue2.jpg  普渡
- travel1.jpg travel2.jpg travel3.jpg  旅行
- bake1.jpg bake2.jpg  烘焙
- halloween1.jpg halloween2.jpg halloween3.jpg halloween4.jpg  万圣节
- logo-datamine.png logo-yuewen.png logo-ff.png  企业logo(可选)

## 待做清单(按优先级)
1. [Prompt A] About页改版(等照片准备好)
2. [Prompt B] 书架书脊3D样式+hover抽书动效
3. [Prompt B] SiteHeader加Studio导航项
4. [Prompt B] 阅读页drop cap首字母
5. [Prompt C] 阅读页左侧目录导航+当前章节高亮
6. [Prompt C] Notion彩色词渲染
7. [Prompt D] /studio占位页面
8. D模块AI助手(需要Anthropic API key)
9. 单页滚动架构改造(About→Work→Shelf长页面,锚点导航)
10. 多语言切换(i18n)
11. 评论区(Supabase)
12. E2正式支付开放(等EAD)
13. About改版中的水波纹中英切换动效(Framer Motion涟漪)

## Git规范
提交信息用中文语义化描述
不自动执行commit/push