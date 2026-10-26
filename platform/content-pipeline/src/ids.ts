/**
 * Question id prefix, the `{{id_prefix}}` template placeholder: `q_<exam><class><abbrev>_chNN`,
 * e.g. cbse-10-science-ch01 → q_cbse10sci_ch01 (the exemplar style). The abbreviation comes from
 * SUBJECT_ABBREVIATIONS when the slug is listed there, otherwise it is the slug with hyphens
 * removed (always unique, because slugs are unique within an exam and class). A test checks that
 * no two subjects of the same exam and class share a prefix across the whole catalog.
 * Final question ids are `<prefix>_NNN` (three digits, assigned in assembly order).
 */
export const SUBJECT_ABBREVIATIONS: Readonly<Record<string, string>> = {
  science: 'sci',
  'science-advanced': 'sciadv',
  mathematics: 'math',
  'mathematics-advanced': 'mathadv',
  'applied-mathematics': 'amath',
  'social-science': 'sst',
  physics: 'phy',
  chemistry: 'chem',
  biology: 'bio',
  biotechnology: 'biotech',
  'computer-science': 'cs',
  'computer-applications': 'ca',
  'computer-studies': 'cst',
  'informatics-practices': 'ip',
  'information-technology': 'it',
  'artificial-intelligence': 'ai',
  accountancy: 'acc',
  accounts: 'acct',
  'business-studies': 'bst',
  economics: 'eco',
  'economic-applications': 'ecoa',
  commerce: 'com',
  'commercial-studies': 'coms',
  'commercial-applications': 'coma',
  history: 'hist',
  'history-civics': 'hcv',
  geography: 'geo',
  'political-science': 'pol',
  psychology: 'psy',
  sociology: 'soc',
  'physical-education': 'pe',
  'environmental-science': 'evs',
  'home-science': 'hsc',
  'legal-studies': 'legal',
  entrepreneurship: 'ent',
  english: 'eng',
  'english-core': 'engc',
  'english-elective': 'enge',
  'english-language': 'engl',
  'english-language-and-literature': 'engll',
  'english-communicative': 'engcom',
  'literature-in-english': 'englit',
  hindi: 'hin',
  'hindi-a': 'hina',
  'hindi-b': 'hinb',
  'hindi-core': 'hinc',
  'hindi-elective': 'hine',
  sanskrit: 'san',
};

export function subjectAbbreviation(slug: string): string {
  return SUBJECT_ABBREVIATIONS[slug] ?? slug.replace(/-/g, '');
}

/** cbse-10-science-ch01 → q_cbse10sci_ch01 */
export function questionIdPrefix(chapterId: string): string {
  const m = /^(cbse|icse|isc)-(\d{1,2})-(.+)-ch(\d{2})$/.exec(chapterId);
  if (!m) throw new Error(`not a chapter id: ${chapterId}`);
  const [, exam, cls, slug, ch] = m;
  return `q_${exam}${cls}${subjectAbbreviation(slug!)}_ch${ch}`;
}

export function questionId(prefix: string, n: number): string {
  return `${prefix}_${String(n).padStart(3, '0')}`;
}
