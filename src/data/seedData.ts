import { Article, CategorySpec, Comment } from '../types';

export const CATEGORIES: CategorySpec[] = [
  { id: '1', name: 'Silvio Santos', slug: 'silvio-santos', color: 'bg-amber-600 text-white' },
  { id: '2', name: 'SBT', slug: 'sbt', color: 'bg-indigo-600 text-white' },
  { id: '3', name: 'Globo', slug: 'globo', color: 'bg-sky-600 text-white' },
  { id: '4', name: 'Record', slug: 'record', color: 'bg-red-600 text-white' },
  { id: '5', name: 'Band', slug: 'band', color: 'bg-emerald-600 text-white' },
  { id: '6', name: 'Nostalgia', slug: 'nostalgia', color: 'bg-fuchsia-600 text-white' },
  { id: '7', name: 'Anos 80', slug: 'anos-80', color: 'bg-teal-600 text-white' },
  { id: '8', name: 'Anos 90', slug: 'anos-90', color: 'bg-pink-600 text-white' },
  { id: '9', name: 'Anos 2000', slug: 'anos-2000', color: 'bg-cyan-600 text-white' },
  { id: '10', name: 'Programas Antigos', slug: 'programas-antigos', color: 'bg-violet-600 text-white' },
  { id: '11', name: 'Por Onde Anda?', slug: 'por-onde-anda', color: 'bg-purple-600 text-white' },
  { id: '12', name: 'Curiosidades', slug: 'curiosidades', color: 'bg-yellow-600 text-black' },
  { id: '13', name: 'Celebridades', slug: 'celebridades', color: 'bg-rose-500 text-white' },
  { id: '14', name: 'Novelas', slug: 'novelas', color: 'bg-blue-600 text-white' },
  { id: '15', name: 'Reality Shows', slug: 'reality-shows', color: 'bg-orange-600 text-white' },
  { id: '16', name: 'Futebol e TV', slug: 'futebol-tv', color: 'bg-lime-600 text-black' },
  { id: '17', name: 'Últimas Notícias', slug: 'ultimas-noticias', color: 'bg-neutral-800 text-white' },
  { id: '18', name: 'Memórias da TV', slug: 'memorias-da-tv', color: 'bg-blue-900 text-white' },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: '15-curiosidades-sobre-silvio-santos-que-poucos-conhecem',
    title: '15 curiosidades sobre Silvio Santos que poucos conhecem',
    excerpt: 'Da infância humilde como camelô no Rio de Janeiro aos segredos de camarim e hábitos diários do maior comunicador da história da TV brasileira.',
    content: `Silvio Santos (Senor Abravanel) é, sem sombra de dúvidas, a maior lenda da televisão brasileira. Com mais de seis décadas de presença constante nos lares de milhões de compatriotas, ele moldou a cultura pop nacional. No entanto, por trás daquele sorriso inconfundível, do clássico microfone no paletó e dos aviõezinhos de dinheiro, existem fatos fascinantes e pouco divulgados que ajudam a contar a história do mestre da comunicação.

Aqui apresentamos 15 fatos curiosos e marcantes de sua trajetória que poucos conhecem detalhadamente:

### 1. Camelô com Diploma Científico
Senor Abravanel começou a trabalhar como camelô aos 14 anos nas ruas do Rio de Janeiro para ajudar no orçamento doméstico. Contudo, pouca gente sabe que ele possui formação escolar de técnico em contabilidade, concluída na Escola Técnica de Comércio Amaro Cavalcanti.

### 2. A Origem do Nome "Silvio Santos"
A mãe de Senor Abravanel, Rebecca, o chamava desde a infância de "Silvio". O sobrenome "Santos" surgiu quando ele resolveu participar de concursos de calouros nas rádios cariocas. Ele usava o pseudônimo para evitar que os diretores das rádios descobrissem que ele já havia vencido competições consecutivas com outros nomes. "Silvio porque minha mãe chamava e Santos porque os santos me ajudariam", dizia ele.

### 3. Recordista de Tempo de Tela
Silvio já figurou no Guinness Book como o apresentador de TV com o programa mais duradouro no ar no mesmo horário do mundo, mantendo o "Programa Silvio Santos" há mais de 50 anos em exibição contínua aos domingos.

### 4. O Microfone Preso à Gravata
Aquele icônico microfone de peito que Silvio usou por décadas foi desenhado especialmente para ele. Silvio não suportava segurar microfones com fio no início da TV, e preferia ter as mãos livres para gesticular e interagir com o "auditório mais feminino do Brasil". O modelo virou sua marca registrada incomparável.

### 5. Ele foi Paraquedista do Exército
Aos 18 anos, Silvio serviu à Escola de Pára-quedistas do Exército Brasileiro, no bairro de Deodoro, recebendo elogios pela disciplina e pelo espírito de liderança. Nas folgas, ele continuava animando eventos e servindo como locutor amador na rádio do quartel.

### 6. Alérgico a Perfumes e Odores Fortes
Silvio possui uma rinite alérgica severa que o proibia de usar perfumes, desodorantes com spray ou colônias fortes. Sabendo disso, todas as caravanas que iam assistir ao seu programa eram orientadas estritamente a não usar perfumes marcantes.

### 7. Amigo Éntimo de Seus Rivais
Apesar da disputa acirrada pela audiência de domingo contra a Rede Globo e a Record, Silvio sempre cultivou boas amizades com executivos concorrentes. Ele era profundamente respeitoso com Boni (José Bonifácio de Oliveira Sobrinho), lendário diretor da Globo, a quem chegou a pedir conselhos em momentos críticos de sua emissora.

### 8. Dono da Marca de Cosméticos Jequiti
Inspirado por gigantes internacionais de vendas diretas e estimulado pelas suas famosas telespectadoras, Silvio criou a marca de cosméticos Jequiti no ano de 2006. Hoje, a marca possui uma rede nacional impressionante com mais de 250 mil consultores ativos.

### 9. A Criação do Chaves no SBT
A vinda da série "Chaves" (El Chavo del Ocho) para o Brasil foi uma aposta pessoal e isolada de Silvio Santos em meados dos anos 80. O departamento de programação do SBT achava a produção mexicana "pobre e sem atrativos técnicos", mas Silvio bateu o pé, manteve o show e criou o maior clássico infantil da história da TV brasileira.

### 10. Ele Jamais Dá Entrevistas Formais
Silvio raramente deu entrevistas para a imprensa em sua vida. Ele acreditava em uma lenda contada por uma cigana em Miami, segundo a qual ele morreria em curto espaço de tempo caso desse entrevista ou protagonizasse um documentário biográfico sobre si mesmo diante de câmeras estranhas.

### 11. O Terno Sempre Confeccionado pelo Mesmo Alfaiate
Durante mais de quarenta anos, todos os ternos impecáveis usados por Silvio Santos no palco foram produzidos sob medida pelo alfaiate Camargo, um de seus profissionais mais queridos e respeitados de São Paulo.

### 12. Hábitos de Alimentação Simples
Embora acumulara uma fortuna imensa que o classificou na lista de bilionários da revista Forbes, Silvio era homem de hábitos simples. Sua comida favorita sempre foi arroz, feijão, bife e salada, ou simplesmente torradas com queijo e um copo de café com leite ao final da tarde.

### 13. O Seqüestro em 2001
Em agosto de 2001, Silvio protagonizou um dos momentos mais tensos da segurança pública do país. Após sua filha Patrícia Abravanel sofrer um sequestro, o próprio Silvio foi feito refém em sua residência no Morumbi pelo mesmo criminoso. O desfecho só ocorreu após a intervenção direta do então governador de São Paulo, Geraldo Alckmin.

### 14. O Amor Invisível pelos Cachorros
Na intimidade de sua mansão, Silvio era apaixonado por cães. Ele chegou a criar mais de dez cachorros de diferentes raças simultaneamente, cuidando pessoalmente da ração de cada um deles todas as manhãs.

### 15. Quase Candidato à Presidência da República
No ano de 1989, na primeira eleição presidencial pós-ditadura militar, Silvio Santos tentou lançar candidatura pelo partido PMB. Ele liderou as pesquisas de intenção de voto instantaneamente, mas sua candidatura foi impugnada pelo Tribunal Superior Eleitoral devido a irregularidades no registro partidário de última hora.`,
    image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=600'
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=FqI9L5jA0rU',
    author: 'Renato Marinho',
    date: '2026-06-10',
    category: 'Silvio Santos',
    tags: ['SBT', 'Sílvio Santos', 'Camelô', 'Televisão'],
    views: 12450,
    readTime: '6 min',
    isDraft: false,
    isFeatured: true,
    seoTitle: '15 Curiosidades que Ninguém Sabe de Silvio Santos | Memórias da TV',
    seoDescription: 'Descubra os segredos de bastidores, a juventude humilde e as curiosidades raras da vida de Silvio Santos, o maior ícone da TV do Brasil.',
    commentsCount: 12
  },
  {
    id: 'art-2',
    slug: 'voce-lembra-desta-assistente-de-palco-veja-como-esta-hoje',
    title: 'Você lembra desta assistente de palco? Veja como está hoje',
    excerpt: 'Sucesso absoluto nos programas de auditório dos anos 90, ela decidiu largar os holofotes e encontrou uma nova e bem-sucedida vocação.',
    content: `Nos anos 90, os programas de auditório dominavam os finais de semana da televisão brasileira. Atrações comandadas por nomes como Gugu Liberato, Faustão, Silvio Santos e Luciano Huck contavam com assistentes de palco que se tornavam celebridades instantâneas, requisitadas para capas de revistas, comerciais e desfiles por todo o país.

Uma das figuras mais carismáticas daquela era foi **Mariana Toledo**, conhecida como a assistente de destaque do programa "Domingo Legal". Com sua simpatia contagiante e presença marcante de palco, ela conquistou o coração dos brasileiros.

### O auge do sucesso nos anos 90

Mariana estreou no SBT aos 19 anos. Durante sete anos, ela fez parte dos momentos de maior audiência do canal, dividindo a tela com astros internacionais e participando de quadros históricos como a "Banheira do Gugu". No auge, recebia milhares de cartas de fãs semanalmente.

"Era uma loucura. Eu saía do palco direta para aeroportos, viajava o país inteiro fazendo presenças vip e desfiles. Não dava para andar na rua sem segurança", relembra Mariana, hoje com 48 anos.

### A decisão de sair da TV

Em 2002, quando o formato dos programas de auditório começou a passar por modificações estruturais, Mariana decidiu dar um freio na carreira artística. "Eu sentia que precisava buscar estabilidade interna e intelectual. O mundo da fama é muito efêmero e eu queria construir algo que dependesse apenas do meu esforço profissional puro", explica ela.

Mariana prestou vestibular de Psicologia e ingressou na faculdade de forma discreta, pedindo que professores e colegas evitassem focar em seu passado televisivo.

### Como ela está hoje?

Atualmente, Mariana Toledo reside em Curitiba (PR). Ela é uma psicóloga clínica renomada, especializada em Terapia Cognitivo-Comportamental (TCC) e com doutorado voltado para ansiedade e depressão em jovens adultos.

Ela mantém um consultório particular concorrido e ministra aulas em universidades de pós-graduação. Nas redes sociais, raramente publica fotos de sua época de televisão, preferindo focar em dicas de saúde mental, literatura e bem-estar geral.

"As pessoas que me encontram no consultório às vezes dizem que meu rosto é familiar, mas nem sempre associam com o SBT. Eu acho ótimo. Sinto muito orgulho do meu passado, mas sou imensamente realizada na minha clínica atual", conclui ela com um sorriso leve e maduro.`,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    author: 'Mariana Azevedo',
    date: '2026-06-09',
    category: 'Por Onde Anda?',
    tags: ['Anos 90', 'SBT', 'Assistente de Palco', 'Celebridades', 'Antes e Depois'],
    views: 8900,
    readTime: '4 min',
    isDraft: false,
    isFeatured: false,
    seoTitle: 'O Paradeiro da famosa assistente Mariana Toledo | Memórias da TV',
    seoDescription: 'Descubra como está hoje Mariana Toledo, que brilhou no SBT e agora atua como psicóloga de sucesso no Paraná.',
    commentsCount: 4
  },
  {
    id: 'art-3',
    slug: 'a-historia-do-show-do-milhao',
    title: 'A história do Show do Milhão: O clássico do SBT das noites de domingo',
    excerpt: 'Relembre como surgiu o programa de perguntas e respostas mais famoso do Brasil e o impacto cultural provocado pelas perguntas de Silvio Santos.',
    content: `No final dos anos 1990 e início dos anos 2000, um programa parou as famílias brasileiras na frente da televisão nas noites de quinta-feira e domingo: o **Show do Milhão**. 

Apresentado com genialidade incomparável por Silvio Santos, o "Jogo do Milhão" (seu nome inicial) revolucionou a disputa de prêmios por responder perguntas e gerou uma imensa febre nacional que envolvia softwares de computador, jogos de tabuleiro oficiais, revistas de perguntas nas bancas de jornal e dezenas de imitações por outras emissoras rádio-televisivas.

### A Origem do Show

O Show do Milhão estreou no SBT em novembro de 1999. O formato foi desenvolvido como uma variação inteligente de clássicos internacionais como "Who Wants to Be a Millionaire?", mas adaptado de maneira fantástica ao carisma popular de Silvio. 

O jogador participante enfrentava uma trilha de 16 perguntas de conhecimentos gerais divididas em três níveis: fácil (perguntas no valor de R$ 1 mil a R$ 5 mil), médio (R$ 10 mil a R$ 50 mil) e difícil (R$ 100 mil a R$ 500 mil). A pergunta final valia, finalmente, o mítico prêmio de R$ 1 milhão de reais.

### As Ajuda Inteligentes que Salvavam o Jogador

A mecânica era apimentada pelas clássicas opções de auxílio:
*   **Os Universitários:** Três estudantes de faculdades eminentes davam seus palpites sobre as alternativas corretas.
*   **As Placas:** O público presente no auditório erguia placas com os números correspondentes às alternativas de escolha.
*   **As Cartas:** O participante retirava cartas do baralho. Tirar o Rei eliminava uma alternativa incorreta, e o Ás eliminava três de uma só vez.
*   **Os Pulos:** O jogador podia saltar uma pergunta difícil até três vezes no decorrer do jogo.

### O Único Ganhador do Prêmio Máximo

Ao longo de centenas de episódios gravados nos estúdios da Via Anhanguera, apenas um único concorrente levou para casa o cheque gigante de R$ 1 milhão completando as 16 rodadas com precisão cirúrgica. 

Foi o baiano **Sidiney de Moraes**, no ano de 2003. Ele acertou a última pergunta sobre datas do nascimento de grandes líderes nacionais sem hesitar, tornando-se uma lenda folclórica instantânea da programação.

### Legado Cultural do Show do Milhão

A música tema de suspense, o relógio correndo na tela, o clássico sussurro de Silvio dizendo *"Posso perguntar?"*, e os bordões *"Está certo disso?"* alimentaram o imaginário de uma geração. O programa provou que a inteligência, a sorte e o conhecimento geral podiam mudar a vida de pessoas simples em uma fração de segundos.`,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    author: 'Renato Marinho',
    date: '2026-06-08',
    category: 'Programas Antigos',
    tags: ['SBT', 'Show do Milhão', 'Silvio Santos', 'Gameshow', 'Nostalgia'],
    views: 9400,
    readTime: '5 min',
    isDraft: false,
    isFeatured: false,
    seoTitle: 'Como surgiu o histórico Show do Milhão no SBT | Memórias da TV',
    seoDescription: 'Conheça os segredos por trás do Show do Milhão, as regras de ajuda dos universitários e quem levou o prêmio máximo para casa.',
    commentsCount: 9
  },
  {
    id: 'art-4',
    slug: 'os-maiores-momentos-da-televisao-brasileira',
    title: 'Os maiores momentos da televisão brasileira',
    excerpt: 'Dos festivais de MPB aos recordes mundiais de audiência e marcos técnicos do entretenimento televisivo nacional.',
    content: `A televisão brasileira é reconhecida globalmente por sua excelência técnica, criatividade extrema e forte intimidade com o cotidiano da nossa população. Desde a histórica inauguração da TV Tupi por Assis Chateaubriand em setembro de 1950, o telespectador brasileiro assistiu a eventos que paralisaram as maiores metrópoles, emocionaram multidões e ditaram tendências culturais de maneira estrondosa.

Neste artigo especial, compilamos os momentos considerados históricos e indeléveis da história das nossas antenas:

### 1. A Inauguração da TV Tupi (1950)
A menina Sônia Maria Dorce, vestida de índio, pronunciou diante das câmeras brutas da Tupi: *"Boa noite. Está no ar a televisão do Brasil!"*. O país iniciava ali uma trajetória que viraria paixão nacional absoluta superior a quase qualquer outra mídia.

### 2. O Festival de MPB da TV Record (1967)
O divisor de águas da música popular nacional foi transmitido ao vivo nos anos sessenta. A final dramática da Record consagrou "Ponteio" de Edu Lobo e gerou vaias colossais para Caetano Veloso e Gilberto Gil. Ninguém de nossa herança musical esquece a energia da plateia de teatro daquela época de ouro.

### 3. A Chegada da TV Colorida em Caxias do Sul (1972)
A primeira transmissão oficial a cores do Brasil ocorreu cobrindo a tradicional Festa da Uva, na serra gaúcha. O país via pela primeira vez as nuances de tons em tempo real, abandonando as telas em preto e branco e iniciando uma corrida comercial feroz de modernização de televisores nas salas de estar.

### 4. A Teatral Revelação de "Quem Matou Odete Roitman?" em Vale Tudo (1988)
A novela "Vale Tudo" comoveu o Brasil com o assassinato de sua vilã mais fria e sofisticada, a inesquecível Odete Roitman (Beatriz Segall). Foram semanas de suspense absoluto até a grande revelação de que Leila (Cássia Kis) havia efetuado os disparos por engano. A audiência estimada superou os 85 pontos no Ibope em todo o país.

### 5. A Cobertura Solidária do Fim do Mamonas Assassinas (1996)
O trágico acidente aéreo que dizimou o amado grupo Mamonas Assassinas causou comoção sem paralelos. Domingo Legal e Domingão do Faustão alteraram totalmente suas grades dominicais para cobrir as cerimônias de luto nacionais com homenagens emocionantes que ainda hoje arrancam lágrimas de quem revive.`,
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=600',
    author: 'Claudio Antunes',
    date: '2026-06-07',
    category: 'Memórias da TV',
    tags: ['Antigos', 'História da TV', 'Festivais', 'Novelas', 'Rede Globo', 'TV Tupi'],
    views: 15600,
    readTime: '7 min',
    isDraft: false,
    isFeatured: true,
    seoTitle: 'Os 5 Principais Momentos Históricos da TV | Memórias da TV',
    seoDescription: 'Relembre os momentos que marcaram a história da TV brasileira, desde a Tupi colorida aos recordes de audiência das novelas.',
    commentsCount: 22
  },
  {
    id: 'art-5',
    slug: 'quem-viveu-os-anos-90-vai-lembrar-disso',
    title: 'Quem viveu os anos 90 vai lembrar disso: Relíquias das tardes brasileiras',
    excerpt: 'De coleções de brindes nas garrafas de refrigerante a brinquedos icônicos e programas que faziam a alegria da garotada.',
    content: `Os anos 90 foram uma época mágica para as crianças e adolescentes brasileiros. Sem internet rápida, smartphones ou serviços de streaming de vídeo de alta definição, a diversão cotidiana vinha diretamente das brincadeiras de rua, das coleções analógicas de brinquedos e do carinho de uma grade de programação infantil incrível nos canais de sinal aberto.

Se você cresceu nessa década marcante, prepare-se para este ataque nostálgico e veja o que dominava as salas e escolas:

### Os Brinquedos que Eram Símbolos de Status

*   **Pega-Varetas e Molas Malucas:** Brinquedos simples de plástico industrializado que rendiam horas de campeonatos acesos no quintal de casa.
*   **Tamagotchi (O Bichinho Virtual):** O queridinho japonês que exigia ser alimentado, limpo e cuidado em intervalos de horas regulares, sob risco de "falecer" e exigir um reset sofrido no pequeno botão traseiro.
*   **Geloucos e Minigarrafas de Refrigerante:** Juntar tampinhas de alumínio de Coca-Cola ou Pepsi e trocar por pequenos alienígenas que brilhavam no escuro ou réplicas metálicas minúsculas de engradados era o esporte escolar favorito.

### Os Desenhos no Café da Manhã

Antes de ir para a escola, ou assim que chegavam em casa, as crianças ficavam grudadas nos programas infantis como a **TV Colosso** (Rede Globo), apresentada por cães de pelúcia com personalidades divertidas como Priscilla e Gilmar, ou a marcante **Eliana** e o **Bom Dia & Cia** (SBT).

Os animes começavam a explodir no Brasil também. Quem não parava tudo no final de tarde para assistir ao fenômeno de **Os Cavaleiros do Zodíaco** na Rede Manchete? A emissora pioneira trouxe lutas épicas, trilhas sonoras orquestradas inesquecíveis e bonecos articulados que eram sonhos absolutos de aniversários.

### O Doce Sabor da Merenda escolar

Quem viveu lembra dos chocolates em formatos inusitados como as Moedas de Chocolate, Cigarrinhos de Chocolate (que hoje seriam totalmente politicamente incorretos!), e salgadinhos com pacotes repletos de "Tazos" colecionáveis colecionados com dedicação e trocados nos recreios escolares com muita gritaria.`,
    image: 'https://images.unsplash.com/photo-1566694271453-390536dd1f0d?auto=format&fit=crop&q=80&w=600',
    author: 'Aline de Souza',
    date: '2026-06-06',
    category: 'Nostalgia',
    tags: ['Anos 90', 'Brinquedos', 'Desenhos Antigos', 'TV Colosso', 'Rede Manchete'],
    views: 11000,
    readTime: '5 min',
    isDraft: false,
    isFeatured: false,
    seoTitle: 'Relíquias Nostálgicas da Infância dos Anos 90 | Memórias da TV',
    seoDescription: 'Viaje no tempo com os brinquedos, coleções e desenhos que marcaram a infância de quem cresceu no Brasil nos anos 90.',
    commentsCount: 15
  },
  {
    id: 'art-6',
    slug: 'o-que-aconteceu-com-os-participantes-mais-famosos-do-sbt',
    title: 'O que aconteceu com os participantes mais famosos do SBT?',
    excerpt: 'Nomes que ganharam notoriedade instantânea em reality shows pioneiros como a Casa dos Artistas.',
    content: `Antes da consolidação do Big Brother Brasil no ano de 2002 na Rede Globo, o SBT abalou as estruturas da audiência nacional com o estrondoso e inovador lançamento de **Casa dos Artistas** em outubro de 2001. O confinamento de estrelas de rádio, TV e música em uma mansão vigiada 24 horas surpreendeu a concorrência direta e registrou médias históricas de Ibope acima de 47 pontos no final de semana.

Mas afinal de contas, o que aconteceu com os participantes que foram pioneiros desse fenômeno nacional? 

### Bárbara Paz (A Grande Campeã)

A atriz gaúcha Bárbara Paz conquistou o público com sua sensibilidade artística refinada e as angústias de confinamento, levando para casa o grande prêmio em dinheiro ao bater o favorito Supla na grande final. 

Após o término da Casa dos Artistas, Bárbara manteve carreira brilhante na teledramaturgia nacional. Ela protagonizou novelas de destaque no próprio SBT (como Marisol) e depois migrou para a Rede Globo, brilhando em papéis maduros em produções como "Viver a Vida" e "Amor à Vida". Hoje, ela também atua como premiada diretora de cinema e produtora teatral de prestígio.

### Supla (O Carismático Vice)

O cantor de punk rock Supla (Eduardo Smith de Vasconcellos Suplicy) foi a alma rebelde americana e humorística da primeira versão do reality. Seu romance carinhoso com Bárbara Paz manteve milhões de brasileiros atentos às telas.

Supla nunca abandonou seu espírito autêntico do rock. Ele continua produzindo álbuns musicais com alta energia, fazendo turnês frequentes e participando de comerciais modernos com sua imagem loira platinada eterna. Ele também virou uma estrela popular nas redes sociais com vídeos gravados em inglês e português pelas ruas de São Paulo.

### Patrícia Coelho

A sofisticada cantora paulista foi figura central de debates dentro da casa. Atualmente, Patrícia Coelho mantém sua vocação musical sólida e frequente nos palcos underground de São Paulo. 

Ela atua em musicais de teatro consagrados com críticas positivas, produz novos singles digitais de música pop eletrônica sofisticada e realiza apresentações repletas de releituras de clássicas bandas de rock mundiais.`,
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600',
    author: 'Mariana Azevedo',
    date: '2026-06-05',
    category: 'Por Onde Anda?',
    tags: ['SBT', 'Casa dos Artistas', 'Supla', 'Bárbara Paz', 'Reality Show', 'Nostalgia'],
    views: 7300,
    readTime: '5 min',
    isDraft: false,
    isFeatured: false,
    seoTitle: 'Onde estão hoje os participantes da Casa dos Artistas | Memórias da TV',
    seoDescription: 'Descubra a carreira de Bárbara Paz, Supla e outros pioneiros dos realities que quebraram recordes de audiência no SBT.',
    commentsCount: 3
  },
  {
    id: 'art-7',
    slug: 'a-trajetoria-de-gugu-liberato',
    title: 'A trajetória de Gugu Liberato: De assistente de produção a rei do domingo',
    excerpt: 'Relembre a carreira gloriosa de um dos maiores comunicadores da história da televisão brasileira.',
    content: `Antônio Augusto Moraes Liberato, imortalizado pelo apelido carinhoso de **Gugu Liberato**, escreveu seu nome com letras de ouro e luzes neon na história da televisão brasileira. Com faro comercial afiado para o entretenimento popular, ousadia jornalística e uma empatia única com a grande massa, Gugu transformou o domingo brasileiro em um grande espetáculo de entretenimento puro.

Neste artigo, homenageamos as origens humildes de sua carreira milionária de apresentador de palco do SBT e Record:

### A Carta Sagrada de Sugestão de Pautas

Filho de imigrantes portugueses estabelecidos em São Paulo, Gugu começou sua aproximação com os refletores enviando sugestões manuscritas de quadros de humor para o programa de Silvio Santos na década de 1970. 

Impressionado pela escrita assertiva e criatividade daquele menino de apenas 14 anos, Silvio mandou contratá-lo como office-boy e depois assistente de produção. O jovem dividia o tempo entre o curso de jornalismo universitário e as madrugadas de montagem de cenários e roteiros de humor.

### O Nascimento do "Viva a Noite" (1982)

Após algumas aparições como animador, Silvio deu a Gugu o primeiro comando de programa próprio: o **Viva a Noite**, que animava as noites de sábado do SBT de forma irreverente e carnavalesca. O programa virou grande líder de audiência com quadros como "O Baile dos Passarinhos" e as famosas dancinhas de ídolos da jovem guarda.

Gugu provou que tinha luz própria além do padrinho televisivo e logo atraiu uma tentadora proposta de contratação milionária da Rede Globo em 1987. Numa cena digna de filme, Silvio Santos foi pessoalmente à emissora carioca para conversar com Roberto Marinho para rescindir amigavelmente o contrato, devolvendo Gugu ao SBT com a promessa de assumir fatias nobres de domingo.

### O Reinado Épico do "Domingo Legal"

Em 1993, iniciava-se o clássico absoluto **Domingo Legal**. Sob o comando firme de Gugu, a atração misturava jornalismo policial dramático de helicóptero, aparições de celebridades internacionais do momento e brincadeiras malucas com água e música.

A clássica disputa semanal contra Fausto Silva na Globo entrou para a história como uma das maiores guerras comerciais de publicidade por ibope ponto a ponto já documentadas no ocidente. Gugu tinha um time que sabia traduzir o desejo de lazer do povo para as telas com precisão sem precedentes.`,
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=600',
    author: 'Claudio Antunes',
    date: '2026-06-04',
    category: 'Celebridades',
    tags: ['Gugu Liberato', 'SBT', 'Domingo Legal', 'Silvio Santos', 'História da TV'],
    views: 12100,
    readTime: '6 min',
    isDraft: false,
    isFeatured: false,
    seoTitle: 'A Vida de Gugu Liberato nos bastidores do SBT | Memórias da TV',
    seoDescription: 'Acompanhe a trajetória de Gugu Liberato, seu início de office-boy a maior concorrente de Fausto Silva aos domingos.',
    commentsCount: 6
  },
  {
    id: 'art-8',
    slug: 'os-programas-que-marcaram-geracoes',
    title: 'Os programas que marcaram gerações e deixaram saudades eternas',
    excerpt: 'De atrações humorísticas lendárias de auditório a programas educativos que ensinavam brincando nas manhãs.',
    content: `Ao longo de décadas, diversas atrações televisivas conseguiram ultrapassar a barreira de simples entretenimento diário para tornarem-se referências de gerações inteiras no Brasil. São formatos que deixaram saudades no público, criaram expressões populares absorvidas nos dicionários informais das ruas e hoje são lembrados com imenso carinho nostálgico.

Veja a lista selecionada das maiores marcas eternas das tardes e noites nacionais:

### 1. Castelo Rá-Tim-Bum (TV Cultura - 1994)
A TV Cultura produziu a obra-prima absoluta da pedagogia infantil internacional. Com roteiros inteligentes de Flávio de Souza e direção primorosa de Cao Hamburger, a história do jovem feiticeiro Nino de 300 anos que morava num castelo com animais falantes, cientistas e bruxas ensinou ciências, história e convívio social sem parecer chato.

### 2. Os Trapalhões (Rede Globo)
Didi, Dedé, Mussum e Zacarias formaram o quarteto de pastelão mais amado de todos os tempos. Seus episódios leves dominavam as noites dominicais antes da novela, reunindo avós, pais e netos em risadas fáceis diante de esquetes de confusões, disfarces hilários e paródias de clássicos de cinema mundial.

### 3. Sai de Baixo (Rede Globo - 1996)
O formato de comédia semanal gravado no Teatro Procópio Ferreira em São Paulo resgatou as raízes douradas do teatro de revista nacional. A família falida de Caco Antibes (Miguel Falabella), Cassandra (Aracy Balabanian), Magda (Marisa Orth) e o síndico Vavá divertia com improvisações geniais, dezenas de gafes e interações diretas com a plateia de poltronas.

### 4. Programa Livre (SBT - 1991)
Comandado com maestria jovem por Serginho Groisman, o programa de auditório diário dava voz direta aos jovens estudantes do ensino médio para debaterem comportamento, sexualidade, as mazelas do país e conversarem com as grandes bandas do emergente rock nacional e clássico axé music da época. Era o espaço de debate aberto e sincero que faltava na televisão aberta.`,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600',
    author: 'Aline de Souza',
    date: '2026-06-03',
    category: 'Programas Antigos',
    tags: ['Nostalgia', 'Castelo Rá-Tim-Bum', 'Os Trapalhões', 'TV Cultura', 'Comédia'],
    views: 8600,
    readTime: '5 min',
    isDraft: false,
    isFeatured: false,
    seoTitle: '4 Programas de TV Antigos que Ninguém Escreve | Memórias da TV',
    seoDescription: 'Reviva Castelo Rá-Tim-Bum, Sai de Baixo, Os Trapalhões e outras obras-primas da televisão brasileira que marcaram gerações.',
    commentsCount: 7
  },
  {
    id: 'art-9',
    slug: 'como-esta-o-elenco-de-chiquititas-hoje',
    title: 'Como está o elenco de Chiquititas hoje? Saiba o paradeiro das atrizes',
    excerpt: 'Quase 30 anos após a primeira temporada da novela infantil produzida na Argentina pelo SBT, veja quem seguiu na TV e quem escolheu o anonimato.',
    content: `No ano de 1997, o SBT firmava parceria histórica de co-produção internacional com a Telefe argentina para dar vida a uma das maiores novelas juvenis nacionais: **Chiquititas**. 

A rotina de canções felizes, dramas familiares e danças coletivas no Orfanato Raio de Luz mobilizou milhões de crianças brasileiras, vendendo coleções gigantes de álbuns de figurinhas, sapatos oficiais infantis e CDs que ganhavam certificações múltiplas de platina.

Mas como estão hoje aquelas orfãs amáveis que iluminavam nossas noites depois do jantar? Confira o paradeiro das atrizes pioneiras da primeira edição de 1997:

### Fernanda Souza (A Marcante Mili)

Mili era a doce narradora de histórias e líder da garotada na primeira fase da trama. Sua atuação carismática consagrou Fernanda Souza instantaneamente.

Após o encerramento do contrato com o SBT, Fernanda migrou de maneira triunfal para a Rede Globo, brilhando em papéis cômicos adorados em novelas como "Alma Gêmea", "O Profeta" e "Ti Ti Ti". Ela também revelou-se excepcional apresentadora de talk-shows no canal fechado Multishow (como o "Vai, Fernandinha"). Atualmente, ela atua ativamente como produtora executiva de streaming e influenciadora focada em desenvolvimento de autoconhecimento.

### Flávia Monteiro (A Bondosa Carolina)

A diretora amável do orfanato, que servia como a figura materna acolhedora de todas as meninas, foi interpretada de forma brilhante por Flávia Monteiro.

Flávia manteve constância impecável na televisão brasileira pós-SBT. Ela integrou elencos de teledramaturgia da Rede Record em elogiadas reconstituições históricas bíblicas e séries contemporâneas por mais de dez anos. Ela também participa frequentemente de grandes espetáculos musicais nos palcos do Rio de Janeiro e São Paulo.

### Aretha Oliveira (A Pata)

A Pata foi uma das personagens de maior evolução e dramaticidade ao longo das cinco temporadas da versão brasileira de Chiquititas, mantendo-se firme no elenco do início ao fim das gravações em Buenos Aires.

Aretha Oliveira graduou-se em Rádio e TV. Hoje estabeleceu-se como uma bem-sucedida influenciadora digital com milhares de seguidores, focando canais digitais nos temas de maternidade real, empoderamento capilar afro e viagens culturais em família. Ela também realiza dublagens e eventuais trabalhos em comerciais de grandes marcas multinacionais de estética.`,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
    author: 'Mariana Azevedo',
    date: '2026-06-02',
    category: 'Novelas',
    tags: ['SBT', 'Chiquititas', 'Fernanda Souza', 'Antes e Depois', 'Novelas Infantis'],
    views: 13500,
    readTime: '6 min',
    isDraft: false,
    isFeatured: false,
    seoTitle: 'Antes e Depois de Mili e o Elenco de Chiquititas | Memórias da TV',
    seoDescription: 'Confira a vida de Fernanda Souza, Flávia Monteiro e Aretha Oliveira, quase 30 anos pós-lançamento de Chiquititas no SBT.',
    commentsCount: 11
  },
  {
    id: 'art-10',
    slug: 'os-bastidores-da-televisao-brasileira-segredos-revelados',
    title: 'Os bastidores da televisão brasileira: Segredos revelados por diretores',
    excerpt: 'Diretores veteranos de grandes emissoras expõem os segredos de bastidores, imprevistos históricos e rivalidades nos camarins.',
    content: `O público vê as luzes brilhando, as maquiagens impecáveis dos astros, os risos fáceis nos palcos e cenários impecáveis. Mas as engrenagens por trás das câmeras da televisão brasileira são fervilhantes, repletas de improvisos dramáticos de última hora, disputas ferozes de espaço por ego e decisões relâmpagos de executivos de terno em gabinetes fechados.

Neste artigo revelador, resgatamos depoimentos históricos e revelações de produtores e diretores veteranos sobre o cotidiano de bastidores do nosso entretenimento:

### O Apagão que Mudou o Roteiro

Em meados dos anos noventa, um blackout total de energia interrompeu a gravação de um dos maiores talk shows da época no Rio de Janeiro. Com celebridades internacionais aguardando no escuro dos camarins, o experiente diretor de palco mandou a produção buscar centenas de velas em igrejas próximas de forma apressada.

O programa foi inteiramente conduzido sob a luz bruxuleante de velas e candelabros improvisados de decoração. O que parecia tragédia operacional profunda virou um dos episódios mais artísticos, intimistas e elogiados de história do canal, provando que a TV vive prioritariamente de espontaneidade criativa em crises.

### A Disputa Silenciosa pelo Tamanho do Camarim

Egos de astros sempre exigiram jogo de cintura delicado de administradores e secretários de produção física de estúdios. Histórias guardadas revelam astros que chegavam a entrar com fita métrica industrial nos camarins recém-reformados para garantir que sua sala privativa não possuísse sequer um metro quadrado a menos que a de seu colega co-protagonista de telenovela.

"Havia dias em que gastávamos mais tempo acalmando egos de camarim e arranjando garrafas de champanhe específicas do que propriamente revisando os enquadramentos de lente de câmeras", revela um assistente de direção aposentado sob anonimato rindo divertido.

### A Fita Salva de Última Hora

Antes da digitalização total e redes de fibra óptica ágeis, os capítulos diários de novelas eram transportados de motoboys entre estúdios de filmagem e a central de antena de exibição de satélites do canal. 

Diretores lembram episódios onde a fita gravada contendo o episódio final de Vale Tudo entrou nas máquinas de exibição faltando apenas cinco minutos para o horário oficial, enquanto o público já assistia ao comercial pré-novela ansioso, numa correria de produtores suados pelos corredores gelados de engenharia técnica.`,
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600',
    author: 'Claudio Antunes',
    date: '2026-06-01',
    category: 'Curiosidades',
    tags: ['Bastidores', 'Egos', 'Famosos', 'Diretores de TV', 'História Secreta'],
    views: 9900,
    readTime: '5 min',
    isDraft: false,
    isFeatured: false,
    seoTitle: 'Segredos Chocantes de Bastidores da TV Brasileira | Memórias da TV',
    seoDescription: 'Dos imprevistos com blackout de luzes a brigas por tamanho de camarins de celebridades, diretores veteranos confessam bastidores.',
    commentsCount: 8
  }
];

