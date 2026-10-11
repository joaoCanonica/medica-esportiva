// Dados centrais do site. Apenas informações confirmadas pela cliente.

const crm = '16812';
const rqe = '11326';

export const doctor = {
  name: 'Dra. Karine Bittencourt',
  positioning: 'Medicina e estilo de vida',
  practiceAreas: 'Medicina de Família e Esportiva',
  crm,
  rqe,
  registration: `CRM/SC ${crm} | RQE ${rqe}`,
  city: 'Lages',
  state: 'SC',
  stateFull: 'Santa Catarina',
};

export const clinic = {
  name: 'Garden Clinic',
  street: 'R. Santos Dumont, 165',
  neighborhood: 'Universitário',
  city: 'Lages',
  state: 'SC',
  postalCode: '88509-055',
};

export const fullAddress = `${clinic.name}, ${clinic.street} - ${clinic.neighborhood}, ${clinic.city} - ${clinic.state}, CEP ${clinic.postalCode}`;

const whatsappNumber = '5549999247102';

// Telefone em formato E.164, derivado do número do WhatsApp (uso em dados estruturados).
export const phoneE164 = `+${whatsappNumber}`;
const whatsappMessage =
  'Olá, Dra. Karine! Conheci seu trabalho pelo site e gostaria de receber informações sobre o atendimento.';

export const links = {
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  instagram: 'https://www.instagram.com/drakarinebitencourt/',
  googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${clinic.name}, ${clinic.street} - ${clinic.neighborhood}, ${clinic.city} - ${clinic.state}, ${clinic.postalCode}`
  )}`,
};

export const nav = [
  { label: 'Início', href: '#inicio' },
  { label: 'Para você', href: '#para-voce' },
  { label: 'Trajetória', href: '#trajetoria' },
  { label: 'Conteúdos', href: '#conteudos' },
  { label: 'Contato', href: '#contato' },
];

export const sports = [
  'Corrida',
  'Futebol',
  'Vôlei',
  'Futevôlei',
  'Lutas',
  'Tênis',
  'Padel',
  'Musculação',
  'CrossFit',
  'Hyrox',
  'Dança',
  'Funcional',
];

// Quatro jornadas interativas (substituem os oito acordeões antigos)
export const journeys = [
  {
    id: 'comecar',
    tab: 'Quero começar',
    title: 'Começar também é uma decisão de saúde.',
    text: 'Para quem deseja sair do sedentarismo, retomar uma atividade ou encontrar um ponto de partida mais seguro.',
    image: 'consulta',
  },
  {
    id: 'evoluir',
    tab: 'Quero evoluir',
    title: 'Resultado não depende apenas de treinar mais.',
    text: 'Rotina, recuperação, sono, alimentação e saúde influenciam a maneira como o corpo responde ao treino.',
    image: 'medalha',
  },
  {
    id: 'sem-dor',
    tab: 'Quero voltar sem dor',
    title: 'Dor persistente não deve virar parte da rotina.',
    text: 'Entender quando surgiu, como evolui e o que limita ajuda a direcionar uma avaliação mais cuidadosa.',
    image: 'dor',
  },
  {
    id: 'desafio',
    tab: 'Quero me preparar para um desafio',
    title: 'Antes da largada, existe todo um caminho.',
    text: 'Provas, competições e novos objetivos exigem preparo, acompanhamento e atenção aos sinais do corpo.',
    image: 'corrida',
  },
];

// Narrativa sticky — quatro momentos
export const storySteps = [
  {
    id: 'medica',
    kicker: '01 — Médica',
    title: 'Medicina e estilo de vida.',
    text: 'Um olhar que considera a pessoa, sua rotina e sua relação com o movimento.',
    image: 'medica',
  },
  {
    id: 'atleta',
    kicker: '02 — Atleta',
    title: 'Ela também conhece o outro lado do movimento.',
    text: 'Karine corre, treina e participa de provas — sem transformar a própria experiência em promessa para o paciente.',
    image: 'atleta',
  },
  {
    id: 'expressao',
    kicker: '03 — Expressão',
    title: 'Movimento também é expressão.',
    text: 'Na dança, na força e na corrida, diferentes formas de estar presente no próprio corpo.',
    image: 'expressao',
  },
  {
    id: 'conhecimento',
    kicker: '04 — Conhecimento',
    title: 'Informação também é cuidado.',
    text: 'Palestras, conversas e educação em saúde aproximam conhecimento médico da vida cotidiana.',
    image: 'conhecimento',
  },
];

