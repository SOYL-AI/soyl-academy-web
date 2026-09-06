export interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'coming-soon' | 'active';
  topics: string[];
}

export const programs: Program[] = [
  {
    id: 'ai-and-technology',
    title: 'AI & Technology',
    description: 'Understand the tools shaping the world — and learn to use them thoughtfully.',
    category: 'AI & Technology',
    status: 'active',
    topics: ['Prompt Engineering', 'AI Ethics', 'Automation']
  },
  {
    id: 'building-and-making',
    title: 'Building & Making',
    description: 'Learn by designing, experimenting and creating.',
    category: 'Building & Making',
    status: 'active',
    topics: ['Prototyping', 'Design Thinking', 'Iteration']
  },
  {
    id: 'communication-and-ideas',
    title: 'Communication & Ideas',
    description: 'Question, present, debate and defend what you believe.',
    category: 'Communication & Ideas',
    status: 'active',
    topics: ['Public Speaking', 'Argumentation', 'Synthesis']
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    description: 'Work through problems where there isn\'t always one correct answer.',
    category: 'Problem Solving',
    status: 'active',
    topics: ['Critical Thinking', 'Systems Thinking', 'Decision Making']
  }
];
