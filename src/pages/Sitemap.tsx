import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

// Definição da estrutura do sitemap
interface SitemapItem {
  title: string;
  url: string;
  description?: string;
  children?: SitemapItem[];
}

const Sitemap: React.FC = () => {
  // Estrutura do sitemap
  const sitemapData: SitemapItem[] = [
    {
      title: 'Página Inicial',
      url: '/',
      description: 'Página principal com versículo do dia e orientação personalizada'
    },
    {
      title: 'Bíblia Sagrada',
      url: '/biblia/indice',
      description: 'Acesse a Bíblia completa em diferentes traduções',
      children: [
        {
          title: 'Nova Tradução na Linguagem de Hoje (NTLH)',
          url: '/biblia/indice/ntlh',
          description: 'Versão da Bíblia em linguagem contemporânea e acessível'
        },
        {
          title: 'Nova Versão Internacional (NVI)',
          url: '/biblia/indice/nvi',
          description: 'Tradução moderna e precisa da Bíblia'
        },
        {
          title: 'Almeida Revista e Corrigida (ARC)',
          url: '/biblia/indice/arc',
          description: 'Versão clássica da Bíblia em português'
        },
        {
          title: 'Almeida Corrigida Fiel (ACF)',
          url: '/biblia/indice/acf',
          description: 'Tradução fiel aos textos originais'
        }
      ]
    },
    {
      title: 'Versículos por Temas',
      url: '/temas',
      description: 'Versículos organizados por temas e situações da vida',
      children: [
        {
          title: 'Versículos para Ansiedade',
          url: '/temas/ansiedade',
          description: 'Versículos que trazem paz e conforto em momentos de ansiedade'
        },
        {
          title: 'Versículos para Tristeza',
          url: '/temas/tristeza',
          description: 'Palavras de conforto para momentos de tristeza e luto'
        },
        {
          title: 'Versículos sobre Fé',
          url: '/temas/fe',
          description: 'Versículos que fortalecem a fé e a confiança em Deus'
        },
        {
          title: 'Versículos sobre Amor',
          url: '/temas/amor',
          description: 'O que a Bíblia ensina sobre o amor'
        }
      ]
    },
    {
      title: 'Sobre o Projeto',
      url: '/sobre',
      description: 'Conheça mais sobre o projeto Palavra em Graça'
    },
    {
      title: 'Contato',
      url: '/contato',
      description: 'Entre em contato conosco'
    },
    {
      title: 'Informações Legais',
      url: '#',
      description: 'Documentos legais e políticas do site',
      children: [
        {
          title: 'Política de Privacidade',
          url: '/privacidade',
          description: 'Como tratamos seus dados e informações'
        },
        {
          title: 'Termos de Uso',
          url: '/termos',
          description: 'Condições para uso do site e serviços'
        }
      ]
    }
  ];

  // Função para gerar os itens do breadcrumb
  const getBreadcrumbItems = () => {
    return [
      { name: 'Início', path: '/', isLast: false },
      { name: 'Mapa do Site', path: '/sitemap', isLast: true }
    ];
  };

  // Renderiza um item do sitemap e seus filhos
  const renderSitemapItem = (item: SitemapItem, index: number, level: number = 0) => {
    return (
      <div key={index} className={`mb-6 ${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-start">
          <div className={`w-2 h-2 mt-2 mr-2 rounded-full ${level === 0 ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-blue-400 dark:bg-blue-500'}`}></div>
          <div className="flex-1">
            <h3 className={`${level === 0 ? 'text-xl font-bold text-indigo-600 dark:text-indigo-400' : 'text-lg font-semibold text-gray-800 dark:text-gray-200'}`}>
              {item.url !== '#' ? (
                <Link to={item.url} className="hover:underline">
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
            </h3>
            {item.description && (
              <p className="mt-1 text-gray-600 dark:text-gray-300">{item.description}</p>
            )}
          </div>
        </div>
        
        {item.children && item.children.length > 0 && (
          <div className="mt-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
            {item.children.map((child, childIndex) => renderSitemapItem(child, childIndex, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-6">
      <Helmet>
        <title>Mapa do Site | Palavra em Graça</title>
        <meta name="description" content="Mapa completo do site Palavra em Graça. Encontre facilmente todas as seções, páginas e recursos disponíveis." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://palavraemgraca.com.br/sitemap" />
        
        {/* Schema.org markup para o sitemap */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Início",
                "item": "https://palavraemgraca.com.br/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Mapa do Site",
                "item": "https://palavraemgraca.com.br/sitemap"
              }
            ]
          })}
        </script>
      </Helmet>

      <Breadcrumb items={getBreadcrumbItems()} />

      <div className="max-w-4xl mx-auto">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Mapa do Site</h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Bem-vindo ao mapa do site Palavra em Graça. Esta página contém links para todas as seções e páginas 
            importantes do nosso site, organizadas de forma hierárquica para facilitar sua navegação. 
            Use esta página para encontrar rapidamente o conteúdo que você está procurando.
          </p>

          <div className="space-y-8">
            {sitemapData.map((item, index) => renderSitemapItem(item, index))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Recursos Adicionais</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Versículo do Dia</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receba diariamente um versículo bíblico para meditação e reflexão.
              </p>
              <Link to="/" className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                Acessar →
              </Link>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Orientação Personalizada</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Compartilhe como você está se sentindo e receba versículos relevantes.
              </p>
              <Link to="/" className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                Acessar →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sitemap; 