import type { ImageKey } from '@/content/images';
import type { Ink } from '@/components/brush/marks';

/**
 * /students copy (ADR-034): second person, for pupils aged 11–17. Warm, plain, never childish. British English.
 * The Thoughtprints shown are examples and are labelled so.
 */

export const hero = {
  label: 'For pupils',
  title: 'This is your story. Not your score.',
  intro: 'No list of questions. One scene, your own path, and a guide who asks good questions but never gives you the answer.',
} as const;

export const stops: { title: string; line: string; image: ImageKey; ink: Ink; note?: string }[] = [
  {
    title: 'You arrive in a scene.',
    line: 'Not question 1 of 20. A lab bench, a street in 1857, a conversation. You’re in it.',
    image: 'classroomMaking',
    ink: 'ochre',
    note: 'no list of questions',
  },
  {
    title: 'You build.',
    line: 'Turn the dials. Make the choices. Solve it on paper and snap a photo. It’s your path, not everyone’s.',
    image: 'handsSquaredPaper',
    ink: 'ultramarine',
    note: 'say it · type it · snap it',
  },
  {
    title: 'You defend it.',
    line: 'The guide asks why, and you explain it your way. This is the part a pasted answer can’t do.',
    image: 'heroCollab',
    ink: 'vermilion',
  },
  {
    title: 'You fix it.',
    line: 'One new case on the same idea. Stuck? The step gets smaller. The answer never just appears.',
    image: 'studentsBuilding',
    ink: 'sap',
    note: 'not even if you ask nicely',
  },
  {
    title: 'You look back.',
    line: 'How sure were you? What would you change? Ten seconds, then you’re done.',
    image: 'pupilsReading',
    ink: 'ochre',
  },
  {
    title: 'Your Story grows.',
    line: 'You leave with a Thoughtprint: what you can now do, and how you got there. Each one adds a page to your Story.',
    image: 'groupOnGrass',
    ink: 'ultramarine',
  },
];

/** The quiz furniture a mission doesn't have. */
export const struck = ['Question 7 of 20', '04:59 left', 'Score: 60%', 'Hint: the answer is B'] as const;

/** A few pages of an example Story. */
export const story: { subject: string; when: string; can: string; seed: number }[] = [
  { subject: 'Electricity', when: 'November', can: 'Work out units from power and time.', seed: 52 },
  { subject: 'Coordinates', when: 'December', can: 'Plot any point, across before up.', seed: 31 },
  { subject: '1857', when: 'January', can: 'Weigh two accounts of the same day.', seed: 77 },
];
