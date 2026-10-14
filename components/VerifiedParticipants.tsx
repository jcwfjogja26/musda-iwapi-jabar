'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Users } from 'lucide-react';

type Participant = {
  id: string | number;
  full_name: string;
  dpc: string;
};

export default function VerifiedParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadParticipants() {
      try {
        const response = await fetch('/api/verified-participants', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil peserta');
        }

        const result = await response.json();

        if (active) {
          setParticipants(result.participants ?? []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoaded(true);
      }
    }

    loadParticipants();

    const interval = window.setInterval(loadParticipants, 30_000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  // Marquee berjalan hanya jika peserta > 3 orang
  const shouldRoll = participants.length > 3;

  return (
    <section className="verified-participants">
      {/* BACKGROUND TEXTURE & VECTOR CURVES */}
      <div className="participants-dot-texture" />
      <div className="vector-curve-top" />
      <div className="vector-curve-bottom" />

      <div className="verified-participants-inner">
    {/* HEADER BAR CLEAN */}
        <div className="participants-top-bar">
          <div className="participants-header-left">
            <div className="participants-eyebrow-row">
              <span className="participants-eyebrow">
                <Users size={13} />
                DAFTAR PESERTA
              </span>

              {/* Badging Status Terverifikasi Ringkas & Mewah */}
              <span className="participants-count-chip">
                <strong>{participants.length.toString().padStart(2, '0')}</strong> Terdaftar
              </span>
            </div>          

            <h2 className="musda-title">
                Sampai bertemu di <em>MUSDA X.</em>
            </h2>

            <p className="participants-desc">
              Bersama, kita menguatkan langkah
              perempuan pengusaha menuju masa depan yang lebih kolaboratif.
            </p>
          </div>
        </div>

        {/* LIST KARTU PESERTA */}
        {!loaded ? (
          <div className="participants-empty-state">
            Memuat daftar peserta terverifikasi...
          </div>
        ) : participants.length === 0 ? (
          <div className="participants-empty-state">
            <strong>Perjalanan Baru Saja Dimulai</strong>
            <span>Jadilah pengusaha pertama yang namanya tampil terverifikasi di sini.</span>
          </div>
        ) : (
          <div
            className={
              shouldRoll
                ? 'participants-marquee-wrapper'
                : 'participants-centered-wrapper'
            }
          >
            <div
              className={
                shouldRoll
                  ? 'participants-track is-rolling'
                  : 'participants-track-static'
              }
            >
              {[0, ...(shouldRoll ? [1] : [])].map((copy) => (
                <div
                  className="participants-track-group"
                  key={copy}
                  aria-hidden={copy === 1}
                >
                  {participants.map((participant) => (
                    <div
                      className="royal-glass-card"
                      key={`${copy}-${participant.id}`}
                    >
                      <div className="royal-card-text">
                        <strong className="participant-name">
                          {participant.full_name}
                        </strong>
                        <span className="participant-dpc">
                          {participant.dpc
                            ? participant.dpc.toUpperCase().startsWith('DPC')
                              ? participant.dpc
                              : `DPC ${participant.dpc}`
                            : 'DPC JAWA BARAT'}
                        </span>
                      </div>

                      <div className="royal-badge-icon">
                        <CheckCircle2 size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}