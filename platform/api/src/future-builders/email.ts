/**
 * Future Builders emails (ADR-027): the parent's confirmation (receipt + Bill of Supply wording while the
 * company is not GST-registered, D-046) and the short staff notifications. Plain text plus a simple HTML part
 * in the platform's email style (auth/senders/email.ts): no images, no tracking, every value escaped.
 */
import { formatRupees } from '@soyl/shared/billing/gst';
import { INVOICING, sellerAddressLines, type InvoicingConfig } from '@soyl/shared/config/invoicing';
import { BRAND, escapeHtml, type EmailMessage } from '../auth/senders/email';
import { FB_CONTACT, FB_OFFER_LABELS, fbCohort } from './programme';

export interface FbEnrollmentForEmail {
  receiptNumber: string;
  razorpayPaymentId: string;
  amountPaise: number;
  paidAt: Date;
  cohort: string;
  offer: string;
  coupon: string | null;
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
}

const IST_DATE_TIME = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

/** "8 Nov 2026, 3:42 pm IST" */
export const istDateTime = (d: Date): string => `${IST_DATE_TIME.format(d)} IST`;
/** "₹4,999.00" (Indian digit grouping). */
export const rupees = (paise: number): string => `₹${formatRupees(paise)}`;
/** '+919876543210' → '+91 98765 43210' (other shapes as given). */
export const displayPhone = (p: string): string => (/^\+91\d{10}$/.test(p) ? `+91 ${p.slice(3, 8)} ${p.slice(8)}` : p);
/** '8' → 'Grade 8'; anything else as given ('Class 9', 'Grade 10'). */
export const gradeLabel = (grade: string): string => (/^\d{1,2}$/.test(grade.trim()) ? `Grade ${grade.trim()}` : grade);

const FONT = 'Arial,Helvetica,sans-serif';
const td = (style: string, html: string) => `<tr><td style="${style}">${html}</td></tr>`;
const para = (html: string, o: { size?: number; color?: string; top?: number } = {}) =>
  td(`padding:${o.top ?? 12}px 28px 0 28px;font-family:${FONT};font-size:${o.size ?? 15}px;line-height:22px;color:${o.color ?? BRAND.ink};`, html);

function layout(title: string, rows: string[]): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.paper};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.paper};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${BRAND.white};border:1px solid ${BRAND.line};border-radius:12px;">
<tr><td style="padding:28px 28px 8px 28px;font-family:${FONT};font-size:18px;font-weight:bold;color:${BRAND.ink};">SOYL <span style="color:${BRAND.cobalt};">Academy</span></td></tr>
${rows.join('\n')}
<tr><td style="padding:24px 28px 28px 28px;"></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function detailsTable(pairs: [string, string][]): string {
  const cells = pairs
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-family:${FONT};font-size:14px;line-height:20px;color:${BRAND.muted};vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 0;font-family:${FONT};font-size:14px;line-height:20px;color:${BRAND.ink};vertical-align:top;">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  return td(
    'padding:16px 28px 0 28px;',
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.paper};border-radius:8px;"><tr><td style="padding:10px 16px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0">${cells}</table></td></tr></table>`,
  );
}

/**
 * The parent's confirmation. While the seller is not GST-registered (INVOICING.gstRegistered false) the email is
 * itself the receipt and Bill of Supply: supplier name and address, document number and date, recipient,
 * description, amount, and the "not registered under GST" note, worded as the invoices word it (D-046).
 */
