import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostsByTag } from '../utils/markdownUtils';
import type { BlogPost } from '../utils/markdownUtils';
import ImageOptimized from '../components/ImageOptimized';

const BlogTagPage: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadPosts() {
      if (!tag) {
        navigate('/blog');
        return;
      }
      
      try {
        setLoading(true);
        const postsData = await getPostsByTag(tag);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading posts by tag:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPosts();
  }, [tag, navigate]);
  
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
  
  // Se a tag não estiver definida, redirecionar para o blog
  if (!tag) {
    navigate('/blog');
    return null;
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <Helmet>
        <title>Posts sobre {tag} | Palavra em Graça</title>
        <meta 
          name="description" 
          content={`Artigos e posts relacionados a ${tag} para edificação espiritual e estudo bíblico.`}
        />
        <link rel="canonical" href={`https://palavraemgraca.com.br/tag/${tag}`} />
      </Helmet>
      
      <div className="mb-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para o Blog
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Posts sobre "{tag}"</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {posts.length} {posts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </p>
      </div>
      
      {posts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-lg mb-4">Nenhum artigo encontrado com a tag "{tag}".</p>
          <Link 
            to="/blog" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Ver todos os artigos
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition hover:shadow-lg"
            >
              <Link to={`/${post.slug}`} className="block group">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <ImageOptimized
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  </div>
                  
                  <div className="md:w-2/3 p-6">
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
                      {post.tags.slice(0, 3).map(t => (
                        <span 
                          key={t} 
                          className={`text-xs px-2 py-1 rounded ${
                            t.toLowerCase() === tag.toLowerCase() 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Ler artigo →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogTagPage; 