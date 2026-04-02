# TripLite 迁移操作手册
# 从 Genspark → GitHub + Cloudflare Pages + 自有域名

> 难度：⭐⭐（小白可完成）
> 预计时间：2-3小时（含域名备案等待除外）
> 目标：代码永久备份 + 自有域名 + 自动发布

---

## 总览

```
四个步骤：

STEP 1  安装工具（Git + VS Code）         约20分钟
STEP 2  GitHub 建仓库 + 上传代码           约30分钟
STEP 3  Cloudflare Pages 部署             约20分钟
STEP 4  买域名 + 备案 + 绑定              约30分钟+等待备案
```

---

## STEP 1：安装工具

### 1.1 安装 Git

Git 是版本控制工具，用来保存代码历史、上传到 GitHub。

**下载地址：** https://git-scm.com/download/win

操作：
```
1. 打开网址，点 "Click here to download" 下载
2. 双击安装包，一路点 Next（默认选项即可）
3. 安装完成后，桌面右键菜单会出现 "Git Bash Here"
```

**验证安装成功：**
```
桌面右键 → "Git Bash Here"
输入：git --version
看到版本号（如 git version 2.43.0）= 成功
```

---

### 1.2 安装 VS Code

VS Code 是代码编辑器，以后在本地改代码用。

**下载地址：** https://code.visualstudio.com

操作：
```
1. 点 "Download for Windows" 下载
2. 双击安装，勾选"添加到右键菜单"选项
3. 安装完成
```

---

### 1.3 配置 Git 用户信息

打开 Git Bash，输入以下两行（替换成你自己的信息）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

例如：
```bash
git config --global user.name "Zhang San"
git config --global user.email "zhangsan@gmail.com"
```

---

## STEP 2：GitHub 建仓库 + 上传代码

### 2.1 注册 GitHub

**网址：** https://github.com

```
1. 点右上角 "Sign up"
2. 填邮箱 → 设密码 → 用户名
3. 验证邮箱
4. 完成注册
```

> 💡 用户名会出现在仓库地址里，建议用英文，如 zhangsan

---

### 2.2 从 Genspark 下载代码

```
1. 打开 Genspark 项目
2. 点顶部 "文件浏览器" 标签
3. 找到下载按钮（全部文件打包下载）
4. 保存 zip 文件到电脑桌面
5. 解压到一个文件夹，如：桌面/triplite
```

解压后文件夹结构应该是：
```
triplite/
├── index.html
├── trip.html
├── map.html
├── checklist.html
├── weather.html
├── stay.html
├── emergency.html
├── manifest.json
├── sw.js
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── home.js
│   ├── weather-service.js
│   └── app.js
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

### 2.3 在 GitHub 创建仓库

```
1. 登录 GitHub
2. 点右上角 "+" → "New repository"
3. 填写：
   Repository name: triplite
   Description: 澳门芭提雅曼谷旅行助手
   选择 Public（公开，Cloudflare免费版需要）
   不要勾选任何初始化选项
4. 点 "Create repository"
```

页面会显示一串命令，先不用管，继续下一步。

---

### 2.4 上传代码到 GitHub

在桌面的 triplite 文件夹里，**右键 → Git Bash Here**

依次输入以下命令（每行回车一次）：

```bash
# 第1步：初始化 git
git init

# 第2步：把所有文件加入
git add .

# 第3步：保存版本，加说明
git commit -m "v1.0 初始版本：静态旅行助手，含天气/地图/应急/PWA"

# 第4步：标记为 v1.0
git tag v1.0

# 第5步：连接到 GitHub（把下面的"你的用户名"替换掉）
git remote add origin https://github.com/你的用户名/triplite.git

# 第6步：上传
git branch -M main
git push -u origin main

