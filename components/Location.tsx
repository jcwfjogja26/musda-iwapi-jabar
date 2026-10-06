import { ExternalLink, MapPin, Navigation, ShieldCheck } from "lucide-react";

export default function Location() {
  // Encoded URL Google Maps Grand Asrilia Hotel Bandung
  const gmapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Grand+Asrilia+Hotel+Bandung";
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.672589572459!2d107.625841!3d-6.929653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e815615d8629%3A0xb364101e4a1bb312!2sGrand%20Asrilia%20Hotel!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid";

  return (
    <section className="location-v2" id="lokasi">
      <div className="section-container">
        <div className="location-layout">
          {/* INFORMASI VENUE */}
          <div className="location-copy">
            <span className="section-kicker">06 — LOCATION</span>

            <h2>
              Sampai jumpa
              <br />
              <em>di lokasi acara.</em>
            </h2>

            <div className="location-address-card">
              <div className="location-address-header">
                <div className="location-address-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="location-badge">VENUE RESMI MUSDA</span>
                  <h3>Grand Asrilia Hotel</h3>
                </div>
              </div>

              <p className="location-full-address">
                Jl. Pelajar Pejuang 45 No.123, Turangga, Kec. Lengkong, Kota
                Bandung, Jawa Barat 40264
              </p>

              {/* HIGHLIGHT VENUE */}
              <div className="location-highlights">
                <div className="location-highlight-item">
                  <Navigation size={14} />
                  <span>Pusat Kota Bandung</span>
                </div>
                <div className="location-highlight-item">
                  <ShieldCheck size={14} />
                  <span>Akses Utama Mudah</span>
                </div>
              </div>

              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location-link-button"
              >
                <span>Buka Google Maps</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* CARD GOOGLE MAPS */}
          <div className="location-map-container">
            <div className="location-map-wrapper">
              <iframe
                title="Grand Asrilia Hotel Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="location-iframe"
              />

              {/* MAP OVERLAY BADGE */}
              <div className="map-floating-label">
                <Navigation size={14} className="navigation-icon" />
                <div>
                  <strong>Grand Asrilia Hotel</strong>
                  <span>Bandung, Jawa Barat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}