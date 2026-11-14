/**
 * The home page's story (ADR-034): one pupil, one mission, told in chapters. Ira and Ms Rao are illustrative
 * characters, not real people, and the page says so. Nothing here is a statistic, a testimonial or a real pupil's
 * words. The mission, the stages and the rules come from the SOYL Missions product spec v1.2. British English,
 * "pupils", sentence case.
 */

export const prologue = {
  eyebrow: 'Story of Your Life',
  lines: ['Every pupil has a story.', 'Homework only kept the score.'],
  support:
    'SOYL turns homework into missions: one scene, five stages, and a Thoughtprint that shows how each pupil thinks, not just what they scored.',
  disclaimer: 'Ira and Ms Rao are an illustrative story.',
  note: 'Ira, Class 8. Tuesday night.',
  cue: 'Turn the page',
} as const;

export const tuesday = {
  chapter: 'Tuesday',
  time: 'Tuesday, 9:40 pm',
  lines: [
    'Ira has twenty questions to finish before bed.',
    'She knows the trick: copy the method, change the numbers.',
    'On Friday the score comes back. Seven out of ten.',
    'Which three did she get wrong? Why? Nobody will ever know. Not Ms Rao. Not even Ira.',
  ],
  sheet: {
    subject: 'Science · Class 8',
    kind: 'Homework',
    questions: [
      'Define electric power.',
      'State the SI unit of energy.',
      'A 2 kW heater runs for 3 hours. Find the energy used.',
      'Convert 5 kWh into joules.',
    ],
    score: '7/10',
  },
} as const;

export const wednesday = {
  chapter: 'Wednesday',
  time: 'Wednesday',
  headline: 'The next week, Ms Rao sets a mission instead.',
  line: 'One scene. Ira’s own path through it. About 45 minutes, and no list of questions.',
  mission: {
    tag: 'Mission · Science, Class 8',
    scene: 'The school’s heater bill doubled this winter. Find out why.',
    approved: 'Approved by Ms Rao',
    outcomes: ['Power vs energy', 'kWh on a bill', 'Explain it to someone else'],
  },
} as const;

export const hour = {
  chapter: 'The hour',
  headline: 'One hour. Five stages.',
  intro: 'Every mission moves the same way, so every pupil’s thinking can be read the same way.',
  stages: [
    {
      name: 'Spark',
      ink: 'ochre',
      line: 'Ira predicts what will happen to the bill if the heater runs twice as long.',
      thought: '“The heater uses up the electricity?”',
      captured: 'Her starting idea',
      image: 'studentThinking',
    },
    {
      name: 'Build',
      ink: 'ultramarine',
      line: 'She runs the simulator, changing one thing at a time: power, then hours.',
      thought: 'Twice the hours, twice the units.',
      captured: 'Every attempt, in order',
      image: 'studentsBuilding',
    },
    {
      name: 'Defend',
      ink: 'vermilion',
      line: 'The guide asks her why. She explains it out loud, in her own words.',
      thought: '“kW is how fast. kWh is how much.”',
      captured: 'Her reasoning, in her voice',
      image: 'studentsDebating',
    },
    {
      name: 'Fix',
      ink: 'sap',
      line: 'A new case: a 1.5 kW geyser. She gets it wrong, then right.',
      thought: 'Power × hours. Again.',
      captured: 'What she fixed, inside the hour',
      image: 'studentsPresenting',
    },
    {
      name: 'Reflect',
      ink: 'graphite',
      line: 'How sure is she now? What would she tell her younger self?',
      thought: 'Sure. Mostly.',
      captured: 'How well she knows what she knows',
      image: 'heroCollab',
    },
  ],
  rules: ['No question counter', 'No countdown', 'Hints never give the answer'],
} as const;

