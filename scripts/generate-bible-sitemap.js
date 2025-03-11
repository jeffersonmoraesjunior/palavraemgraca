import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obter o diretório atual do módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const SITE_URL = "https://palavraemgraca.com.br";
const BIBLE_DIR = path.join(__dirname, "../public/bible");
const OUTPUT_DIR = path.join(__dirname, "../public/bible-sitemaps/");

// Mapeamento de versões da Bíblia para nomes completos
const BIBLE_VERSIONS = {
  "NTLH": "Nova Tradução na Linguagem de Hoje",
  "NVI": "Nova Versão Internacional",
  "ACF": "Almeida Corrigida Fiel",
  "ARA": "Almeida Revista e Atualizada",
  "ARC": "Almeida Revista e Corrigida",
  "AS21": "Almeida Século 21",
  "JFAA": "João Ferreira de Almeida Atualizada",
  "KJA": "King James Atualizada",
  "KJF": "King James Fiel",
  "NAA": "Nova Almeida Atualizada",
  "NBV": "Nova Bíblia Viva",
  "NVT": "Nova Versão Transformadora",
  "TB": "Tradução Brasileira"
};

// Informações adicionais sobre as versões (somente o necessário)
const VERSION_INFO = {
  "NTLH": { priority: "0.9" },
  "NVI": { priority: "0.9" },
  "ACF": { priority: "0.8" },
  "ARA": { priority: "0.8" },
  "ARC": { priority: "0.8" },
  "AS21": { priority: "0.8" },
  "JFAA": { priority: "0.8" },
  "KJA": { priority: "0.7" },
  "KJF": { priority: "0.7" },
  "NAA": { priority: "0.8" },
  "NBV": { priority: "0.8" },
  "NVT": { priority: "0.9" },
  "TB": { priority: "0.8" }
};

// Função para gerar o sitemap de uma única versão
function generateVersionSitemap(version, bibleData) {
  const versionLower = version.toLowerCase();
  const versionPriority = VERSION_INFO[version]?.priority || "0.7";
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Adicionar a página de índice da versão
  sitemap += `  <url>
    <loc>${SITE_URL}/biblia/indice/${versionLower}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  // Mapear abreviações e nomes dos livros
  const booksInfo = bibleData.map(book => ({
    abbrev: book.abbrev.toLowerCase(),
    name: book.name,
    chapters: book.chapters.length
  }));

  // Para cada livro
  for (const book of booksInfo) {
    // Para cada capítulo
    for (let chapterIndex = 0; chapterIndex < book.chapters; chapterIndex++) {
      const chapterNumber = chapterIndex + 1;

      // Adicionar a página do capítulo
      sitemap += `  <url>
    <loc>${SITE_URL}/biblia/${versionLower}/${book.abbrev}/${chapterNumber}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }
  }

  // Fechar o XML
  sitemap += `</urlset>`;
  return sitemap;
}

// Função principal
async function generateBibleSitemaps() {
  console.log("Gerando sitemaps separados para cada tradução da Bíblia...");

  try {
    // Ler os arquivos da Bíblia disponíveis
    const bibleFiles = fs
      .readdirSync(BIBLE_DIR)
      .filter((file) => file.endsWith(".json"));

    if (bibleFiles.length === 0) {
      console.error("Nenhum arquivo de Bíblia encontrado!");
      return;
    }

    // Garantir que o diretório de saída exista
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Para cada versão da Bíblia
    for (const bibleFile of bibleFiles) {
      const version = bibleFile.replace(".json", "");
      console.log(`Processando versão: ${version}`);

      // Ler os dados da Bíblia para esta versão
      const bibleData = JSON.parse(
        fs.readFileSync(path.join(BIBLE_DIR, bibleFile), "utf8")
      );

      // Gerar o sitemap para esta versão
      const sitemap = generateVersionSitemap(version, bibleData);

      // Nome do arquivo de saída (ex.: acf-sitemap.xml)
      const outputFile = path.join(OUTPUT_DIR, `${version.toLowerCase()}-sitemap.xml`);

      // Escrever o arquivo
      fs.writeFileSync(outputFile, sitemap);
      console.log(`Sitemap gerado com sucesso: ${outputFile}`);
    }

    // Gerar estatísticas gerais
    const totalVersions = bibleFiles.length;
    const statsFile = path.join(OUTPUT_DIR, "bible-sitemap-stats.json");
    const stats = {
      totalVersions,
      versions: bibleFiles.map(file => file.replace(".json", "")),
      generatedAt: new Date().toISOString()
    };
    fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    console.log(`Estatísticas salvas em: ${statsFile}`);
    
  } catch (error) {
    console.error("Erro ao gerar sitemaps:", error);
  }
}

// Executar a função
generateBibleSitemaps();