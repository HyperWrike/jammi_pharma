import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || 'Jammi Pharmaceuticals <onboarding@resend.dev>';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, specialty, mode, date, time } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Name, phone, and email are required.' }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
      console.warn('[book-appointment] RESEND_API_KEY not set — logging appointment instead');
      console.log('[book-appointment] Appointment:', { name, phone, email, specialty, mode, date, time });
      return NextResponse.json({ success: true, message: 'Appointment request recorded (email service unavailable).' });
    }

    const emailHtml = `
      <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FDF9F0; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
        <div style="background: #540C3C; color: #fff; padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px;">JAMMI PHARMACEUTICALS</h1>
          <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.85; text-transform: uppercase; letter-spacing: 2px;">New Appointment Request</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #540C3C; width: 140px; vertical-align: top;">Patient Name</td>
              <td style="padding: 10px 0; color: #334155;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #540C3C; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; color: #334155;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #540C3C; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; color: #334155;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #540C3C; vertical-align: top;">Specialty</td>
              <td style="padding: 10px 0; color: #334155;">${specialty || 'General Wellness'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #540C3C; vertical-align: top;">Mode</td>
              <td style="padding: 10px 0; color: #334155;">${mode === 'offline' ? 'Clinic Visit (Chennai)' : 'Video Consult'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #540C3C; vertical-align: top;">Requested Date</td>
              <td style="padding: 10px 0; color: #334155;">${date || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 700; color: #540C3C; vertical-align: top;">Requested Time</td>
              <td style="padding: 10px 0; color: #334155;">${time || 'Not specified'}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #64748b; font-size: 12px; margin: 0;">This appointment was requested via jammi.in. Please contact the patient to confirm.</p>
        </div>
      </div>
    `;

    const { error: emailError } = await resend.emails.send({
      from: getFromEmail(),
      to: 'njammi@gmail.com',
      subject: `New Appointment Request — ${name} (${specialty || 'General Wellness'})`,
      html: emailHtml,
    });

    if (emailError) {
      console.error('[book-appointment] Resend error:', emailError);
      return NextResponse.json({ error: 'Failed to send appointment notification.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Appointment request sent successfully!' });
  } catch (error: any) {
    console.error('[book-appointment] Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
