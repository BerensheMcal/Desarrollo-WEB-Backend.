import { useState } from 'react';

interface Props {
  onVerify: () => void;
}

export default function CaptchaWidget({ onVerify }: Props) {
  const [verificado, setVerificado] = useState(false);

  const handleClick = () => {
    if (!verificado) {
      setVerificado(true);
      onVerify();
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        border: `2px solid ${verificado ? '#22c55e' : 'var(--color-borde)'}`,
        borderRadius: 'var(--radio)',
        backgroundColor: verificado ? '#f0fdf4' : '#f9fafb',
        cursor: 'pointer',
        userSelect: 'none',
        marginTop: '0.75rem',
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          width: '1.5rem',
          height: '1.5rem',
          border: `2px solid ${verificado ? '#22c55e' : '#d1d5db'}`,
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: verificado ? '#22c55e' : 'white',
          transition: 'all 0.2s',
          flexShrink: 0,
        }}
      >
        {verificado && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span style={{ fontSize: '0.875rem', color: verificado ? '#16a34a' : 'var(--color-texto-secundario)', fontWeight: 500 }}>
        {verificado ? 'Verificado correctamente' : 'No soy un robot'}
      </span>
    </div>
  );
}
