import {
  CalendarDays,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";

const details = [
  {
    icon: CalendarDays,
    label: "TANGGAL",
    title: "18 November 2026",
    description: "Agenda utama Musda",
  },
  {
    icon: Clock3,
    label: "WAKTU",
    title: "Sesuai Agenda",
    description: "Mengikuti rundown resmi",
  },
  {
    icon: MapPin,
    label: "LOKASI",
    title: "Jawa Barat",
    description: "Venue diumumkan resmi",
  },
  {
    icon: UsersRound,
    label: "PESERTA",
    title: "Anggota IWAPI",
    description: "Peserta terdaftar",
  },
];

export default function EventDetails() {
  return (
    <section className="event-v2" id="acara">
      <div className="section-container">
        <div className="event-v2-heading">
          <div>
            <span className="section-kicker section-kicker-light">
              02 — DETAIL ACARA
            </span>

            <h2>
              Semua yang perlu
              <br />
              <em>Anda ketahui.</em>
            </h2>
          </div>

          <p>
            Catat tanggalnya dan nantikan informasi lengkap mengenai agenda
            Musda IWAPI Jawa Barat.
          </p>
        </div>

        <div className="event-detail-grid">
          {details.map((item) => {
            const Icon = item.icon;

            return (
              <article className="event-detail-card" key={item.label}>
                <div className="event-detail-main">
                  <div className="event-detail-icon">
                    <Icon size={17} strokeWidth={1.7} />
                  </div>

                  <div className="event-detail-copy">
                    <span>{item.label}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>

                <p>{item.description}</p>
              </article>
            );
          })}
        </div>

        <div className="event-period">
          <span>AGENDA UTAMA</span>

          <div>
            <strong>Pemilihan Ketua DPD IWAPI Jawa Barat</strong>
            <p>Periode kepengurusan 2027 — 2032</p>
          </div>
        </div>
      </div>

      <div className="section-wave wave-blue-to-white" />
    </section>
  );
}