"use client";

import {
  Building2,
  Handshake,
  Megaphone,
  MessageCircle,
  Store,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Interface tipe data poin
interface PointItem {
  text: string;
  image?: string;
  subImageTitle?: string;
  subImage?: string;
}

interface PartnershipItem {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: any;
  points: PointItem[];
}

const partnershipItems: PartnershipItem[] = [
  {
    number: "01",
    label: "BRAND SUPPORT & PROPOSAL",
    title: "Partisipasi Sponsorship",
    description:
      "Dukungan penempatan logo dan eksposur profil pengurus pada materi publikasi resmi Musda IWAPI Jawa Barat.",
    icon: Building2,
    points: [
      {
        text: "Logo Perusahaan tayang di ½ Slide Infocus & tertera di Proposal (Rp 350.000,- untuk Internal + Umum)",
        image: "/image/sponsorlogo.png",
      },
      {
        text: "Nama, Foto, dan Jabatan di IWAPI tertera di Baligo (Rp 1.000.000,- sudah termasuk fee Musda, tersebar di 30 Baligo se-Jawa Barat)",
        image: "/image/sponsorbaligo.png",
        subImageTitle: "Contoh penempatan & suasana lokasi baligo:",
        subImage: "/image/sponsor-banner.png",
      },
    ],
  },
  {
    number: "02",
    label: "BRAND EXPOSURE",
    title: "Media & Exposure",
    description:
      "Perluas jangkauan brand melalui berbagai kanal komunikasi, publikasi digital, dan media cetak MUSDA.",
    icon: Megaphone,
    points: [
      {
        text: "Publikasi dan eksposur brand pada kanal komunikasi resmi acara",
      },
      {
        text: "Penempatan logo identitas brand pada media cetak & digital terpilih",
      },
      {
        text: "Peluang menjangkau ribuan audiens perempuan pengusaha se-Jawa Barat",
      },
    ],
  },
  {
    number: "03",
    label: "EXHIBITION & BOOTH",
    title: "Tenant & Booth",
    description:
      "Hadir langsung di exhibition area dan perkenalkan produk atau layanan secara interaktif kepada peserta.",
    icon: Store,
    points: [
      {
        text: "Kesempatan membuka booth promosi selama rangkaian acara berlangsung",
      },
      {
        text: "Memperkenalkan produk dan layanan secara langsung kepada pengunjung",
      },
      {
        text: "Berinteraksi & bertransaksi langsung dengan para pelaku usaha",
      },
    ],
  },
  {
    number: "04",
    label: "NETWORKING STRATEGIS",
    title: "Collaboration",
    description:
      "Buka peluang kolaborasi dan koneksi baru bersama ekosistem jaringan perempuan pengusaha IWAPI.",
    icon: Handshake,
    points: [
      {
        text: "Sesi networking eksklusif dengan anggota & jajaran pengurus IWAPI",
      },
      {
        text: "Peluang kolaborasi B2B antar pelaku usaha antar daerah",
      },
      {
        text: "Membangun relasi bisnis jangka panjang dalam ekosistem IWAPI",
      },
    ],
  },
];

export default function Partnership() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  return (
    <section className="partnership-v2" id="partnership">
      <div className="section-container">
        {/* TOPLINE */}
        <div className="partnership-topline">
          <span>04</span>
          <div />
          <span>PARTNERSHIP</span>
        </div>

        {/* INTRO HEADER */}
        <div className="partnership-top">
          <div className="partnership-title">
            <span className="section-kicker section-kicker-light">
              BERKOLABORASI BERSAMA
            </span>

            <h2>
              Tumbuh bersama
              <br />
              <em>Lewat kolaborasi.</em>
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
              <span>TERBUKA UNTUK BERBAGAI BENTUK KOLABORASI</span>
            </div>
          </div>
        </div>

        {/* LIST CARD HORIZONTAL */}
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
                  onClick={() => setOpenCard(isOpen ? null : index)}
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

                <div className="partnership-card-detail" aria-hidden={!isOpen}>
                  <div className="partnership-detail-inner">
                    {/* POIN-POIN SPONSORSHIP */}
                    {item.points.map((point, ptIdx) => (
                      <div
                        className="partnership-detail-point"
                        key={ptIdx}
                      >
                        <span />
                        <div className="partnership-detail-content">
                          <p>{point.text}</p>

                          {/* FOTO UTAMA UNTUK POIN */}
                          {point.image && (
                            <div className="partnership-point-image">
                              <Image
                                src={point.image}
                                alt={`Contoh ${point.text}`}
                                width={480}
                                height={320}
                              />
                            </div>
                          )}

                          {/* SUB FOTO TAMBAHAN (CONTOH PENEMPATAN BALIGO) */}
                          {point.subImage && (
                            <div>
                              {point.subImageTitle && (
                                <span className="partnership-subimage-label">
                                  {point.subImageTitle}
                                </span>
                              )}
                              <div className="partnership-point-image">
                                <Image
                                  src={point.subImage}
                                  alt="Contoh penempatan baligo"
                                  width={550}
                                  height={300}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CONTACT PERSON BOX */}
        <div className="partnership-contact-box">
          <div className="partnership-contact-left">
            <div className="partnership-contact-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="partnership-contact-copy">
              <span>HUBUNGI KAMI</span>
              <strong>Tertarik Menjadi Mitra?</strong>
              <p>
                Diskusikan potensi kerja sama dan kolaborasi strategis bersama
                tim kami.
              </p>
            </div>
          </div>

          <div className="partnership-cp-wrapper">
            <span className="partnership-cp-label">CONTACT PERSON</span>
            <div className="partnership-cp-buttons">
              <a
                href="https://wa.me/6282126169071"
                target="_blank"
                rel="noopener noreferrer"
                className="partnership-cp-button"
              >
                <span>Ibu Fitri</span>
                <div className="cp-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
              </a>

              <a
                href="https://wa.me/6281221700050"
                target="_blank"
                rel="noopener noreferrer"
                className="partnership-cp-button"
              >
                <span>Ibu Avi</span>
                <div className="cp-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-wave wave-blue-to-light" />
    </section>
  );
}