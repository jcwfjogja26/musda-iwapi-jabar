'use client';

import Image from 'next/image';
import {
  CheckCircle2,
  ExternalLink,
  Play,
  QrCode,
} from 'lucide-react';

import FileUpload from './FileUpload';

interface TactLinkSectionProps {
  downloadProof: File | null;
  rsvpProof: File | null;
  downloaded: boolean;
  onDownloadProofChange: (file: File | null) => void;
  onRsvpProofChange: (file: File | null) => void;
  onDownloadedChange: (value: boolean) => void;
  onNext: () => void;
}

// Tautan Resmi Aplikasi TactLink, RSVP, & Video Tutorial
const TACTLINK_PLAYSTORE_URL =
  'https://play.google.com/store/apps/details?id=com.tactlink.app';
const TACTLINK_APPSTORE_URL =
  'https://apps.apple.com/id/app/tactlink/id1469516661';
const TACTLINK_TUTORIAL_URL =
  'https://www.youtube.com/shorts/JuYtU3TVvYo';
const TACTLINK_RSVP_URL =
  'https://app.tactlink.com/s/E4mviIFp5GQY';

/* SVG Icon Google Play Store */
function PlayStoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.609 1.814A1.5 1.5 0 0 0 3 3.064v17.872a1.5 1.5 0 0 0 .609 1.25l.067.054 10.01-10.01v-.236L3.676 1.76l-.067.054z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M17.021 15.578l-3.335-3.334v-.488l3.335-3.334.075.043 3.952 2.246c1.128.641 1.128 1.691 0 2.332l-3.952 2.246-.075.089z"
        fill="currentColor"
      />
      <path
        d="M13.686 12.244L3.609 22.186c.371.393.992.435 1.488.153l11.924-6.761-3.335-3.334z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M13.686 11.756l3.335-3.334L5.097 1.661C4.601 1.379 3.98 1.421 3.609 1.814l10.077 9.942z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}

/* SVG Icon Apple App Store */
function AppStoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.12c.67-.82 1.12-1.96.99-3.12-1 .04-2.18.67-2.88 1.49-.62.72-1.16 1.88-1.02 3 1.12.09 2.24-.55 2.91-1.37z" />
    </svg>
  );
}

export default function TactLinkSection({
  downloadProof,
  rsvpProof,
  downloaded,
  onDownloadProofChange,
  onRsvpProofChange,
  onDownloadedChange,
  onNext,
}: TactLinkSectionProps) {
  const canContinue =
    downloaded &&
    downloadProof !== null &&
    rsvpProof !== null;

  return (
    <section className="registration-section">
      <div className="section-number">02</div>

      <div className="registration-section-content">
        <div className="registration-section-heading">
          <span className="section-kicker">
            TACTLINK
          </span>

          <h2>Siapkan TactLink Anda</h2>

          <p>
            Aplikasi TactLink digunakan untuk verifikasi kehadiran &amp; RSVP MUSDA.
            Silakan ikuti petunjuk di bawah ini sebelum mengunggah bukti.
          </p>
        </div>

        {/* --- LANGKAH 1: DOWNLOAD APLIKASI --- */}
<div className="tactlink-info-card" style={{ marginBottom: '24px' }}>
  <div className="tactlink-logo">T</div>

  <div className="tactlink-info-content">
    <span className="info-card-label">LANGKAH 1</span>

    <h3>Unduh &amp; Pasang Aplikasi TactLink</h3>

    <p>
      Silakan unduh aplikasi TactLink sesuai dengan perangkat yang Anda gunakan,
      kemudian ambil screenshot halaman awal/aplikasi terpasang sebagai bukti instalasi.
    </p>

    <div className="tactlink-actions">
      <a
        href={TACTLINK_TUTORIAL_URL}
        target="_blank"
        rel="noreferrer"
        className="secondary-button"
      >
        <Play size={15} fill="currentColor" />
        <span>Cara Download</span>
      </a>

      <a
        href={TACTLINK_PLAYSTORE_URL}
        target="_blank"
        rel="noreferrer"
        className="primary-button small"
      >
        <PlayStoreIcon />
        <span>Google Play</span>
      </a>

      <a
        href={TACTLINK_APPSTORE_URL}
        target="_blank"
        rel="noreferrer"
        className="primary-button small"
      >
        <AppStoreIcon />
        <span>App Store</span>
      </a>
    </div>
  </div>
</div>

{/* UNGGUH BUKTI DOWNLOAD */}
<div style={{ marginBottom: '40px' }}>
  <FileUpload
    label="Bukti Download / Instalasi"
    description="Unggah screenshot yang menunjukkan aplikasi TactLink telah terpasang di perangkat Anda."
    file={downloadProof}
    onChange={onDownloadProofChange}
  />
</div>

        {/* --- LANGKAH 2: LAKUKAN RSVP --- */}
        <div className="tactlink-info-card" style={{ marginTop: '12px' }}>
          <div className="tactlink-logo" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            <QrCode size={24} />
          </div>

          <div className="tactlink-info-content">
            <span className="info-card-label">
              LANGKAH 2
            </span>

            <h3>
              Lakukan RSVP Acara MUSDA
            </h3>

            <p>
              Buka aplikasi TactLink dan lakukan RSVP kehadiran Anda melalui link resmi
              atau dengan memindai (scan) QR Code di bawah ini.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <a
                href={TACTLINK_RSVP_URL}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
                style={{ width: 'fit-content' }}
              >
                <span>Buka Link RSVP TactLink</span>
                <ExternalLink size={16} />
              </a>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)' }}>
                  Atau Scan QR Code Berikut:
                </span>
                <div style={{
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '16px',
                  width: 'fit-content',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Image
                    src="/image/qr-rsvp.png"
                    alt="QR Code RSVP TactLink MUSDA IWAPI Jabar"
                    width={180}
                    height={260}
                    style={{ objectFit: 'contain', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UNGGUH BUKTI RSVP (Berikan margin atas & hapus *) */}
        <div style={{ marginTop: '28px', marginBottom: '28px' }}>
          <FileUpload
            label="Bukti RSVP TactLink"
            description="Unggah screenshot konfirmasi berhasil RSVP atau scan QR dari aplikasi TactLink."
            file={rsvpProof}
            onChange={onRsvpProofChange}
          />
        </div>

        {/* --- CHECKLIST KONFIRMASI --- */}
        <label className="confirmation-check" style={{ marginTop: '24px' }}>
          <input
            type="checkbox"
            checked={downloaded}
            onChange={(event) =>
              onDownloadedChange(
                event.target.checked
              )
            }
          />

          <span className="custom-checkbox">
            {downloaded && (
              <CheckCircle2 size={16} />
            )}
          </span>

          <span>
            Saya mengonfirmasi telah mengunduh aplikasi TactLink dan berhasil melakukan RSVP MUSDA.
          </span>
        </label>

        {/* FOOTER & TOMBOL NEXT */}
        <div className="registration-section-footer">
          <span className="step-hint">
            Pastikan kedua bukti unggahan dan centang konfirmasi sudah terisi.
          </span>

          <button
            type="button"
            className="primary-button"
            disabled={!canContinue}
            onClick={onNext}
          >
            <span>Lanjut ke Pembayaran</span>
          </button>
        </div>
      </div>
    </section>
  );
}