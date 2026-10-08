import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if the webhook URL is configured
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (webhookUrl) {
      // Forward the data to the Google Apps Script Webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          mode: body.mode || 'callback',
          parentName: body.parentName || '',
          studentName: body.studentName || '',
          email: body.email || '',
          phone: body.phone || '',
          grade: body.grade || '',
          coupon: body.coupon || '',
        }),
      });

      if (!response.ok) {
        console.error('Failed to submit to Google Sheets:', await response.text());
        // We still return success to the user so they don't get stuck if the sheet fails
      }
    } else {
      console.warn('GOOGLE_SHEETS_WEBHOOK_URL is not set. Simulated success.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enroll API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    );
  }
}
