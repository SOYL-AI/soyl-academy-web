/**
 * Media contract — every product screenshot, loop and photograph the site shows.
 *
 * Nothing here is invented. A slot with no `src` renders nothing at all (the
 * editorial layouts stand without it). To fill a slot: drop the file in /public/media (AVIF/WebP/PNG for stills, MP4 for
 * loops), set `src`, `width` and `height`, and check the alt text.
 *
 * Illustrative editorial photography (not SOYL pupils) lives in content/images.ts.
 *
 * Photography here: real SOYL sessions, Future Builders cohorts or pilot classrooms
 * only, with consent on file. No AI-generated people.
 */

export interface MediaSlot {
  /** What the slot should show — also the TODO brief for the SOYL team. */
  brief: string;
  alt: string;
  /** Intrinsic size of the supplied file. Used for the aspect ratio. */
  width: number;
  height: number;
  src?: string;
  /** Optional short muted loop (MP4). `src` is its poster still. */
  loop?: string;
}

const screen = (brief: string, alt: string): MediaSlot => ({ brief, alt, width: 1600, height: 1000 });
const photo = (brief: string, alt: string): MediaSlot => ({ brief, alt, width: 1200, height: 900 });

export const media = {
  // ── Hero ────────────────────────────────────────────────────────────────
  studentQuestion: screen(
    'Student question screen: a maths question with the attempt trail and a hint open',
    'The SOYL student screen: a question, the student’s attempts so far, and a hint'
  ),

  // ── How it works: notes → approve → hints → heatmap ─────────────────────
  uploadNotes: screen(
    'Teacher uploads class notes and SOYL drafts questions',
    'A teacher uploading class notes; SOYL drafts interactive questions from them'
  ),
  teacherApproves: screen(
    'Teacher reviews the AI draft: edit, approve or reject each question',
    'A teacher reviewing drafted questions, editing one before approving it'
  ),
  studentHints: screen(
    'Student working a question with a step-by-step hint visible (no answer shown)',
    'A student working through a question with a step-by-step hint'
  ),
  teacherHeatmap: screen(
    'Teacher class view: heatmap of attempts and hints per pupil per question',
    'A class heatmap showing each pupil’s attempts and hints on every question'
  ),

  // ── Simulators (working titles — confirm names with the product team) ───
  simulators: [
    { subject: 'Maths', title: 'Coordinate geometry', ...screen('Maths simulator: coordinate geometry', 'The coordinate geometry simulator') },
    { subject: 'Maths', title: 'Fractions', ...screen('Maths simulator: fractions', 'The fractions simulator') },
    { subject: 'Physics', title: 'Motion and forces', ...screen('Physics simulator: motion and forces', 'The motion and forces simulator') },
    { subject: 'Physics', title: 'Electric circuits', ...screen('Physics simulator: electric circuits', 'The electric circuits simulator') },
    { subject: 'Chemistry', title: 'Reactions', ...screen('Chemistry simulator: reactions', 'The chemical reactions simulator') },
  ],

  // ── Audience modules ────────────────────────────────────────────────────
  teachers: photo(
    'Real photo: a teacher using SOYL in a pilot classroom (consent on file)',
    'A teacher using SOYL with a class'
  ),
  schools: photo(
    'Real photo: a pilot school classroom or staff training session (consent on file)',
    'A SOYL pilot session at a partner school'
  ),
  // 4:3 crop so it lines up with the two photos beside it.
  parents: {
    brief: 'Parent view: a child’s progress and teacher feedback (4:3 crop)',
    alt: 'The SOYL parent view, showing a child’s progress and teacher feedback',
    width: 1200,
    height: 900,
  },

  // ── Future Builders ─────────────────────────────────────────────────────
  futureBuildersHero: photo(
    'Real photo: Future Builders students building with the ESP32 kit (consent on file)',
    'Future Builders students wiring an ESP32 circuit'
  ),
  futureBuildersDemoDay: photo(
    'Real photo: a Future Builders Demo Day pitch (consent on file)',
    'A Future Builders team presenting at Demo Day'
  ),
} satisfies Record<string, MediaSlot | Array<MediaSlot & { subject: string; title: string }>>;
