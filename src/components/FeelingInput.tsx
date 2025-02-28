import React from 'react';
import { Heart } from 'lucide-react';

interface FeelingInputProps {
  feeling: string;
  setFeeling: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  simplified?: boolean;
}

export const FeelingInput: React.FC<FeelingInputProps> = ({
  feeling,
  setFeeling,
  onSubmit,
  loading,
  simplified = false
}) => {
  if (simplified) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-semibold">Como você está se sentindo hoje?</h2>
        </div>
        <textarea
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
          rows={4}
          placeholder="Compartilhe seus sentimentos aqui..."
        ></textarea>
        <button
          onClick={onSubmit}
          disabled={loading || feeling.length < 20}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processando...' : 'Receber Orientação'}
        </button>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />
        <h2 className="text-xl font-semibold">Como Você Está Se Sentindo?</h2>
      </div>
      <textarea
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="Compartilhe seus sentimentos aqui (mínimo 20 caracteres)"
        aria-label="Campo para compartilhar seus sentimentos"
        minLength={20}
        maxLength={500}
      />
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {feeling.length}/500 caracteres
      </div>
      <button
        onClick={onSubmit}
        disabled={loading || feeling.length < 20}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        aria-label="Receber conselho personalizado"
      >
        {loading ? 'Buscando palavra de conforto...' : 'Receber Palavra de Conforto'}
      </button>
    </section>
  );
}; 