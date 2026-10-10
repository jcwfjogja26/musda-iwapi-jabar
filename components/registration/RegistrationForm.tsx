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
  dpc: string;
  businessField: string;
  brandName: string;
  businessDuration: string;
  expectedIwapiBenefits: string;
};

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [participant, setParticipant] =
    useState<ParticipantData>({
      fullName: '',
      whatsapp: '',
      email: '',
      dpc: '',
      businessField: '',
      brandName: '',
      businessDuration: '',
      expectedIwapiBenefits: '',
    });

  const [tactlinkDownloaded, setTactlinkDownloaded] =
    useState(false);

  const [downloadProof, setDownloadProof] =
    useState<File | null>(null);

  const [paymentProof, setPaymentProof] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const tactlinkRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  // REDIRECT PASCA SUKSES PENDAFTARAN (DIPERSINGKAT MENJADI 1.2 DETIK)
  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.location.href = '/explore';
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [isSuccess]);

  // HANDLER PINDAH KE TACTLINK (STEP 2)
  function handleParticipantNext() {
    setCurrentStep(2);

    setTimeout(() => {
      if (tactlinkRef.current) {
        tactlinkRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Fokus persis ke bagian teratas section TactLink
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  }

  // HANDLER PINDAH KE PEMBAYARAN (STEP 3)
  function handleTactLinkNext() {
    setCurrentStep(3);

    setTimeout(() => {
      if (paymentRef.current) {
        paymentRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Fokus persis ke bagian teratas section Pembayaran
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  }

  async function handleSubmit() {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Data peserta
      formData.append('fullName', participant.fullName);
      formData.append('whatsapp', participant.whatsapp);
      formData.append('email', participant.email);
      formData.append('dpc', participant.dpc);

      // Data usaha
      formData.append('businessField', participant.businessField);
      formData.append('brandName', participant.brandName);
      formData.append('businessDuration', participant.businessDuration);
      formData.append(
        'expectedIwapiBenefits',
        participant.expectedIwapiBenefits.slice(0, 500)
      );

      // Data TactLink
      formData.append(
        'tactlinkDownloaded',
        String(tactlinkDownloaded)
      );

      if (downloadProof) {
        formData.append('downloadProof', downloadProof);
      }

      // Bukti pembayaran
      if (paymentProof) {
        formData.append('paymentProof', paymentProof);
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
              <div ref={tactlinkRef} style={{ scrollMarginTop: '32px' }}>
                <TactLinkSection
                  downloadProof={downloadProof}
                  downloaded={tactlinkDownloaded}
                  onDownloadProofChange={setDownloadProof}
                  onDownloadedChange={setTactlinkDownloaded}
                  onNext={handleTactLinkNext}
                />
              </div>
            )}

            {currentStep >= 3 && (
              <div ref={paymentRef} style={{ scrollMarginTop: '32px' }}>
                <PaymentSection
                  paymentProof={paymentProof}
                  onPaymentProofChange={setPaymentProof}
                  onSubmit={handleSubmit}
                  loading={loading}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {isSuccess && <RegistrationSuccess />}
    </>
  );
}