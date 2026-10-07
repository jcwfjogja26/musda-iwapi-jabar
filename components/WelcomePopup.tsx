"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, X } from "lucide-react";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Sembunyikan popup jika user berada di halaman /registrasi atau /explore
  if (pathname === "/registrasi" || pathname === "/explore") {
    return null;
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 450);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleRegister = () => {
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
          <X size={16} strokeWidth={1.8} />
        </button>

        <div className="welcome-popup-content">
          <div className="welcome-popup-main">
            <h2>
              MUSDA X
              <br />
              <span>JAWA BARAT</span>
              <p>DPD IWAPI 2026</p>
            </h2>

            <div className="welcome-popup-date">
              <CalendarDays size={15} strokeWidth={1.8} />
              <span>18 November 2026</span>
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
                Lanjut ke Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}