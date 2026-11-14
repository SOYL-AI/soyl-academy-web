/**
 * Homepage copy, in page order (ADR-033, Nov 2026): the shift from assignments to missions, from the SOYL Missions
 * product spec v1.2 (11 Nov 2026). British English, sentence case, pupils not users. Nothing here is a statistic
 * or a quote from a real pupil: every Thoughtprint and Monday-screen detail on the page is labelled as an example.
 */

export const hero = {
  label: 'Missions, not assignments',
  before: 'From',
  struck: 'assignments',
  to: 'to',
  word: 'missions.',
  support:
    'One scene instead of a list of questions. Every pupil takes their own path, defends their thinking, and leaves with a Thoughtprint, not a mark.',
  secondary: { label: 'Walk through a mission', href: '#the-hour' },
  note: 'A Thoughtprint, drawn fresh for this visit. No two are alike.',
} as const;

/** The three renames on the spec's cover. */
export const renames = [
  { old: 'Assignment', now: 'Mission', line: 'One scene, about 45 minutes, a different path for every pupil.' },
  { old: 'Evidence card', now: 'Thoughtprint', line: 'What a pupil can now do, and how they got there.' },
  { old: 'Learning record', now: 'Story', line: 'Every Thoughtprint over time. Story of Your Life.' },
] as const;

export const shift = {
  label: 'The shift',
  headline: 'A worksheet asks for answers. A mission asks for thinking.',
  worksheet: {
    subject: 'Science · Class 8',
    kind: 'Homework',
    counter: 'Q3 of 10',
    timer: '04:59 left',
    question: 'Define electric power. (2 marks)',
    score: 'Score 7/10',
  },
  corrections: {
    counter: 'no question counters',
    timer: 'no countdown timers',
    score: 'never the headline',
  },
  mission: {
    tag: 'Mission · Electricity',
    scene: 'The school’s heater bill doubled this winter. Find out why.',
    guide: 'You changed the voltage, not the time. Try the other one.',
  },
  promises: [
    'Hints never give the answer.',
    'Speak it, type it, or snap your notebook.',
    'Never more than 60 minutes.',
    'Teachers approve every mission.',
  ],
} as const;

export type Subject = 'Science' | 'English' | 'History' | 'Maths';

export const hour = {
  label: 'The pupil’s hour',
  headline: 'Five stages. The medium changes with the subject.',
  intro: 'Every mission follows the same five stages, so the diagnosis works the same way everywhere. What changes is how the pupil works.',
  subjects: ['Science', 'English', 'History', 'Maths'] as Subject[],
  medium: {
    Science: 'A real lab bench: the circuit simulator.',
    English: 'Their own voice: speaking, retelling, persuading.',
    History: 'A story: choices, and their consequences.',
    Maths: 'Their notebook: solve on paper, upload a photo.',
  } as Record<Subject, string>,
  stages: [
    {
      name: 'Spark',
      method: 'Understand',
      measure: 'the starting misconception',
      does: {
        Science: 'Predict what the simulation will do.',
        English: 'Read aloud for thirty seconds.',
        History: '“You arrive in 1857…”',
        Maths: 'Spot the error in a worked solution.',
      },
    },
    {
      name: 'Build',
      method: 'Apply · Create',
      measure: 'attempts, process, time',
      does: {
        Science: 'Run the simulator. Change one variable at a time.',
        English: 'Speak: retell, persuade, describe.',
        History: 'Make choices and face the consequences.',
        Maths: 'Solve on paper, then upload a photo.',
      },
    },
    {
      name: 'Defend',
      method: 'Defend',
      measure: 'depth of reasoning',
      does: {
        Science: 'Explain why the result surprised you.',
        English: 'Answer a live follow-up.',
        History: 'Justify your choice to a rival.',
        Maths: 'Talk through your method.',
      },
    },
    {
      name: 'Fix',
      method: 'Apply, somewhere new',
      measure: 'gain inside the hour',
      does: {
        Science: 'One new case on the simulator.',
        English: 'Re-say the weak lines.',
        History: 'Mend a broken timeline.',
        Maths: 'Same idea, new numbers.',
      },
    },
    {
      name: 'Reflect',
      method: 'Reflect',
      measure: 'self-awareness',
      does: {
        Science: 'How sure are you? What would you change?',
        English: 'How sure are you? What would you change?',
        History: 'How sure are you? What would you change?',
        Maths: 'How sure are you? What would you change?',
      },
    },
  ],
  footnote: 'No timer, no question counter, no running score. The mission ends when the evidence is in, usually around 45 minutes.',
  guide: 'Asks, points and narrows. Never gives the answer.',
} as const;

