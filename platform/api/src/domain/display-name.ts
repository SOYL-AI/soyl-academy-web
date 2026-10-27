/**
 * Display-name validation (AC-18, F-017). Since D-039 other students never see display names (leaderboards
 * show an auto-generated public name), but the name is still shown on the student's own screens and
 * reviewed by staff, so it must not carry contact details, handles, links or abuse.
 *
 * Rules: NFKC-normalised, spaces collapsed, 2–20 characters; letters (Latin or Devanagari), spaces,
 * apostrophes, dots and hyphens only — which already excludes '@', '/', ':' and other URL/handle
 * characters; no run of 5+ digits (digits are not letters, so none at all today); no email/URL/
 * handle patterns; not on the blocked-word list (spaces, dots and repeated letters ignored).
 */
import { DISPLAY_NAME } from '@soyl/shared/config/security';

export type DisplayNameResult = { ok: true; value: string } | { ok: false; reason: string };

const ALLOWED = /^[\p{Script=Latin}\p{Script=Devanagari}\p{M} .'-]+$/u;

function squash(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\s.'_-]+/g, '')
    .replace(/(.)\1+/g, '$1')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/@/g, 'a');
}

export function validateDisplayName(raw: string): DisplayNameResult {
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f​-‏‪-‮⁠-⁤﻿]/.test(raw)) return { ok: false, reason: 'contains invisible or control characters' };
  const value = raw.normalize('NFKC').replace(/\s+/g, ' ').trim();
  const length = [...value].length;
  if (length < DISPLAY_NAME.minLength) return { ok: false, reason: `must be at least ${DISPLAY_NAME.minLength} characters` };
  if (length > DISPLAY_NAME.maxLength) return { ok: false, reason: `must be at most ${DISPLAY_NAME.maxLength} characters` };
  if (new RegExp(`\\d{${DISPLAY_NAME.maxDigitRun + 1},}`).test(value)) return { ok: false, reason: 'must not contain phone or roll numbers' };
  if (/@|https?:|www\.|\.(com|in|net|org|io|me|co)\b/i.test(value)) return { ok: false, reason: 'must not contain emails, links or handles' };
  if (!ALLOWED.test(value)) return { ok: false, reason: 'may use letters, spaces, apostrophes, dots and hyphens only' };
  const squashed = squash(value);
  if (DISPLAY_NAME.blockedWords.some((w) => squashed.includes(squash(w)))) return { ok: false, reason: 'is not allowed' };
  return { ok: true, value };
}
