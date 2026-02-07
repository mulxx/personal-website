# 🎓 个人主页模板 (English Version Available Below 👇)

<div align="center">
  <h3>✨ 一个优雅、易用、无需编程基础的个人主页模板 ✨</h3>
  <p>基于 Vue 3 + Vite 构建，支持 GitHub Pages 一键部署</p>
</div>

  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Vue 3](https://img.shields.io/badge/vue-3.x-green.svg)](https://vuejs.org/)
  [![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blueviolet.svg)](https://pages.github.com/)

---

## 📖 介绍

这是一个专门为**不熟悉编程和代码知识的用户**设计的个人主页模板。它的核心设计理念是**"配置即生成"**。

你**不需要**懂复杂的编程知识（HTML/CSS/JS），只需要像填表格一样修改一个配置文件，就能拥有一个现代化、响应式、支持深色 / 浅色模式的个人主页。

### ✨ 特性
- 🛠️ **零代码基础友好**：所有内容都在一个文件中修改。
- 📱 **多端适配**：在电脑、手机和平板上都能完美展示。
- 🎨 **现代化设计**：清爽的 UI，支持**深色/浅色模式**一键切换。
- 🚀 **自动部署**：内置 GitHub Actions，修改完代码自动发布上线。
- 🔍 **SEO 优化**：对搜索引擎友好，让别人更容易搜到你。

---

## 🎓 新手指南：如何拥有自己的主页？

如果你不懂代码，请完全按照以下步骤操作，10分钟内即可上线！

### 第一步：Fork 项目 (复制)
1. 点击页面右上角的 **Fork** 按钮。
2. 在 `Repository name` 中输入 `你的用户名.github.io` (例如：`zhangsan.github.io`)。
   > ⚠️ **注意**：仓库名必须严格符合 `用户名.github.io` 的格式，这样才能直接通过该网址访问。
3. 点击 `Create fork`。

### 第二步：修改内容 (填空)
我们为你准备了一个专门的配置文件，你甚至不需要下载代码到本地，直接在网页上修改即可。

1. 在你 Fork 后的仓库中，进入文件夹：`src/content/`。
2. 点击文件 `siteContent.js`。
3. 点击右上角的✏️ (Edit) 图标进入编辑模式。
4. **开始填空**：
   - 文件中有详细的中文注释。
   - 只需要修改单引号 `'内容'` 中的文字。
   - **不要**删除任何标点符号（逗号、冒号、括号）。

   *示例：*
   ```javascript
   // 修改前
   name: 'Your Name',

   // 修改后
   name: '张三',
   ```

5. 修改完成后，点击右上角的 **Commit changes** 绿色按钮保存。

### 第三步：替换图片与简历 (上传)
你需要将模板自带的图片替换成你自己的。

1. 进入 `public/images/` 文件夹。
2. 点击 `Add file` -> `Upload files`。
3. 上传你的头像，并命名为 `avatar.jpg`。
4. 如果有简历，上传到 `public/files/` 并命名为 `cv.pdf`。
5. **可选**：替换网站图标。进入根目录，上传你的 SVG 图标并命名为 `favicon.svg` (覆盖原文件)。
6. **重要**：修改网站标题。打开 `index.html` 文件，将 `<title>Your Name</title>` 替换为 `<title>你的名字</title>`。

### 第四步：自动部署 (上线)
1. 点击仓库顶部的 **Settings** (设置)。
2. 在左侧菜单找到 **Pages** (页面)。
3. 在 **Build and deployment** 下的 **Source** 选择 `GitHub Actions`。
4. 稍等片刻（约 1-2 分钟），点击仓库上方的 **Actions** 标签，查看部署进度。
5. 当显示绿色的 ✔️ 时，访问 `https://你的用户名.github.io`，你的网站就上线了！🎉

---

## 🔨 详细配置手册

如果不确定每个字段该填什么，请查阅下表。

<details>
<summary><b>1️⃣ 基本信息 (Personal Info)</b></summary>

| 字段 | 说明 | 示例 |
|------|------|------|
| `name` | 您的姓名 | "张三" |
| `title` | 职位/身份 | "博士研究生" |
| `institution` | 学校/机构 | "清华大学" |
| `email` | 联系邮箱 | "zhangsan@example.com" |
</details>

<details>
<summary><b>2️⃣ 社交链接 (Social Links)</b></summary>

*   支持 GitHub, LinkedIn, Twitter, Google Scholar 等。
*   如果某个平台没有账号，将 `url` 留空 `""` 即可，图标会自动隐藏。
</details>

<details>
<summary><b>3️⃣ 常见问题 (FAQ)</b></summary>

*   **Q: 网站修改后没变化？**
    *   A: 确保你点击了 "Commit changes" 保存更改，并等待 Actions 跑完（约1分钟）。
*   **Q: 页面变空白了？**
    *   A: 可能是配置文件格式错了。检查是否误删了逗号 `,` 或引号 `''`。每个文字都必须在引号内。
*   **Q: 如何加粗文字？**
    *   A: 使用 `**` 包裹，例如 `"我是 **张三**"`。
</details>

---

## 🛠️ 高级配置指南

> 这里列出一些常见问题的解决方案。

<details>
<summary><b>❓ 我想修改网站的主题色</b></summary>

进入 `src/style.scss` 文件，修改 `:root` 中的颜色变量：
```css
:root {
  --color-primary: #6366f1; /* 把这个改成你喜欢的颜色色值 */
}
```
</details>

<details>
<summary><b>❓ 我不需要"获奖经历"这一栏怎么办？</b></summary>

在 `siteContent.js` 中，将对应的数组清空即可，页面会自动隐藏该板块：
```javascript
awards: {
  // ...
  items: [] // 留空即可隐藏
}
```
</details>

---

## 💻 开发者文档

如果你熟悉前端开发，以下信息能帮助你进行二次开发。

### 技术栈
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: SCSS (Scoped)
- **Deployment**: GitHub Actions

### 目录结构

```bash
├── .github/workflows/   # CI/CD 自动部署脚本
├── public/              # 静态资源 (不经过打包，直接复制)
│   ├── images/          # 图片存放处
│   └── files/           # 简历 PDF 等
├── src/
│   ├── components/      # Vue 组件 (按功能模块划分)
│   ├── content/         # ⭐ 数据层 (siteContent.js)
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
└── vite.config.js       # Vite 配置
```

### 本地开发

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **构建生产版本**
   ```bash
   npm run build
   ```

### 部署配置建议
- 如果部署到 `username.github.io`，`vite.config.js` 中的 `base` 应设为 `'/'`。
- 如果部署到 `username.github.io/repo`，`base` 应设为 `'/repo/'`。

---

## 🤝 贡献与支持

希望能通过这个项目帮助更多同学轻松建立自己的个人主页。

- 如果你有好的想法，欢迎提交 **Issue** 或 **Pull Request**。
- 如果这个项目对你有帮助，请给一个 ⭐️ **Star** 支持一下！

## 📄 许可证

本项目遵循 MIT 许可证。你可以免费用于个人或商业用途，修改和分发。

---

---

---

# 🌍 English Version

<div align="center">
  <h3>✨ An Elegant, User-Friendly Personal Portfolio Template ✨</h3>
  <p>Built with Vue 3 + Vite, supports one-click deployment to GitHub Pages</p>
</div>

---

## 📖 Introduction

This is a personal portfolio template designed specifically for **users unfamiliar with programming and code**. Its core design philosophy is **"configure to generate"**.

You **don't need** to understand complex programming knowledge (HTML/CSS/JS). Just modify a configuration file like filling out a form, and you'll have a modern, responsive personal homepage that supports dark/light mode switching.

### ✨ Features
- 🛠️ **Zero-code friendly**: All content is modified in one file.
- 📱 **Multi-device adaptation**: Perfect display on desktop, mobile, and tablet.
- 🎨 **Modern design**: Clean UI with **dark/light mode** toggle.
- 🚀 **Auto-deployment**: Built-in GitHub Actions, automatically publishes after code changes.
- 🔍 **SEO optimized**: Search engine friendly, making it easier for others to find you.

---

## 🎓 Beginner's Guide: How to Get Your Own Homepage?

If you don't know coding, please follow these steps exactly, and you'll be online in 10 minutes!

### Step 1: Fork the Project (Copy)
1. Click the **Fork** button in the top right corner.
2. In `Repository name`, enter `yourusername.github.io` (e.g., `zhangsan.github.io`).
   > ⚠️ **Note**: The repository name must strictly follow the `username.github.io` format to be accessible directly via that URL.
3. Click `Create fork`.

### Step 2: Modify Content (Fill in the Blanks)
We've prepared a dedicated configuration file for you. You can even modify it directly on the web without downloading the code locally.

1. In your forked repository, navigate to the folder: `src/content/`.
2. Click on the file `siteContent.js`.
3. Click the ✏️ (Edit) icon in the top right to enter edit mode.
4. **Start filling in the blanks**:
   - The file has detailed Chinese comments.
   - You only need to modify the text in single quotes `'content'`.
   - **Do not** delete any punctuation marks (commas, colons, parentheses).

   *Example:*
   ```javascript
   // Before modification
   name: 'Your Name',

   // After modification
   name: 'Zhang San',
   ```

5. After modification, click the green **Commit changes** button in the top right to save.

### Step 3: Replace Images and Resume (Upload)
You need to replace the template's default images with your own.

1. Navigate to the `public/images/` folder.
2. Click `Add file` -> `Upload files`.
3. Upload your avatar and name it `avatar.jpg`.
4. If you have a resume, upload it to `public/files/` and name it `cv.pdf`.
5. **Optional**: Replace the website icon. Go to the root directory, upload your SVG icon and name it `favicon.svg`.
6. **Important**: Update the website title. Open the `index.html` file and replace `<title>Your Name</title>` with `<title>Your Name</title>`.

### Step 4: Auto-deployment (Go Live)
1. Click **Settings** at the top of the repository.
2. Find **Pages** in the left menu.
3. Under **Build and deployment**, select `GitHub Actions` for **Source**.
4. Wait a moment (about 1-2 minutes), then click the **Actions** tab above to check deployment progress.
5. When you see a green ✔️, visit `https://yourusername.github.io`, and your website is live! 🎉

---

## 🔨 Reference Manual

If you are unsure what to fill in for each field, please check this reference.

<details>
<summary><b>1️⃣ Personal Info</b></summary>

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Your Name | "John Doe" |
| `title` | Job Title | "PhD Candidate" |
| `institution` | University/Company | "Stanford University" |
| `email` | Contact Email | "john@example.com" |
</details>

<details>
<summary><b>2️⃣ Social Links</b></summary>

*   Supports GitHub, LinkedIn, Twitter, Google Scholar, etc.
*   If you don't use a specific platform, leave the `url` empty `""`, and the icon will hide automatically.
</details>

<details>
<summary><b>3️⃣ FAQ</b></summary>

*   **Q: Website didn't update after changes?**
    *   A: Ensure you clicked "Commit changes" and verify that the GitHub Action finished (takes ~1 min).
*   **Q: Page turned blank?**
    *   A: Likely a syntax error in `siteContent.js`. Check for missing commas `,` or quotes `''`.
*   **Q: How to bold text?**
    *   A: Wrap text with `**`, e.g., `"I am **John**"`.
</details>

---

## 🛠️ Advanced Configuration Guide

> Here are solutions to some common problems.

<details>
<summary><b>❓ I want to change the website's theme color</b></summary>

Enter the `src/style.scss` file and modify the color variables in `:root`:

```css
:root {
  --color-primary: #6366f1; /* Change this to your preferred color value */
}
```
</details>

<details>
<summary><b>❓ What if I don't need the "Awards" section?</b></summary>

In `siteContent.js`, simply empty the corresponding array, and the page will automatically hide that section:

```javascript
awards: {
  // ...
  items: [] // Leave empty to hide
}
```
</details>

---

## 💻 Developer Documentation

If you're familiar with frontend development, the following information will help you with secondary development.

### Tech Stack
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: SCSS (Scoped)
- **Deployment**: GitHub Actions

### Directory Structure

```bash
├── .github/workflows/   # CI/CD auto-deployment scripts
├── public/              # Static assets (copied directly without bundling)
│   ├── images/          # Image storage location
│   └── files/           # Resume PDFs, etc.
├── src/
│   ├── components/      # Vue components (organized by functional modules)
│   ├── content/         # ⭐ Data layer (siteContent.js)
│   ├── App.vue          # Root component
│   └── main.js          # Entry file
└── vite.config.js       # Vite configuration
```

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build production version**
   ```bash
   npm run build
   ```

### Deployment Configuration Suggestions
- If deploying to `username.github.io`, set `base` in `vite.config.js` to `'/'`.
- If deploying to `username.github.io/repo`, set `base` to `'/repo/'`.

---

## 🤝 Contribution & Support

We hope this project helps more students easily create their own personal homepages.

- If you have good ideas, feel free to submit an **Issue** or **Pull Request**.
- If this project helps you, please give it a ⭐️ **Star**!

## 📄 License

This project follows the MIT License. You can use it freely for personal or commercial purposes, modify and distribute it.
