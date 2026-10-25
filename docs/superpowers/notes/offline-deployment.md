# Offline Deployment Notes

## Recommended: serve the build, don't double-click it

After `npm run build`, the primary documented way to run the offline build is:

```
npx serve dist
```

(or any other static file server pointed at `dist/`). This works identically across
Chrome, Edge, and Firefox and should be treated as the canonical way to verify or
hand off the offline build.

## Why not just double-click `dist/index.html`?

Vite emits `<script type="module" crossorigin src="...">` in `dist/index.html`. ES
modules loaded from a `file://` origin are blocked by Chromium's CORS policy
(`Cross-Origin Request Blocked` on a `file://` fetch of the module script), so
double-clicking `dist/index.html` and opening it directly in **Chrome or Edge**
renders a blank page with no visible error on screen (only in devtools console).

**Firefox does not have this restriction** and will run the same `dist/index.html`
correctly via direct `file://` double-click.

This is a browser platform limitation of loading ES modules over `file://`, not a
bug in this app's code, and it is not fixable from the app side without changing
the build to avoid `type="module"` output entirely (not worth doing here).

## Takeaway

- Primary/recommended: `npx serve dist` — works everywhere, no caveats.
- Fallback: direct `file://` double-click of `dist/index.html` — works in Firefox,
  may render blank in Chrome/Edge.
