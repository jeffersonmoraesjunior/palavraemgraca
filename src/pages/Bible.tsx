import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

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
  const [selectedVersion, setSelectedVersion] = useState<string>('NTLH');
  const [bibleData, setBibleData] = useState<BibleBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('Gn');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBookData, setCurrentBookData] = useState<BibleBook | null>(null);

  // Carregar dados da Bíblia quando a versão selecionada mudar
  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/bible/${selectedVersion}.json`);
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
      const book = bibleData.find(b => b.abbrev === selectedBook);
      setCurrentBookData(book || null);
      
      // Resetar o capítulo selecionado se o livro mudar
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

  // Renderizar versículos do capítulo atual
  const renderVerses = () => {
    if (!currentBookData || !currentBookData.chapters || !currentBookData.chapters[selectedChapter - 1]) {
      return <p>Nenhum versículo disponível.</p>;
    }

    const verses = currentBookData.chapters[selectedChapter - 1];
    
    return (
      <div className="space-y-2">
        {verses.map((verse, index) => (
          <div key={index} className="flex">
            <span className="text-sm font-semibold mr-2 text-blue-600 dark:text-blue-400 w-6 flex-shrink-0">
              {index + 1}
            </span>
            <p className="text-gray-800 dark:text-gray-200">{verse}</p>
          </div>
        ))}
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
            onClick={() => setSelectedChapter(chapter)}
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

  return (
    <div className="py-6">
      <Helmet>
        <title>Bíblia Sagrada | Amigos de Deus</title>
        <meta name="description" content="Leia a Bíblia Sagrada em diferentes versões. Navegue pelos livros e capítulos da Bíblia." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">Bíblia Sagrada</h1>

      {/* Seletor de versão */}
      <div className="mb-6">
        <label htmlFor="version-select" className="block text-sm font-medium mb-2">
          Versão da Bíblia:
        </label>
        <select
          id="version-select"
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
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
              id="book-select"
              value={selectedBook}
              onChange={(e) => {
                setSelectedBook(e.target.value);
                setSelectedChapter(1); // Reset para o primeiro capítulo ao mudar de livro
              }}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {bibleData.map((book) => (
                <option key={book.abbrev} value={book.abbrev}>
                  {getBookName(book.abbrev)}
                </option>
              ))}
            </select>
          </div>

          {/* Título do livro e capítulo atual */}
          <h2 className="text-2xl font-bold mb-4 text-center">
            {currentBookData ? getBookName(currentBookData.abbrev) : ''} {selectedChapter}
          </h2>

          {/* Seletor de capítulos */}
          {renderChapterSelector()}

          {/* Versículos */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {renderVerses()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bible; 