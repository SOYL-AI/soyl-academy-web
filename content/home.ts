/**
 * Homepage copy. Kept in one place so the "less text" budget is auditable:
 * headlines ≤ 8 words, supporting lines ≤ 2 short sentences.
 * Deeper explanation lives on /method, /schools, /students and /what-we-teach.
 */

export const hero = {
  headline: ['Homework', 'was', 'built', 'for', 'a', 'world'],
  highlight: 'before AI.',
  support: 'AI can generate answers. SOYL creates assignments where students still have to think.',
} as const;

export const problem = {
  prompt: 'Write 500 words about renewable energy.',
  chain: ['Prompt', 'AI', 'Answer', 'Submit', 'A+'],
  line1: 'Everything looks complete.',
  line2: 'Except the learning.',
} as const;

export const method = {
  eyebrow: 'The SOYL Method',
  headline: 'Learning is a verb.',
  steps: [
    { id: 'understand', verb: 'Understand', line: 'Know more than the answer.' },
    { id: 'apply', verb: 'Apply', line: 'Use it in a new situation.' },
    { id: 'create', verb: 'Create', line: 'Make something with it.' },
    { id: 'defend', verb: 'Defend', line: 'Explain why, not just what.' },
    { id: 'reflect', verb: 'Reflect', line: 'Look again. Do it better.' },
  ],
} as const;

/**
 * The product walkthrough. The interface shown on the site is an
 * *illustration* of the intended workflow (all names and content are invented
 * for demonstration) — see docs/homepage-redesign.md.
 */
export const productFlow = {
  eyebrow: 'How it works',
  headline: 'From notes to evidence.',
  steps: [
    { id: 'upload', label: 'Upload notes', line: 'Start with what you already teach.' },
    { id: 'outcome', label: 'Choose the outcome', line: 'Decide what students should be able to do.' },
    { id: 'generate', label: 'SOYL drafts it', line: 'You review and shape the assignment.' },
    { id: 'adapt', label: 'It adapts', line: 'Same outcome. Context that fits each student.' },
    { id: 'student', label: 'Students do the work', line: 'They choose, explain and defend.' },
    { id: 'evidence', label: 'See understanding', line: 'Evidence of thinking, not just a file.' },
  ],
} as const;

export const subjects = {
  eyebrow: 'Subjects',
  headline: 'Less busywork. More doing.',
  support: 'A glimpse of where SOYL assignments are going.',
  tag: 'Concept preview',
  items: [
    { id: 'chemistry', name: 'Chemistry', line: 'Mix compounds. Watch what happens.' },
    { id: 'physics', name: 'Physics', line: 'Push, swing and test forces.' },
    { id: 'english', name: 'English', line: 'Speak it. Explain it. Say it better.' },
    { id: 'biology', name: 'Biology', line: 'Explore living systems from the inside.' },
    { id: 'maths', name: 'Mathematics', line: 'Move the numbers. See the shape.' },
  ],
} as const;

export const audiences = {
  headline: 'Change what homework means.',
  items: [
    {
      id: 'teachers',
      label: 'For Teachers',
      line: 'Create better assignments in minutes.',
      // There is no dedicated teachers page yet; the teacher workflow lives on /schools.
      href: '/schools',
      image: '/images/teacher_mentoring.jpg',
      alt: 'A teacher crouched beside a group of students, asking a question about their work',
    },
    {
      id: 'students',
      label: 'For Students',
      line: 'Learn by doing, not submitting.',
      href: '/students',
      image: '/images/student_thinking_portrait.jpg',
      alt: 'A student pausing mid-thought over her notebook',
    },
    {
      id: 'schools',
      label: 'For Schools',
      line: 'Make thinking visible across classrooms.',
      href: '/schools',
      image: '/images/classroom_wide_making.jpg',
      alt: 'A wide view of a classroom where students are making and building',
    },
  ],
} as const;

export const manifesto = {
  first: "We don't want students to stop using AI.",
  second: 'We want learning that still requires them to think.',
  closing: 'Thinking is the work.',
} as const;

export const finalCta = {
  headline: 'Build learning worth doing.',
  primary: { label: 'Bring SOYL to your school', href: '/contact' },
  secondary: { label: 'Explore SOYL', href: '/method' },
} as const;
