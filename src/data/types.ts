// Definição de tipos para o sistema de dados

// Categorias de sentimentos
export const FEELING_CATEGORIES = {
  ANXIETY: ["ansiedade", "preocupação", "nervoso", "tenso", "estresse", "medo", "pânico", "aflito"],
  SADNESS: ["tristeza", "depressão", "melancolia", "desânimo", "abatido", "desesperança", "luto", "chorar"],
  ANGER: ["raiva", "irritação", "frustração", "ódio", "ressentimento", "indignação", "fúria", "bravo"],
  JOY: ["alegria", "felicidade", "contentamento", "satisfação", "prazer", "entusiasmo", "animado", "feliz"],
  GRATITUDE: ["gratidão", "agradecimento", "reconhecimento", "apreciação", "grato"],
  CONFUSION: ["confusão", "dúvida", "incerteza", "indecisão", "perplexidade", "perdido"],
  HOPE: ["esperança", "expectativa", "otimismo", "confiança", "fé", "acreditar"],
  LOVE: ["amor", "carinho", "afeto", "compaixão", "empatia", "cuidado", "amar"],
  LONELINESS: ["solidão", "abandono", "isolamento", "rejeição", "sozinho", "desamparado"],
  FAITH_CRISIS: ["crise de fé", "dúvida espiritual", "questionamento", "distante de Deus", "vazio espiritual"],
  PEACE: ["paz", "tranquilidade", "serenidade", "calma", "sossego", "quietude"],
  STRENGTH: ["força", "coragem", "determinação", "perseverança", "resistência", "firmeza"],
  HEALING: ["cura", "recuperação", "restauração", "renovação", "saúde", "bem-estar"],
  FORGIVENESS: ["perdão", "reconciliação", "libertação", "soltar", "perdoar"],
  TRUST: ["confiança", "segurança", "certeza", "fé", "acreditar", "confiar"],
  PURPOSE: ["propósito", "significado", "direção", "sentido", "missão", "chamado"],
  WISDOM: ["sabedoria", "discernimento", "entendimento", "conhecimento", "prudência"],
  HUMILITY: ["humildade", "mansidão", "modéstia", "simplicidade", "humilde"],
  PATIENCE: ["paciência", "espera", "perseverança", "tolerância", "calma", "aguardar"],
  COMMITMENT: ["compromisso", "dedicação", "fidelidade", "lealdade", "persistência"],
  GROWTH: ["crescimento", "desenvolvimento", "progresso", "amadurecimento", "evolução"],
  IDENTITY: ["identidade", "quem sou", "valor pessoal", "autoconhecimento", "autoimagem"],
  WORTH: ["valor", "dignidade", "importância", "preciosidade", "autoestima"],
  REST: ["descanso", "repouso", "relaxamento", "alívio", "pausa", "descansar"],
  VICTORY: ["vitória", "conquista", "superação", "triunfo", "sucesso", "vencer"],
  WORSHIP: ["adoração", "louvor", "reverência", "devoção", "culto", "adorar"],
  LEARNING: ["aprendizado", "ensino", "instrução", "educação", "conhecimento"],
  TRUTH: ["verdade", "realidade", "autenticidade", "sinceridade", "honestidade"],
  COURAGE: ["coragem", "bravura", "ousadia", "valentia", "audácia", "destemor"],
  CHANGE: ["mudança", "transformação", "renovação", "conversão", "reforma"]
};

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