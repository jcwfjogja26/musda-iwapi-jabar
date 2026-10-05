import { ArrowRight, MapPin, Navigation } from "lucide-react";

export default function Location() {
  return (
    <section className="location-v2" id="lokasi">
      <div className="section-container">
        <div className="location-layout">
          <div className="location-copy">
            <span className="section-kicker">06 — LOCATION</span>

            <h2>
              Sampai jumpa
              <br />
              <em>di sini.</em>
            </h2>

            <div className="location-address">
              <div className="location-address-icon">
                <MapPin size={20} />
              </div>

              <div>
                <span>VENUE MUSDA</span>
                <strong>Jawa Barat</strong>
                <p>
                  Detail alamat dan venue resmi akan ditampilkan setelah
                  informasi lokasi dikonfirmasi.
                </p>
              </div>
            </div>

            <a href="#footer" className="location-link">
              Buka Google Maps
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="location-map">
            <div className="map-road map-road-one" />
            <div className="map-road map-road-two" />
            <div className="map-road map-road-three" />

            <div className="map-pin-v2">
              <MapPin size={23} />
            </div>

            <div className="map-label">
              <Navigation size={14} />
              <span>MUSDA IWAPI JAWA BARAT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}