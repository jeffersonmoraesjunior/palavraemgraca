import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Terms: React.FC = () => {
  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = new Date().toLocaleDateString('pt-BR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <Helmet>
        <title>Termos de Uso | Caixinha de Promessas - Condições de Utilização</title>
        <meta name="description" content="Conheça os termos de uso da Caixinha de Promessas. Entenda as condições e regras para utilização do nosso aplicativo de versículos bíblicos personalizados." />
        <meta name="keywords" content="termos de uso, condições de uso, regras de utilização, caixinha de promessas, aplicativo cristão, termos e condições, acordo de usuário" />
        <link rel="canonical" href="https://amigodedeus.com.br/termos" />
        <meta property="og:title" content="Termos de Uso | Caixinha de Promessas - Condições de Utilização" />
        <meta property="og:description" content="Conheça os termos de uso da Caixinha de Promessas. Entenda as condições e regras para utilização do nosso aplicativo." />
        <meta property="og:url" content="https://amigodedeus.com.br/termos" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://amigodedeus.com.br/og-image-terms.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Termos de Uso | Caixinha de Promessas - Condições de Utilização" />
        <meta name="twitter:description" content="Conheça os termos de uso da Caixinha de Promessas. Entenda as condições e regras para utilização do nosso aplicativo." />
        <meta name="twitter:image" content="https://amigodedeus.com.br/twitter-image-terms.jpg" />
        
        {/* Schema.org markup para melhor SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Termos de Uso | Caixinha de Promessas",
            "description": "Conheça os termos de uso da Caixinha de Promessas. Entenda as condições e regras para utilização do nosso aplicativo.",
            "publisher": {
              "@type": "Organization",
              "name": "Caixinha de Promessas",
              "logo": "https://amigodedeus.com.br/logo.svg"
            },
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntity": {
              "@type": "WebContent",
              "about": {
                "@type": "Thing",
                "name": "Termos de Uso"
              }
            }
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
                <span className="text-blue-600 dark:text-blue-400" aria-current="page">Termos de Uso</span>
              </div>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold mb-6 text-center">Termos de Uso</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">Última atualização: {lastUpdated}</p>
        
        {/* Índice da página para melhor navegação */}
        <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg mb-10">
          <h2 className="text-xl font-semibold mb-4">Índice</h2>
          <ul className="space-y-2">
            <li><a href="#introducao" className="text-blue-600 dark:text-blue-400 hover:underline">1. Introdução</a></li>
            <li><a href="#aceitacao" className="text-blue-600 dark:text-blue-400 hover:underline">2. Aceitação dos Termos</a></li>
            <li><a href="#elegibilidade" className="text-blue-600 dark:text-blue-400 hover:underline">3. Elegibilidade</a></li>
            <li><a href="#conta" className="text-blue-600 dark:text-blue-400 hover:underline">4. Conta e Segurança</a></li>
            <li><a href="#uso-servico" className="text-blue-600 dark:text-blue-400 hover:underline">5. Uso do Serviço</a></li>
            <li><a href="#conteudo" className="text-blue-600 dark:text-blue-400 hover:underline">6. Conteúdo e Propriedade Intelectual</a></li>
            <li><a href="#restricoes" className="text-blue-600 dark:text-blue-400 hover:underline">7. Restrições de Uso</a></li>
            <li><a href="#modificacoes" className="text-blue-600 dark:text-blue-400 hover:underline">8. Modificações do Serviço</a></li>
            <li><a href="#rescisao" className="text-blue-600 dark:text-blue-400 hover:underline">9. Rescisão</a></li>
            <li><a href="#limitacao-responsabilidade" className="text-blue-600 dark:text-blue-400 hover:underline">10. Limitação de Responsabilidade</a></li>
            <li><a href="#alteracoes-termos" className="text-blue-600 dark:text-blue-400 hover:underline">11. Alterações nos Termos</a></li>
            <li><a href="#disposicoes-gerais" className="text-blue-600 dark:text-blue-400 hover:underline">12. Disposições Gerais</a></li>
            <li><a href="#contato" className="text-blue-600 dark:text-blue-400 hover:underline">13. Contato</a></li>
          </ul>
        </div>
        
        <section className="mb-10" id="introducao">
          <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
          <p className="mb-4">
            Bem-vindo à Caixinha de Promessas. Estes Termos de Uso ("Termos") regem seu acesso e uso do aplicativo 
            Caixinha de Promessas, incluindo quaisquer conteúdos, funcionalidades e serviços oferecidos por meio do 
            aplicativo (coletivamente, o "Serviço").
          </p>
          <p className="mb-4">
            A Caixinha de Promessas é um aplicativo cristão dedicado a trazer conforto e orientação espiritual através 
            de versículos bíblicos personalizados para seu dia a dia. Nosso objetivo é conectar pessoas à sabedoria 
            bíblica de forma personalizada e significativa.
          </p>
          <p className="mb-4">
            Ao acessar ou utilizar nosso Serviço, você concorda em ficar vinculado a estes Termos. Se você não concordar 
            com qualquer parte destes Termos, não poderá acessar ou utilizar nosso Serviço.
          </p>
        </section>

        <section className="mb-10" id="aceitacao">
          <h2 className="text-2xl font-semibold mb-4">2. Aceitação dos Termos</h2>
          <p className="mb-4">
            Ao utilizar a Caixinha de Promessas, você confirma que:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Leu, compreendeu e concorda em cumprir estes Termos;</li>
            <li>Tem capacidade legal para aceitar estes Termos;</li>
            <li>Utilizará o Serviço de acordo com estes Termos, com a legislação aplicável e com respeito aos direitos de terceiros.</li>
          </ul>
          <p className="mb-4">
            Se você estiver utilizando o Serviço em nome de uma organização, você declara e garante que tem autoridade 
            para vincular essa organização a estes Termos.
          </p>
        </section>

        <section className="mb-10" id="elegibilidade">
          <h2 className="text-2xl font-semibold mb-4">3. Elegibilidade</h2>
          <p className="mb-4">
            Para utilizar o Serviço, você deve ter pelo menos 13 anos de idade. Se você tem entre 13 e 18 anos, deve ter 
            permissão de um pai ou responsável legal para utilizar o Serviço e eles devem concordar com estes Termos em seu nome.
          </p>
          <p className="mb-4">
            Ao utilizar o Serviço, você declara e garante que atende a todos os requisitos de elegibilidade acima. Se 
            descobrirmos que você não atende a esses requisitos, poderemos suspender ou encerrar sua conta a qualquer momento.
          </p>
        </section>

        <section className="mb-10" id="conta">
          <h2 className="text-2xl font-semibold mb-4">4. Conta e Segurança</h2>
          <p className="mb-4">
            Para acessar determinadas funcionalidades do Serviço, você pode precisar criar uma conta. Ao criar uma conta, você concorda em:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Fornecer informações precisas, atuais e completas;</li>
            <li>Manter e atualizar prontamente suas informações;</li>
            <li>Manter a segurança e confidencialidade de suas credenciais de acesso;</li>
            <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta;</li>
            <li>Ser responsável por todas as atividades que ocorram em sua conta.</li>
          </ul>
          <p className="mb-4">
            Reservamo-nos o direito de desativar qualquer conta a nosso critério, incluindo se determinarmos que você 
            violou qualquer disposição destes Termos.
          </p>
        </section>

        <section className="mb-10" id="uso-servico">
          <h2 className="text-2xl font-semibold mb-4">5. Uso do Serviço</h2>
          <p className="mb-4">
            A Caixinha de Promessas oferece versículos bíblicos e orientações espirituais personalizadas. Ao utilizar nosso Serviço, você concorda em:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Utilizar o Serviço apenas para fins pessoais e não comerciais, a menos que expressamente autorizado por nós;</li>
            <li>Não utilizar o Serviço de maneira que possa danificar, desabilitar, sobrecarregar ou prejudicar o Serviço;</li>
            <li>Não tentar acessar áreas restritas do Serviço;</li>
            <li>Não utilizar o Serviço para qualquer finalidade ilegal ou não autorizada;</li>
            <li>Não utilizar o Serviço para distribuir material publicitário não solicitado.</li>
          </ul>
          <p className="mb-4">
            Reservamo-nos o direito de modificar, suspender ou descontinuar, temporária ou permanentemente, o Serviço 
            ou qualquer parte dele, com ou sem aviso prévio.
          </p>
        </section>

        <section className="mb-10" id="conteudo">
          <h2 className="text-2xl font-semibold mb-4">6. Conteúdo e Propriedade Intelectual</h2>
          <p className="mb-4">
            Todo o conteúdo disponibilizado através do Serviço, incluindo textos, gráficos, logotipos, ícones, imagens, 
            clipes de áudio, downloads digitais e compilações de dados, é de propriedade da Caixinha de Promessas ou de 
            seus licenciadores e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
          </p>
          <p className="mb-4">
            Concedemos a você uma licença limitada, não exclusiva, não transferível e revogável para acessar e utilizar 
            o Serviço e seu conteúdo para fins pessoais e não comerciais.
          </p>
          <p className="mb-4">
            Os versículos bíblicos apresentados no Serviço são derivados de traduções da Bíblia que podem estar sujeitas 
            a direitos autorais de seus respectivos proprietários. Utilizamos esses textos respeitando os direitos de uso 
            permitidos para fins religiosos e educacionais.
          </p>
          <p className="mb-4">
            Você não pode:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Modificar, copiar, distribuir, transmitir, exibir, executar, reproduzir, publicar, licenciar, criar obras 
            derivadas, transferir ou vender qualquer conteúdo obtido do Serviço;</li>
            <li>Remover quaisquer avisos de direitos autorais, marcas registradas ou outros avisos de propriedade do conteúdo;</li>
            <li>Utilizar técnicas de engenharia reversa, descompilar ou desmontar qualquer parte do Serviço.</li>
          </ul>
        </section>

        <section className="mb-10" id="restricoes">
          <h2 className="text-2xl font-semibold mb-4">7. Restrições de Uso</h2>
          <p className="mb-4">
            Ao utilizar o Serviço, você concorda em não:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violar qualquer lei, regulamento ou direito de terceiros;</li>
            <li>Publicar, enviar ou compartilhar conteúdo que seja ilegal, abusivo, difamatório, obsceno, invasivo da 
            privacidade de terceiros, odioso, racialmente ou etnicamente ofensivo;</li>
            <li>Assediar, intimidar ou ameaçar outros usuários;</li>
            <li>Tentar acessar a conta de outro usuário sem autorização;</li>
            <li>Utilizar o Serviço para enviar spam, esquemas de pirâmide, correntes ou mensagens semelhantes;</li>
            <li>Introduzir vírus, cavalos de Troia, worms, bombas lógicas ou outro material malicioso;</li>
            <li>Interferir ou interromper a integridade ou o desempenho do Serviço;</li>
            <li>Coletar ou armazenar informações pessoais de outros usuários sem seu consentimento.</li>
          </ul>
        </section>

        <section className="mb-10" id="modificacoes">
          <h2 className="text-2xl font-semibold mb-4">8. Modificações do Serviço</h2>
          <p className="mb-4">
            Estamos constantemente buscando melhorar nosso Serviço. Por isso, reservamo-nos o direito de:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Modificar, atualizar ou descontinuar qualquer aspecto do Serviço a qualquer momento;</li>
            <li>Adicionar, remover ou modificar funcionalidades ou recursos;</li>
            <li>Impor limites a certas funcionalidades ou restringir seu acesso a partes ou à totalidade do Serviço.</li>
          </ul>
          <p className="mb-4">
            Faremos esforços razoáveis para notificá-lo sobre mudanças significativas, mas você é responsável por revisar 
            regularmente estes Termos para se manter informado sobre quaisquer atualizações.
          </p>
        </section>

        <section className="mb-10" id="rescisao">
          <h2 className="text-2xl font-semibold mb-4">9. Rescisão</h2>
          <p className="mb-4">
            Você pode encerrar sua conta a qualquer momento, descontinuando o uso do Serviço.
          </p>
          <p className="mb-4">
            Reservamo-nos o direito de suspender ou encerrar sua conta e seu acesso ao Serviço, a nosso critério, sem aviso 
            prévio, por qualquer motivo, incluindo, mas não se limitando a, violação destes Termos.
          </p>
          <p className="mb-4">
            Após o encerramento, seu direito de utilizar o Serviço cessará imediatamente. Se seu acesso for encerrado devido 
            a uma violação destes Termos, você não poderá criar uma nova conta sem nossa permissão expressa.
          </p>
        </section>

        <section className="mb-10" id="limitacao-responsabilidade">
          <h2 className="text-2xl font-semibold mb-4">10. Limitação de Responsabilidade</h2>
          <p className="mb-4">
            O Serviço é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo, expressas ou implícitas.
          </p>
          <p className="mb-4">
            Na extensão máxima permitida por lei, a Caixinha de Promessas e seus diretores, funcionários, parceiros e agentes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Não garantem que o Serviço atenderá às suas necessidades específicas;</li>
            <li>Não garantem que o Serviço será ininterrupto, oportuno, seguro ou livre de erros;</li>
            <li>Não garantem a precisão, confiabilidade ou completude de qualquer informação fornecida através do Serviço;</li>
            <li>Não serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos.</li>
          </ul>
          <p className="mb-4">
            Algumas jurisdições não permitem a exclusão de certas garantias ou a limitação de responsabilidade por certos 
            tipos de danos, portanto, algumas das limitações acima podem não se aplicar a você.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 my-6">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Importante:</strong> A Caixinha de Promessas oferece orientação espiritual baseada em textos bíblicos, 
              mas não substitui aconselhamento profissional médico, psicológico, legal ou financeiro. Consulte sempre 
              profissionais qualificados para questões específicas nessas áreas.
            </p>
          </div>
        </section>

        <section className="mb-10" id="alteracoes-termos">
          <h2 className="text-2xl font-semibold mb-4">11. Alterações nos Termos</h2>
          <p className="mb-4">
            Podemos atualizar estes Termos periodicamente para refletir mudanças em nossas práticas ou por outros motivos 
            operacionais, legais ou regulatórios.
          </p>
          <p className="mb-4">
            Notificaremos sobre quaisquer alterações significativas publicando os novos Termos em nosso aplicativo e 
            atualizando a data da "última atualização". Recomendamos que você revise estes Termos regularmente.
          </p>
          <p className="mb-4">
            Seu uso continuado do Serviço após a publicação de Termos atualizados constitui sua aceitação das alterações.
          </p>
          <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg my-4">
            <p>
              <strong>Histórico de versões:</strong> Esta é a primeira versão dos nossos termos de uso, 
              publicada em {lastUpdated}.
            </p>
          </div>
        </section>

        <section className="mb-10" id="disposicoes-gerais">
          <h2 className="text-2xl font-semibold mb-4">12. Disposições Gerais</h2>
          <p className="mb-4">
            <strong>Lei Aplicável:</strong> Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, 
            independentemente de seus princípios de conflito de leis.
          </p>
          <p className="mb-4">
            <strong>Resolução de Disputas:</strong> Qualquer disputa decorrente ou relacionada a estes Termos ou ao Serviço 
            será resolvida por meio de negociação amigável. Se não for possível resolver a disputa amigavelmente, ela será 
            submetida à jurisdição exclusiva dos tribunais da comarca de [Sua Cidade/Estado].
          </p>
          <p className="mb-4">
            <strong>Independência das Cláusulas:</strong> Se qualquer disposição destes Termos for considerada inválida ou 
            inexequível, as demais disposições permanecerão em pleno vigor e efeito.
          </p>
          <p className="mb-4">
            <strong>Renúncia:</strong> A falha da Caixinha de Promessas em fazer valer qualquer direito ou disposição destes 
            Termos não constituirá uma renúncia a tal direito ou disposição.
          </p>
          <p className="mb-4">
            <strong>Cessão:</strong> Você não pode ceder ou transferir estes Termos, por força de lei ou de outra forma, sem 
            nosso consentimento prévio por escrito. Qualquer tentativa de cessão sem tal consentimento será nula.
          </p>
          <p className="mb-4">
            <strong>Acordo Integral:</strong> Estes Termos, juntamente com nossa Política de Privacidade, constituem o acordo 
            integral entre você e a Caixinha de Promessas em relação ao Serviço.
          </p>
        </section>

        <section id="contato">
          <h2 className="text-2xl font-semibold mb-4">13. Contato</h2>
          <p className="mb-4">
            Se você tiver dúvidas ou preocupações sobre estes Termos ou sobre nosso Serviço, entre em contato conosco através 
            da nossa <Link to="/contato" className="text-blue-600 dark:text-blue-400 hover:underline">página de contato</Link>.
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
            aria-label="Voltar ao topo da página"
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

export default Terms; 