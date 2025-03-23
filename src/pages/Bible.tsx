import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { getBookDescription } from '../data/bibleBookDescriptions';
import Breadcrumb from '../components/Breadcrumb';
import ShareButton from '../components/ShareButton';

// Tipos para a estrutura da Bíblia
interface BibleVerse {
  text: string;
  number: number;
}

interface BibleChapter {
  verses: BibleVerse[];
  number: number;
}

interface BibleBook {
  abbrev: string;
  name: string;
  chapters: string[][];
}

interface BibleVersion {
  id: string;
  name: string;
}

// Componente principal da página da Bíblia
const Bible: React.FC = () => {
  const navigate = useNavigate();
  const { version, book, chapter } = useParams<{ 
    version?: string; 
    book?: string; 
    chapter?: string;
  }>();
  
  // Referência para o versículo selecionado
  const selectedVerseRef = useRef<HTMLDivElement>(null);
  
  // Lista de versões disponíveis
  const bibleVersions: BibleVersion[] = [
    { id: 'ACF', name: 'Almeida Corrigida Fiel' },
    { id: 'ARA', name: 'Almeida Revista e Atualizada' },
    { id: 'ARC', name: 'Almeida Revista e Corrigida' },
    { id: 'AS21', name: 'Almeida Século 21' },
    { id: 'JFAA', name: 'João Ferreira de Almeida Atualizada' },
    { id: 'KJA', name: 'King James Atualizada' },
    { id: 'KJF', name: 'King James Fiel' },
    { id: 'NAA', name: 'Nova Almeida Atualizada' },
    { id: 'NBV', name: 'Nova Bíblia Viva' },
    { id: 'NTLH', name: 'Nova Tradução na Linguagem de Hoje' },
    { id: 'NVI', name: 'Nova Versão Internacional' },
    { id: 'NVT', name: 'Nova Versão Transformadora' },
    { id: 'TB', name: 'Tradução Brasileira' },
  ];

  // Estados
  const [selectedVersion, setSelectedVersion] = useState<string>(version?.toUpperCase() || 'NTLH');
  const [bibleData, setBibleData] = useState<BibleBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>(book || 'gn');
  const [selectedChapter, setSelectedChapter] = useState<number>(chapter ? parseInt(chapter) : 1);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBookData, setCurrentBookData] = useState<BibleBook | null>(null);

  // Efeito para atualizar a URL quando os parâmetros mudam
  useEffect(() => {
    if (selectedVersion && selectedBook && selectedChapter) {
      const normalizedBook = normalizeForUrl(selectedBook);
      const baseUrl = `/biblia/${selectedVersion.toLowerCase()}/${normalizedBook}/${selectedChapter}`;
      
      // Usar fragmento (hash) para o versículo em vez de parâmetro de caminho
      const url = selectedVerse ? `${baseUrl}#${selectedVerse}` : baseUrl;
      
      navigate(url, { replace: true });
    }
  }, [selectedVersion, selectedBook, selectedChapter, selectedVerse, navigate]);

  // Efeito para atualizar os estados quando os parâmetros da URL mudam
  useEffect(() => {
    if (version) {
      setSelectedVersion(version.toUpperCase());
    }
    if (book) {
      if (bibleData.length > 0) {
        // Primeiro, tenta encontrar o livro diretamente pela abreviação
        let foundBook = bibleData.find(b => normalizeForUrl(b.abbrev) === book);
        
        // Se não encontrar, tenta encontrar pela abreviação normalizada
        if (!foundBook) {
          foundBook = bibleData.find(b => 
            normalizeForUrl(b.abbrev) === normalizeForUrl(book) ||
            normalizeForUrl(b.name).includes(normalizeForUrl(book))
          );
        }
        
        if (foundBook) {
          setSelectedBook(foundBook.abbrev);
        } else {
          // Se não encontrar o livro, usa o valor da URL como está
          setSelectedBook(book);
        }
      } else {
        // Se os dados da Bíblia ainda não foram carregados, usa o valor da URL como está
        setSelectedBook(book);
      }
    }
    if (chapter) {
      setSelectedChapter(parseInt(chapter));
    }
    // Não precisamos mais ler o parâmetro verse aqui, pois agora usamos o fragmento
  }, [version, book, chapter, bibleData]);

  // Efeito para ler o fragmento (hash) da URL e definir o versículo selecionado
  useEffect(() => {
    // Função para lidar com mudanças no hash da URL
    const handleHashChange = () => {
      // Obter o fragmento da URL (remove o # do início)
      const hash = window.location.hash.replace('#', '');
      
      // Se o fragmento for um número, define como versículo selecionado
      if (hash && /^\d+$/.test(hash)) {
        const verseNumber = parseInt(hash);
        setSelectedVerse(verseNumber);
      } else {
        setSelectedVerse(null);
      }
    };
    
    // Verificar o hash inicial
    handleHashChange();
    
    // Adicionar listener para mudanças no hash
    window.addEventListener('hashchange', handleHashChange);
    
    // Remover listener ao desmontar o componente
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Efeito para rolar até o versículo selecionado
  useEffect(() => {
    if (selectedVerse && selectedVerseRef.current) {
      // Pequeno atraso para garantir que o DOM foi atualizado
      setTimeout(() => {
        selectedVerseRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 300);
    }
  }, [selectedVerse, loading]);

  // Carregar dados da Bíblia quando a versão selecionada mudar
  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        setLoading(true);
        // Adicionando um cache-control para o navegador
        const response = await fetch(`/bible/${selectedVersion}.json`, {
          headers: {
            'Cache-Control': 'max-age=3600'
          }
        });
        if (!response.ok) {
          throw new Error(`Erro ao carregar a Bíblia: ${response.statusText}`);
        }
        const data = await response.json();
        setBibleData(data);
        setLoading(false);
      } catch (err) {
        setError('Não foi possível carregar a Bíblia. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchBibleData();
  }, [selectedVersion]);

  // Efeito para atualizar o livro atual quando os dados da Bíblia ou o livro selecionado mudar
  useEffect(() => {
    if (bibleData.length > 0) {
      // Encontrar o livro pelo nome ou abreviação
      let book = bibleData.find(b => b.abbrev.toLowerCase() === selectedBook.toLowerCase());
      
      // Se não encontrar pela abreviação, tenta encontrar pelo nome
      if (!book) {
        book = bibleData.find(b => b.name.toLowerCase().includes(selectedBook.toLowerCase()));
      }
            
      if (book) {
        setCurrentBookData(book);
        
        // Resetar o capítulo selecionado se o livro mudar e o capítulo atual não existir
        if (selectedChapter > book.chapters.length) {
          setSelectedChapter(1);
        }
      } else {
        setCurrentBookData(null);
      }
    }
  }, [bibleData, selectedBook, selectedChapter]);

  // Função para normalizar caracteres especiais para URLs
  const normalizeForUrl = (text: string): string => {
    const specialChars: Record<string, string> = {
      'jó': 'jo',
      'êx': 'ex',
      'gên': 'gen',
      'núm': 'num',
      'provér': 'prov',
      'ecle': 'ec',
      'cantár': 'cant',
      'isaí': 'is',
      'jeremí': 'jr',
      'ezequí': 'ez',
      'oséi': 'os',
      'amós': 'am',
      'miquéi': 'mq',
      'naúm': 'na',
      'sofoní': 'sf',
      'agéu': 'ag',
      'zacarí': 'zc',
      'malaquí': 'ml'
    };

    const normalized = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .toLowerCase();

    // Verifica se há uma substituição específica para o texto normalizado
    for (const [key, value] of Object.entries(specialChars)) {
      if (normalized.startsWith(key)) {
        return value + normalized.slice(key.length);
      }
    }

    return normalized;
  };

  // Função para obter o nome completo do livro a partir da abreviação
  const getBookName = (abbrev: string): string => {
    const bookNames: Record<string, string> = {
      'Gn': 'Gênesis',
      'Ex': 'Êxodo',
      'Lv': 'Levítico',
      'Nm': 'Números',
      'Dt': 'Deuteronômio',
      'Js': 'Josué',
      'Jz': 'Juízes',
      'Rt': 'Rute',
      '1Sm': '1 Samuel',
      '2Sm': '2 Samuel',
      '1Rs': '1 Reis',
      '2Rs': '2 Reis',
      '1Cr': '1 Crônicas',
      '2Cr': '2 Crônicas',
      'Ed': 'Esdras',
      'Ne': 'Neemias',
      'Et': 'Ester',
      'Jó': 'Jó',
      'Sl': 'Salmos',
      'Pv': 'Provérbios',
      'Ec': 'Eclesiastes',
      'Ct': 'Cânticos',
      'Is': 'Isaías',
      'Jr': 'Jeremias',
      'Lm': 'Lamentações',
      'Ez': 'Ezequiel',
      'Dn': 'Daniel',
      'Os': 'Oséias',
      'Jl': 'Joel',
      'Am': 'Amós',
      'Ob': 'Obadias',
      'Jn': 'Jonas',
      'Mq': 'Miquéias',
      'Na': 'Naum',
      'Hc': 'Habacuque',
      'Sf': 'Sofonias',
      'Ag': 'Ageu',
      'Zc': 'Zacarias',
      'Ml': 'Malaquias',
      'Mt': 'Mateus',
      'Mc': 'Marcos',
      'Lc': 'Lucas',
      'Jo': 'João',
      'At': 'Atos',
      'Rm': 'Romanos',
      '1Co': '1 Coríntios',
      '2Co': '2 Coríntios',
      'Gl': 'Gálatas',
      'Ef': 'Efésios',
      'Fp': 'Filipenses',
      'Cl': 'Colossenses',
      '1Ts': '1 Tessalonicenses',
      '2Ts': '2 Tessalonicenses',
      '1Tm': '1 Timóteo',
      '2Tm': '2 Timóteo',
      'Tt': 'Tito',
      'Fm': 'Filemom',
      'Hb': 'Hebreus',
      'Tg': 'Tiago',
      '1Pe': '1 Pedro',
      '2Pe': '2 Pedro',
      '1Jo': '1 João',
      '2Jo': '2 João',
      '3Jo': '3 João',
      'Jd': 'Judas',
      'Ap': 'Apocalipse'
    };
    
    return bookNames[abbrev] || abbrev;
  };

  // Função para lidar com a mudança de versão
  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVersion = e.target.value;
    setSelectedVersion(newVersion);
    setSelectedVerse(null);
    navigate(`/biblia/${newVersion.toLowerCase()}/${selectedBook.toLowerCase()}/1`);
  };

  // Função para lidar com a mudança de livro
  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBook = e.target.value;    
    // Atualizar o estado
    setSelectedBook(newBook);
    setSelectedChapter(1);
    setSelectedVerse(null);
    
    // Navegar para a nova URL com caracteres normalizados
    const normalizedBook = normalizeForUrl(newBook);
    const newUrl = `/biblia/${selectedVersion.toLowerCase()}/${normalizedBook}/1`;
    navigate(newUrl);
  };

  // Função para lidar com a mudança de capítulo
  const handleChapterChange = (chapter: number) => {
    setSelectedChapter(chapter);
    setSelectedVerse(null);
    navigate(`/biblia/${selectedVersion.toLowerCase()}/${selectedBook.toLowerCase()}/${chapter}`);
  };

  // Função para lidar com a seleção de versículo
  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerse(verseNumber);
    
    // Usar fragmento (hash) para o versículo em vez de parâmetro de caminho
    const normalizedBook = normalizeForUrl(selectedBook);
    const url = `/biblia/${selectedVersion.toLowerCase()}/${normalizedBook}/${selectedChapter}#${verseNumber}`;
    
    // Atualizar a URL sem recarregar a página
    window.history.replaceState(null, '', url);
  };

  // Função para navegar para o próximo capítulo
  const goToNextChapter = () => {
    if (currentBookData && selectedChapter < currentBookData.chapters.length) {
      handleChapterChange(selectedChapter + 1);
    } else if (bibleData.length > 0) {
      // Se estiver no último capítulo do livro atual, vá para o próximo livro
      const currentBookIndex = bibleData.findIndex(b => b.abbrev.toLowerCase() === selectedBook.toLowerCase());
      if (currentBookIndex < bibleData.length - 1) {
        const nextBook = bibleData[currentBookIndex + 1];
        setSelectedBook(nextBook.abbrev);
        setSelectedChapter(1);
        setSelectedVerse(null);
        navigate(`/biblia/${selectedVersion.toLowerCase()}/${nextBook.abbrev.toLowerCase()}/1`);
      }
    }
  };

  // Função para navegar para o capítulo anterior
  const goToPreviousChapter = () => {
    if (selectedChapter > 1) {
      handleChapterChange(selectedChapter - 1);
    } else if (bibleData.length > 0) {
      // Se estiver no primeiro capítulo do livro atual, vá para o livro anterior
      const currentBookIndex = bibleData.findIndex(b => b.abbrev.toLowerCase() === selectedBook.toLowerCase());
      if (currentBookIndex > 0) {
        const previousBook = bibleData[currentBookIndex - 1];
        const lastChapter = previousBook.chapters.length;
        setSelectedBook(previousBook.abbrev);
        setSelectedChapter(lastChapter);
        setSelectedVerse(null);
        navigate(`/biblia/${selectedVersion.toLowerCase()}/${previousBook.abbrev.toLowerCase()}/${lastChapter}`);
      }
    }
  };

  // Verificar se está no primeiro capítulo da Bíblia (Gênesis 1)
  const isFirstChapter = (): boolean => {
    if (bibleData.length === 0) return false;
    
    // Verificar se o livro atual é o primeiro livro (Gênesis)
    const firstBook = bibleData[0];
    return selectedBook.toLowerCase() === firstBook.abbrev.toLowerCase() && selectedChapter === 1;
  };

  // Verificar se está no último capítulo da Bíblia (Apocalipse 22)
  const isLastChapter = (): boolean => {
    if (bibleData.length === 0) return false;
    
    // Verificar se o livro atual é o último livro (Apocalipse)
    const lastBook = bibleData[bibleData.length - 1];
    return selectedBook.toLowerCase() === lastBook.abbrev.toLowerCase() && 
           currentBookData !== null && selectedChapter === currentBookData.chapters.length;
  };

  // Renderizar versículos do capítulo atual
  const renderVerses = () => {
    if (!currentBookData || !currentBookData.chapters[selectedChapter - 1]) {
      return null;
    }

    return currentBookData.chapters[selectedChapter - 1].map((verse, index) => {
      const verseNumber = index + 1;
      const isSelected = selectedVerse === verseNumber;
      
      return (
        <div
          key={verseNumber}
          ref={isSelected ? selectedVerseRef : null}
          className={`py-2 flex items-start gap-2 ${
            isSelected ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500' : ''
          }`}
          onClick={() => handleVerseClick(verseNumber)}
        >
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 min-w-[1.5rem] mt-1 pr-3">
            {verseNumber}
          </span>
          <div className="flex-1 flex items-start justify-between gap-2">
            <p className="text-gray-700 dark:text-gray-300">{verse}</p>
            {isSelected && (
              <ShareButton 
                text={verse}
                reference={`${currentBookData.name} ${selectedChapter}:${verseNumber}`}
              />
            )}
          </div>
        </div>
      );
    });
  };

  // Renderizar seletor de capítulos
  const renderChapterSelector = () => {
    if (!currentBookData || !currentBookData.chapters) {
      return null;
    }

    const chapterCount = currentBookData.chapters.length;
    
    return (
      <div className="flex flex-wrap gap-2 my-4">
        {Array.from({ length: chapterCount }, (_, i) => i + 1).map(chapter => (
          <button
            key={chapter}
            onClick={() => handleChapterChange(chapter)}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedChapter === chapter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {chapter}
          </button>
        ))}
      </div>
    );
  };

  // Função para construir títulos e descrições para SEO
  const buildSeoTitles = () => {
    // Título da página
    let pageTitle = 'Bíblia Sagrada Online - Leitura e Estudo Bíblico';
    
    // Descrição da página
    let pageDescription = 'Leia a Bíblia Sagrada online, compare versões, estude versículos e compartilhe passagens bíblicas. Ferramenta gratuita para estudo e meditação diária.';
    
    // Palavras-chave
    let pageKeywords = 'bíblia online, estudo bíblico, versículos bíblicos, leitura da bíblia, meditação diária';
    
    // Se tiver versão selecionada
    if (selectedVersion) {
      const versionName = bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion;
      pageTitle = `${versionName} - Bíblia Sagrada Online para Leitura e Estudo`;
      pageDescription = `Leia a Bíblia ${versionName} online gratuitamente. Navegue por livros, capítulos e versículos para estudo bíblico e meditação diária.`;
      pageKeywords = `${versionName}, bíblia ${versionName.toLowerCase()}, versículos ${versionName.toLowerCase()}, estudo bíblico ${versionName.toLowerCase()}`;
      
      // Se tiver livro selecionado
      if (currentBookData) {
        const bookName = currentBookData.name;
        pageTitle = `${bookName} - ${versionName} | Leitura e Estudo Bíblico Online`;
        pageDescription = `Leia o livro de ${bookName} na Bíblia ${versionName} online. Encontre ensinamentos, histórias e versículos para meditação e estudo bíblico.`;
        pageKeywords = `${bookName}, livro de ${bookName}, ${bookName} na bíblia, ${bookName} ${versionName.toLowerCase()}, versículos de ${bookName}`;
        
        // Se tiver capítulo selecionado
        if (selectedChapter) {
          pageTitle = `${bookName} ${selectedChapter} - ${versionName} | Versículos para Estudo e Reflexão`;
          pageDescription = `Leia ${bookName} capítulo ${selectedChapter} na Bíblia ${versionName}. Estude, medite e compartilhe versículos deste capítulo para crescimento espiritual.`;
          pageKeywords = `${bookName} ${selectedChapter}, ${bookName} capítulo ${selectedChapter}, versículos de ${bookName} ${selectedChapter}, estudo de ${bookName} ${selectedChapter}, ${bookName} ${selectedChapter} explicação`;
          
          // Se tiver versículo selecionado
          if (selectedVerse) {
            pageTitle = `${bookName} ${selectedChapter}:${selectedVerse} - ${versionName} | Versículo para Meditação`;
            pageDescription = `"${getVerseText(selectedVerse)}" - ${bookName} ${selectedChapter}:${selectedVerse} na Bíblia ${versionName}. Medite neste versículo e compartilhe esta palavra.`;
            pageKeywords = `${bookName} ${selectedChapter}:${selectedVerse}, versículo ${bookName} ${selectedChapter}:${selectedVerse}, significado de ${bookName} ${selectedChapter}:${selectedVerse}, explicação de ${bookName} ${selectedChapter}:${selectedVerse}`;
          }
        }
      }
    }
    
    // URL canônica
    const normalizedBook = currentBookData ? normalizeForUrl(currentBookData.abbrev) : '';
    const canonicalUrl = currentBookData && selectedChapter
      ? `${window.location.origin}/biblia/${selectedVersion?.toLowerCase()}/${normalizedBook}/${selectedChapter}`
      : `${window.location.origin}/biblia`;
    
    return { pageTitle, pageDescription, pageKeywords, canonicalUrl };
  };
  
  // Função auxiliar para obter o texto do versículo selecionado
  const getVerseText = (verseNumber: number): string => {
    if (!currentBookData || !selectedChapter) return '';
    
    try {
      const chapterData = currentBookData.chapters[selectedChapter - 1];
      if (!chapterData || !chapterData[verseNumber - 1]) return '';
      
      // Limitar o texto a 150 caracteres para a meta description
      const verseText = chapterData[verseNumber - 1];
      return verseText.length > 150 ? verseText.substring(0, 147) + '...' : verseText;
    } catch (error) {
      console.error('Erro ao obter texto do versículo:', error);
      return '';
    }
  };

  const { pageTitle, pageDescription, pageKeywords, canonicalUrl } = buildSeoTitles();

  // Função para construir dados estruturados para SEO
  const buildSchemaData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": pageTitle,
      "description": pageDescription,
      "author": {
        "@type": "Organization",
        "name": "Palavra em Graça"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Palavra em Graça",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.svg`,
          "width": "192",
          "height": "192"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "datePublished": "2023-01-01T00:00:00Z",
      "dateModified": new Date().toISOString(),
      "about": {
        "@type": "Thing",
        "name": currentBookData ? `${currentBookData.name} ${selectedChapter}` : "Bíblia Sagrada"
      },
      "keywords": pageKeywords.split(', '),
      "isAccessibleForFree": "True",
      "inLanguage": "pt-BR"
    };
  };

  // Função para gerar os itens do breadcrumb
  const getBreadcrumbItems = () => {
    const items = [
      { name: 'Início', path: '/', isLast: false },
      { name: 'Bíblia', path: '/biblia', isLast: false }
    ];

    if (selectedVersion) {
      const versionName = bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion;
      items.push({
        name: versionName,
        path: `/biblia/${selectedVersion.toLowerCase()}`,
        isLast: false
      });

      if (currentBookData) {
        items.push({
          name: currentBookData.name,
          path: `/biblia/${selectedVersion.toLowerCase()}/${normalizeForUrl(currentBookData.abbrev)}`,
          isLast: !selectedChapter
        });

        if (selectedChapter) {
          items.push({
            name: `Capítulo ${selectedChapter}`,
            path: `/biblia/${selectedVersion.toLowerCase()}/${normalizeForUrl(currentBookData.abbrev)}/${selectedChapter}`,
            isLast: true
          });
        }
      } else {
        items[items.length - 1].isLast = true;
      }
    } else {
      items[1].isLast = true;
    }

    return items;
  };

  const schemaData = buildSchemaData();

  // Componente customizado para o select de livros
  const CustomBookSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Encontrar o livro atual
    const currentBook = bibleData.find(b => b.abbrev.toLowerCase() === selectedBook.toLowerCase());
    const displayName = currentBook ? currentBook.name : getBookName(selectedBook);
    
    // Função para selecionar um livro
    const selectBook = (book: BibleBook) => {
      setIsOpen(false);
      setSelectedBook(book.abbrev);
      setSelectedChapter(1);
      setSelectedVerse(null);
      
      // Usar a versão normalizada para a URL
      const normalizedBook = normalizeForUrl(book.abbrev);
      navigate(`/biblia/${selectedVersion.toLowerCase()}/${normalizedBook}/1`);
    };
    
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Livro:
        </label>
        <div className="relative">
          <button
            type="button"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-left flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{displayName}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {bibleData.length > 0 && bibleData.map((book) => (
                <button
                  key={book.abbrev}
                  type="button"
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    book.abbrev === selectedBook ? 'bg-blue-100 dark:bg-blue-900' : ''
                  }`}
                  onClick={() => selectBook(book)}
                >
                  {book.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="py-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Meta tags adicionais para SEO */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Palavra em Graça" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* Dados estruturados JSON-LD para SEO */}
        <script type="application/ld+json">
          {JSON.stringify(buildSchemaData())}
        </script>
      </Helmet>

      {/* Adiciona o componente Breadcrumb */}
      <Breadcrumb items={getBreadcrumbItems()} />

      <h1 className="text-3xl font-bold mb-6 text-center">Bíblia Sagrada</h1>

      {/* Link para o índice da Bíblia */}
      <div className="text-center mb-6">
        <Link 
          to={`/biblia/indice/${selectedVersion.toLowerCase()}`}
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
        >
          <BookOpen size={18} className="mr-1" />
          Ver índice completo da Bíblia
        </Link>
      </div>

      {/* Seletor de versão */}
      <div className="mb-6">
        <label htmlFor="version-select" className="block text-sm font-medium mb-2">
          Versão:
        </label>
        <select
          id="version-select"
          value={selectedVersion}
          onChange={handleVersionChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {bibleVersions.map((version) => (
            <option key={version.id} value={version.id}>
              {version.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-md">
          {error}
        </div>
      ) : (
        <div>
          {/* Seletor de livro */}
          <CustomBookSelect />

          {/* Título do livro e capítulo atual */}
          {currentBookData && (
            <h2 className="text-2xl font-bold text-center mb-6">
              {currentBookData.name} {selectedChapter}
            </h2>
          )}

          {/* Seletor de capítulos */}
          {renderChapterSelector()}

          {/* Instruções para o usuário */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic text-center">
            Clique em um versículo para selecioná-lo e obter um link direto.
          </p>

          {/* Versículos com lazy loading para capítulos grandes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {currentBookData && currentBookData.chapters && currentBookData.chapters[selectedChapter - 1]?.length > 50 ? (
              <Suspense fallback={<div className="text-center py-4">Carregando versículos...</div>}>
                {renderVerses()}
              </Suspense>
            ) : (
              renderVerses()
            )}
          </div>

          {/* Navegação entre capítulos */}
          <div className="flex justify-between mt-6">
            <button
              onClick={goToPreviousChapter}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                isFirstChapter()
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              aria-label="Capítulo anterior"
              disabled={isFirstChapter()}
            >
              <ChevronLeft size={20} className="mr-1" />
              Anterior
            </button>
            
            <button
              onClick={goToNextChapter}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                isLastChapter()
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              aria-label="Próximo capítulo"
              disabled={isLastChapter()}
            >
              Próximo
              <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
          
          {/* Seção de conteúdo para SEO */}
          {currentBookData && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Sobre {currentBookData.name}</h2>
              
              {(() => {
                const bookDesc = getBookDescription(currentBookData.abbrev);
                if (bookDesc) {
                  return (
                    <div className="prose dark:prose-invert max-w-none space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold">Visão Geral</h3>
                        <p>{bookDesc.overview}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">Informações Básicas</h3>
                        <ul className="list-none space-y-2">
                          <li><strong>Autor:</strong> {bookDesc.author}</li>
                          <li><strong>Data:</strong> {bookDesc.date}</li>
                          <li><strong>Categoria:</strong> {bookDesc.category}</li>
                          <li><strong>Tema Principal:</strong> {bookDesc.theme}</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">Propósito</h3>
                        <p>{bookDesc.purpose}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">Contexto Histórico</h3>
                        <p>{bookDesc.historicalContext}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">Significado Teológico</h3>
                        <p>{bookDesc.theologicalSignificance}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">Aplicação Prática</h3>
                        <p>{bookDesc.practicalApplication}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">Versículos-Chave</h3>
                        <ul className="list-none space-y-2">
                          {bookDesc.keyVerses.map((verse, index) => (
                            <li key={index} className="italic">"{verse}"</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">Personagens Principais</h3>
                        <ul className="list-disc list-inside">
                          {bookDesc.mainCharacters.map((character, index) => (
                            <li key={index}>{character}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">Estrutura do Livro</h3>
                        <ul className="list-disc list-inside">
                          {bookDesc.outline.map((section, index) => (
                            <li key={index}>{section}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }

                // Fallback para livros que ainda não têm descrição detalhada
                return (
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      O livro de {currentBookData.name} é uma parte importante da Bíblia Sagrada. 
                      Nesta página, você pode ler {currentBookData.name} capítulo {selectedChapter} na versão {bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion}.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-4">Estudo Bíblico de {currentBookData.name}</h3>
                    <p>
                      Estudar {currentBookData.name} pode trazer revelações importantes para sua vida espiritual. 
                      Este livro contém {currentBookData.chapters.length} capítulos e está disponível em diversas traduções da Bíblia.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-4">Como Utilizar Esta Ferramenta</h3>
                    <ul>
                      <li>Navegue facilmente entre capítulos e versículos de {currentBookData.name}</li>
                      <li>Compare diferentes versões da Bíblia</li>
                      <li>Compartilhe versículos específicos com amigos</li>
                      <li>Estude a palavra de Deus em qualquer dispositivo</li>
                    </ul>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bible; 