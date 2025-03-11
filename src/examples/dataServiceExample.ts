/**
 * Exemplo de uso do dataService
 * 
 * Este arquivo demonstra como usar o novo sistema de dados baseado em JSON
 * para acessar versículos, citações e dicas.
 */

import { dataService } from '../data/dataService';

// Exemplo 1: Obter um versículo aleatório
async function getRandomVerseExample() {
  try {
    console.log('Obtendo versículo aleatório...');
    const verse = await dataService.getRandomVerse();
    console.log('Versículo aleatório:', verse);
    return verse;
  } catch (error) {
    console.error('Erro ao obter versículo aleatório:', error);
    throw error;
  }
}

// Exemplo 2: Obter versículo por categoria
async function getVerseByCategoriesExample() {
  try {
    const categories = ['PEACE', 'HOPE'];
    console.log(`Obtendo versículo para categorias: ${categories.join(', ')}...`);
    const verse = await dataService.getVerseByCategories(categories);
    console.log('Versículo por categorias:', verse);
    return verse;
  } catch (error) {
    console.error('Erro ao obter versículo por categorias:', error);
    throw error;
  }
}

// Exemplo 3: Obter citação por categoria
async function getQuoteByCategoriesExample() {
  try {
    const categories = ['WISDOM', 'FAITH_CRISIS'];
    console.log(`Obtendo citação para categorias: ${categories.join(', ')}...`);
    const quote = await dataService.getQuoteByCategories(categories);
    console.log('Citação por categorias:', quote);
    return quote;
  } catch (error) {
    console.error('Erro ao obter citação por categorias:', error);
    throw error;
  }
}

// Exemplo 4: Obter dicas por categoria
async function getTipsByCategoriesExample() {
  try {
    const categories = ['ANXIETY', 'PEACE'];
    const count = 2;
    console.log(`Obtendo ${count} dicas para categorias: ${categories.join(', ')}...`);
    const tips = await dataService.getTipsByCategories(categories, count);
    console.log('Dicas por categorias:', tips);
    return tips;
  } catch (error) {
    console.error('Erro ao obter dicas por categorias:', error);
    throw error;
  }
}

// Exemplo 5: Obter orientação personalizada
async function getPersonalizedGuidanceExample() {
  try {
    const feeling = 'Estou me sentindo ansioso e com medo do futuro';
    console.log(`Obtendo orientação personalizada para: "${feeling}"...`);
    const guidance = await dataService.getPersonalizedGuidance(feeling);
    console.log('Orientação personalizada:');
    console.log('- Versículo:', guidance.verse);
    console.log('- Referência:', guidance.verseRef);
    console.log('- Citação:', guidance.support);
    console.log('- Autor:', guidance.quoteAuthor);
    console.log('- Dicas:', guidance.tips);
    console.log('- Categorias detectadas:', guidance.categories);
    return guidance;
  } catch (error) {
    console.error('Erro ao obter orientação personalizada:', error);
    throw error;
  }
}

// Exemplo 6: Detectar categorias de sentimentos
function detectFeelingCategoriesExample() {
  try {
    const text = 'Estou me sentindo triste e sozinho, preciso de esperança';
    console.log(`Detectando categorias para: "${text}"...`);
    const categories = dataService.detectFeelingCategories(text);
    console.log('Categorias detectadas:', categories);
    return categories;
  } catch (error) {
    console.error('Erro ao detectar categorias:', error);
    throw error;
  }
}

// Função principal para executar todos os exemplos
async function runAllExamples() {
  console.log('=== EXEMPLOS DE USO DO DATA SERVICE ===\n');
  
  console.log('EXEMPLO 1: Versículo Aleatório');
  await getRandomVerseExample();
  console.log('\n---\n');
  
  console.log('EXEMPLO 2: Versículo por Categorias');
  await getVerseByCategoriesExample();
  console.log('\n---\n');
  
  console.log('EXEMPLO 3: Citação por Categorias');
  await getQuoteByCategoriesExample();
  console.log('\n---\n');
  
  console.log('EXEMPLO 4: Dicas por Categorias');
  await getTipsByCategoriesExample();
  console.log('\n---\n');
  
  console.log('EXEMPLO 5: Orientação Personalizada');
  await getPersonalizedGuidanceExample();
  console.log('\n---\n');
  
  console.log('EXEMPLO 6: Detecção de Categorias');
  detectFeelingCategoriesExample();
  console.log('\n---\n');
  
  console.log('=== TODOS OS EXEMPLOS CONCLUÍDOS ===');
}

// Executar os exemplos
runAllExamples().catch(error => {
  console.error('Erro ao executar exemplos:', error);
}); 