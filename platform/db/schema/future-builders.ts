/**
 * Future Builders summer camp (ADR-027): paid registrations and enquiries from the marketing site.
 * Replaces the Google Sheet. The marketing server verifies the Razorpay payment (signature + fetched
 * payment) and posts it here server-to-server; the API stores it, numbers a receipt and emails the parent.
 *
 * Not linked to platform accounts (parents register without one). Money in integer paise; times UTC.
 * Personal data: PII.md "Future Builders".
 */
import { sql } from 'drizzle-orm';
import { check, index, integer, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { id, oneOf, timestamps, tstz } from './_shared';

export const FB_OFFERS = ['diwali-2026', 'standard'] as const;
export const FB_ENROLLMENT_SOURCES = ['checkout', 'webhook'] as const;
export const FB_EMAIL_STATUSES = ['pending', 'sent', 'failed'] as const;
export const FB_LEAD_KINDS = ['callback', 'notify', 'waitlist'] as const;

export const fbEnrollments = pgTable(
  'fb_enrollments',
  {
    id: id(),
    /** e.g. FB-2027-000123: year of the cohort, then a gap-free serial per year (receipt / bill of supply number). */
    receiptNumber: text('receipt_number').notNull(),
    receiptYear: integer('receipt_year').notNull(),
    receiptSeq: integer('receipt_seq').notNull(),
    razorpayOrderId: text('razorpay_order_id').notNull(),
    razorpayPaymentId: text('razorpay_payment_id').notNull(),
    amountPaise: integer('amount_paise').notNull(),
    currency: text('currency').notNull().default('INR'),
    paidAt: tstz('paid_at').notNull(),
    cohort: text('cohort').notNull(),
    offer: text('offer').notNull(),
    coupon: text('coupon'),
    friendName: text('friend_name'),
    parentName: text('parent_name').notNull(),
    studentName: text('student_name').notNull(),
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    grade: text('grade').notNull(),
    /** Which marketing path reported the payment first (the checkout callback, or the Razorpay webhook safety net). */
    source: text('source').notNull(),
    /** Parent confirmation email: pending → sent | failed (staff can resend from admin). */
    emailStatus: text('email_status').notNull().default('pending'),
    emailAttempts: integer('email_attempts').notNull().default(0),
    emailSentAt: tstz('email_sent_at'),
    /** Error class of the last failure (no message text, no address). */
    emailLastError: text('email_last_error'),
    /** Staff notification (FB_NOTIFY_EMAIL), best effort. */
    staffNotifiedAt: tstz('staff_notified_at'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('fb_enrollments_razorpay_payment_id_unique').on(t.razorpayPaymentId),
    uniqueIndex('fb_enrollments_receipt_number_unique').on(t.receiptNumber),
    uniqueIndex('fb_enrollments_receipt_year_seq_unique').on(t.receiptYear, t.receiptSeq),
    index('fb_enrollments_paid_at_idx').on(t.paidAt),
    index('fb_enrollments_email_status_paid_at_idx').on(t.emailStatus, t.paidAt),
    index('fb_enrollments_razorpay_order_id_idx').on(t.razorpayOrderId),
    oneOf('fb_enrollments_offer_check', t.offer, FB_OFFERS),
    oneOf('fb_enrollments_source_check', t.source, FB_ENROLLMENT_SOURCES),
    oneOf('fb_enrollments_email_status_check', t.emailStatus, FB_EMAIL_STATUSES),
    check('fb_enrollments_amount_check', sql`${t.amountPaise} > 0`),
    check('fb_enrollments_currency_check', sql`${t.currency} = 'INR'`),
    check('fb_enrollments_receipt_check', sql`${t.receiptSeq} > 0 AND ${t.receiptYear} BETWEEN 2000 AND 2999`),
    check('fb_enrollments_email_attempts_check', sql`${t.emailAttempts} >= 0`),
  ],
);

export const fbLeads = pgTable(
  'fb_leads',
  {
    id: id(),
    kind: text('kind').notNull(),
    parentName: text('parent_name').notNull(),
    studentName: text('student_name'),
    email: text('email'),
    phone: text('phone').notNull(),
    grade: text('grade'),
    /** Short slug of the form that sent it, e.g. fb_summer_2027. */
    source: text('source').notNull(),
    ...timestamps(),
  },
  (t) => [
    index('fb_leads_created_at_idx').on(t.createdAt),
    index('fb_leads_kind_created_at_idx').on(t.kind, t.createdAt),
    // Duplicate-submission check (same phone, kind and form within a day).
    index('fb_leads_phone_kind_created_at_idx').on(t.phone, t.kind, t.createdAt),
    oneOf('fb_leads_kind_check', t.kind, FB_LEAD_KINDS),
  ],
);
