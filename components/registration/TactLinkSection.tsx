'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  Play,
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

const TACTLINK_DOWNLOAD_URL = '#';
const TACTLINK_TUTORIAL_URL = '#';

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
            TactLink digunakan untuk proses RSVP MUSDA.
            Selesaikan langkah berikut sebelum melanjutkan
            ke pembayaran.
          </p>
        </div>

        <div className="tactlink-info-card">
          <div className="tactlink-logo">
            T
          </div>

          <div className="tactlink-info-content">
            <span className="info-card-label">
              LANGKAH WAJIB
            </span>

            <h3>
              Download dan RSVP melalui TactLink
            </h3>

            <p>
              Unduh aplikasi TactLink, lakukan RSVP atau
              scan QR MUSDA di dalam aplikasi, kemudian
              simpan screenshot sebagai bukti.
            </p>

            <div className="tactlink-actions">
              <a
                href={TACTLINK_TUTORIAL_URL}
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                <Play size={15} />
                Cara Download
              </a>

              <a
                href={TACTLINK_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="primary-button small"
              >
                <Download size={15} />
                Download TactLink
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <label className="confirmation-check">
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
            Saya sudah mengunduh TactLink dan melakukan
            RSVP MUSDA melalui aplikasi.
          </span>
        </label>

        <div className="proof-grid">
          <FileUpload
            label="Bukti Download / Instalasi"
            description="Screenshot yang menunjukkan TactLink sudah terpasang."
            file={downloadProof}
            onChange={onDownloadProofChange}
          />

          <FileUpload
            label="Bukti RSVP TactLink"
            description="Screenshot setelah RSVP / scan QR berhasil."
            file={rsvpProof}
            onChange={onRsvpProofChange}
          />
        </div>

        <div className="registration-section-footer">
          <span className="step-hint">
            Pastikan kedua bukti sudah terunggah.
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