interface BookDescription {
  name: string;
  author: string;
  date: string;
  category: string;
  theme: string;
  purpose: string;
  overview: string;
  keyVerses: string[];
  mainCharacters: string[];
  historicalContext: string;
  theologicalSignificance: string;
  practicalApplication: string;
  outline: string[];
}

type BibleBookDescriptions = {
  [key: string]: BookDescription;
};

export const bookDescriptions: BibleBookDescriptions = {
  'Gn': {
    name: 'Gênesis',
    author: 'Moisés',
    date: 'Aproximadamente 1445-1405 a.C.',
    category: 'Pentateuco',
    theme: 'Origens e Alianças',
    purpose: 'Revelar como Deus criou o mundo, como o pecado entrou na humanidade, e como Deus iniciou seu plano de redenção através da escolha de um povo especial.',
    overview: 'Gênesis, o livro das origens, apresenta os fundamentos da fé judaico-cristã. Começa com a majestosa narrativa da criação, mostra a entrada do pecado no mundo, o dilúvio, a torre de Babel, e então foca nas histórias dos patriarcas: Abraão, Isaque, Jacó e José. Através dessas narrativas, vemos Deus estabelecendo alianças e iniciando Seu plano de redenção para a humanidade.',
    keyVerses: [
      'No princípio criou Deus os céus e a terra (1:1)',
      'E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança (1:26)',
      'Estabelecerei a minha aliança contigo e com a tua descendência (17:7)'
    ],
    mainCharacters: [
      'Adão e Eva',
      'Noé',
      'Abraão e Sara',
      'Isaque e Rebeca',
      'Jacó',
      'José'
    ],
    historicalContext: 'Abrange desde a criação do mundo até aproximadamente 1800 a.C., incluindo o período dos patriarcas e a descida do povo hebreu ao Egito.',
    theologicalSignificance: 'Estabelece doutrinas fundamentais como a criação, a natureza de Deus, a origem do pecado, o início do plano de redenção, e o estabelecimento da aliança com Israel. É a base para entender toda a narrativa bíblica subsequente.',
    practicalApplication: 'Nos ensina sobre a soberania de Deus, a importância da fé e obediência, as consequências do pecado, e como Deus pode usar circunstâncias difíceis para realizar Seus propósitos.',
    outline: [
      'A Criação e a Queda (1-11)',
      'História de Abraão (12-25)',
      'História de Isaque e Jacó (26-36)',
      'História de José (37-50)'
    ]
  },
  'Êx': {
    name: 'Êxodo',
    author: 'Moisés',
    date: 'Aproximadamente 1445-1405 a.C.',
    category: 'Pentateuco',
    theme: 'Redenção e Formação do Povo de Deus',
    purpose: 'Registrar a libertação de Israel da escravidão egípcia, o estabelecimento da aliança no Sinai, e a organização do povo como nação teocrática.',
    overview: 'Êxodo narra a dramática libertação do povo de Israel da escravidão egípcia através de poderosos milagres, o estabelecimento da Lei no Sinai, e a construção do Tabernáculo. O livro demonstra o poder e a fidelidade de Deus em cumprir Suas promessas a Abraão, transformando uma família de escravos em uma nação santa. Através dos eventos do Êxodo, Deus revela Seu caráter, Seu poder sobre os deuses do Egito, e Seu plano de ter um povo separado para Si.',
    keyVerses: [
      'Eu sou o que sou (3:14)',
      'Agora, pois, se diligentemente ouvirdes a minha voz e guardardes a minha aliança, então sereis a minha propriedade peculiar dentre todos os povos (19:5)',
      'Não terás outros deuses diante de mim (20:3)',
      'Habilitarei no meio deles, e serei o seu Deus (29:45)'
    ],
    mainCharacters: [
      'Moisés - O libertador escolhido por Deus',
      'Arão - Irmão de Moisés e primeiro sumo sacerdote',
      'Faraó - O obstinado governante do Egito',
      'Zípora - Esposa de Moisés',
      'Jetro - Sogro de Moisés e sacerdote de Midiã',
      'Miriã - Irmã de Moisés e profetisa'
    ],
    historicalContext: 'Aproximadamente 1446-1406 a.C., durante o período do Novo Reino do Egito. Os israelitas haviam crescido de uma família de 70 pessoas para uma multidão de cerca de 2 milhões. Após 430 anos no Egito, Deus cumpre Sua promessa de libertá-los e levá-los à Terra Prometida.',
    theologicalSignificance: 'Estabelece o padrão de redenção divina que aponta para Cristo. Revela o caráter de Deus através de Seus nomes e ações. Institui a Páscoa como memorial da libertação e tipo de Cristo. Estabelece a Lei como expressão da vontade de Deus e guia moral. Introduz o sistema sacrificial e sacerdotal que prefigura a obra de Cristo. Demonstra a importância da adoração adequada através do Tabernáculo.',
    practicalApplication: 'Ensina sobre confiança em Deus em tempos difíceis, a importância da obediência, como Deus pode usar pessoas imperfeitas, a necessidade de liderança espiritual, e como Deus deseja habitar entre seu povo. Demonstra que a libertação física deve levar à transformação espiritual.',
    outline: [
      'Israel no Egito (1-2)',
      'O Chamado de Moisés (3-4)',
      'As Dez Pragas (5-11)',
      'A Páscoa e o Êxodo (12-13)',
      'A Travessia do Mar Vermelho (14-15)',
      'Jornada ao Sinai (16-18)',
      'A Lei e a Aliança (19-24)',
      'Instruções para o Tabernáculo (25-31)',
      'O Bezerro de Ouro e Renovação da Aliança (32-34)',
      'Construção do Tabernáculo (35-40)'
    ]
  },
  'Lv': {
    name: 'Levítico',
    author: 'Moisés',
    date: 'Aproximadamente 1445-1405 a.C.',
    category: 'Pentateuco',
    theme: 'Santidade e Adoração',
    purpose: 'Estabelecer o sistema sacrificial e as leis de pureza para Israel, ensinando como um povo pecador pode se aproximar de um Deus santo.',
    overview: 'Levítico estabelece o sistema sacrificial e as leis cerimoniais para Israel. O livro enfatiza a santidade de Deus e como Seu povo deve viver em santidade. Contém instruções detalhadas sobre sacrifícios, o sacerdócio, dias santos, leis alimentares e morais.',
    keyVerses: [
      'Sede santos, porque eu, o Senhor vosso Deus, sou santo (19:2)',
      'Amarás o teu próximo como a ti mesmo (19:18)',
      'Porque a vida da carne está no sangue (17:11)'
    ],
    mainCharacters: [
      'Moisés',
      'Arão',
      'Nadabe e Abiú',
      'Os Sacerdotes Levitas'
    ],
    historicalContext: 'Escrito durante o período em que Israel estava no deserto, após o Êxodo do Egito. As leis foram dadas no Monte Sinai.',
    theologicalSignificance: 'Estabelece o padrão de santidade de Deus e a necessidade de expiação pelo pecado. Os sacrifícios e rituais apontam para o sacrifício definitivo de Cristo.',
    practicalApplication: 'Ensina sobre a importância da santidade pessoal, adoração apropriada, e como viver em comunidade de forma santa. Mostra que Deus se preocupa com todos os aspectos da vida.',
    outline: [
      'Leis dos Sacrifícios (1-7)',
      'Consagração dos Sacerdotes (8-10)',
      'Leis de Pureza (11-15)',
      'Dia da Expiação (16)',
      'Código de Santidade (17-27)'
    ]
  },
  'Nm': {
    name: 'Números',
    author: 'Moisés',
    date: 'Aproximadamente 1445-1405 a.C.',
    category: 'Pentateuco',
    theme: 'Jornada e Provação',
    purpose: 'Registrar a jornada de Israel pelo deserto e as consequências da desobediência e incredulidade.',
    overview: 'Números narra os 40 anos de peregrinação de Israel no deserto. O livro começa com esperança, quando o povo está pronto para entrar em Canaã, mas devido à sua incredulidade, uma geração inteira morre no deserto. Mostra tanto o julgamento quanto a fidelidade de Deus.',
    keyVerses: [
      'O Senhor te abençoe e te guarde (6:24)',
      'Perdoa, pois, a iniquidade deste povo, segundo a grandeza da tua misericórdia (14:19)'
    ],
    mainCharacters: [
      'Moisés',
      'Arão',
      'Miriam',
      'Josué',
      'Calebe',
      'Balaão'
    ],
    historicalContext: 'Cobre o período desde a saída do Sinai até a chegada nas planícies de Moabe, preparando-se para entrar em Canaã.',
    theologicalSignificance: 'Demonstra as consequências da desobediência e a importância da fé. Revela a fidelidade de Deus mesmo quando Seu povo falha.',
    practicalApplication: 'Adverte contra a murmuração e incredulidade. Ensina sobre liderança, fé e as consequências de nossas escolhas.',
    outline: [
      'Primeiro Censo e Preparações (1-10)',
      'Viagem do Sinai a Cades (11-12)',
      'Rebelião e Julgamento (13-19)',
      'Jornada a Moabe (20-25)',
      'Preparação para Canaã (26-36)'
    ]
  },
  'Dt': {
    name: 'Deuteronômio',
    author: 'Moisés',
    date: 'Aproximadamente 1405 a.C.',
    category: 'Pentateuco',
    theme: 'Renovação da Aliança',
    purpose: 'Renovar a aliança com a nova geração de Israel e prepará-los para entrar na Terra Prometida.',
    overview: 'Deuteronômio contém os discursos finais de Moisés ao povo de Israel. É uma recapitulação e explicação da Lei, adaptada para a nova geração que entrará em Canaã. O livro enfatiza o amor e a fidelidade a Deus.',
    keyVerses: [
      'Amarás, pois, o Senhor teu Deus de todo o teu coração, de toda a tua alma e de todas as tuas forças (6:5)',
      'O Senhor, só o Senhor é o teu Deus (6:4)'
    ],
    mainCharacters: [
      'Moisés',
      'Josué'
    ],
    historicalContext: 'Último mês da vida de Moisés, com Israel acampado nas planícies de Moabe, preparando-se para entrar em Canaã.',
    theologicalSignificance: 'Estabelece o fundamento para o relacionamento entre Deus e Seu povo baseado no amor e obediência. Jesus frequentemente citou Deuteronômio.',
    practicalApplication: 'Ensina sobre a importância de lembrar o que Deus fez, amar a Deus completamente, e passar a fé para as próximas gerações.',
    outline: [
      'Primeiro Discurso: Revisão Histórica (1-4)',
      'Segundo Discurso: Exposição da Lei (5-26)',
      'Terceiro Discurso: Bênçãos e Maldições (27-30)',
      'Palavras Finais e Morte de Moisés (31-34)'
    ]
  },
  'Sl': {
    name: 'Salmos',
    author: 'Vários autores, incluindo Davi, Asafe, os filhos de Coré, e outros',
    date: 'Aproximadamente 1440-450 a.C.',
    category: 'Livros Poéticos',
    theme: 'Adoração e Relacionamento com Deus',
    purpose: 'Proporcionar um manual de adoração para o povo de Deus, expressando toda a gama de emoções e experiências humanas em relação a Deus.',
    overview: 'Os Salmos são uma coleção de 150 poemas líricos que expressam profunda devoção a Deus. Incluem louvores, lamentos, ações de graças, súplicas, e reflexões sobre a vida. Muitos são proféticos e messiânicos, apontando para Cristo.',
    keyVerses: [
      'O Senhor é o meu pastor, nada me faltará (23:1)',
      'Cria em mim, ó Deus, um coração puro (51:10)'
    ],
    mainCharacters: [
      'Davi',
      'Asafe',
      'Filhos de Coré'
    ],
    historicalContext: 'Escritos ao longo de quase mil anos, refletem várias épocas da história de Israel, desde Moisés até o período pós-exílio.',
    theologicalSignificance: 'Revela a natureza de Deus, a importância da adoração sincera, e fornece profecias messiânicas. Demonstra como relacionar-se com Deus em todas as circunstâncias da vida.',
    practicalApplication: 'Ensina como adorar, orar, e confiar em Deus em todas as situações da vida. Oferece conforto, orientação e inspiração para a vida cristã.',
    outline: [
      'Livro 1 (Salmos 1-41)',
      'Livro 2 (Salmos 42-72)',
      'Livro 3 (Salmos 73-89)',
      'Livro 4 (Salmos 90-106)',
      'Livro 5 (Salmos 107-150)'
    ]
  },
  'Is': {
    name: 'Isaías',
    author: 'Isaías',
    date: 'Aproximadamente 740-680 a.C.',
    category: 'Profetas Maiores',
    theme: 'Julgamento e Redenção',
    purpose: 'Advertir Judá sobre o julgamento vindouro devido ao seu pecado, mas também oferecer esperança através de profecias sobre o Messias e a restauração futura.',
    overview: 'Isaías, frequentemente chamado de "príncipe dos profetas", apresenta algumas das profecias messiânicas mais detalhadas do Antigo Testamento. O livro alterna entre mensagens de julgamento e esperança, culminando com a visão de novos céus e nova terra.',
    keyVerses: [
      'Eis que a virgem conceberá e dará à luz um filho (7:14)',
      'Mas ele foi ferido por causa das nossas transgressões (53:5)'
    ],
    mainCharacters: [
      'Isaías',
      'Reis Uzias, Jotão, Acaz e Ezequias'
    ],
    historicalContext: 'Ministrou durante o período da ascensão da Assíria como potência mundial e o declínio espiritual de Judá.',
    theologicalSignificance: 'Contém profecias cruciais sobre o Messias, incluindo Seu nascimento virginal, ministério e morte expiatória. Demonstra a santidade de Deus e Sua soberania sobre a história.',
    practicalApplication: 'Ensina sobre a importância da santidade pessoal, confiança em Deus em tempos de crise, e a esperança futura para o povo de Deus.',
    outline: [
      'Profecias de Julgamento (1-39)',
      'Mensagens de Conforto (40-55)',
      'Promessas de Restauração Futura (56-66)'
    ]
  },
  'Mt': {
    name: 'Mateus',
    author: 'Mateus (Levi)',
    date: 'Aproximadamente 50-70 d.C.',
    category: 'Evangelhos',
    theme: 'Jesus como o Messias Prometido',
    purpose: 'Demonstrar que Jesus é o Messias prometido no Antigo Testamento e o legítimo Rei dos judeus.',
    overview: 'Mateus apresenta Jesus como o cumprimento das profecias messiânicas, enfatizando Sua autoridade real e Seu papel como mestre. O evangelho inclui cinco grandes discursos, incluindo o Sermão do Monte, e destaca o Reino dos Céus.',
    keyVerses: [
      'Emanuel, que traduzido é: Deus conosco (1:23)',
      'Buscai primeiro o Reino de Deus e a sua justiça (6:33)'
    ],
    mainCharacters: [
      'Jesus Cristo',
      'Os Doze Apóstolos',
      'João Batista',
      'Maria e José'
    ],
    historicalContext: 'Escrito primariamente para judeus cristãos em um período de crescente tensão entre a igreja e a sinagoga.',
    theologicalSignificance: 'Estabelece Jesus como o cumprimento das promessas do Antigo Testamento e apresenta ensinamentos fundamentais sobre o Reino de Deus.',
    practicalApplication: 'Oferece instruções práticas para a vida cristã através dos ensinamentos de Jesus, especialmente no Sermão do Monte.',
    outline: [
      'Nascimento e Início do Ministério (1-4)',
      'Sermão do Monte (5-7)',
      'Ministério na Galileia (8-18)',
      'Ministério em Jerusalém (19-25)',
      'Paixão e Ressurreição (26-28)'
    ]
  },
  'Jo': {
    name: 'João',
    author: 'João, o Apóstolo',
    date: 'Aproximadamente 85-95 d.C.',
    category: 'Evangelhos',
    theme: 'Jesus como o Filho de Deus',
    purpose: 'Para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais vida em seu nome.',
    overview: 'João apresenta uma perspectiva única de Jesus, enfatizando Sua divindade através dos "Eu Sou" e dos sinais miraculosos. O evangelho é profundamente teológico e simbólico, revelando verdades espirituais profundas sobre Cristo.',
    keyVerses: [
      'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus (1:1)',
      'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito (3:16)'
    ],
    mainCharacters: [
      'Jesus Cristo',
      'João Batista',
      'Os Doze Apóstolos',
      'Maria, mãe de Jesus',
      'Maria Madalena'
    ],
    historicalContext: 'Escrito no final do primeiro século, quando surgiram heresias sobre a natureza de Cristo.',
    theologicalSignificance: 'Estabelece claramente a divindade de Cristo e a necessidade de fé pessoal nEle para a salvação.',
    practicalApplication: 'Ensina sobre a importância da fé em Jesus, o papel do Espírito Santo, e o amor como marca distintiva dos seguidores de Cristo.',
    outline: [
      'Prólogo: O Verbo Se Fez Carne (1)',
      'Livro dos Sinais (2-12)',
      'Livro da Glória (13-20)',
      'Epílogo (21)'
    ]
  },
  'Js': {
    name: 'Josué',
    author: 'Josué e outros',
    date: 'Aproximadamente 1400-1350 a.C.',
    category: 'Livros Históricos',
    theme: 'Conquista e Fidelidade',
    purpose: 'Registrar como Deus cumpriu Sua promessa de dar a terra de Canaã a Israel e a importância da obediência na conquista.',
    overview: 'O livro de Josué narra a conquista da Terra Prometida sob a liderança de Josué, sucessor de Moisés. Demonstra como Deus é fiel às Suas promessas e como a obediência traz vitória. O livro termina com a divisão da terra entre as tribos e o renovamento da aliança.',
    keyVerses: [
      'Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor teu Deus é contigo (1:9)',
      'Eu e a minha casa serviremos ao Senhor (24:15)'
    ],
    mainCharacters: [
      'Josué',
      'Calebe',
      'Raabe',
      'Acã'
    ],
    historicalContext: 'Período após a morte de Moisés, quando Israel estava pronto para entrar e conquistar a Terra Prometida.',
    theologicalSignificance: 'Demonstra a fidelidade de Deus em cumprir Suas promessas e a importância da obediência para receber as bênçãos divinas.',
    practicalApplication: 'Ensina sobre coragem, liderança espiritual, e a importância de confiar em Deus em face de grandes desafios.',
    outline: [
      'Preparação para a Conquista (1-5)',
      'Conquista de Canaã (6-12)',
      'Divisão da Terra (13-21)',
      'Últimas Palavras de Josué (22-24)'
    ]
  },
  'Jz': {
    name: 'Juízes',
    author: 'Possivelmente Samuel',
    date: 'Aproximadamente 1050-1000 a.C.',
    category: 'Livros Históricos',
    theme: 'Ciclos de Apostasia e Libertação',
    purpose: 'Mostrar as consequências da desobediência a Deus e Sua misericórdia em levantar libertadores para Israel.',
    overview: 'Juízes retrata um período turbulento na história de Israel, marcado por ciclos repetidos de apostasia, opressão, arrependimento e libertação. O livro demonstra as consequências de um povo que abandona os caminhos de Deus.',
    keyVerses: [
      'Naqueles dias não havia rei em Israel; cada um fazia o que parecia bem aos seus olhos (21:25)',
      'Clamaram os filhos de Israel ao Senhor, e o Senhor lhes levantou um libertador (3:9)'
    ],
    mainCharacters: [
      'Débora',
      'Gideão',
      'Sansão',
      'Baraque',
      'Jefté'
    ],
    historicalContext: 'Período entre a morte de Josué e o estabelecimento da monarquia, aproximadamente 350 anos de história.',
    theologicalSignificance: 'Ilustra o ciclo do pecado e suas consequências, bem como a misericórdia e fidelidade de Deus em resposta ao arrependimento.',
    practicalApplication: 'Adverte contra o relativismo moral e mostra a importância de uma liderança piedosa e obediência a Deus.',
    outline: [
      'Introdução e Situação em Canaã (1-2)',
      'Os Ciclos dos Juízes (3-16)',
      'Exemplos de Decadência Moral (17-21)'
    ]
  },
  'Rt': {
    name: 'Rute',
    author: 'Desconhecido (possivelmente Samuel)',
    date: 'Aproximadamente 1000 a.C.',
    category: 'Livros Históricos',
    theme: 'Redenção e Lealdade',
    purpose: 'Demonstrar o amor leal e a providência de Deus, além de estabelecer a linhagem davídica.',
    overview: 'Uma bela história de amor e redenção que ocorre durante o período dos juízes. Através da lealdade de Rute a sua sogra Noemi e seu casamento com Boaz, Deus providencia não apenas para elas, mas estabelece uma parte crucial da linhagem messiânica.',
    keyVerses: [
      'Aonde quer que tu fores irei eu, e onde quer que pousares, ali pousarei eu; o teu povo é o meu povo, o teu Deus é o meu Deus (1:16)',
      'O Senhor retribua o teu feito, e seja cumprida a tua recompensa (2:12)'
    ],
    mainCharacters: [
      'Rute',
      'Noemi',
      'Boaz',
      'Orfa'
    ],
    historicalContext: 'Durante o período dos juízes, em um tempo de fome em Israel.',
    theologicalSignificance: 'Demonstra como Deus pode usar pessoas não israelitas em Seu plano de redenção e ilustra o conceito do resgatador-parente, que prefigura Cristo.',
    practicalApplication: 'Ensina sobre lealdade, amor sacrificial, e como Deus pode transformar tragédia em bênção.',
    outline: [
      'Tragédia e Retorno (1)',
      'Rute Encontra Boaz (2)',
      'Plano de Redenção (3)',
      'Casamento e Linhagem (4)'
    ]
  },
  '1Sm': {
    name: '1 Samuel',
    author: 'Samuel, Natã e Gade',
    date: 'Aproximadamente 1050-1010 a.C.',
    category: 'Livros Históricos',
    theme: 'Transição para a Monarquia',
    purpose: 'Registrar a transição de Israel do período dos juízes para a monarquia, focando em Samuel, Saul e Davi.',
    overview: '1 Samuel narra a transição de Israel de uma teocracia para uma monarquia. O livro centra-se em três personagens principais: Samuel (o último juiz), Saul (o primeiro rei) e Davi (o rei escolhido por Deus).',
    keyVerses: [
      'O Senhor não vê como vê o homem. O homem vê o exterior, porém o Senhor vê o coração (16:7)',
      'Obedecer é melhor do que sacrificar (15:22)'
    ],
    mainCharacters: [
      'Samuel',
      'Saul',
      'Davi',
      'Jônatas',
      'Ana'
    ],
    historicalContext: 'Período de transição em Israel, marcado pela demanda do povo por um rei para ser como as outras nações.',
    theologicalSignificance: 'Demonstra a soberania de Deus na escolha de líderes e as consequências da desobediência e orgulho.',
    practicalApplication: 'Ensina sobre liderança piedosa, as consequências da desobediência, e a importância de confiar no timing de Deus.',
    outline: [
      'Samuel como Juiz (1-7)',
      'Saul como Rei (8-15)',
      'Declínio de Saul e Ascensão de Davi (16-31)'
    ]
  },
  '2Sm': {
    name: '2 Samuel',
    author: 'Natã e Gade',
    date: 'Aproximadamente 1010-970 a.C.',
    category: 'Livros Históricos',
    theme: 'Reino de Davi',
    purpose: 'Registrar o reinado de Davi, mostrando tanto suas vitórias quanto suas falhas.',
    overview: '2 Samuel foca no reinado de Davi, primeiro sobre Judá e depois sobre todo Israel. O livro mostra tanto os triunfos quanto as tragédias de seu reinado, incluindo seu pecado com Bate-Seba e suas consequências.',
    keyVerses: [
      'A tua casa e o teu reino permanecerão para sempre diante de ti (7:16)',
      'Pequei contra o Senhor (12:13)'
    ],
    mainCharacters: [
      'Davi',
      'Bate-Seba',
      'Natã',
      'Absalão',
      'Joabe'
    ],
    historicalContext: 'Cobre os 40 anos do reinado de Davi, período de grande expansão e consolidação do reino de Israel.',
    theologicalSignificance: 'Estabelece a aliança davídica e mostra como Deus pode usar pessoas imperfeitas para cumprir Seus propósitos.',
    practicalApplication: 'Ensina sobre as consequências do pecado, a importância do arrependimento genuíno, e como Deus pode restaurar os caídos.',
    outline: [
      'Triunfos de Davi (1-10)',
      'Pecado e Consequências (11-12)',
      'Problemas Familiares (13-18)',
      'Últimos Anos (19-24)'
    ]
  },
  '1Rs': {
    name: '1 Reis',
    author: 'Desconhecido (possivelmente Jeremias)',
    date: 'Aproximadamente 560-540 a.C.',
    category: 'Livros Históricos',
    theme: 'Reino Dividido',
    purpose: 'Registrar a história do reino dividido, focando na sucessão de Salomão e a divisão de Israel.',
    overview: '1 Reis começa com o reinado de Salomão e sua sabedoria, a construção do Templo, e termina com a divisão do reino e o ministério de Elias. O livro mostra como a desobediência aos mandamentos de Deus leva à divisão e ao declínio nacional.',
    keyVerses: [
      'Dá, pois, ao teu servo um coração entendido para julgar o teu povo (3:9)',
      'Se andares nos meus caminhos... prolongarei os teus dias (3:14)'
    ],
    mainCharacters: [
      'Salomão',
      'Roboão',
      'Jeroboão',
      'Elias',
      'Rainha de Sabá'
    ],
    historicalContext: 'Período desde a morte de Davi até o reinado de Acazias em Israel e Josafá em Judá.',
    theologicalSignificance: 'Demonstra como a obediência a Deus traz bênção e a desobediência leva ao julgamento. O templo simboliza a presença de Deus entre Seu povo.',
    practicalApplication: 'Ensina sobre as consequências de compromissos espirituais mistos e a importância de manter-se fiel a Deus.',
    outline: [
      'Reino de Salomão (1-11)',
      'Reino Dividido (12-16)',
      'Ministério de Elias (17-22)'
    ]
  },
  '2Rs': {
    name: '2 Reis',
    author: 'Desconhecido (possivelmente Jeremias)',
    date: 'Aproximadamente 560-540 a.C.',
    category: 'Livros Históricos',
    theme: 'Declínio e Cativeiro',
    purpose: 'Registrar a queda dos reinos do norte e do sul devido à sua infidelidade a Deus.',
    overview: '2 Reis continua a história do reino dividido, focando no ministério de Eliseu e culminando com o exílio de Israel pela Assíria e de Judá pela Babilônia. O livro demonstra as trágicas consequências da idolatria persistente.',
    keyVerses: [
      'Onde está o Senhor, o Deus de Elias? (2:14)',
      'Aconteceu isto a Israel porque pecaram contra o Senhor seu Deus (17:7)'
    ],
    mainCharacters: [
      'Eliseu',
      'Jezabel',
      'Jeú',
      'Ezequias',
      'Josias'
    ],
    historicalContext: 'Cobre o período desde o ministério de Eliseu até o cativeiro babilônico.',
    theologicalSignificance: 'Mostra como a infidelidade a Deus leva ao julgamento nacional, mas também como o arrependimento pode trazer restauração.',
    practicalApplication: 'Adverte contra a idolatria e ensina sobre a importância de reformas espirituais genuínas.',
    outline: [
      'Ministério de Eliseu (1-8)',
      'Reis de Israel e Judá (9-16)',
      'Queda de Israel (17)',
      'Últimos Reis de Judá (18-25)'
    ]
  },
  '1Cr': {
    name: '1 Crônicas',
    author: 'Esdras (tradicionalmente)',
    date: 'Aproximadamente 450-430 a.C.',
    category: 'Livros Históricos',
    theme: 'História Espiritual de Israel',
    purpose: 'Preservar a genealogia e história de Israel com ênfase no aspecto espiritual, especialmente o reinado de Davi.',
    overview: '1 Crônicas começa com genealogias desde Adão, focando especialmente na linhagem davídica, e então narra o reinado de Davi com ênfase em seu papel no estabelecimento do culto e preparação para o templo.',
    keyVerses: [
      'Buscai o Senhor e o seu poder; buscai perpetuamente a sua presença (16:11)',
      'Porque tudo vem de ti, e das tuas mãos to damos (29:14)'
    ],
    mainCharacters: [
      'Davi',
      'Salomão',
      'Zadoque',
      'Natã'
    ],
    historicalContext: 'Escrito após o exílio para lembrar aos retornados sua herança espiritual e identidade nacional.',
    theologicalSignificance: 'Enfatiza a importância da adoração adequada e a centralidade do templo na vida espiritual de Israel.',
    practicalApplication: 'Ensina sobre a importância de preservar a herança espiritual e manter a adoração centrada em Deus.',
    outline: [
      'Genealogias (1-9)',
      'Morte de Saul (10)',
      'Reinado de Davi (11-29)'
    ]
  },
  '2Cr': {
    name: '2 Crônicas',
    author: 'Esdras (tradicionalmente)',
    date: 'Aproximadamente 450-430 a.C.',
    category: 'Livros Históricos',
    theme: 'Reino de Judá',
    purpose: 'Registrar a história do reino de Judá, focando nos reis fiéis e nas reformas espirituais.',
    overview: '2 Crônicas narra a história do reino de Judá desde Salomão até o exílio babilônico, com ênfase especial nos períodos de reavivamento e reforma espiritual. O livro termina com o decreto de Ciro permitindo o retorno dos judeus.',
    keyVerses: [
      'Se o meu povo, que se chama pelo meu nome, se humilhar, e orar, e buscar a minha face (7:14)',
      'O Senhor é convosco, quando vós estais com ele (15:2)'
    ],
    mainCharacters: [
      'Salomão',
      'Asa',
      'Josafá',
      'Ezequias',
      'Josias'
    ],
    historicalContext: 'Escrito após o retorno do exílio para encorajar a restauração da adoração adequada.',
    theologicalSignificance: 'Demonstra como a fidelidade a Deus traz bênção e como o arrependimento pode levar ao reavivamento nacional.',
    practicalApplication: 'Ensina sobre a importância do reavivamento espiritual e da adoração centrada em Deus.',
    outline: [
      'Reinado de Salomão (1-9)',
      'Reino de Judá (10-36:21)',
      'Decreto de Ciro (36:22-23)'
    ]
  },
  'Ed': {
    name: 'Esdras',
    author: 'Esdras',
    date: 'Aproximadamente 440 a.C.',
    category: 'Livros Históricos',
    theme: 'Restauração e Reforma',
    purpose: 'Registrar o retorno dos exilados a Jerusalém e a restauração da adoração adequada.',
    overview: 'Esdras narra dois retornos importantes do exílio babilônico: o primeiro sob Zorobabel para reconstruir o templo, e o segundo sob Esdras para restaurar a vida espiritual do povo. O livro enfatiza a importância da pureza espiritual e da obediência à Lei.',
    keyVerses: [
      'Porque Esdras tinha preparado o seu coração para buscar a lei do Senhor e para a cumprir (7:10)',
      'A mão do nosso Deus é sobre todos os que o buscam (8:22)'
    ],
    mainCharacters: [
      'Esdras',
      'Zorobabel',
      'Ciro',
      'Dario',
      'Artaxerxes'
    ],
    historicalContext: 'Período após o decreto de Ciro permitindo o retorno dos judeus do exílio babilônico.',
    theologicalSignificance: 'Demonstra a fidelidade de Deus em cumprir Suas promessas de restauração e a importância da pureza espiritual.',
    practicalApplication: 'Ensina sobre a importância do arrependimento, reforma espiritual e fidelidade à Palavra de Deus.',
    outline: [
      'Primeiro Retorno sob Zorobabel (1-6)',
      'Retorno de Esdras (7-8)',
      'Reforma e Reavivamento (9-10)'
    ]
  },
  'Ne': {
    name: 'Neemias',
    author: 'Neemias',
    date: 'Aproximadamente 430 a.C.',
    category: 'Livros Históricos',
    theme: 'Reconstrução e Renovação',
    purpose: 'Registrar a reconstrução dos muros de Jerusalém e a renovação espiritual do povo.',
    overview: 'Neemias conta a história da reconstrução dos muros de Jerusalém sob liderança de Neemias. O livro demonstra excelente liderança em face da oposição e a importância de combinar trabalho prático com renovação espiritual.',
    keyVerses: [
      'O Deus dos céus é quem nos dará bom êxito; e nós, seus servos, nos levantaremos e edificaremos (2:20)',
      'Não vos entristeçais, porque a alegria do Senhor é a vossa força (8:10)'
    ],
    mainCharacters: [
      'Neemias',
      'Esdras',
      'Sambalate',
      'Tobias'
    ],
    historicalContext: 'Aproximadamente 13 anos após os eventos finais de Esdras, durante o reinado de Artaxerxes I.',
    theologicalSignificance: 'Mostra como Deus usa líderes dedicados para realizar Seus propósitos e a importância de combinar ação prática com devoção espiritual.',
    practicalApplication: 'Ensina princípios de liderança, perseverança face à oposição, e a importância de renovação espiritual.',
    outline: [
      'Reconstrução dos Muros (1-7)',
      'Reavivamento Espiritual (8-10)',
      'Povoamento e Dedicação (11-13)'
    ]
  },
  'Et': {
    name: 'Ester',
    author: 'Desconhecido',
    date: 'Aproximadamente 470-460 a.C.',
    category: 'Livros Históricos',
    theme: 'Providência Divina',
    purpose: 'Demonstrar como Deus protege Seu povo mesmo quando Ele parece estar ausente.',
    overview: 'Ester narra como uma jovem judia se torna rainha da Pérsia e salva seu povo de um plano de genocídio. Embora o nome de Deus não seja mencionado explicitamente, Sua providência é evidente em toda a narrativa.',
    keyVerses: [
      'Quem sabe se não foi para uma ocasião como esta que chegaste ao reino? (4:14)',
      'Se eu perecer, pereci (4:16)'
    ],
    mainCharacters: [
      'Ester',
      'Mardoqueu',
      'Hamã',
      'Rei Assuero (Xerxes)'
    ],
    historicalContext: 'Durante o reinado de Xerxes I da Pérsia, quando muitos judeus permaneciam no exílio.',
    theologicalSignificance: 'Demonstra a providência soberana de Deus na proteção de Seu povo, mesmo quando Ele parece estar oculto.',
    practicalApplication: 'Ensina sobre coragem, providência divina, e a importância de estar preparado para ser usado por Deus.',
    outline: [
      'Ester Torna-se Rainha (1-2)',
      'Ameaça de Hamã (3-4)',
      'Triunfo dos Judeus (5-10)'
    ]
  },
  'Jó': {
    name: 'Jó',
    author: 'Desconhecido',
    date: 'Desconhecida (possivelmente durante o período patriarcal)',
    category: 'Livros Poéticos',
    theme: 'Sofrimento e Soberania',
    purpose: 'Explorar a questão do sofrimento humano e a soberania de Deus.',
    overview: 'Jó examina a questão do sofrimento do justo através da história de um homem que perde tudo, exceto sua fé em Deus. O livro desafia visões simplistas sobre sofrimento e retribuição, revelando a soberania e sabedoria de Deus.',
    keyVerses: [
      'O Senhor o deu e o Senhor o tomou; bendito seja o nome do Senhor (1:21)',
      'Eu sei que o meu Redentor vive (19:25)'
    ],
    mainCharacters: [
      'Jó',
      'Elifaz',
      'Bildade',
      'Zofar',
      'Eliú'
    ],
    historicalContext: 'Provavelmente durante o período patriarcal, em Uz.',
    theologicalSignificance: 'Aborda questões fundamentais sobre o sofrimento, a justiça divina, e os limites da sabedoria humana.',
    practicalApplication: 'Ensina sobre confiança em Deus durante o sofrimento e a importância de manter a integridade em tempos difíceis.',
    outline: [
      'Prólogo: Os Testes de Jó (1-2)',
      'Diálogos com os Amigos (3-31)',
      'Discursos de Eliú (32-37)',
      'Deus Responde (38-41)',
      'Epílogo: Restauração (42)'
    ]
  },
  'Pv': {
    name: 'Provérbios',
    author: 'Principalmente Salomão, com contribuições de outros',
    date: 'Principalmente durante o reinado de Salomão (970-930 a.C.)',
    category: 'Livros Poéticos',
    theme: 'Sabedoria Prática',
    purpose: 'Ensinar sabedoria prática para viver uma vida que agrada a Deus.',
    overview: 'Provérbios é uma coleção de ditos sábios que oferecem orientação prática para viver. O livro cobre uma ampla gama de tópicos, desde relacionamentos até negócios, sempre enfatizando que o temor do Senhor é o princípio da sabedoria.',
    keyVerses: [
      'O temor do Senhor é o princípio da sabedoria (1:7)',
      'Confia no Senhor de todo o teu coração (3:5)'
    ],
    mainCharacters: [
      'Salomão',
      'O Sábio',
      'O Tolo',
      'A Mulher Virtuosa'
    ],
    historicalContext: 'Compilado principalmente durante o período da monarquia unida de Israel, refletindo a sabedoria da corte real.',
    theologicalSignificance: 'Demonstra que a verdadeira sabedoria começa com o temor do Senhor e se aplica a todos os aspectos da vida.',
    practicalApplication: 'Oferece orientação prática para tomada de decisões, relacionamentos, trabalho, e vida familiar.',
    outline: [
      'Elogio à Sabedoria (1-9)',
      'Provérbios de Salomão (10-24)',
      'Provérbios Coletados por Ezequias (25-29)',
      'Palavras de Agur e Lemuel (30-31)'
    ]
  },
  'Ec': {
    name: 'Eclesiastes',
    author: 'Salomão (tradicionalmente)',
    date: 'Aproximadamente 935 a.C.',
    category: 'Livros Poéticos',
    theme: 'Significado da Vida',
    purpose: 'Examinar o significado da vida e mostrar que a verdadeira satisfação só pode ser encontrada em Deus.',
    overview: 'Eclesiastes apresenta a busca do Pregador por significado na vida. Após examinar riqueza, prazer, sabedoria e trabalho, ele conclui que tudo é vaidade sem Deus. O livro desafia visões superficiais sobre sucesso e felicidade.',
    keyVerses: [
      'Vaidade de vaidades, diz o Pregador, vaidade de vaidades! Tudo é vaidade (1:2)',
      'Teme a Deus e guarda os seus mandamentos; porque isto é o dever de todo homem (12:13)'
    ],
    mainCharacters: [
      'O Pregador (Salomão)'
    ],
    historicalContext: 'Escrito provavelmente no final da vida de Salomão, refletindo sobre suas experiências.',
    theologicalSignificance: 'Demonstra a futilidade de buscar satisfação fora de Deus e a necessidade de uma perspectiva eterna.',
    practicalApplication: 'Ajuda a desenvolver uma visão realista da vida e encontrar propósito em Deus em meio às frustrações.',
    outline: [
      'Introdução: Tudo é Vaidade (1-11)',
      'Investigações do Pregador (1:12-6:12)',
      'Conselhos para Viver (7:1-12:8)',
      'Conclusão: Teme a Deus (12:9-14)'
    ]
  },
  'Ct': {
    name: 'Cânticos',
    author: 'Salomão',
    date: 'Aproximadamente 960 a.C.',
    category: 'Livros Poéticos',
    theme: 'Amor Divino e Humano',
    purpose: 'Celebrar o amor conjugal e ilustrar o amor entre Deus e Seu povo.',
    overview: 'Cântico dos Cânticos é um poema lírico que celebra o amor romântico entre um homem e uma mulher. Tradicionalmente interpretado também como uma alegoria do amor entre Deus e Seu povo ou Cristo e a Igreja.',
    keyVerses: [
      'Eu sou do meu amado, e ele é meu (6:3)',
      'O amor é forte como a morte (8:6)'
    ],
    mainCharacters: [
      'O Amado (Salomão)',
      'A Sulamita',
      'As Filhas de Jerusalém'
    ],
    historicalContext: 'Escrito durante o reinado de Salomão, período de paz e prosperidade em Israel.',
    theologicalSignificance: 'Afirma a santidade do amor conjugal e ilustra o amor apaixonado de Deus por Seu povo.',
    practicalApplication: 'Ensina sobre a beleza do amor conjugal e a profundidade do amor divino.',
    outline: [
      'Desejo Mútuo (1:1-2:7)',
      'Busca e Encontro (2:8-3:5)',
      'Celebração do Amor (3:6-5:1)',
      'Separação e Reunião (5:2-8:4)',
      'Poder do Amor (8:5-14)'
    ]
  },
  'Os': {
    name: 'Oséias',
    author: 'Oséias',
    date: 'Aproximadamente 750-722 a.C.',
    category: 'Profetas Menores',
    theme: 'Amor Fiel de Deus',
    purpose: 'Demonstrar o amor fiel de Deus por Seu povo infiel através da experiência pessoal do profeta.',
    overview: 'Através do casamento de Oséias com uma mulher infiel, o livro ilustra dramaticamente o amor persistente de Deus por Israel apesar de sua infidelidade espiritual. O profeta chama o povo ao arrependimento e promete restauração.',
    keyVerses: [
      'Conheceremos e prosseguiremos em conhecer ao Senhor (6:3)',
      'Porque eu quero misericórdia, e não sacrifício (6:6)'
    ],
    mainCharacters: [
      'Oséias',
      'Gômer',
      'Seus Filhos'
    ],
    historicalContext: 'Durante o declínio final do Reino do Norte antes da conquista assíria.',
    theologicalSignificance: 'Revela o amor incondicional de Deus e Sua disposição para restaurar Seu povo arrependido.',
    practicalApplication: 'Ensina sobre a fidelidade de Deus mesmo face à nossa infidelidade e a importância do arrependimento genuíno.',
    outline: [
      'O Casamento de Oséias (1-3)',
      'A Infidelidade de Israel (4-7)',
      'O Julgamento Vindouro (8-10)',
      'O Amor Restaurador de Deus (11-14)'
    ]
  },
  'Jl': {
    name: 'Joel',
    author: 'Joel',
    date: 'Possivelmente 835-796 a.C.',
    category: 'Profetas Menores',
    theme: 'Dia do Senhor',
    purpose: 'Chamar Judá ao arrependimento e anunciar o futuro derramamento do Espírito.',
    overview: 'Joel usa uma praga de gafanhotos como metáfora para o julgamento divino e chama o povo ao arrependimento. O livro também contém importantes profecias sobre o derramamento do Espírito Santo e o Dia do Senhor.',
    keyVerses: [
      'Derramarei o meu Espírito sobre toda a carne (2:28)',
      'Rasgai o vosso coração, e não as vossas vestes (2:13)'
    ],
    mainCharacters: [
      'Joel'
    ],
    historicalContext: 'Escrito possivelmente durante o reinado de Joás em Judá.',
    theologicalSignificance: 'Conecta calamidades naturais com julgamento divino e profetiza o derramamento do Espírito Santo.',
    practicalApplication: 'Ensina sobre a importância do arrependimento genuíno e a esperança na restauração divina.',
    outline: [
      'A Praga de Gafanhotos (1)',
      'O Dia do Senhor (2:1-17)',
      'Promessa de Restauração (2:18-32)',
      'Julgamento das Nações (3)'
    ]
  },
  'Am': {
    name: 'Amós',
    author: 'Amós',
    date: 'Aproximadamente 760-750 a.C.',
    category: 'Profetas Menores',
    theme: 'Justiça Social',
    purpose: 'Denunciar a injustiça social e chamar Israel ao verdadeiro arrependimento.',
    overview: 'Amós, um pastor de Tecoa, denuncia a injustiça social, a opressão dos pobres e a hipocrisia religiosa em Israel. O livro enfatiza que a verdadeira adoração deve ser acompanhada de justiça social.',
    keyVerses: [
      'Corra, porém, o juízo como as águas, e a justiça como o ribeiro perene (5:24)',
      'Buscai o Senhor e vivei (5:6)'
    ],
    mainCharacters: [
      'Amós',
      'Amazias'
    ],
    historicalContext: 'Durante um período de prosperidade material mas decadência moral em Israel.',
    theologicalSignificance: 'Estabelece a conexão entre adoração verdadeira e justiça social.',
    practicalApplication: 'Desafia a complacência espiritual e chama à prática da justiça social.',
    outline: [
      'Julgamentos sobre as Nações (1-2)',
      'Mensagens a Israel (3-6)',
      'Cinco Visões (7:1-9:10)',
      'Promessa de Restauração (9:11-15)'
    ]
  },
  'Ob': {
    name: 'Obadias',
    author: 'Obadias',
    date: 'Aproximadamente 586 a.C.',
    category: 'Profetas Menores',
    theme: 'Julgamento de Edom',
    purpose: 'Profetizar o julgamento de Edom por sua crueldade contra Judá.',
    overview: 'O menor livro do Antigo Testamento denuncia Edom por sua violência contra Judá e profetiza seu julgamento. O livro termina com a promessa da restauração de Israel.',
    keyVerses: [
      'Por causa da violência feita a teu irmão Jacó, cobrir-te-á a vergonha (1:10)',
      'O reino será do Senhor (1:21)'
    ],
    mainCharacters: [
      'Obadias'
    ],
    historicalContext: 'Provavelmente após a queda de Jerusalém, quando Edom se alegrou com sua destruição.',
    theologicalSignificance: 'Demonstra que Deus julga aqueles que se alegram com o sofrimento de outros.',
    practicalApplication: 'Adverte contra o orgulho e a alegria com o mal alheio.',
    outline: [
      'Julgamento de Edom (1-14)',
      'O Dia do Senhor (15-21)'
    ]
  },
  'Jn': {
    name: 'Jonas',
    author: 'Desconhecido (tradicionalmente atribuído a Jonas)',
    date: 'Aproximadamente 780-760 a.C.',
    category: 'Profetas Menores',
    theme: 'Misericórdia Universal de Deus',
    purpose: 'Demonstrar que a misericórdia de Deus se estende a todas as nações.',
    overview: 'Jonas narra a história de um profeta relutante que tenta fugir de sua missão de pregar a Nínive. Através de suas experiências, o livro revela o amor e a misericórdia de Deus para com todas as pessoas.',
    keyVerses: [
      'A salvação vem do Senhor (2:9)',
      'Não hei de eu ter compaixão da grande cidade de Nínive? (4:11)'
    ],
    mainCharacters: [
      'Jonas',
      'Os Marinheiros',
      'O Povo de Nínive'
    ],
    historicalContext: 'Durante o período de expansão assíria, quando Nínive era uma grande cidade.',
    theologicalSignificance: 'Revela o amor universal de Deus e Sua vontade de perdoar todos que se arrependem.',
    practicalApplication: 'Ensina sobre obediência, arrependimento e a amplitude da misericórdia divina.',
    outline: [
      'A Fuga de Jonas (1)',
      'A Oração de Jonas (2)',
      'A Pregação em Nínive (3)',
      'A Lição de Jonas (4)'
    ]
  },
  'Mq': {
    name: 'Miquéias',
    author: 'Miquéias',
    date: 'Aproximadamente 735-700 a.C.',
    category: 'Profetas Menores',
    theme: 'Justiça e Misericórdia',
    purpose: 'Denunciar a injustiça social e anunciar tanto o julgamento quanto a esperança futura.',
    overview: 'Miquéias alterna entre mensagens de julgamento e esperança, denunciando a injustiça social e a corrupção religiosa enquanto profetiza sobre o Messias vindouro e o reino futuro.',
    keyVerses: [
      'Ele te declarou, ó homem, o que é bom; e que é o que o Senhor pede de ti, senão que pratiques a justiça, e ames a misericórdia, e andes humildemente com o teu Deus? (6:8)',
      'E tu, Belém Efrata... de ti me sairá o que será Senhor em Israel (5:2)'
    ],
    mainCharacters: [
      'Miquéias'
    ],
    historicalContext: 'Durante os reinados de Jotão, Acaz e Ezequias em Judá.',
    theologicalSignificance: 'Enfatiza a importância da justiça social e profetiza sobre o Messias.',
    practicalApplication: 'Chama os crentes a praticarem justiça, misericórdia e humildade.',
    outline: [
      'Julgamento sobre Samaria e Judá (1-3)',
      'Promessa de Restauração (4-5)',
      'Controvérsia do Senhor (6)',
      'Confiança em Deus (7)'
    ]
  },
  'Na': {
    name: 'Naum',
    author: 'Naum',
    date: 'Aproximadamente 663-612 a.C.',
    category: 'Profetas Menores',
    theme: 'Julgamento de Nínive',
    purpose: 'Profetizar a destruição de Nínive e consolar Judá.',
    overview: 'Naum profetiza a destruição de Nínive, a capital da Assíria, demonstrando que Deus julga aqueles que oprimem Seu povo. O livro serve como consolo para Judá, que sofria sob a dominação assíria.',
    keyVerses: [
      'O Senhor é bom, uma fortaleza no dia da angústia, e conhece os que confiam nele (1:7)',
      'Eis sobre os montes os pés do que traz boas novas, que anuncia a paz! (1:15)'
    ],
    mainCharacters: [
      'Naum'
    ],
    historicalContext: 'Período entre a queda de Tebas (663 a.C.) e a queda de Nínive (612 a.C.).',
    theologicalSignificance: 'Demonstra a justiça de Deus contra a opressão e Sua fidelidade às Suas promessas.',
    practicalApplication: 'Encoraja a confiar na justiça de Deus mesmo em tempos de opressão.',
    outline: [
      'A Majestade de Deus (1)',
      'A Queda de Nínive Predita (2)',
      'O Julgamento Final de Nínive (3)'
    ]
  },
  'Hc': {
    name: 'Habacuque',
    author: 'Habacuque',
    date: 'Aproximadamente 609-605 a.C.',
    category: 'Profetas Menores',
    theme: 'Fé em Tempos de Dúvida',
    purpose: 'Questionar os caminhos de Deus e aprender a confiar nEle mesmo sem entender.',
    overview: 'Habacuque dialoga com Deus sobre a injustiça em Judá e o uso dos babilônios como instrumento de julgamento. O livro termina com uma expressão de fé inabalável em Deus.',
    keyVerses: [
      'O justo viverá pela sua fé (2:4)',
      'Ainda que a figueira não floresça... eu me alegrarei no Senhor (3:17-18)'
    ],
    mainCharacters: [
      'Habacuque'
    ],
    historicalContext: 'Pouco antes da primeira invasão babilônica de Judá.',
    theologicalSignificance: 'Demonstra como lidar com dúvidas sobre a justiça divina e manter a fé em tempos difíceis.',
    practicalApplication: 'Ensina a confiar em Deus mesmo quando Seus caminhos parecem incompreensíveis.',
    outline: [
      'Primeira Queixa e Resposta (1:1-11)',
      'Segunda Queixa e Resposta (1:12-2:20)',
      'Oração de Louvor (3)'
    ]
  },
  'Sf': {
    name: 'Sofonias',
    author: 'Sofonias',
    date: 'Aproximadamente 640-609 a.C.',
    category: 'Profetas Menores',
    theme: 'O Dia do Senhor',
    purpose: 'Advertir sobre o julgamento vindouro e chamar ao arrependimento.',
    overview: 'Sofonias profetiza sobre o Dia do Senhor, um tempo de julgamento seguido de restauração. Ele adverte Judá e as nações vizinhas, mas também oferece esperança de restauração para o remanescente fiel.',
    keyVerses: [
      'O grande dia do Senhor está perto (1:14)',
      'Buscai o Senhor... buscai a justiça, buscai a mansidão (2:3)'
    ],
    mainCharacters: [
      'Sofonias'
    ],
    historicalContext: 'Durante o reinado de Josias em Judá, antes da reforma religiosa.',
    theologicalSignificance: 'Demonstra que o julgamento divino é universal, mas a misericórdia está disponível para os que se arrependem.',
    practicalApplication: 'Encoraja o arrependimento genuíno e a busca por Deus em tempos de apostasia.',
    outline: [
      'O Dia do Julgamento (1)',
      'Chamado ao Arrependimento (2)',
      'Promessa de Restauração (3)'
    ]
  },
  'Ag': {
    name: 'Ageu',
    author: 'Ageu',
    date: '520 a.C.',
    category: 'Profetas Menores',
    theme: 'Reconstrução do Templo',
    purpose: 'Motivar o povo a reconstruir o templo e restabelecer a adoração adequada.',
    overview: 'Ageu encoraja os judeus que retornaram do exílio a reconstruírem o templo, conectando a prosperidade material com a fidelidade espiritual. Suas mensagens resultaram na retomada e conclusão da obra do templo.',
    keyVerses: [
      'Considerai os vossos caminhos (1:5)',
      'A glória desta última casa será maior do que a da primeira (2:9)'
    ],
    mainCharacters: [
      'Ageu',
      'Zorobabel',
      'Josué'
    ],
    historicalContext: 'Período pós-exílio, quando o templo estava em ruínas e o povo estava desanimado.',
    theologicalSignificance: 'Enfatiza a importância da adoração adequada e a presença de Deus entre Seu povo.',
    practicalApplication: 'Ensina sobre prioridades espirituais e a importância de colocar Deus em primeiro lugar.',
    outline: [
      'Chamado para Reconstruir (1)',
      'Encorajamento e Promessa (2:1-9)',
      'Bênção Após Obediência (2:10-23)'
    ]
  },
  'Zc': {
    name: 'Zacarias',
    author: 'Zacarias',
    date: '520-518 a.C.',
    category: 'Profetas Menores',
    theme: 'Restauração e Esperança Messiânica',
    purpose: 'Encorajar a reconstrução do templo e profetizar sobre o Messias.',
    overview: 'Através de visões apocalípticas e profecias messiânicas, Zacarias encoraja o povo a reconstruir o templo e olhar para o futuro glorioso que Deus tem preparado. O livro contém numerosas profecias sobre o Messias.',
    keyVerses: [
      'Não por força nem por poder, mas pelo meu Espírito, diz o Senhor dos Exércitos (4:6)',
      'Eis que o teu rei virá a ti... humilde, e montado sobre um jumento (9:9)'
    ],
    mainCharacters: [
      'Zacarias',
      'Josué',
      'Zorobabel'
    ],
    historicalContext: 'Período pós-exílio, durante a reconstrução do templo.',
    theologicalSignificance: 'Fornece profecias detalhadas sobre o Messias e o futuro do povo de Deus.',
    practicalApplication: 'Encoraja a esperança em Deus e a fidelidade em tempos difíceis.',
    outline: [
      'Oito Visões Noturnas (1-6)',
      'Questão Sobre o Jejum (7-8)',
      'Profecias Messiânicas (9-14)'
    ]
  },
  'Ml': {
    name: 'Malaquias',
    author: 'Malaquias',
    date: 'Aproximadamente 430 a.C.',
    category: 'Profetas Menores',
    theme: 'Fidelidade a Deus',
    purpose: 'Chamar o povo de volta à fidelidade a Deus e preparar para a vinda do Messias.',
    overview: 'Malaquias confronta o povo por sua infidelidade em adoração, dízimos e casamentos. Ele profetiza sobre a vinda do mensageiro que preparará o caminho para o Messias.',
    keyVerses: [
      'Eu vos amei, diz o Senhor (1:2)',
      'Eis que eu envio o meu mensageiro, que preparará o caminho diante de mim (3:1)'
    ],
    mainCharacters: [
      'Malaquias'
    ],
    historicalContext: 'Período pós-exílio, após a reconstrução do templo, quando o povo havia se tornado negligente em sua adoração.',
    theologicalSignificance: 'Enfatiza a importância da adoração sincera e profetiza sobre a vinda do Messias.',
    practicalApplication: 'Chama à fidelidade nos dízimos, na adoração e nos relacionamentos.',
    outline: [
      'O Amor de Deus por Israel (1:1-5)',
      'Repreensões aos Sacerdotes (1:6-2:9)',
      'Repreensões ao Povo (2:10-3:15)',
      'Promessa de Bênção e Julgamento (3:16-4:6)'
    ]
  },
  'Mc': {
    name: 'Marcos',
    author: 'João Marcos',
    date: 'Aproximadamente 55-65 d.C.',
    category: 'Evangelhos',
    theme: 'Jesus como Servo Sofredor',
    purpose: 'Apresentar Jesus como o Servo de Deus em ação, enfatizando Seus milagres e ministério.',
    overview: 'Marcos é o evangelho mais curto e dinâmico, focando nas ações de Jesus mais do que em Seus discursos. O livro enfatiza o serviço e sacrifício de Jesus, apresentando-O como o Servo Sofredor que veio para dar Sua vida em resgate de muitos.',
    keyVerses: [
      'Porque o Filho do Homem não veio para ser servido, mas para servir e dar a sua vida em resgate de muitos (10:45)',
      'Se alguém quiser vir após mim, negue-se a si mesmo, tome a sua cruz e siga-me (8:34)'
    ],
    mainCharacters: [
      'Jesus Cristo',
      'Os Doze Apóstolos',
      'João Batista',
      'Pilatos'
    ],
    historicalContext: 'Escrito principalmente para gentios, especialmente romanos, durante o período de perseguição aos cristãos.',
    theologicalSignificance: 'Apresenta Jesus como o Servo Sofredor profetizado em Isaías, enfatizando Sua autoridade através de ações poderosas.',
    practicalApplication: 'Ensina sobre discipulado, serviço abnegado e a importância de seguir a Jesus mesmo em face do sofrimento.',
    outline: [
      'Preparação para o Ministério (1:1-13)',
      'Ministério na Galileia (1:14-8:30)',
      'Caminho para a Cruz (8:31-10:52)',
      'Última Semana em Jerusalém (11-16)'
    ]
  },
  'Lc': {
    name: 'Lucas',
    author: 'Lucas',
    date: 'Aproximadamente 60-62 d.C.',
    category: 'Evangelhos',
    theme: 'Jesus como o Salvador Universal',
    purpose: 'Apresentar um relato histórico ordenado da vida de Jesus, enfatizando Sua humanidade e universalidade.',
    overview: 'Lucas, o único autor gentio do Novo Testamento, apresenta Jesus como o Salvador de toda a humanidade. O evangelho enfatiza o amor de Jesus pelos marginalizados, incluindo mulheres, pobres e pecadores. Contém muitas parábolas únicas e destaca a importância da oração.',
    keyVerses: [
      'Porque o Filho do Homem veio buscar e salvar o que estava perdido (19:10)',
      'Hoje vos nasceu, na cidade de Davi, o Salvador, que é Cristo, o Senhor (2:11)'
    ],
    mainCharacters: [
      'Jesus Cristo',
      'Maria',
      'Os Doze Apóstolos',
      'Zacarias e Isabel',
      'Maria Madalena'
    ],
    historicalContext: 'Escrito para Teófilo e outros gentios cultos, apresentando Jesus no contexto do Império Romano.',
    theologicalSignificance: 'Enfatiza a universalidade da salvação, o papel do Espírito Santo, e o lugar especial dos marginalizados no Reino de Deus.',
    practicalApplication: 'Demonstra o amor de Deus por todos os povos e a importância da compaixão pelos marginalizados.',
    outline: [
      'Nascimento e Infância de Jesus (1-2)',
      'Preparação para o Ministério (3-4:13)',
      'Ministério na Galileia (4:14-9:50)',
      'Jornada para Jerusalém (9:51-19:27)',
      'Última Semana e Ressurreição (19:28-24)'
    ]
  },
  'At': {
    name: 'Atos',
    author: 'Lucas',
    date: 'Aproximadamente 62-63 d.C.',
    category: 'Livro Histórico',
    theme: 'O Crescimento da Igreja Primitiva',
    purpose: 'Registrar a expansão da igreja primitiva através do poder do Espírito Santo, de Jerusalém até Roma.',
    overview: 'Atos narra a história da igreja primitiva após a ascensão de Jesus, mostrando como o evangelho se espalhou de Jerusalém para todo o mundo romano. O livro enfatiza o papel do Espírito Santo e a transformação de vidas através do evangelho.',
    keyVerses: [
      'Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas... até aos confins da terra (1:8)',
      'E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações (2:42)'
    ],
    mainCharacters: [
      'Pedro',
      'Paulo',
      'Barnabé',
      'Estêvão',
      'Filipe',
      'Tiago'
    ],
    historicalContext: 'Período de aproximadamente 30 anos após a ressurreição de Jesus, durante a expansão inicial do cristianismo no Império Romano.',
    theologicalSignificance: 'Demonstra o cumprimento da promessa de Jesus de edificar Sua igreja e o papel vital do Espírito Santo na missão cristã.',
    practicalApplication: 'Ensina sobre evangelismo, discipulado, plantação de igrejas e como enfrentar perseguição.',
    outline: [
      'A Igreja em Jerusalém (1-7)',
      'A Igreja na Judeia e Samaria (8-12)',
      'As Viagens Missionárias de Paulo (13-21)',
      'Paulo em Jerusalém e Roma (22-28)'
    ]
  },
  'Rm': {
    name: 'Romanos',
    author: 'Paulo',
    date: 'Aproximadamente 57 d.C.',
    category: 'Cartas Paulinas',
    theme: 'O Evangelho da Justiça de Deus',
    purpose: 'Apresentar uma exposição sistemática do evangelho e suas implicações para a vida cristã.',
    overview: 'Romanos é a exposição mais completa do evangelho no Novo Testamento. Paulo explica como a justiça de Deus é revelada através da fé em Cristo, abordando temas como pecado, justificação, santificação, eleição e vida cristã prática.',
    keyVerses: [
      'Porque não me envergonho do evangelho, pois é o poder de Deus para salvação de todo aquele que crê (1:16)',
      'Porque todos pecaram e destituídos estão da glória de Deus (3:23)',
      'O salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus (6:23)'
    ],
    mainCharacters: [
      'Paulo',
      'Abraão (como exemplo)',
      'Adão (como exemplo)'
    ],
    historicalContext: 'Escrita durante a terceira viagem missionária de Paulo, quando ele planejava visitar Roma.',
    theologicalSignificance: 'Apresenta as doutrinas fundamentais do cristianismo, incluindo justificação pela fé, santificação, e o papel de Israel no plano de Deus.',
    practicalApplication: 'Ensina como viver pela fé, superar o pecado, e servir a Deus em comunidade.',
    outline: [
      'Introdução e Tema (1:1-17)',
      'Condenação: Necessidade da Justiça (1:18-3:20)',
      'Justificação: Imputação da Justiça (3:21-5:21)',
      'Santificação: Transformação (6-8)',
      'Eleição: Israel e os Gentios (9-11)',
      'Aplicação: Vida Cristã Prática (12-16)'
    ]
  },
  '1Co': {
    name: '1 Coríntios',
    author: 'Paulo',
    date: 'Aproximadamente 55 d.C.',
    category: 'Cartas Paulinas',
    theme: 'Ordem na Igreja',
    purpose: 'Abordar problemas práticos e doutrinários na igreja de Corinto.',
    overview: '1 Coríntios trata de vários problemas na igreja, incluindo divisões, imoralidade, questões sobre casamento, adoração, dons espirituais e ressurreição. Paulo enfatiza a sabedoria de Deus versus a sabedoria do mundo.',
    keyVerses: [
      'Porque a palavra da cruz é loucura para os que perecem, mas para nós, que somos salvos, é o poder de Deus (1:18)',
      'O amor é paciente, é benigno... (13:4-8)',
      'Mas graças a Deus, que nos dá a vitória por nosso Senhor Jesus Cristo (15:57)'
    ],
    mainCharacters: [
      'Paulo',
      'Apolo',
      'Cefas (Pedro)'
    ],
    historicalContext: 'Escrita para uma igreja urbana enfrentando desafios morais e doutrinários em uma cidade conhecida por sua imoralidade.',
    theologicalSignificance: 'Aborda questões práticas da vida cristã e eclesiástica, estabelecendo princípios para a ordem na igreja.',
    practicalApplication: 'Oferece orientação para lidar com conflitos na igreja, moralidade, relacionamentos e adoração.',
    outline: [
      'Introdução e Divisões na Igreja (1-4)',
      'Problemas Morais e Legais (5-6)',
      'Casamento e Liberdade Cristã (7-10)',
      'Ordem no Culto e Dons (11-14)',
      'A Ressurreição (15)',
      'Conclusão (16)'
    ]
  },
  '2Co': {
    name: '2 Coríntios',
    author: 'Paulo',
    date: 'Aproximadamente 56 d.C.',
    category: 'Cartas Paulinas',
    theme: 'Ministério no Novo Pacto',
    purpose: 'Defender o ministério apostólico de Paulo e encorajar a reconciliação com a igreja de Corinto.',
    overview: '2 Coríntios é a carta mais pessoal e emocional de Paulo, onde ele defende seu ministério contra falsos apóstolos e compartilha profundamente sobre as alegrias e tribulações do serviço cristão.',
    keyVerses: [
      'Porque a nossa leve e momentânea tribulação produz para nós um peso eterno de glória (4:17)',
      'Se alguém está em Cristo, é nova criatura (5:17)',
      'A minha graça te basta, porque o poder se aperfeiçoa na fraqueza (12:9)'
    ],
    mainCharacters: [
      'Paulo',
      'Tito',
      'Falsos Apóstolos'
    ],
    historicalContext: 'Escrita após um período de tensão entre Paulo e a igreja de Corinto.',
    theologicalSignificance: 'Explora a natureza do ministério cristão, sofrimento, e a suficiência da graça de Deus.',
    practicalApplication: 'Ensina sobre integridade no ministério, perseverança nas tribulações e o poder de Deus na fraqueza humana.',
    outline: [
      'Explicação do Ministério de Paulo (1-7)',
      'A Coleta para Jerusalém (8-9)',
      'Defesa do Apostolado (10-13)'
    ]
  },
  'Gl': {
    name: 'Gálatas',
    author: 'Paulo',
    date: 'Aproximadamente 49 d.C.',
    category: 'Cartas Paulinas',
    theme: 'Liberdade em Cristo',
    purpose: 'Defender o evangelho da graça contra o legalismo e estabelecer a verdadeira liberdade cristã.',
    overview: 'Gálatas é uma defesa apaixonada do evangelho da graça contra aqueles que insistiam que os gentios deviam seguir a lei mosaica. Paulo argumenta que a salvação é pela fé somente, e que a verdadeira liberdade cristã não leva à licenciosidade.',
    keyVerses: [
      'Já estou crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim (2:20)',
      'Para a liberdade foi que Cristo nos libertou (5:1)'
    ],
    mainCharacters: [
      'Paulo',
      'Pedro',
      'Falsos Mestres'
    ],
    historicalContext: 'Escrita para igrejas na Galácia que estavam sendo influenciadas por judaizantes.',
    theologicalSignificance: 'Estabelece a doutrina da justificação pela fé e a natureza da verdadeira liberdade cristã.',
    practicalApplication: 'Ensina como viver em liberdade sem cair no legalismo ou na licenciosidade.',
    outline: [
      'Defesa do Apostolado de Paulo (1-2)',
      'Defesa da Justificação pela Fé (3-4)',
      'Exortação à Vida no Espírito (5-6)'
    ]
  },
  'Ef': {
    name: 'Efésios',
    author: 'Paulo',
    date: 'Aproximadamente 60-62 d.C.',
    category: 'Cartas Paulinas',
    theme: 'A Igreja em Cristo',
    purpose: 'Revelar o mistério da igreja e sua unidade em Cristo.',
    overview: 'Efésios apresenta o plano eterno de Deus para unir todas as coisas em Cristo, com ênfase especial na igreja como Seu corpo. A carta move-se da teologia profunda para aplicações práticas na vida cristã.',
    keyVerses: [
      'Porque pela graça sois salvos, por meio da fé... não vem de vós, é dom de Deus (2:8-9)',
      'Há um só corpo e um só Espírito... um só Senhor, uma só fé, um só batismo (4:4-5)'
    ],
    mainCharacters: [
      'Paulo'
    ],
    historicalContext: 'Escrita durante o primeiro aprisionamento de Paulo em Roma.',
    theologicalSignificance: 'Apresenta doutrinas fundamentais sobre a igreja, salvação, unidade cristã e guerra espiritual.',
    practicalApplication: 'Ensina sobre identidade em Cristo, unidade na igreja, relacionamentos e batalha espiritual.',
    outline: [
      'Posição do Crente em Cristo (1-3)',
      'Prática do Crente na Vida (4-6)'
    ]
  },
  'Fp': {
    name: 'Filipenses',
    author: 'Paulo',
    date: 'Aproximadamente 61 d.C.',
    category: 'Cartas Paulinas',
    theme: 'Alegria em Cristo',
    purpose: 'Expressar gratidão, encorajar a perseverança e promover a unidade na igreja.',
    overview: 'Filipenses é uma carta calorosa de amizade e encorajamento, escrita da prisão. Paulo enfatiza a alegria em Cristo apesar das circunstâncias e exorta à unidade e humildade.',
    keyVerses: [
      'Para mim o viver é Cristo, e o morrer é lucro (1:21)',
      'Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos (4:4)',
      'Posso todas as coisas naquele que me fortalece (4:13)'
    ],
    mainCharacters: [
      'Paulo',
      'Timóteo',
      'Epafrodito'
    ],
    historicalContext: 'Escrita durante o primeiro aprisionamento de Paulo em Roma para uma igreja que o apoiava fielmente.',
    theologicalSignificance: 'Demonstra como a fé em Cristo pode produzir alegria mesmo em circunstâncias adversas.',
    practicalApplication: 'Ensina sobre alegria cristã, humildade, contentamento e perseverança na fé.',
    outline: [
      'Circunstâncias de Paulo (1)',
      'Chamado à Unidade e Humildade (2)',
      'Advertências e Exortações (3)',
      'Agradecimentos e Conclusão (4)'
    ]
  },
  'Cl': {
    name: 'Colossenses',
    author: 'Paulo',
    date: 'Aproximadamente 60-62 d.C.',
    category: 'Cartas Paulinas',
    theme: 'A Supremacia de Cristo',
    purpose: 'Combater heresias e estabelecer a supremacia e suficiência de Cristo.',
    overview: 'Colossenses enfatiza a divindade e supremacia de Cristo contra falsas filosofias e práticas religiosas. Paulo demonstra que Cristo é suficiente para todas as necessidades espirituais dos crentes.',
    keyVerses: [
      'Porque nele habita corporalmente toda a plenitude da divindade (2:9)',
      'Se, pois, fostes ressuscitados com Cristo, buscai as coisas que são de cima (3:1)'
    ],
    mainCharacters: [
      'Paulo',
      'Epafras',
      'Tíquico'
    ],
    historicalContext: 'Escrita durante o primeiro aprisionamento de Paulo em Roma para combater heresias em Colossos.',
    theologicalSignificance: 'Estabelece a divindade de Cristo e Sua suficiência para a vida cristã.',
    practicalApplication: 'Ensina a centralidade de Cristo em todas as áreas da vida e como viver em santidade.',
    outline: [
      'Supremacia de Cristo (1-2)',
      'Vida Nova em Cristo (3-4)'
    ]
  },
  '1Ts': {
    name: '1 Tessalonicenses',
    author: 'Paulo',
    date: 'Aproximadamente 51 d.C.',
    category: 'Cartas Paulinas',
    theme: 'Esperança na Volta de Cristo',
    purpose: 'Encorajar os novos crentes e esclarecer questões sobre a volta de Cristo.',
    overview: '1 Tessalonicenses é uma carta pastoral que elogia a fé dos tessalonicenses, oferece instruções práticas para a vida cristã e esclarece questões sobre a segunda vinda de Cristo.',
    keyVerses: [
      'Porque o próprio Senhor descerá do céu com alarido... e os mortos em Cristo ressuscitarão primeiro (4:16)',
      'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco (5:18)'
    ],
    mainCharacters: [
      'Paulo',
      'Silas',
      'Timóteo'
    ],
    historicalContext: 'Escrita para uma igreja jovem enfrentando perseguição e preocupada com questões escatológicas.',
    theologicalSignificance: 'Fornece ensinamentos fundamentais sobre a segunda vinda de Cristo e a vida cristã.',
    practicalApplication: 'Ensina sobre santificação, trabalho, relacionamentos e esperança na volta de Cristo.',
    outline: [
      'Gratidão pela Fé dos Tessalonicenses (1)',
      'Defesa do Ministério de Paulo (2-3)',
      'Instruções para a Vida Cristã (4)',
      'A Volta do Senhor (5)'
    ]
  },
  '2Ts': {
    name: '2 Tessalonicenses',
    author: 'Paulo',
    date: 'Aproximadamente 51-52 d.C.',
    category: 'Cartas Paulinas',
    theme: 'Esclarecimentos sobre a Volta de Cristo',
    purpose: 'Corrigir mal-entendidos sobre a volta de Cristo e encorajar a perseverança.',
    overview: '2 Tessalonicenses esclarece questões sobre a segunda vinda de Cristo, adverte contra a ociosidade e encoraja a firmeza na fé face à perseguição.',
    keyVerses: [
      'Que nosso Senhor Jesus Cristo... console os vossos corações e vos confirme em toda boa obra e palavra (2:16-17)',
      'Se alguém não quer trabalhar, também não coma (3:10)'
    ],
    mainCharacters: [
      'Paulo',
      'Silas',
      'Timóteo'
    ],
    historicalContext: 'Escrita pouco depois de 1 Tessalonicenses para abordar novas preocupações na igreja.',
    theologicalSignificance: 'Fornece detalhes importantes sobre eventos que precederão a volta de Cristo.',
    practicalApplication: 'Ensina sobre a importância do trabalho, perseverança na perseguição e discernimento.',
    outline: [
      'Encorajamento na Perseguição (1)',
      'O Dia do Senhor (2)',
      'Exortações Práticas (3)'
    ]
  },
  '1Tm': {
    name: '1 Timóteo',
    author: 'Paulo',
    date: 'Aproximadamente 62-64 d.C.',
    category: 'Cartas Paulinas (Pastorais)',
    theme: 'Ordem na Igreja',
    purpose: 'Instruir Timóteo sobre a administração da igreja e o combate às falsas doutrinas.',
    overview: '1 Timóteo fornece diretrizes para a organização da igreja, qualificações para líderes, e instruções sobre como lidar com falsos mestres. Paulo também oferece conselhos pessoais a Timóteo sobre seu ministério.',
    keyVerses: [
      'Para que saibas como convém andar na casa de Deus, que é a igreja do Deus vivo (3:15)',
      'Ninguém despreze a tua mocidade, mas sê o exemplo dos fiéis (4:12)'
    ],
    mainCharacters: [
      'Paulo',
      'Timóteo'
    ],
    historicalContext: 'Escrita após o primeiro aprisionamento de Paulo, quando Timóteo liderava a igreja em Éfeso.',
    theologicalSignificance: 'Estabelece padrões para liderança na igreja e a importância da sã doutrina.',
    practicalApplication: 'Oferece orientação sobre administração da igreja, liderança pastoral e vida piedosa.',
    outline: [
      'Advertência contra Falsas Doutrinas (1)',
      'Instruções para a Igreja (2-3)',
      'Instruções para Timóteo (4)',
      'Relacionamentos na Igreja (5-6)'
    ]
  },
  '2Tm': {
    name: '2 Timóteo',
    author: 'Paulo',
    date: 'Aproximadamente 66-67 d.C.',
    category: 'Cartas Paulinas (Pastorais)',
    theme: 'Fidelidade no Ministério',
    purpose: 'Encorajar Timóteo a permanecer fiel ao evangelho e dar instruções finais.',
    overview: '2 Timóteo é o último escrito de Paulo, uma carta pessoal e comovente a seu filho na fé. Paulo encoraja Timóteo a permanecer fiel em meio à perseguição e a guardar o evangelho puro.',
    keyVerses: [
      'Toda Escritura é divinamente inspirada e proveitosa (3:16)',
      'Combati o bom combate, acabei a carreira, guardei a fé (4:7)'
    ],
    mainCharacters: [
      'Paulo',
      'Timóteo'
    ],
    historicalContext: 'Escrita durante o segundo aprisionamento de Paulo em Roma, pouco antes de seu martírio.',
    theologicalSignificance: 'Enfatiza a importância da fidelidade doutrinária e a transmissão do evangelho.',
    practicalApplication: 'Ensina sobre perseverança no ministério, mentoria espiritual e fidelidade à Palavra.',
    outline: [
      'Encorajamento à Fidelidade (1)',
      'Exortação ao Serviço Fiel (2)',
      'Advertências sobre os Últimos Dias (3)',
      'Últimas Instruções (4)'
    ]
  },
  'Tt': {
    name: 'Tito',
    author: 'Paulo',
    date: 'Aproximadamente 63-65 d.C.',
    category: 'Cartas Paulinas (Pastorais)',
    theme: 'Ordem e Boas Obras',
    purpose: 'Instruir Tito sobre a organização da igreja em Creta e o ensino da sã doutrina.',
    overview: 'Tito recebe instruções sobre como estabelecer a igreja em Creta, incluindo a nomeação de líderes e o ensino de diferentes grupos. Paulo enfatiza que a sã doutrina deve resultar em boas obras.',
    keyVerses: [
      'Para que ponhas em boa ordem as coisas que ainda restam (1:5)',
      'A graça de Deus se manifestou, trazendo salvação a todos os homens (2:11)'
    ],
    mainCharacters: [
      'Paulo',
      'Tito'
    ],
    historicalContext: 'Escrita para Tito, que supervisionava as igrejas na ilha de Creta.',
    theologicalSignificance: 'Conecta doutrina sólida com vida piedosa e boas obras.',
    practicalApplication: 'Ensina sobre liderança na igreja, vida cristã prática e a relação entre fé e obras.',
    outline: [
      'Qualificações para Líderes (1)',
      'Ensino para Diferentes Grupos (2)',
      'Vida Cristã na Sociedade (3)'
    ]
  },
  'Fm': {
    name: 'Filemom',
    author: 'Paulo',
    date: 'Aproximadamente 60-62 d.C.',
    category: 'Cartas Paulinas',
    theme: 'Reconciliação e Perdão',
    purpose: 'Interceder por Onésimo, um escravo convertido, junto a seu senhor Filemom.',
    overview: 'Filemom é uma carta pessoal onde Paulo intercede por Onésimo, um escravo fugitivo que se converteu através de seu ministério. A carta demonstra como o evangelho transforma relacionamentos sociais.',
    keyVerses: [
      'Se me tens por companheiro, recebe-o como a mim mesmo (1:17)',
      'Sim, irmão, eu receba de ti algum proveito no Senhor (1:20)'
    ],
    mainCharacters: [
      'Paulo',
      'Filemom',
      'Onésimo'
    ],
    historicalContext: 'Escrita durante o primeiro aprisionamento de Paulo em Roma, quando Onésimo se converteu.',
    theologicalSignificance: 'Ilustra princípios de perdão, reconciliação e como o evangelho transforma relações sociais.',
    practicalApplication: 'Ensina sobre perdão, reconciliação e como o amor cristão supera barreiras sociais.',
    outline: [
      'Saudação (1-3)',
      'Gratidão por Filemom (4-7)',
      'Apelo por Onésimo (8-21)',
      'Conclusão (22-25)'
    ]
  },
  'Hb': {
    name: 'Hebreus',
    author: 'Desconhecido',
    date: 'Aproximadamente 65-69 d.C.',
    category: 'Cartas Gerais',
    theme: 'A Supremacia de Cristo',
    purpose: 'Demonstrar a superioridade de Cristo e da Nova Aliança sobre o sistema do Antigo Testamento.',
    overview: 'Hebreus apresenta Cristo como o cumprimento e a realidade de todas as figuras e instituições do Antigo Testamento. O livro alterna entre exposições doutrinárias e exortações práticas.',
    keyVerses: [
      'Jesus Cristo é o mesmo, ontem, e hoje, e eternamente (13:8)',
      'Olhando para Jesus, autor e consumador da fé (12:2)'
    ],
    mainCharacters: [
      'Jesus Cristo',
      'Melquisedeque',
      'Personagens do AT como exemplos'
    ],
    historicalContext: 'Escrito para cristãos judeus tentados a voltar ao judaísmo devido à perseguição.',
    theologicalSignificance: 'Estabelece a supremacia de Cristo e a superioridade da Nova Aliança.',
    practicalApplication: 'Encoraja a perseverança na fé e demonstra como Cristo cumpre todas as necessidades espirituais.',
    outline: [
      'Superioridade da Pessoa de Cristo (1-4)',
      'Superioridade do Sacerdócio de Cristo (5-10)',
      'Exortação à Fé e Perseverança (11-13)'
    ]
  },
  'Tg': {
    name: 'Tiago',
    author: 'Tiago (irmão de Jesus)',
    date: 'Aproximadamente 45-49 d.C.',
    category: 'Cartas Gerais',
    theme: 'Fé Prática',
    purpose: 'Ensinar como a verdadeira fé se manifesta em obras práticas.',
    overview: 'Tiago enfatiza que a fé genuína deve ser demonstrada através de ações práticas. O livro aborda temas como provações, favoritismo, controle da língua, sabedoria e oração.',
    keyVerses: [
      'A fé sem obras é morta (2:26)',
      'Sede praticantes da palavra e não somente ouvintes (1:22)'
    ],
    mainCharacters: [
      'Tiago'
    ],
    historicalContext: 'Escrito para cristãos judeus dispersos, possivelmente o primeiro livro do NT a ser escrito.',
    theologicalSignificance: 'Demonstra a relação essencial entre fé e obras na vida cristã.',
    practicalApplication: 'Ensina como viver a fé no dia a dia através de ações concretas.',
    outline: [
      'Fé e Provações (1)',
      'Fé e Obras (2)',
      'Fé e Palavras (3)',
      'Fé e Relacionamentos (4)',
      'Fé e Paciência (5)'
    ]
  },
  '1Pe': {
    name: '1 Pedro',
    author: 'Pedro',
    date: 'Aproximadamente 64 d.C.',
    category: 'Cartas Gerais',
    theme: 'Esperança no Sofrimento',
    purpose: 'Encorajar cristãos que enfrentam perseguição e ensinar como viver em uma sociedade hostil.',
    overview: '1 Pedro encoraja cristãos que enfrentam perseguição, lembrando-os de sua identidade em Cristo e ensinando como viver de maneira santa em meio a uma sociedade pagã.',
    keyVerses: [
      'Mas vós sois a geração eleita, o sacerdócio real (2:9)',
      'Estai sempre preparados para responder com mansidão e temor (3:15)'
    ],
    mainCharacters: [
      'Pedro'
    ],
    historicalContext: 'Escrito durante o início da perseguição sob Nero para cristãos dispersos no império.',
    theologicalSignificance: 'Ensina sobre a identidade cristã e como viver santamente em meio à perseguição.',
    practicalApplication: 'Oferece orientação para enfrentar sofrimento e viver como testemunhas de Cristo.',
    outline: [
      'Salvação e Vida Santa (1)',
      'Vida na Comunidade (2)',
      'Sofrimento e Testemunho (3-4)',
      'Liderança e Humildade (5)'
    ]
  },
  '2Pe': {
    name: '2 Pedro',
    author: 'Pedro',
    date: 'Aproximadamente 66-67 d.C.',
    category: 'Cartas Gerais',
    theme: 'Crescimento na Graça e Conhecimento',
    purpose: 'Advertir contra falsos mestres e encorajar o crescimento espiritual.',
    overview: '2 Pedro adverte contra falsos mestres e escarnecedores, enfatiza a certeza da volta de Cristo e encoraja o crescimento no conhecimento de Cristo.',
    keyVerses: [
      'Crescei na graça e no conhecimento de nosso Senhor (3:18)',
      'Nenhuma profecia da Escritura é de particular interpretação (1:20)'
    ],
    mainCharacters: [
      'Pedro'
    ],
    historicalContext: 'Escrito próximo à morte de Pedro, quando falsos mestres ameaçavam a igreja.',
    theologicalSignificance: 'Enfatiza a importância da verdade bíblica e a certeza do retorno de Cristo.',
    practicalApplication: 'Ensina como crescer espiritualmente e discernir falsos ensinos.',
    outline: [
      'Chamado ao Crescimento Espiritual (1)',
      'Advertência contra Falsos Mestres (2)',
      'Certeza da Volta de Cristo (3)'
    ]
  },
  '1Jo': {
    name: '1 João',
    author: 'João',
    date: 'Aproximadamente 85-95 d.C.',
    category: 'Cartas Gerais',
    theme: 'Comunhão com Deus',
    purpose: 'Combater falsos ensinos e assegurar os crentes de sua salvação.',
    overview: '1 João enfatiza as marcas da verdadeira fé: amor a Deus, amor aos irmãos e obediência aos mandamentos. O livro combate heresias sobre a pessoa de Cristo e oferece testes para discernir a verdadeira fé.',
    keyVerses: [
      'Deus é amor (4:8)',
      'Estas coisas vos escrevi para que saibais que tendes a vida eterna (5:13)'
    ],
    mainCharacters: [
      'João'
    ],
    historicalContext: 'Escrito quando heresias gnósticas começavam a ameaçar a igreja.',
    theologicalSignificance: 'Estabelece testes da verdadeira fé e enfatiza a encarnação de Cristo.',
    practicalApplication: 'Ensina como discernir a verdadeira fé e viver em comunhão com Deus.',
    outline: [
      'Deus é Luz (1-2)',
      'Deus é Justo (3)',
      'Deus é Amor (4)',
      'A Vitória da Fé (5)'
    ]
  },
  '2Jo': {
    name: '2 João',
    author: 'João',
    date: 'Aproximadamente 85-95 d.C.',
    category: 'Cartas Gerais',
    theme: 'Verdade e Amor',
    purpose: 'Advertir contra falsos mestres e encorajar a hospitalidade cristã apropriada.',
    overview: '2 João é uma breve carta que enfatiza a importância de andar na verdade e no amor, enquanto adverte contra falsos mestres e ensina discernimento na hospitalidade cristã.',
    keyVerses: [
      'Andemos em amor (1:6)',
      'Se alguém vem ter convosco e não traz esta doutrina, não o recebais em casa (1:10)'
    ],
    mainCharacters: [
      'João',
      'A Senhora Eleita e seus filhos'
    ],
    historicalContext: 'Escrito em um período quando mestres itinerantes espalhavam tanto a verdade quanto heresias.',
    theologicalSignificance: 'Demonstra a relação entre verdade e amor, e a importância do discernimento.',
    practicalApplication: 'Ensina como equilibrar amor cristão com discernimento doutrinário.',
    outline: [
      'Saudação (1-3)',
      'Andar na Verdade e Amor (4-6)',
      'Advertência contra Falsos Mestres (7-11)',
      'Conclusão (12-13)'
    ]
  },
  '3Jo': {
    name: '3 João',
    author: 'João',
    date: 'Aproximadamente 85-95 d.C.',
    category: 'Cartas Gerais',
    theme: 'Hospitalidade Cristã',
    purpose: 'Elogiar Gaio por sua hospitalidade e advertir contra o exemplo negativo de Diótrefes.',
    overview: '3 João trata da hospitalidade cristã, elogiando Gaio por seu apoio aos mestres itinerantes e advertindo contra Diótrefes, que rejeitava a autoridade apostólica.',
    keyVerses: [
      'Não tenho maior gozo do que este: o de ouvir que meus filhos andam na verdade (1:4)',
      'Amado, não imites o mal, mas o bem (1:11)'
    ],
    mainCharacters: [
      'João',
      'Gaio',
      'Diótrefes',
      'Demétrio'
    ],
    historicalContext: 'Escrito em um contexto de tensões sobre autoridade na igreja local.',
    theologicalSignificance: 'Ilustra a importância da hospitalidade cristã e liderança servil.',
    practicalApplication: 'Ensina sobre hospitalidade, serviço e como lidar com conflitos na igreja.',
    outline: [
      'Elogio a Gaio (1-8)',
      'Repreensão a Diótrefes (9-10)',
      'Recomendação de Demétrio (11-12)',
      'Conclusão (13-15)'
    ]
  },
  'Jd': {
    name: 'Judas',
    author: 'Judas (irmão de Jesus)',
    date: 'Aproximadamente 65-70 d.C.',
    category: 'Cartas Gerais',
    theme: 'Combate à Apostasia',
    purpose: 'Advertir contra falsos mestres e encorajar a defender a fé.',
    overview: 'Judas escreve uma advertência urgente contra falsos mestres que haviam se infiltrado na igreja. Ele encoraja os crentes a contender pela fé e permanecer firmes em Deus.',
    keyVerses: [
      'Amados, combatendo diligentemente pela fé que uma vez foi entregue aos santos (1:3)',
      'Conservai-vos no amor de Deus (1:21)'
    ],
    mainCharacters: [
      'Judas',
      'Falsos Mestres'
    ],
    historicalContext: 'Escrito quando falsos mestres ameaçavam corromper a igreja com imoralidade e falsa doutrina.',
    theologicalSignificance: 'Demonstra a importância de defender a verdade e resistir à apostasia.',
    practicalApplication: 'Ensina como defender a fé e manter-se fiel em tempos de apostasia.',
    outline: [
      'Saudação (1-2)',
      'Motivo da Carta (3-4)',
      'Exemplos de Juízo (5-16)',
      'Exortações aos Crentes (17-23)',
      'Doxologia (24-25)'
    ]
  },
  'Ap': {
    name: 'Apocalipse',
    author: 'João',
    date: 'Aproximadamente 95 d.C.',
    category: 'Profecia',
    theme: 'A Vitória Final de Cristo',
    purpose: 'Revelar o plano soberano de Deus para o fim dos tempos e encorajar a igreja perseguida.',
    overview: 'Apocalipse usa linguagem simbólica e visões para revelar a soberania de Deus sobre a história e a vitória final de Cristo. O livro encoraja a igreja perseguida e revela eventos futuros, culminando na nova criação.',
    keyVerses: [
      'Eu sou o Alfa e o Ômega, o princípio e o fim, diz o Senhor (1:8)',
      'Eis que faço novas todas as coisas (21:5)',
      'Certamente venho sem demora. Amém! Ora, vem, Senhor Jesus! (22:20)'
    ],
    mainCharacters: [
      'Jesus Cristo',
      'João',
      'As Sete Igrejas da Ásia',
      'O Cordeiro',
      'A Besta',
      'A Noiva do Cordeiro'
    ],
    historicalContext: 'Escrito durante a perseguição sob Domiciano, quando a igreja enfrentava pressão para adorar o imperador.',
    theologicalSignificance: 'Revela a soberania de Deus sobre a história, a vitória final de Cristo e o destino eterno dos crentes.',
    practicalApplication: 'Encoraja a fidelidade em meio à perseguição e mantém o foco na esperança eterna.',
    outline: [
      'Visão de Cristo Glorificado (1)',
      'Mensagens às Sete Igrejas (2-3)',
      'Visões do Céu (4-5)',
      'Os Sete Selos (6-8:1)',
      'As Sete Trombetas (8:2-11)',
      'Conflito Espiritual (12-14)',
      'As Sete Taças (15-16)',
      'Queda da Babilônia (17-18)',
      'Retorno de Cristo e Juízo Final (19-20)',
      'Nova Jerusalém (21-22)'
    ]
  }
  // ... Outros livros serão adicionados posteriormente
};

// Função auxiliar para obter a descrição de um livro
export const getBookDescription = (abbrev: string): BookDescription | null => {
  return bookDescriptions[abbrev] || null;
}; 