export const thoughtprint = {
  chapter: 'Thoughtprint',
  headline: 'She leaves with a Thoughtprint, not a mark.',
  line: 'What Ira can now do, and how her thinking got there. Like a fingerprint, no two are alike.',
  notes: [
    { at: 1, text: 'Where she started: “the heater uses up the electricity”' },
    { at: 2, text: 'The turning point: power is how fast, energy is how much' },
    { at: 3, text: 'Can now: explain why 2 kW for 3 hours is 6 units' },
  ],
  never: 'No mark. No percentage. Ever.',
} as const;

export const monday = {
  chapter: 'Monday',
  time: 'Monday, 8:10 am',
  lines: [
    'Ms Rao doesn’t mark 32 worksheets.',
    'SOYL has read every Thoughtprint, and grouped the class by what they think, not what they scored.',
    'Three groups, three next moves. She is ready before the bell.',
  ],
  groups: [
    { name: 'Mixes up power and energy', count: 9, move: '10-minute demo on the simulator, then one check question', ink: 'vermilion' },
    { name: 'Thinks current gets used up', count: 6, move: 'Pair them with a circuit and a bulb', ink: 'ochre' },
    { name: 'Needs you', count: 2, move: 'Five minutes, one to one', ink: 'ultramarine' },
    { name: 'Secure', count: 15, move: 'A stretch mission', ink: 'sap' },
  ],
  label: 'Example class · 32 pupils',
} as const;

export const recheck = {
  chapter: 'Seven days',
  time: 'Seven days later',
  headline: 'Did it stick?',
  line: 'A five-minute recheck, cold. Ira explains the heater bill again, without help. It stuck.',
  before: 'Mixes up power and energy',
  after: 'Secure',
} as const;

export const story = {
  chapter: 'The Story',
  time: 'By March',
  headline: 'Every Thoughtprint becomes a page of her Story.',
  line: 'Twenty-four missions later, Ira, her teachers and her parents can read how she learns: what she can do, and how she got there.',
  brand: 'Story of Your Life.',
  pages: [
    { subject: 'Science', title: 'Power and energy', month: 'Nov', seed: 41 },
    { subject: 'English', title: 'Persuade the council', month: 'Nov', seed: 7 },
    { subject: 'History', title: 'Delhi, 1857', month: 'Dec', seed: 88 },
    { subject: 'Maths', title: 'The fair share', month: 'Dec', seed: 23 },
    { subject: 'Science', title: 'Why the bulb dims', month: 'Jan', seed: 61 },
    { subject: 'Geography', title: 'Where the river floods', month: 'Feb', seed: 15 },
    { subject: 'Maths', title: 'Plans for a park', month: 'Feb', seed: 92 },
    { subject: 'English', title: 'A letter that lands', month: 'Mar', seed: 34 },
  ],
} as const;

export const promises = {
  heading: 'Our house rules',
  intro: 'Written into every mission, for every pupil.',
  rules: [
    'No question counter.',
    'No countdown timer.',
    'Hints never give the answer.',
    'A teacher approves every mission.',
    'A mark is never the headline.',
    'Never more than 60 minutes.',
  ],
  signed: 'SOYL',
} as const;

export const audiences = {
  heading: 'The same story, read four ways',
  items: [
    { title: 'School leaders', line: 'A ten-week pilot, planned with your teachers.', href: '/schools', image: 'classroomWide', ink: 'ultramarine' },
    { title: 'Teachers', line: 'Outcomes in. Monday sorted.', href: '/teachers', image: 'teacherMentoring', ink: 'vermilion' },
    { title: 'Parents', line: 'A Thoughtprint after every mission.', href: '/parents', image: 'studentsPresenting', ink: 'ochre' },
    { title: 'Pupils', line: 'Your path. Your thinking. Your Story.', href: '/students', image: 'studentsBuilding', ink: 'sap' },
  ],
} as const;

export const epilogue = {
  headline: 'Every story starts with one mission.',
  line: 'See a mission from both sides, and leave with a ten-week pilot plan for your school.',
} as const;
