import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { BlogPost as BlogPostType } from '../utils/blogUtils';
import { getPostBySlug } from '../utils/api';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        navigate('/404');
        return;
      }
      
      try {
        const postData = await getPostBySlug(slug);
        if (postData) {
          setPost(postData);
        } else {
          navigate('/404');
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    }
    
    setLoading(true);
    setImageError(false);
    loadPost();
  }, [slug, navigate]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleImageError = () => {
    setImageError(true);
    console.warn(`Failed to load image for post: ${post?.headline}`);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!post) {
    return null;
  }
  
  return (
    <article className="max-w-2xl mx-auto">
      <Helmet>
        <title>{post.headline || 'Artigo'}</title>
        <meta name="description" content={post.description || ''} />
        <link rel="canonical" href={`https://palavraemgraca.com.br/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            ...post,
            url: `https://palavraemgraca.com.br/${post.slug}`
          })}
        </script>
      </Helmet>
      
      <div className="mb-6">
        <Link 
          to="/artigos" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para Artigos
        </Link>
      </div>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.headline}</h1>
        
        <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
          <span>{formatDate(post.datePublished)}</span>
          <span className="mx-2">•</span>
          <span>{post.author?.name || 'Autor Desconhecido'}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags?.map(tag => (
            <span 
              key={tag} 
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          )) || <span className="text-gray-500 text-xs">Sem tags</span>}
        </div>
        
        {post.image && !imageError && (
          <img 
            src={post.image} 
            alt={post.headline} 
            className="w-full h-auto rounded-lg shadow-md mb-6"
            onError={handleImageError}
          />
        )}
      </header>
      
      <div className="prose dark:prose-invert prose-blue max-w-none">
        <p className="text-lg font-medium mb-6">{post.content?.introduction || 'Introdução não disponível'}</p>
        
        {post.content?.sections?.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <p className="mb-4 whitespace-pre-wrap">{section.content}</p>
          </section>
        ))}
        
        <p className="text-lg font-medium mt-8">{post.content?.conclusion || 'Conclusão não disponível'}</p>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4">Compartilhe este artigo</h3>
        <div className="flex space-x-4">
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=https://palavraemgraca.com.br/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            aria-label="Compartilhar no Facebook"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
            </svg>
          </a>
          <a 
            href={`https://twitter.com/intent/tweet?url=https://palavraemgraca.com.br/${post.slug}&text=${encodeURIComponent(post.headline)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition"
            aria-label="Compartilhar no Twitter"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
            </svg>
          </a>
          <a 
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.headline} - https://palavraemgraca.com.br/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
            aria-label="Compartilhar no WhatsApp"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-6">Leia também</h3>
        <div className="flex flex-col space-y-4">
          <Link 
            to="/artigos"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Ver todos os artigos
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPost; 