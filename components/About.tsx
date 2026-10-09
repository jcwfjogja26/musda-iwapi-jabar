"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MessageCircle, Target, UsersRound } from "lucide-react";

const functions = [
  {
    number: "01",
    icon: UsersRound,
    title: "Forum Komunikasi",
    description: "Memperkuat komunikasi dan silaturahmi DPD–DPC IWAPI Jawa Barat.",
  },
  {
    number: "02",
    icon: Target,
    title: "Evaluasi & Arah",
    description: "Mengevaluasi program dan menyusun arah organisasi untuk lima tahun ke depan.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Pemilihan Pengurus",
    description: "Menentukan kepemimpinan dan kepengurusan baru secara konstitusional.",
  },
];

const gallery = [
  {
    title: "Musda IWAPI",
    label: "MOMENT",
    className: "gallery-one",
    image: "/image/g1.png", // Ganti path foto kamu di public/image/
  },
  {
    title: "Kegiatan Organisasi",
    label: "ACTIVITY",
    className: "gallery-two",
    image: "/image/g2.png", // Ganti path foto kamu di public/image/
  },
  {
    title: "Women in Business",
    label: "COMMUNITY",
    className: "gallery-three",
    image: "/image/g3.png", // Ganti path foto kamu di public/image/
  },
  {
    title: "Kolaborasi",
    label: "NETWORK",
    className: "gallery-four",
    image: "/image/g4.png", // Ganti path foto kamu di public/image/
  },
  {
    title: "Jabar Bergerak",
    label: "IMPACT",
    className: "gallery-five",
    image: "/image/g5.png", // Ganti path foto kamu di public/image/
  },
];

export default function About() {
  // State untuk melacak indeks foto yang sedang aktif saat digeser di mobile
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Handler untuk mendeteksi posisi scroll horizontal dan memindahkan dot aktif
  const handleScroll = () => {
    if (galleryRef.current) {
      const { scrollLeft, clientWidth } = galleryRef.current;
      if (clientWidth > 0) {
        const newIndex = Math.round(scrollLeft / clientWidth);
        setActiveIndex(newIndex);
      }
    }
  };

  // Handler saat dot diklik langsung untuk scroll ke foto tujuan
  const scrollToSlide = (index: number) => {
    if (galleryRef.current) {
      const clientWidth = galleryRef.current.clientWidth;
      galleryRef.current.scrollTo({
        left: index * clientWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="about-v2" id="tentang">
      <div className="section-container">
        {/* INTRO */}
        <div className="section-intro">
          <div className="section-kicker">01 — TENTANG MUSDA IWAPI</div>

          <div className="section-intro-grid">
            <h2>
              Forum untuk
              <br />
              <em>menentukan arah.</em>
            </h2>

            <div>
              <p className="intro-lead">
                MUSDA IWAPI merupakan forum resmi organisasi di tingkat
                provinsi yang mempertemukan pengurus dan anggota IWAPI Jawa
                Barat.
              </p>

              <p>
                Di sini, organisasi mengevaluasi perjalanan sebelumnya,
                menyusun arah lima tahun ke depan, dan memilih kepengurusan
                baru.
              </p>
            </div>
          </div>
        </div>

        {/* FUNCTIONS */}
        <div className="about-functions">
          {functions.map((item) => {
            const Icon = item.icon;

            return (
              <article className="function-card" key={item.number}>
                <div className="function-card-top">
                  <span>{item.number}</span>

                  <div className="function-icon">
                    <Icon size={18} strokeWidth={1.7} />
                  </div>
                </div>

                <div className="function-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="function-card-line" />
              </article>
            );
          })}
        </div>

        {/* ABOUT IWAPI */}
        <div className="iwapi-note">
          <div className="iwapi-note-label">
            <span>ABOUT IWAPI</span>
          </div>

          <div className="iwapi-note-content">
            <p>
              Wadah independen dan nirlaba bagi perempuan pengusaha untuk
              berkembang, berjejaring, dan memperkuat kemandirian ekonomi.
            </p>

            <div className="iwapi-note-tags">
              <span>INDEPENDEN</span>
              <span>NON-POLITIK</span>
              <span>NIRLABA</span>
            </div>
          </div>
        </div>

        {/* GALLERY HEADER */}
        <div className="gallery-header">
          <div>
            <span className="section-kicker">MOMENTS</span>

            <h3>
              Jejak <em>perjalanan</em> IWAPI.
            </h3>
          </div>

          <span className="gallery-count">05 — MOMENTS</span>
        </div>

        {/* CONTAINER GALLERY DENGAN DETEKSI SCROLL */}
        <div
          className="about-gallery"
          ref={galleryRef}
          onScroll={handleScroll}
        >
          {gallery.map((item, index) => (
            <article
              className={`gallery-card ${item.className}`}
              key={item.title}
            >
              <div className={`gallery-image gallery-image-${index + 1}`}>
                {/* KOMPONEN GAMBAR NEXT.JS */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />

                <div className="gallery-image-overlay" />

                <span className="gallery-number">0{index + 1}</span>

                <span className="gallery-hover-label">{item.label}</span>
              </div>

              <div className="gallery-card-info">
                <span>{item.label}</span>
                <strong>{item.title}</strong>
              </div>
            </article>
          ))}
        </div>

        {/* INDIKATOR DOTS INTERAKTIF MOBILE */}
        <div className="gallery-dots">
          {gallery.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              className={`gallery-dot ${idx === activeIndex ? "active" : ""}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* SMALL SECTION MARKER */}
        <div className="about-bottom-mark">
          <span />
          <p>Perempuan pengusaha, satu ruang untuk bertumbuh bersama.</p>
          <span />
        </div>
      </div>

      <div className="section-wave wave-dark-to-white" />
    </section>
  );
}