export const thoughtprint = {
  label: 'Thoughtprint',
  headline: 'Pupils leave with a Thoughtprint, not a mark.',
  intro: 'Like a fingerprint, no two are the same. It shows what a pupil can now do, and where their thinking turned.',
  example: {
    pupil: 'Example · Class 8 · Electricity',
    canNow: 'Explain why a 2 kW heater running for 3 hours uses 6 units.',
    turned: '“Oh. kW is how fast it uses energy, kWh is how much it used.”',
    fixed: 'Mixed up power and energy at the start. Secure by the end of the hour.',
    next: 'A five-minute recheck in seven days.',
  },
  note: 'No mark. No percentage. Ever.',
} as const;

export const monday = {
  label: 'For teachers',
  headline: 'Groups and next moves, not marks.',
  intro:
    'Teachers set outcomes, not questions, and approve every mission before a pupil sees it. On Monday, the class is grouped by misconception, with each pupil’s own evidence and a suggested next move.',
  steps: ['Set the outcomes', 'Read the brief, approve', 'Act on Monday’s groups'],
  screen: {
    title: 'Needs attention',
    context: 'Electricity · Class 8B',
    groups: [
      {
        count: 9,
        name: 'Mixes up power and energy',
        detail: 'kW and kWh',
        evidence: ['Voice clip · 0:14', 'Photo of working', '“3 kW for 2 hours is 1.5 units”'],
        move: 'A 10-minute demo with the circuit simulator, then one check question.',
      },
      { count: 5, name: 'Thinks current is used up in a bulb', detail: 'series circuits' },
    ],
    needsYou: '2 pupils need you',
    secure: '14 pupils secure on every outcome',
  },
} as const;

export const loop = {
  label: 'The loop',
  headline: 'Every mission feeds the next one.',
  steps: [
    { title: 'Set outcomes', by: 'Teacher' },
    { title: 'The pupil’s hour', by: 'Pupil' },
    { title: 'Diagnosis, with evidence', by: 'SOYL' },
    { title: 'Monday’s next moves', by: 'Teacher' },
    { title: '7-day recheck', by: 'Pupil' },
    { title: 'Their Story grows', by: 'SOYL' },
  ],
  centre: 'Did it stick?',
} as const;

export const audiences = {
  label: 'Who it’s for',
  headline: 'Made for everyone around a pupil.',
  items: [
    { title: 'Schools', line: 'A ten-week pilot, planned with your teachers.', href: '/schools', ink: 'ultramarine' },
    { title: 'Teachers', line: 'Outcomes in, Monday sorted.', href: '/teachers', ink: 'vermilion' },
    { title: 'Parents', line: 'A Thoughtprint after every mission.', href: '/parents', ink: 'ochre' },
    { title: 'Pupils', line: 'Your path. Your thinking. Your Story.', href: '/students', ink: 'sap' },
  ],
} as const;

export const futureBuilders = {
  label: 'Future Builders · Grades 7–12',
  headline: 'Build a real product.',
  line: 'Our live online summer camp: software, AI, IoT robotics and entrepreneurship, ending with a Demo Day pitch.',
  link: { label: 'Explore Future Builders', href: '/future-builders' },
} as const;

export const finalCta = {
  headline: 'Bring missions to your school.',
  line: 'We’ll show you a mission from both sides, pupil and teacher, and plan a ten-week pilot with you.',
} as const;

/** The teacher flow, used on /teachers. */
export const howItWorks = {
  label: 'How it works',
  headline: 'Outcomes in. Thinking out.',
  intro: 'Start from what you want pupils to be able to do. SOYL drafts the mission; you decide; pupils do the thinking; you see it.',
  steps: [
    {
      title: 'Set the outcomes',
      line: 'Pick the class, the chapter and two to four outcomes. Upload your notes if you like.',
      media: 'uploadNotes',
    },
    {
      title: 'Read the brief, approve',
      line: 'Outcomes, what pupils will do, the misconceptions we will listen for, and every question on demand. Nothing reaches pupils until you approve.',
      media: 'teacherApproves',
    },
    {
      title: 'Pupils take their own path',
      line: 'One scene, five stages, hints that never give the answer. Each pupil’s path adapts to their thinking.',
      media: 'studentHints',
    },
    {
      title: 'Monday’s groups',
      line: 'Pupils grouped by misconception, each with their own evidence and a suggested next move to approve.',
      media: 'teacherHeatmap',
    },
  ],
} as const;
