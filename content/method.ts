/**
 * How missions work (/method), from the SOYL Missions product spec v1.2 (ADR-033), told as the life of one mission
 * (ADR-034): a Class 8 electricity mission, from the teacher's outcomes to the recheck a week later.
 * `pillars` (the SOYL Method) is shared with the page's JSON-LD and llms-full.txt, so the copy never drifts.
 * British English, sentence case, pupils not users. Ira and Ms Rao are illustrative, and labelled as such.
 */
import type { ImageKey } from '@/content/images';

export interface Pillar {
  num: string;
  name: string;
  tagline: string;
  content: string[];
  traditional: string;
  soyl: string;
}

/** The SOYL Method, in its order. Each pillar happens inside a mission stage. */
export const pillars: Pillar[] = [
  {
    num: '01',
    name: 'Understand',
    tagline: 'Know more than the answer.',
    content: ['Happens in Spark: a short prediction or a worked solution to check, always followed by “why?”, finds where a pupil starts before anything is taught.'],
    traditional: 'Read chapter 4 and answer the ten questions at the end.',
    soyl: 'Predict what the circuit will do, then say why.',
  },
  {
    num: '02',
    name: 'Apply',
    tagline: 'Use it in a new situation.',
    content: ['Happens in Build and again in Fix: the real work on the simulator, in the story or on paper, then one new case on the same idea.'],
    traditional: 'Solve these twenty similar equations.',
    soyl: 'Change one variable at a time on the simulator and record what happens.',
  },
  {
    num: '03',
    name: 'Create',
    tagline: 'Make something with it.',
    content: ['Happens in Build: pupils tell the story, run the experiment or solve the problem their own way.'],
    traditional: 'Write a five-paragraph essay on the causes of 1857.',
    soyl: 'Arrive in 1857 Meerut, make choices and live with their consequences.',
  },
  {
    num: '04',
    name: 'Defend',
    tagline: 'Explain why, not just what.',
    content: ['Happens in Defend: a live follow-up aimed at this pupil’s gap. It is the part a generated answer cannot fake.'],
    traditional: 'Select the correct multiple-choice answer.',
    soyl: 'Explain to the guide why the result surprised you.',
  },
  {
    num: '05',
    name: 'Reflect',
    tagline: 'Look again. Do it better.',
    content: ['Happens in Reflect: how sure are you, and what would you do differently? Confidence is compared with what the pupil actually did.'],
    traditional: 'Receive a mark and move on to the next unit.',
    soyl: 'Rate your confidence and name one thing you would change.',
  },
];

export type StageInk = 'ochre' | 'ultramarine' | 'vermilion' | 'sap';

export const hero = {
  label: 'How missions work',
  title: 'The life of one mission.',
  intro:
    'Class 8, electricity. One heater bill, one hour, a different path for every pupil. Follow it from the teacher’s first outcome to the recheck a week later.',
  ticket: {
    tag: 'Mission · Science · Class 8',
    scene: 'The school’s heater bill doubled this winter. Find out why.',
  },
  note: 'An illustrative story. Ira and Ms Rao are not real people.',
} as const;

/** Chapter 1: outcomes in, a brief to approve. */
export const brief = {
  when: 'Friday · 10 minutes',
  title: 'Ms Rao sets outcomes, not questions.',
  line: 'She picks the class, the chapter and what pupils should be able to do. SOYL drafts the mission and a one-page brief. Nothing reaches a pupil until she signs it.',
  outcomes: ['Tell power (kW) from energy (kWh)', 'Work out the units used from power and time', 'Explain why a bill goes up'],
  listensFor: '“A bigger heater uses the electricity up faster.”',
  approvedBy: 'Ms Rao',
} as const;

