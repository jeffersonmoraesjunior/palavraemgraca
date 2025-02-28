/**
 * Banco de dados local de versículos bíblicos categorizados por sentimentos
 * Isso elimina a necessidade de fazer chamadas à API para obter versículos
 */

export interface Verse {
  text: string;
  reference: string;
  categories: string[];
}

// Categorias de sentimentos
export const FEELING_CATEGORIES = {
  ANXIETY: ['ansioso', 'ansiosa', 'ansiedade', 'preocupado', 'preocupada', 'medo', 'nervoso', 'nervosa', 'tenso', 'tensa', 'aflito', 'aflita', 'angústia'],
  SADNESS: ['triste', 'tristeza', 'deprimido', 'deprimida', 'depressão', 'melancolia', 'melancólico', 'melancólica', 'desanimado', 'desanimada', 'dor', 'sofrimento', 'luto'],
  ANGER: ['raiva', 'irritado', 'irritada', 'frustrado', 'frustrada', 'bravo', 'brava', 'indignado', 'indignada', 'ódio', 'ressentimento', 'amargo', 'amarga'],
  JOY: ['feliz', 'felicidade', 'alegre', 'alegria', 'contente', 'satisfeito', 'satisfeita', 'realizado', 'realizada', 'jubiloso', 'jubilosa', 'animado', 'animada'],
  GRATITUDE: ['grato', 'grata', 'gratidão', 'agradecido', 'agradecida', 'abençoado', 'abençoada', 'reconhecido', 'reconhecida', 'agraciado', 'agraciada'],
  CONFUSION: ['confuso', 'confusa', 'perdido', 'perdida', 'indeciso', 'indecisa', 'dúvida', 'incerto', 'incerta', 'desorientado', 'desorientada', 'perplexo', 'perplexa'],
  HOPE: ['esperança', 'esperançoso', 'esperançosa', 'otimista', 'confiante', 'fé', 'expectativa', 'positivo', 'positiva', 'promessa', 'futuro'],
  LOVE: ['amor', 'amoroso', 'amorosa', 'apaixonado', 'apaixonada', 'carinho', 'carinhoso', 'carinhosa', 'afeto', 'afetuoso', 'afetuosa', 'compaixão'],
  LONELINESS: ['sozinho', 'sozinha', 'solidão', 'abandonado', 'abandonada', 'isolado', 'isolada', 'rejeitado', 'rejeitada', 'excluído', 'excluída', 'solitário', 'solitária'],
  FAITH_CRISIS: ['crise', 'fé', 'dúvida', 'espiritual', 'distante', 'deus', 'afastado', 'afastada', 'questionamento', 'descrença', 'incerteza', 'espiritual'],
  GENERAL: ['geral', 'cotidiano', 'dia a dia', 'rotina', 'vida', 'comum', 'normal']
};

