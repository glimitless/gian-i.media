@AGENTS.md

# Gian-I Media

Design-studio portfolio. Next.js 16 App Router, React 19, Tailwind v4, strict TS. All content is static JSON in `data/`; no backend. `npm run dev | build | lint`; no tests.

## Styling rules

Tokens, component classes, and transition utilities all live in `app/globals.css`. Read it before styling.

- **1rem = 10px** (`html { font-size: 10px }`). `p-4` = 10px. Breakpoints are in em.
- **Colors come in pairs:** `text-lmPrimary dark:text-dmPrimary`. Use only the theme tokens, never raw hex or default Tailwind colors. Dark mode is class-based (`next-themes`).
- **Animate only through the named `@utility` transitions** (`color-transition`, `bg-transition-2`, `btn-template-transition`, …). Never write raw `transition`/`duration-*` classes. Anything that changes color with the theme needs a transition. For a new combination, add a `@utility` built from the `--duration-*`/`--ease-*` tokens.
- **Plain `h1`/`h2`/`h3`/`p` are already styled** in `@layer base`. Use the tags instead of re-applying text classes. Title + metadata = `<p>` + `<h3>`.
- **Buttons:** `btn-template` (+ `btn-template-active` when selected), with padding/width added at the call site. Disclosure rows use `info-expand-btn-template`. Links use `text-link`.
- **Flat and rectangular:** no border radius. Depth comes from the shadow tokens and the Bg/Surface contrast.
- Conditional classes are template literals; no `clsx`/`cn`.

## Layout

- **Responsive = named container queries**, not media queries: `/viewport`, `/content`, `/main` (e.g. `@min-[64em]/main:…`). Use `useMediaQueryContext()` only when JS needs breakpoint state.
- **Detail pages use the `three-column-page-*` / `two-column-page-*` classes.** Don't rebuild the layout with utilities. Copy the structure from `app/(archive-layout)/archive/works/[workId]/page.tsx`.
- Put `<HeaderMargin />` (`isMediaColumn` in the media column) at the top of every scrolling column.

## React

- Server components by default; add `'use client'` only for state, context, or browser APIs.
- Dynamic routes: `dynamicParams = false`, `generateStaticParams()` from `data/**/archive-*-ids.json`, `generateMetadata()` via `toPageMetadata()`, `await params`, `notFound()` when a record is missing.
- Providers follow `lib/filter/filter-provider.tsx`: a `null`-default context, `useMemo` for the value, `useCallback` for handlers, and a `useXContext()` hook that throws outside the provider.
- Use string unions for multi-state UI (`types/navigator.d.ts`).
- Expand/collapse: `grid item-expand-transition grid-rows-[0fr|1fr]` with an `overflow-hidden min-h-0` child.
- `import type` for types (`verbatimModuleSyntax`). Props are typed inline; shared shapes go in `types/`.

## Content and assets

- Rich content is `ContentBlockArgs[][]` (`types/content-body.d.ts`), rendered by `lib/content-array/render-content-body.tsx`. A new block type needs changes in both files.
- Images/PDFs load from the media server via `mediaURL()` (`NEXT_PUBLIC_MEDIA_BASE_URL`). Videos/posters are in `public/`.
- SVGs import as React components (svgr) and inherit `currentColor`, so color them with text tokens. Mark decorative ones `aria-hidden`.
- A new archive thumbnail must be registered in `lib/archive/thumbnails.ts`, or `hydrateArchiveID` throws.
- Non-submit buttons get `type="button"`. Icon-only controls get `aria-label`. Disclosures get `aria-expanded`.
