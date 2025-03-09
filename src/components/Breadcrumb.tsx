import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  path: string;
  isLast: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const location = useLocation();
  const baseUrl = window.location.origin;

  // Processa os itens para garantir que apenas o último tenha isLast = true
  const processedItems = items.map((item, index) => ({
    ...item,
    isLast: index === items.length - 1
  }));

  // Gera os dados estruturados para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": processedItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.path}`
    }))
  };

  return (
    <>
      {/* Dados estruturados para SEO */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Breadcrumb visual */}
      <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3" itemScope itemType="https://schema.org/BreadcrumbList">
          {processedItems.map((item, index) => (
            <li 
              key={item.path}
              className="inline-flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              {item.isLast ? (
                <span 
                  className="text-blue-600 dark:text-blue-400"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  to={item.path}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb; 