// Banco de dados de versículos
export const VERSES_DATABASE: Verse[] = [
  // Versículos para ANSIEDADE
  {
    text: "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.",
    reference: "Filipenses 4:6-7",
    categories: ["ANXIETY"]
  },
  {
    text: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    reference: "1 Pedro 5:7",
    categories: ["ANXIETY"]
  },
  {
    text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.",
    reference: "Isaías 41:10",
    categories: ["ANXIETY", "FEAR"]
  },
  {
    text: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    reference: "Mateus 11:28",
    categories: ["ANXIETY", "SADNESS"]
  },
  
  // Versículos para TRISTEZA
  {
    text: "Bem-aventurados os que choram, porque serão consolados.",
    reference: "Mateus 5:4",
    categories: ["SADNESS"]
  },
  {
    text: "O Senhor está perto dos que têm o coração quebrantado e salva os de espírito abatido.",
    reference: "Salmos 34:18",
    categories: ["SADNESS"]
  },
  {
    text: "Ele enxugará dos seus olhos toda lágrima; e não haverá mais morte, nem haverá mais pranto, nem lamento, nem dor; porque já as primeiras coisas são passadas.",
    reference: "Apocalipse 21:4",
    categories: ["SADNESS", "HOPE"]
  },
  
  // Versículos para RAIVA
  {
    text: "Irai-vos e não pequeis; não se ponha o sol sobre a vossa ira.",
    reference: "Efésios 4:26",
    categories: ["ANGER"]
  },
  {
    text: "Sabei isto, meus amados irmãos: Todo homem seja pronto para ouvir, tardio para falar, tardio para se irar. Porque a ira do homem não produz a justiça de Deus.",
    reference: "Tiago 1:19-20",
    categories: ["ANGER"]
  },
  {
    text: "Deixa a ira, abandona o furor; não te impacientes; isso só leva ao mal.",
    reference: "Salmos 37:8",
    categories: ["ANGER"]
  },
  
  // Versículos para ALEGRIA
  {
    text: "Alegrai-vos sempre no Senhor; outra vez digo: alegrai-vos.",
    reference: "Filipenses 4:4",
    categories: ["JOY"]
  },
  {
    text: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.",
    reference: "Salmos 118:24",
    categories: ["JOY", "GRATITUDE"]
  },
  {
    text: "A alegria do Senhor é a vossa força.",
    reference: "Neemias 8:10",
    categories: ["JOY"]
  },
  
  // Versículos para GRATIDÃO
  {
    text: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    reference: "1 Tessalonicenses 5:18",
    categories: ["GRATITUDE"]
  },
  {
    text: "Entrai pelas suas portas com ações de graças e nos seus átrios, com hinos de louvor; rendei-lhe graças e bendizei-lhe o nome.",
    reference: "Salmos 100:4",
    categories: ["GRATITUDE", "JOY"]
  },
  
  // Versículos para CONFUSÃO
  {
    text: "Se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e não censura, e ser-lhe-á dada.",
    reference: "Tiago 1:5",
    categories: ["CONFUSION"]
  },
  {
    text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    reference: "Provérbios 3:5-6",
    categories: ["CONFUSION", "FAITH_CRISIS"]
  },
  
  // Versículos para ESPERANÇA
  {
    text: "Porque eu bem sei os planos que estou projetando para vós, diz o Senhor; planos de paz e não de mal, para vos dar um futuro e uma esperança.",
    reference: "Jeremias 29:11",
    categories: ["HOPE"]
  },
  {
    text: "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão e não se cansarão; andarão e não se fatigarão.",
    reference: "Isaías 40:31",
    categories: ["HOPE", "ANXIETY"]
  },
  {
    text: "E a esperança não traz confusão, porquanto o amor de Deus está derramado em nossos corações pelo Espírito Santo que nos foi dado.",
    reference: "Romanos 5:5",
    categories: ["HOPE", "LOVE"]
  },
  
  // Versículos para AMOR
  {
    text: "O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbece, não se conduz inconvenientemente, não procura os seus interesses, não se exaspera, não se ressente do mal; não se alegra com a injustiça, mas regozija-se com a verdade; tudo sofre, tudo crê, tudo espera, tudo suporta.",
    reference: "1 Coríntios 13:4-7",
    categories: ["LOVE"]
  },
  {
    text: "Nisto conhecemos o amor: que Cristo deu a sua vida por nós; e devemos dar nossa vida pelos irmãos.",
    reference: "1 João 3:16",
    categories: ["LOVE"]
  },
  {
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    reference: "João 3:16",
    categories: ["LOVE", "HOPE"]
  },
  
  // Versículos para SOLIDÃO
  {
    text: "Não te deixarei, nem te desampararei.",
    reference: "Hebreus 13:5",
    categories: ["LONELINESS"]
  },
  {
    text: "Quando passares pelas águas, eu serei contigo; quando, pelos rios, eles não te submergirão; quando passares pelo fogo, não te queimarás, nem a chama arderá em ti.",
    reference: "Isaías 43:2",
    categories: ["LONELINESS", "ANXIETY"]
  },
  {
    text: "Eis que estou convosco todos os dias até à consumação do século.",
    reference: "Mateus 28:20",
    categories: ["LONELINESS"]
  },
  
  // Versículos para CRISE DE FÉ
  {
    text: "Disse-lhe Jesus: Porque me viste, creste? Bem-aventurados os que não viram e creram.",
    reference: "João 20:29",
    categories: ["FAITH_CRISIS"]
  },
  {
    text: "E Jesus lhes disse: Por causa da vossa pouca fé; porque em verdade vos digo que, se tiverdes fé como um grão de mostarda, direis a este monte: Passa daqui para acolá, e ele passará. Nada vos será impossível.",
    reference: "Mateus 17:20",
    categories: ["FAITH_CRISIS"]
  },
  {
    text: "Ora, a fé é a certeza de coisas que se esperam, a convicção de fatos que se não veem.",
    reference: "Hebreus 11:1",
    categories: ["FAITH_CRISIS", "HOPE"]
  },
  
  // Versículos GERAIS
  {
    text: "Tudo posso naquele que me fortalece.",
    reference: "Filipenses 4:13",
    categories: ["GENERAL", "HOPE"]
  },
  {
    text: "Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas lhes serão acrescentadas.",
    reference: "Mateus 6:33",
    categories: ["GENERAL"]
  },
  {
    text: "Porque eu, o Senhor, teu Deus, te seguro pela tua mão direita e te digo: Não temas, eu te ajudo.",
    reference: "Isaías 41:13",
    categories: ["GENERAL", "ANXIETY"]
  },
  {
    text: "O Senhor é o meu pastor; nada me faltará.",
    reference: "Salmos 23:1",
    categories: ["GENERAL", "HOPE"]
  }
];

