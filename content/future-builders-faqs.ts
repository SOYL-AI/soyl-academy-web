import type { FaqItem } from '@/content/faqs';
import {
  CALLBACK_PROMISE,
  FRIEND_CODE,
  FRIEND_DISCOUNT,
  LIST_PRICE,
  STANDARD_OFFER,
  WHATSAPP_DISPLAY,
  formatCohortDate,
  getActiveOffer,
  getOpenCohort,
  getUpcomingCohort,
  rupees,
  today,
  type CohortState,
} from '@/content/future-builders';

/**
 * Shown on /future-builders and mirrored into its FAQPage JSON-LD.
 * Built per request/revalidation so the dates, offer and wording follow the camp state.
 * Ordered by the objections parents raise first: time, readiness, equipment, missed classes,
 * fit, money, safety. Answer-first; every claim matches the programme facts in
 * content/future-builders.ts and the refund/shipping/terms pages. No cohort size, session count
 * or contact hours are stated (owner, 8 Nov 2026).
 */
export function getFutureBuildersFaqs(state: CohortState, now: Date = today()): FaqItem[] {
  const camp = state === 'open' || state === 'closing-soon' ? getOpenCohort(now) : null;
  const upcoming = state === 'upcoming' ? getUpcomingCohort(now) : null;
  const shown = camp ?? upcoming;
  const offer = getActiveOffer(now);
  const festive = offer.theme === 'festive';

  const faqs: (FaqItem | false)[] = [
    {
      question: 'When are the classes?',
      answer: shown
        ? `The ${shown.name} is ${shown.format}, in ${shown.months}. The exact dates and the timetable are shared after registration. Classes are live on video (IST), and every session is recorded.${camp ? ` Registration is open until ${formatCohortDate(camp.registrationCloses, true)}.` : ` Registration opens ${shown.registrationOpensLabel}.`}`
        : 'Dates for the next camp have not been announced yet; join the waitlist and we will tell you first. Classes are live on video (IST), and every session is recorded.',
    },
    {
      question: 'Will it take time away from school and exams?',
      answer: `The camp is planned for the summer break${shown ? `, ${shown.months}` : ''}. The exact timetable is shared after registration, and every session is recorded, so a missed class can be caught up from the recording.`,
    },
    {
      question: 'Do they need prior coding experience?',
      answer: 'No. The curriculum is designed for complete beginners in Grades 7 to 12. We teach everything from scratch, starting with basic logic and moving up to AI and hardware.',
    },
    {
      question: 'What device and internet connection do they need?',
      answer: `A laptop or desktop with a USB port (to program the kit) and internet that can handle a video call; a phone or tablet is not enough. We help set up the tools at orientation. Not sure your computer will do? Ask us on WhatsApp at ${WHATSAPP_DISPLAY}.`,
    },
    {
      question: 'What will my child actually learn to do?',
      answer: 'Write and debug Python programs, train small AI models to recognise images, wire physical IoT circuits, and pitch a product. They move from using technology to building it.',
    },
    {
      question: 'What happens if they miss a live session?',
      answer: 'Every live session is recorded and shared. A missed class can be caught up from the recording, with questions brought to the next live session.',
    },
    {
      question: 'Is it right for both a Grade 7 and a Grade 12 student?',
      answer: 'Yes. Everyone starts from the same basics, and projects are built in teams of 3–4 with an instructor reviewing each student’s work, so students who move faster can take on more of the build.',
    },
    {
      question: 'How does the hardware kit work for an online camp?',
      answer: 'We ship a personal ESP32-C3 hardware kit to your home before the IoT module, with free shipping anywhere in India. It includes the microcontroller, a breadboard, sensors (temperature, light, distance), LEDs and a servo motor. In the hardware sessions, instructors guide students step by step over video as they wire and program their own kit. The kit is theirs to keep.',
    },
    {
      question: 'What is Demo Day?',
      answer: 'Demo Day is the final session of the camp. Teams of 3–4 present the working prototype they built, combining software, AI and hardware, and pitch why it matters to parents, teachers and guests. Each student leaves with a recorded pitch and a certificate of completion.',
    },
    {
      question: 'How does this help students in Grades 10 to 12 applying to university?',
      answer: 'Admissions and scholarship panels look for evidence of initiative beyond marks. Students finish with a public GitHub repository, a recorded three-minute Demo Day pitch and a certificate of completion: proof of work for applications, essays and interviews.',
    },
    {
      question: 'What does the fee cover?',
      answer: camp
        ? `${festive ? `The ${offer.name} fee is ${rupees(offer.price)} (list price ${rupees(LIST_PRICE)}) until ${offer.endsLabel} IST; after that it is ${rupees(STANDARD_OFFER.price)}.` : `The fee is ${rupees(offer.price)} (list price ${rupees(LIST_PRICE)}).`} It covers the live classes across all four modules, the recordings, and the hardware kit shipped free to your door. It is the full amount charged at checkout; nothing is added for the kit or delivery. Payment is handled securely by Razorpay, and we email your confirmation and receipt as soon as it is confirmed.`
        : upcoming
          ? `The fee is confirmed when registration opens ${upcoming.registrationOpensLabel}. It covers the live classes, the recordings, and the hardware kit shipped free to your door. Asking to be notified is free and commits you to nothing.`
          : 'The fee for the next camp is confirmed when its dates are announced. It covers the live classes, the recordings, and the hardware kit shipped free to your door. Joining the waitlist is free.',
    },
    {
      question: 'What if it is not the right fit? What is the refund policy?',
      answer: 'If Session 1 is not right for your child, ask for a full refund within 24 hours of it, by email or WhatsApp, and keep the hardware kit. If you cancel more than 48 hours before the first class, you get a full refund, or you can move to a later camp at no extra cost. After the Session 1 window, fees are not refundable, but in a medical emergency or an unavoidable schedule clash we will move the place to the next camp. The full terms are on our refund policy page.',
    },
    {
      question: 'Is it safe, and what happens to our data?',
      answer: 'Every class is a live group session on video, led by SOYL instructors, and the recordings are shared with the students in the camp. We ask only for what we need to run the programme: a parent’s name and contact details, the student’s name and grade, and a delivery address for the kit. Registrations are stored on SOYL’s platform (Microsoft Azure, India). We use them only for Future Builders, we do not sell student data, and we handle it under our privacy policy (India’s DPDP Act 2023). Students own everything they build.',
    },
    camp !== null && {
      question: 'Is there a discount for registering with a friend?',
      answer: `Yes. If two friends register together, or your child was referred by someone already registered, use code ${FRIEND_CODE} at checkout and enter your friend’s name. You save ₹${FRIEND_DISCOUNT}${festive ? ` (${rupees(offer.price - FRIEND_DISCOUNT)} during the ${offer.name} offer)` : ''}, and your friend gets ₹${FRIEND_DISCOUNT} too: as a discount if they have not paid yet, or as a refund if they already have. ${FRIEND_CODE} is the only discount code.`,
    },
    {
      question: 'I still have questions. How do I reach you?',
      answer: `Message us on WhatsApp at ${WHATSAPP_DISPLAY} for a quick reply, or choose Request a call in the form on this page and we will call you ${CALLBACK_PROMISE}.`,
    },
  ];

  return faqs.filter((f): f is FaqItem => Boolean(f));
}
