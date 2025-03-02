import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Sobre Nós | Caixinha de Promessas - Conforto Espiritual Diário</title>
        <meta name="description" content="Conheça a história e a missão da Caixinha de Promessas, um aplicativo cristão dedicado a trazer conforto e orientação espiritual através de versículos bíblicos personalizados para seu dia a dia." />
        <meta name="keywords" content="caixinha de promessas, aplicativo cristão, versículos bíblicos, orientação espiritual, conforto espiritual, app cristão, devocionais diários" />
        <link rel="canonical" href="https://amigodedeus.com.br/sobre" />
        <meta property="og:title" content="Sobre Nós | Caixinha de Promessas - Conforto Espiritual Diário" />
        <meta property="og:description" content="Conheça a história e a missão da Caixinha de Promessas, um aplicativo cristão dedicado a trazer conforto e orientação espiritual." />
        <meta property="og:url" content="https://amigodedeus.com.br/sobre" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://amigodedeus.com.br/og-image-about.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre Nós | Caixinha de Promessas - Conforto Espiritual Diário" />
        <meta name="twitter:description" content="Conheça a história e a missão da Caixinha de Promessas, um aplicativo cristão dedicado a trazer conforto e orientação espiritual." />
        <meta name="twitter:image" content="https://amigodedeus.com.br/twitter-image-about.jpg" />
        
        {/* Schema.org markup para melhor SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Caixinha de Promessas",
            "url": "https://amigodedeus.com.br",
            "logo": "https://amigodedeus.com.br/logo.svg",
            "description": "Aplicativo cristão dedicado a trazer conforto e orientação espiritual através de versículos bíblicos personalizados.",
            "foundingDate": "2023",
            "email": "contato@amigodedeus.com.br",
            "sameAs": [
              "https://facebook.com/amigodedeus",
              "https://instagram.com/amigodedeus",
              "https://youtube.com/amigodedeus"
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs para melhor navegação e SEO */}
        <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Início
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-blue-600 dark:text-blue-400" aria-current="page">Sobre</span>
              </div>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold mb-6 text-center">Sobre a Caixinha de Promessas</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4" id="nossa-missao">Nossa Missão</h2>
          <p className="mb-4">
            A Caixinha de Promessas nasceu com o propósito de trazer conforto, orientação e esperança através da Palavra de Deus. 
            Em um mundo cada vez mais acelerado e cheio de desafios, acreditamos que as escrituras sagradas têm o poder de 
            transformar vidas, acalmar corações e renovar a fé.
          </p>
          <p className="mb-4">
            Nossa missão é conectar pessoas à sabedoria bíblica de forma personalizada, oferecendo versículos e orientações 
            que se relacionam diretamente com os sentimentos e situações que cada um está vivendo.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4" id="como-funciona">Como Funciona</h2>
          <p className="mb-4">
            A Caixinha de Promessas utiliza tecnologia avançada para entender como você está se sentindo e oferecer 
            versículos bíblicos e orientações personalizadas. Nosso sistema foi desenvolvido para proporcionar uma 
            experiência única e significativa para cada usuário.
          </p>
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Versículo Diário</h3>
              <p>Receba um versículo inspirador todos os dias para começar sua jornada com fé e esperança.</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Orientação Personalizada</h3>
              <p>Compartilhe seus sentimentos e receba orientação bíblica específica para sua situação.</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Histórico de Consultas</h3>
              <p>Guarde suas consultas anteriores para revisitar as orientações recebidas quando precisar.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4" id="nossa-historia">Nossa História</h2>
          <p className="mb-4">
            A Caixinha de Promessas foi criada por um grupo de cristãos apaixonados por tecnologia e pela Palavra de Deus. 
            Inspirados pela tradição das "caixinhas de promessas" físicas, onde as pessoas sorteavam versículos bíblicos 
            em momentos de necessidade, decidimos trazer esse conceito para a era digital.
          </p>
          <p className="mb-4">
            Lançado em 2023, nosso aplicativo tem ajudado milhares de pessoas a encontrar conforto e direção 
            através das escrituras sagradas, de forma acessível e personalizada.
          </p>
          <blockquote className="italic border-l-4 border-blue-500 pl-4 my-6 text-gray-700 dark:text-gray-300">
            "Nosso sonho é que cada pessoa possa encontrar uma palavra de esperança e direção divina para seu momento específico, 
            exatamente quando mais precisar."
            <footer className="mt-2 text-sm">— Fundadores da Caixinha de Promessas</footer>
          </blockquote>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4" id="nossos-valores">Nossos Valores</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Fé:</strong> Acreditamos no poder transformador da Palavra de Deus.</li>
            <li><strong>Acessibilidade:</strong> Tornamos a sabedoria bíblica acessível a todos, em qualquer lugar.</li>
            <li><strong>Respeito:</strong> Respeitamos todas as denominações cristãs e a jornada de fé de cada pessoa.</li>
            <li><strong>Privacidade:</strong> Protegemos os dados e sentimentos compartilhados por nossos usuários.</li>
            <li><strong>Inovação:</strong> Buscamos constantemente melhorar nossa plataforma para servir melhor.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4" id="depoimentos">Depoimentos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <p className="italic mb-4">"A Caixinha de Promessas tem sido uma bênção na minha vida. Todos os dias recebo um versículo que parece falar diretamente ao meu coração."</p>
              <p className="font-semibold">Maria S.</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <p className="italic mb-4">"Em um momento de grande ansiedade, compartilhei meus sentimentos e recebi palavras de conforto que me ajudaram a encontrar paz."</p>
              <p className="font-semibold">João P.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4" id="contato">Entre em Contato</h2>
          <p className="mb-4">
            Estamos sempre abertos para ouvir sugestões, responder dúvidas ou receber feedback sobre como podemos melhorar.
            Não hesite em entrar em contato conosco através da nossa <Link to="/contato" className="text-blue-600 dark:text-blue-400 hover:underline">página de contato</Link>.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/contato" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
              Fale Conosco
            </Link>
          </div>
        </section>

        {/* Links internos para melhorar a navegação e SEO */}
        <div className="mt-12 pt-6 border-t dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3">Navegue por esta página:</h3>
          <ul className="flex flex-wrap gap-3">
            <li><a href="#nossa-missao" className="text-blue-600 dark:text-blue-400 hover:underline">Nossa Missão</a></li>
            <li><a href="#como-funciona" className="text-blue-600 dark:text-blue-400 hover:underline">Como Funciona</a></li>
            <li><a href="#nossa-historia" className="text-blue-600 dark:text-blue-400 hover:underline">Nossa História</a></li>
            <li><a href="#nossos-valores" className="text-blue-600 dark:text-blue-400 hover:underline">Nossos Valores</a></li>
            <li><a href="#depoimentos" className="text-blue-600 dark:text-blue-400 hover:underline">Depoimentos</a></li>
            <li><a href="#contato" className="text-blue-600 dark:text-blue-400 hover:underline">Contato</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About; 