# SOYL Academy — Media Requirements

Every asset below is either missing, or present at a resolution too low for the
placement it now occupies. Generate at the stated resolution, save to the stated
path, and the site picks it up with no code change.

## Master photographic style

Prepend this to every image prompt so the set stays visually consistent:

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

---

## Priority 1 — resolution upgrades

The existing files work compositionally but top out at ~1376px wide. At full-bleed
sizes on a 2× display they will visibly soften. Regenerate at the sizes below,
same subject, same framing.

### `hero_students_collaborating.jpg` — 2800 × 2240 (5:4)

Homepage hero, right-hand image bleeding off the viewport edge. Also read
through the letterforms of the closing "soyl" wordmark in the footer, so it
needs a legible mid-tone subject that survives being clipped to text.

> …three students around a table mid-discussion, one gesturing at a shared
> sketch, papers and a half-built model between them, window light from the
> left, shot slightly off-axis at eye level.

Crop notes: subject weighted to the left third — the right edge is cropped by
the viewport bleed on wide screens. On mobile the frame becomes 4:3, so keep
the essential action inside the centre 70%.

### `teacher_mentoring.jpg` — 2800 × 1400 (2:1)

For Teachers section, wide plate. Currently 1264×848 (3:2), so the 2:1 placement
crops ~25% of the height.

> …a teacher crouched at table height beside a group of seated students, asking
> a question rather than pointing at an answer, students' attention on their own
> work rather than the camera, mid-room natural light.

Crop notes: compose for 2:1 directly. Keep faces out of the top 15% and bottom
15%. Mobile crops to 4:3 centred.

### `students_presenting.jpg` — 2400 × 1350 (16:9)

Two Paths / For Schools panel, sits on an ink-black ground.

> …a student explaining a proposal at a whiteboard covered in her own diagrams,
> classmates listening and one interjecting, sketched plan visible but not
> legible as specific text.

Crop notes: darker overall exposure suits the black panel. Avoid a bright white
wall filling the frame.

### `students_building_project.jpg` — 2400 × 1800 (4:3)

Student Experience section.

> …students assembling a simple physical prototype on a workbench — cardboard,
> wire, hand tools — hands prominent, mid-task, one student consulting a
> hand-drawn plan.

### `student_thinking_portrait.jpg` — 1800 × 2250 (4:5)

Final CTA. Currently 1024×1024 square, so the 4:5 placement crops the sides.

> …a single student pausing mid-thought over an open notebook, pen resting, gaze
> off-camera, quiet and unperformed, shallow depth of field, window light.

Crop notes: compose for a vertical 4:5 frame. Head in the upper third; the
bottom-right corner carries a red handwritten annotation overlay, so keep that
area visually calm.

### `journal-featured.jpg` — 2400 × 1600 (3:2)

Journal lead story. Should feel more reportage and less campaign than the hero.

> …an over-the-shoulder view of a student's handwritten working, crossings-out
> and arrows visible, a phone face-down beside the page.

---

## Priority 2 — assets not yet in the repo

### `students_debating.jpg` — 2400 × 1600 (3:2) — NOT YET USED

Intended for the For Students page and as an alternate Journal lead. Currently
that page runs on typography alone.

> …two students in visible disagreement across a table, one mid-sentence with an
> open hand, the other listening with a counter-argument ready, other students
> watching, energetic but not staged.

### `classroom_wide_establishing.jpg` — 3000 × 1250 (12:5) — NOT YET USED

A full-bleed establishing plate for the For Schools page, to give principals a
sense of the room rather than a close crop.

> …a wide establishing view of a contemporary Indian secondary classroom in use,
> groups working at different tables on different things, teacher moving between
> groups, mild lens distortion, daylight from a bank of windows.

---

## Video — not yet produced

### `/public/video/soyl-loop.mp4` + `/public/video/soyl-loop-poster.jpg`

8–12 seconds, silent, 16:9, designed to loop. Intended home is the Student
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

Implementation requirements when the file lands: `muted`, `playsInline`, `loop`,
no controls, poster frame set, `preload="none"`, and swapped for the static
poster under `prefers-reduced-motion`.

---

## Currently unused

`student_writing_closeup.jpg` is in the repo but no longer referenced. It is a
good candidate for the Journal lead image or the About page if either grows a
photographic slot.

## Encoding note

Source JPEGs currently run 700–900KB at ~1300px, which is far heavier than the
pixel count warrants. `next/image` re-encodes to AVIF/WebP on delivery so this
does not reach visitors, but exporting at quality ~85 keeps the repo sane.
