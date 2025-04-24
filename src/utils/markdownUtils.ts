import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

// Define o tipo BlogPost que será usado em toda a aplicação
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  featuredImage: string;
  tags: string[];
  keywords: string[];
  category: string;
  content: string;
  readingTime: string;
  excerpt: string;
}

// Diretório dos posts em Markdown
const postsDirectory = 'public/contents/markdown';

// Cache para evitar requisições repetidas
const postsCache: Record<string, any> = {};
const allPostsCache: { data: any[] | null; timestamp: number } = { data: null, timestamp: 0 };
const CACHE_TTL = 60 * 1000; // 1 minuto em milissegundos

// Função simples para calcular o tempo de leitura
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min de leitura`;
}

/**
 * Obtém todos os posts de blog
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  console.log('Obtendo todos os posts...');
  
  try {
    // Verifica se tem cache válido
    const now = Date.now();
    if (allPostsCache.data && (now - allPostsCache.timestamp < CACHE_TTL)) {
      console.log('Usando cache para todos os posts');
      return allPostsCache.data;
    }
    
    // Se estamos em um ambiente de navegador, buscar os posts via API
    if (typeof window !== 'undefined') {
      // Tentar buscar a lista de posts do arquivo JSON estático
      const allPostsFilenames = await fetch('/api/posts-list.json')
        .then(res => res.json())
        .catch(error => {
          console.error('Erro ao buscar lista de posts:', error);
          
          // Fallback: tentar buscar do endpoint do servidor de desenvolvimento
          return fetch('/api/posts-list')
            .then(res => res.json())
            .catch(err => {
              console.error('Erro em ambos os métodos de busca de lista de posts:', err);
              return [];
            });
        });
      
      const posts = await Promise.all(
        allPostsFilenames.map(async (filename: string) => {
          const slug = filename.replace(/\.md$/, '');
          return getPostBySlug(slug);
        })
      );
      
      // Filtrar posts nulos e ordenar por data
      const validPosts = posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
      
      // Atualizar o cache
      allPostsCache.data = validPosts;
      allPostsCache.timestamp = now;
      
      return validPosts;
    } 
    // Se estamos no ambiente Node.js (SSG/SSR)
    else {
      // Simular apenas o post de oração diária para não quebrar o fluxo atual
      // Em um ambiente real, isso seria substituído pela leitura do sistema de arquivos
      const oracao = {
        slug: 'oracao-diaria',
        title: 'O Poder da Oração Diária na Vida Cristã',
        description: 'Como estabelecer uma prática de oração que transforma seu relacionamento com Deus',
        author: 'Pastor João Silva',
        datePublished: '2023-09-15T10:30:00Z',
        dateModified: '2023-09-15T10:30:00Z',
        featuredImage: '/images/oracao-diaria.webp',
        tags: ['Oração', 'Devocionais', 'Vida Cristã'],
        keywords: ['oração diária', 'como orar', 'tempo com Deus', 'hábitos espirituais', 'vida devocional'],
        category: 'Devocionais',
        content: await processMarkdown(`# O Poder da Oração Diária na Vida Cristã

A oração não é apenas um ritual ou uma série de palavras que repetimos diariamente. É uma conversa íntima com o Criador do universo, um privilégio concedido a cada filho de Deus. Neste artigo, vamos explorar como desenvolver uma vida de oração significativa e transformadora.

## Por Que Precisamos Orar Diariamente?

Muitos cristãos perguntam: "Se Deus já sabe tudo, por que preciso orar?" A resposta está no relacionamento. A oração nos aproxima de Deus, permitindo que experimentemos Sua presença de maneira tangível. Através da oração:

1. **Desenvolvemos intimidade com Deus**
2. **Alinhamos nossa vontade com a vontade divina**
3. **Encontramos força e direção para o dia**
4. **Crescemos em discernimento espiritual**

## Estabelecendo uma Rotina de Oração

Para desenvolver o hábito da oração, considere estas dicas práticas:

- **Escolha um horário específico**: Seja pela manhã, à tarde ou à noite, reserve um momento do seu dia exclusivamente para a oração.
- **Crie um ambiente propício**: Encontre um lugar tranquilo, livre de distrações.
- **Comece com gratidão**: Antes de apresentar pedidos, agradeça a Deus por Suas bênçãos.
- **Use a Bíblia como guia**: Leia um trecho da Escritura e transforme-o em oração.
- **Seja específico**: Deus se interessa pelos detalhes da sua vida.

## Um Modelo Simples de Oração

Jesus nos ensinou um modelo de oração conhecido como o "Pai Nosso" (Mateus 6:9-13). Podemos usar esta estrutura como base:

> "Portanto, vós orareis assim: Pai nosso que estás nos céus, santificado seja o teu nome; venha o teu reino, seja feita a tua vontade, assim na terra como no céu; o pão nosso de cada dia dá-nos hoje; e perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores; e não nos induzas à tentação, mas livra-nos do mal; porque teu é o reino, e o poder, e a glória, para sempre. Amém!"

## Testemunho Pessoal

Em minha própria jornada, descobri que os momentos mais transformadores da minha vida espiritual aconteceram no contexto da oração. Foi orando que recebi direção para decisões importantes, encontrei cura emocional e experimentei a presença de Deus de maneira mais profunda.

