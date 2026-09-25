import { createFileRoute, Link } from "@tanstack/react-router";
import {
  brand,
  chapters,
  services,
  therapists,
  whatsappLink,
} from "@/data/clinic";
import { ProgressRail } from "@/components/site/ProgressRail";
import { Reveal, ReadingReveal } from "@/components/site/Reveal";
import { ProcessLine } from "@/components/site/ProcessLine";
import { DragRow } from "@/components/site/DragRow";
import { Faq } from "@/components/site/Faq";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Serenitah Terapias Integradas — Psicanálise em Brasília",
      },
      {
        name: "description",
        content:
          "Clínica de psicanálise na Asa Norte, Brasília. Análise individual, casais, transtornos alimentares, home saúde e apoio à parentalidade. Presencial e online.",
      },
      {
        property: "og:title",
        content: "Serenitah Terapias Integradas — Psicanálise em Brasília",
      },
      {
        property: "og:description",
        content:
          "Escuta profissional para reencontrar o equilíbrio. Atendimento presencial na Asa Norte e online.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          name: brand.name,
          telephone: "+556194026563",
          email: brand.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "SHN, Edifício Fusion Work e Live, Asa Norte",
            addressLocality: "Brasília",
            addressRegion: "DF",
            postalCode: "70701-040",
            addressCountry: "BR",
          },
          employee: therapists.map((t) => ({
            "@type": "Person",
            name: t.name,
            jobTitle: t.role,
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const Arrow = () => (
  <span className="btn-dot" aria-hidden>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  </span>
);

function SectionHead({ n, label, title, className = "" }: { n: string; label: string; title: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-clay">{n}</span>
        <span className="h-px w-12 bg-clay/60" />
        <span className="label-meta">{label}</span>
      </div>
      <h2 className="mt-6 text-5xl leading-[0.95] tracking-[-0.02em] md:text-7xl lg:text-[5.5vw]">
        {title}
      </h2>
    </div>
  );
}

function Home() {
  return (
    <div className="grain min-h-screen overflow-x-hidden">
      <ProgressRail />
      <WhatsAppFloat />

      {/* ————— Abertura — ambiente ao fundo ————— */}
      <header className="relative overflow-hidden bg-coffee px-6 pb-12 pt-6 md:px-12 md:pb-16 lg:px-20">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={brand.room}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "sepia(0.22) saturate(0.9)" }}
          />
          {/* escuro e opaco à esquerda (texto) → revela o ambiente à direita */}
          <div className="absolute inset-0 bg-gradient-to-r from-coffee/90 via-coffee/55 via-45% to-coffee/0 max-md:from-coffee/80 max-md:via-coffee/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee/85 via-coffee/10 to-coffee/45 max-md:from-coffee/75 max-md:via-coffee/5" />
        </div>

        <div className="relative mx-auto max-w-[1440px]">
          <div className="flex items-center justify-between gap-6 border-b border-cream/20 pb-5">
            <a href="#" className="flex items-center gap-3">
              <img src={brand.mark} alt="" className="h-11 w-11" />
              <span className="font-display text-xl leading-none text-cream">
                Serenitah
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cream/60">
                  Terapias Integradas
                </span>
              </span>
            </a>
            <nav className="hidden items-center gap-7 lg:flex">
              {chapters.map((c) => (
                <a key={c.id} href={`#${c.id}`} className="text-sm text-cream/70 transition-colors hover:text-cream">
                  {c.label}
                </a>
              ))}
            </nav>
            <a href="#contato" className="btn-line-light">Agendar</a>
          </div>

          <div className="mt-10 grid items-end gap-10 md:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="chip"><span className="h-2 w-2 rounded-full bg-wine" /> Psicanálise · Asa Norte, Brasília</span>
              <h1 className="mt-8 text-[14vw] leading-[0.9] tracking-[-0.03em] text-cream md:text-[10vw] lg:text-[6.6vw]">
                Reencontrar o <em className="text-clay">equilíbrio</em> leva tempo.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75 md:text-xl">
                Escuta profissional para quem quer entender a própria história sem pressa. Atendimento individual e de casais, presencial ou online.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#contato" className="btn-solid-light">Agendar primeira sessão <Arrow /></a>
                <a href="#cuidados" className="btn-line-light">Ver cuidados</a>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div className="max-w-[17rem] overflow-hidden rounded-2xl border border-cream/30 bg-cream/95 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.65)] backdrop-blur-sm lg:ml-auto">
                <div className="h-1.5 bg-gradient-to-r from-clay via-wine to-clay" />
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-wine" />
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-clay">Horário</span>
                  </div>
                  <p className="mt-3 font-display text-[1.7rem] leading-[1.08]">Seg a sex,<br />8h às 19h</p>
                  <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">Presencial e online</p>
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/15 bg-cream/15 md:mt-16 md:grid-cols-4">
            {["Autoconhecimento", "Sigilo integral", "Acolhimento", "Bem-estar"].map((p, i) => (
              <li key={p} className="group bg-cream/90 px-4 py-5 backdrop-blur-sm transition-colors hover:bg-cream md:px-6 md:py-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-clay">0{i + 1}</span>
                  <span className="h-px flex-1 bg-clay/30 transition-colors group-hover:bg-clay/60" aria-hidden />
                </div>
                <p className="mt-2 break-words font-display text-base md:text-xl lg:text-2xl">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ————— 01 Sobre ————— */}
      <section id="sobre" className="bg-sand px-6 py-28 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead n="01" label="Quem somos" title={<>Estamos aqui para <em className="text-clay">cuidar</em> de você.</>} />
            <div className="mt-10 overflow-hidden mask-organic">
              <img src={brand.session} alt="Atendimento na Serenitah" loading="lazy" className="ken h-[380px] w-full object-cover object-[center_42%]" style={{ filter: "sepia(0.25) saturate(0.85)" }} />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <ReadingReveal
              text="A Serenitah é uma clínica de psicanálise em Brasília dedicada à escuta: do que se diz, do que se cala e do que se repete."
              className="font-display text-3xl leading-[1.25] md:text-4xl"
            />
            <Reveal delay={120}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Atendemos adultos, casais, adolescentes e famílias, no consultório da Asa Norte ou online. Cada processo é conduzido por psicanalistas, com sigilo integral e sem fórmulas prontas — o percurso é construído no ritmo de quem o vive.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {["Análise individual", "Saúde mental e bem-estar", "Psicoterapia especializada", "Suporte emocional"].map((t) => (
                  <div key={t} className="panel flex items-center gap-3 px-5 py-4">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-clay" />
                    <span className="text-base">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— 02 Cuidados ————— */}
      <section id="cuidados" className="bg-background px-6 py-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead n="02" label="Cuidados" title={<>Como podemos<br />te ajudar?</>} />
          <p className="max-w-sm text-lg text-muted-foreground">Cada cuidado parte da mesma base: tempo, escuta e sigilo.</p>
        </div>
        <div className="mt-16 space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.n}>
              <article className={`panel grid items-center gap-8 overflow-hidden p-6 md:p-8 lg:grid-cols-12 ${i % 2 ? "bg-blush/50" : ""}`}>
                <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <span className="font-mono text-sm text-clay">{s.n}</span>
                  <h3 className="mt-3 text-4xl leading-tight md:text-5xl">{s.title}</h3>
                  <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{s.text}</p>
                  <a href={whatsappLink(`Olá! Gostaria de saber mais sobre ${s.title}.`)} target="_blank" rel="noreferrer" className="btn-line mt-8">
                    Conversar sobre isso →
                  </a>
                </div>
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                  <div className={`overflow-hidden ${i % 2 ? "mask-organic" : "mask-arch"}`}>
                    <img src={s.photo} alt={s.photoAlt} loading="lazy" className="ken h-[300px] w-full object-cover md:h-[360px]" style={{ filter: "sepia(0.18) saturate(0.9)", objectPosition: s.photoPosition }} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* ————— 03 Processo ————— */}
      <section id="processo" className="bg-blush/60 px-6 py-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
        <SectionHead n="03" label="Processo" title="Conheça nosso processo" className="mb-16" />
        <ProcessLine />
        </div>
      </section>

      {/* ————— 04 Equipe ————— */}
      <section id="equipe" className="bg-coffee px-6 py-28 text-cream md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-clay">04</span>
              <span className="h-px w-12 bg-clay/60" />
              <span className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-cream/60">Equipe</span>
            </div>
            <h2 className="mt-6 text-5xl leading-[0.95] md:text-7xl lg:text-[5.5vw]">Quem <em className="text-clay">escuta</em></h2>
          </div>
          <span className="font-mono text-sm uppercase tracking-[0.18em] text-cream/60">Arraste para o lado →</span>
        </div>
        <DragRow className="mt-14">
          {therapists.map((t) => (
            <Link key={t.slug} to="/equipe/$slug" params={{ slug: t.slug }} className="group w-[80vw] max-w-[28rem] shrink-0 snap-start rounded-3xl border border-cream/15 bg-cream/5 p-4 transition-colors hover:bg-cream/10 md:w-[30vw]">
              <div className="overflow-hidden rounded-2xl bg-sand mask-arch">
                <img src={t.photo} alt={t.name} loading="lazy" draggable={false} className="ken h-[420px] w-full object-cover object-top" style={{ filter: "sepia(0.2) saturate(0.9)" }} />
              </div>
              <div className="flex items-end justify-between gap-4 px-2 pb-2 pt-5">
                <div>
                  <span className="font-mono text-sm text-clay">{t.index}</span>
                  <h3 className="mt-1 text-2xl leading-tight md:text-3xl">{t.name}</h3>
                  <p className="mt-1 text-sm text-cream/60">{t.role}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/30 transition-all group-hover:bg-clay group-hover:border-clay">→</span>
              </div>
            </Link>
          ))}
        </DragRow>
        </div>
      </section>

      {/* ————— 05 Perguntas ————— */}
      <section id="perguntas" className="bg-sand px-6 py-24 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead n="05" label="Perguntas" title={<>Antes da primeira sessão</>} />
          <div className="mt-12 max-w-4xl">
            <Faq />
          </div>
          <p className="mt-10 max-w-4xl text-lg text-muted-foreground">
            Ficou alguma dúvida?{" "}
            <a href={whatsappLink("Olá! Tenho uma dúvida sobre o atendimento.")} target="_blank" rel="noreferrer" className="font-normal text-foreground underline decoration-clay/50 underline-offset-4 transition-colors hover:text-wine hover:decoration-wine">
              Fale com a gente pelo WhatsApp.
            </a>
          </p>
        </div>
      </section>

      {/* ————— 06 Contato ————— */}
      <section id="contato" className="bg-background px-6 py-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
        <SectionHead n="06" label="Contato" title={<>Vamos <em className="text-wine">conversar</em>?</>} />
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="space-y-10 lg:col-span-5 lg:pt-2">
            <div>
              <span className="label-meta">WhatsApp</span>
              <a href={whatsappLink("Olá! Vim pelo site da Serenitah.")} target="_blank" rel="noreferrer" className="mt-1 block font-display text-3xl transition-colors hover:text-wine md:text-4xl">{brand.phoneLabel}</a>
            </div>
            <div>
              <span className="label-meta">E-mail</span>
              <a href={`mailto:${brand.email}`} className="mt-1 block break-all text-lg transition-colors hover:text-wine md:text-xl">{brand.email}</a>
            </div>
            <div>
              <span className="label-meta">Horário</span>
              <p className="mt-1 text-lg md:text-xl">Seg a sex, 8h às 19h</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <a href="https://www.google.com/maps?q=SHN%20Asa%20Norte%20Bras%C3%ADlia%2070701-040" target="_blank" rel="noreferrer" className="group inline-flex flex-wrap items-baseline gap-x-3 transition-colors hover:text-wine">
              <span className="label-meta">Endereço</span>
              <span className="font-display text-xl underline decoration-clay/40 underline-offset-4 transition-colors group-hover:decoration-wine md:text-2xl">{brand.address}</span>
            </a>
            <iframe title="Mapa — Serenitah, Asa Norte, Brasília" loading="lazy" className="mt-4 h-72 w-full grayscale-[0.4] md:h-[26rem]" src="https://www.google.com/maps?q=SHN%20Asa%20Norte%20Bras%C3%ADlia%2070701-040&output=embed" />
          </div>
        </div>
        </div>
      </section>

      <footer className="bg-coffee px-6 py-12 text-cream md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={brand.mark} alt="Serenitah" className="h-10 w-10 rounded-full bg-cream p-1" />
            <span className="font-display text-xl">{brand.name}</span>
          </div>
          <p className="text-sm text-cream/60">© {new Date().getFullYear()} — Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
