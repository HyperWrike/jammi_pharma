import { NextRequest, NextResponse } from 'next/server';
import { convexMutation } from '@/lib/convexServer';
import { Resend } from 'resend';
import * as React from 'react';

function cleanArgs(args: any) {
  const cleaned: any = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null && args[key] !== undefined && args[key] !== '') {
      cleaned[key] = args[key];
    }
  });
  return cleaned;
}

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
    const contentType = req.headers.get('content-type') || '';

    let name = '';
    let specialty = '';
    let bio = '';
    let email = '';
    let phone = '';
    let occupation = '';
    let consentMarketing = false;
    let allowCookies = false;
    let sourcePage = '';
    let visitCount = 0;
    let resumeUrl = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      name = String(formData.get('name') || '').trim();
      specialty = String(formData.get('specialty') || '').trim();
      bio = String(formData.get('bio') || '').trim();
      email = String(formData.get('email') || '').trim();
      phone = String(formData.get('phone') || '').trim();
      occupation = String(formData.get('occupation') || '').trim();
      consentMarketing = String(formData.get('consentMarketing') || '').toLowerCase() === 'true';
      allowCookies = String(formData.get('allowCookies') || '').toLowerCase() === 'true';
      sourcePage = String(formData.get('sourcePage') || '').trim();
      visitCount = Number(formData.get('visitCount') || 0);

      const file = formData.get('resume') as File | null;
      if (file) {
        if (file.type !== 'application/pdf') {
          return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
        }
        const uploadUrl = await convexMutation<string>('functions/uploads:generateUploadUrl', {});
        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Content-Type': file.type || 'application/pdf',
          },
          body: file,
        });

        if (!uploadResponse.ok) {
          const text = await uploadResponse.text();
          return NextResponse.json({ error: `PDF upload failed: ${text}` }, { status: 500 });
        }

        const uploadResult = await uploadResponse.json();
        const storageId = uploadResult.storageId;
        const publicUrl = await convexMutation<string | null>('functions/uploads:getStorageUrl', { storageId });
        resumeUrl = publicUrl || '';
      }
    } else {
      const body = await req.json();
      name = String(body?.name || '').trim();
      specialty = String(body?.specialty || '').trim();
      bio = String(body?.bio || '').trim();
      email = String(body?.email || '').trim();
      phone = String(body?.phone || '').trim();
      occupation = String(body?.occupation || '').trim();
      consentMarketing = Boolean(body?.consentMarketing);
      allowCookies = Boolean(body?.allowCookies);
      sourcePage = String(body?.sourcePage || '').trim();
      visitCount = Number(body?.visitCount || 0);
      resumeUrl = String(body?.resume_url || '').trim();
    }

    if (!name || !specialty) {
      return NextResponse.json({ error: 'Name and Specialty are required' }, { status: 400 });
    }

    // Insert into Convex
    const profileId = await convexMutation("functions/doctor_profiles:createDoctorProfile", cleanArgs({
      name,
      specialty,
      bio,
      email,
      phone,
      occupation,
      resume_url: resumeUrl,
      consent_marketing: consentMarketing,
      allow_cookies: allowCookies,
      source_page: sourcePage,
      visit_count: Number.isFinite(visitCount) ? visitCount : 0,
      verified: false,
    }));

    // Send Admin Email
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
         const resend = new Resend(resendKey);
         await resend.emails.send({
           from: 'Jammi Federation <updates@updates.jammi.in>',
           to: ['frontdesk@jammi.org'],
           subject: `🚨 New Doctor Application: ${name}`,
           html: `${doctorApplicationHtml(name, specialty, bio)}
              <p><strong>Email:</strong> ${email || '-'}</p>
              <p><strong>Phone:</strong> ${phone || '-'}</p>
              <p><strong>Occupation:</strong> ${occupation || '-'}</p>
              <p><strong>Source Page:</strong> ${sourcePage || '-'}</p>
              <p><strong>Visit Count:</strong> ${visitCount || 0}</p>
              <p><strong>Consent (Mails/Promotions):</strong> ${consentMarketing ? 'Yes' : 'No'}</p>
              <p><strong>Allow Cookies:</strong> ${allowCookies ? 'Yes' : 'No'}</p>
              ${resumeUrl ? `<p><strong>PDF:</strong> <a href="${resumeUrl}">View uploaded PDF</a></p>` : ''}`,
         });
      } catch (err) {
         console.error('[doctor-application] Email trigger failed:', err);
         // Do not block application success on email failure
      }
    }

    return NextResponse.json({ success: true, id: profileId });
  } catch (err: any) {
    console.error('[doctor-application] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
