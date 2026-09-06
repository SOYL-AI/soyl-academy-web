import { z } from 'zod';

export const RoleEnum = z.enum([
  'Teacher',
  'Principal',
  'School Administrator',
  'Department Head',
  'Parent',
  'Student',
  'Other'
]);

export const InterestEnum = z.enum([
  'Outcome-based assignments',
  'Teacher workshops',
  'School pilot program',
  'Student programs',
  'Partnership',
  'Other'
]);

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  school: z.string().min(2, { message: 'School name must be at least 2 characters.' }),
  role: RoleEnum,
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  studentCount: z.string().optional(),
  interest: InterestEnum,
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  honeypot: z.string().max(0, { message: 'Spam detected.' }).optional(), // Honeypot field must be empty
});

export type ContactFormData = z.infer<typeof contactSchema>;
