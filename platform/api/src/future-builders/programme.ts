/**
 * Future Builders programme details used in the confirmation email (ADR-027). Config, not code: change the
 * wording here, not in the template. A cohort that is not listed still registers and gets the generic text
 * (a paid registration is never refused for its cohort slug).
 */
export interface FbCohort {
  /** "Future Builders Summer Camp 2027" */
  title: string;
  /** One line about the programme. */
  programme: string;
}

export const FB_COHORTS: Readonly<Record<string, FbCohort>> = {
  'summer-2027': {
    title: 'Future Builders Summer Camp 2027',
    programme: 'A 2-month summer camp in April–May 2027. The exact dates and the timetable are shared after registration.',
  },
};

export const FB_DEFAULT_COHORT: FbCohort = {
  title: 'Future Builders',
  programme: 'The exact dates and the timetable are shared after registration.',
};

export const FB_CONTACT = {
  /** Support WhatsApp (display form and wa.me link). */
  whatsappDisplay: '+91 70225 09965',
  whatsappLink: 'https://wa.me/917022509965',
  refundPolicyUrl: 'https://www.soylai.com/refund-policy',
  /** Kit line in "next steps" (marketing page: ESP32-C3 kit, shipped free across India, theirs to keep). */
  kit: 'Your child’s hardware kit (ESP32-C3 microcontroller, breadboard, sensors, LEDs and a servo) ships free anywhere in India and is theirs to keep. We will confirm the delivery address with you on WhatsApp and share tracking once it ships.',
} as const;

export const fbCohort = (slug: string): FbCohort => FB_COHORTS[slug] ?? FB_DEFAULT_COHORT;

/** Offer labels for emails, admin and CSV. */
export const FB_OFFER_LABELS: Readonly<Record<string, string>> = {
  // The early-bird price: the Diwali offer, then the Children's Day offer (D-054); one slug for both.
  'diwali-2026': 'Early-bird offer',
  standard: 'Standard',
};
