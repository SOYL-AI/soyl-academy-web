/**
 * Subject → template family (platform/content-templates/README.md "Families").
 *
 * Rules are matched in order against the subject slug (the id without "<exam>-<class>-").
 * Language subjects are routed by teaching language. English and Hindi split per chapter:
 * chapters that list literature texts use the *-literature family, the rest *-language.
 * Subjects that match no rule fall back to `other` and are reported as unknown by
 * `npm run content -- catalog` and the completeness test, so a new catalog subject forces a
 * mapping decision here.
 */
import type { Subject, SyllabusChapter } from '@soyl/shared/content/index';

export const FAMILIES = [
  'maths',
  'physics',
  'chemistry',
  'biology',
  'science',
  'social-science',
  'economics-commerce',
  'english-language',
  'english-literature',
  'hindi-language',
  'hindi-literature',
  'computer-science',
  'other',
] as const;
export type Family = (typeof FAMILIES)[number];

/** Families where "a visual every 3 slides" and "≥ 2 worked examples" do not apply (CONTEXT §8 "where the subject allows"). */
export const TEXT_FAMILIES: ReadonlySet<Family> = new Set(['english-language', 'english-literature', 'hindi-language', 'hindi-literature']);
export const LITERATURE_FAMILIES: ReadonlySet<Family> = new Set(['english-literature', 'hindi-literature']);

interface Rule {
  family: Family;
  pattern: RegExp;
  why: string;
}

/** Ordered: first match wins. */
export const FAMILY_RULES: readonly Rule[] = [
  { family: 'other', pattern: /^shorthand-/, why: 'stenography skill subject' },
  { family: 'maths', pattern: /^(mathematics|applied-mathematics|maths|statistics)(-|$)/, why: 'mathematics' },
  { family: 'science', pattern: /^(science|science-advanced|environmental-science|environmental-applications|foundation-skills-for-sciences)$/, why: 'combined science' },
  { family: 'physics', pattern: /^(physics|engineering-science|electricity-electronics)$/, why: 'physics' },
  { family: 'chemistry', pattern: /^chemistry$/, why: 'chemistry' },
  { family: 'biology', pattern: /^(biology|biotechnology|agriculture|horticulture)$/, why: 'life sciences' },
  {
    family: 'social-science',
    pattern: /^(social-science|history|history-civics|history-civics-thailand|political-science|geography|geography-thailand|sociology|psychology|legal-studies|individuals-in-society|knowledge-traditions-and-practices-of-india)$/,
    why: 'humanities',
  },
  {
    family: 'economics-commerce',
    pattern:
      /^(economics|economic-applications|accountancy|accounts|commerce|commercial-studies|commercial-applications|business-studies|business-administration|elements-of-business|elements-of-book-keeping-and-accountancy|entrepreneurship|cost-accounting|taxation|banking|banking-and-insurance|insurance|financial-markets-management|introduction-to-financial-markets|marketing|marketing-and-sales|salesmanship|retail)$/,
    why: 'economics and commerce',
  },
  {
    family: 'computer-science',
    pattern:
      /^(computer-science|computer-applications|computer-studies|informatics-practices|information-technology|artificial-intelligence|computational-thinking-and-ai|data-science|web-application|robotics|robotics-artificial-intelligence|typography-and-computer-application|basic-data-entry-operator|multi-media)$/,
    why: 'computing',
  },
  {
    family: 'other',
    pattern:
      /^(art|art-education|painting|sculpture|graphics|applied-commercial-art|design|design-thinking|design-thinking-and-innovation|textile-design|fashion-designing|fashion-studies|apparel|drama|performing-arts|western-music|carnatic-music.*|hindustani-music.*|indian-dance|.*-dance|physical-education|physical-education-and-well-being|health-and-physical-education|health-physical-education|yoga|ncc|supw-community-service|work-experience|general-studies|vocational-education|multi-skill-foundation-course|home-science|food-nutrition-and-dietetics|engineering-graphics|geometrical-building-drawing|geometrical-mechanical-drawing|technical-drawing-applications|mass-media-communication|mass-media-studies|library-and-information-science|early-childhood-care-and-education|early-years-physical-activity-facilitator|physical-activity-trainer|tourism|introduction-to-tourism|hospitality-management|front-office-operations|food-production|cookery|dietetic-aide|cashier|assistant-beauty-therapist|assistant-hair-stylist|beauty-and-wellness|auto-service-technician|automotive|land-transportation-associate|air-conditioning-and-refrigeration|electrical-technology|electronics-technology|electronics-and-hardware|geospatial-technology|security|health-care|medical-diagnostics|office-procedures-and-practices)$/,
    why: 'arts, physical education and skill subjects (theory only)',
  },
];

export interface FamilyMatch {
  family: Family;
  /** "rule" (slug matched), "language" (routed by teaching language) or "unknown" (fell back to other). */
  matchedBy: 'rule' | 'language' | 'unknown';
  why: string;
}

export function subjectSlug(subjectId: string): string {
  return subjectId.split('-').slice(2).join('-');
}

type SubjectLike = Pick<Subject, 'id' | 'tier' | 'language'>;

export function familyForSubject(subject: SubjectLike): FamilyMatch {
  const slug = subjectSlug(subject.id);
  for (const rule of FAMILY_RULES) if (rule.pattern.test(slug)) return { family: rule.family, matchedBy: 'rule', why: rule.why };
  if (subject.tier === 'language' || /english|literature/.test(slug)) {
    if (subject.language === 'en') {
      const lit = /literature/.test(slug) && !/language-and-literature/.test(slug);
      return { family: lit ? 'english-literature' : 'english-language', matchedBy: 'language', why: 'English' };
    }
    if (subject.language === 'hi') return { family: 'hindi-language', matchedBy: 'language', why: 'Hindi' };
    return { family: 'other', matchedBy: 'language', why: `language subject (${subject.language}); no dedicated family yet` };
  }
  return { family: 'other', matchedBy: 'unknown', why: `no rule for slug "${slug}"` };
}

/** Per-chapter family: literature chapters of English/Hindi subjects use the literature family. */
export function familyForChapter(subject: SubjectLike, chapter: Pick<SyllabusChapter, 'literature_texts'> | null): Family {
  const { family } = familyForSubject(subject);
  const hasLiterature = (chapter?.literature_texts.length ?? 0) > 0;
  if (family === 'english-language' && hasLiterature) return 'english-literature';
  if (family === 'hindi-language' && hasLiterature) return 'hindi-literature';
  if (family === 'english-literature' && chapter && !hasLiterature) return 'english-literature';
  return family;
}

/** True when a chapter must be checked for literature reproduction (CONTEXT §8). */
export function isLiteratureChapter(subject: SubjectLike, chapter: Pick<SyllabusChapter, 'literature_texts'> | null): boolean {
  return LITERATURE_FAMILIES.has(familyForChapter(subject, chapter)) || (chapter?.literature_texts.length ?? 0) > 0;
}
