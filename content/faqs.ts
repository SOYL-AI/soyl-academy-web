/**
 * FAQ content, written answer-first for Answer Engine Optimization (AEO):
 * the first sentence of every answer is a complete, quotable answer on its
 * own, so search snippets and AI assistants can lift it verbatim.
 *
 * Every claim here is drawn from copy that already exists on the site.
 * Keep it that way — do not add statistics or promises that the pages
 * themselves do not make.
 */

import { formatInr, getPlan, planPrice } from '@/platform/shared/config/plans';

export interface FaqItem {
  question: string;
  answer: string;
}

const price = (id: 'plus' | 'pro' | 'board_exam_pass', interval: 'monthly' | 'one_time') => {
  const p = planPrice(id, interval);
  return p ? formatInr(p.amountPaise) : null;
};

/**
 * The homepage FAQ with the learning platform on (plan §3.2, screen 6). Every number comes from
 * platform/shared/config/plans.ts, so a price change in config changes the answer. The rules behind the
 * answers: CONTEXT.md §5 (access model) and §7 (plans).
 */
export function freeLearningFaqs(): FaqItem[] {
  const free = getPlan('free').creditsPerDay;
  const plus = price('plus', 'monthly');
  const pro = price('pro', 'monthly');
  const pass = price('board_exam_pass', 'one_time');
  const passUntil = getPlan('board_exam_pass').validUntil;
  const until = passUntil
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(passUntil))
    : null;
  const paid = [
    plus && pro ? `Plus (${plus} a month) and Pro (${pro} a month) give more credits a day` : null,
    pass && until ? `the Board Exam Pass is ${pass} once, with Pro's benefits until ${until}` : null,
  ]
    .filter(Boolean)
    .join('; ');
  return [
    {
      question: 'Is it really free?',
      answer:
        'Yes. Lessons, notes, flashcards and practice with instant checks are free for every student, and so are chapter tests, mock papers and All-India mocks with a free account. Only AI help is metered, because it costs money to run.',
    },
    {
      question: 'What do I pay for?',
      answer: `Only AI help: doubts answered step by step, explanations of a slide, and checking of written answers. Each AI action costs credits, and a free account gets ${free} credits every day.${paid ? ` ${paid.charAt(0).toUpperCase()}${paid.slice(1)}.` : ''}`,
    },
    {
      question: 'Which boards and classes?',
      answer:
        'CBSE Classes 7 to 12, ICSE Classes 7 to 10 and ISC Classes 11 and 12. Lessons are added chapter by chapter; open your class to see what is ready.',
    },
    {
      question: 'Do I need an account?',
      answer:
        'Not to learn. Lessons, notes, flashcards and practice work without one, and your progress is kept on that device. Tests and AI help need a free account; when you sign in, what you did as a guest moves into it.',
    },
  ];
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'What is SOYL Academy?',
    answer:
      'SOYL Academy is an assignment platform for Grades 1 to 10. Teachers turn their own notes into interactive assignments, students work them out with unlimited attempts and step-by-step hints, and teachers see how each pupil got there. It is built by SOYL AI Private Limited in Bengaluru, India.',
  },
  {
    question: 'Who writes the questions, the AI or the teacher?',
    answer:
      'The teacher decides. SOYL drafts questions from the teacher’s notes, and nothing reaches students until the teacher has reviewed, edited and approved it.',
  },
  {
    question: 'Do the hints just give students the answer?',
    answer:
      'No. Hints are step-by-step nudges that never reveal the answer. Students can try as many times as they need, and every attempt and hint is recorded so the teacher can see the process, not just the score.',
  },
  {
    question: 'What is the SOYL Method?',
    answer:
      'The SOYL Method is an outcome-based framework designed to make student thinking visible. It replaces transactional submissions with five demonstrations of learning: Understand, Apply, Create, Defend and Reflect.',
  },
  {
    question: 'What is outcome-based learning?',
    answer:
      'Outcome-based learning designs every assignment around what a student should be able to do, rather than only what they should know. Each step of the work has a clear purpose, so students practise a real skill instead of memorising content.',
  },
  {
    question: 'Does SOYL Academy ban AI in the classroom?',
    answer:
      'No. SOYL Academy treats AI as a thought partner, not a shortcut. Students may use AI tools, but they must explain their process, defend their choices and show that the ideas are their own, so using AI does not replace thinking.',
  },
  {
    question: 'Does SOYL Academy replace teachers?',
    answer:
      'No. Educators stay at the centre of every SOYL experience. The tools are designed to amplify a teacher’s reach and reduce administrative burden, while pedagogical decisions, relationships and final assessments remain entirely human.',
  },
  {
    question: 'How can a school start with SOYL Academy?',
    answer:
      'Schools begin with a pilot of roughly ten weeks: Introduce (weeks 1–2), Implement (weeks 3–8) and Evaluate (weeks 9–10). To start, book a demo and the SOYL team will walk you through the platform and the pilot plan.',
  },
];

