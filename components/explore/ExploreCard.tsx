'use client';

import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  Hotel,
  Megaphone,
  Store,
} from 'lucide-react';

interface ExploreCardProps {
  number: string;
  category: string;
  title: string;
  description: string;
  type: 'sponsor' | 'billboard' | 'hotel' | 'tenant';
  isOpen: boolean;
  onToggle: () => void;
}

const icons = {
  sponsor: Building2,
  billboard: Megaphone,
  hotel: Hotel,
  tenant: Store,
};

const detailContent = {
  sponsor: {
    title: 'Peluang Sponsor & Partnership',
    description:
      'MUSDA IWAPI Jawa Barat membuka ruang kolaborasi bagi perusahaan, brand, dan partner yang ingin membangun engagement bersama komunitas pengusaha perempuan di Jawa Barat.',
    points: [
      'Brand exposure selama rangkaian MUSDA',
      'Peluang membangun relasi dengan jaringan IWAPI',
      'Kolaborasi dan aktivasi brand',
      'Pilihan bentuk partnership yang dapat disesuaikan',
    ],
  },

  billboard: {
    title: 'Billboard & Media Exposure',
    description:
      'Manfaatkan ruang komunikasi dan media exposure yang tersedia untuk memperkenalkan brand, produk, maupun pesan bisnis Anda kepada peserta MUSDA.',
    points: [
      'Brand placement pada area acara',
      'Media exposure selama rangkaian kegiatan',
      'Pilihan media dan placement yang tersedia',
      'Kesempatan memperluas awareness brand',
    ],
  },

  hotel: {
    title: 'Hotel & Akomodasi',
    description:
      'Pilihan akomodasi untuk membantu peserta mendapatkan tempat menginap yang nyaman dan mudah dijangkau selama mengikuti rangkaian MUSDA.',
    points: [
      'Pilihan hotel di sekitar lokasi acara',
      'Informasi harga dan fasilitas',
      'Pilihan kamar sesuai kebutuhan',
      'Informasi dan pemesanan melalui tim terkait',
    ],
  },

  tenant: {
    title: 'Tenant & Marketplace',
    description:
      'Ruang bagi berbagai produk dan usaha untuk hadir lebih dekat dengan peserta MUSDA melalui area tenant dan marketplace.',
    points: [
      'Beragam pilihan produk dan usaha',
      'Kesempatan mengenal bisnis peserta lainnya',
      'Ruang interaksi langsung dengan pengunjung',
      'Pilihan tenant yang terus diperbarui',
    ],
  },
};

export default function ExploreCard({
  number,
  category,
  title,
  description,
  type,
  isOpen,
  onToggle,
}: ExploreCardProps) {
  const Icon = icons[type];
  const detail = detailContent[type];

  return (
    <article
      className={`explore-card explore-card-${type} ${
        isOpen ? 'is-open' : ''
      }`}
    >
      <button
        type="button"
        className="explore-card-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="explore-card-top">
          <span className="explore-card-number">
            {number}
          </span>

          <div className="explore-card-icon">
            <Icon size={22} strokeWidth={1.7} />
          </div>
        </div>

        <div className="explore-card-content">
          <span className="explore-card-category">
            {category}
          </span>

          <h3>{title}</h3>

          <p>{description}</p>
        </div>

        <div className="explore-card-footer">
          <span>
            {isOpen ? 'Tutup informasi' : 'Lihat informasi'}
          </span>

          <div className="explore-card-arrow">
            {isOpen ? (
              <ArrowDown size={18} />
            ) : (
              <ArrowUpRight size={18} />
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="explore-card-detail">
          <div className="explore-card-detail-inner">
            <div>
              <span className="explore-detail-label">
                INFORMASI
              </span>

              <h4>{detail.title}</h4>

              <p>{detail.description}</p>
            </div>

            <div className="explore-detail-points">
              {detail.points.map((point) => (
                <div key={point}>
                  <span />
                  <p>{point}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="explore-contact-button"
            >
              Hubungi Tim
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </article>
  );
}