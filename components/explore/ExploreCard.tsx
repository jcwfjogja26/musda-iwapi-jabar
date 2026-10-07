'use client';

import {
  Building2,
  ChevronDown,
  ChevronUp,
  Hotel,
  Megaphone,
  MessageCircle,
  ShoppingBag,
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

// ⚠️ GANTI DENGAN NOMOR WHATSAPP ASLI (Format: 628xxxxxxxxxx)
const PHONE_FITRI = '6282126169071';
const PHONE_AVIE = '6281221700050';
const PHONE_RIKA = '62811245222';

// Pemetaan Ikon yang dipastikan aman
const icons = {
  sponsor: Building2,
  billboard: Megaphone,
  hotel: Hotel,
  tenant: ShoppingBag,
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
    contacts: [
      { name: 'Ibu Fitri', role: 'Sponsorship', phone: PHONE_FITRI },
      { name: 'Ibu Avi', role: 'Sponsorship', phone: PHONE_AVIE },
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
    contacts: [
      { name: 'Ibu Fitri', role: 'Media & Exposure', phone: PHONE_FITRI },
      { name: 'Ibu Avi', role: 'Media & Exposure', phone: PHONE_AVIE },
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
    contacts: [
      { name: 'Ibu Rika', role: 'Akomodasi & Hotel', phone: PHONE_RIKA },
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
    contacts: [
      { name: 'Ibu Fitri', role: 'Tenant', phone: PHONE_FITRI },
      { name: 'Ibu Avi', role: 'Tenant', phone: PHONE_AVIE },
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
  // Mencegah error crash jika ikon bernilai undefined
  const Icon = icons[type] || Building2;
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
          <span className="explore-card-number">{number}</span>

          <div className="explore-card-icon">
            <Icon size={22} strokeWidth={1.7} />
          </div>
        </div>

        <div className="explore-card-content">
          <span className="explore-card-category">{category}</span>

          <h3>{title}</h3>

          <p>{description}</p>
        </div>

        <div className="explore-card-footer">
          <span>{isOpen ? 'Tutup poin' : 'Lihat poin'}</span>

          <div className="explore-card-arrow">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="explore-card-detail">
          <div className="explore-card-detail-inner">
            <div>
              <span className="explore-detail-label">INFORMASI POIN</span>

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

            {/* List Kontak Sesuai Penanggung Jawab */}
            <div className="explore-contact-group">
              {detail.contacts.map((contact) => (
                <a
                  key={contact.name}
                  href={`https://wa.me/${contact.phone}?text=Halo%20${contact.name},%20saya%20ingin%20bertanya%20mengenai%20${encodeURIComponent(
                    detail.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="explore-contact-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle size={16} />
                  <span>
                    Hubungi {contact.name} ({contact.role})
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}