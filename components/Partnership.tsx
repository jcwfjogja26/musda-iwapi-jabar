"use client";

import {
  Building2,
  Handshake,
  Megaphone,
  Store,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

const partnershipItems = [
  {
    number: "01",
    label: "BRAND SUPPORT",
    title: "Sponsorship",
    description:
      "Bangun kehadiran brand melalui dukungan terhadap penyelenggaraan MUSDA IWAPI Jawa Barat.",
    icon: Building2,
    points: [
      "Brand visibility selama rangkaian acara",
      "Eksposur melalui materi komunikasi acara",
      "Peluang membangun relasi dengan komunitas IWAPI",
    ],
  },
  {
    number: "02",
    label: "BRAND EXPOSURE",
    title: "Media & Exposure",
    description:
      "Perluas jangkauan brand melalui berbagai kanal komunikasi dan publikasi MUSDA.",
    icon: Megaphone,
    points: [
      "Publikasi dan eksposur brand",
      "Penempatan identitas brand pada media terpilih",
      "Peluang menjangkau audiens perempuan pengusaha",
    ],
  },
  {
    number: "03",
    label: "EXHIBITION",
    title: "Tenant",
    description:
      "Hadir langsung di exhibition area dan perkenalkan produk atau layanan kepada peserta.",
    icon: Store,
    points: [
      "Kesempatan membuka booth selama acara",
      "Memperkenalkan produk dan layanan secara langsung",
      "Berinteraksi dengan peserta dan pelaku usaha",
    ],
  },
  {
    number: "04",
    label: "NETWORKING",
    title: "Collaboration",
    description:
      "Buka peluang kolaborasi dan koneksi baru bersama ekosistem perempuan pengusaha.",
    icon: Handshake,
    points: [
      "Networking dengan anggota IWAPI",
      "Peluang kolaborasi antar pelaku usaha",
      "Membangun relasi bisnis jangka panjang",
    ],
  },
];

export default function Partnership() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  return (
    <section className="partnership-v2" id="partnership">
      <div className="section-container">
        <div className="partnership-topline">
          <span>04</span>
          <div />
          <span>PARTNERSHIP</span>
        </div>

        <div className="partnership-top">
          <div className="partnership-title">
            <span className="section-kicker section-kicker-light">
              BERKOLABORASI BERSAMA
            </span>

            <h2>
              Jadilah bagian
              <br />
              <em>dari perjalanan.</em>
            </h2>
          </div>

          <div className="partnership-intro">
            <p>
              MUSDA IWAPI Jawa Barat membuka ruang bagi brand, pelaku usaha,
              media, dan mitra strategis untuk hadir, berkolaborasi, dan
              bertumbuh bersama.
            </p>

            <div className="partnership-contact">
              <UsersRound size={15} strokeWidth={1.7} />
              <span>
                TERBUKA UNTUK BERBAGAI BENTUK KOLABORASI
              </span>
            </div>
          </div>
        </div>

        <div className="partnership-list">
          {partnershipItems.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openCard === index;

            return (
              <article
                className={`partnership-card-horizontal ${
                  isOpen ? "is-open" : ""
                }`}
                key={item.number}
              >
                <button
                  type="button"
                  className="partnership-card-trigger"
                  onClick={() =>
                    setOpenCard(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="partnership-card-number">
                    {item.number}
                  </span>

                  <div className="partnership-card-icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>

                  <div className="partnership-card-content">
                    <span className="partnership-card-label">
                      {item.label}
                    </span>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>
                  </div>

                  <span className="partnership-card-action">
                    {isOpen ? "TUTUP" : "LIHAT POIN"}
                  </span>
                </button>

                <div
                  className="partnership-card-detail"
                  aria-hidden={!isOpen}
                >
                  <div className="partnership-detail-inner">
                    {item.points.map((point) => (
                      <div
                        className="partnership-detail-point"
                        key={point}
                      >
                        <span />
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="partnership-contact-box">
          <div className="partnership-contact-icon">
            <UsersRound size={21} strokeWidth={1.6} />
          </div>

          <div className="partnership-contact-copy">
            <span>LET&apos;S WORK TOGETHER</span>

            <strong>Punya ide kolaborasi dengan MUSDA?</strong>

            <p>
              Sampaikan kebutuhan dan bentuk kolaborasi yang Anda
              inginkan kepada tim penyelenggara.
            </p>
          </div>

          <a
            href="#partnership"
            className="partnership-contact-button"
          >
            Hubungi Kami
          </a>
        </div>
      </div>

      <div className="section-wave wave-blue-to-light" />
    </section>
  );
}