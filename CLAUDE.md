# 项目:ZiranWeb(个人网站)

## 技术栈
- 框架:Next.js (App Router) + TypeScript + Tailwind CSS
- 部署:Vercel(GitHub push自动部署)
- 域名:ziranweb.com(Cloudflare Registrar购买)

## 整体优先级
先搭骨架(A关于我 + B作品展示),优先能上线访问。
C(博客书架)的路由和数据结构要在骨架阶段就预留好位置,即使内容是空的,不要等C完全做完才上线。

## 设计系统

### 配色
- 主色:苔藓绿(moss green)
- 辅色:黑白为主
- 入口页强调色仅用苔藓绿一种,不叠加其他彩色

### 字体
- 标题:Fraunces
- 正文:Newsreader

### 视觉结构(两层)

**第一层:入口分屏(Landing)**
- 左右分屏,左边"Ziran"、右边"Lab"两个入口
- 风格参考:fredfarid.com / ogilvy.com / wearewer.com(agency风格)
- 自定义鼠标交互(hover时鼠标形态变化)
- marquee跑马灯效果
- 点击任一侧 → 过渡动画 → 进入对应内容页

**第二层:内容页(进入后)**
- 风格转为editorial/杂志感单栏大字报布局
- 大字号衬线标题(Fraunces),占据视觉主导,而非分屏结构
- 单栏内容流,大量留白,内容密度低
- 辅助色只用苔藓绿一个强调色 + 黑白
- 这一层适用于:A关于我、B作品展示、C博客书架 的具体内容页面

### 过渡动画要求
从入口分屏点击进入内容页时,需要有明确的过渡动效(不是生硬跳转),具体动效细节由Claude Code实现时决定,原则是:分屏结构"打开"变成单栏,而不是白屏闪烁。

## 模块清单

### A. 关于我 — 优先级:P0
静态页面:个人介绍、邮箱、GitHub、LinkedIn链接。
邮箱：zhaozihanislucky@gmail.com
GitHub:https://github.com/ZihanZhao227
LinkedIn链接:https://www.linkedin.com/in/hannah-zhao-711769232/
### B. 作品展示 — 优先级:P0
- 卡片列表,分"已完工"和"进行中"
- 进行中的项目卡片右上角贴黄黑斜纹"施工中"封条视觉
- 点卡片跳转到对应GitHub仓库
- 数据来源:先用静态JSON手写(projects.json),不接GitHub API,以后再升级成自动拉取commit信息

### C. 博客(书架) — 优先级:P1,骨架阶段先占位
博客名字暂定:**「一撮孜然」**(备选:「字燃」谐音向 / 「孜然铺子」意象向 — 三个方向都可用,先用「一撮孜然」占位,随时可换)

视觉呈现:
- 布局:CSS Grid,3列网格(移动端响应式可降为2列)
- 每本书 = 一篇内容,封面图不强制统一比例,允许略有差异
- 点击封面 → 像翻书一样展开进入内容详情页
- 需要**自定义封面上传/更换功能**,用户自己传图,先存本地,不接数据库
- 分类:普通 / 不可食用 / 什锦(用于书脊颜色或封面角标区分,不做tab切换)

骨架阶段要做的事(即使内容是空的):
- 路由占位:`/shelf` 页面存在,能跑通"书架网格 → 点击 → 详情页"这个流程,用1-2本占位假数据
- 封面上传功能的UI组件框架搭好
- 权限字段预留:每篇内容有 `public: boolean` 字段,即使暂时都是true

### D. AI聊天助手 — 优先级:P1,第一版只做GitHub查询
**关键要求:第一版功能简单,但整体接口要按"以后要加RAG"的样子设计,不要写死。**

架构原则:
- 用一个统一的 `chat/route.ts`(Next.js API route)做入口,内部按"意图路由"分发,不要把GitHub查询逻辑跟对话逻辑焊死在一起
- Function calling的tool列表用数组声明,第一版只注册一个tool:`getGithubProjects`
- 预留但暂不实现:`answerAboutMe`(以后接RAG简历检索用)、`getProjectDetail`
- 之后加RAG时,只是往tool数组里加一个新tool + 一个检索函数,不动前端UI和已有的GitHub tool逻辑

第一版实现:
- 调GitHub API `GET /users/{username}/repos` 拿项目列表和最近commit
- 调Claude API(function calling),prompt里注册上面的tool

### E. 打赏 — 优先级:P0(简单,顺手做)
用户在国外,但希望国内外支持者都能打赏,不走交易平台(纯赠予)。
- 国际:接 Buy Me a Coffee 或 Ko-fi,一个按钮跳转
- 国内:放微信/支付宝赞赏码图片(静态图片即可,不用接支付SDK)
- 两个入口并列放在页面上,不用做地区判断跳转
- **位置:导航栏常驻**,不是页面内嵌按钮

### E. 商店 — 优先级:P2,暂不做
以后如果卖服务/PDF,直接跳转Gumroad或淘宝,不自建购物车。

## 代码规范
- 组件放 `/components`,页面路由用App Router
- 每个模块的数据结构尽量用TypeScript interface定义在 `/types` 里,方便以后C、D模块升级时改动不影响其他模块
- 提交信息用中文说明改了什么,不用英文套话

## 待办(未决策项)
- 域名DNS配置(等Vercel部署好后回填)