// Definição de tipos para o sistema de dados

// Importação das categorias de sentimentos
import FEELING_CATEGORIES from '../../public/data/categories.json';
export { FEELING_CATEGORIES };

// Interface para versículos
export interface Verse {
  text: string;
  reference: string;
  categories: string[];
}

// Interface para citações
export interface Quote {
  text: string;
  author: string;
  categories: string[];
}

// Interface para dicas
export interface Tip {
  text: string;
  categories: string[];
}

// Interface para controle de sessão
export interface SessionControl {
  recentVerses: string[];
  recentQuotes: string[];
  recentTips: string[];
}

// Interface para resposta personalizada
export interface AIResponse {
  verse: string;
  support: string;
  tips: string[];
  categories: string[];
  verseRef: string;
  quoteAuthor: string;
  tipIds: string[];
}

// Interface para feedback do usuário
export interface UserFeedback {
  verseRef: string;
  quoteAuthor: string;
  tipId: string;
  sentiment: string[];
  rating: number; // 1-5
  helpful: boolean;
  timestamp: number;
}

// Interface para métricas de aprendizado
export interface LearningMetrics {
  categoryCorrelations: {[key: string]: {[key: string]: number}};
  verseEffectiveness: {[key: string]: number};
  quoteEffectiveness: {[key: string]: number};
  tipEffectiveness: {[key: string]: number};
}

// Interface para perfil do usuário
export interface UserProfile {
  id: string;
  preferences: {[key: string]: number};
  history: UserFeedback[];
  learningMetrics: LearningMetrics;
} 