# Cantonese Trip Prep

A personal drill/reference tool for learning Cantonese before a Hong Kong trip — built from real
class notes, with a sentence builder for the grammar patterns and spaced-repetition drilling.

**Stack:** Vite + React + TypeScript, CSS Modules + Sass, Firebase (Firestore + anonymous auth) for
cross-device sync, packaged as an installable PWA. No standing Node/Python server.

## Getting started

```bash
npm install
cp .env.example .env   # fill in your Firebase project config (optional — see below)
npm run dev
```

Open the printed local URL. On your phone, open the same URL (once deployed — see below) and use
"Add to Home Screen" to install it as a full-screen app.

### Running without Firebase

The app works with zero setup — if `.env` is missing or empty, progress (stars + spaced-repetition
state) saves to `localStorage` on that device only. Fill in `.env` later if you want it synced
across your phone and laptop.

## Setting up Firebase (optional, for cross-device sync)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. In **Build → Authentication → Sign-in method**, enable **Anonymous**. The app is single-user, so
   anonymous auth just gives you a stable UID to scope your data — no signup flow needed.
3. In **Build → Firestore Database**, click **Create database** (production mode is fine — the
   security rules below lock it down regardless of mode).
4. Deploy the security rules in `firebase/firestore.rules`, either by pasting them into the
   **Firestore → Rules** tab in the console and publishing, or via the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules
   ```
   These rules restrict every document to `users/{uid}/reviews/{phraseId}`, readable and writable
   only by the matching signed-in user — so your data stays private even though Firestore's default
   client SDK talks to it directly from the browser.
5. In **Project settings → General → Your apps**, add a Web app and copy the config values into
   `.env` (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc. — see `.env.example`).

Note: the phrase content itself (vocab, grammar, patterns) lives in `src/data/*.ts`, not Firestore —
it's static content you edit in code as your lessons progress, not something that needs a database
collection.

## Editing content

- `src/data/intro.ts` — your self-introduction paragraph, line by line
- `src/data/categories.ts` — reference categories (greetings, food, family, tone traps, etc.)
- `src/data/grammar.ts` — the grammar & tenses reference (sentence structures, tense table, markers,
  time words)
- `src/data/patterns.ts` — sentence-builder templates; use `___` as the blank, it can repeat within
  a template (e.g. the A-not-A question pattern)

Every phrase needs a unique `id` — the `withIds()` helper in `categories.ts` generates these for you
from the array index, so just add entries to the arrays.

## Spaced repetition

Drilling uses SM-2 (the algorithm behind Anki) — see `src/lib/srs.ts`. Grading a card "Good" pushes
its next-due date out further each time you get it right in a row; "Still learning" resets the
interval. The Drill tab's "Due for review" mode only surfaces cards that are actually due, so you're
not re-drilling things you already know cold.

## Building & deploying

```bash
npm run build      # outputs to dist/
npm run preview    # sanity-check the production build locally
```

Deploy `dist/` to Vercel, Netlify, or GitHub Pages — any static host works, since there's no
backend to run. Connect your repo for push-to-deploy, or drag-and-drop `dist/` onto Netlify for a
one-off deploy.

### A note on bundle size

The Firebase SDK (auth + Firestore) is noticeably heavier than a minimal REST client — expect
~600KB before gzip, ~165KB after, versus a much smaller bundle if this were using a lighter backend.
For a personal tool loaded occasionally before a trip, this doesn't matter in practice (it's still
a sub-second load on any real connection), but if it ever bothers you, `vite.config.ts` can be given
a `build.rollupOptions.output.manualChunks` split to move Firebase into its own cached chunk.

### PWA icons

`vite.config.ts` references `/icon-192.png` and `/icon-512.png` in `public/` — add your own icon
files there (any square PNG works; you can generate the two sizes from one source image with any
favicon generator) before deploying, or the install prompt will use a default icon.

### Sass warnings

You may see `legacy-js-api` deprecation warnings during build — those come from how Vite's Sass
plugin invokes the `sass` package internally, not from anything in this project's code. All of the
project's own stylesheets already use the modern `@use` module syntax rather than the deprecated
`@import`, so there's nothing to fix here; it'll clear up on its own when Vite updates its internal
Sass invocation.

## Project structure

```
src/
  components/     one folder per component, colocated .module.scss
  data/           seed content (intro, categories, grammar, patterns)
  hooks/          useProgress — Firestore/localStorage + SM-2 glue
  lib/            firebase client, SM-2 algorithm, Jyutping tone-coloring
  styles/         Sass variables + mixins (design tokens, shared patterns)
  types/          shared TypeScript interfaces
firebase/
  firestore.rules   security rules (per-user access to review documents)
firebase.json       points the Firebase CLI at the rules file
```