// Citações de apoio de escritores cristãos
export interface Quote {
  text: string;
  author: string;
  categories: string[];
}

export const QUOTES_DATABASE: Quote[] = [
  {
    text: "Deus está sempre conosco em todos os momentos, mesmo quando não sentimos Sua presença.",
    author: "Max Lucado",
    categories: ["ANXIETY", "LONELINESS", "FAITH_CRISIS"]
  },
  {
    text: "A fé não elimina as perguntas. Mas a fé sabe onde levá-las.",
    author: "Timothy Keller",
    categories: ["FAITH_CRISIS", "CONFUSION"]
  },
  {
    text: "Deus sussurra em nossos prazeres, fala em nossa consciência, mas grita em nossas dores: é o seu megafone para despertar um mundo surdo.",
    author: "C.S. Lewis",
    categories: ["SADNESS", "PAIN"]
  },
  {
    text: "A oração não muda a Deus, mas muda quem ora.",
    author: "Søren Kierkegaard",
    categories: ["GENERAL", "FAITH_CRISIS"]
  },
  {
    text: "A alegria é a emoção mais séria do céu.",
    author: "C.S. Lewis",
    categories: ["JOY"]
  },
  {
    text: "Deus nunca disse que a jornada seria fácil, mas Ele disse que a chegada valeria a pena.",
    author: "Max Lucado",
    categories: ["HOPE", "SADNESS"]
  },
  {
    text: "A gratidão é a memória do coração.",
    author: "Jean Baptiste Massieu",
    categories: ["GRATITUDE"]
  },
  {
    text: "O amor é a arma mais poderosa que existe no mundo.",
    author: "Martin Luther King Jr.",
    categories: ["LOVE", "ANGER"]
  },
  {
    text: "Não é o quanto fazemos, mas quanto amor colocamos naquilo que fazemos. Não é o quanto damos, mas quanto amor colocamos em dar.",
    author: "Madre Teresa de Calcutá",
    categories: ["LOVE", "GENERAL"]
  },
  {
    text: "A paciência é a companheira da sabedoria.",
    author: "Santo Agostinho",
    categories: ["ANGER", "CONFUSION"]
  },
  {
    text: "A esperança é a âncora da alma, firme e segura.",
    author: "Billy Graham",
    categories: ["HOPE"]
  },
  {
    text: "Quando você não consegue entender o que Deus está fazendo, confie em quem Ele é.",
    author: "Rick Warren",
    categories: ["FAITH_CRISIS", "CONFUSION"]
  }
];

