# Deployment

The current application uses React, Vinext/Vite and Three.js. It builds to a Cloudflare-compatible Worker and a static asset directory. Deploy the generated Worker configuration together with its assets.

## Cloudflare Workers connected to GitHub

1. In your Cloudflare account, create a Worker using the GitHub repository `gireeshkumarreddy/alluarjun`.
2. Select the `main` branch and the repository root as the working directory.
3. Use Node.js 22.13 or newer and pnpm 11.25.0. The repository's `packageManager` field pins pnpm; `.nvmrc` selects Node.js 22.
4. Use these commands:

| Setting | Value |
| --- | --- |
| Dependency installation | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Deploy command | `pnpm exec wrangler deploy --config dist/server/wrangler.json --name allu-arjun-cinematic` |

If the build environment does not provide pnpm, install it with `npm install --global pnpm@11.25.0` before the dependency step. No application environment variables, database, or external media service are needed.

## Deploy from a terminal

```sh
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm typecheck
pnpm exec wrangler login
pnpm deploy
```

`pnpm deploy` runs the build followed by Wrangler's deployment command. Wrangler prints the published URL. Change the `--name` value in `package.json` if you want a different Worker name.

For CI, configure Cloudflare authentication through the hosting provider's secret settings. Do not commit account tokens or `.env` files.

## Production output

- `dist/server/wrangler.json`: generated deployment configuration.
- `dist/server/index.js`: generated Worker entry point.
- `dist/client/`: generated frontend files and all public assets, including the videos.

Build output is regenerated and excluded from Git. Do not upload only `public/` or only `dist/client/`; this application also uses the Worker entry point.

## Other hosting providers

The repository currently targets Cloudflare Workers. It is not configured as a standard Next.js deployment for Vercel or as a GitHub Pages static site. Adapting to another provider requires changing the build/deployment target; the existing Cloudflare configuration is ready to use as described above.

## Checking before deployment

```sh
pnpm typecheck
pnpm build
pnpm start
```

Open the local production URL printed by Wrangler. Check the mobile menu, scroll through the film scenes, and confirm muted autoplay. All images, geometry and videos are committed locally in this repository.
