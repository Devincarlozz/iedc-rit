# ⚡ IEDC RIT — Neo-Brutalist Portal

A production-grade, highly responsive, multi-page portal built for the **Innovation & Entrepreneurship Development Cell (IEDC)** at the **Rajagiri Institute of Technology (RIT)**. 

Designed with a bold **Neo-Brutalist** aesthetic and built using **Vue 3 + JSX**, this application is optimized for speed, accessibility, and high performance.

---

## 🌐 Live Demo & Deploy Status

| Deployment | URL | Status |
| :--- | :--- | :--- |
| **Production Site** | [https://iedc-rit.pages.dev/](https://iedc-rit.pages.dev/) | ![Cloudflare Pages](https://img.shields.io/badge/Live-Deploy_Success-success?style=flat&logo=cloudflare&logoColor=white&color=3BBFBF) |
| **Source Repository** | [GitHub Repo](https://github.com/Devincarlozz/iedc-rit) | ![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=white) |

---

## 🛠️ Tech Stack & Badges

![Vue 3](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62B)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3 Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)

*   **Frontend Core:** Vue 3 (Composition API using JSX syntax for absolute rendering control).
*   **Routing Architecture:** Vue Router 4 (Hash-based history for seamless static client-side page transitions).
*   **Design Framework:** Pure Vanilla CSS + scoped **CSS Modules** (zero frameworks like Tailwind/Bootstrap for optimized styling control).
*   **Build Engine:** Vite 5.
*   **Host Provider:** Cloudflare Pages (via Wrangler automation).

---

## 🎨 Design System: Neo-Brutalism

The platform leverages a raw, highly interactive design language focusing on high readability and strong aesthetic presence:

*   **Harmonious HSL Palette:** 
    *   `#E8431A` (IEDC Orange)
    *   `#3BBFBF` (IEDC Teal)
    *   `#FFD60A` (Brutal Yellow)
    *   `#FF2D78` (WiTe Hot Pink)
    *   `#F5F0E8` (Warm Paper Background)
    *   `#0D0D0D` (Pitch Black)
*   **Tactile Dimensions:** High-contrast thick borders (`3px` to `5px` solid black) combined with hard, offset box-shadows (`6px 6px 0px #0D0D0D`) with `0px` border-radius.
*   **Micro-interactions:** Staggered viewport scroll reveal triggers, interactive count-up elements for stats, infinite marquee banner loops, and active element state translation offsets (lifting/pressing interaction).

---

## 🚀 Key Features

### 1. Main Portal
*   **Dynamic Hero Portal:** Features staggered typography entrance actions, floating inline SVG logo models, and animated statistical counters.
*   **About Timeline:** Vertically aligned history timeline chronicling key institution achievements.
*   **Events Directory:** Tag-filtered layouts featuring active and archive cards.
*   **Core Team:** Interactive multi-tier grid layouts separating nodal, executive, and volunteer committees.
*   **Connect Portal:** Complete contact hub with built-in FAQ interactive accordions, maps, and secure submission fields.

### 2. WiTe Portal (`/wite`)
*   Dedicated secondary portal designed specifically to support **Women in Technology & Entrepreneurship**.
*   Features separate style variables (Pink and Purple themes), success story testimonials, program showcases, and custom forms.

---

## 🔒 Security & Optimization Features

*   **Anti-Spam Form Security:**
    *   **Honeypot Mechanism:** Hidden inputs designed to catch and silently discard bots.
    *   **Throttling:** LocalStorage submission tracker limits requests to a maximum of 3 submissions per 10 minutes.
    *   **Sanitization:** Built-in pattern cleaners strip special characters (`<`, `>`, `&`, etc.) before backend dispatch.
*   **Performance Assets:**
    *   Below-the-fold image lazy loading.
    *   Dynamic image sizing parameters via Unsplash API to prevent giant image requests.
    *   Vite chunking strategies split code libraries (`vue`, `vue-router`) to optimize browser download caches.

---

## 🛠️ Local Development

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/Devincarlozz/iedc-rit.git
cd iedc-rit
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Production Build & Preview
```bash
# Build the application
npm run build

# Preview the built assets locally
npm run preview
```

### 4. Cloudflare Deployment
Deploy the compiled directory to your Cloudflare Pages account:
```bash
npm run deploy
```
