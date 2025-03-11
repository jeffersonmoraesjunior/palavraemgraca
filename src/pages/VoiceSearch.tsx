import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

// Interface para as perguntas e respostas
interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  verses?: {
    text: string;
    reference: string;
  }[];
  category: string;
  relatedQuestions?: string[];
}

const VoiceSearch: React.FC = () => {
  // Dados de perguntas e respostas organizados por categorias
  const faqData: QuestionAnswer[] = [
    // Categoria: Ansiedade
    {
      id: 'anxiety-1',
      question: 'O que a Bíblia diz sobre ansiedade?',
      answer: 'A Bíblia nos ensina a não nos preocuparmos com o amanhã e a entregar nossas ansiedades a Deus. Em Filipenses 4:6-7, somos instruídos a apresentar nossos pedidos a Deus em oração, e a paz divina guardará nossos corações e mentes. Também em 1 Pedro 5:7, somos encorajados a lançar sobre Deus toda a nossa ansiedade, pois Ele tem cuidado de nós.',
      verses: [
        {
          text: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.',
          reference: 'Filipenses 4:6-7'
        },
        {
          text: 'Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês.',
          reference: '1 Pedro 5:7'
        }
      ],
      category: 'Ansiedade',
      relatedQuestions: ['anxiety-2', 'anxiety-3']
    },
    {
      id: 'anxiety-2',
      question: 'Quais versículos posso ler quando estou ansioso?',
      answer: 'Quando estiver ansioso, você pode encontrar conforto em versículos como Mateus 6:25-34, que nos lembra que Deus cuida até mesmo dos pássaros e das flores, e certamente cuidará de nós. Isaías 41:10 nos assegura que Deus está conosco e nos fortalecerá. Salmos 55:22 nos encoraja a entregar nossas cargas ao Senhor.',
      verses: [
        {
          text: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.',
          reference: 'Isaías 41:10'
        },
        {
          text: 'Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.',
          reference: 'Salmos 37:5'
        }
      ],
      category: 'Ansiedade',
      relatedQuestions: ['anxiety-1', 'anxiety-3']
    },
    {
      id: 'anxiety-3',
      question: 'Como posso encontrar paz quando estou preocupado?',
      answer: 'A Bíblia nos ensina que a verdadeira paz vem de Deus. Em João 14:27, Jesus promete nos dar sua paz, diferente da que o mundo oferece. Filipenses 4:8-9 nos instrui a focar nossos pensamentos no que é verdadeiro, nobre e admirável, e o Deus da paz estará conosco. A oração e a meditação na Palavra de Deus são caminhos para encontrar essa paz.',
      verses: [
        {
          text: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.',
          reference: 'João 14:27'
        },
        {
          text: 'Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.',
          reference: 'Isaías 26:3'
        }
      ],
      category: 'Ansiedade',
      relatedQuestions: ['anxiety-1', 'anxiety-2']
    },

    // Categoria: Tristeza
    {
      id: 'sadness-1',
      question: 'O que fazer quando estou triste segundo a Bíblia?',
      answer: 'A Bíblia reconhece que a tristeza é parte da experiência humana. Salmos 34:18 nos assegura que Deus está perto dos quebrantados de coração. Em Mateus 5:4, Jesus promete que os que choram serão consolados. A Bíblia nos encoraja a buscar o conforto de Deus através da oração, da comunhão com outros crentes e da meditação nas promessas divinas.',
      verses: [
        {
          text: 'O Senhor está perto dos que têm o coração quebrantado e salva os de espírito abatido.',
          reference: 'Salmos 34:18'
        },
        {
          text: 'Bem-aventurados os que choram, pois serão consolados.',
          reference: 'Mateus 5:4'
        }
      ],
      category: 'Tristeza',
      relatedQuestions: ['sadness-2']
    },
    {
      id: 'sadness-2',
      question: 'Quais versículos trazem conforto em momentos de tristeza?',
      answer: 'Vários versículos podem trazer conforto em momentos de tristeza. Salmos 30:5 nos lembra que o choro pode durar uma noite, mas a alegria vem pela manhã. Salmos 147:3 afirma que Deus sara os quebrantados de coração. 2 Coríntios 1:3-4 descreve Deus como o Pai de misericórdias e Deus de toda consolação, que nos consola em todas as nossas tribulações.',
      verses: [
        {
          text: 'Porque a sua ira dura só um momento; no seu favor está a vida. O choro pode durar uma noite, mas a alegria vem pela manhã.',
          reference: 'Salmos 30:5'
        },
        {
          text: 'Ele sara os quebrantados de coração e lhes pensa as feridas.',
          reference: 'Salmos 147:3'
        }
      ],
      category: 'Tristeza',
      relatedQuestions: ['sadness-1']
    },

    // Categoria: Fé
    {
      id: 'faith-1',
      question: 'Como aumentar minha fé?',
      answer: 'A Bíblia ensina que a fé vem pelo ouvir a Palavra de Deus (Romanos 10:17). Para aumentar sua fé, dedique-se à leitura e meditação nas Escrituras, à oração constante e à comunhão com outros crentes. Hebreus 11 nos mostra exemplos de pessoas que viveram pela fé. Lembre-se também que as provações podem fortalecer nossa fé, como mencionado em Tiago 1:2-4.',
      verses: [
        {
          text: 'De sorte que a fé vem pelo ouvir, e o ouvir pela palavra de Deus.',
          reference: 'Romanos 10:17'
        },
        {
          text: 'Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.',
          reference: 'Hebreus 11:1'
        }
      ],
      category: 'Fé',
      relatedQuestions: ['faith-2']
    },
    {
      id: 'faith-2',
      question: 'O que é fé segundo a Bíblia?',
      answer: 'Hebreus 11:1 define a fé como "a certeza daquilo que esperamos e a prova das coisas que não vemos". A fé bíblica não é apenas uma crença intelectual, mas uma confiança ativa em Deus e em Suas promessas. É acreditar que Deus existe e que recompensa aqueles que O buscam (Hebreus 11:6). A verdadeira fé se manifesta em ações (Tiago 2:14-26).',
      verses: [
        {
          text: 'Ora, sem fé é impossível agradar a Deus; porque é necessário que aquele que se aproxima de Deus creia que ele existe, e que é galardoador dos que o buscam.',
          reference: 'Hebreus 11:6'
        },
        {
          text: 'Assim também a fé, se não tiver obras, é morta em si mesma.',
          reference: 'Tiago 2:17'
        }
      ],
      category: 'Fé',
      relatedQuestions: ['faith-1']
    },

    // Categoria: Perdão
    {
      id: 'forgiveness-1',
      question: 'Como perdoar alguém que me magoou profundamente?',
      answer: 'A Bíblia nos chama a perdoar assim como fomos perdoados por Deus (Efésios 4:32). Perdoar não significa necessariamente esquecer ou aprovar o que foi feito, mas liberar a pessoa da dívida emocional e entregar a justiça a Deus. Mateus 18:21-35 nos ensina através da parábola do servo impiedoso a importância de perdoar. A oração, buscar a graça de Deus e lembrar do perdão que recebemos são passos práticos para conseguir perdoar.',
      verses: [
        {
          text: 'Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.',
          reference: 'Efésios 4:32'
        },
        {
          text: 'E, quando estiverdes orando, se tendes alguma coisa contra alguém, perdoai, para que também vosso Pai, que está nos céus, vos perdoe as vossas ofensas.',
          reference: 'Marcos 11:25'
        }
      ],
      category: 'Perdão',
      relatedQuestions: ['forgiveness-2']
    },
    {
      id: 'forgiveness-2',
      question: 'Por que devo perdoar os outros?',
      answer: 'A Bíblia nos ensina a perdoar por várias razões: porque fomos perdoados por Deus (Colossenses 3:13), porque o perdão nos liberta do ressentimento e amargura (Hebreus 12:15), e porque Jesus nos ordenou a perdoar (Mateus 6:14-15). O perdão é essencial para nosso bem-estar espiritual e emocional, e para manter um relacionamento saudável com Deus e com os outros.',
      verses: [
        {
          text: 'Porque, se perdoardes aos homens as suas ofensas, também vosso Pai celestial vos perdoará a vós; Se, porém, não perdoardes aos homens as suas ofensas, tampouco vosso Pai vos perdoará as vossas ofensas.',
          reference: 'Mateus 6:14-15'
        },
        {
          text: 'Suportando-vos uns aos outros, e perdoando-vos uns aos outros, se alguém tiver queixa contra outro; assim como Cristo vos perdoou, assim fazei vós também.',
          reference: 'Colossenses 3:13'
        }
      ],
      category: 'Perdão',
      relatedQuestions: ['forgiveness-1']
    }
  ];

  // Agrupar perguntas por categoria
  const categorizedQuestions: Record<string, QuestionAnswer[]> = {};
  faqData.forEach(qa => {
    if (!categorizedQuestions[qa.category]) {
      categorizedQuestions[qa.category] = [];
    }
    categorizedQuestions[qa.category].push(qa);
  });

  // Função para gerar os itens do breadcrumb
  const getBreadcrumbItems = () => {
    return [
      { name: 'Início', path: '/', isLast: false },
      { name: 'Perguntas e Respostas', path: '/perguntas', isLast: true }
    ];
  };

  return (
    <div className="py-6">
      <Helmet>
        <title>Perguntas e Respostas Bíblicas | Palavra em Graça</title>
        <meta name="description" content="Encontre respostas para suas perguntas sobre fé, ansiedade, tristeza, perdão e outros temas baseados na Bíblia. Orientação espiritual para momentos difíceis." />
        <meta name="keywords" content="perguntas bíblicas, respostas cristãs, versículos para ansiedade, como perdoar, aumentar a fé, tristeza na bíblia, conforto espiritual" />
        <link rel="canonical" href="https://palavraemgraca.com.br/perguntas" />
        
        {/* Metadados específicos para busca por voz */}
        <meta name="speakable" 
              itemProp="speakable" 
              itemScope 
              itemType="https://schema.org/SpeakableSpecification"
              content="true" />
        
        {/* Schema.org markup para FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(qa => ({
              "@type": "Question",
              "name": qa.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": qa.answer + (qa.verses ? ` Versículos relacionados: ${qa.verses.map(v => `"${v.text}" (${v.reference})`).join('; ')}` : '')
              }
            }))
          })}
        </script>
      </Helmet>

      <Breadcrumb items={getBreadcrumbItems()} />

      <div className="max-w-4xl mx-auto">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Perguntas e Respostas Bíblicas</h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Encontre respostas para perguntas comuns sobre fé, ansiedade, tristeza, perdão e outros temas, 
            baseadas na Bíblia Sagrada. Esta página foi criada para ajudar você a encontrar orientação 
            espiritual para os desafios da vida.
          </p>

          {/* Índice de categorias */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Categorias</h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(categorizedQuestions).map((category, index) => (
                <a 
                  key={index} 
                  href={`#category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/* Perguntas e respostas por categoria */}
          {Object.entries(categorizedQuestions).map(([category, questions], categoryIndex) => (
            <div 
              key={categoryIndex} 
              id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="mb-10"
            >
              <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 border-b pb-2 dark:border-gray-700">
                {category}
              </h2>
              
              <div className="space-y-8">
                {questions.map((qa, qaIndex) => (
                  <div 
                    key={qaIndex} 
                    id={qa.id}
                    className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                      {qa.question}
                    </h3>
                    
                    <div className="text-gray-600 dark:text-gray-300 mb-4">
                      <p>{qa.answer}</p>
                    </div>
                    
                    {qa.verses && qa.verses.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Versículos Relacionados:</h4>
                        {qa.verses.map((verse, verseIndex) => (
                          <div 
                            key={verseIndex}
                            className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-md"
                          >
                            <p className="italic text-gray-700 dark:text-gray-300">"{verse.text}"</p>
                            <p className="text-right mt-2 font-medium text-gray-600 dark:text-gray-400">{verse.reference}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {qa.relatedQuestions && qa.relatedQuestions.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Perguntas Relacionadas:</h4>
                        <ul className="space-y-1">
                          {qa.relatedQuestions.map((relatedId, relIndex) => {
                            const relatedQuestion = faqData.find(q => q.id === relatedId);
                            return relatedQuestion ? (
                              <li key={relIndex}>
                                <a 
                                  href={`#${relatedId}`}
                                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                  {relatedQuestion.question}
                                </a>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Não encontrou sua pergunta?</h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Se você não encontrou resposta para sua pergunta, você pode:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Buscar na Bíblia</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Acesse nossa Bíblia online e pesquise por palavras-chave relacionadas à sua dúvida.
              </p>
              <Link to="/biblia/indice" className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                Acessar a Bíblia →
              </Link>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Orientação Personalizada</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Compartilhe como você está se sentindo e receba versículos relevantes para seu momento.
              </p>
              <Link to="/" className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                Receber Orientação →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VoiceSearch; 