<div align="center">

# 🚀 VanshOS — AI Engineer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A production-grade, highly interactive portfolio designed to showcase my expertise in AI engineering, machine learning, and full-stack development. Built with performance, accessibility, and modern UX principles in mind.

[**View Live Deployment**](https://vansh-kumar-portfolio.vercel.app) • [**Report Bug**](#) • [**Request Feature**](#)

</div>

---

## ⚡ Overview

I built this portfolio not just as a static resume, but as an interactive web application that acts as a testament to my engineering capabilities. Instead of telling you what I can build, this repository *shows* you. 

The architecture is built on **Next.js (App Router)** and **TypeScript**, leveraging **Framer Motion** for physics-based fluid animations and **Tailwind CSS** for a highly customized, glassmorphism-inspired design system. 

## ✨ Key Features & Engineering Highlights

### 🤖 1. Integrated AI Assistant (`Gemini 2.5 Flash`)
I integrated a live conversational agent directly into the portfolio. Rather than using pre-programmed responses, I hooked up the **Google Gemini SDK** via a secure Next.js Edge API Route. 
- **Context-Aware:** The model is injected with a hidden system prompt containing my entire resume, GitHub stats, and project metrics, allowing it to answer recruiter questions dynamically.
- **Security:** Built with strict safety thresholds and server-side environment variables to prevent prompt-injection or unauthorized API abuse.

### 💻 2. Terminal OS Easter Egg
For fellow engineers, I built a hidden **Terminal Mode**. Pressing the backtick (`` ` ``) key overlays a custom-built, fully functional bash-like interface.
- Includes a custom command parser supporting `whoami`, `ls projects`, `cat resume`, and `open <project-id>`.
- Built a custom `setInterval` typewriter hook to simulate realistic TTY printing speeds.

### 🎵 3. Live Spotify & GitHub Integrations
The site fetches live data directly from external APIs.
- **Spotify API:** Uses OAuth2 PKCE flow to securely fetch and display my "Currently Playing" track in real-time.
- **GitHub API:** Fetches live repository stats, commit counts, and dynamically renders contribution maps.

### 🎯 4. Recruiter Mode (Optimized UX)
Recognizing that hiring managers and recruiters have limited time, I built a global React Context (`RecruiterModeContext`) that allows users to toggle the site into "Recruiter Mode."
- **Dynamic DOM Restructuring:** Using Framer Motion's `layout` properties, the DOM instantly reorders itself without reloading — snapping the "Why Hire Me" section to the top and stripping away technical jargon in favor of pure business-impact metrics.

> **🕵️‍♂️ A Secret Challenge:** *There is a highly secure, hidden command buried deep within the site's command palette. It bypasses standard UI and requires encrypted authentication to dynamically shape-shift the entire portfolio's ecosystem. Can you find it?*

---

## 🏗️ Architecture & Technical Decisions

To ensure a FAANG-tier codebase, I adhered to strict engineering standards:

1. **Component Modularity:** UI is broken down into small, highly reusable components (e.g., `SpotlightCard`, `SectionHeading`).
2. **Server vs. Client Components (RSC):** Carefully partitioned Next.js components to keep the bundle size extremely small. Only interactive components are marked with `"use client"`.
3. **State Management:** Avoided heavy libraries like Redux in favor of native React Context API combined with `localStorage` for persistent user preferences.
4. **Performance:** Images are optimized using `next/image` with proper `sizes` attributes for responsive loading. Typography utilizes `next/font` for zero layout shift (CLS).

## 🚀 Getting Started Locally

To run this project on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/vansh-kumar-007/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your API keys:
```env
# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Spotify
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

# Admin System (Classified)
ADMIN_PASSWORD=your_secure_password
```

### 4. Run the development server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

---

<div align="center">
<p>Built with passion by <a href="https://github.com/vansh-kumar-007">Vansh Kumar</a>.</p>
</div>
