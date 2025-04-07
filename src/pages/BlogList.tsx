import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../utils/blogUtils';
import { getPaginatedPosts } from '../utils/blogUtils';

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
  
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPaginatedPosts(currentPage);
        setBlogData(data);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    setLoading(true);
    loadPosts();
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    navigate(`/artigos?page=${page}`);
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
  
  return (
    <div className="max-w-2xl mx-auto">
      <Helmet>
        <title>{"Artigos Cristãos | Palavra em Graça"}</title>
        <meta 
          name="description" 
          content="Artigos cristãos sobre fé, espiritualidade, vida cristã e estudos bíblicos para edificação espiritual."
        />
        <link rel="canonical" href={`https://palavraemgraca.com.br/artigos${currentPage > 1 ? `?page=${currentPage}` : ''}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "headline": "Artigos Cristãos | Palavra em Graça",
            "description": "Artigos cristãos sobre fé, espiritualidade, vida cristã e estudos bíblicos para edificação espiritual.",
            "url": `https://palavraemgraca.com.br/artigos${currentPage > 1 ? `?page=${currentPage}` : ''}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": blogData.posts?.map((post, index) => ({
                "@type": "ListItem",
                "position": (currentPage - 1) * 10 + index + 1,
                "url": `https://palavraemgraca.com.br/${post.slug}`
              })) || []
            }
          })}
        </script>
      </Helmet>
      
      <h1 className="text-3xl font-bold text-center mb-8">Artigos para você ler</h1>
      
      {blogData.posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg">Nenhum artigo encontrado.</p>
        </div>
      ) : (
        <>
          <div className="space-y-8">
            {blogData.posts.map((post) => (
              <article 
                key={post.slug} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition hover:shadow-lg"
              >
                <Link to={`/${post.slug}`} className="block group">
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {post.headline}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{post.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags?.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        )) || <span className="text-gray-500 text-xs">Sem tags</span>}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(post.datePublished)}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {/* Pagination */}
          {blogData.totalPages > 1 && (
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
                
                {blogData.totalPages > 0 && Array.from({ length: blogData.totalPages }).map((_, index) => (
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
        </>
      )}
    </div>
  );
};

export default BlogList; 