/** Chapter 2: the hour, one sheet of the pad per stage. */
export const sheets: {
  name: string;
  method: string;
  ink: StageInk;
  image: ImageKey;
  minute: number;
  does: string;
  captured: string;
  rule: string;
}[] = [
  {
    name: 'Spark',
    method: 'Understand',
    ink: 'ochre',
    image: 'magnifier',
    minute: 2,
    does: 'Ira predicts: a 2 kW heater for 3 hours uses 2 units. The guide asks why.',
    captured: 'where she starts',
    rule: 'Prediction first. Nothing is taught yet.',
  },
  {
    name: 'Build',
    method: 'Apply · Create',
    ink: 'ultramarine',
    image: 'handsBreadboard',
    minute: 12,
    does: 'She runs the heater on the simulator, doubles the time and watches the meter.',
    captured: 'every attempt, and how she got there',
    rule: 'Say it, type it, or snap your notebook.',
  },
  {
    name: 'Defend',
    method: 'Defend',
    ink: 'vermilion',
    image: 'studentsDebating',
    minute: 27,
    does: '“Why did the units double when the heater didn’t change?” She explains it in her own words.',
    captured: 'depth of reasoning',
    rule: 'The part a pasted answer can’t fake.',
  },
  {
    name: 'Fix',
    method: 'Apply, somewhere new',
    ink: 'sap',
    image: 'boyWriting',
    minute: 36,
    does: 'A new case: a geyser in another home. Same idea, new numbers. This time she has it.',
    captured: 'the gain inside the hour',
    rule: 'Stuck twice? The step gets smaller.',
  },
  {
    name: 'Reflect',
    method: 'Reflect',
    ink: 'ochre',
    image: 'studentThinking',
    minute: 44,
    does: '“How sure are you?” Fairly. “What would you change?” Check the hours first.',
    captured: 'how well she knows what she knows',
    rule: 'Ten seconds. No score at the end.',
  },
];

export type Subject = 'Science' | 'English' | 'History' | 'Maths';

/** The same five stages in four subjects: the medium changes, the diagnosis does not. */
export const subjects: { name: Subject; medium: string; does: [string, string, string, string, string] }[] = [
  {
    name: 'Science',
    medium: 'A real lab bench',
    does: ['Predict what the simulation will do.', 'Change one variable at a time.', 'Explain why the result surprised you.', 'One new case on the simulator.', 'How sure are you?'],
  },
  {
    name: 'English',
    medium: 'Their own voice',
    does: ['Read aloud for thirty seconds.', 'Retell, persuade, describe.', 'Answer a live follow-up.', 'Re-say the weak lines.', 'How sure are you?'],
  },
  {
    name: 'History',
    medium: 'A story with choices',
    does: ['“You arrive in 1857…”', 'Make choices, face the consequences.', 'Justify your choice to a rival.', 'Mend a broken timeline.', 'How sure are you?'],
  },
  {
    name: 'Maths',
    medium: 'Their own notebook',
    does: ['Spot the error in a worked solution.', 'Solve on paper, upload a photo.', 'Talk through your method.', 'Same idea, new numbers.', 'How sure are you?'],
  },
];

/** Chapter 4: what Ira leaves with. */
export const thoughtprint = {
  title: 'Ira leaves with a Thoughtprint, not a mark.',
  line: 'What she can now do, where her thinking turned, and what is still open. No two are alike.',
  canNow: 'Work out the units a heater uses from its power and the hours it runs.',
  turned: '“kW is how fast. kWh is how much.”',
  open: 'Reading the meter on a real bill.',
} as const;

/** Chapter 5: Monday. */
export const monday = {
  when: 'Monday · 8:10 am',
  title: 'Ms Rao reads three groups, not thirty-two worksheets.',
  line: 'The class arrives grouped by what pupils think, with each pupil’s own evidence and a suggested next move.',
  groups: [
    { name: 'Mix up kW and kWh', count: 9, move: 'Ten minutes on the simulator, then one check question.', ink: 'vermilion' },
    { name: 'Think current gets used up', count: 5, move: 'A two-bulb demo, then talk it through in pairs.', ink: 'ochre' },
    { name: 'Secure on every outcome', count: 14, move: 'A stretch case: a solar panel on the roof.', ink: 'sap' },
  ],
  needsYou: '4 pupils need a word with you',
} as const;

/** Chapter 6: a week later, then the Story. */
export const recheck = {
  when: 'The next Friday · 4 minutes',
  title: 'Did it stick?',
  line: 'A short recheck on the same misconceptions, cold. Each one comes back retained, partly retained or lost, and the next mission starts from whatever is still open.',
  states: [
    { label: 'Retained', ink: 'sap' },
    { label: 'Partly retained', ink: 'ochre' },
    { label: 'Lost', ink: 'vermilion' },
  ],
  story: 'Every Thoughtprint, in order, becomes the pupil’s Story.',
} as const;

/** The non-negotiables (spec v1.2), as a pledge. */
export const houseRules = [
  'No question counter.',
  'No countdown timer.',
  'Hints never give the answer.',
  'A teacher approves every mission.',
  'A mark is never the headline.',
  'Never more than 60 minutes.',
] as const;
