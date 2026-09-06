# SOYL Academy — Media

## Delivered

All nine photographs are in `public/images/`, generated to the master style
below and converted to progressive JPEG (q86). Source PNGs totalled 17MB; the
committed set is ~2MB. `next/image` re-encodes to AVIF/WebP on delivery.

| File | Ratio | Placement |
| --- | --- | --- |
| `hero_students_collaborating.jpg` | 5:4 | Homepage hero; also read through the closing "soyl" wordmark in the footer |
| `traditional_classroom.jpg` | 3:2 | Homepage §03 — the "before" world |
| `teacher_mentoring.jpg` | 2:1 | Homepage §06 For Teachers |
| `students_building_project.jpg` | 4:3 | Homepage §07 Student Experience |
| `students_presenting.jpg` | 16:9 | Homepage §10 Two Paths / For Schools panel |
| `students_debating.jpg` | 3:2 | Homepage §12 Journal lead; For Students page hero |
| `student_thinking_portrait.jpg` | 4:5 | Homepage §14 Final CTA |
| `classroom_wide_establishing.jpg` | 12:5 | For Schools page — establishing plate |
| `classroom_wide_making.jpg` | 12:5 | What We Teach page |

The set holds together because it reads as one school across one project — the
same balsa bridge model recurs from the hero through the teacher and build
frames, and the whiteboard elevations in the presenting shot match the drawings
on the table. Keep that continuity if any frame is regenerated.

### Known artifacts

Generated text in these frames is not reliably spelled. `classroom_wide_making.jpg`
has **"Pototype"** on the whiteboard list (should be "Prototype"), visible on
large displays. Worth a regeneration or a retouch before launch. Several frames
carry slogan-style wall text ("Curiosity Creates Better Questions", "Good Ideas
Solve Real Problems") — plausible as classroom display, but check it reads as
authentic rather than as SOYL marketing copy.

### If regenerating

Master style, prepend to every prompt:

> Editorial documentary photograph of Indian secondary-school students in a
> contemporary Indian classroom, genuinely engaged in collaborative hands-on
> learning, natural expressions, candid moment rather than posed advertising
> photography, teacher interacting naturally with students without dominating
> the scene, natural daylight, sophisticated education editorial photography,
> realistic skin texture, authentic Indian classroom details, subtle
> photographic grain, premium magazine campaign photography, slightly imperfect
> composition, no visible logos, no futuristic displays, no holograms, no
> floating interface elements, no exaggerated smiling, no generic stock-photo
> aesthetic.

Shared negatives: no text or watermarks, no laptops as the focal point, no
students staring at a screen, no American school settings, no plastic AI faces.

Crop notes worth preserving:

- **Hero (5:4)** — subject weighted left; the right edge is cropped by the
  viewport bleed on wide screens, and it reduces to 4:3 on mobile.
- **Final CTA (4:5)** — head in the upper third. A red handwritten annotation
  sits over the lower-right corner, so keep that area visually calm.
- **Two Paths (16:9)** — sits on an ink-black ground; darker exposure suits it.
- **Wide plates (12:5)** — no faces in the outer 10% either side; they crop to
  16:10 on mobile.

---

## Still outstanding

### Video — `/public/video/soyl-loop.mp4` + `soyl-loop-poster.jpg`

8–12 seconds, silent, 16:9, built to loop. Intended home is the Student
Experience section, replacing the `students_building_project` still.

> A cinematic documentary sequence inside a modern Indian school classroom.
> Begin with a close-up of a printed assignment and handwritten notes. Cut to
> three students debating around a table. One student sketches a solution.
> Another works on a simple physical prototype. A teacher crouches beside the
> group and asks a question instead of giving an answer. End with a student
> explaining the group's idea at a whiteboard. Natural daylight, subtle handheld
> camera movement, premium education campaign cinematography, authentic Indian
> classroom, understated confidence, natural expressions, no obvious acting, no
> futuristic technology, no logos, 16:9, designed to loop gracefully.

On implementation: `muted`, `playsInline`, `loop`, no controls, poster set,
`preload="none"`, and swapped for the static poster under
`prefers-reduced-motion`.

### Resolution ceiling

The delivered frames run 1122–1942px on the long edge. That is adequate at
current placements but thin for the two 12:5 full-width plates on a 2× display
above ~1600px. If they look soft in the wild, regenerate those two larger.
