import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Helmet>
        <title>Página não encontrada | Palavra em Graça</title>
        <meta name="description" content="A página que você está procurando não foi encontrada." />
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-6xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
        </p>
      </div>
      
      <div className="space-y-4">
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Voltar para a página inicial
        </Link>
        
        <div className="mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Ou você pode estar procurando por:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link 
              to="/biblia/indice" 
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Índice da Bíblia
            </Link>
            <Link 
              to="/perguntas" 
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Perguntas
            </Link>
            <Link 
              to="/contato" 
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 