// Dicas práticas para diferentes categorias
export interface Tip {
  title: string;
  description: string;
  categories: string[];
}

export const TIPS_DATABASE: Tip[] = [
  {
    title: "Pratique a respiração consciente",
    description: "Reserve alguns minutos para respirar profundamente, concentrando-se apenas na sua respiração. Isso ajuda a acalmar a mente e reduzir a ansiedade.",
    categories: ["ANXIETY", "ANGER"]
  },
  {
    title: "Medite nas Escrituras",
    description: "Escolha um versículo que ressoe com você e medite nele durante o dia, permitindo que a verdade de Deus transforme seus pensamentos.",
    categories: ["GENERAL", "FAITH_CRISIS", "ANXIETY"]
  },
  {
    title: "Mantenha um diário de gratidão",
    description: "Anote diariamente três coisas pelas quais você é grato. Isso ajuda a mudar o foco dos problemas para as bênçãos.",
    categories: ["GRATITUDE", "SADNESS", "GENERAL"]
  },
  {
    title: "Busque comunhão",
    description: "Conecte-se com outros crentes através de um grupo pequeno ou ministério da igreja. O apoio comunitário é essencial para nossa jornada de fé.",
    categories: ["LONELINESS", "FAITH_CRISIS"]
  },
  {
    title: "Pratique o perdão",
    description: "Libere ressentimentos através do perdão, lembrando que fomos perdoados por Cristo. Isso liberta seu coração da amargura.",
    categories: ["ANGER", "GENERAL"]
  },
  {
    title: "Sirva aos outros",
    description: "Encontre maneiras de servir pessoas necessitadas. Ajudar os outros frequentemente nos ajuda a ganhar perspectiva sobre nossos próprios problemas.",
    categories: ["SADNESS", "GENERAL", "LONELINESS"]
  },
  {
    title: "Estabeleça limites saudáveis",
    description: "Aprenda a dizer não quando necessário e estabeleça limites claros em seus relacionamentos, honrando o templo que Deus lhe deu.",
    categories: ["ANXIETY", "GENERAL"]
  },
  {
    title: "Celebre pequenas vitórias",
    description: "Reconheça e celebre os pequenos progressos em sua vida, lembrando que Deus está trabalhando mesmo nas coisas pequenas.",
    categories: ["JOY", "HOPE", "GENERAL"]
  },
  {
    title: "Desconecte-se regularmente",
    description: "Reserve tempo para se desconectar da tecnologia e do ruído do mundo, criando espaço para ouvir a voz de Deus.",
    categories: ["ANXIETY", "CONFUSION", "GENERAL"]
  },
  {
    title: "Pratique a oração contínua",
    description: "Desenvolva o hábito de conversar com Deus ao longo do dia, não apenas em momentos designados de oração.",
    categories: ["GENERAL", "FAITH_CRISIS", "ANXIETY"]
  },
  {
    title: "Cuide do seu corpo",
    description: "Honre a Deus cuidando do seu templo através de exercícios regulares, alimentação saudável e descanso adequado.",
    categories: ["GENERAL", "SADNESS"]
  },
  {
    title: "Busque aconselhamento",
    description: "Não hesite em buscar ajuda profissional quando necessário, seja de um pastor, conselheiro cristão ou profissional de saúde mental.",
    categories: ["ANXIETY", "SADNESS", "FAITH_CRISIS"]
  }
];

/**
 * Detecta categorias de sentimentos no texto
 * @param text Texto para analisar
 * @returns Array de categorias detectadas
 */
export function detectFeelingCategories(text: string): string[] {
  const lowerText = text.toLowerCase();
  const categories: string[] = [];
  
  Object.entries(FEELING_CATEGORIES).forEach(([category, keywords]) => {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      categories.push(category);
    }
  });
  
  return categories.length > 0 ? categories : ['GENERAL'];
}

