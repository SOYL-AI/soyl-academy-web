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
| `students_building_project.jpg` | 4:3 | Homepage §07 — poster/reduced-motion still for the video |
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

## Notes on delivered media

### ~~Video~~ — delivered

`public/video/soyl-loop.mp4` — 1280x720, 16:9, 10.01s, H.264, 2.9MB.

Placed in the Student Experience section via `components/media/VideoLoop.tsx`,
which renders it `muted` / `loop` / `playsInline` / `preload="none"` and
`aria-hidden` (decorative). Reduced motion is handled in CSS — the
`.motion-still` / `.motion-clip` pair in `globals.css` — so the component stays
a Server Component with no hydration flash.

Things to tidy when there is a toolchain for it:

- **Poster is a stand-in.** There is no video decoder on the build machine, so
  the poster is `students_building_project.jpg` rather than a real frame from
  the clip. If the opening frame differs much from that still, there will be a
  visible jump on load. Extract frame 0 with
  `ffmpeg -i soyl-loop.mp4 -frames:v 1 soyl-loop-poster.jpg` and point the
  component at it.
- **The file still carries an AAC audio track.** `muted` means it never plays,
  but it is dead weight. Strip with
  `ffmpeg -i soyl-loop.mp4 -c:v copy -an soyl-loop.mp4`.
- A WebM/AV1 sibling would cut the transfer further for browsers that take it.

### Resolution ceiling

The delivered frames run 1122–1942px on the long edge. That is adequate at
current placements but thin for the two 12:5 full-width plates on a 2× display
above ~1600px. If they look soft in the wild, regenerate those two larger.
