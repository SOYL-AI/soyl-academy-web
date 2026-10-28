/**
 * School name / city cleaning, validation and dedupe keys (pure; no I/O). The API stores what
 * `validateSchoolInput` returns; the web may run the same checks before submitting. Numbers and
 * alias lists: ../config/schools.ts. Blocked words: DISPLAY_NAME.blockedWords (../config/security.ts).
 *
 * Child safety: a school name is shared data (other students can find it in search), so it must not
 * carry contact details, links, handles or abuse. Names keep the student's spelling for display; the
 * normalised keys (lower case, punctuation removed, common abbreviations expanded, old city names
 * mapped) decide whether two entries are the same school.
 */
import { CITY_ALIASES, INDIAN_STATES, SCHOOL_NAME_ALIASES, SCHOOLS, type IndianState } from '../config/schools';
import { DISPLAY_NAME } from '../config/security';

export type FieldResult = { ok: true; value: string; key: string } | { ok: false; reason: string };

// eslint-disable-next-line no-control-regex
const INVISIBLE = /[\u0000-\u001f\u007f​-‏‪-‮⁠-⁤﻿]/;
const NAME_CHARS = /^[\p{L}\p{M}\p{N} .,'’&()/-]+$/u;
const CITY_CHARS = /^[\p{L}\p{M} .'’-]+$/u;
const CONTACT = /@|https?:|www\.|\.(com|in|net|org|io|me|co|edu|ac|info|xyz)\b/i;
const HANDLE_WORDS = new Set(['instagram', 'insta', 'whatsapp', 'telegram', 'snapchat', 'facebook', 'youtube', 'discord', 'twitter']);

/** NFKC, whitespace collapsed, trimmed. */
export function cleanText(raw: string): string {
  return raw.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

/** Lower-case words: '&' → 'and', apostrophes dropped ("Mary's" → "marys"), other punctuation → space. */
function words(s: string): string[] {
  return s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’`]/g, '')
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

/** Dedupe key of a school name: "St. Mary's Sr. Sec. School" → "saint marys senior secondary school". */
export function normalizeSchoolName(name: string): string {
  return words(name)
    .map((w) => SCHOOL_NAME_ALIASES[w] ?? w)
    .join(' ');
}

/** Dedupe key of a city: "Bombay" → "mumbai", "New  Delhi" → "delhi". */
export function normalizeCity(city: string): string {
  const k = words(city).join(' ');
  return CITY_ALIASES[k] ?? k;
}

const squash = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '').replace(/(.)\1+/gu, '$1');

/**
 * Whole words only (a substring test would refuse real names such as "Shitala Devi Vidyalaya" or
 * "Essex"); long blocked words are also matched with spaces and dots removed ("m a d a r c h o d").
 */
function hasBlockedWord(value: string): boolean {
  const ws = new Set(words(value));
  const squashed = squash(value);
  return DISPLAY_NAME.blockedWords.some((b) => ws.has(b) || (b.length >= 7 && squashed.includes(squash(b))));
}

function contactCheck(value: string): string | null {
  if (CONTACT.test(value)) return 'must not contain emails, links or handles';
  if (words(value).some((w) => HANDLE_WORDS.has(w))) return 'must not contain social media handles';
  const runs = value.match(/\d+/g) ?? [];
  if (runs.some((r) => r.length > SCHOOLS.maxDigitRun) || runs.join('').length > SCHOOLS.maxDigitRun + 2) return 'must not contain phone or roll numbers';
  return null;
}

export function validateSchoolName(raw: string): FieldResult {
  if (INVISIBLE.test(raw)) return { ok: false, reason: 'contains invisible or control characters' };
  const value = cleanText(raw);
  const length = [...value].length;
  if (length < SCHOOLS.name.minLength) return { ok: false, reason: `must be at least ${SCHOOLS.name.minLength} characters` };
  if (length > SCHOOLS.name.maxLength) return { ok: false, reason: `must be at most ${SCHOOLS.name.maxLength} characters` };
  const contact = contactCheck(value);
  if (contact) return { ok: false, reason: contact };
  if (!NAME_CHARS.test(value)) return { ok: false, reason: 'may use letters, numbers, spaces and . , \' & ( ) / - only' };
  if ((value.match(/\p{L}/gu) ?? []).length < SCHOOLS.name.minLetters) return { ok: false, reason: `must have at least ${SCHOOLS.name.minLetters} letters` };
  if (hasBlockedWord(value)) return { ok: false, reason: 'is not allowed' };
  const key = normalizeSchoolName(value);
  if (!key) return { ok: false, reason: 'is not a school name' };
  return { ok: true, value, key };
}

export function validateCity(raw: string): FieldResult {
  if (INVISIBLE.test(raw)) return { ok: false, reason: 'contains invisible or control characters' };
  const value = cleanText(raw);
  const length = [...value].length;
  if (length < SCHOOLS.city.minLength) return { ok: false, reason: `must be at least ${SCHOOLS.city.minLength} characters` };
  if (length > SCHOOLS.city.maxLength) return { ok: false, reason: `must be at most ${SCHOOLS.city.maxLength} characters` };
  if (CONTACT.test(value)) return { ok: false, reason: 'must not contain emails, links or handles' };
  if (!CITY_CHARS.test(value)) return { ok: false, reason: 'may use letters, spaces, dots, apostrophes and hyphens only' };
  if (hasBlockedWord(value)) return { ok: false, reason: 'is not allowed' };
  const key = normalizeCity(value);
  if (!key) return { ok: false, reason: 'is not a city name' };
  return { ok: true, value, key };
}

/** The canonical state/UT name for a case- and space-insensitive match, else null. */
export function canonicalState(raw: string): IndianState | null {
  const k = words(raw).join(' ');
  return INDIAN_STATES.find((s) => words(s).join(' ') === k) ?? null;
}

/**
 * Search query → normalised prefixes to match against name keys (empty when too short). Every word but
 * the last is expanded like a stored name; the last word may still be being typed, so it is tried both
 * as typed ("st" → "stella maris") and expanded ("st" → "saint xavier"). Keys hold only letters,
 * numbers and single spaces, so they are safe inside a LIKE pattern.
 */
export function schoolSearchKeys(q: string): string[] {
  const ws = words(q.slice(0, SCHOOLS.search.maxQueryLength * 2));
  if (!ws.length) return [];
  const head = ws.slice(0, -1).map((w) => SCHOOL_NAME_ALIASES[w] ?? w);
  const last = ws[ws.length - 1]!;
  const keys = new Set([[...head, last].join(' '), [...head, SCHOOL_NAME_ALIASES[last] ?? last].join(' ')].map((k) => k.slice(0, SCHOOLS.search.maxQueryLength).trim()));
  return [...keys].filter((k) => k.length >= SCHOOLS.search.minQueryLength);
}
