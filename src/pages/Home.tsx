import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Book, Share, Heart, Search } from 'lucide-react';
import { DailyVerse, FeelingInput, GuidanceDisplay, HistoryList } from '../components';
import type { SavedGuidance } from '../types';
import { getRandomVerse as getDailyVerse, getPersonalizedGuidance, AIResponse } from '../data/versesDatabase';

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

  const shareGuidance = (platform?: 'whatsapp' | 'copy') => {
    if (guidance) {
      const text = `Versículo: ${guidance.verse}\n\nMensagem: ${guidance.support}\n\nCompartilhado de Amigos de Deus`;
      
      if (platform === 'whatsapp') {
        const encodedText = encodeURIComponent(`*Versículo:* ${guidance.verse}\n\n*Mensagem:* ${guidance.support}\n\nCompartilhado de Amigos de Deus`);
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
        return;
      }
      
      if (navigator.share && !platform) {
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

  // Função para compartilhar o versículo do dia
  const shareDailyVerse = () => {
    if (dailyVerse) {
      const text = `Versículo do dia: ${dailyVerse}\n\nCompartilhado de Amigos de Deus`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Versículo do Dia',
          text
        }).catch(err => console.error('Erro ao compartilhar: ', err));
      } else {
        navigator.clipboard.writeText(text)
          .then(() => alert('Versículo copiado para a área de transferência!'))
          .catch(err => console.error('Erro ao copiar: ', err));
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Amigos de Deus - Conforto e Orientação Espiritual Personalizada</title>
        <meta name="description" content="Receba orientação espiritual personalizada baseada na Bíblia para ajudar nos momentos difíceis. Conforto através da palavra de Deus para ansiedade, tristeza e dúvidas." />
        <meta name="keywords" content="versículos bíblicos, conforto espiritual, palavra de Deus, orientação espiritual, versículo do dia, aplicativo cristão, mensagem bíblica, versículos para ansiedade, versículos para depressão, versículos de conforto, estudo bíblico online" />
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
        
        {/* Preload e preconnect para melhorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
              "url": "https://amigosdedeus.com.br",
              "logo": {
                "@type": "ImageObject",
                "url": "https://amigosdedeus.com.br/logo.png",
                "width": "192",
                "height": "192"
              }
            },
            "datePublished": "2023-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "keywords": [
              "versículos bíblicos",
              "conforto espiritual",
              "palavra de Deus",
              "orientação espiritual",
              "versículo do dia",
              "aplicativo cristão",
              "mensagem bíblica",
              "versículos para ansiedade",
              "versículos para depressão",
              "versículos de conforto",
              "estudo bíblico online"
            ]
          })}
        </script>
      </Helmet>

      <div className="space-y-8">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Amigos de Deus</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Receba conforto e orientação espiritual através da Palavra de Deus, personalizada para o seu momento.
          </p>
          
          {/* Links rápidos */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link 
              to="/biblia/ntlh/gn/1"
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              <Book size={20} className="mr-2" />
              Acessar a Bíblia Sagrada
            </Link>
            <Link 
              to="/sobre"
              className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              <Heart size={20} className="mr-2" />
              Sobre o Projeto
            </Link>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-center">Versículo do Dia</h2>
            <button 
              onClick={shareDailyVerse}
              className="flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              aria-label="Compartilhar versículo do dia"
            >
              <Share size={18} className="mr-1" />
              <span className="text-sm">Compartilhar</span>
            </button>
          </div>
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
                  onShare={(platform) => {
                    if (platform === 'whatsapp') {
                      const text = encodeURIComponent(`*Versículo:* ${guidance.verse}\n\n*Mensagem:* ${guidance.support}\n\nCompartilhado de Amigos de Deus`);
                      window.open(`https://wa.me/?text=${text}`, '_blank');
                    } else {
                      shareGuidance();
                    }
                  }}
                />
              </section>
            )}
          </div>
        ) : (
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Histórico de Orientações</h2>
            <HistoryList 
              items={history} 
              onDelete={deleteHistoryItem} 
              formatDate={formatDate}
              onNewConsultation={() => setActiveTab('guidance')}
            />
          </section>
        )}
        
        {/* Seção de recursos da Bíblia */}
        {/* <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Recursos Bíblicos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex flex-col items-center text-center">
              <Book size={32} className="text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="text-lg font-medium mb-2">Leitura Bíblica</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Acesse a Bíblia completa em diferentes traduções para sua leitura diária.
              </p>
              <Link 
                to="/biblia/ntlh/gn/1"
                className="mt-auto text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                Ler a Bíblia
              </Link>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg flex flex-col items-center text-center">
              <Heart size={32} className="text-purple-600 dark:text-purple-400 mb-2" />
              <h3 className="text-lg font-medium mb-2">Versículos por Tema</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Encontre versículos organizados por temas como amor, fé, esperança e mais.
              </p>
              <Link 
                to="/temas"
                className="mt-auto text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium"
              >
                Explorar Temas
              </Link>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg flex flex-col items-center text-center">
              <Search size={32} className="text-green-600 dark:text-green-400 mb-2" />
              <h3 className="text-lg font-medium mb-2">Busca Avançada</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Pesquise palavras-chave ou frases específicas em toda a Bíblia.
              </p>
              <Link 
                to="/busca"
                className="mt-auto text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium"
              >
                Buscar na Bíblia
              </Link>
            </div>
          </div>
        </section> */}
        
        {/* Seção de conteúdo SEO */}
        <section className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Encontre Conforto na Palavra de Deus</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Orientação Espiritual para Momentos Difíceis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A Bíblia Sagrada é uma fonte inesgotável de sabedoria e conforto para todos os momentos da vida. 
                Seja em tempos de ansiedade, tristeza, dúvida ou alegria, as escrituras oferecem palavras que 
                falam diretamente ao coração e à alma.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                O Amigos de Deus foi criado para ajudar você a encontrar orientação personalizada nas escrituras, 
                conectando seus sentimentos e experiências com versículos relevantes que podem trazer paz, 
                clareza e direção para sua jornada espiritual.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Versículos Bíblicos para Diferentes Emoções</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-medium mb-2 text-indigo-600 dark:text-indigo-400">Versículos para Ansiedade</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>"Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus." <strong>Filipenses 4:6-7</strong></li>
                    <li>"Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês." <strong>1 Pedro 5:7</strong></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-2 text-indigo-600 dark:text-indigo-400">Versículos para Tristeza</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>"O Senhor está perto dos que têm o coração quebrantado e salva os de espírito abatido." <strong>Salmos 34:18</strong></li>
                    <li>"Bem-aventurados os que choram, pois serão consolados." <strong>Mateus 5:4</strong></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Como Utilizar o Estudo Bíblico Online</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Nossa ferramenta de estudo bíblico online oferece acesso a diversas traduções da Bíblia, permitindo 
                que você compare versões e aprofunde seu entendimento das escrituras. Você pode:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Ler a Bíblia completa</strong> - Acesse todos os livros, capítulos e versículos em diferentes traduções</li>
                <li><strong>Buscar orientação personalizada</strong> - Compartilhe seus sentimentos e receba versículos relevantes</li>
                <li><strong>Salvar versículos favoritos</strong> - Guarde orientações importantes para consultar posteriormente</li>
                <li><strong>Compartilhar mensagens</strong> - Envie palavras de conforto para amigos e familiares</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Versículos Populares para Meditação Diária</h3>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg">
                <p className="italic text-lg mb-2">
                  "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
                </p>
                <p className="text-right font-medium">João 3:16</p>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="italic">
                    "Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser por mim."
                  </p>
                  <p className="text-right font-medium">João 14:6</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                  <p className="italic">
                    "Tudo posso naquele que me fortalece."
                  </p>
                  <p className="text-right font-medium">Filipenses 4:13</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Benefícios da Leitura Bíblica Diária</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                  <h4 className="text-lg font-medium mb-2 text-indigo-600 dark:text-indigo-400">Crescimento Espiritual</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    A leitura regular da Bíblia fortalece sua fé e aprofunda seu relacionamento com Deus, 
                    proporcionando crescimento espiritual contínuo e uma compreensão mais profunda dos 
                    ensinamentos divinos.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                  <h4 className="text-lg font-medium mb-2 text-indigo-600 dark:text-indigo-400">Paz Interior</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Meditar nas escrituras traz paz interior e tranquilidade, ajudando a enfrentar os desafios 
                    diários com uma perspectiva renovada e confiança na presença e no cuidado de Deus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Como funciona a orientação personalizada?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nossa ferramenta utiliza inteligência artificial para analisar como você está se sentindo e 
                encontrar versículos bíblicos e mensagens de apoio que sejam relevantes para o seu momento atual. 
                Compartilhe seus sentimentos e receba uma orientação espiritual personalizada baseada na Palavra de Deus.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Quais traduções da Bíblia estão disponíveis?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Oferecemos diversas traduções da Bíblia em português, incluindo Nova Tradução na Linguagem de Hoje (NTLH), 
                Almeida Revista e Corrigida (ARC), Nova Versão Internacional (NVI), entre outras. Você pode escolher a 
                tradução que preferir para sua leitura e estudo.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Posso usar o Amigos de Deus offline?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Atualmente, o Amigos de Deus requer conexão com a internet para funcionar completamente. No entanto, 
                estamos trabalhando em recursos offline que permitirão acesso a partes do conteúdo mesmo sem conexão. 
                Fique atento às atualizações!
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 