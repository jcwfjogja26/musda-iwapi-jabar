"use client";

import { Search, Store } from "lucide-react";
import { useMemo, useState } from "react";

const categories = [
  "Semua Kategori",
  "Kuliner",
  "Fashion",
  "Kerajinan",
  "Beauty",
  "Lifestyle",
];

const tenants = [
  { name: "ABC", category: "Kuliner", initial: "A" },
  { name: "Batik Aruna", category: "Fashion", initial: "B" },
  { name: "Citra Craft", category: "Kerajinan", initial: "C" },
  { name: "Daya Beauty", category: "Beauty", initial: "D" },
  { name: "Eka Food", category: "Kuliner", initial: "E" },
  { name: "Femme Wear", category: "Fashion", initial: "F" },
  { name: "Griya Kriya", category: "Kerajinan", initial: "G" },
  { name: "Hana Beauty", category: "Beauty", initial: "H" },
  { name: "Indah Snack", category: "Kuliner", initial: "I" },
  { name: "Jaya Craft", category: "Kerajinan", initial: "J" },
  { name: "Karya Kita", category: "Fashion", initial: "K" },
  { name: "Laras Food", category: "Kuliner", initial: "L" },
  { name: "Mitra Usaha", category: "Lifestyle", initial: "M" },
  { name: "Nusa Batik", category: "Fashion", initial: "N" },
  { name: "Omah Craft", category: "Kerajinan", initial: "O" },
];

export default function Market() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua Kategori");

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      const matchesSearch = `${tenant.name} ${tenant.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Semua Kategori" ||
        tenant.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <section className="market-v2" id="market">
      <div className="market-orbit market-orbit-one" />
      <div className="market-orbit market-orbit-two" />

      <div className="section-container">

        <div className="market-topline">
          <span>03</span>
          <div />
          <span>MARKETPLACE</span>
        </div>

        <div className="market-heading">
          <div className="market-heading-main">
            <div className="market-section-mark">
              <Store size={21} strokeWidth={1.5} />
            </div>

            <div>
              <span className="section-kicker">
                MARKET & TENANT
              </span>

              <h2>
                Ruang untuk
                <br />
                <em>berkarya bersama.</em>
              </h2>
            </div>
          </div>

          <div className="market-heading-copy">
            <span className="market-heading-number">15+</span>

            <p>
              Temukan berbagai usaha, produk, dan brand perempuan
              yang hadir dalam exhibition area MUSDA IWAPI Jawa Barat.
            </p>
          </div>
        </div>

        <div className="market-explore">
          <div className="market-explore-label">
            <span>EXPLORE THE MARKET</span>

            <strong>
              {filteredTenants.length
                .toString()
                .padStart(2, "0")}{" "}
              TENANTS
            </strong>
          </div>

          <div className="market-controls">
            <div className="market-search">
              <Search size={17} strokeWidth={1.8} />

              <input
                type="text"
                placeholder="Cari nama tenant..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <label className="market-filter">
              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                aria-label="Filter kategori tenant"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="tenant-grid-v2">
          {filteredTenants.map((tenant, index) => (
            <article
              className="tenant-card-v2"
              key={tenant.name}
            >
              <div className="tenant-card-number">
                {(index + 1).toString().padStart(2, "0")}
              </div>

              <div className="tenant-logo">
                <span>{tenant.initial}</span>
              </div>

              <strong>{tenant.name}</strong>

              <span className="tenant-category">
                {tenant.category}
              </span>

              <div className="tenant-card-dot" />
            </article>
          ))}
        </div>

        {filteredTenants.length === 0 && (
          <div className="market-empty">
            <Store size={22} strokeWidth={1.5} />
            <span>Tenant tidak ditemukan.</span>
          </div>
        )}

        <div className="market-bottom">
          <span>
            EXHIBITION AREA · MUSDA IWAPI JAWA BARAT
          </span>

          <span>
            {filteredTenants.length} tenant tersedia
          </span>
        </div>

      </div>

      <div className="section-wave wave-white-to-soft" />
    </section>
  );
}