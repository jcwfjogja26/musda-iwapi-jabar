import { ArrowRight, BedDouble, Check, Phone } from "lucide-react";

const hotels = [
  {
    name: "Partner Hotel",
    type: "Superior Room",
    price: "Rp 850.000",
    note: "/ malam",
  },
  {
    name: "Partner Hotel",
    type: "Deluxe Room",
    price: "Rp 1.050.000",
    note: "/ malam",
  },
];

export default function Hotel() {
  return (
    <section className="hotel-v2" id="hotel">
      <div className="section-container">
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
            Pilihan akomodasi untuk peserta yang membutuhkan tempat menginap
            selama rangkaian Musda berlangsung.
          </p>
        </div>

        <div className="hotel-gallery">
          <div className="hotel-image hotel-image-main">
            <div className="hotel-image-gradient" />
            <div className="hotel-image-caption">
              <span>01</span>
              <strong>Hotel Partner</strong>
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

        <div className="hotel-bottom">
          <div className="hotel-pricing">
            {hotels.map((hotel) => (
              <article className="hotel-price-card" key={hotel.type}>
                <div className="hotel-price-icon">
                  <BedDouble size={18} />
                </div>

                <span>{hotel.name}</span>

                <strong>{hotel.type}</strong>

                <div className="hotel-price">
                  <b>{hotel.price}</b>
                  <small>{hotel.note}</small>
                </div>

                <ul>
                  <li>
                    <Check size={14} />
                    Detail fasilitas
                  </li>
                  <li>
                    <Check size={14} />
                    Informasi booking
                  </li>
                </ul>
              </article>
            ))}
          </div>

          <div className="hotel-contact-card">
            <div>
              <Phone size={20} />
              <span>BUTUH BANTUAN?</span>
            </div>

            <h3>Ingin booking atau tahu detail hotel?</h3>

            <p>
              Hubungi tim kami untuk mendapatkan informasi kamar, harga, dan
              ketersediaan.
            </p>

            <a href="#footer" className="button-primary">
              Hubungi Tim
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="section-wave wave-blue-to-light" />
    </section>
  );
}