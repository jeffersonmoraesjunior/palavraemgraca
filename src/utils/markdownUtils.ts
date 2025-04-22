import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

// Dados mockados para desenvolvimento
const mockPosts = [
  {
    slug: 'primeiro-post',
    title: 'Bem-vindo ao Blog dos Amigos de Deus',
    description: 'Uma introdução ao nosso blog com reflexões sobre a jornada cristã',
    author: 'Equipe Amigos de Deus',
    datePublished: '2023-09-01T12:00:00Z',
    dateModified: '2023-09-01T12:00:00Z',
    featuredImage: '/images/bem-vindo-blog.webp',
    tags: ['Boas-vindas', 'Espiritualidade', 'Fé'],
    keywords: ['blog cristão', 'amigos de deus', 'jornada espiritual', 'reflexões cristãs'],
    category: 'Geral',
    content: `<h1>Bem-vindo ao Blog dos Amigos de Deus</h1>
<p>Olá, queridos irmãos e irmãs em Cristo! É com grande alegria que inauguramos este espaço dedicado à reflexão, edificação e crescimento espiritual.</p>
<h2>Nossa Missão</h2>
<p>Nosso objetivo com este blog é compartilhar mensagens que possam:</p>
<ul>
<li>Fortalecer sua fé nos momentos de dificuldade</li>
<li>Proporcionar estudos bíblicos acessíveis e profundos</li>
<li>Criar uma comunidade de apoio e oração</li>
<li>Compartilhar testemunhos inspiradores</li>
</ul>
<h2>O Que Esperar</h2>
<p>Nos próximos meses, estaremos publicando regularmente conteúdos sobre:</p>
<ol>
<li>Estudos bíblicos temáticos</li>
<li>Reflexões sobre o cotidiano cristão</li>
<li>Testemunhos de transformação</li>
<li>Devocionais para sua caminhada diária</li>
</ol>
<h2>Um Versículo para Reflexão</h2>
<blockquote>
<p>"Não to mandei eu? Esforça-te, e tem bom ânimo; não te atemorizes, nem te espantes; porque o Senhor, teu Deus, está contigo, por onde quer que andares." - Josué 1:9</p>
</blockquote>
<p>Este versículo nos lembra que Deus está sempre conosco, guiando nossos passos e nos dando forças para perseverar.</p>
<h2>Junte-se a Nós</h2>
<p>Convidamos você a assinar nossa newsletter, compartilhar nossas publicações e comentar com suas próprias reflexões. Juntos, podemos crescer em conhecimento e graça.</p>
<p>Que a paz de Cristo esteja com todos vocês!</p>
<p><em>Equipe Amigos de Deus</em></p>`,
    readingTime: '3 min de leitura',
    excerpt: 'Olá, queridos irmãos e irmãs em Cristo! É com grande alegria que inauguramos este espaço dedicado à reflexão, edificação e crescimento espiritual...'
  },
  {
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
    content: `<h1>O Poder da Oração Diária na Vida Cristã</h1>
<p>A oração não é apenas um ritual ou uma série de palavras que repetimos diariamente. É uma conversa íntima com o Criador do universo, um privilégio concedido a cada filho de Deus. Neste artigo, vamos explorar como desenvolver uma vida de oração significativa e transformadora.</p>
<h2>Por Que Precisamos Orar Diariamente?</h2>
<p>Muitos cristãos perguntam: "Se Deus já sabe tudo, por que preciso orar?" A resposta está no relacionamento. A oração nos aproxima de Deus, permitindo que experimentemos Sua presença de maneira tangível. Através da oração:</p>
<ol>
<li><strong>Desenvolvemos intimidade com Deus</strong></li>
<li><strong>Alinhamos nossa vontade com a vontade divina</strong></li>
<li><strong>Encontramos força e direção para o dia</strong></li>
<li><strong>Crescemos em discernimento espiritual</strong></li>
</ol>
<h2>Estabelecendo uma Rotina de Oração</h2>
<p>Para desenvolver o hábito da oração, considere estas dicas práticas:</p>
<ul>
<li><strong>Escolha um horário específico</strong>: Seja pela manhã, à tarde ou à noite, reserve um momento do seu dia exclusivamente para a oração.</li>
<li><strong>Crie um ambiente propício</strong>: Encontre um lugar tranquilo, livre de distrações.</li>
<li><strong>Comece com gratidão</strong>: Antes de apresentar pedidos, agradeça a Deus por Suas bênçãos.</li>
<li><strong>Use a Bíblia como guia</strong>: Leia um trecho da Escritura e transforme-o em oração.</li>
<li><strong>Seja específico</strong>: Deus se interessa pelos detalhes da sua vida.</li>
</ul>
<h2>Um Modelo Simples de Oração</h2>
<p>Jesus nos ensinou um modelo de oração conhecido como o "Pai Nosso" (Mateus 6:9-13). Podemos usar esta estrutura como base:</p>
<blockquote>
<p>"Portanto, vós orareis assim: Pai nosso que estás nos céus, santificado seja o teu nome; venha o teu reino, seja feita a tua vontade, assim na terra como no céu; o pão nosso de cada dia dá-nos hoje; e perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores; e não nos induzas à tentação, mas livra-nos do mal; porque teu é o reino, e o poder, e a glória, para sempre. Amém!"</p>
</blockquote>
<h2>Testemunho Pessoal</h2>
<p>Em minha própria jornada, descobri que os momentos mais transformadores da minha vida espiritual aconteceram no contexto da oração. Foi orando que recebi direção para decisões importantes, encontrei cura emocional e experimentei a presença de Deus de maneira mais profunda.</p>
<p>Lembre-se: a oração não é sobre palavras eloquentes ou longas horas de joelhos. É sobre sinceridade de coração e desejo genuíno de comunhão com Deus.</p>
<p>Que possamos todos crescer nesta maravilhosa disciplina espiritual!</p>
<p><em>"Orai sem cessar." - 1 Tessalonicenses 5:17</em></p>`,
    readingTime: '5 min de leitura',
    excerpt: 'A oração não é apenas um ritual ou uma série de palavras que repetimos diariamente. É uma conversa íntima com o Criador do universo, um privilégio concedido a cada filho de Deus...'
  }
];

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

/**
 * Obtém todos os posts de blog
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  console.log('Obtendo todos os posts...');
  
  // Usando dados mockados para desenvolvimento
  // Em produção, isto poderia usar uma API ou outro método para obter os posts
  return mockPosts;
}

/**
 * Obtém um post específico pelo slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  console.log(`Buscando post com slug: ${slug}`);
  
  const post = mockPosts.find(p => p.slug === slug);
  
  if (!post) {
    console.error('Post não encontrado:', slug);
    return null;
  }
  
  return post;
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