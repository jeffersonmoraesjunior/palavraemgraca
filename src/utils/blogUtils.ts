// Define o tipo BlogPost que será usado em toda a aplicação
export interface BlogPost {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  author: {
    '@type': string;
    name: string;
  };
  datePublished: string;
  dateModified: string;
  image: string;
  slug: string;
  url: string;
  tags: string[];
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
}

// Funções para uso no cliente 
// Estas funções são usadas diretamente no navegador

/**
 * Obtém posts de blog paginados
 * Versão para o cliente que usa fetch para obter dados via API
 */
export async function getPaginatedPosts(page = 1, postsPerPage = 10): Promise<{
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
}> {
  try {
    console.log('Fetching posts with params:', { page, postsPerPage });
    const response = await fetch(`/api/posts?page=${page}&limit=${postsPerPage}`);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error('Error response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Received data:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      posts: [],
      totalPosts: 0,
      totalPages: 0
    };
  }
}

/**
 * Obtém um post específico pelo slug
 * Versão para o cliente que usa fetch para obter dados via API
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log('Fetching post with slug:', slug);
    const response = await fetch(`/api/posts/${slug}`);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error('Error response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error fetching post: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Received post data:', data);
    
    return data;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
} 