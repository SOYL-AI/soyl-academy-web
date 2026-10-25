import { z } from 'zod';
import { DEMO_ROLES, EMAIL_RE, GRADES, PHONE_RE } from './demo-fields';

/** Server-side validation for book-a-demo requests (the form validates with demo-fields.ts). */
export const demoSchema = z
  .object({
    name: z.string().trim().min(2),
    school: z.string().trim().min(2),
    role: z.enum(DEMO_ROLES),
    email: z.string().trim().refine((v) => !v || EMAIL_RE.test(v)),
    phone: z.string().trim().refine((v) => !v || PHONE_RE.test(v)),
    city: z.string().trim().min(2),
    grades: z.array(z.enum(GRADES)).min(1),
    honeypot: z.string().max(0).optional(),
  })
  .refine((d) => Boolean(d.email || d.phone));

export type DemoRequest = z.infer<typeof demoSchema>;
