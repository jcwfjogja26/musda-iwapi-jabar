import Image from "next/image";
import {
  CheckCircle2,
  ExternalLink,
  Globe,
  QrCode,
  Share2,
  Smartphone,
} from "lucide-react";

const points = [
  "Digital participant access & e-badge",
  "Quick QR check-in saat acara",
  "Kartu nama digital untuk networking peserta",
];

export default function TactLink() {
  const appStoreUrl =
    "https://apps.apple.com/id/app/tactlink/id1469516661";
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.tactlink.app";

  return (
    <section className="tactlink-v2" id="tactlink">
      <div className="tactlink-glow-v2" />

      <div className="section-container">
        <div className="tactlink-layout">
          {/* MOCKUP HP SISI KIRI */}
          <div className="tactlink-device-wrap">
            <div className="tactlink-device">
              <div className="device-top">
                <span>TACTLINK</span>
                <span>09:41</span>
              </div>

              <div className="device-screen">
                <div className="device-app-title">
                  <span>MY MUSDA</span>
                  <Smartphone size={15} />
                </div>

                <div className="device-ticket">
                  <span>PARTICIPANT PASS</span>

                  <div className="device-qr">
                    <QrCode size={82} strokeWidth={1.1} />
                  </div>

                  <strong>SCAN TO CHECK-IN</strong>

                  <small>Musda IWAPI Jawa Barat</small>
                </div>
              </div>

              <div className="device-home-indicator" />
            </div>

            <div className="tactlink-floating-card">
              <CheckCircle2 size={17} />
              <div>
                <span>CHECK-IN PASS</span>
                <strong>Ready & Verified</strong>
              </div>
            </div>
          </div>

          {/* KARTU POWERED BY TACTLINK (THEME BLUE & NAVY) */}
          <div className="tactlink-copy-v2">
            <div className="tactlink-card-box">
              {/* BADGE TOP */}
              <div className="tactlink-badge-powered">
                <span>POWERED BY TACTLINK</span>
              </div>

              {/* LOGO & HEADING */}
              <div className="tactlink-brand-header">
                <div className="tactlink-logo-container">
                  <Image
                    src="/image/logo-tactlink.png"
                    alt="TactLink Logo"
                    width={44}
                    height={44}
                    className="tactlink-logo-img"
                  />
                </div>
                <div>
                  <h2>
                    Connect smarter with <br />
                    <em>TactLink</em>
                  </h2>
                </div>
              </div>

              <p className="tactlink-desc">
                Experience smarter networking and modern digital business cards.
              </p>

              {/* LIST POIN FITUR */}
              <div className="tactlink-points-v2">
                {points.map((point) => (
                  <div key={point} className="tactlink-point-item">
                    <CheckCircle2 size={16} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* MAIN ACTION BUTTON */}
              <a
                href="https://www.tactlink.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="tactlink-main-button"
              >
                <span>Visit TactLink</span>
                <ExternalLink size={16} />
              </a>

              {/* APP STORE & PLAY STORE BUTTONS (COMPACT & OFFICAL COLORS) */}
              <div className="tactlink-store-buttons">
                {/* APP STORE */}
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-button"
                >
                  <svg
                    className="store-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.13c.64-.78 1.08-1.85.96-2.93-.93.04-2.08.62-2.74 1.39-.59.68-1.11 1.77-.97 2.83 1.05.08 2.12-.51 2.75-1.29z" />
                  </svg>
                  <div>
                    <small>DOWNLOAD ON THE</small>
                    <strong>App Store</strong>
                  </div>
                </a>

                {/* GOOGLE PLAY STORE DENGAN WARNA IKON RESMI */}
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-button"
                >
                  <svg
                    viewBox="0 0 512 512"
                    width="18"
                    height="18"
                    className="store-icon-play"
                  >
                    <path
                      fill="#00d2ff"
                      d="M32 35.3v441.4c0 10.1 5.6 19.1 14.5 23.6l239.5-239.5L46.5 11.7C37.6 16.2 32 25.2 32 35.3z"
                    />
                    <path
                      fill="#00f076"
                      d="M381.1 355.8L286 260.8l-239.5 239.5c4.7 2.4 10 3.7 15.5 3.7 6.8 0 13.5-2.1 19.2-6l299.9-142.2z"
                    />
                    <path
                      fill="#ff3855"
                      d="M381.1 156.2L62 14.1C56.3 10.2 49.6 8.1 42.8 8.1c-5.5 0-10.8 1.3-15.5 3.7L286 251.3l95.1-95.1z"
                    />
                    <path
                      fill="#ffe000"
                      d="M480 236.8l-79.6-45.2-114.4 69.7 114.4 69.7L480 275.2c13.3-7.5 21.5-21.5 21.5-36.8s-8.2-29.3-21.5-36.8z"
                    />
                  </svg>
                  <div>
                    <small>GET IT ON</small>
                    <strong>Google Play</strong>
                  </div>
                </a>
              </div>

              {/* STATS FOOTER */}
              <div className="tactlink-stats-footer">
                <div className="stat-item">
                  <Share2 size={13} />
                  <span>10,000+ Cards Shared</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <Globe size={13} />
                  <span>Available in 8 Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}