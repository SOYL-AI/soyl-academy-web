# Homepage Redesign (Phase 2 & 3)

## Motivation
The previous homepage suffered from the "SaaS template" problem: too much explanatory text, generic grid layouts, and overused "fade-in-up" animations. The goal of the redesign was to shift to a highly visual, narrative-driven experience emphasizing that *SOYL creates assignments where students still have to think*.

## Design Equation
`Primer's sophistication + SchoolAI's product clarity + Duolingo's motion and personality`

## Key Strategic Changes
1. **Aggressive Text Reduction:** We removed over 60% of the explanatory copy. We shifted from paragraphs explaining why assignments are broken to interactive, scroll-linked visuals demonstrating the problem and solution.
2. **Visual Storytelling:**
   - Instead of text explaining "how we stop AI cheating," we built `ProblemSequence` to show an assignment prompt turning into an A+ instantly, contrasted with the SOYL method.
   - `ProductFlow` introduces auto-playing, non-interactive HTML/CSS mockups that show the actual product experience in a clean, abstract way without relying on heavy PNG screenshots.
3. **Motion Upgrade:** Moved away from heavy GSAP scrubbing. We now use Framer Motion with native CSS `position: sticky` to create continuous scroll narratives that feel physical and lightweight.
4. **Strict Brand Adherence:** Retained the cream, black, and distinct accent colors (yellow highlight blocks, blue numerals) to ensure the page remains distinctly SOYL, maintaining a premium education brand feel rather than a generic tech product.

## Homepage Structure (10 Sections)
The new homepage is built as a deliberate sequence:
1. **HeroVisual & Hero:** A clean, bold statement: "Homework was built for a world before AI."
2. **ProblemSequence:** A scroll-driven animation showing how easy it is to bypass traditional homework using AI.
3. **AssignmentTransform:** A morphing interaction comparing a static essay prompt to a dynamic, multi-stage SOYL assignment.
4. **MethodSequence:** Three visual pillars of the SOYL methodology (Socratic framing, active building, defense).
5. **ProductFlow:** Abstracted UI mockups demonstrating the student interface.
6. **SubjectExperiences:** A grid of abstract subject visualizations (Humanities, STEM, Logic).
7. **AudienceEntryPoints:** Tilt-card layouts for distinct audiences (Schools, Parents).
8. **PhilosophyManifesto:** A stark, typographic scroll-reveal emphasizing the core belief that "Thinking is the work."
9. **ProofSection:** Data and testimonials structure, ready for real population.
10. **FinalCta:** A clean, high-contrast close with a hand-drawn underline effect.
