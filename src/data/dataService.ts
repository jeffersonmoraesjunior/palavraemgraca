import { 
  Verse, 
  Quote, 
  Tip, 
  SessionControl, 
  AIResponse, 
  UserFeedback,
  LearningMetrics,
  UserProfile,
  FEELING_CATEGORIES
} from './types';

// Cache em memória
const cache: Record<string, any> = {};

// Versão dos dados para controle de cache
const DATA_VERSION = '1.0.0';

/**
 * Carrega dados com sistema de cache em camadas
 * 1. Cache em memória
 * 2. LocalStorage
 * 3. Rede (fetch)
 */
async function loadData<T>(key: string, url: string): Promise<T[]> {
  // Verificar cache em memória
  if (cache[key]) {
    return cache[key];
  }
  
  try {
    // Verificar localStorage
    const storedVersion = localStorage.getItem(`data_version_${key}`);
    const stored = localStorage.getItem(`data_${key}`);
    
    if (stored && storedVersion === DATA_VERSION) {
      const parsedData = JSON.parse(stored);
      cache[key] = parsedData;
      return parsedData;
    }
    
    // Carregar da rede
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Falha ao carregar dados: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Armazenar em cache
    cache[key] = data;
    try {
      localStorage.setItem(`data_${key}`, JSON.stringify(data));
      localStorage.setItem(`data_version_${key}`, DATA_VERSION);
    } catch (e) {
      console.warn('Não foi possível armazenar em localStorage:', e);
    }
    
    return data;
  } catch (error) {
    console.error(`Erro ao carregar dados ${key}:`, error);
    throw error;
  }
}

/**
 * Gerencia o controle de sessão
 */
function getSession(): SessionControl {
  const defaultSession: SessionControl = {
    recentVerses: [],
    recentQuotes: [],
    recentTips: []
  };
  
  try {
    const stored = localStorage.getItem('session');
    return stored ? JSON.parse(stored) : defaultSession;
  } catch (e) {
    return defaultSession;
  }
}

function updateSession(session: SessionControl): void {
  try {
    localStorage.setItem('session', JSON.stringify(session));
  } catch (e) {
    console.warn('Não foi possível atualizar a sessão:', e);
  }
}