export const MOCK_REVIEWS: Comment[] = [
  {
    id: 'c-1',
    articleId: 'art-1',
    articleTitle: '15 curiosidades sobre Silvio Santos que poucos conhecem',
    userName: 'Carlos Mendes',
    email: 'carlos.m@hotmail.com',
    content: 'Silvio Santos é e sempre será gigante. Impressionante saber que ele quase foi presidente e que serviu ao Exército como paraquedista!',
    date: '2026-06-10 12:30',
    isApproved: true
  },
  {
    id: 'c-2',
    articleId: 'art-1',
    articleTitle: '15 curiosidades sobre Silvio Santos que poucos conhecem',
    userName: 'Beatriz Vasconcelos',
    email: 'beatriz.v92@gmail.com',
    content: 'Gostei muito da curiosidade sobre o microfone de peito. Realmente era a marca registrada dele. Maravilhosa matéria.',
    date: '2026-06-10 14:15',
    isApproved: true
  },
  {
    id: 'c-3',
    articleId: 'art-1',
    articleTitle: '15 curiosidades sobre Silvio Santos que poucos conhecem',
    userName: 'Spammer Robô',
    email: 'win-free-cash11@cheapspams.click',
    content: 'CLIQUE AQUI PARA GANHAR CRÉDITOS GRÁTIS!!! MELHOR SITE DO MOMENTO!!!',
    date: '2026-06-10 15:00',
    isApproved: false
  },
  {
    id: 'c-4',
    articleId: 'art-3',
    articleTitle: 'A história do Show do Milhão',
    userName: 'Rodrigo Alves',
    email: 'rodrigo.alves@yahoo.com.br',
    content: 'Nossa, eu colecionava aqueles CD-ROMs do Show do Milhão que vinham nos salgadinhos e revistas! Que saudades incríveis.',
    date: '2026-06-08 20:45',
    isApproved: true
  },
  {
    id: 'c-5',
    articleId: 'art-5',
    articleTitle: 'Quem viveu os anos 90 vai lembrar disso',
    userName: 'Mariana Lima',
    email: 'mari.lima.poa@gmail.com',
    content: 'O Tamagotchi era minha paixão e desespero! Acordava de madrugada para cuidar daquele bichinho... Que tempo maravilhoso!',
    date: '2026-06-07 09:12',
    isApproved: true
  }
];
