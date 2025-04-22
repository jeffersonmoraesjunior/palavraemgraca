import { useState, useEffect, useCallback } from 'react';
import { dataService } from '../data/dataService';

/**
 * Hook para obter um versículo aleatório
 */
export function useRandomVerse() {
  const [verse, setVerse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVerse = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await dataService.getRandomVerse();
      setVerse(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVerse();
  }, [fetchVerse]);

  return { verse, loading, error, refresh: fetchVerse };
}

/**
 * Hook para obter um versículo por categorias
 */
export function useVerseByCategories(categories: string[]) {
  const [verse, setVerse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVerse = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await dataService.getVerseByCategories(categories);
      setVerse(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    fetchVerse();
  }, [fetchVerse]);

  return { verse, loading, error, refresh: fetchVerse };
}

/**
 * Hook para obter uma citação por categorias
 */
export function useQuoteByCategories(categories: string[]) {
  const [quote, setQuote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchQuote = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await dataService.getQuoteByCategories(categories);
      setQuote(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return { quote, loading, error, refresh: fetchQuote };
}

/**
 * Hook para obter dicas por categorias
 */
export function useTipsByCategories(categories: string[], count: number = 3) {
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTips = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await dataService.getTipsByCategories(categories, count);
      setTips(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  }, [categories, count]);

  useEffect(() => {
    fetchTips();
  }, [fetchTips]);

  return { tips, loading, error, refresh: fetchTips };
}

/**
 * Hook para obter orientação personalizada baseada em um sentimento
 */
export function usePersonalizedGuidance(feeling: string) {
  const [guidance, setGuidance] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGuidance = useCallback(async () => {
    if (!feeling) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await dataService.getPersonalizedGuidance(feeling);
      setGuidance(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  }, [feeling]);

  useEffect(() => {
    fetchGuidance();
  }, [fetchGuidance]);

  return { guidance, loading, error, refresh: fetchGuidance };
}

/**
 * Hook para detectar categorias de sentimentos em um texto
 */
export function useDetectFeelingCategories(text: string) {
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    if (text) {
      const result = dataService.detectFeelingCategories(text);
      setCategories(result);
    } else {
      setCategories([]);
    }
  }, [text]);

  return categories;
} 