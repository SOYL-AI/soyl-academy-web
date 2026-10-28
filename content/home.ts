/**
 * Homepage copy, in page order. Every claim comes from what the product does
 * today (see the Oct 2026 brief); nothing here is a statistic or a quote.
 */

export const hero = {
  label: 'Assignments for Grades 1–10',
  headline: 'Homework was built for a world',
  highlight: 'before AI.',
  support:
    'SOYL turns your notes into interactive assignments that students work out for themselves, with hints that never give the answer. You approve every question, and see how each pupil got there.',
  secondary: { label: 'See how it works', href: '#how-it-works' },
  caption: 'Unlimited attempts. Every try is kept, so the teacher sees the path, not just the score.',
  points: ['You approve every question', 'Hints never give the answer', 'Every attempt is kept'],
} as const;

export const shift = {
  label: 'The shift',
  headline: 'Now change the assignment.',
  intro: 'Same topic, same class. One asks for an answer AI can write in seconds. The other asks students to do the thinking.',
  old: {
    subject: 'Science · Class 8',
    prompt: 'Write 500 words about renewable energy.',
  },
  soyl: {
    eyebrow: 'The energy challenge',
    prompt: 'Your school must cut its electricity use by 25%.',
    tasks: [
      { text: 'Choose three changes and estimate what each saves.', tag: 'Apply' },
      { text: 'Explain why they work.', tag: 'Understand' },
      { text: 'Defend one trade-off to the principal.', tag: 'Defend' },
    ],
  },
} as const;

export const method = {
  label: 'The SOYL Method',
  headline: 'Learning is a verb.',
  intro: 'Every SOYL assignment asks for at least one of five things a generated answer can’t fake.',
  steps: [
    { verb: 'Understand', line: 'Know more than the answer.' },
    { verb: 'Apply', line: 'Use it in a new situation.' },
    { verb: 'Create', line: 'Make something with it.' },
    { verb: 'Defend', line: 'Explain why, not just what.' },
    { verb: 'Reflect', line: 'Look again. Do it better.' },
  ],
} as const;

export const howItWorks = {
  label: 'How it works',
  headline: 'From notes to evidence.',
  intro: 'Start from what you already teach. SOYL drafts; you decide; students do the work; you see the thinking.',
  steps: [
    {
      title: 'Upload your notes',
      line: 'Start from the notes you already teach with. SOYL drafts interactive questions from them.',
      media: 'uploadNotes',
    },
    {
      title: 'You approve every question',
      line: 'Edit, reorder or reject. Nothing reaches students until you say so.',
      media: 'teacherApproves',
    },
    {
      title: 'Students work it out',
      line: 'Unlimited attempts and step-by-step hints that never give the answer away.',
      media: 'studentHints',
    },
    {
      title: 'See each pupil’s path',
      line: 'A class heatmap of attempts and hints shows who struggled, where, and who got there alone.',
      media: 'teacherHeatmap',
    },
  ],
} as const;

export const subjects = {
  label: 'Subjects and simulators',
  headline: 'Less busywork. More doing.',
  intro: 'Simulators for maths, physics and chemistry let students move things and see what happens, not just pick an option.',
} as const;

export const audiences = {
  label: 'Who it’s for',
  headline: 'One assignment, three people who care.',
  items: [
    {
      id: 'teachers',
      title: 'For teachers',
      line: 'Assignments from your own notes in minutes, and a clear view of how each pupil worked.',
      link: { label: 'How SOYL works for teachers', href: '/teachers' },
      image: 'teacherMentoring',
    },
    {
      id: 'schools',
      title: 'For schools',
      line: 'A ten-week pilot that fits your curriculum, with teachers in control from day one.',
      link: { label: 'Plan a pilot', href: '/schools' },
      image: 'classroomWide',
    },
    {
      id: 'parents',
      title: 'For parents',
      line: 'See your child’s progress and their teacher’s feedback, not just a mark.',
      link: { label: 'What parents see', href: '/parents' },
      image: 'studentThinking',
    },
  ],
} as const;

export const futureBuilders = {
  label: 'Future Builders · Grades 7–12',
  headline: 'Build a real product.',
  line: 'Alongside the school platform, we run a live online weekend cohort: software, AI, IoT robotics and entrepreneurship, ending with a Demo Day pitch.',
  link: { label: 'Explore Future Builders', href: '/future-builders' },
} as const;

export const journalTeaser = {
  label: 'The SOYL Journal',
  headline: 'Ideas about learning after AI.',
  link: { label: 'All essays', href: '/journal' },
} as const;

export const belief = {
  first: 'We don’t want students to stop using AI.',
  second: 'We want learning that still requires them to think.',
} as const;

export const finalCta = {
  headline: 'Build learning worth doing.',
  line: 'We’ll walk you through SOYL, answer your questions and talk through a pilot for your school.',
} as const;
