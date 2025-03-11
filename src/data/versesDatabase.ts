/**
 * Este arquivo foi refatorado para usar um sistema de dados baseado em JSON
 * para melhor performance e escalabilidade.
 * 
 * Os dados foram movidos para arquivos JSON separados:
 * - /public/data/verses.json - Versículos bíblicos
 * - /public/data/quotes.json - Citações de autores
 * - /public/data/tips.json - Dicas práticas
 * - /public/data/categories.json - Categorias de sentimentos
 * 
 * O acesso aos dados agora é feito através do dataService em ./dataService.ts
 */

// Exportar as interfaces e funções do dataService para manter compatibilidade
export * from './types';
export * from './dataService';

// Aviso de depreciação
console.warn(
  'O arquivo versesDatabase.ts está depreciado. ' +
  'Por favor, use dataService.ts para acessar os dados.'
);