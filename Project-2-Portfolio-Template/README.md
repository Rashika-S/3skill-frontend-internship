# 🦋 Elegant Portfolio Template

A clean, feminine, modern portfolio website template built with **HTML, CSS and Tailwind CSS (CDN only)** — no React, no build tools, no installation needed. White background, soft blue gradients, glassmorphism cards and subtle butterfly motifs throughout.

Just open `index.html` in a browser to preview it, or deploy the folder as-is to any static host (GitHub Pages, Netlify, Vercel, etc).

---

## 📁 Folder Structure

```
portfolio/
├── index.html              # Home page
├── about.html               # About page (bio, education, experience, leadership)
├── skills.html               # Skills page (technical / non-technical / other)
├── certificates.html         # Certificates page (carousel + filterable grid + modal)
├── projects.html             # Projects page (reusable project cards)
├── contact.html              # Contact page (form UI + social links)
├── css/
│   └── style.css             # All custom styles (theme, glassmorphism, butterflies, animations)
├── js/
│   └── main.js                # Shared script: mobile nav, scroll-reveal, back-to-top
├── assets/
│   ├── images/                # Your profile photo & project screenshots go here
│   ├── certificates/           # Your certificate images go here
│   └── resume/                 # Your resume PDF goes here (resume.pdf)
└── README.md
```

---

## ✨ How to Customize This Template

This template is built so you can reuse it for **any** name, role, or set of work simply by editing text and swapping files — no code restructuring required.

### 1. Replace text placeholders
Search each HTML file for these and replace with your own information:
- `Your Name`, `Y.N` (logo initials)
- `Your Role / Tagline Placeholder`
- Biography, education, and experience text in `about.html`
- Skill names/icons in `skills.html` (cards are easy to copy/remove)
- Certificate titles, issuers and dates in `certificates.html`
- Project titles, descriptions and tags in `projects.html`
- Email, LinkedIn, GitHub, location in `contact.html` and the footer of every page

### 2. Replace images
- Put your profile photo in `assets/images/` and swap the `.img-placeholder` `<div>` in the hero/about sections for an `<img src="assets/images/your-photo.jpg" ...>` tag.
- Put project screenshots in `assets/images/` and do the same inside each `.project-img-wrap` on `projects.html`.
- Put certificate images in `assets/certificates/` and swap the `.img-placeholder` divs on `certificates.html` (both in the carousel and the grid) for `<img>` tags.

> Every placeholder is a `<div class="img-placeholder">` with descriptive text inside it, so they're easy to find and replace with `<img>` tags.

### 3. Replace your resume
Drop your PDF into `assets/resume/` and name it `resume.pdf` (or update the `href` on the **Download Resume** button in `about.html` to match your filename).

### 4. Replace social & contact links
Update every `href="#"` next to social icons (LinkedIn, GitHub, Twitter/X, Instagram, etc.) across all pages, and update the `mailto:` link and contact details on `contact.html`.

### 5. Connect the contact form (optional)
The contact form in `contact.html` is a front-end UI only. To make it functional, connect it to a backend or a no-code service such as Formspree, Getform, or EmailJS by updating the `<form>` tag's `action`/`method` or the JavaScript at the bottom of the page.

---

## 🎨 Design System

All design tokens live at the top of `css/style.css` as CSS variables, so you can re-theme the whole site by editing a handful of values:

```css
--color-azure: #5b8dd9;   /* primary blue accent */
--color-navy:  #1f3a5f;   /* headings / text */
--color-mist:  #f3f8fd;   /* page background tint */
```

Fonts: **Cormorant Garamond** (display/headings) + **Poppins** (body) via Google Fonts — change the `<link>` and `tailwind.config` `fontFamily` block in each page's `<head>` to swap typefaces.

---

## 🦋 Butterfly Motif

Decorative butterfly SVGs (`.butterfly` class) gently float and flap their wings via CSS keyframe animations (`flutter-float`, `wing-flap`). They're purely decorative `<svg>` elements positioned absolutely — add, remove, or reposition them freely without affecting layout. A shared gradient (`#butterflyGradient`) is defined once near the top of each page so every butterfly and the logo icon share the same blue gradient fill.

---

## ✅ Features Included

- Fully responsive (mobile, tablet, desktop)
- Glassmorphism cards (`.glass-card`) with hover lift effects
- Scroll-reveal fade-in animations (`.reveal`, powered by `js/main.js`)
- Sticky, blurred glass navbar with active-page highlighting and a mobile hamburger menu
- Animated butterfly SVG decorations
- Auto-scrolling certificate carousel (pauses on hover) + category filter chips + click-to-preview modal
- Reusable project card structure — duplicate one `<article>` block to add a new project
- Contact form UI with focus states and a placeholder success message
- Back-to-top button
- Respects `prefers-reduced-motion` for accessibility

---

## 🔧 Tech Notes

- Tailwind is loaded via the CDN script (`https://cdn.tailwindcss.com`) — no `npm install`, no build step.
- Custom theme colors/fonts are registered through `tailwind.config` inline in each page's `<head>`.
- All bespoke styling that Tailwind utilities can't express (gradients, glass blur, keyframe animations, timeline, carousel, modal) lives in `css/style.css`, fully commented by section.

Enjoy building on top of it! 🦋
