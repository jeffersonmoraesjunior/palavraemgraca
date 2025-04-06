import React, { useState } from 'react';
import { 
  useRandomVerse, 
  useVerseByCategories, 
  useQuoteByCategories,
  useTipsByCategories,
  usePersonalizedGuidance,
  useDetectFeelingCategories
} from '../hooks/useDataService';

/**
 * Componente de exemplo que demonstra o uso dos hooks do dataService
 */
const DataServiceHookExample: React.FC = () => {
  // Estado para o input de sentimento
  const [feeling, setFeeling] = useState('');
  
  // Exemplo 1: Versículo aleatório
  const { 
    verse: randomVerse, 
    loading: randomVerseLoading, 
    error: randomVerseError,
    refresh: refreshRandomVerse
  } = useRandomVerse();
  
  // Exemplo 2: Versículo por categorias
  const { 
    verse: verseByCategories, 
    loading: verseByCategoriesLoading, 
    error: verseByCategoriesError 
  } = useVerseByCategories(['PEACE', 'HOPE']);
  
  // Exemplo 3: Citação por categorias
  const { 
    quote, 
    loading: quoteLoading, 
    error: quoteError 
  } = useQuoteByCategories(['WISDOM', 'FAITH_CRISIS']);
  
  // Exemplo 4: Dicas por categorias
  const { 
    tips,
    loading: tipsLoading,
    error: tipsError,
    refresh: refreshTips
  } = useTipsByCategories(['ANXIETY', 'PEACE']);
  
  // Exemplo 5: Orientação personalizada
  const { 
    guidance, 
    loading: guidanceLoading, 
    error: guidanceError 
  } = usePersonalizedGuidance(feeling);
  
  // Exemplo 6: Detecção de categorias
  const detectedCategories = useDetectFeelingCategories(feeling);
  
  // Handler para atualização do input
  const handleFeelingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeeling(e.target.value);
  };
  
  return (
    <div className="data-service-example">
      <h1>Exemplos de Uso dos Hooks do DataService</h1>
      
      {/* Exemplo 1: Versículo aleatório */}
      <section>
        <h2>1. Versículo Aleatório</h2>
        {randomVerseLoading ? (
          <p>Carregando versículo...</p>
        ) : randomVerseError ? (
          <p className="error">Erro: {randomVerseError.message}</p>
        ) : (
          <blockquote>{randomVerse}</blockquote>
        )}
        <button onClick={refreshRandomVerse}>Obter Novo Versículo</button>
      </section>
      
      {/* Exemplo 2: Versículo por categorias */}
      <section>
        <h2>2. Versículo por Categorias (PAZ, ESPERANÇA)</h2>
        {verseByCategoriesLoading ? (
          <p>Carregando versículo...</p>
        ) : verseByCategoriesError ? (
          <p className="error">Erro: {verseByCategoriesError.message}</p>
        ) : (
          <blockquote>{verseByCategories}</blockquote>
        )}
      </section>
      
      {/* Exemplo 3: Citação por categorias */}
      <section>
        <h2>3. Citação por Categorias (SABEDORIA, CRISE DE FÉ)</h2>
        {quoteLoading ? (
          <p>Carregando citação...</p>
        ) : quoteError ? (
          <p className="error">Erro: {quoteError.message}</p>
        ) : (
          <blockquote>{quote}</blockquote>
        )}
      </section>
      
      {/* Exemplo 4: Dicas por categorias */}
      <section>
        <h2>4. Dicas por Categorias (ANSIEDADE, PAZ)</h2>
        {tipsLoading ? (
          <p>Carregando dicas...</p>
        ) : tipsError ? (
          <p className="error">Erro: {tipsError.message}</p>
        ) : (
          <ul>
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        )}
      </section>
      
      {/* Exemplo 5 e 6: Orientação personalizada e detecção de categorias */}
      <section>
        <h2>5. Orientação Personalizada e Detecção de Categorias</h2>
        <div>
          <label htmlFor="feeling">Descreva como você está se sentindo:</label>
          <input
            type="text"
            id="feeling"
            value={feeling}
            onChange={handleFeelingChange}
            placeholder="Ex: Estou ansioso e com medo do futuro"
          />
        </div>
        
        {feeling && (
          <div>
            <h3>Categorias Detectadas:</h3>
            {detectedCategories.length > 0 ? (
              <ul>
                {detectedCategories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma categoria detectada.</p>
            )}
          </div>
        )}
        
        {guidanceLoading ? (
          <p>Carregando orientação personalizada...</p>
        ) : guidanceError ? (
          <p className="error">Erro: {guidanceError.message}</p>
        ) : guidance ? (
          <div className="guidance">
            <h3>Orientação Personalizada:</h3>
            <div>
              <h4>Versículo:</h4>
              <blockquote>{guidance.verse} ({guidance.verseRef})</blockquote>
            </div>
            <div>
              <h4>Citação:</h4>
              <blockquote>"{guidance.support}" - {guidance.quoteAuthor}</blockquote>
            </div>
            <div>
              <h4>Dicas:</h4>
              <ul>
                {guidance.tips.map((tip: string, index: number) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </section>
      
      <style>
        {`
          .data-service-example {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          section {
            margin-bottom: 40px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          
          h1 {
            color: #333;
            text-align: center;
          }
          
          h2 {
            color: #444;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          
          blockquote {
            font-style: italic;
            border-left: 4px solid #ccc;
            padding-left: 15px;
            margin-left: 0;
          }
          
          .error {
            color: red;
            font-weight: bold;
          }
          
          button {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 10px 15px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 10px 0;
            cursor: pointer;
            border-radius: 4px;
          }
          
          input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
          }
          
          .guidance {
            background-color: #e9f7ef;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default DataServiceHookExample; 