const img = (name: string) => `/img/${name}`;

export const brand = {
  name: "Serenitah Terapias Integradas",
  short: "Serenitah",
  phoneLabel: "(61) 99402-6563",
  phoneRaw: "5561994026563",
  email: "serenitah.terapias@gmail.com",
  address:
    "Edifício Fusion Work e Live, SHN, Asa Norte, Brasília — DF, 70701-040",
  mark: img("image-6.png"),
  room: img("image-2.png"),
  session: img("image.png"),
  teamOffice: img("serenitah-equipe-consultorio.png"),
  teamMeeting: img("serenitah-equipe-reuniao.png"),
};

export type Therapist = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  index: string;
  bio: string[];
  focus: string[];
};

export const therapists: Therapist[] = [
  {
    slug: "jessica-priscila-lago",
    name: "Jéssica Priscila Lago",
    role: "Psicanalista",
    photo: img("image-3.png"),
    index: "01",
    bio: [
      "Atende adultos em análise individual, com escuta voltada para questões de ansiedade, luto e reconstrução de projetos de vida.",
      "Trabalha o tempo de cada pessoa: a sessão é um espaço sem pressa, onde a palavra encontra lugar antes da solução.",
    ],
    focus: ["Análise individual", "Ansiedade", "Luto", "Atendimento online"],
  },
  {
    slug: "jennifer-patricia-kuhn-lago",
    name: "Jennifer Patrícia Kuhn Lago",
    role: "Psicanalista",
    photo: img("image-4.png"),
    index: "02",
    bio: [
      "Dedica-se ao atendimento de casais e ao acompanhamento de pessoas em processos de transição — mudanças de cidade, de carreira, de fase.",
      "Conduz o processo com precisão clínica e acolhimento, sustentando o diálogo onde ele costuma se interromper.",
    ],
    focus: ["Casais", "Transições de vida", "Suporte emocional", "Presencial"],
  },
  {
    slug: "giovanna-alves-campos",
    name: "Giovanna Alves Campos",
    role: "Psicanalista",
    photo: img("image-5.png"),
    index: "03",
    bio: [
      "Atua com transtornos alimentares e com o cuidado à parentalidade, acompanhando famílias na construção de vínculos mais leves.",
      "A escuta parte do corpo e da história: entender o sintoma antes de tentar corrigi-lo.",
    ],
    focus: [
      "Transtornos alimentares",
      "Parentalidade",
      "Adolescentes",
      "Home saúde",
    ],
  },
];

export const services = [
  {
    n: "01",
    title: "Psicanálise",
    text: "Um percurso de escuta contínua, onde aquilo que se repete pode finalmente ser dito de outro modo. Atendimento individual e de casais, presencial em Brasília ou online.",
    photo: teamOfficeAsset.url,
    photoAlt: "Profissionais da Serenitah no consultório",
    photoPosition: "center 40%",
  },
  {
    n: "02",
    title: "Home Saúde",
    text: "Acompanhamento no ambiente da própria casa, para quem tem mobilidade reduzida ou precisa de continuidade no cuidado sem deslocamento.",
    photo: roomAsset.url,
    photoAlt: "Ambiente de atendimento da Serenitah",
    photoPosition: "center",
  },
  {
    n: "03",
    title: "Transtornos Alimentares",
    text: "Cuidado especializado para a relação com o corpo e com a comida, em trabalho conjunto com a rede de saúde quando necessário.",
    photo: teamMeetingAsset.url,
    photoAlt: "Equipe Serenitah em reunião de trabalho",
    photoPosition: "center 45%",
  },
  {
    n: "04",
    title: "Apoio à Parentalidade",
    text: "Um espaço para pais e responsáveis pensarem suas escolhas, os impasses do dia a dia e o vínculo com os filhos, sem julgamento.",
    photo: sessionAsset.url,
    photoAlt: "Conversa profissional na Serenitah",
    photoPosition: "center 42%",
  },
];

export const steps = [
  {
    n: "01",
    title: "Contato inicial",
    text: "Você escreve pelo WhatsApp ou pelo formulário. Respondemos com as informações do primeiro encontro.",
  },
  {
    n: "02",
    title: "Agendamento",
    text: "Escolhemos juntos o horário, a modalidade — presencial ou online — e a profissional mais adequada ao seu caso.",
  },
  {
    n: "03",
    title: "Atendimento",
    text: "A sessão acontece em ambiente reservado, com sigilo integral. A frequência é definida a dois, sessão após sessão.",
  },
];

export const faqs = [
  {
    q: "Quais serviços são oferecidos?",
    a: "Psicanálise individual e de casais, home saúde, cuidado em transtornos alimentares e apoio à parentalidade, presencialmente em Brasília ou online.",
  },
  {
    q: "Terapia substitui acompanhamento médico?",
    a: "Não. A análise caminha ao lado do acompanhamento médico e psiquiátrico quando ele existe. Quando necessário, trabalhamos em conjunto com outros profissionais.",
  },
  {
    q: "Quanto tempo dura uma sessão?",
    a: "As sessões duram em média 50 minutos. A frequência mais comum é semanal, ajustada conforme o momento de cada pessoa.",
  },
  {
    q: "O atendimento é presencial ou online?",
    a: "Os dois. O consultório fica na Asa Norte, em Brasília, e o atendimento online tem a mesma estrutura e o mesmo sigilo.",
  },
  {
    q: "O que é dito na sessão fica em sigilo?",
    a: "Sim. O sigilo é integral e é condição do trabalho, tanto no presencial quanto no online.",
  },
  {
    q: "Vocês atendem por convênio?",
    a: "O atendimento é particular. Emitimos recibo para solicitação de reembolso junto ao seu plano de saúde.",
  },
  {
    q: "Como faço para agendar?",
    a: "Pelo WhatsApp (61) 99402-6563, pelo e-mail serenitah.terapias@gmail.com ou pelo formulário desta página.",
  },
  {
    q: "Vocês atendem crianças e adolescentes?",
    a: "Sim, com profissionais dedicadas a esse público e acompanhamento dos responsáveis quando o caso pede.",
  },
  {
    q: "Posso mudar de profissional durante o processo?",
    a: "Pode. A escolha é sua e conversamos abertamente sobre isso sempre que fizer sentido para a continuidade do cuidado.",
  },
];

export const chapters = [
  { id: "sobre", n: "01", label: "Sobre" },
  { id: "cuidados", n: "02", label: "Cuidados" },
  { id: "processo", n: "03", label: "Processo" },
  { id: "equipe", n: "04", label: "Equipe" },
  { id: "perguntas", n: "05", label: "Perguntas" },
  { id: "contato", n: "06", label: "Contato" },
];

export function whatsappLink(message: string) {
  return `https://wa.me/${brand.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export function isWithinHours(d = new Date()) {
  // Horário de Brasília (UTC-3)
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const br = new Date(utc - 3 * 3600000);
  const day = br.getDay();
  const hour = br.getHours();
  return day >= 1 && day <= 5 && hour >= 8 && hour < 19;
}
