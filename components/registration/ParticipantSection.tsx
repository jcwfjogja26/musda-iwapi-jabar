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
  city: string;
  dpc: string;
}

interface ParticipantSectionProps {
  data: ParticipantData;
  onChange: (data: ParticipantData) => void;
  onNext: () => void;
}

const cities = [
  'Bandung',
  'Banjar',
  'Bekasi',
  'Bogor',
  'Cimahi',
  'Cirebon',
  'Depok',
  'Sukabumi',
  'Tasikmalaya',
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
];

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
        option
          .toLowerCase()
          .includes(value.toLowerCase())
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
          className={
            open ? 'search-chevron-open' : ''
          }
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

                {value === option && (
                  <Check size={15} />
                )}
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
    Boolean(data.city.trim()) &&
    Boolean(data.dpc.trim());

  function update(
    field: keyof ParticipantData,
    value: string
  ) {
    onChange({
      ...data,
      [field]: value,
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
            Lengkapi informasi dasar berikut untuk kebutuhan
            pendataan peserta Musyawarah Daerah IWAPI Jawa
            Barat.
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
                update(
                  'fullName',
                  event.target.value
                )
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
                update(
                  'whatsapp',
                  event.target.value
                )
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
                update(
                  'email',
                  event.target.value
                )
              }
            />
          </div>

          <SearchableField
            label="Kota Asal"
            value={data.city}
            placeholder="Ketik nama kota..."
            options={cities}
            onChange={(value) =>
              update('city', value)
            }
          />

          <SearchableField
            label="DPC / Kabupaten / Kota"
            value={data.dpc}
            placeholder="Cari DPC..."
            options={dpcOptions}
            onChange={(value) =>
              update('dpc', value)
            }
          />
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