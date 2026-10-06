import { ArrowUpRight, MessageCircle } from "lucide-react";

// ⚠️ ISIKAN NOMOR WHATSAPP ASLI DI SINI (Gunakan format 628xxxxxxxxxx)
const PHONE_FITRI = "628xxxxxxxxxx";
const PHONE_AVIE = "628xxxxxxxxxx";

export default function Footer() {
  return (
    <footer className="footer-v2" id="footer">
      <div className="section-container">
        <div className="footer-main">
          <div className="footer-brand-v2">
            <div className="footer-logo">
              <div className="footer-logo-img">
                <img
                  src="/image/iwapi-jabar.png"
                  alt="Logo IWAPI Jawa Barat"
                />
              </div>
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

          {/* KONTAK FITRI & AVIE */}
          <div className="footer-column footer-contact">
            <span>CONTACT</span>
            <p>
              Untuk informasi sponsorship, tenant, hotel, dan kebutuhan
              kolaborasi lainnya.
            </p>

            <div className="footer-contact-buttons">
              <a
                href={`https://wa.me/${PHONE_FITRI}?text=Halo%20Fitri,%20saya%20ingin%20bertanya%20mengenai%20MUSDA%20IWAPI`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-btn"
              >
                <MessageCircle size={14} />
                <span>Contact Fitri</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={`https://wa.me/${PHONE_AVIE}?text=Halo%20Avie,%20saya%20ingin%20bertanya%20mengenai%20MUSDA%20IWAPI`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-btn"
              >
                <MessageCircle size={14} />
                <span>Contact Avie</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM (STACKED) */}
        <div className="footer-bottom-v2">
          <span>© 2026 MUSDA IWAPI Jawa Barat</span>
          
          <div className="footer-powered">
            <span>Powered by</span>
            <strong>TactLink</strong>
          </div>

          <div className="footer-developer">
            <span>Dev by</span>
            <a
              href="https://www.linkedin.com/in/aliyahalfitarossa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aliyah Alfita Rossa
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}