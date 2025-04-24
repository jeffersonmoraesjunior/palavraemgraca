import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

// Função para calcular o tempo de leitura
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min de leitura`;
}

// Diretório dos posts em Markdown
const postsDirectory = path.join(process.cwd(), 'public/contents/markdown');

// Diretório onde serão armazenados os arquivos JSON da API estática
const staticApiDirectory = path.join(process.cwd(), 'public/api');

// Função principal
async function generateStaticApi() {
  console.log('📝 Gerando API estática para os posts do blog...');

  try {
    // Criar diretório api se não existir
    if (!fs.existsSync(staticApiDirectory)) {
      fs.mkdirSync(staticApiDirectory, { recursive: true });
    }

    // Criar diretório para posts individuais
    const postsDir = path.join(staticApiDirectory, 'posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    // Ler todos os arquivos de markdown
    const fileNames = fs.readdirSync(postsDirectory);
    
    // Gerar arquivo com a lista de todos os posts
    fs.writeFileSync(
      path.join(staticApiDirectory, 'posts-list.json'),
      JSON.stringify(fileNames),
      'utf8'
    );

    console.log(`✅ Gerado arquivo posts-list.json com ${fileNames.length} posts`);

    // Processar cada arquivo e gerar seu JSON correspondente
    for (const fileName of fileNames) {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Extrair frontmatter e conteúdo
      const { data, content } = matter(fileContents);
      
      // Processar markdown para HTML
      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(html, { sanitize: false });
      
      const file = await processor.process(content);
      const htmlContent = String(file);
      
      // Calcular tempo de leitura
      const readingTime = calculateReadingTime(content);
      
      // Criar resumo
      const plainText = content
        .replace(/\n/g, ' ')
        .replace(/\r/g, '')
        .replace(/[#*_[\]]/g, '')
        .trim();
      
      const excerpt = plainText.substring(0, 160) + '...';
      
      // Montar objeto do post
      const post = {
        slug,
        content: htmlContent,
        readingTime,
        excerpt,
        ...data
      };
      
      // Salvar arquivo JSON para o post individual
      fs.writeFileSync(
        path.join(postsDir, `${slug}.json`),
        JSON.stringify(post),
        'utf8'
      );
      
      console.log(`✅ Gerado arquivo JSON para o post: ${slug}`);
    }

    console.log('🎉 API estática gerada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao gerar API estática:', error);
    process.exit(1);
  }
}

// Executar o script
generateStaticApi(); 