Lembre-se: a oração não é sobre palavras eloquentes ou longas horas de joelhos. É sobre sinceridade de coração e desejo genuíno de comunhão com Deus.

Que possamos todos crescer nesta maravilhosa disciplina espiritual!

*"Orai sem cessar." - 1 Tessalonicenses 5:17*`),
        readingTime: '5 min de leitura',
        excerpt: 'A oração não é apenas um ritual ou uma série de palavras que repetimos diariamente. É uma conversa íntima com o Criador do universo, um privilégio concedido a cada filho de Deus...'
      };
      
      return [oracao];
    }
  } catch (error) {
    console.error('Erro ao carregar posts:', error);
    return [];
  }
}

/**
 * Processa o conteúdo Markdown e converte para HTML
 */
async function processMarkdown(markdown: string): Promise<string> {
  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(markdown);
    
    let htmlContent = result.toString();
    
    // Processa o HTML para evitar múltiplas tags h1
    // Encontra todas as ocorrências de tags h1
    const h1regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
    
    // Coletando todas as ocorrências de h1 em um array
    const h1matches = [];
    let match;
    while ((match = h1regex.exec(htmlContent)) !== null) {
      h1matches.push({
        fullMatch: match[0],
        content: match[1]
      });
    }
    
    // Se houver mais de uma tag h1, converte as adicionais para h2
    if (h1matches.length > 1) {
      // Mantém a primeira tag h1 intacta
      for (let i = 1; i < h1matches.length; i++) {
        const h1Tag = h1matches[i].fullMatch;
        const h1Content = h1matches[i].content;
        const h2Tag = `<h2>${h1Content}</h2>`;
        
        // Substitui a tag h1 atual por h2
        htmlContent = htmlContent.replace(h1Tag, h2Tag);
      }
    }
    
    return htmlContent;
  } catch (error) {
    console.error('Erro ao processar markdown:', error);
    return '';
  }
}

/**
 * Obtém um post específico pelo slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  console.log(`Buscando post com slug: ${slug}`);
  
  try {
    // Verifica se o post está em cache
    if (postsCache[slug]) {
      console.log(`Usando cache para post: ${slug}`);
      return postsCache[slug];
    }
    
    // Se estamos em um ambiente de navegador, buscar o post via API
    if (typeof window !== 'undefined') {
      // Primeiro tenta buscar do arquivo JSON estático
      const post = await fetch(`/api/posts/${slug}.json`)
        .then(res => {
          if (!res.ok) {
            // Fallback: tentar buscar do endpoint do servidor de desenvolvimento
            return fetch(`/api/posts/${slug}`).then(response => {
              if (!response.ok) {
                throw new Error(`Post não encontrado: ${slug}`);
              }
              return response.json();
            });
          }
          return res.json();
        })
        .catch(error => {
          console.error('Erro ao buscar post:', error);
          return null;
        });
      
      // Armazena no cache se o post for encontrado
      if (post) {
        postsCache[slug] = post;
      }
      
      return post;
    } 
    // Se estamos no ambiente Node.js (SSG/SSR)
    else {
      // Para o caso de oracao-diaria, retornar o post simulado
      if (slug === 'oracao-diaria') {
        const post = (await getAllPosts())[0];
        return post;
      }
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return null;
  }
}

/**
 * Obtém posts paginados
 */
export async function getPaginatedPosts(page: number = 1, limit: number = 10): Promise<{
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
}> {
  const allPosts = await getAllPosts();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const posts = allPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    totalPosts: allPosts.length,
    totalPages: Math.ceil(allPosts.length / limit)
  };
}

/**
 * Obtém posts por tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => {
    // Verifica case insensitive
    return post.tags.some(t => t.toLowerCase() === tag.toLowerCase());
  });
}

/**
 * Obtém posts por categoria
 */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

/**
 * Obtém todas as tags únicas
 */
export async function getAllTags(): Promise<{tag: string; count: number}[]> {
  const allPosts = await getAllPosts();
  const tagsWithCount = allPosts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      if (!acc[tag]) {
        acc[tag] = 0;
      }
      acc[tag]++;
    });
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(tagsWithCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Obtém todas as categorias únicas
 */
export async function getAllCategories(): Promise<{category: string; count: number}[]> {
  const allPosts = await getAllPosts();
  const categoriesWithCount = allPosts.reduce((acc, post) => {
    const category = post.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(categoriesWithCount)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Gera um sitemap XML para os posts
 */
export async function generateBlogSitemap(baseUrl: string = 'https://palavraemgraca.com.br'): Promise<string> {
  const allPosts = await getAllPosts();
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Adicionar URLs dos posts
  allPosts.forEach(post => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/${post.slug}</loc>\n`;
    sitemap += `    <lastmod>${post.dateModified}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += '  </url>\n';
  });
  
  // Adicionar URLs das páginas de blog
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/blog</loc>\n`;
  sitemap += '    <changefreq>weekly</changefreq>\n';
  sitemap += '    <priority>0.8</priority>\n';
  sitemap += '  </url>\n';
  
  sitemap += '</urlset>';
  
  return sitemap;
} 