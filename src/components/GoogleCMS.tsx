import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

declare global {
  interface Window {
    SWG_BASIC?: any[];
  }
}

const GoogleCMS: React.FC = () => {
  useEffect(() => {
    // Inicializa o array SWG_BASIC se não existir
    window.SWG_BASIC = window.SWG_BASIC || [];
    
    // Adiciona a configuração ao SWG_BASIC
    window.SWG_BASIC.push((basicSubscriptions: any) => {
      basicSubscriptions.init({
        type: "NewsArticle",
        isPartOfType: ["Product"],
        isPartOfProductId: "CAow3O3aCw:openaccess",
        clientOptions: { 
          theme: "light", 
          lang: "pt-BR" 
        },
      });
    });
  }, []);

  return (
    <Helmet>
      <script 
        async 
        type="application/javascript"
        src="https://news.google.com/swg/js/v1/swg-basic.js"
      />
    </Helmet>
  );
};

export default GoogleCMS; 