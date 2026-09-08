# 識少少 Sik1 Siu2 Siu2

Sik1 Siu2 Siu2 (識少少 *"know a little"*) is a personal drill/reference tool for learning Cantonese
before a solo trip to Hong Kong - built from real class notes, with a sentence builder for the
grammar patterns and real spaced-repetition drilling.
 
## The Problem

Learning a tonal language like Cantonese from weekly lessons comes with a few recurring problems:
 
- Vocabulary and phrases from class notes stay static: there's no way to actively drill them
- Grammar patterns (tense markers, question structures, comparatives) get taught individually but
  are rarely laid out together as a single reference
- Tone accuracy is one of the hardest things to build intuition for, and most study tools don't
  visually reinforce tone patterns at all
- Progress made while studying on a phone doesn't carry over to a laptop, or vice versa
Sik1 Siu2 Siu2 addresses each of these directly: real class content organised into a browsable
reference, a sentence builder that exposes the grammar patterns as fill-in-the-blank templates, a
flashcard drill with actual spaced repetition, consistent tone-color-coding throughout, and
cross-device sync so progress follows the same account everywhere.
 
## Features
 
- **Reference tab** - vocabulary organised by real-life situation (greetings, food & cha chaan teng,
  family, numbers, question words, emotions, weather, small talk), a dedicated tone-traps section for
  easily-confused minimal pairs, and a full grammar & tenses reference (sentence structures, the
  four-tense system, marker cheat-sheet, the 過 experience marker, and a past/present/future
  time-word grid)
- **Personal self-introduction** - a real self-intro paragraph from class, broken into line-by-line
  cards to memorise as a ready-made way to introduce yourself in Hong Kong
- **Sentence Builder** - tap-to-fill sentence templates covering the core grammar patterns (S+V+O,
  想/要, the 咗/緊/會 tense markers, A-not-A questions, 過 comparatives) so new sentences can be built
  from the pattern rather than memorised whole
- **Drill mode** - flashcards with real SM-2 spaced repetition (the same algorithm behind Anki),
  filterable by all phrases, starred phrases, or only what's currently due for review
- **Tone-color coding** - every Jyutping romanisation is rendered with each tone number consistently
  colored, reinforcing tone recognition across the whole app rather than just per-word
- **Google sign-in with anonymous fallback** - works instantly with zero setup via anonymous auth,
  with an optional Google sign-in that *links* to the same anonymous session (so no progress is
  lost) and makes drill history durable across devices, browsers, and PWA reinstalls
- **Installable PWA** - works offline once installed, opens full-screen from the home screen on
  iOS/Android with no browser chrome
- **No standing backend** — Firebase's client SDK talks to Firestore directly from the browser,
  protected entirely by security rules rather than a server-side API layer
  
## Future Plans
 
- **Audio playback** - hearing each phrase spoken aloud (via a TTS API) rather than relying on
  Jyutping alone
- **Content authoring script** - a small Python script using `pycantonese` to help generate and
  verify Jyutping romanisation when adding new phrases, rather than transcribing by hand
- **Listening drill mode** - audio-first flashcards where the phrase is heard before it's seen, to
  build listening comprehension alongside reading