# 第7步：把标签也上传
git push origin v1.0
```

> 第一次 push 会弹出登录 GitHub 的窗口，登录即可。

**验证成功：** 打开 GitHub 仓库页面，能看到所有文件 = 成功 ✅

---

## STEP 3：Cloudflare Pages 部署

### 3.1 注册 Cloudflare

**网址：** https://cloudflare.com

```
1. 点 "Sign Up" 注册
2. 填邮箱 + 密码
3. 验证邮箱
```

---

### 3.2 连接 GitHub 仓库

```
1. 登录 Cloudflare
2. 左侧菜单找 "Workers & Pages"
3. 点 "Pages" → "Connect to Git"
4. 选 "GitHub" → 授权 Cloudflare 访问你的 GitHub
5. 选择 "triplite" 仓库
6. 点 "Begin setup"
```

---

### 3.3 配置构建设置

```
Project name:        triplite（随意）
Production branch:   main
Build command:       （留空，静态网站不需要）
Build output dir:    （留空 或填 /）
```

点 **"Save and Deploy"**

等待约1分钟，部署完成。

---

### 3.4 得到临时域名

部署成功后，Cloudflare 会给你一个临时域名：
```
triplite.pages.dev
```

这个域名**已经可以用了**，速度很快，全球CDN。

> ⚠️ 但微信小程序不支持 .pages.dev 域名，需要绑定自有域名。

---

## STEP 4：买域名 + 备案 + 绑定

### 4.1 买域名

**推荐在阿里云购买（国内备案方便）**

网址：https://wanwang.aliyun.com

```
1. 搜索你想要的域名，如：triplite.cn 或 trip-lite.com
2. 加入购物车
3. 购买（.cn 首年约¥29，.com 约¥68）
4. 实名认证（必须，上传身份证）
```

> 💡 建议选 .com 或 .cn，便于备案。

---

### 4.2 域名备案（微信小程序必须）

> ⚠️ 备案只有中国大陆服务器才需要。
> Cloudflare 服务器在海外，**严格来说不需要备案**。
> 但微信小程序 webview 要求域名必须备案。

**备案流程（约7-20个工作日）：**

```
1. 打开阿里云备案系统：https://beian.aliyun.com
2. 填写网站信息（网站名称、负责人信息）
3. 上传身份证照片
4. 人脸识别验证
5. 提交工信部审核
6. 等待短信通知（7-20个工作日）
7. 收到备案号（如：沪ICP备XXXXXXXX号）
```

> 备案期间 triplite.pages.dev 可以正常用，不影响。

---

### 4.3 在 Cloudflare 绑定域名

备案完成后：

```
1. 打开 Cloudflare → Workers & Pages → triplite
2. 点 "Custom domains"（自定义域名）
3. 点 "Set up a custom domain"
4. 输入你的域名，如：triplite.com
5. Cloudflare 会提示你修改 DNS
```

---

### 4.4 修改 DNS（在阿里云操作）

```
1. 登录阿里云 → 域名管理 → 解析设置
2. 添加 CNAME 记录：
   主机记录：@
   记录类型：CNAME
   记录值：triplite.pages.dev
3. 保存
```

等待10分钟，你的域名就生效了。

---

## 以后改代码的流程

### 在 Genspark 改代码后如何发布

```
1. Genspark 文件浏览器 → 下载修改的文件
2. 替换本地 triplite 文件夹里对应的文件
3. 打开 Git Bash（在 triplite 文件夹右键）
4. 输入：

git add .
git commit -m "更新说明，如：修复天气页bug"
git push

5. Cloudflare 自动检测到更新，1分钟内自动发布
```

---

### 将来在 VS Code 改代码（更方便）

```
1. VS Code 打开 triplite 文件夹
2. 直接编辑文件
3. VS Code 内置终端输入：

git add .
git commit -m "更新说明"
git push

4. 自动发布
```

---

## 版本管理操作

### 打标签（标记重要版本）

```bash
git tag v1.1 -m "增加用户当前位置功能"
git push origin v1.1
```

### 查看所有版本

```bash
git tag
```

### 回退到某个版本（只看，不改）

```bash
git checkout v1.0
```

### 回到最新版本

```bash
git checkout main
```

### 从某个旧版本单独发布

```
1. GitHub 仓库页面
2. 点 "tags" → 选 v1.0
3. 下载那个版本的代码
4. 手动上传到任意平台发布
```

---

## 微信小程序嵌入（域名备案后）

只需要在小程序里加这一段代码：

```xml
<!-- 小程序页面 xxx.wxml -->
<web-view src="https://你的域名.com/index.html"></web-view>
```

就这一行，整个 TripLite 就嵌进小程序了。

**前提条件：**
```
✅ 域名已备案
✅ 域名已在微信公众平台添加为"业务域名"
✅ 域名支持 HTTPS（Cloudflare 自动提供）
```

---

## 常见问题

**Q：git push 报错 "rejected"**
```bash
git pull origin main --rebase
git push
```

**Q：想撤销最后一次 commit（还没push）**
```bash
git reset HEAD~1
```

**Q：文件改坏了想恢复**
```bash
git checkout -- 文件名.html
```

**Q：Cloudflare 没有自动更新**
```
检查是否 push 成功（GitHub 上能看到最新文件）
Cloudflare 页面手动点 "Retry deployment"
```

---

## 完成后的架构

```
你写代码
  │
  ├── Genspark（AI辅助写代码）
  │     ↓ 下载文件
  └── 本地 VS Code（以后直接在这里改）
        ↓ git push
      GitHub 仓库（triplite）  ← 代码永久备份
        ↓ 自动触发
      Cloudflare Pages          ← 全球CDN，免费
        ↓ 绑定
      你的域名.com               ← 完全自主可控
        ↓ 嵌入
      微信小程序 web-view         ← 可选
```

---

## 检查清单

完成后逐项确认：

- [ ] Git 安装完成，`git --version` 有输出
- [ ] VS Code 安装完成
- [ ] GitHub 账号注册完成
- [ ] 代码上传到 GitHub，能在网页看到文件
- [ ] v1.0 标签已创建并上传
- [ ] Cloudflare Pages 部署成功，.pages.dev 能访问
- [ ] 域名已购买（可选）
- [ ] 备案已提交（微信小程序需要）
- [ ] 域名绑定 Cloudflare 完成（可选）

---

> 📌 遇到问题随时截图发给 AI 帮你解决
> 🎯 最重要的是 STEP 2：代码上传 GitHub = 永久安全
