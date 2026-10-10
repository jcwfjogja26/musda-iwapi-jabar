import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import RegistrationForm from '../../components/registration/RegistrationForm';

export default function RegistrationPage() {
  return (
    <main className="registration-page" style={{ paddingTop: 0, marginTop: 0 }}>
      <section className="registration-hero">
        <div className="registration-hero-inner">
          {/* TOMBOL KEMBALI KE LANDING PAGE (PILL PUTIH TEKS BIRU) */}
          <div style={{ marginBottom: '20px' }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0066cc] font-semibold text-xs shadow-sm hover:bg-blue-50 transition-all hover:-translate-y-0.5"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '999px',
                backgroundColor: '#ffffff',
                color: '#0066cc',
                fontSize: '11px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                letterSpacing: '0.02em',
              }}
            >
              <ArrowLeft size={13} strokeWidth={2.2} />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>

          <div className="registration-eyebrow">
            <span />
            MUSDA IWAPI JAWA BARAT
          </div>

          <h1>
            Lengkapi
            <br />
            <em>pendaftaran Anda.</em>
          </h1>

          <p>
            Ikuti tiga tahap sederhana untuk menyelesaikan
            pendaftaran Musyawarah Daerah IWAPI Jawa Barat.
          </p>

          <div className="registration-deadline-card">
            <span className="deadline-label">
              <Calendar size={13} />
              BATAS PENDAFTARAN
            </span>
            <span className="deadline-time">
              9 Nov 2026, 15.00 WIB
            </span>
          </div>
        </div>

        <div className="registration-hero-circle" />
      </section>

      <RegistrationForm />
    </main>
  );
}