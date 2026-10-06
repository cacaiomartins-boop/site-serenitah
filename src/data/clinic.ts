const img = (name: string) => `/img/${name}`;

export const brand = {
  name: "Serenitah Terapias Integradas",
  short: "Serenitah",
  phoneLabel: "(61) 99402-6563",
  phoneRaw: "5561994026563",
  email: "serenitah.terapias@gmail.com",
  instagram: "https://www.instagram.com/serenitahterapias",
  address:
    "Edifício Fusion Work e Live, SHN, Asa Norte, Brasília — DF, 70701-040",
  mark: img("image-6.png"),
  room: img("image-2.png"),
  session: img("image.png"),
  teamOffice: img("serenitah-equipe-consultorio.png"),
  teamMeeting: img("serenitah-equipe-reuniao.png"),
  teamPhoto: img("serenitah-equipe-foto.jpg"),
  teamSession: img("serenitah-equipe-sessao.jpg"),
  teamLaptop: img("serenitah-equipe-laptop.jpg"),
  teamMap: img("serenitah-equipe-mapa.jpg"),
};

export type TimelineItem = { period?: string; text: string };

export type Social = { kind: "instagram" | "linkedin" | "tiktok" | "spotify"; label: string; href: string };

export type Therapist = {
  slug: string;
  name: string;
  role: string;
  crp: string;
  photo: string;
  index: string;
  bio: string[];
  focus: string[];
  education: TimelineItem[];
  trajectory?: { title: string; items: TimelineItem[] };
  services?: string[];
  languages?: string[];
  socials?: Social[];
};

export const therapists: Therapist[] = [
  {
    slug: "jessica-priscila-lago",
    name: "Jéssica Priscila Lago",
    role: "Psicanalista",
    crp: "CRP 01/20947",
    photo: img("image-3.png"),
    index: "01",
    socials: [
      { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/psi.jessicalago" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/j%C3%A9ssica-priscila-lago-29211778" },
    ],
    bio: [
      "Psicanalista com mais de 7 anos de experiência clínica, une a psicanálise ao apoio prático na orientação parental.",
      "Atende adolescentes e adultos e dedica atenção especial a mulheres em diferentes fases da vida, ao luto e à perda, à psicologia perinatal e aos estudos sobre relacionamentos.",
    ],
    focus: ["Adolescentes e adultos", "Orientação parental", "Psicologia perinatal", "Luto e perda"],
    education: [
      { period: "2017", text: "Graduação em Psicologia — UniCEUB" },
      { text: "Pós-graduação em Teorias Psicanalíticas — UniCEUB" },
      { text: "Formação em Doula — ciclos perinatal, parto e pós-parto" },
      { text: "Certificação de Educadora Perinatal" },
    ],
    trajectory: {
      title: "Estudos e especializações",
      items: [
        { text: "Tanatologia — luto e perda" },
        {
          period: "2021–2025",
          text: "Avaliação de transtornos de personalidade, psicologia forense, acolhimento em situações de aborto, estudos sobre narcisismo e sobre relacionamentos amorosos",
        },
      ],
    },
    services: [
      "Terapia para adolescentes e adultos",
      "Orientação parental",
      "Terapia em grupo",
      "Acompanhamento terapêutico",
    ],
  },
  {
    slug: "jennifer-patricia-kuhn-lago",
    name: "Jennifer Patrícia Kuhn Lago",
    role: "Psicanalista",
    crp: "CRP 01/26397",
    photo: img("image-4.png"),
    index: "02",
    socials: [
      { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/jenniferlago.psi" },
      { kind: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@jenniferlago.psicologa" },
      { kind: "spotify", label: "Podcast", href: "https://open.spotify.com/show/6lV1VYO55jbOGj0DbMpDde" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/jennifer-lago-629837200" },
    ],
    bio: [
      "Psicóloga formada pelo UniCEUB em 2022, com formação básica em psicanálise pelo Corpo Freudiano de Brasília.",
      "Atende adolescentes e adultos em português, espanhol e inglês. Seu interesse de pesquisa está nos transtornos alimentares.",
    ],
    focus: ["Adolescentes e adultos", "Transtornos alimentares", "Português · Espanhol · Inglês"],
    education: [
      { period: "2018–2022", text: "Graduação em Psicologia — UniCEUB" },
      { period: "2021–2024", text: "Formação básica em psicanálise — Corpo Freudiano de Brasília" },
      { period: "2023–atual", text: "Mestrado — Arden University" },
    ],
    trajectory: {
      title: "Publicações",
      items: [
        { period: "2022", text: "Capítulo de livro acadêmico sobre preconceito" },
        { period: "2023", text: "E-book sobre o desenvolvimento e o tratamento dos transtornos alimentares" },
      ],
    },
    languages: ["Português", "Espanhol", "Inglês"],
  },
  {
    slug: "giovanna-alves-campos",
    name: "Giovanna Alves Campos",
    role: "Psicanalista",
    crp: "CRP 01/26138",
    photo: img("image-5.png"),
    index: "03",
    bio: [
      "Atende adolescentes, adultos e idosos, com uma abordagem humanizada e integrativa. Realiza atendimentos domiciliares, com foco na saúde mental na terceira idade.",
      "Tem interesse por relacionamentos de casal, transtornos de humor e estudos sobre masculinidade.",
    ],
    focus: ["Adolescentes, adultos e idosos", "Home saúde", "Transtornos de humor", "Casais"],
    education: [
      { period: "2022", text: "Graduação em Psicologia — UniCEUB" },
      { period: "2022–2024", text: "Formação básica em psicanálise — Corpo Freudiano de Brasília" },
    ],
    trajectory: {
      title: "Experiência e cursos",
      items: [
        { period: "2023–atual", text: "Psicóloga na Home Health Clinic — atendimento domiciliar a idosos" },
        { period: "2023", text: "Especialização em Clínica de Transtornos Alimentares — Instituto ESPE" },
        { period: "2020", text: "Formação em psiquiatria antimanicomial e estudos de neuropsicofarmacologia" },
        { period: "2019", text: "Oficina de prevenção de crise" },
      ],
    },
  },
];

export const services = [
  {
    n: "01",
    title: "Psicanálise",
    text: "Um percurso de escuta contínua, onde aquilo que se repete pode finalmente ser dito de outro modo. Atendimento individual e de casais, presencial em Brasília ou online.",
    photo: brand.teamSession,
    photoAlt: "Atendimento na Serenitah",
    photoPosition: "center 45%",
  },
  {
    n: "02",
    title: "Home Saúde",
    text: "Acompanhamento no ambiente da própria casa, para quem tem mobilidade reduzida ou precisa de continuidade no cuidado sem deslocamento.",
    photo: brand.teamPhoto,
    photoAlt: "Equipe da Serenitah",
    photoPosition: "center 25%",
  },
  {
    n: "03",
    title: "Transtornos Alimentares",
    text: "Cuidado especializado para a relação com o corpo e com a comida, em trabalho conjunto com a rede de saúde quando necessário.",
    photo: brand.teamLaptop,
    photoAlt: "Equipe da Serenitah em reunião",
    photoPosition: "center 35%",
  },
  {
    n: "04",
    title: "Apoio à Parentalidade",
    text: "Um espaço para pais e responsáveis pensarem suas escolhas, os impasses do dia a dia e o vínculo com os filhos, sem julgamento.",
    photo: brand.teamMap,
    photoAlt: "Equipe da Serenitah",
    photoPosition: "center 35%",
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
