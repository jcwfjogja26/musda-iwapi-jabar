import Image from 'next/image';

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

          <div className="hero-theme">
            <span>TEMA MUSDA 2026</span>

            <p>
              Memperkuat fondasi transformasi digital ekonomi perempuan
              pengusaha menuju <strong>Jabar Istimewa.</strong>
            </p>
          </div>

          <div className="hero-information">
            <div className="hero-information-card">
              <span>TANGGAL</span>
              <strong>18 NOVEMBER 2026</strong>
            </div>

            <div className="hero-information-card">
              <span>WILAYAH</span>
              <strong>JAWA BARAT</strong>
            </div>

            <div className="hero-information-card">
              <span>PERIODE</span>
              <strong>2027 — 2032</strong>
            </div>
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