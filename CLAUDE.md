# 项目:ZiranWeb(个人网站)

## 技术栈
- 框架:Next.js (App Router) + TypeScript + Tailwind CSS
- 部署:Vercel(GitHub push自动部署)
- 域名:ziranweb.com(Cloudflare Registrar购买)

## 整体优先级
A(关于我)+ B(作品展示)已完成,不要再修改这两个模块的文件。当前进行:C(博客书架)骨架。

## 设计系统

### 配色
- 主色:苔藓绿(moss green)
- 辅色:黑白为主
- 入口页强调色仅用苔藓绿一种,不叠加其他彩色

### 字体
- 标题:Fraunces
- 正文:Newsreader

### 视觉结构(两层,已实现,不要改动)
- **入口分屏**(`components/SplitLanding.tsx`):左"Ziran"(黑底)→/about,右"Lab"(白底)→/work;hover该侧变苔藓绿,自定义鼠标(混合模式圆点+"ENTER"文字);底部苔藓绿marquee;点击后该侧展开吞没另一侧再跳转
- **内容页**:editorial/杂志感单栏大字报布局,大字号Fraunces标题,大量留白,苔藓绿+黑白

## 模块清单

### A. 关于我 — 已完成,不要修改
文件:`app/about/page.tsx`。邮箱已填真实地址,GitHub/LinkedIn链接为占位符待回填(回填由用户自己做,不是Claude Code任务)。

### B. 作品展示 — 已完成,不要修改
文件:`app/work/page.tsx`、`types/project.ts`、`data/projects.json`、`components/ProjectCard.tsx`。projects.json里GitHub链接为`your-username`占位符待回填(用户自己做)。进行中项目卡片贴黄黑「施工中」封条(黑底黄字中央条带样式)。

### C. 博客(书架) — 当前开发,骨架阶段

**总标题:Everything Bagel**(不再使用中文名"一撮孜然"/"孜然大杂烩")

三个分类英文名:
- Everyday(原"普通")
- Inedible(原"不可食用")
- Medley(原"什锦")

**结构层级(重要,不是"分类=书"的嵌套结构):**
1. 书架页(`/shelf`)= 3本书封面,分别是Everyday / Inedible / Medley
2. 点击某本书封面 → 进入该分类的**目录页**,不是另一层书架。目录页列出该分类下所有条目,格式:`01 · 标题`(序号由代码按日期排序自动生成,不存在数据里,不用维护序号字段)
3. 点目录里的某一条 → 进入该条目的阅读页,此时才显示更新日期和正文内容

**视觉:**
- 书架页3本封面:CSS Grid排列
- 点击封面 → 放大+淡入过渡进入目录页(骨架阶段用便宜方案,不做3D翻页)
- 每本封面需自定义封面上传/更换功能,先存本地
- 三个分类的封面视觉规格:
  - Everyday:米白色基调
  - Inedible:苔藓绿+棕黄+深紫混合"魔药"配色,叠加细闪流动颗粒效果(指甲油glitter质感)
  - Medley:低饱和度彩虹渐变(不要高饱和,要调得高级),叠加较粗颗粒闪光效果,比Inedible的闪片更粗

**内容数据源:Notion API(已完成Notion端配置,当前任务是接入代码)**
- 三个分类分别对应Notion里的3个内联数据库(Everyday/Inedible/Medley),每个数据库字段:`Name`(标题)、`Date`(日期)、`Public`(勾选框,决定是否在网站上展示)
- 每一行的正文写在该行notion页面的正文区,用Notion API的blocks接口读取渲染
- 用Notion官方JS SDK(`@notionhq/client`),token存在`.env.local`里的`NOTION_API_KEY`,不要硬编码
- 三个数据库的ID分别存为环境变量:`NOTION_DB_EVERYDAY`、`NOTION_DB_INEDIBLE`、`NOTION_DB_MEDLEY`
- 拉取逻辑封装成独立的数据获取函数(比如`lib/notion.ts`),前端组件不直接调Notion SDK,方便以后维护

**目录序号规则:**
- 不在Notion里存序号字段
- 前端拿到该分类所有条目后,按`Date`升序或降序排序(建议按时间从早到晚,序号从01开始),序号是渲染时计算出来的,不是存储的数据

**权限:**
- 只展示`Public`勾选为true的行,勾选为false的行不出现在目录页里,也不生成可访问路由

**多语言翻译:**
- 骨架阶段完全不实现,用户会在Notion里按需手动用Notion AI翻译功能生成多语言版本
- ⚠️提醒:等C内容和框架都稳定后,记得回来专门讨论翻译功能怎么在网站上实现语言切换

**读者评论区:**
- 骨架阶段不做,列入C模块之后的独立功能,涉及新数据库(如Supabase)和审核逻辑(敏感词过滤),不在本次范围内

**骨架阶段要做的事:**
- `lib/notion.ts`:封装读取3个数据库的函数,返回条目列表(标题/日期/public状态)和单条目正文
- `/shelf` 路由:书架页,3本封面
- `/shelf/[category]` 路由:目录页,列出该分类下`public=true`的条目,显示`序号 · 标题`
- `/shelf/[category]/[id]` 路由:阅读页,显示标题、日期、正文
- 封面上传UI组件框架搭好(先不接数据库,占位即可)

### D. AI聊天助手 — 优先级:P1,未开始
第一版只做GitHub查询(function calling),接口设计预留RAG扩展位。

### E. 打赏 — 已规划待实现
国际:Buy Me a Coffee / Ko-fi;国内:微信/支付宝赞赏码图片。导航栏常驻。

### E. 商店 — P2暂不做
以后跳转Gumroad/淘宝。

## 代码规范
- 组件放 `/components`,页面路由用App Router
- 数据结构用TypeScript interface定义在 `/types`,模块间解耦
- 提交信息用中文说明改了什么
- **严格限定改动范围,不允许修改未明确要求的模块文件**

## 待办(未决策项)
- 域名DNS配置(等Vercel部署好后回填)
- A/B模块的GitHub、LinkedIn真实链接待回填(用户自己做)
- 翻译功能怎么在网站上实现(等C稳定后讨论)
- 读者评论区功能(等C稳定后讨论)