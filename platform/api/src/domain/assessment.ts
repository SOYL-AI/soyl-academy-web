/**
 * Formative-only chapters and topics (backend-api M5). The catalog seed stores the syllabus flag
 * `board_assessed` on chapters and topics (platform/catalog/<board>/<class>/<subject>/syllabus.yaml,
 * `npm run db -- seed catalog`). The web labels anything with `boardAssessed: false` "School
 * assessment only — not in the board exam"; `schoolAssessment` says which kind, so the label can be
 * more precise ("Periodic assessment only", "Project work", "Practical").
 *
 * A topic inside a school-only chapter is school-only too (effective flag). The kind is read from the
 * curriculum's own wording in the chapter/topic title and syllabus unit ("(periodic assessment
 * only)", "(interdisciplinary project only)", "Practical: …", "(formative assessment only)",
 * "internal assessment", "non-evaluative"); anything else school-only is `internal`.
 */
export const SCHOOL_ASSESSMENT_KINDS = ['periodic', 'project', 'practical', 'internal'] as const;
export type SchoolAssessmentKind = (typeof SCHOOL_ASSESSMENT_KINDS)[number];

export function schoolAssessmentKind(boardAssessed: boolean, ...texts: (string | null | undefined)[]): SchoolAssessmentKind | null {
  if (boardAssessed) return null;
  const text = texts.filter(Boolean).join(' ').toLowerCase();
  if (/\bperiodic\b/.test(text)) return 'periodic';
  if (/\bprojects?\b/.test(text)) return 'project';
  if (/\bpracticals?\b/.test(text)) return 'practical';
  return 'internal';
}

/** Effective flags for a topic of a chapter: a school-only chapter makes every topic school-only. */
export function topicAssessment(chapter: { boardAssessed: boolean; title: string; unit: string | null }, topic: { boardAssessed: boolean; title: string }) {
  const boardAssessed = chapter.boardAssessed && topic.boardAssessed;
  const chapterText = chapter.boardAssessed ? [] : [chapter.title, chapter.unit];
  return { boardAssessed, schoolAssessment: schoolAssessmentKind(boardAssessed, ...(topic.boardAssessed ? [] : [topic.title]), ...chapterText) };
}
