import type { FaqItem } from '@/content/faqs';
import {
  BASE_PRICE,
  CALLBACK_PROMISE,
  CONTACT_HOURS,
  FRIEND_CODE,
  FRIEND_DISCOUNT,
  SCHEDULE,
  SEATS_TOTAL,
  WHATSAPP_DISPLAY,
  formatCohortDate,
  getOpenCohort,
  getUpcomingCohort,
  type CohortState,
} from '@/content/future-builders';

const PRICE = `₹${BASE_PRICE.toLocaleString('en-IN')}`;

/**
 * Shown on /future-builders and mirrored into its FAQPage JSON-LD.
 * Built per request/revalidation so the dates and wording follow the cohort state.
 * Ordered by the objections parents raise first: time, readiness, equipment,
 * missed classes, fit, money, safety. Answer-first; every claim matches the
 * programme facts in content/future-builders.ts and the refund/shipping/terms pages.
 */
export function getFutureBuildersFaqs(state: CohortState): FaqItem[] {
  const cohort = state === 'open' || state === 'closing-soon' ? getOpenCohort() : null;
  // Announced, registration not open yet: no dates, timetable or new price are stated.
  const upcoming = state === 'upcoming' ? getUpcomingCohort() : null;
  const span = upcoming ? 'the programme' : '12 weeks';

  const faqs: (FaqItem | false)[] = [
    {
      question: 'When are the classes?',
      answer: cohort
        ? `Live classes run on ${SCHEDULE.days}, about 3 hours per session, starting ${formatCohortDate(cohort.classesStart)}. Orientation is on ${formatCohortDate(cohort.orientation)}, and registration closes ${formatCohortDate(cohort.registrationCloses)}. The exact session timings are confirmed at orientation, and every session is recorded.`
        : upcoming
          ? `The ${upcoming.name} runs in ${upcoming.window}. Registration opens ${upcoming.registrationOpensLabel}, and the exact dates and detailed timetable are announced at registration. Classes are live on video (IST), and every session is recorded.`
          : `Live classes run on ${SCHEDULE.days}, about 3 hours per session. Dates for the next cohort have not been announced yet; join the waitlist and we will tell you first. Every session is recorded.`,
    },
    {
      question: 'Will it take time away from school and exams?',
      answer: upcoming
        ? `The ${upcoming.name} runs in ${upcoming.window}. The detailed timetable is announced at registration, and every session is recorded, so a missed class can be caught up from the recording.`
        : `The live classes happen only at weekends: two sessions of about 3 hours, on ${SCHEDULE.days}. Every session is recorded, so in an exam week or a busy family weekend your child can miss a class and catch up from the recording.`,
    },
    {
      question: 'Do they need prior coding experience?',
      answer: 'No. The curriculum is designed for complete beginners in Grades 7 to 12. We teach everything from scratch, starting with basic logic and moving up to AI and hardware.',
    },
    {
      question: 'What device and internet connection do they need?',
      answer: `A laptop or desktop computer with a USB port (to program the hardware kit), and an internet connection that can handle a video call. A phone or tablet is not enough for the coding and hardware sessions. We help set up the tools at orientation. Not sure your computer will do? Ask us on WhatsApp at ${WHATSAPP_DISPLAY}.`,
    },
    {
      question: 'What will my child actually learn to do?',
      answer: `By the end of ${span}, your child will write and debug Python programs, train small AI models to recognise images, wire physical IoT circuits, and present a final business pitch. They move from consuming technology to building it.`,
    },
    {
      question: 'What happens if they miss a live session?',
      answer: 'Every live session is recorded and shared with students. If your child misses a class, they watch the recording, catch up on that week’s project, and can bring any questions to the next live session.',
    },
    {
      question: 'Is it right for both a Grade 7 and a Grade 12 student?',
      answer: `Yes. Everyone starts from the same basics, and projects are built in teams of 3–4 with an instructor reviewing each student’s work, so students who move faster can take on more of the build. Each cohort has at most ${SEATS_TOTAL} students.`,
    },
    {
      question: 'How does the hardware kit work for an online cohort?',
      answer: 'We ship a personal ESP32-C3 hardware kit to your home around week 3 or 4, with free shipping anywhere in India. It includes the microcontroller, a breadboard, sensors (temperature, light, distance), LEDs and a servo motor. In the hardware sessions, instructors guide students step by step over video as they wire and program their own kit. The kit is theirs to keep.',
    },
    {
      question: 'What is Demo Day?',
      answer: `Demo Day is the final session of ${upcoming ? 'the programme' : 'week 12'}. Teams of 3–4 present the working prototype they built, combining software, AI and hardware, and pitch why it matters to parents, teachers and guests. Each student leaves with a recorded pitch and a certificate of completion.`,
    },
    {
      question: 'How does this help students in Grades 10 to 12 applying to university?',
      answer: 'Admissions and scholarship panels look for evidence of technical initiative beyond marks. Future Builders students finish with a public GitHub repository of their code, a recorded 3-minute Demo Day pitch, and a certificate of completion: concrete proof of work for applications, essays and interviews.',
    },
    {
      question: 'What does the fee cover?',
      answer: cohort
        ? `${PRICE} covers all 12 weeks of live classes (${CONTACT_HOURS} contact hours), the recordings, and the hardware kit shipped free to your door. It is the full amount charged at checkout; nothing is added for the kit or delivery. Payment is handled securely by Razorpay.`
        : upcoming
          ? `The fee is ${PRICE}, covering the live classes, the recordings, and the hardware kit shipped free to your door. It is confirmed when registration opens ${upcoming.registrationOpensLabel}. Asking to be notified is free and commits you to nothing.`
          : `The current fee is ${PRICE}, covering all 12 weeks of live classes (${CONTACT_HOURS} contact hours), the recordings, and the hardware kit shipped free to your door. The fee for the next cohort is confirmed when its dates are announced, and joining the waitlist is free.`,
    },
    {
      question: 'What if it is not the right fit? What is the refund policy?',
      answer: 'If Session 1 is not right for your child, ask for a full refund within 24 hours of it, by email or WhatsApp, and keep the hardware kit. If you cancel more than 48 hours before the first class, you get a full refund, or you can move to a later cohort at no extra cost. After the Session 1 window, fees are not refundable, but in a medical emergency or an unavoidable schedule clash we will move the seat to the next cohort. The full terms are on our refund policy page.',
    },
    {
      question: 'Is it safe, and what happens to our data?',
      answer: 'Every class is a live group session on video, led by SOYL instructors, and the recordings are shared with the students in the cohort. We ask only for what we need to run the programme: a parent’s name and contact details, the student’s name and grade, and a delivery address for the kit. We use them only for Future Builders, we do not sell student data, and we handle it under our privacy policy (India’s DPDP Act 2023). Students own everything they build.',
    },
    {
      question: 'How many students are in a cohort?',
      answer: `Each cohort is capped at ${SEATS_TOTAL} students, so instructors can review every student’s project personally. Once the seats are filled, registration closes early.`,
    },
    cohort !== null && {
      question: 'Is there a discount for enrolling with a friend?',
      answer: `Yes. If two friends enrol together, or your child was referred by someone already enrolled, use code ${FRIEND_CODE} at checkout and enter your friend’s name. You save ₹${FRIEND_DISCOUNT}, and your friend gets ₹${FRIEND_DISCOUNT} too: as a discount if they have not paid yet, or as a refund if they already have. One discount code per enrolment.`,
    },
    {
      question: 'I still have questions. How do I reach you?',
      answer: `Message us on WhatsApp at ${WHATSAPP_DISPLAY} for a quick reply, or choose Request a call in the form on this page and we will call you ${CALLBACK_PROMISE}.`,
    },
  ];

  return faqs.filter((f): f is FaqItem => Boolean(f));
}
