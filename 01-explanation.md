# The Lookbook — ELI7 Explanation

## app/layout.tsx

- Line 1 imports the global CSS file used across every page.
- Lines 2-3 import `Header` and `Footer` components from the shared components folder. Those components are expected to provide the sticky top navigation and site footer.
- Lines 5-12 define site-wide `metadata` for title, description, and Open Graph data. This metadata applies to all pages unless a child page overrides it.
- Lines 14-18 declare `RootLayout`, which receives `children` from Next.js. The `children` prop is the rendered result of the current page or nested layout.
- Lines 20-26 show the static HTML shell: `<html>`, `<body>`, the persistent `<Header />`, the page content inside `<main>`, and `<Footer />`.
- This file is the highest layout in the app router, so it wraps every route.

## app/page.tsx

- Lines 1-3 import the `Link`, `Image`, and project data helper.
- Lines 5-9 define page-level metadata for the home page, overriding the root title.
- Line 11 defines the `Home` page component.
- Line 12 loads all projects from `lib/projects.ts`, and line 13 selects the first three as featured.
- Lines 17-23 create the hero section with a heading, a paragraph, and a call-to-action.
- Lines 31-38 render a hero image using `next/image` with `fill` and a fixed `h-64` wrapper, which avoids layout shift.
- Lines 42-66 render the featured project strip. Each project is wrapped in an anchor link built from `Link`.
- This page is static and content-driven, and it composes the shared layout around itself.

## app/about/page.tsx

- Lines 1-4 set the `About` page metadata.
- Line 7 exports the About page component.
- Lines 9-21 render simple prose content in a `div` with a typographic utility class.
- This page has one responsibility: explain the creator story.

## app/projects/layout.tsx

- Line 1 imports `SubNav`, the route-specific navigation for `/projects`.
- Lines 3-7 define metadata for all project-related pages.
- Lines 9-13 declare the `ProjectsLayout` wrapper.
- Lines 15-20 render the `SubNav` above the nested child content.
- This nested layout means any page under `/projects` will show the same sub-navigation automatically.

## app/projects/page.tsx

- Line 1 imports the project data helper and line 2 imports `ProjectCard`.
- Lines 4-8 define metadata for the `/projects` listing.
- Lines 10-11 fetch all project entries.
- Lines 14-23 render a grid of project cards.
- This page only cares about displaying all projects; it does not build the page shell or the sub-navigation.

## app/projects/loading.tsx

- Lines 1-6 define a loading UI for the `/projects` route.
- If the projects page is slow to resolve, Next.js will render this fallback while waiting.
- This is a route-level loading boundary for the `/projects` folder.

## app/projects/error.tsx

- Lines 1-2 mark this file as a client component and import `useEffect`.
- Lines 4-10 define the error boundary signature with `error` and `reset`.
- Lines 11-13 log the error to the console.
- Lines 15-24 render a retry UI.
- This error boundary catches rendering or data errors for the `/projects` route.

## app/projects/not-found.tsx

- Lines 1-9 define the fallback shown when the `/projects` route resolves to nothing.
- If a nested page or filter returns no content, this UI communicates that clearly.

## app/projects/[slug]/page.tsx

- Lines 1-3 import `Image`, project helpers, and `notFound` navigation.
- Line 5 declares the `params` type for the dynamic segment.
- Lines 7-9 define `generateStaticParams()`, which returns every project slug from `getAllProjects()`.
  - This is how Next.js knows which `/projects/[slug]` pages can be statically generated.
- Lines 11-22 define `generateMetadata()` for each slug page. It returns a title and description per project.
- Line 24 defines the actual project detail component.
- Lines 25-26 look up the current project by slug; if missing, `notFound()` triggers the 404 fallback.
- Lines 29-47 render the project content and images.
- The dynamic segment `[slug]` maps a URL like `/projects/atlas-dashboard` to `params.slug = 'atlas-dashboard'`.

## app/projects/[slug]/loading.tsx

- Lines 1-4 define the loading screen specifically for individual project detail pages.
- Next.js uses this if the detail page is slow or while loading a fallback.

## app/projects/[slug]/error.tsx

- Lines 1-2 mark the error boundary as client code.
- Lines 4-10 define the boundary contract.
- Lines 11-25 log the error and show a retry button.
- This boundary applies only to the `/projects/[slug]` path.

## app/projects/[slug]/not-found.tsx

- Lines 1-9 render a not-found page for missing project slugs.
- If a user enters an invalid URL, this component is displayed.

## How layouts compose with pages

- `app/layout.tsx` is the root shell. It always renders first and wraps every route.
- The `children` prop on line 15 is replaced by the active page or nested layout.
- When visiting `/projects`, Next.js composes `app/layout.tsx` around `app/projects/layout.tsx` around `app/projects/page.tsx`.
- When visiting `/projects/[slug]`, it composes `app/layout.tsx` around `app/projects/layout.tsx` around `app/projects/[slug]/page.tsx`.

## How dynamic segments work

- The folder name `[slug]` makes this route dynamic.
- The value of whatever is typed in the URL becomes `params.slug` in the page component.
- `generateStaticParams()` (line 7) tells Next.js all valid slug values.

## How loading.tsx and error.tsx slot into the page tree

- `loading.tsx` and `error.tsx` files live inside the same route folder as the page they represent.
- For `/projects`, `app/projects/loading.tsx` loads if the projects list is slow.
- For `/projects/[slug]`, `app/projects/[slug]/loading.tsx` loads if a detail page is slow.
- `error.tsx` in each folder catches rendering errors for that route and its children.

## How generateStaticParams turns dynamic routes into static pages

- `generateStaticParams()` returns an array of params objects like `{ slug: 'atlas-dashboard' }`.
- Next.js uses those values at build time to generate static HTML for each page.
- That means each project detail page can be pre-rendered rather than rendered only on-demand.
