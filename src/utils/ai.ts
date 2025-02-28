import { 
  detectFeelingCategories, 
  getRandomVerse, 
  getVerseByCategories, 
  getQuoteByCategories, 
  getTipsByCategories 
} from './versesDatabase';

// Categorias de sentimentos para ajudar na personalização
const FEELING_CATEGORIES = {
  ANXIETY: ['ansioso', 'ansiosa', 'ansiedade', 'preocupado', 'preocupada', 'medo', 'nervoso', 'nervosa', 'tenso', 'tensa'],
  SADNESS: ['triste', 'tristeza', 'deprimido', 'deprimida', 'depressão', 'melancolia', 'melancólico', 'melancólica', 'desanimado', 'desanimada'],
  ANGER: ['raiva', 'irritado', 'irritada', 'frustrado', 'frustrada', 'bravo', 'brava', 'indignado', 'indignada'],
  JOY: ['feliz', 'felicidade', 'alegre', 'alegria', 'contente', 'satisfeito', 'satisfeita', 'realizado', 'realizada'],
  GRATITUDE: ['grato', 'grata', 'gratidão', 'agradecido', 'agradecida', 'abençoado', 'abençoada'],
  CONFUSION: ['confuso', 'confusa', 'perdido', 'perdida', 'indeciso', 'indecisa', 'dúvida', 'incerto', 'incerta'],
  HOPE: ['esperança', 'esperançoso', 'esperançosa', 'otimista', 'confiante', 'fé'],
  LOVE: ['amor', 'amoroso', 'amorosa', 'apaixonado', 'apaixonada', 'carinho', 'carinhoso', 'carinhosa'],
  LONELINESS: ['sozinho', 'sozinha', 'solidão', 'abandonado', 'abandonada', 'isolado', 'isolada'],
  FAITH_CRISIS: ['crise', 'fé', 'dúvida', 'espiritual', 'distante', 'deus', 'afastado', 'afastada']
};

/**
 * Obtém um versículo diário aleatório
 * @returns Versículo com referência
 */
export async function getDailyVerse(): Promise<string> {
  try {
    // Usa o banco de dados local para obter um versículo aleatório
    return getRandomVerse();
  } catch (error) {
    console.error('Error fetching daily verse:', error);
    return "João 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.";
  }
}

/**
 * Obtém orientação personalizada com base nos sentimentos do usuário
 * @param feeling Texto descrevendo os sentimentos do usuário
 * @returns Objeto com versículo, citação de apoio e dicas práticas
 */
export async function getPersonalizedGuidance(feeling: string) {
  try {
    // Detecta categorias de sentimentos no texto
    const categories = detectFeelingCategories(feeling);
    
    // Obtém um versículo relevante para as categorias detectadas
    const verse = getVerseByCategories(categories);
    
    // Obtém uma citação relevante para as categorias detectadas
    const support = getQuoteByCategories(categories);
    
    // Obtém dicas práticas relevantes para as categorias detectadas
    const tips = getTipsByCategories(categories, 3);
    
    return {
      verse,
      support,
      tips
    };
  } catch (error) {
    console.error('Error generating personalized guidance:', error);
    return {
      verse: "Filipenses 4:6-7 - Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.",
      support: "Deus está sempre conosco em todos os momentos, mesmo quando não sentimos Sua presença. - Max Lucado",
      tips: [
        "Faça uma pausa para respirar profundamente",
        "Dedique um momento para oração",
        "Escreva seus sentimentos em um diário"
      ]
    };
  }
}