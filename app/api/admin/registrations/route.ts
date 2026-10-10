import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BUCKET_NAME = 'registration-proofs';

type VerificationStatus = 'Pending' | 'Verified';

function jsonError(message: string, status = 500) {
  return NextResponse.json({ success: false, message }, { status });
}

// 1. GET: Ambil pendaftar, URL bukti terenkripsi (Signed URL), dan kalkulasi status
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('registrations')
      .select(`
        id,
        registration_code,
        full_name,
        whatsapp,
        email,
        city,
        dpc,
        created_at,
        tactlink_download_proof_url,
        payment_proof_url,
        download_status,
        payment_status
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Gagal mengambil registrations:', error.message);
      return jsonError(error.message);
    }

    const registrations = await Promise.all(
      (data ?? []).map(async (item) => {
        let downloadProofUrl: string | null = null;
        let paymentProofUrl: string | null = null;

        if (item.tactlink_download_proof_url) {
          const { data: signedDownload, error: downloadError } =
            await supabaseAdmin.storage
              .from(BUCKET_NAME)
              .createSignedUrl(item.tactlink_download_proof_url, 3600);

          if (!downloadError) {
            downloadProofUrl = signedDownload.signedUrl;
          } else {
            console.error('Gagal membuat URL bukti download:', downloadError.message);
          }
        }

        if (item.payment_proof_url) {
          const { data: signedPayment, error: paymentError } =
            await supabaseAdmin.storage
              .from(BUCKET_NAME)
              .createSignedUrl(item.payment_proof_url, 3600);

          if (!paymentError) {
            paymentProofUrl = signedPayment.signedUrl;
          } else {
            console.error('Gagal membuat URL bukti pembayaran:', paymentError.message);
          }
        }

        const downloadStatus = item.download_status ?? 'Pending';
        const paymentStatus = item.payment_status ?? 'Pending';

        // Hitung status utama untuk dropdown terpadu
        const overallStatus =
          downloadStatus === 'Verified' || paymentStatus === 'Verified'
            ? 'Verified'
            : 'Pending';

        return {
          id: item.id,
          registration_code: item.registration_code,
          full_name: item.full_name,
          whatsapp: item.whatsapp,
          email: item.email ?? '',
          city: item.city,
          dpc: item.dpc,
          created_at: item.created_at,
          downloadProofUrl,
          paymentProofUrl,
          download_status: downloadStatus,
          payment_status: paymentStatus,
          status: overallStatus,
        };
      })
    );

    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    console.error('Admin GET error:', error);
    return jsonError(
      error instanceof Error ? error.message : 'Gagal memuat data pendaftaran.'
    );
  }
}

// 2. PATCH: Simpan status verifikasi ke database
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const id = String(body.id ?? '');
    const status = body.status as VerificationStatus;

    if (!id || !status) {
      return jsonError('ID dan status wajib diisi.', 400);
    }

    if (!['Pending', 'Verified'].includes(status)) {
      return jsonError('Status harus Pending atau Verified.', 400);
    }

    // Mengupdate kedua kolom status sekaligus sesuai opsi dropdown frontend
    const { data, error } = await supabaseAdmin
      .from('registrations')
      .update({
        download_status: status,
        payment_status: status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('Admin PATCH error:', error.message);
      return jsonError(error.message);
    }

    if (!data) {
      return jsonError('Data pendaftar tidak ditemukan.', 404);
    }

    return NextResponse.json({
      success: true,
      message: 'Status verifikasi berhasil disimpan.',
    });
  } catch (error) {
    console.error('Admin PATCH error:', error);
    return jsonError(
      error instanceof Error ? error.message : 'Gagal memperbarui status.'
    );
  }
}

// 3. DELETE: Hapus data pendaftaran dari database via Request Body JSON
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const id = String(body.id ?? '');

    if (!id) {
      return jsonError('ID pendaftaran wajib disertakan.', 400);
    }

    const { error } = await supabaseAdmin
      .from('registrations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Admin DELETE error:', error.message);
      return jsonError(error.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Data pendaftaran berhasil dihapus.',
    });
  } catch (error) {
    console.error('Admin DELETE error:', error);
    return jsonError(
      error instanceof Error ? error.message : 'Gagal menghapus data pendaftaran.'
    );
  }
}