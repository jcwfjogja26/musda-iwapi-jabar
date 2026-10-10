import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BUCKET_NAME = 'registration-proofs';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_BENEFITS_LENGTH = 500;

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
];

type ProofFolder = 'download' | 'payment';

async function uploadProof(
  file: File,
  registrationId: string,
  folder: ProofFolder
) {
  const extensionFromName = file.name
    .split('.')
    .pop()
    ?.toLowerCase();

  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

  const extension =
    extensionFromName && allowedExtensions.includes(extensionFromName)
      ? extensionFromName
      : file.type === 'image/png'
        ? 'png'
        : file.type === 'image/webp'
          ? 'webp'
          : 'jpg';

  const filePath = `${registrationId}/${folder}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw new Error(
      `Upload ${folder} ke Supabase gagal: ${error.message}`
    );
  }

  return { filePath };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Data peserta
    const fullName = String(formData.get('fullName') || '').trim();
    const whatsapp = String(formData.get('whatsapp') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const dpc = String(formData.get('dpc') || '').trim();

    // Data usaha
    const businessField = String(
      formData.get('businessField') || ''
    ).trim();

    const brandName = String(
      formData.get('brandName') || ''
    ).trim();

    const businessDuration = String(
      formData.get('businessDuration') || ''
    ).trim();

    const expectedIwapiBenefits = String(
      formData.get('expectedIwapiBenefits') || ''
    ).trim();

    // Konfirmasi dan bukti
    const tactlinkDownloaded =
      formData.get('tactlinkDownloaded') === 'true';

    const downloadProof = formData.get('downloadProof');
    const paymentProof = formData.get('paymentProof');

    // Validasi data wajib
    if (
      !fullName ||
      !whatsapp ||
      !dpc ||
      !businessField ||
      !brandName ||
      !businessDuration ||
      !expectedIwapiBenefits
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Nama, WhatsApp, DPC, bidang usaha, nama brand, lama usaha, dan manfaat yang diharapkan wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (expectedIwapiBenefits.length > MAX_BENEFITS_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Manfaat yang diharapkan maksimal 500 karakter.',
        },
        { status: 400 }
      );
    }

    if (!tactlinkDownloaded) {
      return NextResponse.json(
        {
          success: false,
          message: 'Konfirmasi unduhan TactLink wajib dilakukan.',
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

    if (!(paymentProof instanceof File) || paymentProof.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Bukti pembayaran wajib diunggah.',
        },
        { status: 400 }
      );
    }

    // Validasi tipe dan ukuran file
    for (const item of [
      { file: downloadProof, label: 'Bukti download TactLink' },
      { file: paymentProof, label: 'Bukti pembayaran' },
    ]) {
      if (!ALLOWED_TYPES.includes(item.file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: `${item.label} harus berupa JPG, PNG, atau WEBP.`,
          },
          { status: 400 }
        );
      }

      if (item.file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            message: `${item.label} maksimal 5 MB.`,
          },
          { status: 400 }
        );
      }
    }

    // Simpan data registrasi tanpa kolom city
    const { data: registration, error: registrationError } =
      await supabaseAdmin
        .from('registrations')
        .insert({
          full_name: fullName,
          whatsapp,
          email: email || null,
          dpc,
          business_field: businessField,
          brand_name: brandName,
          business_duration: businessDuration,
          expected_iwapi_benefits: expectedIwapiBenefits,
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

    // Upload bukti ke Supabase Storage
    const download = await uploadProof(
      downloadProof,
      registrationId,
      'download'
    );

    const payment = await uploadProof(
      paymentProof,
      registrationId,
      'payment'
    );

    // Simpan path bukti ke database
    const { error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({
        tactlink_download_proof_url: download.filePath,
        payment_proof_url: payment.filePath,
      })
      .eq('id', registrationId);

    if (updateError) {
      throw new Error(
        `Path bukti gagal disimpan ke database: ${updateError.message}`
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil.',
      registrationCode: registration.registration_code,
      data: {
        registration_code: registration.registration_code,
        tactlink_download_proof_url: download.filePath,
        payment_proof_url: payment.filePath,
      },
    });
  } catch (error) {
    console.error('Registration API error:', error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Terjadi kesalahan pada server.',
      },
      { status: 500 }
    );
  }
}