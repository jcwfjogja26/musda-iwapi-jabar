"use client";

import { useState } from "react";
import Image from "next/image";
import { BedDouble, Check, MessageCircle, Phone, Users, ZoomIn, X } from "lucide-react";

// Data Kamar dengan Properti `image`
const hotels = [
  {
    name: "Hotel Asrilia Bandung",
    type: "Deluxe Twin",
    price: "Rp 500.000",
    note: "/ malam",
    pax: "2 Pax (1 Malam 2 Hari)",
    image: "/image/twin.png", // Ganti path gambar kamar kamu
  },
  {
    name: "Hotel Asrilia Bandung",
    type: "Deluxe Hollywood",
    price: "Rp 550.000",
    note: "/ malam",
    pax: "2 Pax (1 Malam 2 Hari)",
    image: "/image/hollywood.png", // Ganti path gambar kamar kamu
  },
  {
    name: "Hotel Asrilia Bandung",
    type: "Deluxe King",
    price: "Rp 650.000",
    note: "/ malam",
    pax: "2 Pax (1 Malam 2 Hari)",
    image: "/image/king.png", // Ganti path gambar kamar kamu
  },
];

export default function Hotel() {
  // State untuk menyimpan data kamar yang gambarnya sedang di-preview
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

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

        {/* GALLERY ATAS */}
        <div className="hotel-gallery">
          <div className="hotel-image hotel-image-main">
            <Image
              src="/image/hotelasrilia.png"
              alt="Hotel Asrilia Bandung"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div className="hotel-image-gradient" />
            <div className="hotel-image-caption">
              <span>01</span>
              <strong>Hotel Asrilia Bandung</strong>
            </div>
          </div>

          <div className="hotel-image hotel-image-second">
            <Image
              src="/image/room.png"
              alt="Kamar Hotel Asrilia"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
            <div className="hotel-image-gradient" />
            <span>ROOM</span>
          </div>

          <div className="hotel-image hotel-image-third">
            <Image
              src="/image/lounge.png"
              alt="Lounge Hotel Asrilia"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
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
                {/* THUMBNAIL GAMBAR KAMAR BISA DIKLIK */}
                <div
                  className="hotel-card-image-wrapper"
                  onClick={() =>
                    setSelectedImage({ url: hotel.image, title: `${hotel.name} — ${hotel.type}` })
                  }
                  title="Klik untuk melihat foto lebih jelas"
                >
                  <Image
                    src={hotel.image}
                    alt={hotel.type}
                    width={400}
                    height={220}
                    className="hotel-card-image"
                  />
                  <div className="hotel-card-image-overlay">
                    <ZoomIn size={22} />
                    <span>Perbesar Foto</span>
                  </div>
                </div>

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

          {/* CONTACT CARD */}
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
              Hubungi Ibu Rika
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL PREVIEW GAMBAR */}
      {selectedImage && (
        <div
          className="hotel-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="hotel-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="hotel-modal-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
            <div className="hotel-modal-image-wrapper">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                width={1000}
                height={650}
                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              />
            </div>
            <p className="hotel-modal-title">{selectedImage.title}</p>
          </div>
        </div>
      )}

      <div className="section-wave wave-blue-to-light" />
    </section>
  );
}