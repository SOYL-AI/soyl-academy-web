/**
 * How missions work (/method), from the SOYL Missions product spec v1.2 (ADR-033).
 * `pillars` (the SOYL Method) is shared with the page's JSON-LD and llms-full.txt, so the copy never drifts.
 * British English, sentence case, pupils not users. Any pupil words are examples and are labelled as such.
 */

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

/** The five mission stages, with the SOYL Method demonstration each one carries. */
export const stages: { name: string; method: string; pupil: string; soyl: string; measure: string; ink: StageInk }[] = [
  {
    name: 'Spark',
    method: 'Understand',
    pupil: 'A short, intriguing prompt inside the scene. Predict, spot the error, read aloud. Then: why?',
    soyl: 'Finds the starting misconception, if there is one.',
    measure: 'the starting point',
    ink: 'ochre',
  },
  {
    name: 'Build',
    method: 'Apply · Create',
    pupil: 'The real work: the simulator, the story, the conversation, the notebook.',
    soyl: 'Records every action, attempt and hint, and adapts the path as it goes.',
    measure: 'attempts, process, time',
    ink: 'ultramarine',
  },
  {
    name: 'Defend',
    method: 'Defend',
    pupil: 'The guide asks one or two questions aimed at what this pupil got wrong, or nearly right.',
    soyl: 'Scores the depth of reasoning against a rubric.',
    measure: 'depth of reasoning',
    ink: 'vermilion',
  },
  {
    name: 'Fix',
    method: 'Apply, somewhere new',
    pupil: 'One new situation on the same idea. It feels like the next part of the story, not a retest.',
    soyl: 'Checks the same misconception as Spark: the gain inside the hour.',
    measure: 'learning gain',
    ink: 'sap',
  },
  {
    name: 'Reflect',
    method: 'Reflect',
    pupil: 'How sure are you? What would you do differently? Ten seconds.',
    soyl: 'Compares confidence with performance.',
    measure: 'self-awareness',
    ink: 'ochre',
  },
];

export type MediumIcon = 'voice' | 'type' | 'paper' | 'sim';

/** How pupils can work: they choose wherever the skill allows. */
export const media: { icon: MediumIcon; title: string; line: string }[] = [
  { icon: 'voice', title: 'Say it', line: 'Oral answers, reading aloud, and every Defend answer.' },
  { icon: 'type', title: 'Type it', line: 'Short and long written answers.' },
  { icon: 'paper', title: 'Snap your notebook', line: 'Write on paper, upload a photo. Paper time is not screen time.' },
  { icon: 'sim', title: 'Run the apparatus', line: 'Every dial turned and every reading taken counts.' },
];

/** The engine's rules, in plain words. */
export const rules: { title: string; line: string }[] = [
  { title: 'No fixed length', line: 'A mission ends when every outcome has two pieces of evidence that agree, not after a set number of questions.' },
  { title: 'Stuck is fine', line: 'After two tries that go nowhere, the guide makes the step smaller. After three, it moves on and tells the teacher.' },
  { title: 'Pause any time', line: 'Pupils can leave and come back. Only active time counts.' },
];

/** The quiet clock (never shown to pupils), in minutes. */
export const timeline: { at: number; label: string }[] = [
  { at: 0, label: 'A Spark for each outcome' },
  { at: 40, label: 'Starts closing: Fix and Reflect' },
  { at: 45, label: 'Most missions end around here' },
  { at: 55, label: 'Straight to Reflect' },
  { at: 60, label: 'Ends and saves' },
];

export const guide = {
  does: [
    'Asks short questions, 25 words or fewer',
    'Names what it noticed: “You changed the voltage, not the time.”',
    'Praises reasoning, not speed',
    'Offers a choice: say it, type it, or snap your notebook',
    'Stays quiet while the pupil works',
  ],
  never: [
    'Gives the answer, even when asked',
    'Announces scores, ranks or “correct!”',
    'Counts down time or nags',
    'Asks anything outside what the teacher approved',
    'Uses sarcasm or shame',
  ],
};

export const bench = {
  points: [
    { title: 'Real apparatus', line: 'Cells, wires, bulbs, burners and meters you drag, connect and switch.' },
    { title: 'Readings on the instruments', line: 'The needle moves and the bulb glows. No paragraphs of text.' },
    { title: 'A lab notebook', line: 'Aim, prediction, readings and conclusion. One tap records a reading; the graph draws itself.' },
  ],
};

export const after: { title: string; line: string; ink: StageInk }[] = [
  { title: 'Thoughtprint', line: 'What the pupil can now do, where their thinking turned, and what was fixed. Never a mark as the headline.', ink: 'ultramarine' },
  { title: '7-day recheck', line: 'Three to five minutes on the same misconceptions, a week later: retained, partly retained or lost.', ink: 'vermilion' },
  { title: 'Story', line: 'Every Thoughtprint over time. The next mission starts from what is still open.', ink: 'sap' },
];
