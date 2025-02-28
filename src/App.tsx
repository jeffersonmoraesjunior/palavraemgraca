import React, { useState, useEffect } from 'react';
import { Sun, Moon, Plus, Minus } from 'lucide-react';
import { getDailyVerse, getPersonalizedGuidance } from './utils/ai';
import type { AIResponse, Theme, SavedGuidance } from './types';
import { DailyVerse, FeelingInput, GuidanceDisplay, HistoryList } from './components';

// Main App Component
function App() {
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
    document.documentElement.classList.toggle('dark', theme.isDark);
    document.documentElement.style.fontSize = `${theme.fontSize}px`;
    try {
      localStorage.setItem('theme', JSON.stringify(theme));
    } catch (error) {
      console.warn('Erro ao salvar tema no localStorage:', error);
    }
  }, [theme]);

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
      console.error('Error fetching daily verse:', error);
    }
    setLoading(false);
  };

  const handleGuidance = async () => {
    if (feeling.length < 20) {
      alert('Por favor, escreva pelo menos 20 caracteres sobre como está se sentindo.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await getPersonalizedGuidance(feeling);
      setGuidance(response);
    } catch (error) {
      console.error('Error fetching guidance:', error);
    }
    setLoading(false);
  };

  const saveGuidance = () => {
    if (guidance && feeling) {
      const newEntry: SavedGuidance = {
        id: Date.now(),
        date: new Date().toISOString(),
        feeling,
        guidance
      };
      
      setHistory(prev => [newEntry, ...prev]);
      alert('Salvo com sucesso!');
    }
  };

  const deleteHistoryItem = (id: number) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const shareGuidance = (platform: 'whatsapp' | 'copy') => {
    if (!guidance) return;
    
    const text = `🙏 Palavra de Conforto 🙏\n\n📖 ${guidance.verse}\n\n💭 ${guidance.support}\n\n✨ Dicas:\n${guidance.tips.map((tip, i) => `${i+1}. ${tip}`).join('\n')}`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(text)
        .then(() => alert('Texto copiado para a área de transferência!'))
        .catch(err => console.error('Erro ao copiar: ', err));
    }
  };

  const adjustFontSize = (increment: boolean) => {
    setTheme(prev => ({
      ...prev,
      fontSize: Math.min(Math.max(prev.fontSize + (increment ? 2 : -2), 12), 24)
    }));
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

  // Render
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="mb-8" role="banner">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-center" id="main-heading">Caixinha de Promessas</h1>
            <div className="flex gap-2" role="toolbar" aria-label="Ajustes de acessibilidade">
              <button
                onClick={() => adjustFontSize(false)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Diminuir tamanho da fonte"
                title="Diminuir tamanho da fonte"
              >
                <Minus size={20} aria-hidden="true" />
              </button>
              <button
                onClick={() => adjustFontSize(true)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Aumentar tamanho da fonte"
                title="Aumentar tamanho da fonte"
              >
                <Plus size={20} aria-hidden="true" />
              </button>
              <button
                onClick={() => setTheme(prev => ({ ...prev, isDark: !prev.isDark }))}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={theme.isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
                title={theme.isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
              >
                {theme.isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>
          
          <DailyVerse 
            verse={dailyVerse} 
            loading={loading} 
            onRefresh={handleDailyVerse} 
          />
        </header>

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
            <FeelingInput 
              feeling={feeling} 
              setFeeling={setFeeling} 
              onSubmit={handleGuidance} 
              loading={loading} 
            />

            {guidance && (
              <GuidanceDisplay 
                guidance={guidance} 
                onSave={saveGuidance} 
                onShare={shareGuidance} 
              />
            )}
          </div>
        ) : (
          <HistoryList 
            history={history} 
            onDelete={deleteHistoryItem} 
            onNewConsultation={() => setActiveTab('guidance')} 
            formatDate={formatDate} 
          />
        )}
        
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400" role="contentinfo">
          <p>Caixinha de Promessas &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Desenvolvido com <span aria-label="amor">❤️</span> para confortar e inspirar</p>
        </footer>
      </div>
    </div>
  );
}

export default App;