import { describe, expect, it } from 'vitest';
import { INDIAN_STATES, SCHOOLS } from '../config/schools';
import { canonicalState, normalizeCity, normalizeSchoolName, schoolSearchKeys, validateCity, validateSchoolName } from './school';

describe('normalised keys (dedupe)', () => {
  it('ignores case, punctuation and spacing, expands common abbreviations', () => {
    const k = normalizeSchoolName("St. Mary's Sr. Sec. School");
    expect(k).toBe('saint marys senior secondary school');
    expect(normalizeSchoolName('ST MARYS SENIOR SECONDARY SCHOOL')).toBe(k);
    expect(normalizeSchoolName('  St Mary’s   Senior-Secondary School ')).toBe(k);
    expect(normalizeSchoolName('Govt. Hr. Sec. Sch.')).toBe('government higher secondary school');
    expect(normalizeSchoolName('D.A.V. Public School')).toBe('d a v public school');
    expect(normalizeSchoolName('Arya & Co School')).toBe('arya and co school');
  });

  it('keeps Devanagari (matras included)', () => {
    expect(normalizeSchoolName('केंद्रीय विद्यालय, पुणे')).toBe('केंद्रीय विद्यालय पुणे');
  });

  it('maps old city names to current ones', () => {
    expect(normalizeCity('Bombay')).toBe('mumbai');
    expect(normalizeCity(' MUMBAI ')).toBe('mumbai');
    expect(normalizeCity('Bangalore')).toBe('bengaluru');
    expect(normalizeCity('New  Delhi')).toBe('delhi');
    expect(normalizeCity('Navi Mumbai')).toBe('navi mumbai');
  });
});

describe('validateSchoolName', () => {
  it('accepts real school names and returns the cleaned display value and key', () => {
    for (const name of ["St. Xavier's High School", 'Kendriya Vidyalaya No. 2', 'Delhi Public School, Sector 45', 'Shitala Devi Vidyalaya', 'Essex Convent (ICSE)', 'केंद्रीय विद्यालय', 'Govt. Model Sr. Sec. School 1234']) {
      const r = validateSchoolName(name);
      expect(r, name).toMatchObject({ ok: true });
    }
    expect(validateSchoolName('  Delhi   Public School ')).toEqual({ ok: true, value: 'Delhi Public School', key: 'delhi public school' });
  });

  it.each([
    ['an email', 'dps rahul@gmail.com'],
    ['a link', 'www.myschool.com'],
    ['a link with scheme', 'https://school.in'],
    ['a domain', 'myschool.in'],
    ['a phone number', 'Call 9876543210'],
    ['a spaced phone number', 'School 98765 43210'],
    ['a handle word', 'insta rahul school'],
    ['a blocked word', 'Fuck School'],
    ['a squashed long blocked word', 'm a d a r c h o d school'],
    ['too short', 'ab'],
    ['too few letters', '12 3'],
    ['too long', 'A'.repeat(SCHOOLS.name.maxLength + 1)],
    ['control characters', 'Bad​School'],
    ['symbols', 'School <script>'],
    ['emoji', 'Best School 🙂'],
  ])('refuses %s', (_why, name) => {
    expect(validateSchoolName(name).ok).toBe(false);
  });
});

describe('validateCity', () => {
  it('accepts city names, refuses digits, links and symbols', () => {
    expect(validateCity(' navi  mumbai ')).toEqual({ ok: true, value: 'navi mumbai', key: 'navi mumbai' });
    expect(validateCity("Port Blair")).toMatchObject({ ok: true });
    expect(validateCity('पुणे')).toMatchObject({ ok: true, key: 'पुणे' });
    expect(validateCity('Pune 411001').ok).toBe(false);
    expect(validateCity('pune.com').ok).toBe(false);
    expect(validateCity('P').ok).toBe(false);
    expect(validateCity('Pune!').ok).toBe(false);
  });
});

describe('states and search keys', () => {
  it('canonical state names, case- and space-insensitive', () => {
    expect(canonicalState('maharashtra')).toBe('Maharashtra');
    expect(canonicalState('  TAMIL   nadu ')).toBe('Tamil Nadu');
    expect(canonicalState('Narnia')).toBeNull();
    expect(new Set(INDIAN_STATES).size).toBe(36);
  });

  it('search keys: the last word as typed and expanded; too short gives none', () => {
    expect(schoolSearchKeys('st')).toEqual(['st', 'saint']);
    expect(schoolSearchKeys('St. Mary')).toEqual(['saint mary']);
    expect(schoolSearchKeys('delhi public s')).toEqual(['delhi public s']);
    expect(schoolSearchKeys('Sr Sec')).toEqual(['senior sec', 'senior secondary']);
    expect(schoolSearchKeys('a')).toEqual([]);
    expect(schoolSearchKeys('!!')).toEqual([]);
    // Keys never carry LIKE wildcards.
    expect(schoolSearchKeys('50%_off school').every((k) => !/[%_\\]/.test(k))).toBe(true);
  });
});
