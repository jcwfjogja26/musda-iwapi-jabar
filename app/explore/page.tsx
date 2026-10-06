'use client';

import { useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import ExploreCard from '@/components/explore/ExploreCard';

// ⚠️ Nomor Kontak CP
const PHONE_FITRI = '628xxxxxxxxxx';
const PHONE_AVIE = '628xxxxxxxxxx';
const PHONE_RIKA = '628xxxxxxxxxx';

const exploreItems = [
  {
    number: '01',
    category: 'PARTNERSHIP',
    title: 'Sponsor & Partnership',
    description:
      'Ruang kolaborasi bagi brand, perusahaan, dan partner untuk hadir dan membangun engagement bersama jaringan IWAPI.',
    type: 'sponsor' as const,
  },
  {
    number: '02',
    category: 'MEDIA EXPOSURE',
    title: 'Billboard & Media Exposure',
    description:
      'Berbagai pilihan media exposure untuk memperkenalkan brand, produk, maupun pesan bisnis Anda selama MUSDA.',
    type: 'billboard' as const,
  },
  {
    number: '03',
    category: 'ACCOMMODATION',
    title: 'Hotel & Akomodasi',
    description:
      'Pilihan hotel dan akomodasi untuk mendukung kenyamanan peserta selama mengikuti rangkaian MUSDA.',
    type: 'hotel' as const,
  },
  {
    number: '04',
    category: 'BUSINESS OPPORTUNITY',
    title: 'Tenant & Marketplace',
    description:
      'Jelajahi berbagai usaha dan produk yang hadir dalam area tenant dan marketplace MUSDA IWAPI Jawa Barat.',
    type: 'tenant' as const,
  },
];

export default function ExplorePage() {
  const [openCard, setOpenCard] = useState<
    'sponsor' | 'billboard' | 'hotel' | 'tenant' | null
  >(null);

  function toggleCard(
    type: 'sponsor' | 'billboard' | 'hotel' | 'tenant'
  ) {
    setOpenCard((current) =>
      current === type ? null : type
    );
  }

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <div className="explore-hero-nav">
          
        </div>

        <div className="explore-hero-inner">
          <div className="explore-eyebrow">
            <span />
            MUSDA IWAPI JAWA BARAT
          </div>

          <h1>
            Temukan peluang
            <br />
            <span>di sekitar MUSDA.</span>
          </h1>

          <p>
            Temukan berbagai informasi, peluang kolaborasi,
            akomodasi, dan ruang usaha yang tersedia selama
            MUSDA IWAPI Jawa Barat.
          </p>
        </div>

        <div className="explore-hero-shape" />
      </section>

      <section className="explore-content">
        <div className="explore-heading">
          <div>
            <span className="section-eyebrow">EXPLORE</span>

            <h2>
              Jelajahi apa yang
              <br />
              Anda butuhkan.
            </h2>
          </div>

          <p>
            Pilih salah satu kategori untuk melihat informasi
            poin lebih lengkap dan temukan peluang yang sesuai
            dengan kebutuhan Anda.
          </p>
        </div>

        <div className="explore-grid">
          {exploreItems.map((item) => (
            <ExploreCard
              key={item.number}
              number={item.number}
              category={item.category}
              title={item.title}
              description={item.description}
              type={item.type}
              isOpen={openCard === item.type}
              onToggle={() => toggleCard(item.type)}
            />
          ))}
        </div>

        {/* BOTTOM CONTACT BANNER DENGAN 3 CP (Fitri, Avie, Rika) */}
        <div className="explore-bottom">
          <div>
            <span>Punya pertanyaan atau kebutuhan khusus?</span>
            <strong>Tim MUSDA siap membantu Anda.</strong>
          </div>

          <div className="explore-bottom-contacts">
            <a
              href={`https://wa.me/${PHONE_FITRI}?text=Halo%20Fitri,%20saya%20ingin%20bertanya%20mengenai%20MUSDA`}
              target="_blank"
              rel="noopener noreferrer"
              className="explore-bottom-btn"
            >
              <MessageCircle size={16} />
              <span>Contact Fitri</span>
            </a>

            <a
              href={`https://wa.me/${PHONE_AVIE}?text=Halo%20Avie,%20saya%20ingin%20bertanya%20mengenai%20MUSDA`}
              target="_blank"
              rel="noopener noreferrer"
              className="explore-bottom-btn"
            >
              <MessageCircle size={16} />
              <span>Contact Avie</span>
            </a>

            <a
              href={`https://wa.me/${PHONE_RIKA}?text=Halo%20Rika,%20saya%20ingin%20bertanya%20mengenai%20Hotel%20dan%20Akomodasi`}
              target="_blank"
              rel="noopener noreferrer"
              className="explore-bottom-btn"
            >
              <MessageCircle size={16} />
              <span>Contact Rika</span>
            </a>
          </div>
        </div>

        {/* Navigation Button Glass di bagian bawah */}
        <div className="explore-back">
          <a href="/" className="explore-back-glass-button">
            <ArrowLeft size={15} />
            <span>Kembali ke Landing Page</span>
          </a>
        </div>
      </section>
    </main>
  );
}