<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ph-car-washing-system-client

Single-package Next.js 16 App Router frontend (React 19.3, Tailwind v4, shadcn `base-nova`, npm). App code is in `src/app`; `@/*` resolves to `src/*`. No monorepo, no CI, no test runner, no formatter.

## Commands

- `npm run dev` — Turbopack dev server on :3000. It regenerates the managed AGENTS block and `.next/dev/types`, so expect those as uncommitted noise.
- `npm run build` — production build; also runs the TypeScript check.
- `npx tsc --noEmit` — typecheck only (there is no `typecheck` script).
- `npm run lint` — ESLint flat config over the whole repo.
- `next lint` was removed in Next 16; always use `npm run lint`.

`npm run lint` fails out of the box: `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`, plus an unused `Image` import warning in `src/app/page.tsx`. Treat that as the baseline; don't rewrite shadcn files just to silence it.

## Next 16 quirks

- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Uncached data (cookies, headers, `searchParams`, fetches) must sit inside `<Suspense>` or a `'use cache'` function, or the dev overlay reports a blocking route. Read `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` before adding data fetching.
- Page/layout props use the generated globals, e.g. `PageProps<'/services/[id]'>`, `LayoutProps<'/'>`. Don't hand-write `params`/`searchParams` types and don't import them.
- `params`, `searchParams`, `cookies()`, and `headers()` are async in this version; always `await` them.
- Middleware is `proxy.ts` in Next 16, not `middleware.ts`.
- Next 16 bundles version-matched docs at `node_modules/next/dist/docs/` — prefer them over online docs or memory.

## UI layer

- `src/components/ui/*` is generated shadcn code for the `base-nova` style on `@base-ui/react`, not Radix. Don't paste Radix snippets or add `@radix-ui/*` deps; add components with `npx shadcn@latest add <name>` and keep the `data-slot` + `cva` pattern.
- Merge classes with `import { cn } from "cn"` (the `cn` package replaces clsx + tailwind-merge; neither is installed). `src/lib/utils.ts` only re-exports it.
- Tailwind v4 is CSS-first: tokens live in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`, `:root`/`.dark`). There is no `tailwind.config.*`; put new tokens in CSS.
- Tailwind is compiled by the `@tailwindcss/turbopack` loader rule in `next.config.ts`; there is no PostCSS config.
- Dark mode is class-based (`@custom-variant dark`) and no theme provider is installed; toggling `.dark` on `<html>` is the only mechanism until one is added.

## Current state

- Route groups split the app: `(root)` wraps public pages with `Header` + `Navbar`, while `(auth)` wraps `/signin` and `/signup` in a full-viewport split-screen shell. The root `src/app/layout.tsx` only renders `<html>`/`<body>`.
- `src/app/(root)/page.tsx` is still a placeholder. Auth forms are static: `handleSubmit` only prevents the default action and logs the values, ready to be swapped for Better Auth.
- Brand colors are `--brand-navy` / `--brand-amber` in `globals.css`, exposed as `bg-brand-navy` / `bg-brand-amber`.
- `src/lib/highlighter.tsx` is a lazily loaded Shiki highlighter; register extra languages/aliases in its `languages`/`aliases` maps. Used by `src/hooks/use-highlighted-code.ts` (nothing consumes either yet).
