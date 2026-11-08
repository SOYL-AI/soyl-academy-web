import { NextResponse } from 'next/server';
import { z } from 'zod';
import { GRADES, emailSchema, phoneSchema } from '@/lib/future-builders/registration';
import { platformRecorders } from '@/lib/future-builders/server';
import { clientIpFrom } from '@/lib/platform-ingest';

const optionalText = z
  .string()
  .trim()
  .max(100)
  .optional()
  .transform((v) => v || undefined);

const bodySchema = z.object({
  /** callback = "Request a call"; notify = "notify me when registration opens"; waitlist = after registration closes. */
  mode: z.enum(['callback', 'notify', 'waitlist']).default('callback'),
  parentName: z.string().trim().min(2, 'Please enter your name.').max(100),
  studentName: optionalText,
  email: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .pipe(emailSchema.optional()),
  phone: phoneSchema,
  grade: z.enum(GRADES).optional().or(z.literal('').transform(() => undefined)),
  /** Which list a request belongs to, e.g. `fb_summer_2027`. Only a short slug is accepted. */
  source: z
    .string()
    .optional()
    .transform((v) => (v && /^[a-z0-9_-]{1,40}$/.test(v) ? v : 'future_builders')),
});

/**
 * POST /api/enroll: Future Builders call requests, "notify me" and waitlist sign-ups, recorded on the
 * platform (POST /v1/ingest/future-builders/leads). Paid registrations go through /api/razorpay instead.
 * 201 {success: true}; 400 with a message for invalid input; 502/503 when it couldn't be recorded
 * (the form then offers WhatsApp).
 */
export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, message: parsed.error.issues[0]?.message ?? 'Please check the form.' }, { status: 400 });
  }
  const { mode, ...lead } = parsed.data;

  const recorders = platformRecorders();
  if (!recorders) {
    console.error('[future-builders] enroll: platform ingest settings missing (PLATFORM_API_ORIGIN / PLATFORM_EDGE_SECRET / FB_INGEST_KEY).');
    return NextResponse.json({ success: false, message: 'We couldn’t save that just now.' }, { status: 503 });
  }

  try {
    await recorders.lead({ kind: mode, ...lead }, clientIpFrom(request.headers));
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[future-builders] enroll: recording the lead failed:', (err as Error).message, { kind: mode, source: lead.source });
    return NextResponse.json({ success: false, message: 'We couldn’t save that just now.' }, { status: 502 });
  }
}
