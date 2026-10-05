"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Tentang", href: "#tentang" },
  { label: "Acara", href: "#acara" },
  { label: "Market", href: "#market" },
  { label: "Partnership", href: "#partnership" },
  { label: "Lokasi", href: "#lokasi" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <a href="#" className="navbar-brand">
            <span className="navbar-logo">I</span>

            <span className="navbar-brand-text">
              <strong>IWAPI</strong>
              <small>JAWA BARAT</small>
            </span>
          </a>

          <nav className="navbar-links">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <a href="/registrasi" className="navbar-cta">
            <span>Daftar Sekarang</span>
            <ArrowRight size={16} />
          </a>

          <button
            className="navbar-menu-button"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-panel">
            <div className="mobile-menu-header">
              <a
                href="#"
                className="navbar-brand"
                onClick={() => setOpen(false)}
              >
                <span className="navbar-logo">I</span>

                <span className="navbar-brand-text">
                  <strong>IWAPI</strong>
                  <small>JAWA BARAT</small>
                </span>
              </a>

              <button
                className="mobile-menu-close"
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-menu-list">
              {navItems.map((item, index) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  <span>0{index + 1}</span>
                  <strong>{item.label}</strong>
                  <ArrowRight size={17} />
                </a>
              ))}
            </div>

            <a
              href="/registrasi"
              className="mobile-register-button"
              onClick={() => setOpen(false)}
            >
              Daftar Sekarang
              <ArrowRight size={17} />
            </a>

            <div className="mobile-menu-footer">
              <span>MUSDA IWAPI JAWA BARAT</span>
              <span>2027 — 2032</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}