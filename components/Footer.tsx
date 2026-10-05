import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-v2" id="footer">
      <div className="section-container">
        <div className="footer-main">
          <div className="footer-brand-v2">
            <div className="footer-logo">
              <span>I</span>
              <div>
                <strong>IWAPI</strong>
                <small>JAWA BARAT</small>
              </div>
            </div>

            <p>
              Digital hub Musyawarah Daerah Ikatan Wanita Pengusaha Indonesia
              Jawa Barat.
            </p>
          </div>

          <div className="footer-column">
            <span>EXPLORE</span>
            <a href="#tentang">Tentang MUSDA</a>
            <a href="#acara">Detail Acara</a>
            <a href="#market">Market & Tenant</a>
            <a href="#lokasi">Lokasi</a>
          </div>

          <div className="footer-column">
            <span>OPPORTUNITY</span>
            <a href="#partnership">Partnership</a>
            <a href="#hotel">Hotel</a>
            <a href="#tactlink">TactLink</a>
            <a href="/register">Registrasi</a>
          </div>

          <div className="footer-column footer-contact">
            <span>CONTACT</span>
            <p>
              Untuk informasi sponsorship, tenant, hotel, dan kebutuhan
              kolaborasi lainnya.
            </p>

            <a href="mailto:info@iwapijabar.id">
              Hubungi Tim
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="footer-bottom-v2">
          <span>© 2026 IWAPI Jawa Barat</span>
          <span>Powered by TactLink</span>
        </div>
      </div>
    </footer>
  );
}