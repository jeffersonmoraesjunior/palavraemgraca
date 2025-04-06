# 📖 Palavra em Graça

<div align="center">
  <img src="public/bible.svg" alt="Palavra em Graça Logo" width="150px" />
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  
  Uma plataforma moderna de conteúdo cristão que oferece versículos bíblicos, orientações personalizadas e artigos edificantes.
</div>

## ✨ Destaques

- 🎯 **Orientação Personalizada**: IA avançada para oferecer palavras de conforto baseadas na Bíblia
- 📱 **PWA Ready**: Funciona offline e pode ser instalado como aplicativo
- 🎨 **Design Moderno**: Interface limpa e responsiva com Tailwind CSS
- 📊 **SEO Otimizado**: Implementação completa de JSON-LD e sitemap automático
- 🔄 **Conteúdo Dinâmico**: Sistema de blog com RSS feed automático
- 🌓 **Tema Adaptativo**: Suporte a modo claro/escuro
- ♿ **Acessibilidade**: Seguindo as melhores práticas WCAG
- 🚀 **Performance**: Otimização automática de assets e code splitting

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: React 18 com TypeScript
- **Build Tool**: Vite 5.4
- **Estilização**: Tailwind CSS 4.1
- **Roteamento**: React Router DOM 7
- **UI Components**: Headless UI
- **Ícones**: Lucide React

### Performance & SEO
- **Meta Tags**: React Helmet
- **Dados Estruturados**: JSON-LD
- **Métricas**: Web Vitals
- **Otimização**: Sharp para imagens

### Integrações
- **IA**: OpenAI API
- **Feed**: RSS Automático
- **Sitemap**: Geração Dinâmica

## 🚀 Começando

### Pré-requisitos
\`\`\`bash
node >= 16.0.0
npm >= 7.0.0
\`\`\`

### Instalação

1. **Clone o repositório**
   \`\`\`bash
   git clone https://github.com/seu-usuario/palavra-em-graca.git
   cd palavra-em-graca
   \`\`\`

2. **Instale as dependências**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure as variáveis de ambiente**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Inicie o ambiente de desenvolvimento**
   \`\`\`bash
   npm run dev
   \`\`\`

## 📦 Scripts Disponíveis

- \`npm run dev\`: Inicia o servidor de desenvolvimento
- \`npm run build\`: Build de produção com todas as otimizações
- \`npm run preview\`: Preview da build de produção
- \`npm run lint\`: Executa o linter
- \`npm run generate:rss\`: Gera o feed RSS
- \`npm run generate-sitemap\`: Atualiza o sitemap
- \`npm run image-optimize\`: Otimiza as imagens

## 📝 Sistema de Blog

### Estrutura de Post
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Título do Post",
  "description": "Descrição SEO",
  "author": {
    "@type": "Person",
    "name": "Autor"
  },
  "datePublished": "2024-04-14T10:00:00Z",
  "content": {
    "introduction": "Texto introdutório",
    "sections": [
      {
        "title": "Seção 1",
        "content": "Conteúdo"
      }
    ]
  }
}
\`\`\`

## 🌐 Rotas Principais

- \`/\`: Página inicial com versículo do dia
- \`/orientacao\`: Orientação personalizada
- \`/artigos\`: Lista de artigos do blog
- \`/artigos/[slug]\`: Artigo individual
- \`/biblia\`: Explorador bíblico
- \`/sobre\`: Sobre o projeto

## 📱 Progressive Web App

A aplicação é totalmente PWA compatível:
- ✅ Instalável como aplicativo
- ✅ Funciona offline
- ✅ Cache inteligente
- ✅ Atualizações automáticas

## 🔒 Segurança

- ✅ Sanitização de conteúdo
- ✅ Headers de segurança
- ✅ Proteção contra XSS
- ✅ Variáveis de ambiente seguras

## 📈 Performance

Métricas de Web Vitals:
- ⚡ First Contentful Paint (FCP): < 1.8s
- 🎯 Largest Contentful Paint (LCP): < 2.5s
- ⌛ First Input Delay (FID): < 100ms
- 📊 Cumulative Layout Shift (CLS): < 0.1

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a Branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- Website: [palavraemgraca.com.br](https://palavraemgraca.com.br)
- Email: contato@palavraemgraca.com.br

---

<div align="center">
  
  **Feito com ❤️ para a glória de Deus**
  
  [⬆ Voltar ao topo](#-palavra-em-graça)
</div> 