export function confirmationEmail(e: FbEnrollmentForEmail, o: { replyTo: string; invoicing?: Pick<InvoicingConfig, 'gstRegistered' | 'seller' | 'titles' | 'unregisteredNote' | 'signatureNote'> }): EmailMessage {
  const inv = o.invoicing ?? INVOICING;
  const cohort = fbCohort(e.cohort);
  const headline = `Payment received — you're registered for ${cohort.title}`;
  const docTitle = inv.gstRegistered ? 'Receipt' : `Receipt / ${inv.titles.unregistered}`;
  const offerLabel = FB_OFFER_LABELS[e.offer] ?? e.offer;
  const pairs: [string, string][] = [
    [`${docTitle} no.`, e.receiptNumber],
    ['Date', istDateTime(e.paidAt)],
    ['Parent', e.parentName],
    ['Student', `${e.studentName} (${gradeLabel(e.grade)})`],
    ['Programme', cohort.title],
    ['Amount paid', rupees(e.amountPaise)],
    ['Offer', e.coupon ? `${offerLabel}, code ${e.coupon}` : offerLabel],
    ['Razorpay payment ID', e.razorpayPaymentId],
  ];
  const seller = [inv.seller.legalName, ...sellerAddressLines(inv.seller)].join(', ');
  const supplyLines = inv.gstRegistered
    ? [`Supplier: ${seller}.`, 'A GST invoice for this payment follows separately.']
    : [`This email is your receipt and ${inv.titles.unregistered}. Supplier: ${seller}.`, inv.unregisteredNote, inv.signatureNote];
  const steps = [
    `We will WhatsApp you on ${displayPhone(e.phone)} within 24 hours to welcome you and answer any questions.`,
    'Joining instructions (class links, the exact dates and the timetable) follow before the camp starts.',
    FB_CONTACT.kit,
  ];

  const text = [
    headline,
    '',
    `Dear ${e.parentName},`,
    '',
    `Thank you. We have received your payment and ${e.studentName} is registered for ${cohort.title}.`,
    '',
    ...pairs.map(([k, v]) => `${k}: ${v}`),
    '',
    'Programme',
    cohort.programme,
    '',
    'What happens next',
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    '',
    `Questions? WhatsApp us on ${FB_CONTACT.whatsappDisplay} (${FB_CONTACT.whatsappLink}) or reply to this email.`,
    `Refund policy: ${FB_CONTACT.refundPolicyUrl}`,
    '',
    ...supplyLines,
    '',
    'SOYL Academy',
  ].join('\n');

  const h = escapeHtml;
  const html = layout(headline, [
    td(`padding:8px 28px 0 28px;font-family:${FONT};font-size:20px;line-height:28px;font-weight:bold;color:${BRAND.ink};`, h(headline)),
    para(`Dear ${h(e.parentName)},`, { top: 16 }),
    para(`Thank you. We have received your payment and <strong>${h(e.studentName)}</strong> is registered for <strong>${h(cohort.title)}</strong>.`),
    detailsTable(pairs),
    para('<strong>Programme</strong>', { top: 20 }),
    para(h(cohort.programme), { top: 4 }),
    para('<strong>What happens next</strong>', { top: 20 }),
    td(
      `padding:4px 28px 0 28px;font-family:${FONT};font-size:15px;line-height:22px;color:${BRAND.ink};`,
      `<ol style="margin:0;padding-left:20px;">${steps.map((s) => `<li style="margin:0 0 8px 0;">${h(s)}</li>`).join('')}</ol>`,
    ),
    para(
      `Questions? WhatsApp us on <a href="${h(FB_CONTACT.whatsappLink)}" style="color:${BRAND.cobalt};">${h(FB_CONTACT.whatsappDisplay)}</a> or reply to this email.`,
      { top: 12 },
    ),
    para(`<a href="${h(FB_CONTACT.refundPolicyUrl)}" style="color:${BRAND.cobalt};">Refund policy</a>`, { top: 8 }),
    td(
      `padding:20px 28px 0 28px;font-family:${FONT};font-size:12px;line-height:18px;color:${BRAND.muted};border-top:0;`,
      supplyLines.map(h).join('<br>'),
    ),
  ]);

  return { to: e.email, replyTo: o.replyTo, tag: 'fb-confirmation', subject: `${headline} (${e.receiptNumber})`, text, html };
}

/** Staff notice for a new registration (FB_NOTIFY_EMAIL). Short, plain text. */
export function staffEnrollmentEmail(to: string, e: FbEnrollmentForEmail & { emailStatus: string }, adminUrl: string): EmailMessage {
  const text = [
    `New Future Builders registration: ${e.receiptNumber}`,
    '',
    `Paid: ${rupees(e.amountPaise)} at ${istDateTime(e.paidAt)} (${FB_OFFER_LABELS[e.offer] ?? e.offer}${e.coupon ? `, code ${e.coupon}` : ''})`,
    `Parent: ${e.parentName}, ${e.phone}, ${e.email}`,
    `Student: ${e.studentName} (${gradeLabel(e.grade)})`,
    `Cohort: ${e.cohort}`,
    `Payment: ${e.razorpayPaymentId}`,
    `Parent confirmation email: ${e.emailStatus}`,
    '',
    `All registrations: ${adminUrl}`,
  ].join('\n');
  return { to, tag: 'fb-staff-enrollment', subject: `FB registration ${e.receiptNumber}: ${e.studentName} (${rupees(e.amountPaise)})`, text };
}

/** Staff notice for a new enquiry (FB_NOTIFY_EMAIL). */
export function staffLeadEmail(
  to: string,
  l: { kind: string; parentName: string; studentName: string | null; email: string | null; phone: string; grade: string | null; source: string; createdAt: Date },
  adminUrl: string,
): EmailMessage {
  const text = [
    `New Future Builders enquiry (${l.kind}) at ${istDateTime(l.createdAt)}`,
    '',
    `Parent: ${l.parentName}, ${l.phone}${l.email ? `, ${l.email}` : ''}`,
    ...(l.studentName || l.grade ? [`Student: ${l.studentName ?? '-'}${l.grade ? ` (${l.grade})` : ''}`] : []),
    `Form: ${l.source}`,
    '',
    `All enquiries: ${adminUrl}`,
  ].join('\n');
  return { to, tag: 'fb-staff-lead', subject: `FB enquiry (${l.kind}): ${l.parentName}`, text };
}
