'use client';

import { FileImage, Upload, X } from 'lucide-react';

interface FileUploadProps {
  label: string;
  description: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

export default function FileUpload({
  label,
  description,
  file,
  onChange,
  required = true,
}: FileUploadProps) {
  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5 MB.');
      event.target.value = '';
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert('File harus berupa JPG, PNG, atau WEBP.');
      event.target.value = '';
      return;
    }

    onChange(selectedFile);
  }

  function formatFileSize(size: number) {
    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className={`file-upload ${file ? 'has-file' : ''}`}>
      <label className="file-upload-label">
        {label}

        {required && (
          <span style={{ color: '#1769aa', marginLeft: 3 }}>
            *
          </span>
        )}
      </label>

      <p className="file-upload-description">
        {description}
      </p>

      {!file ? (
        <label className="file-upload-trigger">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />

          <span className="file-upload-icon">
            <Upload size={18} />
          </span>

          <strong>
            Klik untuk upload bukti
          </strong>

          <span>
            JPG, PNG, WEBP · Maks. 5 MB
          </span>
        </label>
      ) : (
        <div className="file-upload-file">
          <div className="file-upload-file-icon">
            <FileImage size={17} />
          </div>

          <div className="file-upload-file-info">
            <span className="file-upload-file-name">
              {file.name}
            </span>

            <span className="file-upload-file-size">
              {formatFileSize(file.size)}
            </span>
          </div>

          <button
            type="button"
            className="file-upload-remove"
            onClick={() => onChange(null)}
            aria-label={`Hapus ${file.name}`}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}