export const educationalContent = [
  {
    slug: 'dor-treino-lesao',
    title: 'Dor de treino ou sinal de lesão?',
    summary:
      'Intensidade, duração, limitação e evolução da dor ajudam a indicar quando vale procurar avaliação.',
    videoSrc: '/videos/dor-treino-lesao.mp4',
    duration: '0:56',
    durationISO: 'PT56S',
    uploadDate: '2026-09-24T16:29:20+00:00',
    featured: true,
  },
  {
    slug: 'checkup-cardiologico',
    title: 'Antes da performance, vem a segurança',
    summary:
      'Ser atleta não significa estar livre de problemas cardíacos — a avaliação individual ajuda a entender o esforço seguro.',
    videoSrc: '/videos/checkup-cardiologico.mp4',
    duration: '0:45',
    durationISO: 'PT45S',
    uploadDate: '2026-09-24T16:29:20+00:00',
    featured: false,
  },
  {
    slug: 'corrida-preparo-prevencao',
    title: 'Corrida, preparo e prevenção',
    summary:
      'Sobrecarga, técnica e preparo muscular influenciam a experiência de quem corre.',
    videoSrc: '/videos/corrida-preparo-prevencao.mp4',
    duration: '1:24',
    durationISO: 'PT1M24S',
    uploadDate: '2026-09-24T16:29:20+00:00',
    featured: false,
  },
];

// Vídeo da palestra (seção de conhecimento compartilhado).
// uploadDate: data do commit que adicionou o arquivo; durações medidas com ffprobe.
export const talkVideo = {
  slug: 'como-foi-palestra',
  title: 'Como foi a palestra',
  summary:
    'Palestras, conversas e ações de educação em saúde aproximam informação médica da rotina de diferentes públicos.',
  videoSrc: '/videos/como-foi-palestra.mp4',
  durationISO: 'PT1M11S',
  uploadDate: '2026-09-25T02:41:44+00:00',
};

// Temas tratados no site (dados estruturados: knowsAbout).
export const topics = [
  'Medicina esportiva',
  'Medicina de estilo de vida',
  'Dor e lesão no treino',
  'Avaliação cardiológica do esportista',
  'Corrida e preparo para provas',
  'Retorno à atividade física',
];

export const instagramTeaser = 'Mais informação, rotina e bastidores no Instagram.';

export const faqItems = [
  {
    question: 'Preciso ser atleta?',
    answer:
      'Não. O acompanhamento também é útil para quem está começando ou retomando uma atividade com mais segurança.',
  },
  {
    question: 'A Dra. Karine atende homens e mulheres?',
    answer:
      'Sim. O atendimento é direcionado a diferentes públicos, modalidades e níveis de experiência.',
  },
  {
    question: 'Quais modalidades podem ser acompanhadas?',
    answer:
      'Corrida, futebol, lutas, vôlei, futevôlei, musculação, CrossFit, Hyrox, tênis, padel, dança e outras atividades.',
  },
  {
    question: 'Como obtenho informações sobre consulta?',
    answer: 'Entre em contato pelo WhatsApp para consultar disponibilidade e formato de atendimento.',
  },
];

export const seo = {
  title: 'Dra. Karine Bittencourt | Medicina Esportiva em Lages',
  description:
    'Conheça o trabalho da Dra. Karine Bittencourt em Lages/SC. Medicina, estilo de vida e acompanhamento para quem pratica esporte ou deseja começar a se movimentar com segurança.',
};
