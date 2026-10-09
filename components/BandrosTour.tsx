"use client";

import { MapPin, Camera, Clock, Ticket, ArrowRight, Sparkles, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

export default function BandrosTour() {
  // Rute dibuat ringkas horizontal pills
  const routeNames = [
    { name: "Hotel Asrilia", isStart: true },
    { name: "Asia Afrika" },
    { name: "Alun-Alun" },
    { name: "Braga" },
    { name: "Riau" },
    { name: "Dago" },
    { name: "Wastukencana" },
    { name: "Perintis Kemerdekaan", isFinish: true },
  ];

  // Feed foto khusus untuk 30 Min Photo Stop
  const photoStops = [
    {
      id: 1,
      title: "Braga Street",
      image: "/image/braga1.png",
      tag: "Spot Foto 01",
    },
    {
      id: 2,
      title: "Asia Afrika",
      image: "/image/asia-afrika.png",
      tag: "Spot Foto 02",
    },
    {
      id: 3,
      title: "Gedung Merdeka",
      image: "/image/gedung-merdeka.png",
      tag: "Spot Foto 03",
    },
  ];

  const scheduleData = [
    {
      date: "17 November 2026",
      sessions: ["13.00 - 15.00 WIB", "15.00 - 17.00 WIB"],
    },
    {
      date: "19 November 2026",
      sessions: ["08.00 - 10.00 WIB", "10.00 - 12.00 WIB"],
    },
  ];

  // Data Contact Person Ibu Fitri & Ibu Avi
  const contacts = [
    {
      name: "Ibu Fitri",
      role: "Contact Person Bandros Tour",
      phone: "628123456789", // Ganti nomor WA Ibu Fitri
      message: "Halo%20Ibu%20Fitri,%20saya%20ingin%20tanya%20informasi%20pendaftaran%20Bandros%20Tour%20MUSDA%20IWAPI.",
    },
    {
      name: "Ibu Avi",
      role: "Contact Person Bandros Tour",
      phone: "628987654321", // Ganti nomor WA Ibu Avi
      message: "Halo%20Ibu%20Avi,%20saya%20ingin%20tanya%20informasi%20pendaftaran%20Bandros%20Tour%20MUSDA%20IWAPI.",
    },
  ];

  return (
    <section className="bandros-section" id="bandros-tour">
      <div className="section-container">
        {/* HEADER SECTION */}
        <div className="bandros-header">
          <span className="section-kicker">CITY TOUR MUSDA X</span>
          <h2>
            Tour on the <span className="text-highlight">Bandros</span>
          </h2>
          <p>
            Nikmati keindahan dan suasana khas Kota Bandung bersama jajaran
            peserta MUSDA X DPD IWAPI Jawa Barat.
          </p>
        </div>

        {/* MAIN CONTENT CARD */}
        <div className="bandros-card-grid">
          {/* SISI KANAN / PALING ATAS PADA MOBILE: POSTER BANDROS */}
          <div className="bandros-visual">
            <div className="visual-wrapper">
              <Image
                src="/image/bandrostour.png"
                alt="Tour on the Bandros Bandung"
                width={500}
                height={600}
                className="bandros-img"
                priority
              />
            </div>
          </div>

          {/* SISI KIRI: DETAIL RUTE & JADWAL */}
          <div className="bandros-info">
            {/* RUTE LINTASAN SIMPLE PILLS WITH ARROWS */}
            <div className="bandros-block">
              <div className="bandros-block-header">
                <div className="block-title-group">
                  <MapPin className="icon-blue" size={20} />
                  <h3>Tour Route</h3>
                </div>
              </div>

              <div className="route-pills-container">
                <div className="route-pills-scroll">
                  {routeNames.map((item, idx) => (
                    <div key={item.name} className="route-pill-item">
                      <div
                        className={`route-pill ${
                          item.isStart ? "is-start" : ""
                        } ${item.isFinish ? "is-finish" : ""}`}
                      >
                        <span className="pill-step">{idx + 1}</span>
                        <span className="pill-name">{item.name}</span>
                      </div>
                      {idx < routeNames.length - 1 && (
                        <ArrowRight className="pill-arrow" size={14} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PHOTO STOP FEED CAROUSEL */}
            <div className="bandros-block">
              <div className="bandros-block-header">
                <div className="block-title-group">
                  <Camera className="icon-blue" size={20} />
                  <h3>30 Min Photo Stop</h3>
                </div>
              </div>

              <div className="photo-feed-container">
                <div className="photo-feed-track">
                  {photoStops.map((stop) => (
                    <div key={stop.id} className="photo-feed-card">
                      <div className="photo-card-media">
                        <Image
                          src={stop.image}
                          alt={stop.title}
                          fill
                          sizes="220px"
                          className="photo-card-img"
                        />
                        <div className="photo-card-overlay" />
                      </div>
                      <span className="photo-card-tag">{stop.tag}</span>
                      <div className="photo-card-content">
                        <h4>{stop.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* HARGA & BENEFIT */}
            <div className="bandros-details-row">
              <div className="bandros-price-box">
                {/* LABEL ELEGAN DI ATAS */}
                <div className="price-badge-header">
                  <Sparkles size={13} />
                  <span>SPECIAL TOUR PASS</span>
                </div>

                {/* HARGA & BADGE TIKET */}
                <div className="price-tag">
                  <div className="ticket-icon-box">
                    <Ticket size={22} />
                  </div>
                  <div className="price-text-group">
                    <span className="price-amount">Rp 50.000</span>
                    <span className="price-unit">/ orang</span>
                  </div>
                </div>

                {/* INCLUDES BENEFIT */}
                <div className="price-includes">
                  <span className="include-badge">Includes: Snack syantik</span>
                </div>
              </div>

              <div className="bandros-schedules">
                {scheduleData.map((sched) => (
                  <div key={sched.date} className="schedule-card">
                    <div className="schedule-date">
                      <Clock size={14} />
                      <span>{sched.date}</span>
                    </div>
                    <div className="schedule-times">
                      {sched.sessions.map((time) => (
                        <span key={time} className="time-pill">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT PERSON BANDROS */}
            <div className="bandros-cp-wrapper">
              <span className="cp-kicker">CONTACT PERSON</span>
              <div className="cp-buttons-group">
                <a
                  href="https://wa.me/628123456789?text=Halo%20Ibu%20Fitri,%20saya%20ingin%20tanya%20informasi%20pendaftaran%20Bandros%20Tour%20MUSDA%20IWAPI."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-btn cp-btn-light"
                >
                  <span>Ibu Fitri</span>
                  <MessageCircle size={18} />
                </a>








                <a
                  href="https://wa.me/628987654321?text=Halo%20Ibu%20Avi,%20saya%20ingin%20tanya%20informasi%20pendaftaran%20Bandros%20Tour%20MUSDA%20IWAPI."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-btn cp-btn-primary"
                >
                  <span>Ibu Avi</span>
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}