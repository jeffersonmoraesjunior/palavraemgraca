import React from 'react';
import { History } from 'lucide-react';
import type { SavedGuidance } from '../types';

interface HistoryListProps {
  items: SavedGuidance[];
  onDelete: (id: number) => void;
  onNewConsultation?: () => void;
  formatDate: (date: string) => string;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  items,
  onDelete,
  onNewConsultation,
  formatDate
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
    <div className="flex items-center gap-4 mb-6">
      <History className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      <h2 className="text-xl font-semibold">Histórico de Consultas</h2>
    </div>
    
    {items.length === 0 ? (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>Você ainda não salvou nenhuma consulta.</p>
        {onNewConsultation && (
          <button
            onClick={onNewConsultation}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Fazer uma nova consulta
          </button>
        )}
      </div>
    ) : (
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="border dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(item.date)}
                </p>
                <p className="text-sm italic mt-1 line-clamp-2">{item.feeling}</p>
              </div>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Excluir
              </button>
            </div>
            
            <div className="space-y-3 mt-4">
              <div>
                <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400">Versículo</h4>
                <p className="text-sm">{item.guidance.verse}</p>
                {item.guidance.verseRef && (
                  <p className="text-right text-xs text-blue-500 dark:text-blue-400 mt-1">
                    {item.guidance.verseRef}
                  </p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400">Palavra de Apoio</h4>
                <p className="text-sm">{item.guidance.support}</p>
                {item.guidance.quoteAuthor && (
                  <p className="text-right text-xs text-purple-500 dark:text-purple-400 mt-1">
                    {item.guidance.quoteAuthor}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
); 