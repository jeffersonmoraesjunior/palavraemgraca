import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pt-6 border-t dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400" role="contentinfo">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Palavra em Graça</h2>
            <p>Palavra em Graça &copy; {new Date().getFullYear()}</p>
            <p className="mt-1">Desenvolvido com <span aria-label="amor">❤️</span> para confortar e inspirar</p>
          </div>
          
          <div className="text-center">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Links</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Página inicial"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link 
                  to="/sobre" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Sobre nós"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link 
                  to="/biblia/ntlh/gn/1" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Bíblia Sagrada"
                >
                  Bíblia
                </Link>
              </li>
              <li>
                <Link 
                  to="/contato" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Entre em contato"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  to="/sitemap" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Mapa do Site"
                >
                  Mapa do Site
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-right">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Legal</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacidade" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Política de Privacidade"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link 
                  to="/termos" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Termos de Uso"
                >
                  Termos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t dark:border-gray-700 text-center text-xs">
          <p>
            As escrituras são fornecidas pela nossa própria API da Bíblia. Este aplicativo não tem afiliação oficial com nenhuma denominação religiosa.
          </p>
          <p className="mt-2">
            Este é um aplicativo cristão dedicado a trazer conforto e orientação espiritual através da Palavra de Deus.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 