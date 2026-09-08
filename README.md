# VAANAM | Coastal Culinary Experience

An immersive editorial web experience celebrating the coastal culinary heritage, slow-cooked feasts, and artisanal spice craft of **Chattogram, Bangladesh**.

---

## ✦ Overview

**VAANAM** blends editorial typography, 60 FPS hardware-accelerated video cinematography, and scroll-driven interactive anatomy to take guests on an unhurried journey through coastal Bengal gastronomy.

### Key Highlights
- **01 — The Feast**: Full Mezbani banquet feast spread with slow-cooked meats, Chinigura polao, and whole Shorshe Ilish.
- **02 — Every Table Tells a Story**: Communal hospitality, century-old Mezbani tradition, and coastal spice trade lore.
- **03 — Anatomy of a Singara**: 5-layer exploded macro analysis of the iconic nigella seed pastry shell and spiced filling.
- **04 — The Spice Language**: Interactive botanical constellation featuring 7 ancestral spices of Bengal lore (Radhuni, Kalo Jeere, Shukno Morich, Deshi Haldi, Tej Pata, Gol Morich, Elach).
- **05 — The Culinary Alchemy**: 4-stage fire cookery progression (The Temper, The Koshano, The Reduction, The Dum).
- **06 — Kasundi & The Ferment**: Artisanal stone-ground mustard and slow-simmered tamarind relishes.
- **07 — The Table Reassembled**: Kansha bell-metal platters, hand-spun Bengal jute, and warm coastal teakwood.
- **08 — Reserve Table**: Private dining reservation modal with custom date/guest selector and concierge inquiry codes.

---

## ✦ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Animation & Motion**: [GSAP](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Styling**: Vanilla CSS & [Tailwind CSS 4](https://tailwindcss.com/)
- **Typography**: Fraunces (Editorial Display Serif) & Inter (Precision Sans)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✦ Performance Architecture

- **Single-Active Video Engine**: Utilizes `IntersectionObserver` to decode and play only the video currently in the viewport, completely preventing GPU hardware decoder bottlenecks.
- **Zero-Re-render Scroll Engine**: Replaced continuous React `setState` during scroll with direct GSAP DOM transforms, ensuring buttery-smooth 60 FPS compositor execution.
- **Preload Management**: Hero video is prioritized while non-critical videos load metadata on-demand.

---

## ✦ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/smsakib6452-dot/vaanam-chattogram.git
cd vaanam-chattogram
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## ✦ License & Heritage
Rooted in the coastal culinary traditions of Chattogram, Bangladesh. Designed for modern editorial web standards.
