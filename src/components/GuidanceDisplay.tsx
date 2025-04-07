import React, { useState } from 'react';
import { Save, Share, Copy } from 'lucide-react';
import type { AIResponse } from '../types';

interface GuidanceDisplayProps {
  guidance: AIResponse;
  onSave: () => void;
  onShare: (platform?: 'whatsapp' | 'copy') => void;
}

export const GuidanceDisplay: React.FC<GuidanceDisplayProps> = ({
  guidance,
  onSave,
  onShare
}) => {
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  
  // Limitar a 5 dicas
  const limitedTips = guidance.tips.slice(0, 5);
  
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Sua Palavra de Conforto</h2>
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Salvar esta palavra"
          >
            <Save size={20} className="text-green-600 dark:text-green-400" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Compartilhar esta palavra"
            >
              <Share size={20} className="text-blue-600 dark:text-blue-400" />
            </button>
            {showShareOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    onShare('whatsapp');
                    setShowShareOptions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-t-lg flex items-center gap-2"
                >
                  <Share size={20} />
                  Compartilhar no WhatsApp
                </button>
                <button
                  onClick={() => {
                    onShare('copy');
                    setShowShareOptions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-lg flex items-center gap-2"
                >
                  <Copy size={20} />
                  Copiar texto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Versículo</h3>
          <p className="italic">{guidance.verse}</p>
          {guidance.verseRef && (
            <p className="text-right text-sm text-blue-600 dark:text-blue-400 mt-2 font-medium">
              {guidance.verseRef}
            </p>
          )}
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
          <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Palavra de Apoio</h3>
          <p>{guidance.support}</p>
          {guidance.quoteAuthor && (
            <p className="text-right text-sm text-purple-600 dark:text-purple-400 mt-2 font-medium">
              {guidance.quoteAuthor}
            </p>
          )}
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Dicas Práticas</h3>
          <ul className="space-y-2">
            {limitedTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-sm font-medium mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}; 