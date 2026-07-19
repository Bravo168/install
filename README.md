# App Template

Generic starting points for a PWA install prompt. Two variants, same
underlying install logic. Plain HTML/CSS/JS, no build step, no
dependencies — copy this folder to start a new project.

- **`index.html`** — compact bottom banner (icon + title + "Download"
  button + close, with a "don't show this again today" dismiss)
- **`install.html`** — full-page install screen (header bar, big app icon
  with badge, headline, benefit checklist, gold CTA button, footer line)

## Files

- `index.html` / `style.css` — banner page markup + styling (edit the CSS
  variables at the top of `style.css` to reskin the gradient/CTA colors)
- `install.html` / `install.css` — full-page install screen markup +
  styling (edit the CSS variables at the top of `install.css`)
- `app.js` — banner show/hide logic, PWA install prompt wiring, service
  worker registration (used by `index.html`)
- `install.js` — install prompt wiring + service worker registration
  (used by `install.html`)
- `manifest.json` — PWA manifest (placeholder name/colors), shared by both
  pages
- `service-worker.js` — offline caching (same simple stale-while-revalidate
  pattern as `Kumpulan Websites/` and `Calculator/`), shared by both pages
- `icons/` — placeholder generated icons (192/512, standard + maskable)

## Reskinning for a real app

1. Replace `icons/icon-192.png`, `icon-512.png`, `icon-maskable-192.png`,
   `icon-maskable-512.png` with real artwork (maskable icons need extra
   padding — keep the logo inside the center ~80% safe zone).
2. Edit `manifest.json`: `name`, `short_name`, `description`,
   `background_color`, `theme_color`.
3. Edit the banner text in `index.html` (`.promo-title`) and the dismiss
   copy (`.promo-dismiss`), or the headline/benefit copy in `install.html`.
4. Adjust `--promo-grad-*` / `--promo-cta-*` variables in `style.css`
   (banner) or the `--install-*` variables in `install.css` (full-page) to
   match your brand colors.

## How the banner works

- Shown by default on every page load.
- **×** (close) hides it for the current page view only — reappears on
  next load/reload.
- **"Jangan tampilkan ini lagi hari ini"** hides it *and* remembers the
  dismissal in `localStorage` keyed to today's date, so it stays hidden
  until the date rolls over.
- **Download** button is hidden until the browser fires
  `beforeinstallprompt` (Chromium-based browsers only, and only when the
  manifest/service-worker/icon installability criteria are met). Clicking
  it triggers the native install prompt.
- Browsers that never fire `beforeinstallprompt` (notably iOS Safari) will
  fall through to the `alert()` fallback in `app.js` — replace that with
  real instructions, or point the button at an APK/store link instead if
  you're not doing a true manifest-based install.

## How the full-page install screen works

`install.html` has one CTA (`#install-cta`, "Install Sekarang"). Same
`beforeinstallprompt` wiring as the banner — hidden state isn't needed here
since it's a dedicated page, but the button falls through to the same
`alert()` placeholder on browsers that never fire the event (swap for real
instructions or a store/APK link). On `appinstalled` the button label
changes to "Terinstall".

## Local preview

```
python -m http.server 8790 --directory .
```

Then open `http://localhost:8790`. (Opening `index.html` directly via
`file://` will not register the service worker or fire
`beforeinstallprompt`.)
