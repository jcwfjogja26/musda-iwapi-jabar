'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import './dashboard.css';

interface Registration {
  id: string;
  full_name: string;
  whatsapp: string;
  email: string;
  dpc: string;
  business_field: string;
  brand_name: string;
  business_duration: string;
  expected_iwapi_benefits: string;
  created_at: string;
  status: 'Pending' | 'Verified';
  downloadProofUrl: string | null;
  paymentProofUrl: string | null;
  download_status?: string;
  payment_status?: string;
}

export default function AdminDashboardPage() {
  const supabase = createClient();
  const router = useRouter();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Registration | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Mengambil data pendaftar
  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/admin/registrations', {
        cache: 'no-store',
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal memuat data pendaftar.');
      }

      setRegistrations(json.data ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Terjadi kesalahan.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRegistrations();
  }, [fetchRegistrations]);

  // 2. Melihat foto bukti
  const handleViewImage = (imageUrl: string | null) => {
    if (!imageUrl) return;
    setSelectedImage(imageUrl);
  };

  // 3. Mengubah status verifikasi
  const handleStatusChange = async (
    id: string,
    newStatus: 'Pending' | 'Verified'
  ) => {
    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status: newStatus,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal mengubah status.');
      }

      setRegistrations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : 'Gagal memperbarui status.'
      );
    }
  };

  // 4. Menghapus data peserta
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);

      const res = await fetch('/api/admin/registrations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: deleteTarget.id,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal menghapus data.');
      }

      setRegistrations((prev) =>
        prev.filter((item) => item.id !== deleteTarget.id)
      );

      setDeleteTarget(null);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : 'Gagal menghapus data.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // 5. Logout admin
  const handleLogout = async () => {
    try {
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) {
        throw logoutError;
      }

      router.replace('/admin/login');
      router.refresh();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : 'Gagal keluar dari dashboard.'
      );
    }
  };

  // 6. Filter pencarian
  const filtered = registrations.filter((reg) => {
    const keyword = search.toLowerCase();

    return [
      reg.full_name,
      reg.whatsapp,
      reg.email,
      reg.dpc,
      reg.business_field,
      reg.brand_name,
      reg.business_duration,
    ].some((val) =>
      (val ?? '').toLowerCase().includes(keyword)
    );
  });

  const verifiedCount = registrations.filter(
    (r) => r.status === 'Verified'
  ).length;

  const pendingCount = registrations.filter(
    (r) => r.status !== 'Verified'
  ).length;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard__container">
        {/* HEADER */}
        <header className="admin-dashboard__header">
          <div>
            <div className="admin-dashboard__eyebrow">
              MUSDA IWAPI JAWA BARAT
            </div>

            <h1 className="admin-dashboard__title">
              Dashboard Pendaftaran
            </h1>

            <p className="admin-dashboard__description">
              Kelola data peserta, verifikasi pembayaran, dan unduhan bukti.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => void fetchRegistrations()}
              disabled={loading}
              className="admin-button"
            >
              {loading ? 'Memuat...' : '↻ Muat Ulang Data'}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="btn-cancel"
              style={{
                height: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 16px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>

              <span>Keluar</span>
            </button>
          </div>
        </header>

        {/* RINGKASAN STATISTIK */}
        <section className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-card__label">
              Total Pendaftar
            </div>
            <div className="admin-stat-card__number">
              {registrations.length}
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-card__label">
              Sudah Terverifikasi
            </div>
            <div className="admin-stat-card__number admin-stat-card__number--verified">
              {verifiedCount}
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-card__label">
              Menunggu Verifikasi (Pending)
            </div>
            <div className="admin-stat-card__number admin-stat-card__number--pending">
              {pendingCount}
            </div>
          </div>
        </section>

        {/* TABEL PESERTA */}
        <section className="admin-panel">
          <div className="admin-panel__toolbar">
            <div>
              <h2 className="admin-panel__title">
                Daftar Peserta
              </h2>
              <div className="admin-panel__caption">
                {filtered.length} data ditampilkan
              </div>
            </div>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, WhatsApp, email, brand, DPC..."
              className="admin-search"
            />
          </div>

          {error && (
            <div className="admin-error">
              <p style={{ fontWeight: 700 }}>
                Terjadi Kesalahan:
              </p>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="admin-message">
              Memuat data pendaftar...
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-message">
              Belum ada data pendaftaran.
            </div>
          ) : (
            <div className="admin-table-wrapper" style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nama Lengkap</th>
                    <th>WhatsApp</th>
                    <th>Email</th>
                    <th>DPC</th>
                    <th>Bidang Usaha</th>
                    <th>Nama Brand</th>
                    <th>Lama Usaha</th>
                    <th>Manfaat Diharapkan</th>
                    <th>Bukti Download/RSVP</th>
                    <th>Bukti Pembayaran</th>
                    <th>Waktu Pendaftaran</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((reg) => (
                    <tr key={reg.id}>
                      {/* NAMA LENGKAP */}
                      <td>
                        <div className="admin-participant-name">
                          {reg.full_name}
                        </div>
                      </td>

                      {/* WHATSAPP */}
                      <td>
                        <div style={{ fontWeight: 600 }}>
                          {reg.whatsapp}
                        </div>
                      </td>

                      {/* EMAIL */}
                      <td>
                        <div className="admin-muted">
                          {reg.email || '-'}
                        </div>
                      </td>

                      {/* DPC */}
                      <td>
                        <div style={{ fontWeight: 600 }}>
                          {reg.dpc || '-'}
                        </div>
                      </td>

                      {/* BIDANG USAHA */}
                      <td>
                        <div>{reg.business_field || '-'}</div>
                      </td>

                      {/* NAMA BRAND */}
                      <td>
                        <div style={{ fontWeight: 600 }}>
                          {reg.brand_name || '-'}
                        </div>
                      </td>

                      {/* LAMA USAHA */}
                      <td>
                        <div>{reg.business_duration || '-'}</div>
                      </td>

                      {/* MANFAAT DIHARAPKAN */}
                      <td>
                        <div
                          style={{
                            maxWidth: '220px',
                            whiteSpace: 'normal',
                            fontSize: '12px',
                            lineHeight: '1.4',
                            color: '#475569',
                          }}
                        >
                          {reg.expected_iwapi_benefits || '-'}
                        </div>
                      </td>

                      {/* BUKTI DOWNLOAD */}
                      <td>
                        {reg.downloadProofUrl ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleViewImage(reg.downloadProofUrl)
                            }
                            className="proof-eye-btn"
                          >
                            <svg
                              className="proof-eye-icon"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            Lihat Foto
                          </button>
                        ) : (
                          <span className="admin-muted">
                            Tidak ada
                          </span>
                        )}
                      </td>

                      {/* BUKTI PEMBAYARAN */}
                      <td>
                        {reg.paymentProofUrl ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleViewImage(reg.paymentProofUrl)
                            }
                            className="proof-eye-btn"
                          >
                            <svg
                              className="proof-eye-icon"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            Lihat Foto
                          </button>
                        ) : (
                          <span className="admin-muted">
                            Tidak ada
                          </span>
                        )}
                      </td>

                      {/* WAKTU PENDAFTARAN */}
                      <td>
                        <div
                          className="admin-muted"
                          style={{
                            whiteSpace: 'nowrap',
                            fontWeight: 600,
                          }}
                        >
                          {formatDate(reg.created_at)}
                        </div>
                      </td>

                      {/* STATUS PESERTA */}
                      <td>
                        <select
                          value={reg.status || 'Pending'}
                          onChange={(e) =>
                            handleStatusChange(
                              reg.id,
                              e.target.value as 'Pending' | 'Verified'
                            )
                          }
                          className={`status-select ${
                            reg.status === 'Verified'
                              ? 'status-select--verified'
                              : 'status-select--pending'
                          }`}
                        >
                          <option value="Pending">○ Pending</option>
                          <option value="Verified">✓ Verified</option>
                        </select>
                      </td>

                      {/* HAPUS DATA */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(reg)}
                          title="Hapus Data Peserta"
                          className="delete-btn"
                        >
                          <svg
                            className="delete-icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* MODAL PRATINJAU FOTO BUKTI */}
      {selectedImage && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                Pratinjau Bukti
              </h3>

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <img
                src={selectedImage}
                alt="Bukti Pendaftaran"
                style={{
                  maxWidth: '100%',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
            </div>

            <div className="modal-footer">
              <a
                href={selectedImage}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-button"
                style={{ textDecoration: 'none' }}
              >
                Buka di Tab Baru ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS DATA */}
      {deleteTarget && (
        <div
          className="modal-overlay"
          onClick={() => !isDeleting && setDeleteTarget(null)}
        >
          <div
            className="modal-card delete-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-modal-icon">
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16.5c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h3
              style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: 700,
                color: '#0f243a',
              }}
            >
              Hapus Data Peserta?
            </h3>

            <p
              style={{
                margin: '0 0 24px 0',
                fontSize: '13px',
                color: '#64748b',
                lineHeight: 1.5,
              }}
            >
              Apakah Anda yakin ingin menghapus data atas nama{' '}
              <strong>{deleteTarget.full_name}</strong>? Tindakan ini tidak
              dapat dibatalkan.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
              }}
            >
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="btn-cancel"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="btn-danger"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}