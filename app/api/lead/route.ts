import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/email/send';
import {
  calculatorEmailTemplate,
  consultationEmailTemplate,
  plotAnalysisEmailTemplate,
  type CalculatorLeadData,
  type ConsultationLeadData,
  type PlotAnalysisLeadData,
} from '@/lib/email/templates';

// ─── Types ────────────────────────────────────────────

type LeadSource = 'calculator' | 'consultation' | 'plot_analysis';

interface LeadPayload {
  source: LeadSource;
  data: CalculatorLeadData | ConsultationLeadData | PlotAnalysisLeadData;
}

// ─── Validation ───────────────────────────────────────

function validateCommonFields(data: Record<string, unknown>): string | null {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    return 'Brak imienia i nazwiska.';
  }
  if (!data.phone || typeof data.phone !== 'string' || data.phone.replace(/\s/g, '').length < 9) {
    return 'Brak numeru telefonu';
  }
  return null;
}

// ─── POST Handler ─────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();
    const { source, data } = body;

    // Validate source
    if (!['calculator', 'consultation', 'plot_analysis'].includes(source)) {
      return NextResponse.json(
        { error: 'Nieprawidłowe źródło formularza' },
        { status: 400 }
      );
    }

    // Validate common fields
    const commonError = validateCommonFields(data as unknown as Record<string, unknown>);
    if (commonError) {
      return NextResponse.json({ error: commonError }, { status: 400 });
    }

    // Generate email template based on source
    let emailContent: { subject: string; html: string };

    switch (source) {
      case 'calculator':
        emailContent = calculatorEmailTemplate(data as CalculatorLeadData);
        break;
      case 'consultation':
        emailContent = consultationEmailTemplate(data as ConsultationLeadData);
        break;
      case 'plot_analysis':
        emailContent = plotAnalysisEmailTemplate(data as PlotAnalysisLeadData);
        break;
      default:
        return NextResponse.json({ error: 'Unknown source' }, { status: 400 });
    }

    // Send email
    await sendLeadEmail(emailContent);

    console.log(`[Lead] ${source} — ${(data as { name: string }).name} — email sent`);

    return NextResponse.json({ success: true, source });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('[Lead] Error processing lead:', errMsg);

    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Wystąpił błąd przy wysyłaniu zgłoszenia. Spróbuj ponownie lub zadzwoń.' },
      { status: 500 }
    );
  }
}
