import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CookieConsentProps {
  onAccept: (preferences: { analytics: boolean; marketing: boolean }) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Pequeno delay para não mostrar imediatamente quando a página carrega
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    const preferences = { analytics: true, marketing: false };
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    onAccept(preferences);
    setIsVisible(false);
  };

  const handleClose = () => {
    const preferences = { analytics: false, marketing: false };
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    onAccept(preferences);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg z-50 p-4 text-sm border border-gray-200 dark:border-gray-700">
      <p className="mb-3">
        Usamos cookies para melhorar sua experiência. Consulte nossa{' '}
        <Link to="/privacidade" className="text-blue-600 dark:text-blue-400 hover:underline">
          Política de Privacidade
        </Link>.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleClose}
          className="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Fechar
        </button>
        <button
          onClick={handleAccept}
          className="px-3 py-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
};

export default CookieConsent; 