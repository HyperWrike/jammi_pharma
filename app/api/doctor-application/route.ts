import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
import { Resend } from 'resend';
import * as React from 'react';

// Email Template
const doctorApplicationHtml = (name: string, specialty: string, bio: string) => `
  <div style="font-family: sans-serif; padding: 20px;">
    <h2>👨‍⚕️ New Doctor Federation Application</h2>
    <p>A new practitioner has joined the Jammi Federation and is awaiting verification.</p>
    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Specialty:</strong> ${specialty}</p>
      <p><strong>Biography:</strong> ${bio}</p>
    </div>
    <p style="margin-top: 20px;">Please log in to the Jammi Admin Dashboard to review and verify this profile.</p>
  </div>
`;

export async function POST(req: NextRequest) {
  try {
    const { name, specialty, bio } = await req.json();

    if (!name || !specialty) {
      return NextResponse.json({ error: 'Name and Specialty are required' }, { status: 400 });
    }

    // Insert into Supabase
    const { data: profile, error } = await supabaseAdmin
      .from('doctor_profiles')
      .insert({
        name,
        specialty,
        bio,
        verified: false,
      })
      .select('id')
      .single();

    if (error) {
      console.error('[doctor-application] Supabase insert error:', error);
      return NextResponse.json({ error: 'Database error saving profile' }, { status: 500 });
    }

    // Send Admin Email
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
         const resend = new Resend(resendKey);
         await resend.emails.send({
           from: 'Jammi Federation <updates@updates.jammi.in>',
           to: ['frontdesk@jammi.org'],
           subject: `🚨 New Doctor Application: ${name}`,
           html: doctorApplicationHtml(name, specialty, bio),
         });
      } catch (err) {
         console.error('[doctor-application] Email trigger failed:', err);
         // Do not block application success on email failure
      }
    }

    return NextResponse.json({ success: true, id: profile?.id });
  } catch (err) {
    console.error('[doctor-application] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
