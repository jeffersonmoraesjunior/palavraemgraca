import React, { useState, useEffect } from 'react';

// Dimensões padrão por tipo de imagem
const DEFAULT_DIMENSIONS = {
  featured: { width: 800, height: 450 },
  thumbnail: { width: 320, height: 180 },
  avatar: { width: 80, height: 80 },
  related: { width: 300, height: 200 }
};

// Função para otimizar URLs de imagens
const optimizeImageUrl = (src: string, width?: number, height?: number, quality: number = 80) => {
  // Se for uma URL externa, podemos tentar usar algum serviço de otimização
  if (src.startsWith('http')) {
    // Aqui você poderia integrar com Cloudinary, ImageKit, etc.
    return src;
  }
  
  // Para imagens locais, verificamos se existe uma versão WebP
  if (src.match(/\.(jpe?g|png)$/i)) {
    // Converte para o formato WebP (supondo que existam essas versões)
    const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
    return webpSrc;
  }
  
  // Já é WebP ou outro formato, retorna original
  return src;
};

interface ImageOptimizedProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  type?: 'featured' | 'thumbnail' | 'avatar' | 'related';
  quality?: number;
}

const ImageOptimized: React.FC<ImageOptimizedProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  type,
  quality = 80
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [supportsWebp, setSupportsWebp] = useState<boolean | null>(null);
  
  // Detectar suporte para WebP
  useEffect(() => {
    const checkWebpSupport = async () => {
      try {
        const webpFeature = { feature: 'lossy', async: true };
        const webpSupported = self.createImageBitmap !== undefined &&
          (await fetch('data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoB AAEAAwA0JaQAA3AA/vuUAAA=')
            .then(r => r.blob())
            .then(blob => createImageBitmap(blob))
            .then(() => true)
            .catch(() => false));
            
        setSupportsWebp(webpSupported);
      } catch (e) {
        setSupportsWebp(false);
      }
    };
    
    checkWebpSupport();
  }, []);
  
  // Determinar a imagem padrão caso ocorra erro
  const fallbackImage = '/images/fallback.webp';
  
  // Usar dimensões padrão se o tipo for especificado e nenhuma dimensão explícita for fornecida
  const dimensions = {
    width: width || (type && DEFAULT_DIMENSIONS[type]?.width) || undefined,
    height: height || (type && DEFAULT_DIMENSIONS[type]?.height) || undefined
  };
  
  // Adicionar parâmetros para otimização
  let imageUrl = error ? fallbackImage : src;
  
  // Otimizar URL se o navegador suportar WebP
  if (supportsWebp !== null && supportsWebp) {
    imageUrl = optimizeImageUrl(imageUrl, dimensions.width, dimensions.height, quality);
  }
  
  // Pré-carregar imagens importantes
  useEffect(() => {
    // Pré-carregamento para imagens com prioridade
    if (priority && !error && imageUrl) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = imageUrl;
      document.head.appendChild(preloadLink);
      
      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [imageUrl, priority, error]);
  
  // Estilo de objeto com boas práticas para evitar layout shifts
  const containerStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={containerStyle}
    >
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" 
          aria-hidden="true"
        />
      )}
      
      <img
        src={imageUrl}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          // Se falhar com WebP, tente a imagem original
          if (imageUrl !== src && !error) {
            console.warn(`Failed to load WebP image, falling back to original: ${src}`);
            // Usar setState para provocar re-render com a imagem original
            setError(true);
          } else {
            console.warn(`Failed to load image: ${src}`);
            setError(true);
          }
        }}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } w-full h-full object-${objectFit} absolute inset-0`}
      />
    </div>
  );
};

export default ImageOptimized; 