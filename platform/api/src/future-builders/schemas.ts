/**
 * Future Builders contract (ADR-027). The ingest bodies are the contract the marketing server codes against:
 * do not change them without telling the Lead. Request schemas are strict (API-8); responses strip unknown
 * fields (API-9). Money is integer paise; times are ISO 8601 UTC; IST days are YYYY-MM-DD.
 */
import { z } from 'zod/v4';
import { FB_EMAIL_STATUSES, FB_ENROLLMENT_SOURCES, FB_LEAD_KINDS, FB_OFFERS } from '@soyl/db';

/** Trimmed single-line text without control characters. */
const Text = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .regex(/^[^\p{Cc}]*$/u, 'must not contain control characters');

const OptionalText = (max: number) =>
  z.preprocess((v) => (typeof v === 'string' && v.trim() === '' ? null : v), Text(max).nullable().optional()).transform((v) => v ?? null);

/** Indian mobile number in E.164 (+91 and 10 digits starting 6–9). */
export const IndianPhone = z.string().regex(/^\+91[6-9]\d{9}$/, 'an Indian mobile number in E.164, e.g. +919876543210');
const Email = z.string().trim().max(254).pipe(z.email());
const Slug = z.string().regex(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/, 'a lowercase slug').max(40);
const IstDay = z.iso.date();

export const FbEnrollmentIngest = z
  .strictObject({
    razorpayOrderId: z.string().regex(/^order_[A-Za-z0-9]{1,40}$/, 'a Razorpay order id (order_…)'),
    razorpayPaymentId: z.string().regex(/^pay_[A-Za-z0-9]{1,40}$/, 'a Razorpay payment id (pay_…)'),
    amountPaise: z.number().int().positive().max(100_000_000),
    currency: z.literal('INR'),
    paidAt: z.iso.datetime({ offset: true }),
    cohort: Slug,
    offer: z.enum(FB_OFFERS),
    coupon: OptionalText(40),
    friendName: OptionalText(100),
    parentName: Text(100),
    studentName: Text(100),
    email: Email,
    phone: IndianPhone,
    grade: Text(20),
    source: z.enum(FB_ENROLLMENT_SOURCES),
  })
  .meta({ id: 'FbEnrollmentIngest', description: 'A verified Future Builders payment, posted by the marketing server (ADR-027).' });
export type FbEnrollmentIngest = z.output<typeof FbEnrollmentIngest>;

export const FbEnrollmentIngestResult = z
  .object({
    enrollmentId: z.uuid(),
    /** e.g. FB-2027-000123 */
    receiptNumber: z.string(),
    /** false: this payment was already recorded (idempotent on razorpayPaymentId; no second email). */
    created: z.boolean(),
  })
  .meta({ id: 'FbEnrollmentIngestResult' });

export const FbLeadIngest = z
  .strictObject({
    kind: z.enum(FB_LEAD_KINDS),
    parentName: Text(100),
    studentName: OptionalText(100),
    email: z.preprocess((v) => (typeof v === 'string' && v.trim() === '' ? null : v), Email.nullable().optional()).transform((v) => v ?? null),
    phone: IndianPhone,
    grade: OptionalText(20),
    source: Slug,
  })
  .meta({ id: 'FbLeadIngest', description: 'A Future Builders enquiry from a marketing form (ADR-027).' });
export type FbLeadIngest = z.output<typeof FbLeadIngest>;

export const FbLeadIngestResult = z.object({ leadId: z.uuid() }).meta({ id: 'FbLeadIngestResult' });

/* ---- admin ------------------------------------------------------------------------------------- */

export const FbEnrollmentsQuery = z.strictObject({
  /** Inclusive IST days on paidAt. */
  from: IstDay.optional(),
  to: IstDay.optional(),
  emailStatus: z.enum(FB_EMAIL_STATUSES).optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  cursor: z.string().max(200).optional(),
});
export type FbEnrollmentsQuery = z.output<typeof FbEnrollmentsQuery>;

export const FbEnrollmentsExportQuery = FbEnrollmentsQuery.pick({ from: true, to: true, emailStatus: true });

export const FbLeadsQuery = z.strictObject({
  /** Inclusive IST days on createdAt. */
  from: IstDay.optional(),
  to: IstDay.optional(),
  kind: z.enum(FB_LEAD_KINDS).optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  cursor: z.string().max(200).optional(),
});
export type FbLeadsQuery = z.output<typeof FbLeadsQuery>;

export const FbLeadsExportQuery = FbLeadsQuery.pick({ from: true, to: true, kind: true });

export const FbEnrollmentRow = z
  .object({
    id: z.uuid(),
    receiptNumber: z.string(),
    paidAt: z.iso.datetime(),
    parentName: z.string(),
    studentName: z.string(),
    email: z.string(),
    phone: z.string(),
    grade: z.string(),
    amountPaise: z.number().int(),
    currency: z.literal('INR'),
    cohort: z.string(),
    offer: z.enum(FB_OFFERS),
    coupon: z.string().nullable(),
    friendName: z.string().nullable(),
    razorpayPaymentId: z.string(),
    razorpayOrderId: z.string(),
    source: z.enum(FB_ENROLLMENT_SOURCES),
    emailStatus: z.enum(FB_EMAIL_STATUSES),
    emailAttempts: z.number().int(),
    emailSentAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
  })
  .meta({ id: 'FbEnrollment' });

export const FbEnrollmentsPage = z
  .object({
    enrollments: z.array(FbEnrollmentRow),
    nextCursor: z.string().nullable(),
    /** Over every row matching the filters (not just this page). */
    summary: z.object({ count: z.number().int(), totalPaise: z.number().int(), emailFailed: z.number().int() }),
  })
  .meta({ id: 'FbEnrollmentsPage' });

export const FbLeadRow = z
  .object({
    id: z.uuid(),
    kind: z.enum(FB_LEAD_KINDS),
    parentName: z.string(),
    studentName: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string(),
    grade: z.string().nullable(),
    source: z.string(),
    createdAt: z.iso.datetime(),
  })
  .meta({ id: 'FbLead' });

export const FbLeadsPage = z
  .object({
    leads: z.array(FbLeadRow),
    nextCursor: z.string().nullable(),
    summary: z.object({ count: z.number().int() }),
  })
  .meta({ id: 'FbLeadsPage' });

export const FbResendResult = z.object({ emailStatus: z.enum(['sent', 'failed']) }).meta({ id: 'FbResendResult' });
