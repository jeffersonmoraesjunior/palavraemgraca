import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Plus, Minus, Menu, X } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  adjustFontSize: (increment: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme, adjustFontSize }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="mb-8 py-4 border-b dark:border-gray-700" role="banner">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="w-10 h-10 mr-3"
            />
            
          </Link>
        </div>

        {/* Menu para telas médias e grandes */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Navegação principal">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
            Início
          </Link>
          <Link to="/sobre" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
            Sobre
          </Link>
          <Link to="/contato" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
            Contato
          </Link>
          <Link to="/privacidade" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
            Privacidade
          </Link>
          <Link to="/termos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
            Termos
          </Link>
        </nav>
        
        <div className="flex gap-2 items-center" role="toolbar" aria-label="Ajustes de acessibilidade">
          <button
            onClick={() => adjustFontSize(false)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Diminuir tamanho da fonte"
            title="Diminuir tamanho da fonte"
          >
            <Minus size={20} aria-hidden="true" />
          </button>
          <button
            onClick={() => adjustFontSize(true)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Aumentar tamanho da fonte"
            title="Aumentar tamanho da fonte"
          >
            <Plus size={20} aria-hidden="true" />
          </button>
          <button
            onClick={() => setTheme(prev => ({ ...prev, isDark: !prev.isDark }))}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={theme.isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
            title={theme.isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
          >
            {theme.isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          
          {/* Botão de menu para dispositivos móveis */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu móvel */}
      {menuOpen && (
        <nav className="md:hidden py-4 border-t dark:border-gray-700" aria-label="Menu móvel">
          <ul className="space-y-3">
            <li>
              <Link 
                to="/" 
                className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Início
              </Link>
            </li>
            <li>
              <Link 
                to="/sobre" 
                className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link 
                to="/contato" 
                className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Contato
              </Link>
            </li>
            <li>
              <Link 
                to="/privacidade" 
                className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Privacidade
              </Link>
            </li>
            <li>
              <Link 
                to="/termos" 
                className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Termos
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header; 