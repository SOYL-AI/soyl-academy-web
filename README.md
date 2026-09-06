# SOYL Academy — Public Website

**Story Of Your Life**

SOYL Academy is the public-facing website for an education initiative by SOYL AI Private Limited. The site focuses on brand storytelling, the SOYL Method philosophy, school lead generation, and the SOYL Journal.

> **Thinking is the work.**

---

## Architecture

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3.x (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Typography | Instrument Sans (variable) + Instrument Serif |
| Animation | GSAP + ScrollTrigger, CSS transitions |
| Smooth Scroll | Lenis |
| Forms | React Hook Form + Zod |
| Email | Resend |
| CMS | Sanity-ready (works without credentials) |
| Deployment | Vercel |

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/                    # Next.js App Router pages
  page.tsx              # Homepage (14 editorial sections)
  method/               # The SOYL Method
  what-we-teach/        # Programs & workshops
  schools/              # For Schools (lead gen)
  students/             # For Students
  journal/              # Journal listing + articles
  about/                # About SOYL Academy
  contact/              # School enquiry form

components/
  layout/               # Header, Footer, Container
  sections/             # Homepage sections (01-14)
  editorial/            # Editorial typography components
  assignments/          # Assignment sheet artifacts
  media/                # Image, video, placeholder
  motion/               # ScrollReveal, SmoothScroll
  forms/                # Contact form
  ui/                   # Button, Badge, etc.
  seo/                  # Structured data

content/                # Typed content data
  site.ts               # All site copy
  journal.ts            # Journal articles
  programs.ts           # Programs data
  navigation.ts         # Navigation structure
  media-prompts.md      # Image/video generation prompts

lib/                    # Utilities and services
  animations/           # GSAP configuration
  content/              # Content accessors
  cms/                  # Sanity client
  seo/                  # Metadata helpers
  validation/           # Zod schemas
  email/                # Email service
```

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Environment Variables

See `.env.example` for all variables. The site compiles and runs without any external service credentials.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL |
| `RESEND_API_KEY` | Optional | Email service for contact form |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Optional | Sanity CMS project |
| `SANITY_API_TOKEN` | Optional | Sanity API token |

---

## Content Architecture

All site copy is centralized in `/content/site.ts` with TypeScript interfaces. This enables:
- Easy copy updates without touching component files
- Future CMS integration (Sanity schemas mirror the TypeScript types)
- Type safety across all content references

### CMS Integration

The site is architected for Sanity CMS. When Sanity credentials are configured:
- Journal articles load from Sanity
- Programs/workshops load from Sanity
- Team data loads from Sanity

Without credentials, all content falls back to local TypeScript data files.

---

## Media

### Photography
Generated editorial photography of Indian secondary-school students in authentic classroom settings. Images focus on:
- Collaborative learning
- Hands-on building
- Student presentations
- Teacher mentoring
- Thoughtful concentration

### Replacing Placeholder Assets
See `/content/media-prompts.md` for detailed generation prompts, target resolutions, and cropping notes for all media assets.

---

## Design System

### Colors
- **White** `#FFFFFF` — Primary canvas
- **Ink** `#171717` — Primary text
- **Cobalt** `#3155FF` — SOYL accent
- **Teacher Red** `#D84A3F` — Annotations only
- **Highlighter** `#F2D45C` — Sparse highlights
- **Paper** `#F4F0E7` — Assignment artifacts

### Typography
- **Instrument Sans** (400–700) — Primary family
- **Instrument Serif** — Editorial accents

### Fluid Scale
Typography uses `clamp()` for responsive sizing from mobile to desktop.

---

## Deployment

Optimized for Vercel:

```bash
# Deploy
vercel

# Production deploy
vercel --prod
```

---

## License

© 2026 SOYL AI Private Limited. All rights reserved.
