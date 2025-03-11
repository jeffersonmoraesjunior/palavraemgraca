import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';

const Privacy: React.FC = () => {
  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = '01 de Março de 2024';

  // Função para gerar os itens do breadcrumb
  const getBreadcrumbItems = () => {
    return [
      { name: 'Início', path: '/', isLast: false },
      { name: 'Política de Privacidade', path: '/privacidade', isLast: true }
    ];
  };

  return (
    <>
      <Helmet>
        <title>Política de Privacidade | Palavra em Graça - Proteção de Dados</title>
        <meta name="description" content="Conheça nossa política de privacidade e como protegemos seus dados no Palavra em Graça. Transparência e segurança são nossas prioridades na proteção de suas informações pessoais." />
        <meta name="keywords" content="política de privacidade, proteção de dados, segurança de dados, palavra em graça, LGPD, privacidade online, dados pessoais" />
        <link rel="canonical" href="https://palavraemgraca.com.br/privacidade" />
        <meta property="og:title" content="Política de Privacidade | Palavra em Graça - Proteção de Dados" />
        <meta property="og:description" content="Conheça nossa política de privacidade. Saiba como o Palavra em Graça protege seus dados e garante sua segurança digital." />
        <meta property="og:url" content="https://palavraemgraca.com.br/privacidade" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://palavraemgraca.com.br/og-image-privacy.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Política de Privacidade | Palavra em Graça - Proteção de Dados" />
        <meta name="twitter:description" content="Conheça nossa política de privacidade. Saiba como o Palavra em Graça protege seus dados e garante sua segurança digital." />
        <meta name="twitter:image" content="https://palavraemgraca.com.br/twitter-image-privacy.jpg" />
        
        {/* Schema.org markup para melhor SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Política de Privacidade | Palavra em Graça",
            "description": "Conheça nossa política de privacidade. Saiba como o Palavra em Graça protege seus dados e garante sua segurança digital.",
            "publisher": {
              "@type": "Organization",
              "name": "Palavra em Graça",
              "logo": "https://palavraemgraca.com.br/logo.svg"
            },
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntity": {
              "@type": "WebContent",
              "about": {
                "@type": "Thing",
                "name": "Política de Privacidade"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={getBreadcrumbItems()} />

        <h1 className="text-3xl font-bold mb-6 text-center">Política de Privacidade</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">Última atualização: {lastUpdated}</p>
        
        {/* Índice da página para melhor navegação */}
        <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg mb-10">
          <h2 className="text-xl font-semibold mb-4">Índice</h2>
          <ul className="space-y-2">
            <li><a href="#introducao" className="text-blue-600 dark:text-blue-400 hover:underline">1. Introdução</a></li>
            <li><a href="#informacoes-coletadas" className="text-blue-600 dark:text-blue-400 hover:underline">2. Informações que Coletamos</a></li>
            <li><a href="#uso-informacoes" className="text-blue-600 dark:text-blue-400 hover:underline">3. Como Utilizamos Suas Informações</a></li>
            <li><a href="#compartilhamento" className="text-blue-600 dark:text-blue-400 hover:underline">4. Compartilhamento de Informações</a></li>
            <li><a href="#seguranca" className="text-blue-600 dark:text-blue-400 hover:underline">5. Segurança de Dados</a></li>
            <li><a href="#seus-direitos" className="text-blue-600 dark:text-blue-400 hover:underline">6. Seus Direitos</a></li>
            <li><a href="#cookies" className="text-blue-600 dark:text-blue-400 hover:underline">7. Cookies e Tecnologias Similares</a></li>
            <li><a href="#alteracoes" className="text-blue-600 dark:text-blue-400 hover:underline">8. Alterações nesta Política</a></li>
            <li><a href="#contato" className="text-blue-600 dark:text-blue-400 hover:underline">9. Contato</a></li>
          </ul>
        </div>
        
        <section className="mb-10" id="introducao">
          <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
          <p className="mb-4">
            O Palavra em Graça está comprometido em proteger sua privacidade e seus dados pessoais. Esta Política de 
            Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações quando você utiliza 
            nosso aplicativo e serviços.
          </p>
          <p className="mb-4">
            Ao utilizar o Palavra em Graça, você concorda com as práticas descritas nesta política. Recomendamos que 
            você leia este documento na íntegra para entender nossos procedimentos em relação aos seus dados.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 my-6">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Importante:</strong> Valorizamos sua privacidade e estamos em conformidade com a Lei Geral de Proteção de Dados (LGPD) 
              e outras legislações aplicáveis de proteção de dados.
            </p>
          </div>
        </section>

        <section className="mb-10" id="informacoes-coletadas">
          <h2 className="text-2xl font-semibold mb-4">2. Informações que Coletamos</h2>
          <p className="mb-4">Podemos coletar os seguintes tipos de informações:</p>
          
          <h3 className="text-xl font-semibold mb-2">2.1. Informações fornecidas por você</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Textos sobre seus sentimentos e situações que você compartilha ao solicitar orientação</li>
            <li>Histórico de consultas que você opta por salvar</li>
            <li>Preferências de tema e acessibilidade</li>
            <li>Informações de contato, caso você nos envie mensagens</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-2">2.2. Informações coletadas automaticamente</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Dados de uso e interação com o aplicativo</li>
            <li>Informações do dispositivo (tipo, sistema operacional, navegador)</li>
            <li>Endereço IP e dados de localização aproximada</li>
            <li>Cookies e tecnologias similares para melhorar a experiência do usuário</li>
          </ul>
        </section>

        <section className="mb-10" id="uso-informacoes">
          <h2 className="text-2xl font-semibold mb-4">3. Como Utilizamos Suas Informações</h2>
          <p className="mb-4">Utilizamos as informações coletadas para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer versículos bíblicos e orientações personalizadas</li>
            <li>Manter e melhorar nossos serviços</li>
            <li>Personalizar sua experiência no aplicativo</li>
            <li>Armazenar suas preferências e histórico de consultas</li>
            <li>Analisar tendências de uso e melhorar nossos algoritmos</li>
            <li>Proteger a segurança e integridade do aplicativo</li>
            <li>Responder a suas dúvidas e solicitações</li>
            <li>Cumprir obrigações legais</li>
          </ul>
          <p className="mt-4">
            <strong>Base legal:</strong> Processamos seus dados com base no seu consentimento, para execução de contrato, 
            para atender a interesses legítimos ou para cumprir obrigações legais, conforme aplicável.
          </p>
        </section>

        <section className="mb-10" id="compartilhamento">
          <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Informações</h2>
          <p className="mb-4">
            Valorizamos sua privacidade e não vendemos suas informações pessoais a terceiros. Podemos compartilhar 
            informações nas seguintes circunstâncias:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Provedores de serviços:</strong> Compartilhamos dados com empresas que nos ajudam a operar, 
            desenvolver e melhorar nossos serviços (como provedores de hospedagem e análise).</li>
            <li><strong>Conformidade legal:</strong> Podemos divulgar informações quando exigido por lei ou para 
            proteger nossos direitos legais.</li>
            <li><strong>Consentimento:</strong> Compartilharemos suas informações quando você nos autorizar expressamente.</li>
          </ul>
          <p className="mt-4">
            Todos os nossos parceiros e prestadores de serviços são obrigados a manter a confidencialidade e segurança 
            dos seus dados e a processá-los apenas conforme nossas instruções.
          </p>
        </section>

        <section className="mb-10" id="seguranca">
          <h2 className="text-2xl font-semibold mb-4">5. Segurança de Dados</h2>
          <p className="mb-4">
            Implementamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, 
            perda ou alteração. Nossas medidas de segurança incluem:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Criptografia de dados sensíveis</li>
            <li>Firewalls e sistemas de detecção de intrusão</li>
            <li>Acesso restrito a informações pessoais</li>
            <li>Monitoramento regular de nossos sistemas</li>
            <li>Treinamento de segurança para nossa equipe</li>
          </ul>
          <p className="mt-4">
            Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus dados, 
            nenhum método de transmissão pela internet ou armazenamento eletrônico é 100% seguro.
          </p>
        </section>

        <section className="mb-10" id="seus-direitos">
          <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos</h2>
          <p className="mb-4">De acordo com as leis de proteção de dados aplicáveis, você tem os seguintes direitos:</p>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Direito de acesso</h3>
              <p>Você pode solicitar uma cópia dos seus dados pessoais que mantemos.</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Direito de retificação</h3>
              <p>Você pode corrigir dados imprecisos ou incompletos que mantemos sobre você.</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Direito ao esquecimento</h3>
              <p>Você pode solicitar a exclusão dos seus dados pessoais em determinadas circunstâncias.</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Direito à restrição de processamento</h3>
              <p>Você pode solicitar a limitação do processamento dos seus dados.</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Direito à portabilidade</h3>
              <p>Você pode solicitar a transferência dos seus dados para outro serviço ou entidade.</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Direito de oposição</h3>
              <p>Você pode se opor ao processamento dos seus dados em determinadas circunstâncias.</p>
            </div>
          </div>
          <p className="mt-4">
            Para exercer qualquer um desses direitos, entre em contato conosco através da nossa 
            <Link to="/contato" className="text-blue-600 dark:text-blue-400 hover:underline"> página de contato</Link>.
            Responderemos à sua solicitação dentro do prazo estabelecido pela legislação aplicável.
          </p>
        </section>

        <section className="mb-10" id="cookies">
          <h2 className="text-2xl font-semibold mb-4">7. Cookies e Tecnologias Similares</h2>
          <p className="mb-4">
            Utilizamos cookies e tecnologias similares para melhorar sua experiência, entender como nosso aplicativo é 
            utilizado e personalizar nossos serviços. Os tipos de cookies que utilizamos incluem:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cookies essenciais:</strong> Necessários para o funcionamento básico do aplicativo</li>
            <li><strong>Cookies de preferências:</strong> Permitem que o aplicativo lembre suas escolhas e preferências</li>
            <li><strong>Cookies analíticos:</strong> Ajudam-nos a entender como os usuários interagem com o aplicativo</li>
            <li><strong>Cookies de marketing:</strong> Utilizados para fornecer conteúdo relevante e personalizado</li>
          </ul>
          <p className="mt-4">
            Você pode gerenciar suas preferências de cookies através das configurações do seu navegador. 
            Note que desabilitar certos cookies pode afetar a funcionalidade do aplicativo.
          </p>
        </section>

        <section className="mb-10" id="alteracoes">
          <h2 className="text-2xl font-semibold mb-4">8. Alterações nesta Política</h2>
          <p className="mb-4">
            Podemos atualizar nossa Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou 
            por outros motivos operacionais, legais ou regulatórios.
          </p>
          <p className="mb-4">
            Notificaremos sobre quaisquer alterações significativas publicando a nova política em nosso aplicativo e 
            atualizando a data da "última atualização". Recomendamos que você revise esta política regularmente.
          </p>
          <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg my-4">
            <p>
              <strong>Histórico de versões:</strong> Esta é a primeira versão da nossa política de privacidade, 
              publicada em {lastUpdated}.
            </p>
          </div>
        </section>

        <section id="contato">
          <h2 className="text-2xl font-semibold mb-4">9. Contato</h2>
          <p className="mb-4">
            Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre nossas práticas de dados, 
            entre em contato conosco através da nossa <Link to="/contato" className="text-blue-600 dark:text-blue-400 hover:underline">página de contato</Link>.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/contato" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
              Entre em Contato
            </Link>
          </div>
        </section>

        {/* Botão para voltar ao topo */}
        <div className="mt-12 flex justify-center">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar ao topo
          </a>
        </div>
      </div>
    </>
  );
};

export default Privacy; 