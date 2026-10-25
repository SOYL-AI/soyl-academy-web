'use server';

import { demoSchema } from '@/lib/validation/demo-schema';
import type { DemoFormData } from '@/lib/validation/demo-fields';

/**
 * Book-a-demo requests go to the same Google Sheets webhook as the contact
 * form (the repo's existing form backend), tagged `source: book_a_demo`.
 */
export async function submitDemoRequest(data: DemoFormData): Promise<{ success: boolean; message: string }> {
  if (data.honeypot) return { success: true, message: 'Thanks.' };

  const parsed = demoSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Some details need another look. Please check the form and try again.' };
  }
  const d = parsed.data;

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('GOOGLE_SHEETS_WEBHOOK_URL is not set; demo request not forwarded.', { school: d.school });
    return { success: true, message: 'Thanks. We’ll be in touch soon.' };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: 'book_a_demo',
        mode: 'book_a_demo',
        name: d.name,
        parentName: d.name,
        studentName: `${d.school} (${d.role})`,
        school: d.school,
        role: d.role,
        email: d.email ?? '',
        phone: d.phone ?? '',
        city: d.city,
        grade: d.grades.join(', '),
        grades: d.grades.join(', '),
        message: `Demo request: ${d.role} at ${d.school}, ${d.city}. Grades ${d.grades.join(', ')}.`,
      }),
    });
    if (!res.ok) {
      console.error('Demo request webhook failed:', res.status, await res.text());
      return { success: false, message: 'We couldn’t send your request just now. Please try again, or email outreach@soyl.cloud.' };
    }
  } catch (err) {
    console.error('Demo request webhook error:', err);
    return { success: false, message: 'We couldn’t send your request just now. Please try again, or email outreach@soyl.cloud.' };
  }

  return { success: true, message: 'Thanks. We’ll be in touch soon.' };
}
