/**
 * Book-a-demo fields and client-side validation, with no zod import so the
 * form ships light. The server re-validates with the zod schema in demo-schema.ts.
 */

export const DEMO_ROLES = [
  'Principal / school leader',
  'Teacher',
  'Head of department',
  'School administrator',
  'Parent',
  'Other',
] as const;

export const GRADES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const;

export type DemoRole = (typeof DEMO_ROLES)[number];
export type Grade = (typeof GRADES)[number];

export interface DemoFormData {
  name: string;
  school: string;
  role: DemoRole | '';
  email: string;
  phone: string;
  city: string;
  grades: Grade[];
  honeypot?: string;
}

export type DemoErrors = Partial<Record<keyof DemoFormData, string>>;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[+()\-\s\d]{8,20}$/;

export function validateDemo(d: DemoFormData): DemoErrors {
  const e: DemoErrors = {};
  if (d.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!d.role) e.role = 'Please choose your role.';
  if (d.school.trim().length < 2) e.school = 'Please enter your school’s name.';
  if (d.email.trim() && !EMAIL_RE.test(d.email.trim())) e.email = 'Please enter a valid email address.';
  if (d.phone.trim() && !PHONE_RE.test(d.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!d.email.trim() && !d.phone.trim()) e.email = 'Please give us an email address or a phone number.';
  if (d.city.trim().length < 2) e.city = 'Please enter your city.';
  if (d.grades.length === 0) e.grades = 'Please choose at least one grade.';
  return e;
}