- **Chunked Firebase bundle** - split Firebase into its own cached chunk (see [bundle
  size](#a-note-on-bundle-size) below) if load time ever becomes worth optimising
  
## Tech Stack
 
- **Vite** - build tool and dev server
- **React** - frontend framework
- **TypeScript** - type safety across components, data, and the SRS/auth logic
- **Sass (CSS Modules)** - component-scoped styling with shared design-token mixins, using
  `sass-embedded` and the modern compiler API
- **Firebase Authentication** - anonymous auth with optional Google sign-in (account linking
  preserves existing progress)
- **Firebase Firestore** - per-user review/progress storage, protected by security rules scoping
  every document to its owner
- **vite-plugin-pwa** - installable, offline-capable PWA packaging
- **Vercel** - frontend deployment
- 
No standing Node/Python server — the phrase content itself lives in `src/data/*.ts` as static
TypeScript, not in a database, since it's content you edit in code as your lessons progress rather
than something that needs a collection of its own.
 
## Project Structure
 
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
 
## Getting Started
 
### Prerequisites
 
- Node.js 18+ installed
- A Firebase project (optional — the app works with zero setup and falls back to `localStorage` if
  unconfigured)
  
### Installation
 
```bash
git clone https://github.com/sxpydo/gwong2-dung1-waa2.git
cd gwong2-dung1-waa2
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
 
## Firebase Setup

Optional, only needed for cross-device sync:
 
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. In **Build → Authentication → Sign-in method**, enable **Anonymous**. The app is single-user, so
   anonymous auth just gives you a stable UID to scope your data — no signup flow needed.
3. In the same **Sign-in method** tab, also enable **Google**. This lets you optionally sign in and
   *link* your anonymous session to a real Google account — same UID, so any progress you'd already
   built up carries over. The advantage over anonymous-only: your progress then survives clearing
   browser data, switching browsers, or reinstalling the PWA, since it's tied to your Google account
   rather than to that one browser's local storage.
4. In **Build → Firestore Database**, click **Create database** (production mode is fine — the
   security rules below lock it down regardless of mode).
5. Deploy the security rules in `firebase/firestore.rules`, either by pasting them into the
   **Firestore → Rules** tab in the console and publishing, or via the Firebase CLI:
```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules
```
   These rules restrict every document to `users/{uid}/reviews/{phraseId}`, readable and writable
   only by the matching signed-in user — whether that user is anonymous or Google-linked, since
   linking preserves the same UID.
6. In **Project settings → General → Your apps**, add a Web app and copy the config values into
   `.env` (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc. — see `.env.example`).
7. Once deployed to a real domain (not `localhost`), add that domain under **Authentication →
   Settings → Authorized domains**, or Google sign-in will fail there with an
   `auth/unauthorized-domain` error.
 
### Google sign-in behavior

A small bar under the header shows "Sign in with Google to sync" until you do, then switches to
showing you're synced. Signing in *links* your existing anonymous session to the Google account
(same UID) rather than starting a fresh one, so nothing you'd already starred or drilled is lost.

On mobile, especially inside an installed PWA, popup-based sign-in can be blocked by the OS — the
app detects that and automatically falls back to a full-page redirect flow instead, which always
works. Signing out reverts to a fresh anonymous session so the app keeps working locally.
 
## Editing Content
 
- `src/data/intro.ts` — your self-introduction paragraph, line by line
- `src/data/categories.ts` — reference categories (greetings, food, family, tone traps, etc.)
- `src/data/grammar.ts` — the grammar & tenses reference (sentence structures, tense table, markers,
  time words)
- `src/data/patterns.ts` — sentence-builder templates; use `___` as the blank, it can repeat within
  a template (e.g. the A-not-A question pattern)

Every phrase needs a unique `id` — the `withIds()` helper in `categories.ts` generates these for you
from the array index, so just add entries to the arrays.
 
## Spaced Repetition
 
Drilling uses SM-2 (the algorithm behind Anki) — see `src/lib/srs.ts`. Grading a card "Good" pushes
its next-due date out further each time you get it right in a row; "Still learning" resets the
interval. The Drill tab's "Due for review" mode only surfaces cards that are actually due, so you're
not re-drilling things you already know cold.
 
## Deployment
 
| Part | Platform | URL |
|------|----------|-----|
| App (frontend + Firebase client) | Vercel | [sik1-siu2-siu2.vercel.app](https://sik1-siu2-siu2.vercel.app/) |
| Data & auth | Firebase (Firestore + Authentication) | — |
 
```bash
npm run build      # outputs to dist/
npm run preview    # sanity-check the production build locally
```
 
Deploy `dist/` to Vercel, Netlify, or GitHub Pages — any static host works, since there's no
backend to run. Connect your repo for push-to-deploy, or drag-and-drop `dist/` onto Netlify for a
one-off deploy. Add the six `VITE_FIREBASE_*` environment variables in your host's project settings
so the live build can reach Firebase.
 
### A note on bundle size
 
The Firebase SDK (auth + Firestore) is noticeably heavier than a minimal REST client — expect
~500KB before gzip, ~160KB after, versus a much smaller bundle if this were using a lighter backend.
For a personal tool loaded occasionally before a trip, this doesn't matter in practice (it's still
a sub-second load on any real connection), but if it ever bothers you, `vite.config.ts` can be given
a `build.rollupOptions.output.manualChunks` split to move Firebase into its own cached chunk.
 
### PWA icons
 
`vite.config.ts` references `/icon-192.png` and `/icon-512.png` in `public/` — add your own icon
files there (any square PNG works; you can generate the two sizes from one source image with any
favicon generator) before deploying, or the install prompt will use a default icon.
 
### Sass setup
 
The project uses `sass-embedded` (not the plain `sass` package), which avoids the `legacy-js-api`
deprecation warnings older Vite/Sass combinations produce. On Vite 8 the modern Sass compiler API is
the default, so no extra config is needed. All stylesheets also use the modern `@use` module syntax
rather than the deprecated `@import`.
