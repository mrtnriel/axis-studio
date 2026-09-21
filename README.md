# AXIS STUDIO — Luxury Custom Mechanical Keyboard E-Commerce

An e-commerce experience and interactive 3D customizer for bespoke mechanical keyboards. Built with React 19, Three.js, React Three Fiber, Tailwind CSS, and Web Audio synthesis.

## Features

- **Interactive 3D Keyboard Customizer:**
  - Real-time WebGL 3D model updating case colors, double-shot PBT keycaps, plate materials, switch stems, PCB, and brass weight finishes.
  - Exploded architecture view isolating individual assembly layers (Keycaps, Switches, Plate, Hot-Swap PCB with Poron Gaskets, Top Case, Bottom Case, and Weight Bar).
  - 360-degree rotation, zoom, camera framing presets (Perspective, Top-Down, Profile, Bezel), and one-click camera recenter.
  - Interactive keys: Clicking any 3D keycap or pressing physical keys triggers realistic spring animation and synthesized switch acoustic audio.
- **Acoustic Audio Engine:**
  - Web Audio API synthesizer modeling mechanical switch bottom-out timbre (Morandi Linear, Apex Panda Tactile, Velvet Silent, and Jade Clickbar) combined with plate resonance profiles (FR4, Solid Brass, Flex Polycarbonate, Aluminum).
- **Curated Product Catalog:**
  - Complete specifications, layout filtering (65%, 75%, TKL, Pad), real-time search, sorting, and product specification detail modals.
- **Dynamic Configuration & Cart:**
  - Persistent real-time price calculation with component breakdown.
  - Slide-over atelier cart with free shipping progress indicator, promo code support, and seamless checkout modal simulation.
- **Minimalist Luxury Aesthetic:**
  - Precision typography, generous whitespace, subtle borders, and smooth micro-interactions.

## Tech Stack

- **Framework:** React 19 + Vite
- **3D Engine:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Audio:** Web Audio API (zero external audio asset latency)
- **Effects:** Canvas Confetti

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Vercel Deployment

This project is pre-configured for one-click deployment on [Vercel](https://vercel.com/):

1. Import your GitHub repository (`https://github.com/mrtnriel/axis-studio.git`) on Vercel.
2. Vercel will automatically detect **Vite** as the framework preset.
3. Build command: `npm run build`
4. Output directory: `dist`
5. The included [`vercel.json`](./vercel.json) handles client-side SPA routing rewrites.
