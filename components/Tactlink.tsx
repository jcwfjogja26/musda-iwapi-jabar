import {
  ArrowRight,
  CheckCircle2,
  Download,
  QrCode,
  Smartphone,
} from "lucide-react";

const points = [
  "Digital participant access",
  "QR check-in saat acara",
  "Reservasi lebih terintegrasi",
];

export default function TactLink() {
  return (
    <section className="tactlink-v2" id="tactlink">
      <div className="tactlink-glow-v2" />

      <div className="section-container">
        <div className="tactlink-layout">
          <div className="tactlink-device-wrap">
            <div className="tactlink-device">
              <div className="device-top">
                <span>TACTLINK</span>
                <span>9:41</span>
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
                <span>CHECK-IN</span>
                <strong>Ready</strong>
              </div>
            </div>
          </div>

          <div className="tactlink-copy-v2">
            <span className="section-kicker section-kicker-light">
              07 — POWERED BY TACTLINK
            </span>

            <h2>
              Satu akses.
              <br />
              <em>Lebih digital.</em>
            </h2>

            <p>
              Setelah melakukan registrasi, peserta akan diarahkan untuk
              menggunakan TactLink sebagai bagian dari pengalaman digital
              Musda.
            </p>

            <div className="tactlink-points-v2">
              {points.map((point) => (
                <div key={point}>
                  <CheckCircle2 size={17} />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <a href="#footer" className="tactlink-button">
              <Download size={17} />
              Download TactLink
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}