# IEDC RIT — Neo-Brutalist Website

A production-grade, highly interactive, multi-page website built for the **Innovation & Entrepreneurship Development Cell (IEDC)** at the **Rajagiri Institute of Technology (RIT)**.

🌐 **Live Demo:** [https://iedc-rit.pages.dev/](https://iedc-rit.pages.dev/)

---

## 🎨 Design Philosophy: Neo-Brutalism

This website is styled using a modern **Neo-Brutalist** aesthetic, featuring:
*   **High-Contrast Color Palettes:** A primary palette of IEDC Orange (`#E8431A`), Teal (`#3BBFBF`), Yellow (`#FFD60A`), Pink (`#FF2D78`), and Warm Paper BG (`#F5F0E8`).
*   **Chunky Borders & Shadows:** Thick borders (`3-5px solid #0D0D0D`) and zero blur offset shadows (`6px 6px 0px #0D0D0D`).
*   **No Rounded Corners:** Strictly `0px` border-radius across all components.
*   **Distinct Micro-interactions:** Tactile animations such as "Lift" on cards (transform up + larger shadow) and "Press" on buttons/CTAs (transform down + shadow removal).
*   **Brand Custom Typography:** Display headings in Google Fonts' `Bebas Neue` and body copy in `Space Grotesk`.

---

## ⚡ Tech Stack

*   **Core:** [Vue 3](https://vuejs.org/) (Composition API with JSX)
*   **Routing:** [Vue Router 4](https://router.vuejs.org/) (Hash-based history for seamless static client-side navigation)
*   **Styling:** Pure CSS (Vanilla CSS & CSS Modules for scoped component styles - zero CSS frameworks or utility libraries)
*   **Build Tool:** [Vite 5](https://vite.dev/)
*   **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) (using Wrangler CLI)

---

## 🚀 Key Features & Structure

1.  **Main Site Portal:**
    *   **Interactive Hero Section:** Dynamic typography, floating custom inline SVG illustrations, and a scroll-triggered stats counters.
    *   **About Page:** Dynamic vision/mission breakdowns and a chronological vertical timeline showcasing IEDC's growth.
    *   **Events Directory:** Tag-filtered active and legacy events grid.
    *   **Core Team Directory:** Category-based profiles for the Nodal Officer, Executive Committee, and Core Team.
    *   **Connect Portal:** A high-fidelity contact page equipped with interactive FAQ accordions, localized map components, and contact tools.
2.  **WiTe Sub-portal (`/wite`):**
    *   Dedicated section celebrating **Women in Technology & Entrepreneurship (WiTe)**.
    *   Isolated theme override featuring custom color schemes (Hot Pink & Purple), separate bootcamps grid, success story carousels, and independent forms.

---

## 🔒 Security & Optimization Features

*   **Form Protection:**
    *   **Honeypot Fields:** Hidden fields to catch and block spambots silently.
    *   **Rate Limiting:** LocalStorage-based submission throttling (maximum of 3 submissions per 10 minutes) preventing API spamming.
    *   **Sanitization:** Built-in string sanitization logic stripping dangerous HTML characters (`<`, `>`, `&`, etc.) before form submissions.
*   **Performance Optimizations:**
    *   **Lazy Loading:** Below-the-fold image lazy loading via HTML attributes.
    *   **Unsplash Formatting:** Dynamic Unsplash image formatting (`?w=600&q=80`) preventing over-sized assets.
    *   **Route Splitting:** Code splitting for page views.
    *   **Vite Chunks:** Bundled dependency chunking separating `vendor` libraries (`vue`, `vue-router`) to maximize browser caching.

---

## 🛠️ Local Development

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repo-url>
   cd iedc-rit-neo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build the production application bundle:
   ```bash
   npm run build
   ```

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🌐 Cloudflare Deployment

The application is deployed directly to Cloudflare Pages.
To deploy new changes manually:
```bash
npm run build
npx wrangler pages deploy dist --project-name=iedc-rit
```
