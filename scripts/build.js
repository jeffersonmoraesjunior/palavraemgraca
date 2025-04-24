import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function build() {
  try {
    console.log('🔄 Iniciando o processo de build...');

    // Optimizar imagens
    console.log('🖼️ Optimizando imagens...');
    await execAsync('npm run optimize:images');
    console.log('✅ Imagens otimizadas com sucesso!');
    
    // Gerar o feed RSS
    console.log('📰 Gerando feed RSS...');
    await execAsync('npm run generate:rss');
    console.log('✅ Feed RSS gerado com sucesso!');
    
    // Gerar o sitemap específico para o blog
    console.log('📃 Gerando blog-sitemap.xml...');
    await execAsync('npm run generate:blog-sitemap');
    console.log('✅ blog-sitemap.xml gerado com sucesso!');

    // Gerar API estática para os posts
    console.log('🔄 Gerando API estática para os posts...');
    await execAsync('npm run generate:static-api');
    console.log('✅ API estática gerada com sucesso!');

    // Executar a build do Vite
    console.log('🚧 Gerando build da aplicação...');
    await execAsync('npm run build:all');
    console.log('✅ Build da aplicação concluído!');
    
    console.log('🎉 Processo completo! A aplicação está pronta para implantação.');
  } catch (error) {
    console.error('❌ Erro durante o processo de build:', error);
    process.exit(1);
  }
}

build(); 