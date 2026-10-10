
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabaseServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BUCKET_NAME = 'registration-proofs';

type VerificationStatus = 'Pending' | 'Verified';

function jsonError(message: string, status = 500) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

// Pastikan hanya admin yang terdaftar yang bisa mengakses API.
async function authorizeAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Gagal tertutup jika konfigurasi keamanan belum lengkap.
  if (!adminEmail || !supabaseUrl || !supabaseAnonKey) {
    console.error('Konfigurasi autentikasi admin belum lengkap.');
    return { authorized: false as const, status: 500 };
  }

  const cookieStore = await cookies();

  const supabaseAuth = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Cookie mungkin tidak bisa diubah pada konteks tertentu.
            // Validasi user tetap dilakukan di bawah.
          }
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabaseAuth.auth.getUser();

  if (error || !user || !user.email) {
    return { authorized: false as const, status: 401 };
  }

  if (user.email.toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return { authorized: false as const, status: 403 };
  }

  return { authorized: true as const };
}

// GET: Ambil data pendaftar dan signed URL bukti.
export async function GET() {
  try {
    const auth = await authorizeAdmin();

    if (!auth.authorized) {
      return jsonError(
        auth.status === 401
          ? 'Silakan login sebagai admin.'
          : auth.status === 403
            ? 'Akses hanya untuk admin.'
            : 'Konfigurasi autentikasi server belum lengkap.',
        auth.status
      );
    }

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
      return jsonError('Gagal mengambil data pendaftaran.');
    }

    const registrations = await Promise.all(
      (data ?? []).map(async (item) => {
        let downloadProofUrl: string | null = null;
        let paymentProofUrl: string | null = null;

        if (item.tactlink_download_proof_url) {
          const { data: signedDownload, error: downloadError } =
            await supabaseAdmin.storage
              .from(BUCKET_NAME)
              .createSignedUrl(
                item.tactlink_download_proof_url,
                3600
              );

          if (!downloadError && signedDownload) {
            downloadProofUrl = signedDownload.signedUrl;
          } else {
            console.error(
              'Gagal membuat signed URL bukti download:',
              downloadError?.message
            );
          }
        }

        if (item.payment_proof_url) {
          const { data: signedPayment, error: paymentError } =
            await supabaseAdmin.storage
              .from(BUCKET_NAME)
              .createSignedUrl(item.payment_proof_url, 3600);

          if (!paymentError && signedPayment) {
            paymentProofUrl = signedPayment.signedUrl;
          } else {
            console.error(
              'Gagal membuat signed URL bukti pembayaran:',
              paymentError?.message
            );
          }
        }

        const downloadStatus = item.download_status ?? 'Pending';
        const paymentStatus = item.payment_status ?? 'Pending';

        const overallStatus =
          downloadStatus === 'Verified' ||
          paymentStatus === 'Verified'
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

    return NextResponse.json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error('Admin GET error:', error);
    return jsonError('Terjadi kesalahan saat memuat data.');
  }
}

// PATCH: Ubah status verifikasi.
export async function PATCH(request: NextRequest) {
  try {
    const auth = await authorizeAdmin();

    if (!auth.authorized) {
      return jsonError(
        auth.status === 401
          ? 'Silakan login sebagai admin.'
          : auth.status === 403
            ? 'Akses hanya untuk admin.'
            : 'Konfigurasi autentikasi server belum lengkap.',
        auth.status
      );
    }

    const body = await request.json();
    const id = String(body.id ?? '');
    const status = body.status as VerificationStatus;

    if (!id || !['Pending', 'Verified'].includes(status)) {
      return jsonError('ID atau status tidak valid.', 400);
    }

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
      return jsonError('Gagal memperbarui status.');
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
    return jsonError('Terjadi kesalahan saat memperbarui status.');
  }
}

// DELETE: Hapus data pendaftaran.
export async function DELETE(request: NextRequest) {
  try {
    const auth = await authorizeAdmin();

    if (!auth.authorized) {
      return jsonError(
        auth.status === 401
          ? 'Silakan login sebagai admin.'
          : auth.status === 403
            ? 'Akses hanya untuk admin.'
            : 'Konfigurasi autentikasi server belum lengkap.',
        auth.status
      );
    }

    const body = await request.json();
    const id = String(body.id ?? '');

    if (!id) {
      return jsonError('ID pendaftaran wajib diisi.', 400);
    }

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('Admin DELETE error:', error.message);
      return jsonError('Gagal menghapus data pendaftaran.');
    }

    if (!data) {
      return jsonError('Data pendaftar tidak ditemukan.', 404);
    }

    return NextResponse.json({
      success: true,
      message: 'Data pendaftaran berhasil dihapus.',
    });
  } catch (error) {
    console.error('Admin DELETE error:', error);
    return jsonError('Terjadi kesalahan saat menghapus data.');
  }
}
