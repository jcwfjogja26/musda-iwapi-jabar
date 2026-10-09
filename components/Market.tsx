"use client";

import {
  Search,
  Store,
  Utensils,
  Shirt,
  Palette,
  Sparkles,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useMemo, useState } from "react";

const categories = [
  "Semua Kategori",
  "Kuliner",
  "Fashion",
  "Kerajinan",
  "Beauty",
  "Lifestyle",
];

const categoryIcons = {
  Kuliner: Utensils,
  Fashion: Shirt,
  Kerajinan: Palette,
  Beauty: Sparkles,
  Lifestyle: ShoppingBag,
};

// Simulasi Data Tenant (Misal ada 50+)
const tenants = Array.from({ length: 48 }, (_, i) => {
  const cats: (keyof typeof categoryIcons)[] = [
    "Kuliner",
    "Fashion",
    "Kerajinan",
    "Beauty",
    "Lifestyle",
  ];
  const cat = cats[i % cats.length];
  return {
    name: `Tenant ${String.fromCharCode(65 + (i % 26))}${i >= 26 ? Math.floor(i / 26) + 1 : ""}`,
    category: cat,
  };
});

// Jumlah tenant yang ditampilkan pertama kali di Landing Page
const INITIAL_LIMIT = 6;

export default function Market() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua Kategori");
  const [showAll, setShowAll] = useState(false);

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      const matchesSearch = `${tenant.name} ${tenant.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Semua Kategori" || tenant.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  // Jika sedang search/filter ATAU tombol diklik, tampilkan semua yang cocok
  const displayedTenants = useMemo(() => {
    if (search || category !== "Semua Kategori" || showAll) {
      return filteredTenants;
    }
    return filteredTenants.slice(0, INITIAL_LIMIT);
  }, [filteredTenants, search, category, showAll]);

  const hasMore = filteredTenants.length > INITIAL_LIMIT && !search && category === "Semua Kategori";

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
              <span className="section-kicker">MARKET & TENANT</span>

              <h2>
                Tempat usaha
                <br />
                <em>bertemu peluang.</em>
              </h2>
            </div>
          </div>

          <div className="market-heading-copy">
            <span className="market-heading-number">50+</span>

            <p>
              Temukan berbagai usaha, produk, dan brand perempuan yang hadir
              dalam exhibition area MUSDA IWAPI Jawa Barat.
            </p>
          </div>
        </div>

        <div className="market-explore">
          <div className="market-explore-label">
            <span>EXPLORE THE MARKET</span>

            <strong>
              {filteredTenants.length.toString().padStart(2, "0")} TENANTS
            </strong>
          </div>

          <div className="market-controls">
            <div className="market-search">
              <Search size={17} strokeWidth={1.8} />

              <input
                type="text"
                placeholder="Cari tenant..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <label className="market-filter">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
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
          {displayedTenants.map((tenant, index) => {
            const Icon =
              categoryIcons[tenant.category as keyof typeof categoryIcons];

            return (
              <article className="tenant-card-v2" key={tenant.name}>
                <div className="tenant-card-number">
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                <div className="tenant-logo tenant-logo-ai">
                  <Icon size={25} strokeWidth={1.6} />
                </div>

                <strong>{tenant.name}</strong>

                <span className="tenant-category">{tenant.category}</span>

                <div className="tenant-card-dot" />
              </article>
            );
          })}
        </div>

        {filteredTenants.length === 0 && (
          <div className="market-empty">
            <Store size={22} strokeWidth={1.5} />
            <span>Tenant tidak ditemukan.</span>
          </div>
        )}

        {/* TOMBOL LIHAT SEMUA TENANT / SEMBUNYIKAN */}
        {hasMore && (
          <div className="market-action">
            <button
              type="button"
              className="market-see-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              <span>
                {showAll
                  ? "Tampilkan Lebih Sedikit"
                  : `Lihat Semua Tenant (${filteredTenants.length})`}
              </span>
              {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}

        <div className="market-bottom">
          

          <span>
            Menampilkan {displayedTenants.length} dari {filteredTenants.length} tenant
          </span>
        </div>
      </div>

      <div className="section-wave wave-white-to-soft" />
    </section>
  );
}