import React, { useState } from 'react';
import { DailyVerse, FeelingInput } from './components';

function SimpleApp() {
  const [feeling, setFeeling] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleGuidance = () => {
    if (feeling.length < 20) {
      alert('Por favor, escreva pelo menos 20 caracteres sobre como está se sentindo.');
      return;
    }
    
    // Simulação de carregamento
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Funcionalidade simplificada: Em uma aplicação completa, você receberia orientação personalizada aqui.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Palavra em Graça</h1>
        <p className="text-lg mt-2">Conforto espiritual para o seu dia</p>
      </header>
      
      <main className="max-w-2xl mx-auto">
        <DailyVerse simplified />
        
        <div className="mt-8">
          <FeelingInput 
            feeling={feeling}
            setFeeling={setFeeling}
            onSubmit={handleGuidance}
            loading={loading}
            simplified
          />
        </div>
      </main>
      
      <footer className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Palavra em Graça. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default SimpleApp; 