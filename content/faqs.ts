/**
 * FAQ content, written answer-first for Answer Engine Optimization (AEO):
 * the first sentence of every answer is a complete, quotable answer on its
 * own, so search snippets and AI assistants can lift it verbatim.
 *
 * Every claim here is drawn from copy on the site or from the SOYL Missions
 * product spec v1.2 (ADR-033). Keep it that way: no statistics or promises
 * that the pages themselves do not make.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'What is SOYL Academy?',
    answer:
      'SOYL Academy replaces assignments with missions. A mission is one continuous scene of about 45 minutes, a simulator, a story or a conversation, where every pupil takes their own path and leaves with a Thoughtprint instead of a mark. It is built by SOYL AI Private Limited in Bengaluru, India. SOYL stands for Story of Your Life.',
  },
  {
    question: 'What is a mission?',
    answer:
      'A mission is a bounded learning experience of no more than 60 minutes, designed for about 45. It runs through five stages, Spark, Build, Defend, Fix and Reflect, and ends when each learning outcome has enough evidence, not after a fixed number of questions.',
  },
  {
    question: 'What is a Thoughtprint?',
    answer:
      'A Thoughtprint is the card each pupil gets at the end of a mission. Its headline is what the pupil can now do; it also shows where their thinking turned and which misconception was found and fixed. A mark is never the headline.',
  },
  {
    question: 'Who decides what pupils are asked, the AI or the teacher?',
    answer:
      'The teacher. Teachers set the learning outcomes, read a short mission brief and approve the mission before any pupil sees it. Everything a pupil can be asked comes from the approved pool or from approved templates.',
  },
  {
    question: 'Do the hints give pupils the answer?',
    answer:
      'No. Hints and the guide ask, point and narrow; the pupil does the thinking. After two unproductive attempts the problem is made smaller, and after three the mission moves on and flags the pupil for the teacher.',
  },
  {
    question: 'Is there a timer or a question counter?',
    answer:
      'No. Pupils never see a countdown, a question counter or a running score. The mission tracks time quietly, starts closing at 40 minutes and never runs past 60.',
  },
  {
    question: 'What does the teacher see afterwards?',
    answer:
      'A Monday screen that groups pupils by misconception rather than by score. Each group shows every pupil’s own evidence, a voice clip, a photo of their working or the attempt where it happened, and a suggested next move the teacher can approve, edit or skip.',
  },
  {
    question: 'How can a school start with SOYL Academy?',
    answer:
      'Schools begin with a pilot of roughly ten weeks: Introduce (weeks 1–2), Implement (weeks 3–8) and Evaluate (weeks 9–10). To start, book a demo and the SOYL team will walk you through a mission and the pilot plan.',
  },
];

export const methodFaqs: FaqItem[] = [
  {
    question: 'What are the five stages of a mission?',
    answer:
      'Spark, Build, Defend, Fix and Reflect. Spark finds where a pupil starts, Build is the real work, Defend is a live follow-up on their gap, Fix is one new case on the same idea, and Reflect asks how sure they are and what they would change.',
  },
  {
    question: 'How do the stages relate to the SOYL Method?',
    answer:
      'They are how the five SOYL demonstrations happen inside one hour: Understand in Spark, Apply and Create in Build, Defend in Defend, Apply in a new situation in Fix, and Reflect in Reflect.',
  },
  {
    question: 'How long is a mission?',
    answer:
      'Never more than 60 minutes of pupil time, and designed for about 45. A mission ends when each outcome has enough evidence; it starts closing at 40 minutes, goes straight to Reflect at 55 and saves at 60. Pupils never see this clock.',
  },
  {
    question: 'What happens when a pupil is stuck?',
    answer:
      'After two tries that go nowhere, the guide makes the step smaller: a smaller question, a worked part or a nudge on the simulator. After three, the mission moves on and flags the pupil for the teacher. The guide never gives the answer.',
  },
  {
    question: 'Why does this matter now that pupils have AI?',
    answer:
      'Because a finished answer no longer proves that thinking happened. A mission collects evidence along the way, and the Defend stage asks follow-up questions aimed at each pupil’s own gap, which a generated answer cannot fake.',
  },
];

export const schoolsFaqs: FaqItem[] = [
  {
    question: 'What does a SOYL Academy pilot look like?',
    answer:
      'A pilot runs in three phases over about ten weeks. In Introduce (weeks 1–2), a core group of early-adopter teachers is trained and maps two or three units to missions. In Implement (weeks 3–8), teachers run missions with their classes, with ongoing support. In Evaluate (weeks 9–10), the school reviews the Thoughtprints, the rechecks and teacher feedback, and plans a wider rollout.',
  },
  {
    question: 'Does SOYL Academy work with our existing curriculum?',
    answer:
      'Yes. Missions are built from the chapters and learning outcomes you already teach, whether CBSE, ICSE or a state board. They change how learning is shown, not what is taught.',
  },
  {
    question: 'How does a teacher create a mission?',
    answer:
      'The teacher picks the class, the chapter and two to four learning outcomes. SOYL drafts the mission and a short brief: what pupils will do, the misconceptions it will listen for, and every question on demand. Nothing reaches pupils until the teacher approves it.',
  },
  {
    question: 'What do school leaders see?',
    answer:
      'Heads of department get a class view of misconceptions over time: which ideas are still open, where a Fix mission went out, and what held at the seven-day recheck. Teachers work from their own Monday screen, which groups pupils by misconception, never by score.',
  },
  {
    question: 'What happens to homework when pupils have AI?',
    answer:
      'SOYL Academy’s answer is neither banning technology nor retreating to pen-and-paper tests. It is to change the work itself: a mission asks pupils to predict, build, defend and fix in their own words, voice and working, which a copied answer cannot do.',
  },
];

/** /parents (ADR-034). Every answer restates what the home, parents and pupils pages already say. */
export const parentsFaqs: FaqItem[] = [
  {
    question: 'What is a Thoughtprint?',
    answer:
      'A Thoughtprint is the card your child gets at the end of every mission. It leads with what they can now do, then shows the moment their thinking turned and the misconception that was found and fixed. A mark is never the headline.',
  },
  {
    question: 'How long does a mission take?',
    answer:
      'A mission never runs past an hour, and most end around 45 minutes. There is no countdown and no question counter. Time spent working on paper does not count as screen time.',
  },
  {
    question: 'Do the hints give my child the answer?',
    answer:
      'No. Hints ask, point and narrow; your child does the thinking. If they stay stuck, the mission makes the problem smaller and then flags them for their teacher.',
  },
  {
    question: 'Can I sign my child up for missions myself?',
    answer:
      'Missions come through your child’s school, so share this page with their teacher or principal, or book a demo on the school’s behalf. Future Builders, our live online summer camp for Grades 7 to 12, is the one programme individual students can join directly.',
  },
];

