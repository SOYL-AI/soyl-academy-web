/**
 * Reminder emails (D-055): the student reminder, the parent reminder and the parent-address confirmation.
 *
 * Voice: short, warm, useful, British English. No streak-loss threats, no guilt or fear-of-missing-out wording, no
 * counts of days missed. Plain text plus a simple HTML part in the platform email style (auth/senders/email.ts BRAND):
 * no images, no remote content, no tracking pixels (ACS engagement tracking is off per message too).
 *
 * Every reminder carries List-Unsubscribe (the one-click API URL) and List-Unsubscribe-Post (RFC 8058), and a footer
 * that says why it was sent, with an unsubscribe link (a platform page with a button) and the email settings link.
 *
 * Data minimisation (D-039): a student is greeted by a display name only if they set one (never the sign-up
 * placeholder or an email). A parent email names the student by their public name ("Brave Otter 417", D-039) and
 * the confirmation email adds the masked student address, so a mistyped parent address learns nothing more.
 */
import { BRAND, escapeHtml, type EmailMessage } from '../auth/senders/email';

const FONT = 'Arial,Helvetica,sans-serif';

/** The lesson to pick up (the student's "continue" target). */
export interface ContinueTarget {
  chapterTitle: string;
  /** e.g. "Science · Class 10". */
  context: string | null;
  /** Deep link to the lesson (or the chapter). */
  url: string;
}

export interface UnsubscribeLinks {
  /** Platform page with a button (token in the URL fragment). */
  page: string;
  /** POST-only API URL for List-Unsubscribe (RFC 8058). */
  oneClick: string;
}

export interface StudentReminderInput {
  to: string;
  /** The student's display name, if they set one; else "Hi there". */
  firstName: string | null;
  target: ContinueTarget | null;
  /** Weekly goal and daily challenge (when there is nothing to continue). */
  dashboardUrl: string;
  /** Only when config says AI credits refresh every day. */
  creditsRefreshDaily: boolean;
  minGapDays: number;
  unsubscribe: UnsubscribeLinks;
  settingsUrl: string;
}

export interface ParentReminderInput {
  to: string;
  /** Public name ("Brave Otter 417") or null → "Your child". */
  publicName: string | null;
  chapterTitle: string | null;
  minGapDays: number;
  unsubscribe: UnsubscribeLinks;
}

export interface ParentConfirmInput {
  to: string;
  publicName: string;
  /** Masked student email (a***@gmail.com), when the account has one. */
  studentHint: string | null;
  confirmUrl: string;
  hours: number;
  parentMinGapDays: number;
  privacyUrl: string;
}

/** First word of a display name, trimmed and capped (the name was screened when it was saved). */
export function greetingName(displayName: string | null | undefined): string | null {
  const first = displayName?.trim().split(/\s+/)[0]?.slice(0, 40) ?? '';
  return first.length ? first : null;
}

