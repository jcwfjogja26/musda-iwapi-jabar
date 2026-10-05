'use client';

import { Check } from 'lucide-react';

interface RegistrationSuccessProps {
  registrationCode: string;
}

export default function RegistrationSuccess({
  registrationCode,
}: RegistrationSuccessProps) {
  return (
    <div className="success-overlay">
      <div className="success-card">
        <div className="success-icon">
          <Check size={28} />
        </div>

        <span className="success-kicker">
          PENDAFTARAN BERHASIL
        </span>

        <h2>
          Sampai jumpa di
          <br />
          MUSDA IWAPI.
        </h2>

        <p>
          Pendaftaran Anda sudah diterima.
          Simpan kode registrasi berikut untuk
          kebutuhan informasi selanjutnya.
        </p>

        <div className="registration-code">
          <span>KODE REGISTRASI</span>
          <strong>{registrationCode}</strong>
        </div>

        <div className="success-loading">
          <span />
          Mengarahkan ke Explore...
        </div>
      </div>
    </div>
  );
}