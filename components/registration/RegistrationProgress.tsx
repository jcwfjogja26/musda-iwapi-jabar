'use client';

import { Check } from 'lucide-react';

interface RegistrationProgressProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  {
    number: 1,
    title: 'Data Peserta',
    description: 'Informasi dasar',
  },
  {
    number: 2,
    title: 'TactLink',
    description: 'Download & RSVP',
  },
  {
    number: 3,
    title: 'Pembayaran',
    description: 'Konfirmasi pembayaran',
  },
];

export default function RegistrationProgress({
  currentStep,
}: RegistrationProgressProps) {
  return (
    <div className="registration-progress">
      {steps.map((step) => {
        const active =
          currentStep === step.number;

        const completed =
          currentStep > step.number;

        return (
          <div
            key={step.number}
            className={[
              'registration-progress-step',
              active ? 'active' : '',
              completed ? 'completed' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="registration-progress-number">
              {completed ? (
                <Check size={15} />
              ) : (
                String(step.number).padStart(2, '0')
              )}
            </div>

            <div className="registration-progress-info">
              <strong>{step.title}</strong>
              <span>{step.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}