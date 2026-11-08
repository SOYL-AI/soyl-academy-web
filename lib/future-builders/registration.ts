import { z } from 'zod';

/**
 * Registrant fields for the Future Builders form and payment API. Pure (no server imports), so the
 * form and the routes apply the same rules. Field limits keep every Razorpay order note within
 * Razorpay's 256-character limit.
 */

/** sessionStorage key: the form leaves the receipt and email for /future-builders/registered (same tab only). */
export const REGISTRATION_STORAGE_KEY = 'soyl_fb_registration';

export const GRADES =['7', '8', '9', '10', '11', '12'] as const;

/**
 * An Indian mobile number in E.164 (+91XXXXXXXXXX), or null.
 * Accepts "98765 43210", "+91 98765-43210", "091-98765 43210", "(+91) 9876543210", "919876543210".
 */
export function normalizeIndianPhone(raw: string | null | undefined): string | null {
  const trimmed = (raw ?? '').trim();
  if (!/^[+()\-\s\d]{10,20}$/.test(trimmed)) return null;
  let digits = trimmed.replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('091')) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}

const name = (label: string) =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(2, `${label} is too short`)
    .max(100, `${label} is too long`)
    .refine((v) => !/[<>]/.test(v), `${label} has characters we can't accept`);

export const phoneSchema = z
  .string({ required_error: 'Phone is required' })
  .transform((v, ctx) => {
    const e164 = normalizeIndianPhone(v);
    if (!e164) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Enter a valid Indian mobile number' });
      return z.NEVER;
    }
    return e164;
  });

export const emailSchema = z.string().trim().toLowerCase().max(254).email('Enter a valid email address');

export const registrantSchema = z.object({
  parentName: name('Parent’s name'),
  studentName: name('Student’s name'),
  email: emailSchema,
  phone: phoneSchema,
  grade: z.enum(GRADES, { errorMap: () => ({ message: 'Choose a grade from 7 to 12' }) }),
  coupon: z
    .string()
    .trim()
    .toUpperCase()
    .max(32)
    .optional()
    .nullable()
    .transform((v) => v || null),
  friendName: z
    .string()
    .trim()
    .max(100)
    .optional()
    .nullable()
    .transform((v) => v || null),
});

export type RegistrantInput = z.input<typeof registrantSchema>;
export type Registrant = z.output<typeof registrantSchema>;

/** First zod issue as one readable sentence for the form. */
export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  return issue ? issue.message : 'Please check the form and try again.';
}
