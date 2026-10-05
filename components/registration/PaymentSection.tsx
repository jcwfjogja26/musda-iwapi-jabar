'use client';

import {
  CreditCard,
  Utensils,
} from 'lucide-react';

import FileUpload from './FileUpload';

interface PaymentSectionProps {
  paymentProof: File | null;
  onPaymentProofChange: (file: File | null) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function PaymentSection({
  paymentProof,
  onPaymentProofChange,
  onSubmit,
  loading,
}: PaymentSectionProps) {
  const canSubmit =
    paymentProof !== null && !loading;

  return (
    <section className="registration-section">
      <div className="section-number">03</div>

      <div className="registration-section-content">
        <div className="registration-section-heading">
          <span className="section-kicker">
            PEMBAYARAN
          </span>

          <h2>Selangkah lagi selesai</h2>

          <p>
            Selesaikan biaya registrasi sesuai informasi
            pembayaran berikut, kemudian unggah bukti
            transfer.
          </p>
        </div>

        <div className="payment-card">
          <div className="payment-card-top">
            <div>
              <span className="payment-label">
                BIAYA REGISTRASI
              </span>

              <strong className="payment-amount">
                Rp350.000
              </strong>
            </div>

            <div className="payment-icon">
              <CreditCard size={22} />
            </div>
          </div>

          <div className="payment-divider" />

          <div className="payment-bank">
            <span>Bank Mandiri</span>

            <strong>
              132 006 333 633 4
            </strong>

            <small>
              a.n. Ikatan Wanita Pengusaha Indonesia
            </small>
          </div>

          <div className="payment-benefits">
            <div>
              <Utensils size={16} />

              <span>
                Coffee Break <strong>2×</strong>
              </span>
            </div>

            <div>
              <Utensils size={16} />

              <span>
                Lunch <strong>1×</strong>
              </span>
            </div>
          </div>
        </div>

        <FileUpload
          label="Bukti Pembayaran"
          description="Pastikan nominal dan nama rekening tujuan terlihat dengan jelas."
          file={paymentProof}
          onChange={onPaymentProofChange}
        />

        <div className="payment-reminder">
          <strong>
            Periksa kembali sebelum submit.
          </strong>

          <span>
            Setelah pendaftaran dikirim, data akan
            diteruskan kepada panitia untuk proses
            pengecekan.
          </span>
        </div>

        <div className="registration-section-footer">
          <span className="step-hint">
            Bukti pembayaran wajib diunggah.
          </span>

          <button
            type="button"
            className="primary-button submit-button"
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            {loading
              ? <span>Mengirim pendaftaran...</span>
              : <span>Daftar Sekarang</span>}

            {!loading && <span></span>}
          </button>
        </div>
      </div>
    </section>
  );
}