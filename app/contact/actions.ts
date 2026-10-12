'use server';

import { contactSchema, ContactFormData } from '@/lib/validation/contact-schema';

export async function submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    if (data.honeypot) {
      return { success: true, message: 'Message sent successfully.' };
    }

    const validatedData = contactSchema.parse(data);

    // Forward to Google Sheets if configured
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            source: 'contact_page',
            mode: 'school_contact',
            name: validatedData.name,
            parentName: validatedData.name,
            studentName: `${validatedData.school} (${validatedData.role})`,
            email: validatedData.email,
            phone: validatedData.city,
            city: validatedData.city,
            school: validatedData.school,
            role: validatedData.role,
            studentCount: validatedData.studentCount || '',
            grade: validatedData.interest,
            interest: validatedData.interest,
            coupon: `[Count: ${validatedData.studentCount || 'N/A'}] ${validatedData.message}`,
            message: validatedData.message,
          }),
        });

        if (!response.ok) {
          console.error('Failed to submit contact enquiry to Google Sheets:', await response.text());
        }
      } catch (sheetError) {
        console.error('Error sending contact enquiry to Google Sheets:', sheetError);
      }
    } else {
      console.warn('GOOGLE_SHEETS_WEBHOOK_URL is not set for contact submissions.');
    }

    if (process.env.RESEND_API_KEY) {
      // Simulate Resend API Call
      console.log('Sending email via Resend for:', validatedData.email);
    } else {
      console.log('Contact form submission:', validatedData);
    }

    return { 
      success: true, 
      message: 'Thank you for reaching out. Our team will get back to you shortly.' 
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return { 
      success: false, 
      message: 'Invalid form submission. Please check your inputs and try again.' 
    };
  }
}
