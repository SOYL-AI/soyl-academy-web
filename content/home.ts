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

/** The before/after assignment toggle on /schools (components/home/Shift.tsx, AssignmentToggle.tsx). */
export const shift = {
  headline: 'Now change the assignment.',
  intro: 'Same topic, same class. One asks for an answer AI can write in seconds. The other asks students to do the thinking.',
  old: {
    subject: 'Science · Class 8',
    due: 'Due Monday',
    prompt: 'Write 500 words about renewable energy.',
    note: 'One prompt, one answer, one mark. A chatbot can write it in seconds, and the mark looks the same.',
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

/**
 * A checkpoint on the /method walk (components/method/MethodWalk.tsx). `pick`: the reader chooses which of the
 * pillar's two assignments (content/method.ts, `traditional` and `soyl`) does what the question asks; `order`
 * says which is shown first. `reflect`: the reader names the checkpoint that made them think hardest; any choice
 * completes it, because a reflection has no wrong answer.
 */
export type MethodCheckpoint =
  | { kind: 'pick'; ask: string; answer: 'traditional' | 'soyl'; order: readonly ['traditional', 'soyl'] | readonly ['soyl', 'traditional']; right: string; wrong: string }
  | { kind: 'reflect'; ask: string; done: string };

export interface MethodStep {
  verb: 'Understand' | 'Apply' | 'Create' | 'Defend' | 'Reflect';
  line: string;
  /** One plain sentence on why the verb shows learning, drawn from the pillar's text in content/method.ts. */
  why: string;
  checkpoint: MethodCheckpoint;
}

/** The five verbs of the SOYL Method: the list on /schools (Shift) and the walk on /method. */
export const method: { headline: string; intro: string; steps: readonly MethodStep[] } = {
  headline: 'Learning is a verb.',
  intro: 'Every SOYL assignment asks for at least one of five things a generated answer can’t fake.',
  steps: [
    {
      verb: 'Understand',
      line: 'Know more than the answer.',
      why: 'Understanding shows when a student can connect a new idea to something they already know, and say where their knowledge stops.',
      checkpoint: {
        kind: 'pick',
        ask: 'Which one shows that a student understands the idea?',
        answer: 'soyl',
        order: ['traditional', 'soyl'],
        right: 'Yes. An analogy only works if you can see how the idea is built. The ten answers are already printed in the chapter.',
        wrong: 'Not yet. Those ten answers are already printed in the chapter, so finding them shows reading. Look at the other one.',
      },
    },
    {
      verb: 'Apply',
      line: 'Use it in a new situation.',
      why: 'Taking an idea to a real problem shows the gap between the theory and the world. Working across that gap is where the learning happens.',
      checkpoint: {
        kind: 'pick',
        ask: 'Which one puts the idea to work in a new place?',
        answer: 'soyl',
        order: ['soyl', 'traditional'],
        right: 'Yes. Nobody has laid out this garden before, so the student has to decide how the maths fits it.',
        wrong: 'Not yet. Twenty similar equations repeat one move twenty times. Which one takes the idea somewhere new?',
      },
    },
    {
      verb: 'Create',
      line: 'Make something with it.',
      why: 'Making something new means pulling ideas together, choosing between options and finishing the piece.',
      checkpoint: {
        kind: 'pick',
        ask: 'Which one ends with something the student made and has to stand behind?',
        answer: 'soyl',
        order: ['traditional', 'soyl'],
        right: 'Yes. The diary entry is new, and it still has to be true to its time.',
        wrong: 'Not yet. A standard essay follows a set shape. Which one asks for something new?',
      },
    },
    {
      verb: 'Defend',
      line: 'Explain why, not just what.',
      why: 'If you cannot say why your answer works, you do not hold it yet. Defending means weighing the evidence and answering the hard question.',
      checkpoint: {
        kind: 'pick',
        ask: 'Which one could a chatbot do for the student?',
        answer: 'traditional',
        order: ['soyl', 'traditional'],
        right: 'Yes. A chatbot can pick an option. Only the student can stand up and answer questions about how they worked.',
        wrong: 'Not this one. Nobody else can stand in front of the class and answer for how the student worked. Look at the other one.',
      },
    },
    {
      verb: 'Reflect',
      line: 'Look again. Do it better.',
      why: 'Looking back at what worked, what failed and what to change is how students learn to learn.',
      checkpoint: {
        kind: 'reflect',
        ask: 'Look back. Which checkpoint made you think hardest?',
        done: 'That is a reflection: you looked back at your own work and named the hard part. A SOYL assignment asks one more thing, how you got past it.',
      },
    },
  ],
};

/**
 * How it works for a teacher (/teachers, components/home/HowItWorks.tsx). Text only: the screenshot slots in
 * content/media.ts have no real product images yet, so the page shows none.
 */
export const howItWorks = {
  headline: 'From notes to evidence.',
  intro: 'Start from what you already teach. SOYL drafts; you decide; students do the work; you see the thinking.',
  steps: [
    {
      title: 'Upload your notes',
      line: 'Start from the notes you already teach with. SOYL drafts interactive questions from them.',
    },
    {
      title: 'You approve every question',
      line: 'Edit, reorder or reject. Nothing reaches students until you say so.',
    },
    {
      title: 'Students work it out',
      line: 'Unlimited attempts and step-by-step hints that never give the answer away.',
    },
    {
      title: 'See each pupil’s path',
      line: 'A class heatmap of attempts and hints shows who struggled, where, and who got there alone.',
    },
  ],
} as const;

export const futureBuilders = {
  label: 'Future Builders · Grades 7–12',
  headline: 'Build a real product.',
  line: 'Alongside the school platform, we run a live online summer camp: software, AI, IoT robotics and entrepreneurship, ending with a Demo Day pitch.',
  link: { label: 'Explore Future Builders', href: '/future-builders' },
} as const;

export const finalCta = {
  headline: 'Build learning worth doing.',
  line: 'We’ll walk you through SOYL, answer your questions and talk through a pilot for your school.',
} as const;
