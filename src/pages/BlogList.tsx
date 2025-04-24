import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../utils/markdownUtils';
import { getPaginatedPosts, getAllPosts } from '../utils/markdownUtils';
import ImageOptimized from '../components/ImageOptimized';

const BlogList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);
  
  const [blogData, setBlogData] = useState<{
    posts: BlogPost[];
    totalPosts: number;
    totalPages: number;
  }>({
    posts: [],
    totalPosts: 0,
    totalPages: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPaginatedPosts(currentPage);
        setBlogData(data);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    setLoading(true);
    loadData();
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    navigate(`/blog?page=${page}`);
    window.scrollTo(0, 0);
    setSearchTerm('');
    setIsSearching(false);
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }
    
    setLoading(true);
    setIsSearching(true);
    
    try {
      const allPosts = await getAllPosts();
      const filtered = allPosts.filter(post => {
        const searchContent = `${post.title} ${post.description} ${post.author} ${post.tags.join(' ')} ${post.category}`.toLowerCase();
        return searchContent.includes(searchTerm.toLowerCase());
      });
      
      setSearchResults(filtered);
    } catch (error) {
      console.error('Erro ao pesquisar posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Determinar quais posts mostrar (resultados da pesquisa ou posts paginados normais)
  const displayPosts = isSearching ? searchResults : blogData.posts;
  
  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Blog | Palavra em Graça</title>
        <meta 
          name="description" 
          content="Artigos cristãos sobre fé, espiritualidade, vida cristã e estudos bíblicos para edificação espiritual."
        />
        <link rel="canonical" href={`https://palavraemgraca.com.br/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "headline": "Blog | Palavra em Graça",
            "description": "Artigos cristãos sobre fé, espiritualidade, vida cristã e estudos bíblicos para edificação espiritual.",
            "url": `https://palavraemgraca.com.br/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": blogData.posts.map((post, index) => ({
                "@type": "ListItem",
                "position": (currentPage - 1) * 10 + index + 1,
                "url": `https://palavraemgraca.com.br/${post.slug}`
              }))
            }
          })}
        </script>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">Blog</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Artigos para edificação e crescimento espiritual
        </p>
      </div>
      
      {/* Barra de pesquisa */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="search"
              className="block w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Pesquisar por artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Pesquisar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          {isSearching && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Limpar
            </button>
          )}
        </form>
      </div>
      
      {/* Status da Pesquisa */}
      {isSearching && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {searchResults.length === 0 
                ? 'Nenhum resultado encontrado' 
                : `${searchResults.length} ${searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}`}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Pesquisando por: "{searchTerm}"
            </span>
          </div>
        </div>
      )}
      
      <div className="w-full">
        {displayPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg">
              {isSearching 
                ? `Nenhum artigo encontrado para "${searchTerm}".`
                : 'Nenhum artigo encontrado.'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {displayPosts.map((post) => (
              <article 
                key={post.slug} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition hover:shadow-lg"
              >
                <Link to={`/${post.slug}`} className="block group">
                  <div className="relative h-48 overflow-hidden">
                    <ImageOptimized
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full absolute inset-0"
                      objectFit="cover"
                      type="thumbnail"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>{formatDate(post.datePublished)}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readingTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Ler artigo →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
        
        {/* Paginação - Mostrar apenas quando não estiver pesquisando */}
        {!isSearching && blogData.totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-l-md ${
                  currentPage === 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                Anterior
              </button>
              
              {Array.from({ length: blogData.totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === blogData.totalPages}
                className={`px-4 py-2 rounded-r-md ${
                  currentPage === blogData.totalPages
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                Próxima
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList; 