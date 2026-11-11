/**
 * /parents copy: consent and safety in plain words (docs/redesign-ink-and-wash.md §3.3, phase 3). Every line is a
 * rule the platform already enforces, never a promise beyond it. Sources:
 * - learning never waits for consent: D-014, CONTEXT §5;
 * - the parent's approval: D-039 and ADR-022 (the interim built-in provider; a code sent to the parent's email,
 *   the parent's address used once and not stored, only an age band asked), and what approval switches on
 *   (components/platform/consent/ConsentFlow.tsx `UNLOCKS`; lib/pricing/parents-copy.test.ts keeps them in step);
 * - withdrawing: ADR-022 (the link in the email; features off at once) and platform/db/PII.md (AI conversations
 *   and uploads deleted, learning records kept);
 * - email-only accounts and made-up public names: D-039, platform/shared/config/public-names.ts;
 * - moderation of every prompt and every answer, failing closed: ADR-015;
 * - no advertising, third-party tracking or chat between students on the platform's pages: CONTEXT §12, D-014
 *   (marketing pages load analytics once the cookie bar is accepted, so the line says "the learning pages").
 * Not said, on purpose: where data is stored (AI runs outside Central India, ADR-008) and how long AI data is
 * kept (retention is pending the owner's sign-off, PII.md F-015).
 */

export const CONSENT_STEPS = [
  {
    title: 'Lessons, practice and tests never wait for you.',
    line: 'They are open to every student. Tests need a free account; lessons and practice do not.',
  },
  {
    title: 'AI help waits for your yes.',
    line: 'If your child is under 18, AI help, photo doubts, leaderboards and rewards stay off until a parent approves. We email you a code, and giving it to your child is the yes.',
  },
  {
    title: 'You can take it back.',
    line: 'The same email has a link to withdraw. It switches those features off at once and deletes your child’s AI conversations and uploaded photos. Lessons and progress stay.',
  },
] as const;

export const SAFETY = [
  'We ask for an age group, never a date of birth.',
  'We use your email address once, to send the code, and do not keep it.',
  'An account needs only an email address. No name, phone number or school is required.',
  'Leaderboards show a made-up name, never a real one.',
  'Every question to the AI, and every answer, is checked before it is shown. If the check cannot run, AI help pauses.',
  'The learning pages carry no advertising and no third-party tracking, and students cannot chat with each other.',
] as const;
