# ARDM Academy — Web Application & Learning Portal

ARDM Academy is a comprehensive educational platform featuring:
- **Left-Side Dynamic Animated Menu Bar** with quick navigation to all 10 core modules:
  - 🏠 Home
  - ℹ️ About
  - 📦 What We Provide
  - 📝 Mock Test (PROSTUTI Series CBT Engine)
  - 📚 PYQs (10-Year Previous Papers)
  - 🎥 Free Classes & Video Lectures
  - 🎓 Courses Catalog
  - 🤖 AI & Webinars
  - 🏆 Merit Results & Scorecard Checker
  - 📞 Contact & Support
- **Student Portal & Verification**: Registration status checking, admit card downloads with verifiable QR codes.
- **Admin Gateway**: Secure administrative panel with token validation and role-based permissions.
- **SEO Ready**: Schema.org JSON-LD structured data, OpenGraph cards, and dynamic `sitemap.xml`.

---

## 🚀 How to Deploy on GitHub Pages (Step-by-Step)

If your project was previously showing a blank screen or failing to run on GitHub, this happens because browsers cannot run raw TypeScript source files (`/src/main.tsx`) directly from the `main` branch. GitHub Pages must serve the compiled production files (`dist/`).

We have included an automated GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys the project automatically.

### Option 1: GitHub Actions (Recommended — Fastest)
1. Go to your repository on **GitHub**.
2. Click on **Settings** (top right tab).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Source**, change the dropdown from *"Deploy from a branch"* to **"GitHub Actions"**.
5. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```
6. Click the **Actions** tab on GitHub to watch the build. Once complete, your live site URL will be displayed!

---

### Option 2: Deploy from `gh-pages` Branch
Our workflow also automatically compiles the project and pushes the production `dist` files to a `gh-pages` branch.
1. Push your code to GitHub.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Source**, keep **"Deploy from a branch"**.
4. Under **Branch**, select **`gh-pages`** and folder **`/ (root)`**, then click **Save**.
5. Your website will be live in 1-2 minutes!

---

## 💻 Running Locally

To run the application locally on your computer:

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build Commands

- `npm run dev`: Runs the full-stack dev server with live Vite middleware.
- `npm run build`: Compiles both the client-side SPA (into `dist/`) and the Node.js backend (into `server.js`).
- `npm run build:client`: Compiles only the static frontend into `dist/`.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Verifies TypeScript types with zero errors.

---

## 🌐 Deploying to Vercel, Netlify, or Render

### Vercel / Netlify (Static Hosting)
- **Build Command**: `npm run build:client` (or `vite build`)
- **Output Directory**: `dist`
- The included `vercel.json` and `public/_redirects` files automatically configure Single Page Application rewrites.

### Render / Railway / Heroku (Full-Stack Node.js)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
