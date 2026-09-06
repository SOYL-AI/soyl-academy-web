'use server';

import { contactSchema, ContactFormData } from '@/lib/validation/contact-schema';

export async function submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    if (data.honeypot) {
      return { success: true, message: 'Message sent successfully.' };
    }

    const validatedData = contactSchema.parse(data);

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