function addRecentItem(type: 'verses' | 'quotes' | 'tips', item: string): void {
  const session = getSession();
  const key = `recent${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof SessionControl;
  
  // Remover se já existir
  const array = session[key] as string[];
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
  
  // Adicionar ao início
  array.unshift(item);
  
  // Manter apenas os 10 mais recentes
  if (array.length > 10) {
    array.pop();
  }
  
  updateSession(session);
}

/**
 * Detecta categorias de sentimentos no texto
 */
function detectFeelingCategories(text: string): string[] {
  const normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const categories: string[] = [];
  
  Object.entries(FEELING_CATEGORIES).forEach(([category, keywords]) => {
    for (const keyword of keywords) {
      if (normalizedText.includes(keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        categories.push(category);
        break;
      }
    }
  });
  
  return categories;
}

/**
 * API pública do serviço de dados
 */
export const dataService = {
  // Métodos de carregamento básicos
  getVerses: () => loadData<Verse>('verses', '/data/verses.json'),
  getQuotes: () => loadData<Quote>('quotes', '/data/quotes.json'),
  getTips: () => loadData<Tip>('tips', '/data/tips.json'),
  
  // Métodos de utilidade
  detectFeelingCategories,
  
  // Métodos de sessão
  getSession,
  updateSession,
  addRecentItem,
  
  // Métodos de acesso específicos
  getRandomVerse: async (): Promise<string> => {
    const verses = await loadData<Verse>('verses', '/data/verses.json');
    
    // Obter versículos recentes para evitar repetições
    const session = getSession();
    const recentVerses = session.recentVerses;
    
    // Filtrar versículos que não foram usados recentemente
    const availableVerses = verses.filter(verse => 
      !recentVerses.includes(verse.reference)
    );
    
    // Se todos os versículos já foram usados recentemente, usar todos
    const versesToSelectFrom = availableVerses.length > 0 ? availableVerses : verses;
    
    const randomIndex = Math.floor(Math.random() * versesToSelectFrom.length);
    const verse = versesToSelectFrom[randomIndex];
    addRecentItem('verses', verse.reference);
    return `${verse.text} (${verse.reference})`;
  },
  
  getVerseByCategories: async (categories: string[]): Promise<string> => {
    const verses = await loadData<Verse>('verses', '/data/verses.json');
    
    // Filtrar versículos que contêm pelo menos uma das categorias
    const matchingVerses = verses.filter(verse => 
      verse.categories.some(category => categories.includes(category))
    );
    
    if (matchingVerses.length === 0) {
      return dataService.getRandomVerse();
    }
    
    // Ordenar por relevância (número de categorias correspondentes)
    matchingVerses.sort((a, b) => {
      const aMatches = a.categories.filter(cat => categories.includes(cat)).length;
      const bMatches = b.categories.filter(cat => categories.includes(cat)).length;
      return bMatches - aMatches;
    });
    
    // Obter versículos recentes para evitar repetições
    const session = getSession();
    const recentVerses = session.recentVerses;
    
    // Filtrar versículos que não foram usados recentemente
    const availableVerses = matchingVerses.filter(verse => 
      !recentVerses.includes(verse.reference)
    );
    
    // Se todos os versículos já foram usados recentemente, usar todos os versículos correspondentes
    const versesToSelectFrom = availableVerses.length > 0 ? availableVerses : matchingVerses;
    
    // Selecionar aleatoriamente entre os versículos disponíveis
    const randomIndex = Math.floor(Math.random() * Math.min(5, versesToSelectFrom.length));
    const selectedVerse = versesToSelectFrom[randomIndex];
    
    addRecentItem('verses', selectedVerse.reference);
    return `${selectedVerse.text} (${selectedVerse.reference})`;
  },
  
  getQuoteByCategories: async (categories: string[]): Promise<string> => {
    const quotes = await loadData<Quote>('quotes', '/data/quotes.json');
    
    // Filtrar citações que contêm pelo menos uma das categorias
    const matchingQuotes = quotes.filter(quote => 
      quote.categories.some(category => categories.includes(category))
    );
    
    if (matchingQuotes.length === 0) {
      // Selecionar aleatoriamente se não houver correspondência
      const session = getSession();
      const recentQuotes = session.recentQuotes;
      
      // Filtrar citações que não foram usadas recentemente
      const availableQuotes = quotes.filter(quote => 
        !recentQuotes.includes(quote.text)
      );
      
      // Se todas as citações já foram usadas recentemente, usar todas
      const quotesToSelectFrom = availableQuotes.length > 0 ? availableQuotes : quotes;
      
      const randomIndex = Math.floor(Math.random() * quotesToSelectFrom.length);
      const quote = quotesToSelectFrom[randomIndex];
      addRecentItem('quotes', quote.text);
      return `"${quote.text}" - ${quote.author}`;
    }
    
    // Ordenar por relevância (número de categorias correspondentes)
    matchingQuotes.sort((a, b) => {
      const aMatches = a.categories.filter(cat => categories.includes(cat)).length;
      const bMatches = b.categories.filter(cat => categories.includes(cat)).length;
      return bMatches - aMatches;
    });
    
    // Obter citações recentes para evitar repetições
    const session = getSession();
    const recentQuotes = session.recentQuotes;
    
    // Filtrar citações que não foram usadas recentemente
    const availableQuotes = matchingQuotes.filter(quote => 
      !recentQuotes.includes(quote.text)
    );
    
    // Se todas as citações já foram usadas recentemente, usar todas as citações correspondentes
    const quotesToSelectFrom = availableQuotes.length > 0 ? availableQuotes : matchingQuotes;
    
    // Selecionar aleatoriamente entre as citações mais relevantes
    const topQuotes = quotesToSelectFrom.slice(0, 5);
    const randomIndex = Math.floor(Math.random() * topQuotes.length);
    const selectedQuote = topQuotes[randomIndex];
    
    addRecentItem('quotes', selectedQuote.text);
    return `"${selectedQuote.text}" - ${selectedQuote.author}`;
  },
  
  getTipsByCategories: async (categories: string[]): Promise<string[]> => {
    const tips = await loadData<Tip>('tips', '/data/tips.json');
    
    // Filtrar dicas que contêm pelo menos uma das categorias
    const matchingTips = tips.filter(tip => 
      tip.categories.some(category => categories.includes(category))
    );
    
    if (matchingTips.length === 0) {
      // Selecionar aleatoriamente se não houver correspondência
      const session = getSession();
      const recentTips = session.recentTips;
      
      // Filtrar dicas que não foram usadas recentemente
      const availableTips = tips.filter(tip => 
        !recentTips.includes(tip.text)
      );
      
      // Se todas as dicas já foram usadas recentemente, usar todas
      const tipsToSelectFrom = availableTips.length > 0 ? availableTips : tips;
      
      // Selecionar 3 dicas aleatórias
      const selectedTips: string[] = [];
      const maxTips = Math.min(3, tipsToSelectFrom.length);
      
      while (selectedTips.length < maxTips) {
        const randomIndex = Math.floor(Math.random() * tipsToSelectFrom.length);
        const tip = tipsToSelectFrom[randomIndex];
        
        if (!selectedTips.includes(tip.text)) {
          selectedTips.push(tip.text);
          addRecentItem('tips', tip.text);
        }
      }
      
      return selectedTips;
    }
    
    // Ordenar por relevância (número de categorias correspondentes)
    matchingTips.sort((a, b) => {
      const aMatches = a.categories.filter(cat => categories.includes(cat)).length;
      const bMatches = b.categories.filter(cat => categories.includes(cat)).length;
      return bMatches - aMatches;
    });
    
    // Obter dicas recentes para evitar repetições
    const session = getSession();
    const recentTips = session.recentTips;
    
    // Filtrar dicas que não foram usadas recentemente
    const availableTips = matchingTips.filter(tip => 
      !recentTips.includes(tip.text)
    );
    
    // Se todas as dicas já foram usadas recentemente, usar todas as dicas correspondentes
    const tipsToSelectFrom = availableTips.length > 0 ? availableTips : matchingTips;
    
    // Selecionar 3 dicas aleatórias entre as mais relevantes
    const selectedTips: string[] = [];
    const maxTips = Math.min(3, tipsToSelectFrom.length);
    const topTips = tipsToSelectFrom.slice(0, Math.max(5, maxTips * 2));
    
    while (selectedTips.length < maxTips) {
      const randomIndex = Math.floor(Math.random() * topTips.length);
      const tip = topTips[randomIndex];
      
      if (!selectedTips.includes(tip.text)) {
        selectedTips.push(tip.text);
        addRecentItem('tips', tip.text);
      }
    }
    
    return selectedTips;
  },
  
  getPersonalizedGuidance: async (feeling: string): Promise<AIResponse> => {
    // Detectar categorias de sentimento
    const categories = detectFeelingCategories(feeling);
    
    // Se não houver categorias detectadas, usar algumas padrão
    const effectiveCategories = categories.length > 0 
      ? categories 
      : ['PEACE', 'HOPE', 'STRENGTH'];
    
    // Obter versículo
    const verseWithRef = await dataService.getVerseByCategories(effectiveCategories);
    const verseMatch = verseWithRef.match(/(.*) \((.*)\)$/);
    const verse = verseMatch ? verseMatch[1] : verseWithRef;
    const verseRef = verseMatch ? verseMatch[2] : '';
    
    // Obter citação
    const quoteWithAuthor = await dataService.getQuoteByCategories(effectiveCategories);
    const quoteMatch = quoteWithAuthor.match(/"(.*)" - (.*)$/);
    const support = quoteMatch ? quoteMatch[1] : quoteWithAuthor;
    const quoteAuthor = quoteMatch ? quoteMatch[2] : '';
    
    // Obter dicas
    const tips = await dataService.getTipsByCategories(effectiveCategories);
    
    return {
      verse,
      support,
      tips,
      categories: effectiveCategories,
      verseRef,
      quoteAuthor,
      tipIds: tips.map(tip => tip.substring(0, 30))
    };
  },
  
  // Métodos para feedback e aprendizado
  provideFeedback: (
    verseRef: string,
    quoteAuthor: string,
    tipId: string,
    sentiment: string[],
    rating: number,
    helpful: boolean
  ): void => {
    const feedback: UserFeedback = {
      verseRef,
      quoteAuthor,
      tipId,
      sentiment,
      rating,
      helpful,
      timestamp: Date.now()
    };
    
    try {
      // Obter perfil do usuário
      const profile = dataService.getUserProfile();
      
      // Adicionar feedback ao histórico
      profile.history.push(feedback);
      
      // Atualizar métricas de aprendizado
      dataService.updateLearningMetrics(feedback);
      
      // Salvar perfil atualizado
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Não foi possível salvar feedback:', e);
    }
  },
  
  getUserProfile: (): UserProfile => {
    const defaultProfile: UserProfile = {
      id: crypto.randomUUID ? crypto.randomUUID() : `user_${Date.now()}`,
      preferences: {},
      history: [],
      learningMetrics: {
        categoryCorrelations: {},
        verseEffectiveness: {},
        quoteEffectiveness: {},
        tipEffectiveness: {}
      }
    };
    
    try {
      const stored = localStorage.getItem('userProfile');
      return stored ? JSON.parse(stored) : defaultProfile;
    } catch (e) {
      return defaultProfile;
    }
  },
  
  updateLearningMetrics: (feedback: UserFeedback): void => {
    try {
      const profile = dataService.getUserProfile();
      const metrics = profile.learningMetrics;
      
      // Atualizar efetividade do versículo
      if (feedback.verseRef) {
        metrics.verseEffectiveness[feedback.verseRef] = 
          (metrics.verseEffectiveness[feedback.verseRef] || 0) + 
          (feedback.helpful ? 1 : -0.5);
      }
      
      // Atualizar efetividade da citação
      if (feedback.quoteAuthor) {
        metrics.quoteEffectiveness[feedback.quoteAuthor] = 
          (metrics.quoteEffectiveness[feedback.quoteAuthor] || 0) + 
          (feedback.helpful ? 1 : -0.5);
      }
      
      // Atualizar efetividade da dica
      if (feedback.tipId) {
        metrics.tipEffectiveness[feedback.tipId] = 
          (metrics.tipEffectiveness[feedback.tipId] || 0) + 
          (feedback.helpful ? 1 : -0.5);
      }
      
      // Atualizar correlações de categoria
      feedback.sentiment.forEach(cat1 => {
        if (!metrics.categoryCorrelations[cat1]) {
          metrics.categoryCorrelations[cat1] = {};
        }
        
        feedback.sentiment.forEach(cat2 => {
          if (cat1 !== cat2) {
            metrics.categoryCorrelations[cat1][cat2] = 
              (metrics.categoryCorrelations[cat1][cat2] || 0) + 1;
          }
        });
      });
      
      // Salvar perfil atualizado
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Não foi possível atualizar métricas de aprendizado:', e);
    }
  }
}; 