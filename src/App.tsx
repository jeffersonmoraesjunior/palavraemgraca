import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import type { Theme } from './types';
import { Header, Footer } from './components';
import { About, Privacy, Contact, Terms, Home, Bible, BibleIndex, Sitemap, VoiceSearch } from './pages';
import { HelmetProvider } from 'react-helmet-async';
import CookieConsent from './components/CookieConsent';

// Main App Component
function App() {
  const location = useLocation();
  
  // State hooks
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? JSON.parse(savedTheme) : { 
        isDark: window.matchMedia('(prefers-color-scheme: dark)').matches, 
        fontSize: 16 
      };
    } catch (error) {
      console.warn('Erro ao carregar tema do localStorage:', error);
      return { 
        isDark: window.matchMedia('(prefers-color-scheme: dark)').matches, 
        fontSize: 16 
      };
    }
  });

  // Effect hooks
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme.isDark);
    document.documentElement.style.fontSize = `${theme.fontSize}px`;
    try {
      localStorage.setItem('theme', JSON.stringify(theme));
    } catch (error) {
      console.warn('Erro ao salvar tema no localStorage:', error);
    }
  }, [theme]);

  // Efeito para rolar para o topo quando a rota muda
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const adjustFontSize = (increment: boolean) => {
    setTheme(prev => ({
      ...prev,
      fontSize: Math.min(Math.max(prev.fontSize + (increment ? 2 : -2), 12), 24)
    }));
  };

  const handleCookieConsent = (preferences: { analytics: boolean; marketing: boolean }) => {
    if (preferences.analytics) {
      // Inicializar analytics
    }
    if (preferences.marketing) {
      // Inicializar cookies de marketing
    }
  };

  // Render
  return (
    <HelmetProvider>
      <div className={`min-h-screen transition-colors duration-300 ${theme.isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Header 
            theme={theme} 
            setTheme={setTheme} 
            adjustFontSize={adjustFontSize} 
          />
          
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/perguntas" element={<VoiceSearch />} />
            <Route path="/biblia" element={<Bible />} />
            <Route path="/biblia/indice" element={<BibleIndex />} />
            <Route path="/biblia/indice/:version" element={<BibleIndex />} />
            <Route path="/biblia/:version" element={<Bible />} />
            <Route path="/biblia/:version/:book" element={<Bible />} />
            <Route path="/biblia/:version/:book/:chapter" element={<Bible />} />
          </Routes>
          
          <Footer />
          <CookieConsent onAccept={handleCookieConsent} />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;