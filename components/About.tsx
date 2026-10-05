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
  },
  {
    title: "Kegiatan Organisasi",
    label: "ACTIVITY",
    className: "gallery-two",
  },
  {
    title: "Women in Business",
    label: "COMMUNITY",
    className: "gallery-three",
  },
  {
    title: "Kolaborasi",
    label: "NETWORK",
    className: "gallery-four",
  },
  {
    title: "Jabar Bergerak",
    label: "IMPACT",
    className: "gallery-five",
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

        {/* GALLERY */}
        <div className="gallery-header">
          <div>
            <span className="section-kicker">MOMENTS</span>

            <h3>
              Jejak <em>perjalanan</em> IWAPI.
            </h3>
          </div>

          <span className="gallery-count">05 — MOMENTS</span>
        </div>

        <div className="about-gallery">
          {gallery.map((item, index) => (
            <article
              className={`gallery-card ${item.className}`}
              key={item.title}
            >
              <div className={`gallery-image gallery-image-${index + 1}`}>
                <div className="gallery-image-overlay" />

                <span className="gallery-number">
                  0{index + 1}
                </span>

                <span className="gallery-hover-label">
                  {item.label}
                </span>
              </div>

              <div className="gallery-card-info">
                <span>{item.label}</span>
                <strong>{item.title}</strong>
              </div>
            </article>
          ))}
        </div>

        {/* SMALL SECTION MARKER */}
        <div className="about-bottom-mark">
          <span />
          <p>
            Perempuan pengusaha, satu ruang untuk bertumbuh bersama.
          </p>
          <span />
        </div>
      </div>

      <div className="section-wave wave-white-to-blue" />
    </section>
  );
}