import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimiters, getClientIdentifier } from '@/lib/rate-limit';
import { evaluateSpam } from '@/lib/spam-guard';
import { CONTACT, PRIMARY_HOST, SITE_NAME } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/contact: the "Get in touch with Stephen" form.
 *
 * Delivers the message to Stephen by email through Resend. Rate limited,
 * honeypot- and timing-guarded, origin-checked and validated server-side with
 * zod. The visitor's own text is escaped before it is put into HTML.
 *
 * RESEND_FROM must be an address on a domain verified in the Resend account
 * (laws-safety.com or a subdomain of it); the onboarding@resend.dev sandbox
 * address only delivers to the account owner and otherwise lands in spam.
 * CONTACT_TO overrides the recipient (for testing); it defaults to Stephen.
 */

const RESEND_FROM = process.env.RESEND_FROM || `${SITE_NAME} website <noreply@laws-safety.com>`;
const CONTACT_TO = process.env.CONTACT_TO || CONTACT.email;

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'Name is too long.').regex(/^[\p{L}\s.'’-]+$/u, 'Please enter a genuine name.'),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address.').max(254),
  phone: z
    .string()
    .trim()
    .max(20, 'Phone number is too long.')
    .regex(/^$|^[0-9+\s()-]{7,20}$/, 'Please enter a valid phone number.')
    .optional()
    .or(z.literal('')),
  organisation: z.string().trim().max(120, 'Organisation is too long.').optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Please say a little more.').max(3000, 'Message is too long (3,000 characters).'),
});

function escapeHtml(value: string): string {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const identifier = getClientIdentifier(request);
    const { success: rateOk } = await rateLimiters.strict.limit(identifier);
    if (!rateOk) {
      return NextResponse.json({ success: false, message: 'Too many requests. Please try again in a minute.' }, { status: 429, headers: { 'Retry-After': '60' } });
    }

    const body = await request.json();

    // Spam guard: honeypot, form dwell time, same-origin proof, gibberish.
    const requestHost = (request.headers.get('host') ?? '').split(':')[0].replace(/^www\./, '');
    const spam = evaluateSpam({
      honeypot: body.company_website,
      renderedAt: body.renderedAt,
      textFields: [body.name, body.organisation],
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
      allowedHosts: [PRIMARY_HOST, requestHost].filter(Boolean),
      requireProof: true,
    });
    if (spam.spam) {
      console.warn(`[/api/contact] Spam blocked (${spam.reason})`);
      if (spam.kind === 'content') {
        return NextResponse.json({ success: false, message: 'Please enter a genuine name.' }, { status: 400 });
      }
      // Structural bot signal: pretend success so the bot does not adapt, send nothing.
      return NextResponse.json({ success: true, message: 'Message sent' });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? 'Please check the form and try again.';
      return NextResponse.json({ success: false, message: first }, { status: 400 });
    }
    const { name, email, phone, organisation, message } = parsed.data;

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ success: false, message: 'The form is not available right now. Please email Stephen directly.' }, { status: 500 });
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: phone ? escapeHtml(phone) : '',
      organisation: organisation ? escapeHtml(organisation) : '',
      message: escapeHtml(message).replace(/\n/g, '<br>'),
    };

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Website message from ${safe.name}</title></head>
<body style="margin:0;padding:0;background:#f4f6fa;font-family:'Segoe UI',Arial,sans-serif;color:#232f45;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fa;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid rgba(35,47,69,0.12);border-radius:12px;overflow:hidden;">
        <tr><td style="background:#0a1426;padding:24px 32px;border-bottom:2px solid #d4af37;">
          <p style="margin:0;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#d4af37;">Laws Safety</p>
          <h1 style="margin:6px 0 0 0;font-size:20px;font-weight:600;color:#ffffff;">New message from the website</h1>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.5;">
            <tr><td style="padding:0 0 14px 0;"><span style="display:block;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#866d1d;">Name</span><strong>${safe.name}</strong></td></tr>
            ${safe.organisation ? `<tr><td style="padding:0 0 14px 0;border-top:1px solid rgba(35,47,69,0.08);padding-top:14px;"><span style="display:block;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#866d1d;">Organisation</span>${safe.organisation}</td></tr>` : ''}
            <tr><td style="padding:14px 0;border-top:1px solid rgba(35,47,69,0.08);"><span style="display:block;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#866d1d;">Email</span><a href="mailto:${safe.email}" style="color:#4171a8;">${safe.email}</a></td></tr>
            ${safe.phone ? `<tr><td style="padding:14px 0;border-top:1px solid rgba(35,47,69,0.08);"><span style="display:block;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#866d1d;">Phone</span><a href="tel:${safe.phone.replace(/[^0-9+]/g, '')}" style="color:#4171a8;">${safe.phone}</a></td></tr>` : ''}
            <tr><td style="padding:14px 0 0 0;border-top:1px solid rgba(35,47,69,0.08);"><span style="display:block;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#866d1d;">Message</span><p style="margin:6px 0 0 0;">${safe.message}</p></td></tr>
          </table>
        </td></tr>
        <tr><td style="background:#f4f6fa;padding:16px 32px;font-size:12px;color:#4a5773;">Sent from the contact form at www.laws-safety.com. Reply to this email to answer ${safe.name} directly.</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `Website message from ${name}${organisation ? `, ${organisation}` : ''}`,
        html,
        text: `Name: ${name}\n${organisation ? `Organisation: ${organisation}\n` : ''}Email: ${email}\n${phone ? `Phone: ${phone}\n` : ''}\n${message}`,
      }),
    });

    if (!res.ok) {
      console.error('Resend error:', await res.text());
      return NextResponse.json({ success: false, message: 'The message could not be sent. Please email Stephen directly.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Message sent' });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please email Stephen directly.' }, { status: 500 });
  }
}
