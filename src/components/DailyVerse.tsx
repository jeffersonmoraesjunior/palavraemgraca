import React from 'react';
import { Book } from 'lucide-react';

interface DailyVerseProps {
  verse?: string;
  loading?: boolean;
  onRefresh?: () => void;
  simplified?: boolean;
}

export const DailyVerse: React.FC<DailyVerseProps> = ({ 
  verse, 
  loading = false, 
  onRefresh,
  simplified = false
}) => {
  if (simplified) {
    return (
      <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Versículo do Dia</h2>
        <p className="italic">
          "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
        </p>
        <p className="text-right mt-2 font-medium">João 3:16</p>
      </div>
    );
  }

  return (
    <section aria-labelledby="verse-of-the-day" className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg flex items-center">
      <h2 id="verse-of-the-day" className="sr-only">Versículo do Dia</h2>
      <Book className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" aria-hidden="true" />
      <div className="flex-grow">
        {verse ? (
          <p className="text-lg italic">{verse}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Carregando versículo do dia...</p>
        )}
      </div>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="ml-2 p-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          aria-label="Atualizar versículo do dia"
          title="Atualizar versículo do dia"
          disabled={loading}
        >
          Atualizar
        </button>
      )}
    </section>
  );
}; 