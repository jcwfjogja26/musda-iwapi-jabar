"use client";

import Image from "next/image";
import { MessageCircle, Target, Users, UsersRound } from "lucide-react";

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

export default function About() {
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

        {/* KEPENGURUSAN HEADER (JARAK ATAS DIPERKETAT DI TSX) */}
        <div className="gallery-header" style={{ marginTop: "32px" }}>
          <div>
            <span className="section-kicker">KEPENGURUSAN</span>

            <h3>
              Pengurus <em>IWAPI</em> Jawa Barat.
            </h3>
          </div>

          <span className="gallery-count">DPD IWAPI JABAR</span>
        </div>

        {/* SINGLE FEATURED CARD KEPENGURUSAN (JARAK KE JUDUL DIPERDAPAT 12PX) */}
        <div className="kepengurusan-card-wrapper" style={{ marginTop: "12px" }}>
          <article className="kepengurusan-card">
            <div className="kepengurusan-image-container">
              <Image
                src="/image/foto1.png" // Ganti path foto kepengurusan kamu di public/image/
                alt="Kepengurusan DPD IWAPI Jawa Barat"
                width={1200}
                height={675}
                priority
                className="kepengurusan-img"
              />

              <div className="kepengurusan-overlay" />
            </div>

            <div className="kepengurusan-card-info">
              <div>
                <strong>Kepengurusan DPD IWAPI Jawa Barat</strong>
              </div>
              <p>
                Sinergi perempuan pengusaha dalam mendorong pertumbuhan ekonomi dan transformasi digital di Jawa Barat.
              </p>
            </div>
          </article>
        </div>

        {/* SMALL SECTION MARKER (JARAK BAWAH DIPERKETAT) */}
        <div className="about-bottom-mark" style={{ marginTop: "28px" }}>
          <span />
          <p>Perempuan pengusaha, satu ruang untuk bertumbuh bersama.</p>
          <span />
        </div>
      </div>

      <div className="section-wave wave-dark-to-white" />
    </section>
  );
}