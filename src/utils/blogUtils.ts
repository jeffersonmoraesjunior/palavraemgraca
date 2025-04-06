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
    const response = await fetch(`/api/posts?page=${page}&limit=${postsPerPage}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }
    
    return await response.json();
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
    const response = await fetch(`/api/posts/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error fetching post: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
} 