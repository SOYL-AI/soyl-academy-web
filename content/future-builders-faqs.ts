import type { FaqItem } from '@/content/faqs';
import {
  BASE_PRICE,
  CALLBACK_PROMISE,
  CLASSES_START_DATE,
  FRIEND_CODE,
  FRIEND_DISCOUNT,
  ORIENTATION_DATE,
  REGISTRATION_CLOSES,
  SCHEDULE,
  SEATS_TOTAL,
} from '@/content/future-builders';

/** Shown on /future-builders and mirrored into its FAQPage JSON-LD. */
export const futureBuildersFaqs: FaqItem[] = [
  {
    question: 'When are the classes?',
    answer: `Live classes run on ${SCHEDULE.days}, about 3 hours per session, starting ${CLASSES_START_DATE}. Orientation is on ${ORIENTATION_DATE}, and registration closes ${REGISTRATION_CLOSES}. The exact session timings are confirmed at orientation, and every session is recorded.`,
  },
  {
    question: 'What will my child actually learn to do?',
    answer: 'By the end of 12 weeks, your child will write and debug Python programs, train small AI models to recognise images, wire physical IoT circuits, and present a final business pitch. They move from consuming technology to building it.',
  },
  {
    question: 'Do they need prior coding experience?',
    answer: 'No. The curriculum is designed for complete beginners in Grades 7 to 12. We teach everything from scratch, starting with basic logic and moving up to AI and hardware.',
  },
  {
    question: 'How does the hardware kit work for an online cohort?',
    answer: 'We ship a personal ESP32-C3 hardware kit to your home around week 3 or 4, with free shipping anywhere in India. It includes the microcontroller, a breadboard, sensors (temperature, light, distance), LEDs and a servo motor. In the hardware sessions, instructors guide students step by step over video as they wire and program their own kit. The kit is theirs to keep.',
  },
  {
    question: 'What happens if they miss a live session?',
    answer: 'Every live session is recorded and shared with students. If your child misses a class, they watch the recording, catch up on that week’s project, and can bring any questions to the next live session.',
  },
  {
    question: 'What is Demo Day?',
    answer: 'Demo Day is the final session of week 12. Teams of 3–4 present the working prototype they built, combining software, AI and hardware, and pitch why it matters to parents, teachers and guests. Each student leaves with a recorded pitch and a certificate of completion.',
  },
  {
    question: 'How many students are in a cohort?',
    answer: `Each cohort is capped at ${SEATS_TOTAL} students, so instructors can review every student’s project personally. Once the seats are filled, registration closes even if it is before ${REGISTRATION_CLOSES}.`,
  },
  {
    question: 'Is there a discount for enrolling with a friend?',
    answer: `Yes. If two friends enrol together, or your child was referred by someone already enrolled, use code ${FRIEND_CODE} at checkout and enter your friend’s name. You save ₹${FRIEND_DISCOUNT}, and your friend gets ₹${FRIEND_DISCOUNT} too: as a discount if they have not paid yet, or as a refund if they already have. One discount code per enrolment.`,
  },
  {
    question: 'How does this help students in Grades 10 to 12 applying to university?',
    answer: 'Admissions and scholarship panels look for evidence of technical initiative beyond marks. Future Builders students finish with a public GitHub repository of their code, a recorded 3-minute Demo Day pitch, and a certificate of completion: concrete proof of work for applications, essays and interviews.',
  },
  {
    question: 'What does the fee cover, and is there a guarantee?',
    answer: `₹${BASE_PRICE.toLocaleString('en-IN')} covers all 12 weeks of live classes, the recordings, and the hardware kit shipped to your door. If Session 1 is not the right fit, request a full refund within 24 hours of it, and the kit is still yours to keep.`,
  },
  {
    question: 'I still have questions. How do I reach you?',
    answer: `Message us on WhatsApp for a quick reply, or choose Request Callback in the form below and we will call you ${CALLBACK_PROMISE}.`,
  },
];
