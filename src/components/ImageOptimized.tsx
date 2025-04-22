import React, { useState } from 'react';

interface ImageOptimizedProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const ImageOptimized: React.FC<ImageOptimizedProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Determinar a imagem padrão caso ocorra erro
  const fallbackImage = '/images/fallback.webp';
  
  // Adicionar suporte para imagens WebP
  const imageUrl = error ? fallbackImage : src;
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
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
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          console.warn(`Failed to load image: ${src}`);
          setError(true);
        }}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } w-full h-full object-${objectFit}`}
      />
    </div>
  );
};

export default ImageOptimized; 