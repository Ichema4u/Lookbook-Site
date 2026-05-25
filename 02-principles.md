# The Lookbook — Page Structure Principles

## Plain definitions with line references

- `app/layout.tsx` (lines 14-27): root shell that defines the HTML frame and shared layout, not the page content.
- `app/page.tsx` (lines 11-69): home page content and featured project strip.
- `app/about/page.tsx` (lines 7-22): simple creator story page with prose content.
- `app/projects/layout.tsx` (lines 9-21): nested route layout that adds sub-navigation for every `/projects` child.
- `app/projects/page.tsx` (lines 10-24): project listing page with a grid of cards.
- `app/projects/[slug]/page.tsx` (lines 24-48): single project detail page for the dynamic slug.
- `app/projects/loading.tsx` (lines 1-6): route-level loading fallback for the projects list.
- `app/projects/[slug]/loading.tsx` (lines 1-4): loading fallback for project detail pages.
- `app/projects/error.tsx` (lines 1-26): route-level error UI for `/projects`.
- `app/projects/[slug]/error.tsx` (lines 1-26): error UI for project detail pages.
- `app/projects/not-found.tsx` (lines 1-9): not-found fallback for empty project listing.
- `app/projects/[slug]/not-found.tsx` (lines 1-9): not-found fallback for invalid project slugs.

## Composition over duplication

- `app/layout.tsx` provides the shared site frame once, so pages do not repeat the HTML shell.
- `app/projects/layout.tsx` adds the section-specific `SubNav` once for all project routes.
- `ProjectCard` is used in `app/projects/page.tsx` to avoid repeating card markup inside the grid.
- `loading.tsx`, `error.tsx`, and `not-found.tsx` files keep route fallback logic separate from page content.
- The result is fewer repeated tags and a cleaner separation between layout and content.

## Separation of concerns between layout and content

- Layout files handle structure, navigation, and route scaffolding.
- Page files handle only visible content and data rendering.
- The project list page does not duplicate the nested sub-navigation because that belongs in `app/projects/layout.tsx`.
- Metadata is defined close to the page it affects, so SEO concerns stay separate from visual markup.

## Semantic HTML

- Root layout uses proper HTML structure: `<html lang="en">` and `<body>` (lines 20-25).
- Home, about, projects, and project details use semantic wrappers: `<section>`, `<article>`, `<h1>`, `<h2>`, `<p>`.
- The detail page uses `<article>` (line 29) for self-contained content.
- Semantic structure improves accessibility and content clarity.

## Progressive enhancement

- Static page rendering is used throughout, so core content works without client-side JavaScript.
- `next/image` adds lazy loading and responsive support without changing the HTML markup.
- `Link` handles client-side navigation when available, but pages still work as standard links.
- Loading and error boundaries provide better user feedback when the route is slow or fails.

## Single responsibility per page

- `app/page.tsx` is only the home page and nothing else.
- `app/about/page.tsx` is only the about page narrative.
- `app/projects/page.tsx` is only the project list and does not manage navigation or metadata beyond its own needs.
- `app/projects/[slug]/page.tsx` is only the project detail view and slug lookup.
- This keeps each route focused and reduces the chance of unintended side effects.
