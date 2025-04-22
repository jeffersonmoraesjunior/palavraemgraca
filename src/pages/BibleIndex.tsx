import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

interface BibleBook {
  abbrev: string;
  name: string;
  chapters: string[][];
}

interface BibleVersion {
  id: string;
  name: string;
}

const BibleIndex: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bibleData, setBibleData] = useState<BibleBook[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>('NTLH');

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

  // Carregar dados da Bíblia quando a versão selecionada mudar
  useEffect(() => {
    const fetchBibleData = async () => {
      try {
        setLoading(true);
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

  // Agrupar livros por categorias
  const bookCategories = [
    {
      name: 'Pentateuco',
      books: ['Gn', 'Ex', 'Lv', 'Nm', 'Dt']
    },
    {
      name: 'Livros Históricos',
      books: ['Js', 'Jz', 'Rt', '1Sm', '2Sm', '1Rs', '2Rs', '1Cr', '2Cr', 'Ed', 'Ne', 'Et']
    },
    {
      name: 'Livros Poéticos',
      books: ['Jó', 'Sl', 'Pv', 'Ec', 'Ct']
    },
    {
      name: 'Profetas Maiores',
      books: ['Is', 'Jr', 'Lm', 'Ez', 'Dn']
    },
    {
      name: 'Profetas Menores',
      books: ['Os', 'Jl', 'Am', 'Ob', 'Jn', 'Mq', 'Na', 'Hc', 'Sf', 'Ag', 'Zc', 'Ml']
    },
    {
      name: 'Evangelhos',
      books: ['Mt', 'Mc', 'Lc', 'Jo']
    },
    {
      name: 'História da Igreja',
      books: ['At']
    },
    {
      name: 'Epístolas de Paulo',
      books: ['Rm', '1Co', '2Co', 'Gl', 'Ef', 'Fp', 'Cl', '1Ts', '2Ts', '1Tm', '2Tm', 'Tt', 'Fm']
    },
    {
      name: 'Epístolas Gerais',
      books: ['Hb', 'Tg', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jd']
    },
    {
      name: 'Apocalíptico',
      books: ['Ap']
    }
  ];

  // Gerar título e descrição para SEO
  const pageTitle = `Índice da Bíblia Sagrada - ${bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion} | Palavra em Graça`;
  const pageDescription = `Navegue por todos os livros e capítulos da Bíblia Sagrada na versão ${bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion}. Acesse Antigo e Novo Testamento, Evangelhos, Salmos, Provérbios e mais.`;

  // Dados estruturados para SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": `https://amigosdedeus.com/biblia/indice/${selectedVersion.toLowerCase()}`,
    "mainEntity": {
      "@type": "Book",
      "name": "Bíblia Sagrada",
      "author": "Bíblia Sagrada",
      "inLanguage": "pt-BR",
      "version": bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion
    }
  };

  // Função para gerar os itens do breadcrumb
  const getBreadcrumbItems = () => {
    const items = [
      { name: 'Início', path: '/', isLast: false },
      { name: 'Bíblia', path: '/biblia', isLast: false },
      { 
        name: 'Índice', 
        path: `/biblia/indice${selectedVersion ? `/${selectedVersion.toLowerCase()}` : ''}`,
        isLast: true 
      }
    ];

    return items;
  };

  return (
    <div className="py-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`https://amigosdedeus.com/biblia/indice/${selectedVersion.toLowerCase()}`} />
        
        {/* Meta tags para SEO */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://amigosdedeus.com/biblia/indice/${selectedVersion.toLowerCase()}`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        <meta name="keywords" content={`índice bíblia, livros da bíblia, capítulos bíblia, ${bibleVersions.find(v => v.id === selectedVersion)?.name || selectedVersion}, antigo testamento, novo testamento, evangelhos, salmos, provérbios`} />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <Breadcrumb items={getBreadcrumbItems()} />

      <h1 className="text-3xl font-bold mb-6 text-center">Índice da Bíblia Sagrada</h1>
      
      {/* Seletor de versão */}
      <div className="mb-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Antigo Testamento</h2>
              
              {bookCategories.slice(0, 5).map((category) => (
                <div key={category.name} className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">{category.name}</h3>
                  <ul className="space-y-2">
                    {category.books.map((abbrev) => {
                      const book = bibleData.find(b => b.abbrev === abbrev);
                      if (!book) return null;
                      
                      return (
                        <li key={abbrev} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                          <div className="font-medium">{getBookName(abbrev)}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Array.from({ length: book.chapters.length }, (_, i) => i + 1).map((chapter) => (
                              <Link
                                key={chapter}
                                to={`/biblia/${selectedVersion.toLowerCase()}/${abbrev.toLowerCase()}/${chapter}`}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
                              >
                                {chapter}
                              </Link>
                            ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Novo Testamento</h2>
              
              {bookCategories.slice(5).map((category) => (
                <div key={category.name} className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">{category.name}</h3>
                  <ul className="space-y-2">
                    {category.books.map((abbrev) => {
                      const book = bibleData.find(b => b.abbrev === abbrev);
                      if (!book) return null;
                      
                      return (
                        <li key={abbrev} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                          <div className="font-medium">{getBookName(abbrev)}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Array.from({ length: book.chapters.length }, (_, i) => i + 1).map((chapter) => (
                              <Link
                                key={chapter}
                                to={`/biblia/${selectedVersion.toLowerCase()}/${abbrev.toLowerCase()}/${chapter}`}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
                              >
                                {chapter}
                              </Link>
                            ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Versículos Populares</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to={`/biblia/${selectedVersion.toLowerCase()}/jo/3/16`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  João 3:16 - "Porque Deus amou o mundo de tal maneira..."
                </Link>
              </li>
              <li>
                <Link 
                  to={`/biblia/${selectedVersion.toLowerCase()}/sl/23/1`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Salmos 23:1 - "O Senhor é o meu pastor..."
                </Link>
              </li>
              <li>
                <Link 
                  to={`/biblia/${selectedVersion.toLowerCase()}/jr/29/11`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Jeremias 29:11 - "Porque eu bem sei os pensamentos que tenho a vosso respeito..."
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleIndex; 