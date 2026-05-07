import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json() as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      message?: string;
      formType?: string;
    };

    const firstName = body.firstName?.trim() ?? '';
    const lastName = body.lastName?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const phone = body.phone?.trim() ?? '';
    const message = body.message?.trim() ?? '';
    const formType = body.formType?.trim() ?? 'Free Consultation';

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const isCallBack = formType === 'Request Call Back';
    const subjectLabel = isCallBack ? 'Call Back Request' : 'Free Consultation Booking';

    const adminHtml = `
      <div>
        <h1>${subjectLabel}</h1>
        <p>${firstName} ${lastName}</p>
        <p>${email}</p>
        <p>${phone}</p>
        <p>${message || ''}</p>
      </div>
    `;

    const userHtml = `
      <div>
        <h1>${isCallBack ? 'Call Back Confirmed!' : 'Consultation Booked!'}</h1>
        <p>Hi ${firstName}, we received your request.</p>
      </div>
    `;

    const adminResult = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? 'Your Brand <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL ?? 'bec.edu.nep@gmail.com'],
      replyTo: email,
      subject: `${subjectLabel} — ${firstName} ${lastName}`,
      html: adminHtml,
    });

    if (adminResult.error) {
      console.error('Resend admin email error:', adminResult.error);
      return NextResponse.json(
        { error: 'Failed to send admin email.', details: adminResult.error },
        { status: 500 }
      );
    }

    const userResult = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? 'Your Brand <onboarding@resend.dev>',
      to: [email],
      subject: isCallBack
        ? 'Your call back request is confirmed — BrightPath Nepal'
        : 'Your consultation is booked — BrightPath Nepal',
      html: userHtml,
    });

    if (userResult.error) {
      console.error('Resend user email error:', userResult.error);
      return NextResponse.json(
        { error: 'Admin email sent, but confirmation email failed.', details: userResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      adminEmailId: adminResult.data?.id,
      userEmailId: userResult.data?.id,
    });
  } catch (error) {
    console.error('[consultation/route] unexpected error:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}