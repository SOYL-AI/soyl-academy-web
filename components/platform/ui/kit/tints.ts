/**
 * Tint family of design language v3 (ADR-032): pastel fills (`--p-tint-<name>`) with a matching strong hue
 * (`--p-tint-<name>-ink`) for icons and short labels. AA-tested in both themes (kit.test.tsx). Colour is never the
 * only cue: the subject or study mode is always written next to it. No imports: server, client and tests use it.
 */
import type { IconName } from './Icon';

export const TINT_NAMES = ['blue', 'violet', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'neutral'] as const;
export type Tint = (typeof TINT_NAMES)[number];

export function isTint(value: unknown): value is Tint {
  return typeof value === 'string' && (TINT_NAMES as readonly string[]).includes(value);
}

/**
 * The tint for a subject. Accepts the course pages' `SubjectHue` (components/platform/learn/subject-style.ts:
 * blue | red | yellow | green | violet | teal, all valid tints) or a subject-art kind (`maths`, `hindi` …), so one
 * subject looks the same on every page.
 */
const KIND_TINTS: Record<string, Tint> = {
  maths: 'blue',
  science: 'green',
  physics: 'violet',
  chemistry: 'teal',
  biology: 'green',
  history: 'orange',
  geography: 'teal',
  civics: 'yellow',
  economics: 'yellow',
  social: 'orange',
  english: 'pink',
  hindi: 'red',
  sanskrit: 'yellow',
  computer: 'violet',
  generic: 'neutral',
};

export function subjectTint(hueOrKind: string | null | undefined): Tint {
  if (!hueOrKind) return 'neutral';
  if (isTint(hueOrKind)) return hueOrKind;
  return KIND_TINTS[hueOrKind] ?? 'neutral';
}

/** The five study modes of a chapter (CONTEXT §8) and the Tests hub: one tint, one icon, one name each. */
export type StudyMode = 'lesson' | 'notes' | 'flashcards' | 'practice' | 'tests';
export const STUDY_MODES: Record<StudyMode, { label: string; icon: IconName; tint: Tint }> = {
  lesson: { label: 'Lesson', icon: 'play', tint: 'blue' },
  notes: { label: 'Notes', icon: 'book', tint: 'yellow' },
  flashcards: { label: 'Flashcards', icon: 'layers', tint: 'violet' },
  practice: { label: 'Practice', icon: 'target', tint: 'green' },
  tests: { label: 'Tests', icon: 'clock', tint: 'pink' },
};
