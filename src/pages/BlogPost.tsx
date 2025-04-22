import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { BlogPost as BlogPostType } from '../utils/markdownUtils';
import { getPostBySlug, getAllPosts } from '../utils/markdownUtils';
import ImageOptimized from '../components/ImageOptimized';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        navigate('/404');
        return;
      }
      
      try {
        setLoading(true);
        const postData = await getPostBySlug(slug);
        
        if (postData) {
          // Processar o conteúdo para converter tags H1 para H2, preservando o conteúdo
          let processedContent = postData.content;
          const h1Regex = /<h1[^>]*>(.*?)<\/h1>/gi;
          processedContent = processedContent.replace(h1Regex, '<h2>$1</h2>');
          
          setPost({
            ...postData,
            content: processedContent
          });
          
          // Carregar posts relacionados
          const allPosts = await getAllPosts();
          const related = allPosts
            .filter(p => p.slug !== slug) // Excluir o post atual
            .filter(p => {
              // Encontrar posts com tags ou categorias semelhantes
              const hasMatchingTags = p.tags.some(tag => postData.tags.includes(tag));
              const hasMatchingCategory = p.category === postData.category;
              return hasMatchingTags || hasMatchingCategory;
            })
            .slice(0, 3); // Limitar a 3 posts relacionados
          
          setRelatedPosts(related);
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
    <article className="w-full">
      <section className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-sm md:text-base text-gray-600 dark:text-gray-400">
          <span>{formatDate(post.datePublished)}</span>
          <span>•</span>
          <span>{post.author}</span>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tag/${tag}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full max-w-4xl h-auto mx-auto rounded-lg shadow-md mb-8"
          />
        )}

        <div 
          className="blog-content prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>
      
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
            href={`https://twitter.com/intent/tweet?url=https://palavraemgraca.com.br/${post.slug}&text=${encodeURIComponent(post.title)}`}
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
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - https://palavraemgraca.com.br/${post.slug}`)}`}
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
      
      {relatedPosts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-6">Leia também</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <Link to={`/${relatedPost.slug}`} className="block group">
                  <div className="h-32 overflow-hidden">
                    <ImageOptimized
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPost; 