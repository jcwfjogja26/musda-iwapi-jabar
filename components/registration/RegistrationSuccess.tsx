'use client';

import { Check } from 'lucide-react';

export default function RegistrationSuccess() {
  return (
    <div className="success-overlay">
      <div className="success-card">
        {/* Layer Efek Glow Hero */}
        <div className="hero-background">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
        </div>

        {/* Konten Modal */}
        <div className="success-card-content">
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
            Pendaftaran Anda telah berhasil diterima.
            Silakan tunggu konfirmasi selanjutnya dari tim
            panitia.
          </p>

          <div className="success-loading">
            <span />
            Mengarahkan ke Explore...
          </div>
        </div>
      </div>
    </div>
  );
}