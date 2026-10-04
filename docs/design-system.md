# SOYL Academy Design System

## Overview
The SOYL Academy design system balances an elite, premium editorial aesthetic with high-clarity product demonstrations.

**Design Equation:**
`Primer's sophistication + SchoolAI's product clarity + Duolingo's motion and personality`

## Brand Typography
- **Primary Typeface:** Clean, grotesque/sans display face (Inter / Helvetica Neue equivalent via `font-sans`).
- **Heading Styles:** Large, tight line-height, bold weights.
- **Copy:** High legibility, generous line-height (`leading-relaxed`), restricted line lengths (max ~70 characters) to preserve an editorial feel.
- **Eyebrows:** Small caps, heavily letter-spaced, often in brand accent colors (e.g., `text-brand-blue`), to provide section context without cluttering the page.

## Color Palette
The color palette is strictly defined to prevent a generic SaaS look. We use a flat, photo-led aesthetic with precise color tokens defined in Tailwind (`globals.css`).

- **Backgrounds:**
  - `brand-cream` (`#F7F5EF`): Primary background, warm off-white.
  - `brand-black` (`#141414`): Dark background blocks and primary typography.
- **Accents:**
  - `brand-yellow` (`#F4C93E`): Callouts, highlighting key words behind text.
  - `brand-red` (`#B4392E`): Minor accents (logo block, warning states).
  - `brand-blue` (`#2F3E9E`): Section eyebrows, numbering, full-bleed accent blocks.
  - `brand-tan` (`#EFE9DA`): Secondary callouts and info boxes.

## Structural Principles
- **Less is More:** Avoid large paragraphs. Emphasize one idea per section.
- **Whitespace:** Extremely generous padding (`py-24` to `py-32`) to let the typography breathe.
- **Flat UI:** No generic drop shadows, no gradient washes, no rounded card grids.
- **Separation:** Thin hairline dividers (`border-t border-brand-black/10`) separate sections.

## Components
- **Typography:** Strong, confident headlines (`text-5xl` to `text-7xl` on desktop).
- **Buttons:** Sharp, solid blocks with physical interaction states (using `.press` motion).
- **Cards:** Minimal borders, utilizing brand colors for contrast, strictly no dropshadows unless specifically designed for spatial stacking.
