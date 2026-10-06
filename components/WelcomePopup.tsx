"use client";

import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("musda-welcome-seen");

    if (!hasSeenPopup) {
      const timer = window.setTimeout(() => {
        setIsOpen(true);
      }, 450);

      return () => window.clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("musda-welcome-seen", "true");
    setIsOpen(false);
  };

  const handleRegister = () => {
    sessionStorage.setItem("musda-welcome-seen", "true");
    window.location.href = "/registrasi";
  };

  if (!isOpen) return null;

  return (
    <div className="welcome-popup-backdrop" role="dialog" aria-modal="true">
      <div className="welcome-popup">
        <button
          type="button"
          className="welcome-popup-close"
          onClick={closePopup}
          aria-label="Tutup"
        >
          <X size={17} strokeWidth={1.8} />
        </button>

        <div className="welcome-popup-glow welcome-popup-glow-one" />
        <div className="welcome-popup-glow welcome-popup-glow-two" />

        <div className="welcome-popup-content">
          <div className="welcome-popup-kicker">
            <span>MUSDA IWAPI</span>
            <span className="welcome-popup-dot" />
            <span>JAWA BARAT</span>
          </div>

          <div className="welcome-popup-main">
            <p className="welcome-popup-eyebrow">
              MUSYAWARAH DAERAH IWAPI
            </p>

            <h2>
              Memperkuat fondasi,
              <br />
              <em>melangkah bersama.</em>
            </h2>

            <p className="welcome-popup-description">
              Selamat datang di website resmi MUSDA IWAPI Jawa Barat.
              Temukan informasi acara, marketplace, partnership,
              dan lakukan pendaftaran Anda.
            </p>

            <div className="welcome-popup-date">
              <CalendarDays size={16} strokeWidth={1.7} />

              <div>
                <span>AGENDA UTAMA</span>
                <strong>18 November 2026</strong>
              </div>
            </div>

            <div className="welcome-popup-actions">
              <button
                type="button"
                className="welcome-popup-primary"
                onClick={handleRegister}
                >
                Daftar Sekarang
                </button>

              <button
                type="button"
                className="welcome-popup-secondary"
                onClick={closePopup}
              >
                Jelajahi Landing Page
              </button>
            </div>
          </div>
        </div>

        <div className="welcome-popup-footer">
          <span>MEMPERKUAT FONDASI TRANSFORMASI DIGITAL</span>
          <span>EKONOMI PEREMPUAN PENGUSAHA</span>
        </div>
      </div>
    </div>
  );
}