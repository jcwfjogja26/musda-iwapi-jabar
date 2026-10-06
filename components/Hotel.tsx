import { BedDouble, Check, MessageCircle, Phone, Users } from "lucide-react";

// Data Kamar Asli dari Hotel Asrilia Bandung
const hotels = [
  {
    name: "Hotel Asrilia Bandung",
    type: "Deluxe Twin",
    price: "Rp 500.000",
    note: "/ malam",
    pax: "2 Pax (1 Malam 2 Hari)",
  },
  {
    name: "Hotel Asrilia Bandung",
    type: "Deluxe Hollywood",
    price: "Rp 550.000",
    note: "/ malam",
    pax: "2 Pax (1 Malam 2 Hari)",
  },
  {
    name: "Hotel Asrilia Bandung",
    type: "Deluxe King",
    price: "Rp 650.000",
    note: "/ malam",
    pax: "2 Pax (1 Malam 2 Hari)",
  },
];

export default function Hotel() {
  return (
    <section className="hotel-v2" id="hotel">
      <div className="section-container">
        {/* HEADER SECTION */}
        <div className="hotel-heading">
          <div>
            <span className="section-kicker">05 — ACCOMMODATION</span>

            <h2>
              Stay close,
              <br />
              <em>connect more.</em>
            </h2>
          </div>

          <p>
            Rekomendasi akomodasi resmi di Hotel Asrilia Bandung khusus untuk
            peserta dan tamu undangan Musda IWAPI Jawa Barat.
          </p>
        </div>

        {/* GALLERY (TETAP SAMA TANPA DIUBAH) */}
        <div className="hotel-gallery">
          <div className="hotel-image hotel-image-main">
            <div className="hotel-image-gradient" />
            <div className="hotel-image-caption">
              <span>01</span>
              <strong>Hotel Asrilia Bandung</strong>
            </div>
          </div>

          <div className="hotel-image hotel-image-second">
            <div className="hotel-image-gradient" />
            <span>ROOM</span>
          </div>

          <div className="hotel-image hotel-image-third">
            <div className="hotel-image-gradient" />
            <span>LOUNGE</span>
          </div>
        </div>

        {/* PRICING & CONTACT CONTAINER */}
        <div className="hotel-bottom">
          {/* GRID 3 KARTU KAMAR HOTEL */}
          <div className="hotel-pricing">
            {hotels.map((hotel) => (
              <article className="hotel-price-card" key={hotel.type}>
                <div className="hotel-price-card-header">
                  <div className="hotel-price-icon">
                    <BedDouble size={18} />
                  </div>
                  <span className="hotel-badge-pax">
                    <Users size={12} />
                    2 Pax
                  </span>
                </div>

                <span className="hotel-partner-name">{hotel.name}</span>

                <h3>{hotel.type}</h3>

                <div className="hotel-price">
                  <b>{hotel.price}</b>
                  <small>{hotel.note}</small>
                </div>

                <ul className="hotel-features">
                  <li>
                    <Check size={14} />
                    Kapasitas 1 Malam 2 Hari
                  </li>
                  <li>
                    <Check size={14} />
                    Akses Acara & Fasilitas Hotel
                  </li>
                </ul>
              </article>
            ))}
          </div>

          {/* CONTACT CARD REVISED */}
          <div className="hotel-contact-card">
            <div className="hotel-contact-header">
              <div className="hotel-contact-icon-wrapper">
                <Phone size={18} />
              </div>
              <span className="hotel-contact-label">BUTUH BANTUAN BOOKING?</span>
            </div>

            <h3>Ingin reservasi atau butuh informasi kamar?</h3>

            <p>
              Hubungi Contact Person <strong>Ibu Rika</strong> untuk
              mendapatkan konfirmasi ketersediaan dan pemesanan kamar.
            </p>

            <a
              href="https://wa.me/62811245222?text=Halo%20Ibu%20Rika,%20saya%20ingin%20tanya%20informasi%20booking%20kamar%20Hotel%20Asrilia%20untuk%20Musda%20IWAPI."
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Hubungi Tim
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="section-wave wave-blue-to-light" />
    </section>
  );
}