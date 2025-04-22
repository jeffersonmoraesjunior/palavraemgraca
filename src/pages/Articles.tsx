import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { getAllPosts } from '../utils/markdownUtils';
import type { BlogPost } from '../utils/markdownUtils';
import ImageOptimized from '../components/ImageOptimized';
import Breadcrumb from '../components/Breadcrumb';

const Articles: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Erro ao carregar artigos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const filtered = posts.filter(post => {
        const searchContent = `${post.title} ${post.description} ${post.author} ${post.tags.join(' ')} ${post.category}`.toLowerCase();
        return searchContent.includes(searchTerm.toLowerCase());
      });
      
      setFilteredPosts(filtered);
      // Voltar para a primeira página quando realizar uma pesquisa
      setCurrentPage(1);
    }
  }, [searchTerm, posts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Lógica para paginação
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  const getBreadcrumbItems = () => {
    return [
      { name: 'Início', path: '/', isLast: false },
      { name: 'Artigos', path: '/artigos', isLast: true }
    ];
  };

  return (
    <div>
      <Helmet>
        <title>Artigos | Palavra em Graça</title>
        <meta name="description" content="Explore artigos e reflexões sobre a fé cristã e a Palavra de Deus." />
        <meta name="keywords" content="artigos cristãos, reflexões bíblicas, estudos bíblicos" />
        <link rel="canonical" href="https://palavraemgraca.com.br/artigos" />
      </Helmet>

      <Breadcrumb items={getBreadcrumbItems()} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Artigos</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Reflexões e estudos bíblicos para edificação espiritual
        </p>
      </div>

      {/* Barra de pesquisa */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Pesquisar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">Nenhum artigo encontrado</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Não encontramos artigos correspondentes à sua pesquisa.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 mb-8">
            {currentPosts.map((post) => (
              <article key={post.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <Link to={`/${post.slug}`} className="block h-full">
                    <div className="h-64 md:h-full overflow-hidden">
                      <ImageOptimized
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full"
                        objectFit="cover"
                      />
                    </div>
                  </Link>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map(tag => (
                      <Link 
                        key={tag} 
                        to={`/tag/${tag.toLowerCase()}`}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <Link to={`/${post.slug}`} className="block group">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{formatDate(post.datePublished)}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <Link 
                    to={`/${post.slug}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Ler artigo
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 mb-6">
              <nav aria-label="Navegação da paginação" className="inline-flex">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l-md border ${
                    currentPage === 1 
                      ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed' 
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } border-gray-300 dark:border-gray-600`}
                  aria-label="Página anterior"
                >
                  &laquo;
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-3 py-1 border-t border-b border-r ${
                        pageNumber === currentPage
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                      } border-gray-300 dark:border-gray-600`}
                      aria-label={`Página ${pageNumber}`}
                      aria-current={pageNumber === currentPage ? 'page' : undefined}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-r-md border-t border-b border-r ${
                    currentPage === totalPages 
                      ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed' 
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } border-gray-300 dark:border-gray-600`}
                  aria-label="Próxima página"
                >
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Articles; 