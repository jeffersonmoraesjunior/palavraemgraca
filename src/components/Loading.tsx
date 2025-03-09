import React from 'react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Carregando..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-4">
        {/* Spinner simples */}
        <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-700 dark:text-gray-300">
        {message}
      </p>
    </div>
  );
};

export default Loading; 