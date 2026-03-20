import { Resend } from 'resend';

let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY || '');
  }
  return resend;
}

interface SendLeadEmailParams {
  subject: string;
  html: string;
}

export async function sendLeadEmail({ subject, html }: SendLeadEmailParams) {
  const to = process.env.LEAD_NOTIFICATION_EMAIL || 'biuro@coreltb.pl';
  const from = process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev';

  const { data, error } = await getResend().emails.send({
    from: `CoreLTB Leady <${from}>`,
    to: [to],
    subject,
    html,
  });

  if (error) {
    console.error('[Email] Failed to send:', JSON.stringify(error));
    throw new Error(`Email send failed: ${error.message}`);
  }

  console.log(`[Email] Sent successfully: ${data?.id}`);
  return data;
}
