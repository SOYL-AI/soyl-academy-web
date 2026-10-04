# SOYL Academy Website Architecture

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 (using the `@theme` directive in `globals.css`)
- **Animation:** Framer Motion, CSS Keyframes
- **Icons:** Lucide React
- **Type Checking:** TypeScript strictly enforced
- **Content:** Hardcoded TypeScript dictionaries in `content/` (No headless CMS, optimized for strict copy budgeting).

## Directory Structure
- `app/`: Next.js App Router endpoints, pages, layouts, and API routes.
  - `globals.css`: Global styles and Tailwind theme configuration.
- `components/`: React components.
  - `ui/`: Fundamental building blocks (Buttons, Inputs).
  - `sections/`: High-level page sections (Hero, ProblemSequence, etc.).
  - `visuals/`: Reusable SVG and motion-based visual demonstrations.
  - `motion/`: Motion system providers, custom hooks (`useMotionOk`), and wrappers.
- `content/`: TypeScript dictionaries holding page copy to enforce content budgets (e.g., `home.ts`, `proof.ts`).
- `lib/`: Utility functions, constants, and motion tokens (`motion.ts`, `utils.ts`).
- `docs/`: Design system, architecture, and project documentation.

## Content Philosophy
To prevent the common problem of bloated, marketing-heavy websites, copy is decoupled from components and stored in `content/`. This strictly enforces word counts and ensures text acts as an accessory to visual demonstrations, rather than the core mechanism of explanation.

## Build and Deployment
- Deployed on Vercel.
- Static generation is highly preferred for marketing pages to ensure instant TTFB (Time to First Byte).
- The `generateStaticParams` feature is used for the `/journal` routes.

## Performance and SEO
- Images are optimized using `next/image` where applicable, though we rely heavily on vector (SVG) graphics and CSS/Framer motion for visual storytelling to keep payloads small.
- An automated `llms.txt` and `llms-full.txt` setup is present to provide AI agents with a readable context of the site.
- Comprehensive metadata is configured in `app/layout.tsx`.
