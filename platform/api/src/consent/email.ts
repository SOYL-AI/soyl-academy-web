/**
 * The parent's approval email (built-in consent provider, D-039, ADR-022). Plain text plus a simple HTML
 * part, no images, no tracking (ACS engagement tracking is off per message). It says, in plain words,
 * what approving switches on, what data that uses and how to withdraw. The approval code is the first
 * 6-digit number in the text part (the mock outbox and e2e read it from there).
 *
 * It names the student only by a masked email ("s•••@gmail.com"), so a mistyped parent address does not
 * hand a stranger the child's address.
 */
import { BUILTIN_CONSENT } from '@soyl/shared/config/security';
import type { EmailMessage } from '../auth/senders/email';

export interface ParentConsentEmailInput {
  to: string;
  code: string;
  /** Masked student email, e.g. "s•••@gmail.com". */
  studentHint: string;
  hours: number;
  privacyUrl: string;
  termsUrl: string;
  /** Withdraw/decline page with the signed token in the URL fragment. */
  withdrawUrl: string;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** SOYL brand colours (app/globals.css): paper, ink, muted, cobalt. */
const BRAND = { paper: '#F4F0E7', white: '#FFFFFF', ink: '#171717', muted: '#5E5E59', cobalt: '#3155FF', line: '#E4DED1' } as const;

export const PARENT_EMAIL_UNLOCKS = [
  ['AI tutor', 'the student can ask an AI model about their lessons. Questions and answers are checked by moderation and kept for 30 days.'],
  ['Photo doubts', 'the student can upload a photo of a question. Photos are cleaned (location data removed) and deleted after 30 days.'],
  ['Leaderboards and rewards', 'points and ranks appear on leaderboards and leagues under an auto-generated nickname (never a real name), and the student can earn SOYL Coins.'],
] as const;

export const PARENT_EMAIL_DATA = [
  'Lessons, practice and tests are free and stay open whether or not you approve.',
  'Approval also allows buying an optional paid AI plan. Nothing is ever charged unless someone completes a payment at checkout.',
  'We do not sell data, show ads or use third-party trackers. Data is stored in India (Azure Central India).',
  `We record that you approved, when, and the version of this notice (${BUILTIN_CONSENT.policyVersion}). We keep only a scrambled (hashed) form of your email address, not the address itself.`,
] as const;

export function parentConsentEmail(i: ParentConsentEmailInput): EmailMessage {
  const text = [
    `Your approval code is ${i.code}`,
    '',
    `A student with the SOYL Academy account ${i.studentHint} has asked you, as their parent or guardian, to approve a few extra features. If you agree, give them this code to enter. It expires in ${i.hours} hours.`,
    '',
    'Approving switches on:',
    ...PARENT_EMAIL_UNLOCKS.map(([t, d]) => `- ${t}: ${d}`),
    '',
    'About data:',
    ...PARENT_EMAIL_DATA.map((d) => `- ${d}`),
    '',
    `Privacy notice: ${i.privacyUrl}`,
    `Terms: ${i.termsUrl}`,
    '',
    'Changed your mind, or did not expect this email? Withdraw or decline here (you do not need an account):',
    i.withdrawUrl,
    'Withdrawing switches these features off at once and deletes the student’s AI conversations and uploaded photos.',
    '',
    'Never share this code with anyone other than your child. SOYL Academy staff will never ask you for it.',
    '',
    'SOYL Academy',
  ].join('\n');

  const p = (html: string, extra = '') =>
    `<tr><td style="padding:8px 28px 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:${BRAND.ink};${extra}">${html}</td></tr>`;
  const list = (items: string[]) => `<ul style="margin:4px 0 0 0;padding-left:20px;">${items.map((x) => `<li style="margin:4px 0;">${x}</li>`).join('')}</ul>`;
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Parent approval for SOYL Academy</title></head>
<body style="margin:0;padding:0;background:${BRAND.paper};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.paper};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:${BRAND.white};border:1px solid ${BRAND.line};border-radius:12px;">
<tr><td style="padding:28px 28px 8px 28px;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:${BRAND.ink};">SOYL <span style="color:${BRAND.cobalt};">Academy</span></td></tr>
${p('Your approval code is')}
<tr><td style="padding:12px 28px;"><div style="font-family:'Courier New',Courier,monospace;font-size:32px;line-height:40px;font-weight:bold;letter-spacing:8px;color:${BRAND.ink};background:${BRAND.paper};border-radius:8px;padding:12px 16px;text-align:center;">${escapeHtml(i.code)}</div></td></tr>
${p(`A student with the SOYL Academy account <strong>${escapeHtml(i.studentHint)}</strong> has asked you, as their parent or guardian, to approve a few extra features. If you agree, give them this code to enter. It expires in <strong>${escapeHtml(String(i.hours))} hours</strong>.`)}
${p(`<strong>Approving switches on:</strong>${list(PARENT_EMAIL_UNLOCKS.map(([t, d]) => `<strong>${escapeHtml(t)}</strong>: ${escapeHtml(d)}`))}`, 'padding-top:16px;')}
${p(`<strong>About data:</strong>${list(PARENT_EMAIL_DATA.map((d) => escapeHtml(d)))}`, 'padding-top:16px;')}
${p(`<a href="${escapeHtml(i.privacyUrl)}" style="color:${BRAND.cobalt};">Privacy notice</a> &middot; <a href="${escapeHtml(i.termsUrl)}" style="color:${BRAND.cobalt};">Terms</a>`, 'padding-top:16px;')}
${p(`Changed your mind, or did not expect this email? <a href="${escapeHtml(i.withdrawUrl)}" style="color:${BRAND.cobalt};">Withdraw or decline approval</a> (no account needed). Withdrawing switches these features off at once and deletes the student’s AI conversations and uploaded photos.`, 'padding-top:16px;')}
<tr><td style="padding:16px 28px 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:${BRAND.muted};">Never share this code with anyone other than your child. SOYL Academy staff will never ask you for it.</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
  return { to: i.to, tag: 'parent-consent', subject: 'Approve extra features on SOYL Academy', text, html };
}
