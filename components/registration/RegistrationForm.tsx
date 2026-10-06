'use client';

import { useEffect, useRef, useState } from 'react';
import RegistrationProgress from './RegistrationProgress';
import ParticipantSection from './ParticipantSection';
import TactLinkSection from './TactLinkSection';
import PaymentSection from './PaymentSection';
import RegistrationSuccess from './RegistrationSuccess';

type ParticipantData = {
  fullName: string;
  whatsapp: string;
  email: string;
  city: string;
  dpc: string;
};

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [participant, setParticipant] =
    useState<ParticipantData>({
      fullName: '',
      whatsapp: '',
      email: '',
      city: '',
      dpc: '',
    });

  const [tactlinkDownloaded, setTactlinkDownloaded] =
    useState(false);

  const [downloadProof, setDownloadProof] =
    useState<File | null>(null);

  const [rsvpProof, setRsvpProof] =
    useState<File | null>(null);

  const [paymentProof, setPaymentProof] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  // Menggunakan state boolean untuk indikator pendaftaran berhasil
  const [isSuccess, setIsSuccess] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  // Mengarahkan ke halaman /explore setelah 4.5 detik saat isSuccess bernilai true
  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.location.href = '/explore';
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [isSuccess]);

  function scrollToForm() {
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 80);
  }

  function handleParticipantNext() {
    setCurrentStep(2);
    scrollToForm();
  }

  function handleTactLinkNext() {
    setCurrentStep(3);
    scrollToForm();
  }

  async function handleSubmit() {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('fullName', participant.fullName);
      formData.append('whatsapp', participant.whatsapp);
      formData.append('email', participant.email);
      formData.append('city', participant.city);
      formData.append('dpc', participant.dpc);

      formData.append(
        'tactlinkDownloaded',
        String(tactlinkDownloaded)
      );

      if (downloadProof) {
        formData.append(
          'downloadProof',
          downloadProof
        );
      }

      if (rsvpProof) {
        formData.append(
          'rsvpProof',
          rsvpProof
        );
      }

      if (paymentProof) {
        formData.append(
          'paymentProof',
          paymentProof
        );
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            'Pendaftaran gagal. Silakan coba lagi.'
        );
      }

      // Ubah status menjadi berhasil
      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat mengirim pendaftaran.';

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section
        className="registration-form-section"
        ref={formRef}
      >
        <div className="registration-container">
          <RegistrationProgress
            currentStep={currentStep}
          />

          <div className="registration-form-stack">
            <ParticipantSection
              data={participant}
              onChange={setParticipant}
              onNext={handleParticipantNext}
            />

            {currentStep >= 2 && (
              <TactLinkSection
                downloadProof={downloadProof}
                rsvpProof={rsvpProof}
                downloaded={tactlinkDownloaded}
                onDownloadProofChange={setDownloadProof}
                onRsvpProofChange={setRsvpProof}
                onDownloadedChange={
                  setTactlinkDownloaded
                }
                onNext={handleTactLinkNext}
              />
            )}

            {currentStep >= 3 && (
              <PaymentSection
                paymentProof={paymentProof}
                onPaymentProofChange={setPaymentProof}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>
      </section>

      {/* Menampilkan modal success jika isSuccess true */}
      {isSuccess && <RegistrationSuccess />}
    </>
  );
}