import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('registrations')
      .select('id, full_name, dpc')
      .eq('payment_status', 'Verified')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Verified participants error:', error);

      return NextResponse.json(
        { message: 'Gagal mengambil data peserta.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { participants: data ?? [] },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Participants API error:', error);

    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}