import Image from 'next/image';
import { Calendar, MapPin, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
      </div>

      <div className="hero-container">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            DPD IWAPI JAWA BARAT
          </div>

          <h1 className="hero-title">
            <span>MUSDA</span>
            <em>IWAPI</em>
            <strong>JAWA BARAT</strong>
          </h1>

          {/* SUB-HEADING TANGGAL & VENUE */}
          
{/* 2 KARTU PILL TERPISAH (TANGGAL & LOKASI) */}
<div className="hero-event-pills">
  <div className="hero-event-pill">
    <Calendar size={15} />
    <span>Rabu, 18 November 2026</span>
  </div>

  <div className="hero-event-pill">
    <MapPin size={15} />
    <span>Grand Asrilia Hotel - Bandung</span>
  </div>
</div>

          {/* CARD POSTER MUSDA */}
          <div className="hero-poster-card">
            <Image
              src="/image/poster.png"
              alt="Poster MUSDA IWAPI Jawa Barat"
              width={640}
              height={480}
              priority
              className="hero-poster-img"
            />
          </div>

          {/* CARD PERIODE ELEGAN (HANYA PERIODE) */}
          <div className="hero-period-highlight">
            <div className="period-badge">
              <Award size={16} />
              <span>PERIODE KEPENGURUSAN</span>
            </div>
            <strong className="period-years">2027 — 2032</strong>
          </div>

          <div className="hero-actions">
            <a href="/registrasi" className="hero-button hero-button-primary">
              Daftar Sekarang
            </a>

            <a href="#tentang" className="hero-button hero-button-secondary">
              Kenali MUSDA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}