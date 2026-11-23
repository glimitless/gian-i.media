---
name: build-ui
description: Build or update user-facing UI for the Gian-I Media portfolio using the existing design tokens, component classes, layouts and container-query conventions. Use when creating or significantly changing pages, sections or visible components.
argument-hint: <What UI to build or change>
---

Build or update the following UI:

$ARGUMENTS

If the request above is empty, ask what should be built and stop.

## 1. Understand the current code
- Read `CLAUDE.md` and `app/globals.css` before styling. They define the tokens, component classes, transition utilities and layout rules this work must follow.
- Find the pages, components, data files (`data/`) and types (`types/`) the request touches, and read them.
- Check `node_modules/next/dist/docs/` before using any Next.js API you are not sure about (see `AGENTS.md`).

## 2. Reuse before you add
- Search `components/`, `lib/` and `app/globals.css` for components, hooks, classes and utilities that already do part of the job. Build on them.
- For detail pages, copy the structure from `app/(archive-layout)/archive/works/[workId]/page.tsx`.
- Only add a new component, `@utility` or token when nothing fits, and say why in the summary.
- Keep the change to the requested feature. Note unrelated issues instead of fixing them.

## 3. Record a baseline
- Run `npm run lint` and `npm run build` before changing anything, and note which errors already exist. You only own errors your change causes.

## 4. Implement
Check the change against these rules before verifying:
- Theme token pairs only (`text-lmX dark:text-dmX`); no raw hex or default Tailwind colors.
- Animation only through the named `@utility` transitions; anything that changes with the theme has one.
- Responsive layout with named container queries (`/viewport`, `/content`, `/main`), not media queries.
- Plain `h1`/`h2`/`h3`/`p` instead of re-applied text classes; no border radius.
- Server component unless it needs state, context or browser APIs.
- Accessibility: `type="button"` on non-submit buttons, `aria-label` on icon-only controls, `aria-expanded` on disclosures, `aria-hidden` on decorative SVGs.

## 5. Verify
- Run `npm run lint` and `npm run build`.
- Run the app (use the `run` skill, or start `npm run dev` in the background and note its PID and port) and visually check the changed UI:
  - at a narrow mobile width, a mid width, and a wide desktop width, crossing the container-query breakpoints the change uses;
  - in both light and dark theme, including the theme-switch transition;
  - every interactive state you touched (hover, active/selected, expanded/collapsed, empty data).
- If anything fails (lint or build errors beyond the baseline, runtime errors in the console, wrong rendering), fix the cause and rerun the full verification, not just the failed check. Stop after 3 failed rounds on the same error and report it as unresolved, with the output and what you tried.
- If something can't be run (missing media server, env vars), say what blocked it and what you checked instead.

## 6. Clean up
- Stop every process you started (dev server, browser): background shells with TaskStop, others by the PID you noted (`taskkill /PID <pid> /T /F`). Never kill by name or port alone, since it may be the user's own dev server.
- Confirm each has exited, and delete temporary screenshots or scripts you made outside the scratchpad.

## 7. Summarize
- What changed, as a list of files with one line each.
- Which existing pieces were reused, and anything new that was added and why.
- Verification evidence: check results, the widths and themes viewed, and screenshots if taken.
- Pre-existing failures, unresolved issues, and any cleanup that did not succeed.
