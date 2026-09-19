# VIX 94' Cloudflare Upload Bundle

Upload this folder/package to Cloudflare.

## Files included

- `public/index.html`
- `public/style.css`
- `src/worker.js`
- `wrangler.json`

## Add these two existing files separately

Put these files directly inside `public/` with EXACTLY these names:

- `vix94logobg.png`
- `DISCOBG.jpg`

The original uploaded source already references these exact filenames. Do not rename them.

## Music

The website keeps the existing R2 music library URL from the supplied source:

`https://pub-feb120eabdf4471980ef8f1331d8baab.r2.dev/afterhoursmusicmix/`

You do not need to upload the songs into this bundle.

## Online counter

The online counter uses Cloudflare Durable Objects + WebSockets. No Firebase setup is required.

## Upload / deploy

This is a Worker project, so deploy with Wrangler:

`npx wrangler login`

then:

`npx wrangler deploy`

If using the Cloudflare dashboard, create/import the Worker project from this bundle and keep the Durable Object binding/migration from `wrangler.json`.

## UI

- Volume is inside the radio and appears only after ENTER.
- PREVIOUS / PLAY / NEXT are equal-sized.
- Song filenames are never shown.
- Mobile viewport is optimized.


## Favicon and social sharing

Add the logo file to `public/` with the exact filename:

`vix94logobg.png`

The site uses it automatically for:
- Browser favicon
- Apple/iOS home-screen icon
- Open Graph social preview image
- Twitter/X social preview image

For social previews, the image should ideally be a square PNG with good contrast and enough padding around the logo.


Mobile browser optimization has been added for iOS Safari, Android Chrome, small screens, landscape mode, safe-area insets, touch controls, and dynamic viewport sizing.