export function unsubscribeHeaders(oneClick: string): Record<string, string> {
  return { 'List-Unsubscribe': `<${oneClick}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' };
}

/* ---- HTML building blocks ------------------------------------------------------------------------ */

const h = escapeHtml;
const para = (html: string, pad = '16px 28px 0 28px', size = 15, color: string = BRAND.ink) =>
  `<tr><td style="padding:${pad};font-family:${FONT};font-size:${size}px;line-height:${Math.round(size * 1.5)}px;color:${color};">${html}</td></tr>`;
const link = (url: string, label: string) => `<a href="${h(url)}" style="color:${BRAND.cobalt};">${h(label)}</a>`;
const button = (url: string, label: string) =>
  `<tr><td style="padding:20px 28px 0 28px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${BRAND.cobalt};border-radius:8px;"><a href="${h(url)}" style="display:inline-block;padding:12px 20px;font-family:${FONT};font-size:15px;font-weight:bold;color:${BRAND.white};text-decoration:none;">${h(label)}</a></td></tr></table></td></tr>`;
const panel = (inner: string) =>
  `<tr><td style="padding:16px 28px 0 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.paper};border-radius:8px;"><tr><td style="padding:14px 16px;font-family:${FONT};">${inner}</td></tr></table></td></tr>`;

function page(title: string, rows: string[], footer: string[]): string {
  return `<!doctype html>
<html lang="en-GB">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${h(title)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.paper};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.paper};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${BRAND.white};border:1px solid ${BRAND.line};border-radius:12px;">
<tr><td style="padding:28px 28px 8px 28px;font-family:${FONT};font-size:18px;font-weight:bold;color:${BRAND.ink};">SOYL <span style="color:${BRAND.cobalt};">Academy</span></td></tr>
${rows.join('\n')}
<tr><td style="padding:28px 28px 0 28px;"><div style="border-top:1px solid ${BRAND.line};"></div></td></tr>
${footer.map((f, i) => para(f, `${i === 0 ? 16 : 8}px 28px ${i === footer.length - 1 ? 28 : 0}px 28px`, 13, BRAND.muted)).join('\n')}
</table>
</td></tr>
</table>
</body>
</html>`;
}

/* ---- Student reminder ---------------------------------------------------------------------------- */

export function studentReminderEmail(i: StudentReminderInput): EmailMessage {
  const hello = i.firstName ? `Hi ${i.firstName},` : 'Hi there,';
  const subject = i.target ? `Pick up ${i.target.chapterTitle} where you left off` : 'Your next step on SOYL Academy';
  const why = `Why you got this: reminders are on for your SOYL Academy account. We send one at most every ${i.minGapDays} days, and only when you have not opened SOYL Academy for a little while.`;
  const credits = 'Stuck on something? Your free AI credits refresh every day, so the AI tutor is there when you need it.';

  const text = [
    hello,
    '',
    ...(i.target
      ? [
          'Fancy a short session? Here is the one thing to pick up:',
          '',
          i.target.chapterTitle,
          ...(i.target.context ? [`${i.target.context} · you were partway through the lesson`] : ['You were partway through the lesson.']),
          '',
          `Continue where you left off: ${i.target.url}`,
        ]
      : ['Fancy a short session? Your weekly goal and today’s daily challenge are waiting on your dashboard:', '', i.dashboardUrl]),
    ...(i.creditsRefreshDaily ? ['', credits] : []),
    '',
    'Happy learning,',
    'SOYL Academy',
    '',
    '--',
    why,
    `Unsubscribe from reminders: ${i.unsubscribe.page}`,
    `Manage email settings: ${i.settingsUrl}`,
  ].join('\n');

  const rows = [
    para(h(hello), '8px 28px 0 28px', 16),
    ...(i.target
      ? [
          para('Fancy a short session? Here is the one thing to pick up:'),
          panel(
            `<div style="font-size:16px;line-height:24px;font-weight:bold;color:${BRAND.ink};">${h(i.target.chapterTitle)}</div><div style="font-size:14px;line-height:20px;color:${BRAND.muted};">${h(i.target.context ? `${i.target.context} · you were partway through the lesson` : 'You were partway through the lesson.')}</div>`,
          ),
          button(i.target.url, 'Continue where you left off'),
        ]
      : [para('Fancy a short session? Your weekly goal and today’s daily challenge are waiting on your dashboard.'), button(i.dashboardUrl, 'Open my dashboard')]),
    ...(i.creditsRefreshDaily ? [para(h(credits))] : []),
    para('Happy learning,<br>SOYL Academy', '20px 28px 0 28px'),
  ];
  const footer = [h(why), `${link(i.unsubscribe.page, 'Unsubscribe from reminders')} · ${link(i.settingsUrl, 'Manage email settings')}`];
  return { to: i.to, tag: 'reminder-student', subject, text, html: page(subject, rows, footer), headers: unsubscribeHeaders(i.unsubscribe.oneClick) };
}

/* ---- Parent reminder ----------------------------------------------------------------------------- */

export function parentReminderEmail(i: ParentReminderInput): EmailMessage {
  const who = i.publicName ?? 'Your child';
  const subject = 'A quick note from SOYL Academy';
  const line = i.chapterTitle
    ? `${who} hasn’t opened SOYL Academy for a few days; they left ${i.chapterTitle} halfway.`
    : `${who} hasn’t opened SOYL Academy for a few days.`;
  const nameNote = i.publicName ? `(${i.publicName} is the name your child’s SOYL Academy account uses.)` : null;
  const calm = 'Nothing needs doing. If it suits, a friendly word may help them pick it up again. Lessons, practice and tests on SOYL Academy are free.';
  const why = `Why you got this: your child added this address on their SOYL Academy profile and you confirmed it. We send one at most every ${i.minGapDays} days, only when they have not opened SOYL Academy for a few days. It is a reminder, not a progress report.`;

  const text = ['Hello,', '', line, ...(nameNote ? [nameNote] : []), '', calm, '', 'SOYL Academy', '', '--', why, `Unsubscribe: ${i.unsubscribe.page}`].join('\n');
  const rows = [
    para('Hello,', '8px 28px 0 28px', 16),
    para(h(line)),
    ...(nameNote ? [para(h(nameNote), '8px 28px 0 28px', 14, BRAND.muted)] : []),
    para(h(calm)),
    para('SOYL Academy', '20px 28px 0 28px'),
  ];
  const footer = [h(why), link(i.unsubscribe.page, 'Unsubscribe')];
  return { to: i.to, tag: 'reminder-parent', subject, text, html: page(subject, rows, footer), headers: unsubscribeHeaders(i.unsubscribe.oneClick) };
}

/* ---- Parent confirmation ------------------------------------------------------------------------- */

export function parentConfirmEmail(i: ParentConfirmInput): EmailMessage {
  const subject = 'Confirm your email for SOYL Academy reminders';
  const account = i.studentHint ? `the account ${i.studentHint}, shown to others as ${i.publicName}` : `shown to others as ${i.publicName}`;
  const intro = `A student on SOYL Academy (${account}) added this address to get an occasional reminder when they have not studied for a few days.`;
  const nothing = 'Nothing is sent to this address unless you confirm. To confirm, open the link and press Confirm:';
  const what = `What you would get: at most one short email every ${i.parentMinGapDays} days, only when they have not opened SOYL Academy for a few days. It is not a progress report, and every email has a one-click unsubscribe.`;
  const ignore = `The link works for ${i.hours} hours. If you do not know this student or do not want these emails, ignore this message: we will not email you again.`;

  const text = ['Hello,', '', intro, '', nothing, i.confirmUrl, '', what, '', ignore, '', `Privacy notice: ${i.privacyUrl}`, '', 'SOYL Academy'].join('\n');
  const rows = [para('Hello,', '8px 28px 0 28px', 16), para(h(intro)), para(h(nothing)), button(i.confirmUrl, 'Confirm my email'), para(h(what), '20px 28px 0 28px'), para(h(ignore))];
  const footer = [`${link(i.privacyUrl, 'Privacy notice')}. You got this email because a student typed this address on their SOYL Academy profile.`];
  return { to: i.to, tag: 'reminder-parent-confirm', subject, text, html: page(subject, rows, footer) };
}
