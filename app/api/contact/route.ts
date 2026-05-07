import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const formatValue = (value: string | undefined): string =>
  value && value.trim() ? escapeHtml(value.trim()) : '—';

const row = (label: string, value: string): string => `
  <tr>
    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; width: 180px; vertical-align: top; font-size: 13px; color: #64748b; font-weight: 600;">
      ${label}
    </td>
    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; vertical-align: top; font-size: 14px; color: #0f172a; font-weight: 500;">
      ${value}
    </td>
  </tr>
`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 });
  }

  try {
    const body = await req.json() as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      destination?: string;
      qualification?: string;
      message?: string;
    };

    const firstName = body.firstName?.trim() ?? '';
    const lastName = body.lastName?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const phone = body.phone?.trim() ?? '';
    const destination = body.destination?.trim() ?? '';
    const qualification = body.qualification?.trim() ?? '';
    const message = body.message?.trim() ?? '';

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`;
    const toEmail = process.env.CONTACT_EMAIL ?? 'bec.edu.nep@gmail.com';
    const fromEmail = process.env.CONTACT_FROM ?? 'Your Brand <onboarding@resend.dev>';

    const adminHtml = `
      <div style="margin: 0; padding: 24px; background: #f3f4f6; font-family: Arial, sans-serif; color: #111827;">
        <div style="max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #7c3aed 100%); padding: 28px 32px;">
            <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #cbd5e1; font-weight: 700;">
              BrightPath Nepal
            </p>
            <h1 style="margin: 0; font-size: 24px; line-height: 1.3; color: #ffffff;">
              New Contact Form Submission
            </h1>
            <p style="margin: 10px 0 0; font-size: 14px; line-height: 1.6; color: #dbeafe;">
              A new contact inquiry was submitted from the website.
            </p>
          </div>

          <div style="padding: 32px;">
            <div style="margin-bottom: 24px; padding: 18px 20px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px;">
              <p style="margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 700;">
                Contact Lead
              </p>
              <p style="margin: 0; font-size: 22px; line-height: 1.4; color: #0f172a; font-weight: 700;">
                ${escapeHtml(fullName)}
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              ${row('Full Name', escapeHtml(fullName))}
              ${row('Email Address', `<a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a>`)}
              ${row('Phone Number', formatValue(phone))}
              ${row('Interested Destination', formatValue(destination))}
              ${row('Highest Qualification', formatValue(qualification))}
            </table>

            <div style="margin-top: 24px;">
              <p style="margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 700;">
                Message
              </p>
              <div style="padding: 18px 20px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; font-size: 14px; line-height: 1.7; color: #0f172a;">
                ${message ? escapeHtml(message).replace(/\n/g, '<br />') : '—'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const userHtml = `
      <div style="margin: 0; padding: 24px; background: #f3f4f6; font-family: Arial, sans-serif; color: #111827;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #7c3aed 100%); padding: 28px 32px;">
            <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #cbd5e1; font-weight: 700;">
              BrightPath Nepal
            </p>
            <h1 style="margin: 0; font-size: 24px; line-height: 1.3; color: #ffffff;">
              We received your message
            </h1>
            <p style="margin: 10px 0 0; font-size: 14px; line-height: 1.6; color: #dbeafe;">
              Thank you for contacting BrightPath Nepal, ${escapeHtml(firstName)}.
            </p>
          </div>

          <div style="padding: 32px;">
            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.8; color: #334155;">
              Hi ${escapeHtml(firstName)},
            </p>

            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.8; color: #334155;">
              Thank you for reaching out to BrightPath Nepal. We have received your message successfully, and our team will get back to you as soon as possible.
            </p>

            <div style="margin: 20px 0; padding: 18px 20px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px;">
              <p style="margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 700;">
                Your submitted details
              </p>
              <p style="margin: 0 0 6px; font-size: 14px; color: #0f172a;"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
              <p style="margin: 0 0 6px; font-size: 14px; color: #0f172a;"><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p style="margin: 0 0 6px; font-size: 14px; color: #0f172a;"><strong>Phone:</strong> ${formatValue(phone)}</p>
              <p style="margin: 0 0 6px; font-size: 14px; color: #0f172a;"><strong>Destination:</strong> ${formatValue(destination)}</p>
              <p style="margin: 0; font-size: 14px; color: #0f172a;"><strong>Qualification:</strong> ${formatValue(qualification)}</p>
            </div>

            <div style="margin: 20px 0; padding: 18px 20px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px;">
              <p style="margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 700;">
                Your message
              </p>
              <div style="font-size: 14px; line-height: 1.7; color: #0f172a;">
                ${message ? escapeHtml(message).replace(/\n/g, '<br />') : '—'}
              </div>
            </div>

            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.8; color: #334155;">
              We’ll review your inquiry and respond shortly.
            </p>

            <p style="margin: 0; font-size: 14px; line-height: 1.8; color: #64748b;">
              BrightPath Education Consultancy<br />
              Kathmandu, Nepal
            </p>
          </div>
        </div>
      </div>
    `;

    const adminResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Contact Form Submission — ${fullName}`,
      html: adminHtml,
    });

    if (adminResult.error) {
      console.error('Resend contact admin email error:', adminResult.error);
      return NextResponse.json(
        { error: 'Failed to send admin contact email.', details: adminResult.error },
        { status: 500 }
      );
    }

    const userResult = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'We received your message — BrightPath Nepal',
      html: userHtml,
    });

    if (userResult.error) {
      console.error('Resend contact confirmation email error:', userResult.error);
      return NextResponse.json(
        {
          error: 'Admin email sent, but confirmation email failed.',
          details: userResult.error,
          adminEmailId: adminResult.data?.id,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      adminEmailId: adminResult.data?.id,
      userEmailId: userResult.data?.id,
      confirmationSent: true,
    });
  } catch (error) {
    console.error('[contact/route] unexpected error:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}