/**
 * Obtém um versículo aleatório do banco de dados
 * @returns Versículo com referência
 */
export function getRandomVerse(): string {
  const randomIndex = Math.floor(Math.random() * VERSES_DATABASE.length);
  const verse = VERSES_DATABASE[randomIndex];
  return `${verse.text} (${verse.reference})`;
}

/**
 * Obtém um versículo relevante para as categorias de sentimentos detectadas
 * @param categories Categorias de sentimentos
 * @returns Versículo com referência
 */
export function getVerseByCategories(categories: string[]): string {
  // Filtra versículos que correspondem a pelo menos uma categoria
  const matchingVerses = VERSES_DATABASE.filter(verse => 
    verse.categories.some(category => categories.includes(category))
  );
  
  // Se não encontrar correspondências, retorna um versículo aleatório
  if (matchingVerses.length === 0) {
    return getRandomVerse();
  }
  
  // Seleciona um versículo aleatório entre os correspondentes
  const randomIndex = Math.floor(Math.random() * matchingVerses.length);
  const verse = matchingVerses[randomIndex];
  
  return `${verse.text} (${verse.reference})`;
}

/**
 * Obtém uma citação relevante para as categorias de sentimentos detectadas
 * @param categories Categorias de sentimentos
 * @returns Citação com autor
 */
export function getQuoteByCategories(categories: string[]): string {
  // Filtra citações que correspondem a pelo menos uma categoria
  const matchingQuotes = QUOTES_DATABASE.filter(quote => 
    quote.categories.some(category => categories.includes(category))
  );
  
  // Se não encontrar correspondências, retorna uma citação aleatória
  if (matchingQuotes.length === 0) {
    const randomIndex = Math.floor(Math.random() * QUOTES_DATABASE.length);
    const quote = QUOTES_DATABASE[randomIndex];
    return `${quote.text} - ${quote.author}`;
  }
  
  // Seleciona uma citação aleatória entre as correspondentes
  const randomIndex = Math.floor(Math.random() * matchingQuotes.length);
  const quote = matchingQuotes[randomIndex];
  
  return `${quote.text} - ${quote.author}`;
}

/**
 * Obtém dicas relevantes para as categorias de sentimentos detectadas
 * @param categories Categorias de sentimentos
 * @param count Número de dicas a retornar
 * @returns Array de dicas
 */
export function getTipsByCategories(categories: string[], count: number = 3): string[] {
  // Filtra dicas que correspondem a pelo menos uma categoria
  const matchingTips = TIPS_DATABASE.filter(tip => 
    tip.categories.some(category => categories.includes(category))
  );
  
  // Se não encontrar correspondências suficientes, inclui dicas gerais
  if (matchingTips.length < count) {
    const generalTips = TIPS_DATABASE.filter(tip => 
      tip.categories.includes('GENERAL')
    );
    
    // Combina as dicas específicas com as gerais, evitando duplicatas
    const combinedTips = [...matchingTips];
    for (const tip of generalTips) {
      if (!combinedTips.includes(tip) && combinedTips.length < count) {
        combinedTips.push(tip);
      }
    }
    
    // Se ainda não tiver dicas suficientes, adiciona dicas aleatórias
    while (combinedTips.length < count) {
      const randomIndex = Math.floor(Math.random() * TIPS_DATABASE.length);
      const randomTip = TIPS_DATABASE[randomIndex];
      if (!combinedTips.includes(randomTip)) {
        combinedTips.push(randomTip);
      }
    }
    
    // Formata as dicas
    return combinedTips.slice(0, count).map(tip => `${tip.title}: ${tip.description}`);
  }
  
  // Embaralha as dicas correspondentes e seleciona o número solicitado
  const shuffledTips = [...matchingTips].sort(() => Math.random() - 0.5);
  return shuffledTips.slice(0, count).map(tip => `${tip.title}: ${tip.description}`);
} 