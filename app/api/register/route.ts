import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

const BUCKET_NAME = 'registration-proofs';

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-');
}

async function uploadProof(
  file: File,
  registrationId: string,
  folder: 'download' | 'rsvp' | 'payment'
) {
  const fileExtension = file.name.split('.').pop() || 'jpg';

  const filePath = `${registrationId}/${folder}.${fileExtension}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload ${folder} failed: ${error.message}`);
  }

  return filePath;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // ============================================
    // DATA PESERTA
    // ============================================

    const fullName = String(formData.get('fullName') || '').trim();
    const whatsapp = String(formData.get('whatsapp') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const city = String(formData.get('city') || '').trim();
    const dpc = String(formData.get('dpc') || '').trim();

    // ============================================
    // TACTLINK
    // ============================================

    const tactlinkDownloaded =
      formData.get('tactlinkDownloaded') === 'true';

    const downloadProof = formData.get('downloadProof');
    const rsvpProof = formData.get('rsvpProof');

    // ============================================
    // PAYMENT
    // ============================================

    const paymentProof = formData.get('paymentProof');

    // ============================================
    // VALIDATION
    // ============================================

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nama lengkap wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (!whatsapp) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nomor WhatsApp wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json(
        {
          success: false,
          message: 'Kota asal wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (!dpc) {
      return NextResponse.json(
        {
          success: false,
          message: 'DPC wajib dipilih.',
        },
        { status: 400 }
      );
    }

    if (!tactlinkDownloaded) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Anda harus mengonfirmasi bahwa TactLink sudah diunduh.',
        },
        { status: 400 }
      );
    }

    if (!(downloadProof instanceof File) || downloadProof.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Bukti download TactLink wajib diunggah.',
        },
        { status: 400 }
      );
    }

    if (!(rsvpProof instanceof File) || rsvpProof.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Bukti RSVP TactLink wajib diunggah.',
        },
        { status: 400 }
      );
    }

    if (!(paymentProof instanceof File) || paymentProof.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Bukti pembayaran wajib diunggah.',
        },
        { status: 400 }
      );
    }

    // ============================================
    // FILE VALIDATION
    // ============================================

    const maxFileSize = 5 * 1024 * 1024;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    const files = [
      {
        file: downloadProof,
        label: 'Bukti download TactLink',
      },
      {
        file: rsvpProof,
        label: 'Bukti RSVP TactLink',
      },
      {
        file: paymentProof,
        label: 'Bukti pembayaran',
      },
    ];

    for (const item of files) {
      if (!allowedTypes.includes(item.file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: `${item.label} harus berupa JPG, PNG, atau WEBP.`,
          },
          { status: 400 }
        );
      }

      if (item.file.size > maxFileSize) {
        return NextResponse.json(
          {
            success: false,
            message: `${item.label} maksimal 5 MB.`,
          },
          { status: 400 }
        );
      }
    }

    // ============================================
    // CREATE REGISTRATION
    // ============================================

    const { data: registration, error: registrationError } =
      await supabaseAdmin
        .from('registrations')
        .insert({
          full_name: fullName,
          whatsapp,
          email: email || null,
          city,
          dpc,
          tactlink_downloaded: true,
        })
        .select()
        .single();

    if (registrationError || !registration) {
      console.error(
        'Registration insert error:',
        registrationError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            registrationError?.message ||
            'Gagal menyimpan data registrasi.',
        },
        { status: 500 }
      );
    }

    const registrationId = registration.id;

    // ============================================
    // UPLOAD FILES
    // ============================================

    const downloadPath = await uploadProof(
      downloadProof,
      registrationId,
      'download'
    );

    const rsvpPath = await uploadProof(
      rsvpProof,
      registrationId,
      'rsvp'
    );

    const paymentPath = await uploadProof(
      paymentProof,
      registrationId,
      'payment'
    );

    // ============================================
    // SAVE FILE PATHS
    // ============================================

    const { error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({
        tactlink_download_proof_url: downloadPath,
        tactlink_rsvp_proof_url: rsvpPath,
        payment_proof_url: paymentPath,
      })
      .eq('id', registrationId);

    if (updateError) {
      console.error(
        'Registration file path update error:',
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            'Data berhasil dibuat tetapi file belum berhasil ditautkan.',
        },
        { status: 500 }
      );
    }

    // ============================================
    // SUCCESS
    // ============================================

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil.',
      registrationCode: registration.registration_code,
    });
  } catch (error) {
    console.error('Registration API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan pada server.',
      },
      { status: 500 }
    );
  }
}