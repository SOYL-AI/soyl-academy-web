/**
 * The five pillars of the SOYL Method.
 * Shared by the /method page, its JSON-LD, and llms-full.txt so the copy never drifts.
 */

export interface Pillar {
  num: string;
  name: string;
  tagline: string;
  content: string[];
  traditional: string;
  soyl: string;
}

export const pillars: Pillar[] = [
  {
    num: '01',
    name: 'Understand',
    tagline: 'Comprehension beyond the surface.',
    content: [
      'True understanding is not the ability to regurgitate facts, but the capacity to map new information to existing knowledge structures.',
      'In a world where answers are instantly available, understanding must be measured by a student\'s ability to identify relationships, contrast differing perspectives, and recognize the boundaries of their own knowledge.'
    ],
    traditional: 'Read chapter 4 and answer the 10 questions at the end.',
    soyl: 'Given this new concept, explain it using an analogy related to your favorite hobby.'
  },
  {
    num: '02',
    name: 'Apply',
    tagline: 'Knowledge in action.',
    content: [
      'Application tests the utility of knowledge. It asks students to take an abstract concept and use it to solve a concrete problem in a novel context.',
      'When students apply what they\'ve learned, they invariably encounter friction—the gap between theory and reality. Navigating this friction is where true learning occurs.'
    ],
    traditional: 'Solve these 20 similar equations.',
    soyl: 'Use these mathematical principles to optimize the layout of a school garden.'
  },
  {
    num: '03',
    name: 'Create',
    tagline: 'Synthesis and expression.',
    content: [
      'Creation requires synthesis. It demands that students pull from multiple domains, evaluate options, make decisions, and construct something that did not previously exist.',
      'This pillar focuses on originality, coherence, and the ability to bring an idea to fruition, demonstrating mastery over the underlying components.'
    ],
    traditional: 'Write a standard 5-paragraph essay on the causes of the Civil War.',
    soyl: 'Create a historical artifact (like a diary entry or a newspaper article) that reflects the tension of the era, and defend its historical accuracy.'
  },
  {
    num: '04',
    name: 'Defend',
    tagline: 'Reasoning and justification.',
    content: [
      'If you cannot defend your position, you do not truly hold it. The ability to articulate why a decision was made, why a solution works, or why an argument is sound is paramount.',
      'Defending work requires students to anticipate counterarguments, evaluate evidence, and communicate their reasoning with clarity and conviction.'
    ],
    traditional: 'Select the correct multiple-choice answer.',
    soyl: 'Present your solution to the class and answer three challenging questions about your methodology.'
  },
  {
    num: '05',
    name: 'Reflect',
    tagline: 'Metacognition and growth.',
    content: [
      'Reflection is the engine of improvement. It requires students to look back at their process, identify what worked, what failed, and what they would do differently.',
      'By cultivating metacognition, students learn how to learn. They become self-aware practitioners capable of continuous growth.'
    ],
    traditional: 'Receive a grade of B- and move on to the next unit.',
    soyl: 'Write a brief retrospective on your project: what was the hardest part, and how did you overcome it?'
  }
];
