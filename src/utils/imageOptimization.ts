/**
 * Utilitários para otimização de imagens
 * Ajuda a melhorar o desempenho do site carregando imagens de forma otimizada
 */

/**
 * Carrega uma imagem com lazy loading e dimensões corretas
 * @param src URL da imagem
 * @param alt Texto alternativo da imagem
 * @param width Largura da imagem
 * @param height Altura da imagem
 * @param className Classes CSS adicionais
 * @returns Elemento de imagem otimizado
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
      onError={(e) => {
        // Fallback para imagem de erro
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = '/images/fallback.png';
      }}
    />
  );
};

/**
 * Pré-carrega uma imagem para melhorar o desempenho
 * @param src URL da imagem a ser pré-carregada
 */
export const preloadImage = (src: string): void => {
  const img = new Image();
  img.src = src;
};

/**
 * Gera um placeholder de baixa qualidade para uma imagem
 * @param src URL da imagem original
 * @param width Largura do placeholder
 * @returns URL do placeholder
 */
export const generatePlaceholder = (src: string, width = 10): string => {
  // Em uma implementação real, você usaria uma API ou biblioteca para gerar placeholders
  // Esta é uma implementação simplificada
  return `${src}?w=${width}&blur=10`;
};

/**
 * Formata o atributo srcset para imagens responsivas
 * @param baseSrc URL base da imagem
 * @param sizes Array de tamanhos para o srcset
 * @returns String formatada para o atributo srcset
 */
export const formatSrcSet = (baseSrc: string, sizes: number[]): string => {
  return sizes
    .map((size) => {
      // Assume que as imagens estão disponíveis em diferentes tamanhos
      // com o formato: imagem-300w.jpg, imagem-600w.jpg, etc.
      const url = baseSrc.replace(/\.(jpg|png|webp)$/, `-${size}w.$1`);
      return `${url} ${size}w`;
    })
    .join(', ');
};

export default {
  OptimizedImage,
  preloadImage,
  generatePlaceholder,
  formatSrcSet,
}; 