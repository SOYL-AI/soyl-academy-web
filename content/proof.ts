/**
 * Social proof — content contract.
 *
 * Everything here is intentionally EMPTY. <ProofSection /> renders nothing
 * until at least one array has real entries, so nothing is fabricated and no
 * placeholder ever ships to production.
 *
 * To launch: add real, permissioned entries below. Every field is required
 * unless marked optional. Do not add statistics you cannot source.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Science teacher" */
  role: string;
  /** School or organisation, with their permission. */
  school: string;
  /** Optional portrait in /public/images/proof. Needs alt text. */
  photo?: { src: string; alt: string };
}

export interface SchoolLogo {
  name: string;
  /** SVG or PNG in /public/images/proof. Ask the school for its approved logo file. */
  logo: string;
}

export interface StudentProject {
  title: string;
  subject: string;
  /** One sentence on what the student made or argued. */
  summary: string;
  image: { src: string; alt: string };
}

export interface LearningStat {
  /** The figure exactly as it can be sourced, e.g. "4 schools". */
  value: string;
  label: string;
  /** Where the number comes from. Required: no source, no stat. */
  source: string;
}

export const testimonials: Testimonial[] = [];
export const schoolLogos: SchoolLogo[] = [];
export const studentProjects: StudentProject[] = [];
export const learningStats: LearningStat[] = [];
