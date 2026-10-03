/**
 * FAQ content, written answer-first for Answer Engine Optimization (AEO):
 * the first sentence of every answer is a complete, quotable answer on its
 * own, so search snippets and AI assistants can lift it verbatim.
 *
 * Every claim here is drawn from copy that already exists on the site.
 * Keep it that way — do not add statistics or promises that the pages
 * themselves do not make.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'What is SOYL Academy?',
    answer:
      'SOYL Academy helps teachers create outcome-based learning experiences that ask students to think, apply, create, explain and defend — not simply submit. It is an initiative of SOYL AI Private Limited, based in Bengaluru, India, and it works with schools through partnership programs.',
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
      'Schools begin with a pilot of roughly ten weeks: Introduce (weeks 1–2), Implement (weeks 3–8) and Evaluate (weeks 9–10). To enquire about a pilot, contact the SOYL Academy team through the contact page.',
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
      'A pilot runs in three phases over about ten weeks. In Introduce (weeks 1–2), a core cohort of early-adopter teachers receives professional development and maps 2–3 units to the SOYL framework. In Implement (weeks 3–8), teachers deploy SOYL challenges with ongoing support. In Evaluate (weeks 9–10), the school reviews student portfolios and teacher feedback and plans a wider rollout.',
  },
  {
    question: 'Does SOYL Academy work with our existing curriculum?',
    answer:
      'Yes. The SOYL Method is a pedagogical overlay, not a replacement curriculum. It integrates with existing standards such as Common Core, IB, IGCSE or local frameworks, changing how learning is assessed rather than what is taught.',
  },
  {
    question: 'How does the SOYL workflow work for teachers?',
    answer:
      'Teachers define an objective, generate a real-world context with SOYL’s help, assign a challenge, review the students’ process and defence, and evaluate the evidence of thinking. The six steps are Define Objective, Generate Context, Assign Challenge, Student Action, Defense & Reflection and Educator Review.',
  },
  {
    question: 'What happens to homework when students have AI?',
    answer:
      'SOYL Academy’s answer is neither banning technology nor retreating to pen-and-paper exams. The answer is to change the assignment so that it asks students to apply, create and defend ideas — work that cannot be completed by copying a generated answer.',
  },
];

export const studentsFaqs: FaqItem[] = [
  {
    question: 'Can I use AI in a SOYL assignment?',
    answer:
      'Yes, you can use AI tools, but you cannot simply copy and paste an answer. In a SOYL assignment you explain your process, defend your choices and show that the ideas are yours.',
  },
  {
    question: 'Can individual students join SOYL Academy?',
    answer:
      'Not yet. SOYL Academy is currently available only through partner schools. Direct access for individual students is coming soon.',
  },
  {
    question: 'What will I do in a SOYL assignment?',
    answer:
      'You learn by doing: you solve, build, argue, explain and reflect. Instead of worksheets and formulaic essays, you show what you can build, how you reason and how you tackle real problems.',
  },
];

export const whatWeTeachFaqs: FaqItem[] = [
  {
    question: 'What does SOYL Academy teach?',
    answer:
      'SOYL Academy’s programs cover four areas: AI & Technology, Building & Making, Communication & Ideas, and Problem Solving. The four programs — Applied Intelligence, Digital Craftsmanship, The Art of Argument and Systems Thinking — are coming soon.',
  },
  {
    question: 'How are SOYL Academy programs delivered?',
    answer:
      'SOYL Academy delivers programs on partner-school campuses as specialised offline workshops, immersive programs and collaborative experiences, alongside its digital platform for better assignments.',
  },
];
