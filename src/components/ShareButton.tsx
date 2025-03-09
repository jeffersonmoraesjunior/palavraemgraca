import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  text: string;
  reference: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ text, reference }) => {
  const handleShare = async () => {
    const shareText = `${text}\n\n${reference}\n\nAmigos de Deus`;

    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Erro ao compartilhar:', error);
        }
      }
    } else {
      // Fallback para copiar para a área de transferência
      try {
        await navigator.clipboard.writeText(shareText);
        // Você pode adicionar uma notificação de sucesso aqui se desejar
      } catch (error) {
        console.error('Erro ao copiar:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
      title="Compartilhar versículo"
    >
      <Share2 size={18} />
    </button>
  );
};

export default ShareButton; 