import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../utils/markdownUtils';
import { getPaginatedPosts, getAllCategories, getAllTags } from '../utils/markdownUtils';
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
  
  const [categories, setCategories] = useState<{ category: string; count: number }[]>([]);
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPaginatedPosts(currentPage);
        setBlogData(data);
        
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
        
        const tagsData = await getAllTags();
        setTags(tagsData);
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
        <title>Blog Cristão | Palavra em Graça</title>
        <meta 
          name="description" 
          content="Artigos cristãos sobre fé, espiritualidade, vida cristã e estudos bíblicos para edificação espiritual."
        />
        <link rel="canonical" href={`https://palavraemgraca.com.br/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "headline": "Blog Cristão | Palavra em Graça",
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
        <h1 className="text-3xl font-bold text-center">Blog Cristão</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Artigos para edificação e crescimento espiritual
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Lista de Posts */}
        <div className="md:col-span-2">
          {blogData.posts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg">Nenhum artigo encontrado.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {blogData.posts.map((post) => (
                <article 
                  key={post.slug} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition hover:shadow-lg"
                >
                  <Link to={`/${post.slug}`} className="block group">
                    <div className="h-48 overflow-hidden">
                      <ImageOptimized
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full"
                        objectFit="cover"
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
          
          {/* Paginação */}
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
        
        {/* Sidebar */}
        <aside className="md:col-span-1">
          {/* Categorias */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Categorias</h3>
            <ul className="space-y-2">
              {categories.map(({ category, count }) => (
                <li key={category}>
                  <Link 
                    to={`/categoria/${category.toLowerCase()}`}
                    className="flex justify-between items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <span>{category}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">
                      {count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tags */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(({ tag, count }) => (
                <Link 
                  key={tag}
                  to={`/tag/${tag.toLowerCase()}`}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 text-xs px-2 py-1 rounded-full transition"
                >
                  {tag} ({count})
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogList; 