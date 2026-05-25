# The Lookbook — Audit Notes

## Missing alt text and image description

- Hero and featured images on `app/page.tsx` (lines 33-36, 51-55) do include `alt` text, which is good.
- The alt text is the project title, which is acceptable but could be more descriptive for visual content.
- The detail page images in `app/projects/[slug]/page.tsx` use `alt={`${project.title} image ${i + 1}`}` (lines 35-40), which is functional but not ideal for screen readers. A fuller description like `Project screenshot showing ...` would be more accessible.

## Semantic HTML correctness

- `app/layout.tsx` correctly uses `<html lang="en">` and `<body>` (lines 20-25).
- `app/page.tsx` uses `<section>` and `<article>` for grouped content; this is semantically appropriate.
- `app/about/page.tsx` uses a content wrapper and heading hierarchy correctly.
- `app/projects/page.tsx` uses a `<section>` with an `<h1>`, which is correct for a listing page.
- `app/projects/[slug]/page.tsx` uses `<article>` for detail content, which is a good semantic choice.

## Accessibility of the nav

- The actual top header navigation is not present in `The Lookbook` folder, even though `app/layout.tsx` imports `Header` and `Footer` on lines 2-3. That is a runtime issue and means the top nav cannot be audited here.
- The nested project sub-navigation in `app/projects/layout.tsx` is wrapped in `<nav>` (line 1 of `SubNav` in the imported component) and uses standard links, so it is keyboard-focusable by default.
- `SubNav` does not currently mark the active item with `aria-current`, nor does it announce the active category for screen readers, so there is room for improvement.
- The page does not include a skip link or other top-level accessibility affordance for keyboard users.

## Completeness of SEO metadata

- Root metadata is defined in `app/layout.tsx` (lines 5-12), giving the site a default title and description.
- The home page has its own metadata override (lines 5-9 in `app/page.tsx`).
- The about page sets metadata (lines 1-4 in `app/about/page.tsx`).
- `/projects` list metadata is defined (lines 4-8 in `app/projects/page.tsx`).
- Individual project pages dynamically generate metadata via `generateMetadata()` (lines 11-21 in `app/projects/[slug]/page.tsx`).
- One gap: the home page `openGraph` metadata only defines a title and not a description; adding `description` there would improve social preview completeness.

## Page speed implications of the chosen image strategy

- Images use `next/image` and `fill`, which enables automatic optimization and lazy loading.
- The hero and card images are loaded from remote URLs. That means network latency and remote image caching matter more than local assets.
- Because the containers have fixed heights (`h-64`, `h-44`, and fixed wrapper classes), layout shift is limited, which is good for speed and CLS.
- The app currently does not specify explicit width/height props on `Image`, but fixed wrapper sizes reduce CLS because the parent element is sized ahead of load.
- If the remote images are large or not optimized on the source server, page speed may still suffer despite Next.js optimization.

## Cumulative Layout Shift on the hero section

- The hero image wrapper uses a fixed height of 64 units and `relative` positioning (line 31 in `app/page.tsx`), so the browser reserves space before the image loads.
- That means the hero section should be stable and not cause a large CLS event.
- The `next/image` `fill` mode is safe here because the wrapper has a fixed height, but if the wrapper were fluid without an aspect ratio, CLS would increase.

## Additional observations

- The route-specific `loading.tsx` and `error.tsx` files are a strong progressive enhancement pattern because they isolate fallback UI from the main page content.
- The missing `Header` and `Footer` imports in `app/layout.tsx` are a serious structural issue; if the components are absent, the app cannot render correctly.
- `generateStaticParams()` in `app/projects/[slug]/page.tsx` is a good static-generation practice, but a missing project slug should also be handled by a global 404 page if `notFound()` is called.
