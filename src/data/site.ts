// Dados centrais do site. Apenas informações confirmadas pela cliente.

export const doctor = {
  name: 'Dra. Karine Bittencourt',
  positioning: 'Medicina e estilo de vida',
  practiceAreas: 'Medicina de Família e Esportiva',
  registration: 'CRM/SC 16812 | RQE 11326',
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
  { label: 'Abordagem', href: '#abordagem' },
  { label: 'Para quem', href: '#para-quem' },
  { label: 'Movimento', href: '#movimento' },
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

export const recognitionItems = [
  'Quer começar a se exercitar com mais segurança.',
  'Está se preparando para uma prova ou competição.',
  'Treina, mas sente que não evolui como esperava.',
  'Convive com uma dor que sempre retorna.',
  'Quer cuidar da saúde sem abandonar o esporte.',
  'Tem dúvidas sobre treino, recuperação ou suplementos.',
  'Precisa conciliar atividade física e uma rotina exigente.',
  'Está vivendo uma nova fase e deseja continuar em movimento.',
];

export const educationalContent = [
  {
    slug: 'checkup-cardiologico',
    title: 'Antes da performance, vem a segurança',
    summary:
      'Ser atleta não significa estar livre de problemas cardíacos. Antes de buscar performance, é importante entender se o organismo está preparado para o esforço e quando uma avaliação individual pode ser necessária.',
    videoSrc: '/videos/checkup-cardiologico.mp4',
    duration: '0:45',
  },
  {
    slug: 'dor-treino-lesao',
    title: 'Dor de treino ou sinal de lesão?',
    summary:
      'Nem todo desconforto após o exercício representa lesão. Intensidade, duração, limitação e evolução da dor ajudam a indicar quando é importante procurar avaliação.',
    videoSrc: '/videos/dor-treino-lesao.mp4',
    duration: '0:56',
  },
  {
    slug: 'corrida-preparo-prevencao',
    title: 'Corrida, preparo e prevenção',
    summary:
      'Sobrecarga, técnica, progressão e preparo muscular influenciam a experiência de quem corre. Informação e fortalecimento adequado ajudam a reduzir riscos e manter consistência.',
    videoSrc: '/videos/corrida-preparo-prevencao.mp4',
    duration: '1:24',
  },
];

export const faqItems = [
  {
    question: 'Preciso ser atleta para procurar Medicina Esportiva?',
    answer:
      'Não. O acompanhamento também pode ser útil para quem está começando, retomando uma atividade ou buscando praticar exercícios com mais segurança.',
  },
  {
    question: 'A Dra. Karine atende homens e mulheres?',
    answer:
      'Sim. A comunicação também dedica atenção à saúde da mulher, mas o atendimento é direcionado a diferentes públicos, modalidades esportivas e níveis de experiência.',
  },
  {
    question: 'Quais esportes fazem parte desse acompanhamento?',
    answer:
      'A Medicina Esportiva pode acompanhar praticantes de diferentes modalidades, como corrida, futebol, lutas, vôlei, futevôlei, musculação, CrossFit, Hyrox, tênis, padel, dança e outras atividades.',
  },
  {
    question: 'Como obtenho informações sobre consultas?',
    answer:
      'Entre em contato pelo WhatsApp para consultar disponibilidade, formato de atendimento e demais informações.',
  },
  {
    question: 'Onde acontece o atendimento?',
    answer: `Na ${clinic.name}, na ${clinic.street}, bairro ${clinic.neighborhood}, em ${clinic.city}/${clinic.state}.`,
  },
];

export const instagramTeaser = 'Mais informação, rotina e bastidores no Instagram.';

export const seo = {
  title: 'Dra. Karine Bittencourt | Medicina Esportiva em Lages',
  description:
    'Conheça o trabalho da Dra. Karine Bittencourt em Lages/SC. Medicina, estilo de vida e acompanhamento para quem pratica esporte ou deseja começar a se movimentar com segurança.',
};
