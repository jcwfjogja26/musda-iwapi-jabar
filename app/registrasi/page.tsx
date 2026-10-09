import { Calendar } from 'lucide-react';
import RegistrationForm from '../../components/registration/RegistrationForm';

export default function RegistrationPage() {
  return (
    <main className="registration-page">
      <section className="registration-hero">
        <div className="registration-hero-inner">
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