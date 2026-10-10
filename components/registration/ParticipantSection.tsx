'use client';

import { useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  Search,
} from 'lucide-react';

interface ParticipantData {
  fullName: string;
  whatsapp: string;
  email: string;
  dpc: string;
  businessField: string;
  brandName: string;
  businessDuration: string;
  expectedIwapiBenefits: string;
}

interface ParticipantSectionProps {
  data: ParticipantData;
  onChange: (data: ParticipantData) => void;
  onNext: () => void;
}

const dpcOptions = [
  'Kabupaten Bandung',
  'Kabupaten Bandung Barat',
  'Kabupaten Bekasi',
  'Kabupaten Bogor',
  'Kabupaten Ciamis',
  'Kabupaten Cianjur',
  'Kabupaten Cirebon',
  'Kabupaten Garut',
  'Kabupaten Indramayu',
  'Kabupaten Karawang',
  'Kabupaten Kuningan',
  'Kabupaten Majalengka',
  'Kabupaten Pangandaran',
  'Kabupaten Purwakarta',
  'Kabupaten Subang',
  'Kabupaten Sukabumi',
  'Kabupaten Sumedang',
  'Kabupaten Tasikmalaya',
  'Kota Bandung',
  'Kota Banjar',
  'Kota Bekasi',
  'Kota Bogor',
  'Kota Cimahi',
  'Kota Cirebon',
  'Kota Depok',
  'Kota Sukabumi',
  'Kota Tasikmalaya',
];

const businessDurationOptions = [
  '< 1 tahun',
  '1–3 tahun',
  '4–5 tahun',
  '> 5 tahun',
];

function SearchableField({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!value.trim()) {
      return options.slice(0, 8);
    }

    return options
      .filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 8);
  }, [options, value]);

  return (
    <div className="field-group searchable-field">
      <label className="field-label">
        {label}
        <span>*</span>
      </label>

      <div className="searchable-input-wrap">
        <Search size={16} />

        <input
          value={value}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
        />

        <ChevronDown
          size={16}
          className={open ? 'search-chevron-open' : ''}
        />
      </div>

      {open && filteredOptions.length > 0 && (
        <>
          <button
            type="button"
            className="dropdown-backdrop"
            onClick={() => setOpen(false)}
            aria-label="Tutup pilihan"
          />

          <div className="searchable-options">
            {filteredOptions.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <span>{option}</span>
                {value === option && <Check size={15} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ParticipantSection({
  data,
  onChange,
  onNext,
}: ParticipantSectionProps) {
  const canContinue =
    Boolean(data.fullName.trim()) &&
    Boolean(data.whatsapp.trim()) &&
    Boolean(data.dpc.trim()) &&
    Boolean(data.businessField.trim()) &&
    Boolean(data.brandName.trim()) &&
    Boolean(data.businessDuration.trim()) &&
    Boolean(data.expectedIwapiBenefits.trim());

  function update(
    field: keyof ParticipantData,
    value: string
  ) {
    onChange({
      ...data,
      [field]:
        field === 'expectedIwapiBenefits'
          ? value.slice(0, 500)
          : value,
    });
  }

  return (
    <section className="registration-section">
      <div className="section-number">01</div>

      <div className="registration-section-content">
        <div className="registration-section-heading">
          <span className="section-kicker">
            DATA PESERTA
          </span>

          <h2>Kenali peserta MUSDA</h2>

          <p>
            Lengkapi informasi diri dan usaha Anda untuk
            kebutuhan pendataan peserta Musyawarah Daerah
            IWAPI Jawa Barat.
          </p>
        </div>

        <div className="registration-fields">
          <div className="field-group">
            <label className="field-label">
              Nama Lengkap <span>*</span>
            </label>

            <input
              type="text"
              value={data.fullName}
              placeholder="Masukkan nama lengkap"
              onChange={(event) =>
                update('fullName', event.target.value)
              }
            />
          </div>

          <div className="field-group">
            <label className="field-label">
              Nomor WhatsApp <span>*</span>
            </label>

            <input
              type="tel"
              value={data.whatsapp}
              placeholder="Contoh: 081234567890"
              onChange={(event) =>
                update('whatsapp', event.target.value)
              }
            />
          </div>

          <div className="field-group full-width">
            <label className="field-label">
              Email <small>(opsional)</small>
            </label>

            <input
              type="email"
              value={data.email}
              placeholder="nama@email.com"
              onChange={(event) =>
                update('email', event.target.value)
              }
            />
          </div>

          <SearchableField
            label="DPC / Kabupaten / Kota"
            value={data.dpc}
            placeholder="Cari DPC..."
            options={dpcOptions}
            onChange={(value) => update('dpc', value)}
          />

          <div className="field-group">
            <label className="field-label">
              Bidang Usaha <span>*</span>
            </label>

            <input
              type="text"
              value={data.businessField}
              placeholder="Contoh: Kuliner, fashion, jasa"
              onChange={(event) =>
                update('businessField', event.target.value)
              }
            />
          </div>

          <div className="field-group">
            <label className="field-label">
              Nama Brand <span>*</span>
            </label>

            <input
              type="text"
              value={data.brandName}
              placeholder="Masukkan nama brand usaha"
              onChange={(event) =>
                update('brandName', event.target.value)
              }
            />
          </div>

          {/* DIBUAT DROPDOWN SELECT RAPI & SAMA SEPERTI INPUT LAIN */}
          <div className="field-group full-width">
            <label className="field-label">
              Lama Usaha <span>*</span>
            </label>

            <div className="select-input-wrap">
              <select
                value={data.businessDuration}
                onChange={(e) => update('businessDuration', e.target.value)}
                className="select-field"
              >
                <option value="" disabled hidden>
                  Pilih lama usaha...
                </option>
                {businessDurationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="select-chevron" />
            </div>
          </div>

          <div className="field-group full-width">
            <label className="field-label">
              Manfaat yang Diharapkan Selama Bergabung di IWAPI{' '}
              <span>*</span>
            </label>

            <textarea
              value={data.expectedIwapiBenefits}
              placeholder="Ceritakan manfaat atau dukungan yang Anda harapkan dari IWAPI..."
              maxLength={500}
              rows={4}
              onChange={(event) =>
                update(
                  'expectedIwapiBenefits',
                  event.target.value
                )
              }
            />

            <div className="character-counter">
              {data.expectedIwapiBenefits.length}/500 karakter
            </div>
          </div>
        </div>

        <div className="registration-section-footer">
          <span className="required-hint">
            <span>*</span>
            Wajib diisi
          </span>

          <button
            type="button"
            className="primary-button"
            disabled={!canContinue}
            onClick={onNext}
          >
            <span>Lanjut</span>
          </button>
        </div>
      </div>
    </section>
  );
}