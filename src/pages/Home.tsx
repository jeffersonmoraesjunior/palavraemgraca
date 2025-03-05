import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { DailyVerse, FeelingInput, GuidanceDisplay, HistoryList } from '../components';
import type { AIResponse, SavedGuidance } from '../types';
import { getDailyVerse, getPersonalizedGuidance } from '../utils/ai';

interface HomeProps {
  theme: { isDark: boolean; fontSize: number };
}

const Home: React.FC<HomeProps> = ({ theme }) => {
  // State hooks
  const [dailyVerse, setDailyVerse] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('dailyVerse');
      const savedDate = localStorage.getItem('dailyVerseDate');
      
      // Se temos um versículo salvo e ele foi obtido hoje, use-o
      if (saved && savedDate === new Date().toDateString()) {
        return saved;
      }
      return '';
    } catch (error) {
      console.warn('Erro ao carregar versículo do localStorage:', error);
      return '';
    }
  });
  
  const [feeling, setFeeling] = useState<string>('');
  const [guidance, setGuidance] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<SavedGuidance[]>(() => {
    try {
      const saved = localStorage.getItem('history');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('Erro ao carregar histórico do localStorage:', error);
      return [];
    }
  });
  const [activeTab, setActiveTab] = useState<'guidance' | 'history'>('guidance');

  // Effect hooks
  useEffect(() => {
    // Se não temos um versículo diário e não estamos carregando, busque um
    if (!dailyVerse && !loading) {
      handleDailyVerse();
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      try {
        localStorage.setItem('history', JSON.stringify(history));
      } catch (error) {
        console.warn('Erro ao salvar histórico no localStorage:', error);
      }
    }
  }, [history]);

  // Handler functions
  const handleDailyVerse = async () => {
    setLoading(true);
    try {
      const verse = await getDailyVerse();
      setDailyVerse(verse);
      
      // Salvar o versículo e a data
      localStorage.setItem('dailyVerse', verse);
      localStorage.setItem('dailyVerseDate', new Date().toDateString());
    } catch (error) {
      console.error('Erro ao obter versículo diário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuidance = async () => {
    if (!feeling.trim()) return;
    
    setLoading(true);
    try {
      const response = await getPersonalizedGuidance(feeling);
      setGuidance(response);
    } catch (error) {
      console.error('Erro ao obter orientação:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveGuidance = () => {
    if (guidance) {
      const newItem: SavedGuidance = {
        id: Date.now(),
        date: new Date().toISOString(),
        feeling,
        guidance: guidance
      };
      
      setHistory(prev => [newItem, ...prev]);
      alert('Orientação salva no histórico!');
    }
  };

  const deleteHistoryItem = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este item do histórico?')) {
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const shareGuidance = () => {
    if (guidance) {
      const text = `Versículo: ${guidance.verse}\n\nMensagem: ${guidance.support}\n\nCompartilhado de Amigos de Deus`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Orientação Espiritual',
          text
        }).catch(err => console.error('Erro ao compartilhar: ', err));
      } else {
        navigator.clipboard.writeText(text)
          .then(() => alert('Texto copiado para a área de transferência!'))
          .catch(err => console.error('Erro ao copiar: ', err));
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <>
      <Helmet>
        <title>Amigos de Deus - Conforto e Orientação Espiritual</title>
        <meta name="description" content="Receba orientação espiritual personalizada baseada na Bíblia para ajudar nos momentos difíceis. Conforto através da palavra de Deus." />
        <meta name="keywords" content="versículos bíblicos, conforto espiritual, palavra de Deus, orientação espiritual, versículo do dia, aplicativo cristão, mensagem bíblica" />
        <link rel="canonical" href="https://amigosdedeus.com.br/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amigosdedeus.com.br/" />
        <meta property="og:title" content="Amigos de Deus | Conforto Espiritual Diário" />
        <meta property="og:description" content="Receba versículos bíblicos e palavras de conforto personalizadas para o seu momento. Orientação espiritual diária baseada na Bíblia." />
        <meta property="og:image" content="https://amigosdedeus.com.br/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amigosdedeus.com.br/" />
        <meta name="twitter:title" content="Amigos de Deus | Conforto Espiritual Diário" />
        <meta name="twitter:description" content="Receba versículos bíblicos e palavras de conforto personalizadas para o seu momento. Orientação espiritual diária baseada na Bíblia." />
        <meta name="twitter:image" content="https://amigosdedeus.com.br/twitter-image.jpg" />
        
        {/* Schema.org markup para melhor SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Amigos de Deus",
            "url": "https://amigosdedeus.com.br",
            "description": "Aplicativo cristão que oferece versículos bíblicos personalizados e orientação espiritual diária.",
            "applicationCategory": "SpiritualityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "BRL"
            },
            "author": {
              "@type": "Organization",
              "name": "Amigos de Deus",
              "url": "https://amigosdedeus.com.br"
            }
          })}
        </script>
      </Helmet>

      <div className="space-y-8">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Amigos de Deus</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Receba conforto e orientação espiritual através da Palavra de Deus, personalizada para o seu momento.
          </p>
          
          {/* Link para a Bíblia */}
          <div className="flex justify-center mt-6">
            <Link 
              to="/biblia/ntlh/gn/1"
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              <Book size={20} className="mr-2" />
              Acessar a Bíblia Sagrada
            </Link>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Versículo do Dia</h2>
          <DailyVerse 
            verse={dailyVerse} 
            loading={loading && !dailyVerse} 
            onRefresh={handleDailyVerse} 
          />
        </section>

        <div className="mb-6 flex border-b dark:border-gray-700">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'guidance' ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('guidance')}
          >
            Nova Consulta
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('history')}
          >
            Histórico
          </button>
        </div>

        {activeTab === 'guidance' ? (
          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Orientação Personalizada</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Compartilhe como você está se sentindo hoje, e receba um versículo bíblico e uma mensagem de orientação personalizada.
              </p>
              <FeelingInput 
                feeling={feeling} 
                setFeeling={setFeeling} 
                onSubmit={handleGuidance} 
                loading={loading} 
              />
            </section>

            {guidance && (
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Sua Orientação</h2>
                <GuidanceDisplay 
                  guidance={guidance} 
                  onSave={saveGuidance} 
                  onShare={shareGuidance} 
                />
              </section>
            )}
          </div>
        ) : (
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Seu Histórico</h2>
            <HistoryList 
              history={history} 
              onDelete={deleteHistoryItem} 
              onNewConsultation={() => setActiveTab('guidance')} 
              formatDate={formatDate} 
            />
          </section>
        )}

        <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Sobre o Amigos de Deus</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            O Amigos de Deus é um aplicativo cristão dedicado a trazer conforto e orientação espiritual através de versículos bíblicos personalizados para seu dia a dia.
          </p>
          <div className="flex justify-center mt-4">
            <a href="/sobre" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              Saiba Mais
            </a>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Versículo do Dia</h2>
          <div className="flex justify-center mb-8">
            <Link 
              to="/biblia/ntlh/gn/1"
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Book size={18} className="mr-2" />
              Acessar a Bíblia Sagrada
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 