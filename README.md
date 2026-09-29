# Allu Arjun — Beyond the Frame

A cinematic Allu Arjun fan site with an animated 3D AA signature, scroll-driven film panels, and silent native video loops.

## Run locally

Requires Node.js 22.13 or newer and pnpm 11.25.

```sh
git clone https://github.com/gireeshkumarreddy/alluarjun.git
cd alluarjun
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by the development server (normally http://localhost:5173).

```sh
pnpm typecheck
pnpm build
pnpm start
```

The production build targets a Cloudflare-compatible Worker. This repository contains the complete source, 3D geometry, styles, all 13 project images and all 9 local MP4 clips, including additional Pushpa footage. No Git LFS setup or separate asset download is needed. Dependencies and generated build caches are rebuilt from the source and lockfile.

## Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub-connected Cloudflare deployment. No API keys or database are required by the website itself.

After signing in to your Cloudflare account:

```sh
pnpm exec wrangler login
pnpm deploy
```

The deploy command builds the project and deploys `dist/server/wrangler.json` under the Worker name `allu-arjun-cinematic`.

## Editing guide

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Film lineup, copy, scene layout and scrolling |
| `app/globals.css` | Colors, sizing and responsive layouts |
| `app/sculpture.tsx` | 3D AA rendering and fallback |
| `app/aa-shape.json` | AA geometry; generator in `scripts/build-aa-geometry.mjs` |
| `app/motion.ts` | Shared animation state |
| `app/film-loop.tsx` | Muted autoplay and scene-aware playback |
| `app/layout.tsx` | Page metadata and viewport settings |
| `public/images/`, `public/videos/` | Locally hosted media |

Original UI components, build helpers and vendor license notices are included. `ASSET_SOURCES.json` records media provenance; `MOTION_REFERENCE.md` documents the animation reference.

## Automatic playback

RAAKA, Pushpa 2, DJ, Sarrainodu, Ala Vaikunthapurramuloo, and Race Gurram each have their own silent loop. The DJ and Sarrainodu focus panels and the final Allu Arjun portrait also start automatically. No YouTube embed, play button, or resume switch is needed. Footage pauses while its scene is offscreen or the browser tab is hidden, then resumes automatically on return. Playback uses muted, inline H.264 MP4 for broad browser compatibility. Device-level autoplay restrictions can still override browser playback.

Film configuration is in `app/page.tsx`; playback behavior is in `app/film-loop.tsx`; 3D rendering is in `app/sculpture.tsx`.

## Responsive layout and video quality

Videos use full-frame `object-fit: contain` sizing, so the layout never crops the actor's head. Phone film panels keep a 16:9 frame; focus sections stack the video and text; the portrait places its title below the video. Landscape phones use two columns. The layout accounts for display safe areas and stable viewport height.

Phones and touch devices use native touch scrolling. Desktop wheel scrolling uses Lenis. Video elements remain mounted between scenes, preload before arrival, and pause when offscreen. Software 3D rendering holds a still frame behind idle video panels while keeping the geometry responsive to scrolling. WebGL rendering retains its animated reflections.

The DJ, Sarrainodu, Ala Vaikunthapurramuloo and Race Gurram replacement loops use 1280×720, 25 fps excerpts from the official Geetha Arts birthday filmography montage. RAAKA and the portrait retain official Sun Pictures HD footage; Pushpa retains its HD promotional trailer loop. No low-resolution clip has been upscaled and presented as native HD.

`ASSET_SOURCES.json` records provenance. This is an independent fan tribute; media and trademarks remain owned by their respective rights holders.
