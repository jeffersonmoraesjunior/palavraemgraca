/**
 * Mock simples para substituir a biblioteca reading-time
 * que causa problemas no ambiente do navegador
 */

export default function readingTime(text) {
  if (!text) return { minutes: 0, text: '0 min de leitura' };
  
  // Cálculo simplificado: ~200 palavras por minuto
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  
  return {
    minutes,
    time: minutes * 60 * 1000, // tempo em milissegundos
    words,
    text: `${minutes} min de leitura`
  };
}

// Adicionar métodos auxiliares para compatibilidade
readingTime.readingTime = readingTime; 