export const studentsFaqs: FaqItem[] = [
  {
    question: 'What is a mission like?',
    answer:
      'One scene instead of a list of questions: a lab bench, a moment in history or a conversation. You take your own path through it, explain your thinking, and finish with a Thoughtprint that shows what you can now do.',
  },
  {
    question: 'Is there a timer or a score?',
    answer:
      'No. There is no countdown, no question counter and no running score on your screen. A mission never runs past an hour, and most end around 45 minutes.',
  },
  {
    question: 'Can I answer out loud or on paper?',
    answer:
      'Yes, wherever the skill allows. You can say it, type it, or write in your notebook and upload a photo. Time on paper does not count as screen time.',
  },
  {
    question: 'Can I use AI?',
    answer:
      'You can use AI to think better, but a pasted answer will not get you through a mission. The guide asks follow-up questions about your own reasoning, so you need to understand what you say.',
  },
  {
    question: 'Can individual students join SOYL Academy?',
    answer:
      'Yes. Future Builders is a live online summer camp for Grades 7 to 12 that individual students can join directly, without a school partnership. The Future Builders page shows when the next camp runs and how to register, or a waitlist when registration is closed.',
  },
];

export const whatWeTeachFaqs: FaqItem[] = [
  {
    question: 'What does SOYL Academy teach?',
    answer:
      'SOYL Academy runs Future Builders, a two-month summer camp for Grades 7 to 12 covering software, AI, IoT and entrepreneurship. Programmes in AI & Technology, Building & Making, Communication & Ideas and Problem Solving are coming soon.',
  },
  {
    question: 'How are SOYL Academy programmes delivered?',
    answer:
      'Future Builders runs as live online sessions in the summer break, open to individual students in Grades 7 to 12. Workshops for schools are coming soon.',
  },
];
