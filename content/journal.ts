export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readingTime: number;
  image?: string;
}

export const articles: JournalArticle[] = [
  {
    slug: 'homework-after-chatgpt',
    title: 'Homework after ChatGPT',
    excerpt: 'What happens when answers become abundant?',
    content: `When answers are free and immediate, asking the right questions becomes the ultimate skill. We explore how homework can evolve beyond recall and into critical application.

The advent of AI means we can no longer rely on take-home essays as the primary measure of learning. Instead, we must design assignments where the AI is a tool, not a crutch.

This changes everything about how we structure curriculum. It's an opportunity to elevate our standards.`,
    author: 'SOYL Academy',
    date: '2023-10-15',
    category: 'Technology',
    readingTime: 4
  },
  {
    slug: 'why-outcomes-matter',
    title: 'Why outcomes matter',
    excerpt: 'A better assignment starts by asking what a student should be able to do.',
    content: `Traditional education often focuses on what a student should know. But knowledge without application is inert. We believe in starting with the end in mind.

When an assignment is designed around an outcome, every step of the process has a clear purpose. Students aren't just memorizing; they're practicing a skill they'll use in the real world.

Outcome-based learning transforms the classroom from a place of passive reception to one of active creation.`,
    author: 'SOYL Academy',
    date: '2023-11-02',
    category: 'Methodology',
    readingTime: 5
  },
  {
    slug: 'should-schools-ban-ai',
    title: 'Should schools ban AI?',
    excerpt: 'Maybe that\'s the wrong question.',
    content: `Banning AI in schools is like trying to ban the calculator in the 1980s. It might work for a moment, but it's ultimately a losing battle. 

The better question is: How can we teach students to use AI responsibly and effectively? If we ignore these tools, we're doing a disservice to our students, who will undoubtedly be expected to use them in their future careers.

We need to integrate AI into our teaching methods, teaching students to evaluate its output and leverage its capabilities.`,
    author: 'SOYL Academy',
    date: '2023-12-10',
    category: 'Technology',
    readingTime: 6
  },
  {
    slug: 'learning-to-defend-an-idea',
    title: 'Learning to defend an idea',
    excerpt: 'Why explanation may matter as much as the answer.',
    content: `In a world where you can look up any fact in seconds, the ability to synthesize information and form a coherent argument is more valuable than ever.

It's not enough to get the right answer; you must be able to explain how you got there and why it matters. This is why "Defend" is a core pillar of the SOYL Method.

When students learn to articulate their reasoning, they deepen their understanding and develop confidence in their own ideas.`,
    author: 'SOYL Academy',
    date: '2024-01-20',
    category: 'Methodology',
    readingTime: 4
  }
];

/** Alias for consumers that import as journalArticles */
export const journalArticles = articles;

/** Helper to find an article by slug */
export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
