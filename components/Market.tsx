"use client";

import { Search, Store, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

const categories = [
  "Semua Kategori",
  "Kuliner",
  "Fashion",
  "Kerajinan",
  "Beauty",
  "Lifestyle",
];

// Foto produk berdasarkan kategori
const categoryPhotos: Record<string, string> = {
  Kuliner:
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=90",

  Fashion:
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=90",

  Kerajinan:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=90",

  Beauty:
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=90",

  Lifestyle:
    "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=90",
};

// Data tenant sementara
const tenants = Array.from({ length: 48 }, (_, i) => {
  const cats = ["Kuliner", "Fashion", "Kerajinan", "Beauty", "Lifestyle"];
  const cat = cats[i % cats.length];

  return {
    id: i + 1,
    name: cat,
    category: cat,
    image: categoryPhotos[cat],
  };
});

// Jumlah tenant yang ditampilkan pertama kali
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

  const displayedTenants = useMemo(() => {
    if (search || category !== "Semua Kategori" || showAll) {
      return filteredTenants;
    }

    return filteredTenants.slice(0, INITIAL_LIMIT);
  }, [filteredTenants, search, category, showAll]);

  const hasMore =
    filteredTenants.length > INITIAL_LIMIT &&
    !search &&
    category === "Semua Kategori";

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
          {displayedTenants.map((tenant) => (
            <article
              className="tenant-card-v2"
              key={tenant.id}
            >
              <div className="tenant-logo tenant-logo-ai">
                <img
                  src={tenant.image}
                  alt={`Produk kategori ${tenant.category}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                  }}
                />
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

              {showAll ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </div>
        )}

        <div className="market-bottom">
          <span>
            Menampilkan {displayedTenants.length} dari{" "}
            {filteredTenants.length} tenant
          </span>
        </div>
      </div>

      <div className="section-wave wave-white-to-soft" />
    </section>
  );
}
