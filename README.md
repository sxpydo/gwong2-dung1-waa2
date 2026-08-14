# gwong2-dung1-waa2

## Cantonese Trip Prep

A personal drill/reference tool for learning Cantonese before a Hong Kong trip — built from real
class notes, with a sentence builder for the grammar patterns and spaced-repetition drilling.

**Stack:** Vite + React + TypeScript, CSS Modules + Sass, Supabase (Postgres + anon auth) for
cross-device sync, packaged as an installable PWA. No standing Node/Python server.

## Getting started

```bash
npm install
cp .env.example .env   # fill in your Supabase project URL + anon key (optional — see below)
npm run dev
```

Open the printed local URL. On your phone, open the same URL (once deployed — see below) and use
"Add to Home Screen" to install it as a full-screen app.

### Running without Supabase

The app works with zero setup — if `.env` is missing or empty, progress (stars + spaced-repetition
state) saves to `localStorage` on that device only. Fill in `.env` later if you want it synced
across your phone and laptop.

## Setting up Supabase (optional, for cross-device sync)

1. Create a project at [supabase.com](https://supabase.com).
2. In **Authentication → Providers**, enable **Anonymous sign-ins**. The app is single-user, so
   anonymous auth just gives you a stable ID to scope your rows — no signup flow needed.
3. Run the migration in `supabase/migrations/0001_create_review_state.sql` (via the SQL editor, or the Supabase
   CLI: `supabase db push`). It creates one table, `review_state`, with row-level security so only
   your own rows are ever readable.
4. Copy your project URL and anon key (**Settings → API**) into `.env`.

Note: the phrase content itself (vocab, grammar, patterns) lives in `src/data/*.ts`, not the
database — it's static content you edit in code as your lessons progress, not something that needs
a database table.

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

### PWA icons

`vite.config.ts` references `/icon-192.png` and `/icon-512.png` in `public/` — add your own icon
files there (any square PNG works; you can generate the two sizes from one source image with any
favicon generator) before deploying, or the install prompt will use a default icon.

### Sass deprecation warnings

You'll see `@import rules are deprecated` warnings during build — that's Dart Sass flagging its own
future removal of `@import` in favor of `@use`/`@forward` (planned for Sass 3.0). It's fully
supported today and harmless; not worth the refactor for a project this size, but worth knowing
about if you see it and wonder.

## Project structure

```
src/
  components/     one folder per component, colocated .module.scss
  data/           seed content (intro, categories, grammar, patterns)
  hooks/          useProgress — Supabase/localStorage + SM-2 glue
  lib/            supabase client, SM-2 algorithm, Jyutping tone-coloring
  styles/         Sass variables + mixins (design tokens, shared patterns)
  types/          shared TypeScript interfaces
supabase/
  migrations/     SQL schema (review_state table + RLS policy)
```