export const methodFaqs: FaqItem[] = [
  {
    question: 'What are the five pillars of the SOYL Method?',
    answer:
      'The five pillars are Understand, Apply, Create, Defend and Reflect. Together they move students from comprehension, through application and creation, to justifying their reasoning and reflecting on how they learned.',
  },
  {
    question: 'Why do assignments need to change in the age of AI?',
    answer:
      'Because the finished artifact alone no longer proves that thinking happened. When technology can generate essays, solve equations and write code in seconds, learning has to be assessed through the process, the reasoning and the student’s ability to use knowledge.',
  },
  {
    question: 'What is the difference between a traditional assignment and a SOYL assignment?',
    answer:
      'A traditional assignment asks students to produce an answer, such as completing twenty similar equations. A SOYL assignment asks them to apply the idea in a new context, for example optimising a school garden layout, and to explain and defend what they did.',
  },
  {
    question: 'How does SOYL Academy approach responsible AI use?',
    answer:
      'SOYL teaches students to use technology as a thought partner. The method demands transparency in their process and holds them accountable for the integrity of their work.',
  },
];

export const schoolsFaqs: FaqItem[] = [
  {
    question: 'What does a SOYL Academy pilot look like?',
    answer:
      'A pilot runs in three phases over about ten weeks. In Introduce (weeks 1 and 2), a core cohort of early-adopter teachers receives professional development and maps 2 or 3 units to the SOYL framework. In Implement (weeks 3 to 8), teachers deploy SOYL challenges with ongoing support. In Evaluate (weeks 9 and 10), the school reviews student portfolios and teacher feedback and plans a wider rollout.',
  },
  {
    question: 'Does SOYL Academy work with our existing curriculum?',
    answer:
      'Yes. The SOYL Method is a pedagogical overlay, not a replacement curriculum. It integrates with existing standards such as Common Core, IB, IGCSE or local frameworks, changing how learning is assessed rather than what is taught.',
  },
  {
    question: 'How does the SOYL workflow work for teachers?',
    answer:
      'The teacher frames the learning objective, students meet the scenario and its constraints, plan their approach, do the work, then explain and defend their choices, and the teacher reviews the evidence of thinking. The six steps are teacher design, student context, strategy and ideation, student action, defence and reflection, and educator review.',
  },
  {
    question: 'What happens to homework when students have AI?',
    answer:
      'SOYL Academy’s answer is neither banning technology nor retreating to pen-and-paper exams. The answer is to change the assignment so that it asks students to apply, create and defend ideas: work that cannot be completed by copying a generated answer.',
  },
];

/**
 * /students hands straight to free learning (plan §3.3), so its questions are about that. The answers state the
 * access rules (docs/platform/CONTEXT.md §5), which hold whether or not the platform is switched on yet; they
 * carry no price and no link.
 */
export const studentsFaqs: FaqItem[] = [
  {
    question: 'Is SOYL Academy free for students?',
    answer:
      'Yes. Lessons, notes, flashcards and practice for CBSE, ICSE and ISC Classes 7 to 12 are free, and so are chapter tests and mock papers with a free account. Only AI help is metered, because it costs money to run.',
  },
  {
    question: 'Do I need an account to learn?',
    answer:
      'No. Lessons, notes, flashcards and practice work without one, and your progress is kept on that device. Tests and AI help need a free account; when you sign in, what you did as a guest moves into it.',
  },
  {
    question: 'Can I join without my school?',
    answer:
      'Yes. The free lessons need no school. Future Builders, a 2-month live online summer camp for Grades 7 to 12, also takes students directly, without a school partnership. Its page shows when the next camp runs and how to register, or a waitlist when registration is closed.',
  },
];

export const whatWeTeachFaqs: FaqItem[] = [
  {
    question: 'What does SOYL Academy teach?',
    answer:
      'SOYL Academy runs Future Builders, a 2-month summer camp for Grades 7 to 12 covering Software, AI, IoT, and Entrepreneurship. Additional programmes in AI & Technology, Building & Making, Communication & Ideas, and Problem Solving are coming soon.',
  },
  {
    question: 'How are SOYL Academy programs delivered?',
    answer:
      'Future Builders is delivered through live online sessions during the summer break and is open to individual students in Grades 7 to 12. SOYL Academy also offers workshops and collaborative experiences through partner schools.',
  },
];
