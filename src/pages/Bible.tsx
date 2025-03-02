import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

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
  const { version, book, chapter, verse } = useParams<{ 
    version?: string; 
    book?: string; 
    chapter?: string;
    verse?: string;
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
  const [selectedBook, setSelectedBook] = useState<string>(book || 'Gn');
  const [selectedChapter, setSelectedChapter] = useState<number>(chapter ? parseInt(chapter) : 1);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(verse ? parseInt(verse) : null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBookData, setCurrentBookData] = useState<BibleBook | null>(null);

  // Efeito para atualizar a URL quando os parâmetros mudam
  useEffect(() => {
    if (selectedVersion && selectedBook && selectedChapter) {
      const baseUrl = `/biblia/${selectedVersion.toLowerCase()}/${selectedBook.toLowerCase()}/${selectedChapter}`;
      const url = selectedVerse ? `${baseUrl}/${selectedVerse}` : baseUrl;
      navigate(url, { replace: true });
    }
  }, [selectedVersion, selectedBook, selectedChapter, selectedVerse, navigate]);

  // Efeito para atualizar os estados quando os parâmetros da URL mudam
  useEffect(() => {
    if (version) {
      setSelectedVersion(version.toUpperCase());
    }
    if (book) {
      // Garantir que o livro selecionado seja atualizado corretamente
      console.log('Book from URL:', book);
      setSelectedBook(book);
    }
    if (chapter) {
      setSelectedChapter(parseInt(chapter));
    }
    if (verse) {
      setSelectedVerse(parseInt(verse));
    } else {
      setSelectedVerse(null);
    }
  }, [version, book, chapter, verse]);

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
        console.error('Erro ao carregar dados da Bíblia:', err);
        setError('Não foi possível carregar a Bíblia. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchBibleData();
  }, [selectedVersion]);

  // Atualizar o livro atual quando os dados da Bíblia ou o livro selecionado mudar
  useEffect(() => {
    if (bibleData.length > 0) {
      const book = bibleData.find(b => b.abbrev.toLowerCase() === selectedBook.toLowerCase());
      console.log('Found book:', book?.abbrev, book?.name);
      setCurrentBookData(book || null);
      
      // Resetar o capítulo selecionado se o livro mudar e o capítulo atual não existir
      if (book && (selectedChapter > book.chapters.length)) {
        setSelectedChapter(1);
      }
    }
  }, [bibleData, selectedBook, selectedChapter]);

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
    console.log('Selected new book:', newBook);
    setSelectedBook(newBook);
    setSelectedChapter(1);
    setSelectedVerse(null);
    navigate(`/biblia/${selectedVersion.toLowerCase()}/${newBook.toLowerCase()}/1`);
  };

  // Função para lidar com a mudança de capítulo
  const handleChapterChange = (chapter: number) => {
    setSelectedChapter(chapter);
    setSelectedVerse(null);
    navigate(`/biblia/${selectedVersion.toLowerCase()}/${selectedBook.toLowerCase()}/${chapter}`);
  };

  // Função para lidar com a seleção de versículo
  const handleVerseClick = (verseNumber: number) => {
    // Se clicar no mesmo versículo, desseleciona
    if (selectedVerse === verseNumber) {
      setSelectedVerse(null);
      navigate(`/biblia/${selectedVersion.toLowerCase()}/${selectedBook.toLowerCase()}/${selectedChapter}`);
    } else {
      setSelectedVerse(verseNumber);
      navigate(`/biblia/${selectedVersion.toLowerCase()}/${selectedBook.toLowerCase()}/${selectedChapter}/${verseNumber}`);
    }
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
    if (!currentBookData || !currentBookData.chapters || !currentBookData.chapters[selectedChapter - 1]) {
      return <p>Nenhum versículo disponível.</p>;
    }

    const verses = currentBookData.chapters[selectedChapter - 1];
    
    return (
      <div className="space-y-2">
        {verses.map((verse, index) => {
          const verseNumber = index + 1;
          const isSelected = selectedVerse === verseNumber;
          
          return (
            <div 
              key={verseNumber} 
              className={`flex p-2 rounded-md transition-colors ${
                isSelected 
                  ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              ref={isSelected ? selectedVerseRef : null}
              onClick={() => handleVerseClick(verseNumber)}
            >
              <span 
                className={`text-sm font-semibold mr-2 w-6 flex-shrink-0 ${
                  isSelected 
                    ? 'text-blue-700 dark:text-blue-300' 
                    : 'text-blue-600 dark:text-blue-400'
                }`}
              >
                {verseNumber}
              </span>
              <p className="text-gray-800 dark:text-gray-200">{verse}</p>
            </div>
          );
        })}
      </div>
    );
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

  // Gerar título da página e meta descrição para SEO
  const pageTitle = currentBookData 
    ? `${getBookName(currentBookData.abbrev)} ${selectedChapter}${selectedVerse ? `:${selectedVerse}` : ''} - ${bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion} | Amigos de Deus`
    : 'Bíblia Sagrada | Amigos de Deus';
    
  const pageDescription = currentBookData 
    ? `Leia ${getBookName(currentBookData.abbrev)} capítulo ${selectedChapter}${selectedVerse ? ` versículo ${selectedVerse}` : ''} na versão ${bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion} da Bíblia Sagrada. Estudo bíblico online gratuito.`
    : 'Leia a Bíblia Sagrada em diferentes versões. Navegue pelos livros e capítulos da Bíblia. Estudo bíblico online gratuito.';

  // URL canônica para SEO
  const canonicalUrl = selectedVerse 
    ? `https://amigosdedeus.com/biblia/${selectedVersion.toLowerCase()}/${selectedBook.toLowerCase()}/${selectedChapter}/${selectedVerse}`
    : `https://amigosdedeus.com/biblia/${selectedVersion.toLowerCase()}/${selectedBook.toLowerCase()}/${selectedChapter}`;

  // Gerar dados estruturados para SEO (Schema.org)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "CreativeWork",
      "name": currentBookData ? `${getBookName(currentBookData.abbrev)} ${selectedChapter}` : "Bíblia Sagrada",
      "author": "Bíblia Sagrada",
      "inLanguage": "pt-BR",
      "version": bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion
    }
  };

  return (
    <div className="py-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Meta tags adicionais para SEO */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Amigos de Deus" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* Keywords relevantes para SEO */}
        <meta name="keywords" content={`bíblia online, ${bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion}, ${currentBookData ? getBookName(currentBookData.abbrev) : 'bíblia sagrada'}, versículos bíblicos, estudo bíblico`} />
        
        {/* Dados estruturados JSON-LD para SEO */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        
        {/* Preload para melhorar performance */}
        <link rel="preload" href={`/bible/${selectedVersion}.json`} as="fetch" crossOrigin="anonymous" />
        
        {/* Preconnect para domínios externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

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
          Versão da Bíblia:
        </label>
        <select
          id="version-select"
          value={selectedVersion}
          onChange={handleVersionChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {bibleVersions.map((version) => (
            <option key={version.id} value={version.id}>
              {version.name} ({version.id})
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
          <div className="mb-6">
            <label htmlFor="book-select" className="block text-sm font-medium mb-2">
              Livro:
            </label>
            <select
              key={`book-select-${selectedBook}`}
              id="book-select"
              value={selectedBook}
              onChange={handleBookChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {bibleData.length > 0 && bibleData.map((book) => {
                return (
                  <option key={book.abbrev} value={book.abbrev}>
                    {book.name}
                  </option>
                );
              })}
            </select>
          </div>

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
        </div>
      )}
    </div>
  );
};

export default Bible; 