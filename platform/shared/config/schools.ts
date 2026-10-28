/**
 * School capture (backend-api, 2026-10-28). Config, not code (CLAUDE.md rule 4). No imports: the web
 * imports this file too (client-side hints use the same limits as the server).
 *
 * D-014: a school (and its city) is stored and shown only for accounts whose consent is `granted`
 * (consent feature `profile_school_city`). A student picks an existing school or adds one; added
 * schools are `source = 'student'` and unverified until staff or an official list (UDISE+, CBSE
 * affiliation) confirms them. Names and cities are normalised so the same school is stored once.
 */

export const SCHOOL_SOURCES = ['student', 'udise', 'cbse'] as const;
export type SchoolSource = (typeof SCHOOL_SOURCES)[number];

export const SCHOOLS = {
  name: { minLength: 3, maxLength: 120, minLetters: 3 },
  city: { minLength: 2, maxLength: 60 },
  /** Phone or roll numbers: a run of this many digits or more is refused in a school name. */
  maxDigitRun: 4,
  search: {
    /** GET /v1/schools?q=: query length after normalisation. */
    minQueryLength: 2,
    maxQueryLength: 80,
    maxResults: 20,
    /**
     * Child safety: a school typed by a student appears in other students' search results only once at
     * least this many accounts have picked it (or it is verified). The student who added it always sees
     * it, and adding the same name + city again still finds the same row (dedupe does not depend on search).
     */
    unverifiedMinStudents: 2,
  },
  /** Schools one account may add in a rolling 24 hours (abuse of the shared table). */
  maxCreatedPerUserPerDay: 3,
} as const;

/**
 * Word aliases applied to the normalised name before deduplication ("Sr. Sec." = "Senior Secondary").
 * Keys and values are lower-case single words; values may be several words.
 */
export const SCHOOL_NAME_ALIASES: Readonly<Record<string, string>> = {
  sr: 'senior',
  snr: 'senior',
  sec: 'secondary',
  secy: 'secondary',
  hr: 'higher',
  govt: 'government',
  gov: 'government',
  intl: 'international',
  pub: 'public',
  sch: 'school',
  schl: 'school',
  vidyalay: 'vidyalaya',
  vidhyalaya: 'vidyalaya',
  st: 'saint',
  eng: 'english',
  med: 'medium',
};

/** Old and alternative city names → the current name (normalised, lower-case). */
export const CITY_ALIASES: Readonly<Record<string, string>> = {
  bombay: 'mumbai',
  bangalore: 'bengaluru',
  calcutta: 'kolkata',
  madras: 'chennai',
  gurgaon: 'gurugram',
  poona: 'pune',
  baroda: 'vadodara',
  trivandrum: 'thiruvananthapuram',
  cochin: 'kochi',
  mysore: 'mysuru',
  benares: 'varanasi',
  banaras: 'varanasi',
  allahabad: 'prayagraj',
  pondicherry: 'puducherry',
  'new delhi': 'delhi',
};

/** States and union territories of India (school.state must be one of these when given). */
export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const;
export type IndianState = (typeof INDIAN_STATES)[number];
