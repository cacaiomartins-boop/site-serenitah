import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  brand,
  chapters,
  isWithinHours,
  services,
  therapists,
  whatsappLink,
} from "@/data/clinic";
import { ProgressRail } from "@/components/site/ProgressRail";
import { Reveal, ReadingReveal, ScrollReveal } from "@/components/site/Reveal";
import { ProcessLine } from "@/components/site/ProcessLine";
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

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function OpenNow() {
  const [on, setOn] = useState<boolean | null>(null);
  useEffect(() => setOn(isWithinHours()), []);
  if (on === null) return null;
  return (
    <span className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-paper px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${on ? "animate-pulse bg-emerald-500" : "bg-clay/60"}`} />
      {on ? "Aberto agora" : "Fechado agora"}
    </span>
  );
}

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
      <div data-reveal="left" className="flex items-center gap-4">
        <span className="font-mono text-sm text-clay">{n}</span>
        <span className="h-px w-10 bg-clay/60" />
        <span className="label-meta">{label}</span>
      </div>
      <h2 data-reveal="up" style={d(120)} className="mt-3 text-[2rem] leading-[1.14] tracking-[-0.02em] md:mt-4 md:text-5xl lg:text-[3.6vw]">
        {title}
      </h2>
    </div>
  );
}

function Home() {
  const teamRef = useRef<HTMLDivElement>(null);
  const [teamEnd, setTeamEnd] = useState(false);

  useEffect(() => {
    const el = teamRef.current;
    if (!el) return;
    const check = () => setTeamEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
    check();
    el.addEventListener("scroll", check, { passive: true });
    return () => el.removeEventListener("scroll", check);
  }, []);

  const nextTeam = () => {
    const el = teamRef.current;
    if (!el) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const first = el.children[0] as HTMLElement | undefined;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: (first?.getBoundingClientRect().width ?? 300) + gap, behavior: "smooth" });
  };

  return (
    <div className="grain min-h-screen overflow-x-hidden">
      <ScrollReveal />
      <ProgressRail />
      <WhatsAppFloat />

      {/* ————— Abertura — ambiente ao fundo ————— */}
      <header className="relative flex min-h-[100svh] flex-col overflow-hidden bg-coffee px-5 pb-7 pt-5 md:block md:min-h-0 md:px-12 md:pb-16 md:pt-6 lg:px-20">
        <div className="absolute inset-x-0 -top-[14%] bottom-0" data-parallax aria-hidden>
          <img
            src={brand.room}
            alt=""
            className="hero-zoom h-full w-full object-cover"
            style={{ filter: "sepia(0.22) saturate(0.9)" }}
          />
          {/* escuro e opaco à esquerda (texto) → revela o ambiente à direita */}
          <div className="absolute inset-0 bg-gradient-to-r from-coffee/90 via-coffee/55 via-45% to-coffee/0 max-md:from-coffee/80 max-md:via-coffee/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee/85 via-coffee/10 to-coffee/45 max-md:from-coffee/75 max-md:via-coffee/5" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col md:block">
          <div style={d(0)} className="enter flex items-center justify-between gap-6 border-b border-cream/20 pb-4 md:pb-5">
            <a href="#" className="flex items-center gap-3">
              <img src={brand.mark} alt="" className="h-11 w-11 rounded-full bg-cream/95 p-1.5 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.6)]" />
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

          <div className="mt-auto grid items-end gap-10 pb-[3.6rem] pt-10 md:mt-14 md:grid-cols-12 md:pb-0 md:pt-0">
            <div className="md:col-span-7">
              <span style={d(200)} className="enter chip max-md:border-cream/30 max-md:bg-cream/90 max-md:px-3 max-md:py-1.5 max-md:text-xs"><span className="h-2 w-2 rounded-full bg-wine" /> Psicanálise · Asa Norte, Brasília</span>
              <h1 style={d(320)} className="enter mt-5 text-[13.5vw] leading-[0.9] tracking-[-0.03em] text-cream md:mt-8 md:text-[7.4vw] lg:text-[6.6vw]">
                Reencontrar o <em className="text-[color-mix(in_oklab,var(--clay)_72%,white)] [text-shadow:0_2px_28px_rgba(20,8,4,0.55)]">equilíbrio</em> leva tempo.
              </h1>
              <p style={d(520)} className="enter mt-4 max-w-lg text-[0.95rem] leading-relaxed text-cream/80 md:mt-6 md:text-xl">
                Escuta profissional para quem quer entender a própria história sem pressa. Atendimento individual e de casais, presencial ou online.
              </p>
              <div style={d(680)} className="enter mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap md:items-center md:gap-4">
                <a href="#contato" className="btn-solid-light max-md:w-full max-md:justify-center">Agendar primeira sessão <Arrow /></a>
                <a href="#cuidados" className="btn-line-light max-md:hidden">Ver cuidados</a>
              </div>
              <p style={d(820)} className="enter mt-5 flex items-center justify-center gap-2 text-center font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream/70 md:hidden">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" /> Seg a sex, 8h às 19h · Presencial e online
              </p>
            </div>
            <div style={d(760)} className="enter relative hidden md:col-span-5 md:flex md:self-stretch">
              <div className="max-w-[17rem] overflow-hidden rounded-2xl border border-cream/30 bg-cream/95 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.65)] backdrop-blur-sm md:ml-auto md:flex md:h-full md:flex-col">
                <div className="h-1.5 shrink-0 bg-gradient-to-r from-clay via-wine to-clay" />
                <div className="p-6 md:flex md:flex-1 md:flex-col md:gap-4 md:p-7">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-wine" />
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-clay">Horário</span>
                    <OpenNow />
                  </div>
                  <p className="mt-3 font-display text-[1.7rem] leading-[1.08] md:mt-0 md:text-[2.2rem]">Seg a sex,<br />8h às 19h</p>
                  <div className="hidden items-center gap-1.5 md:flex" aria-label="Segunda a sexta">
                    {["S", "T", "Q", "Q", "S", "S", "D"].map((l, i) => (
                      <span key={i} className={`grid h-7 w-7 place-items-center rounded-full font-mono text-[0.65rem] ${i < 5 ? "bg-coffee text-cream" : "border border-dashed border-border text-muted-foreground/60"}`}>{l}</span>
                    ))}
                  </div>
                  <div className="hidden grid-cols-2 gap-2 md:grid">
                    <div className="rounded-xl bg-coffee/[0.05] px-3 py-2.5">
                      <p className="font-display text-xl leading-none">50 min</p>
                      <p className="mt-1 text-xs text-muted-foreground">por sessão</p>
                    </div>
                    <div className="rounded-xl bg-coffee/[0.05] px-3 py-2.5">
                      <p className="font-display text-xl leading-none">Semanal</p>
                      <p className="mt-1 text-xs text-muted-foreground">frequência comum</p>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-border pt-3 md:mt-auto md:pt-4">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {["Presencial na Asa Norte e online", "Sigilo integral em todas as sessões", "Primeira conversa sem compromisso"].map((t) => (
                        <li key={t} className="flex items-start gap-2.5">
                          <svg viewBox="0 0 16 16" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m3 8.5 3.2 3L13 4.5" /></svg>
                          {t}
                        </li>
                      ))}
                    </ul>
                    <a href="#contato" className="mt-4 hidden items-center justify-between rounded-full bg-coffee px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cream transition-colors hover:bg-wine md:flex">
                      Agendar horário <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ————— 01 Sobre ————— */}
      <section id="sobre" className="bg-sand px-5 py-12 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-[1440px] gap-7 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHead n="01" label="Quem somos" title={<>Estamos aqui para <em className="text-clay">cuidar</em> de você.</>} />
            <div data-reveal="scale" className="mt-5 overflow-hidden mask-organic md:mt-6">
              <img src={brand.session} alt="Atendimento na Serenitah" loading="lazy" className="ken h-[210px] w-full object-cover object-[center_42%] md:h-[300px]" style={{ filter: "sepia(0.25) saturate(0.85)" }} />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <ReadingReveal
              text="A Serenitah é uma clínica de psicanálise em Brasília dedicada à escuta: do que se diz, do que se cala e do que se repete."
              className="font-display text-[1.3rem] leading-[1.35] md:text-[1.75rem]"
            />
            <Reveal delay={120}>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground md:mt-5 md:text-base">
                Atendemos adultos, casais, adolescentes e famílias, no consultório da Asa Norte ou online. Cada processo é conduzido por psicanalistas, com sigilo integral e sem fórmulas prontas — o percurso é construído no ritmo de quem o vive.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-5 flex flex-wrap gap-2 md:mt-6 md:grid md:grid-cols-2 md:gap-2.5">
                {["Análise individual", "Saúde mental e bem-estar", "Psicoterapia especializada", "Suporte emocional"].map((t, i) => (
                  <div key={t} data-reveal="up" style={d(i * 90)} className="flex items-center gap-2 rounded-full border border-border bg-paper px-3.5 py-2 md:panel md:gap-3 md:rounded-[1.25rem] md:px-4 md:py-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay md:h-2 md:w-2" />
                    <span className="text-[0.8rem] md:text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— 02 Cuidados ————— */}
      <section id="cuidados" className="bg-background px-5 py-12 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-3 md:gap-5">
          <SectionHead n="02" label="Cuidados" title={<>Como podemos<br />te ajudar?</>} />
          <p className="whitespace-nowrap text-[clamp(0.66rem,2.95vw,0.9rem)] text-muted-foreground">Cada cuidado parte da mesma base: tempo, escuta e sigilo.</p>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-clay md:hidden">Deslize para o lado →</span>
        </div>
        <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-10 md:block md:space-y-4 md:overflow-visible md:px-0 md:pb-0">
          {services.map((s, i) => (
            <Reveal key={s.n} className="w-[78vw] max-w-[19rem] shrink-0 snap-start md:w-auto md:max-w-none">
              <article className={`panel grid items-center gap-6 overflow-hidden p-5 max-md:flex max-md:h-full max-md:flex-col-reverse max-md:gap-0 max-md:p-0 md:p-6 lg:grid-cols-12 ${i % 2 ? "bg-blush/50" : ""}`}>
                <div className={`lg:col-span-6 max-md:flex max-md:flex-1 max-md:flex-col max-md:p-4 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <span className="font-mono text-sm text-clay">{s.n}</span>
                  <h3 className="mt-1 text-[1.6rem] leading-tight md:mt-2 md:text-4xl">{s.title}</h3>
                  <p className="mt-2 max-w-lg text-[0.9rem] leading-relaxed text-muted-foreground max-md:line-clamp-4 md:mt-3 md:text-base">{s.text}</p>
                  <a href={whatsappLink(`Olá! Gostaria de saber mais sobre ${s.title}.`)} target="_blank" rel="noreferrer" className="btn-line mt-4 max-md:mt-auto max-md:justify-center max-md:!px-4 max-md:!py-2.5 max-md:!text-[0.7rem] md:mt-5">
                    Conversar sobre isso →
                  </a>
                </div>
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                  <div className={`overflow-hidden max-md:!rounded-none ${i % 2 ? "mask-organic" : "mask-arch"}`}>
                    <img src={s.photo} alt={s.photoAlt} loading="lazy" className="ken h-[150px] w-full object-cover md:h-[250px]" style={{ filter: "sepia(0.18) saturate(0.9)", objectPosition: s.photoPosition }} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* ————— 03 Processo ————— */}
      <section id="processo" className="bg-blush/60 px-5 py-12 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
        <SectionHead n="03" label="Processo" title="Conheça nosso processo" className="mb-7 md:mb-10" />
        <ProcessLine />
        </div>
      </section>

      {/* ————— 04 Equipe ————— */}
      <section id="equipe" className="bg-coffee px-5 py-12 text-cream md:px-12 md:py-20 lg:px-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div data-reveal="left" className="flex items-center gap-4">
              <span className="font-mono text-sm text-clay">04</span>
              <span className="h-px w-12 bg-clay/60" />
              <span className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-cream/60">Equipe</span>
            </div>
            <h2 data-reveal="up" style={d(120)} className="mt-3 text-[2rem] leading-[1] md:mt-4 md:text-5xl lg:text-[3.6vw]">Quem <em className="text-clay">escuta</em></h2>
          </div>
          <button type="button" onClick={nextTeam} data-cursor="cta" className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cream/85 transition-colors hover:bg-cream hover:text-coffee md:text-xs">{teamEnd ? "← Voltar ao início" : "Próximo →"}</button>
        </div>
        <div ref={teamRef} className="-mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] max-md:gap-3 md:mx-0 md:mt-8 md:px-0 [&::-webkit-scrollbar]:hidden">
          {therapists.map((t, i) => (
            <Link key={t.slug} data-reveal="up" style={d(i * 120)} to="/equipe/$slug" params={{ slug: t.slug }} className="group w-[66vw] max-w-[21rem] shrink-0 snap-start rounded-3xl border border-cream/15 bg-cream/5 p-2.5 md:p-3 transition-colors hover:bg-cream/10 md:w-[24vw]">
              <div className="overflow-hidden rounded-2xl bg-sand mask-arch">
                <img src={t.photo} alt={t.name} loading="lazy" draggable={false} className="ken h-[250px] w-full object-cover object-top md:h-[300px]" style={{ filter: "sepia(0.2) saturate(0.9)" }} />
              </div>
              <div className="flex items-end justify-between gap-4 px-2 pb-1 pt-4">
                <div>
                  <span className="font-mono text-sm text-clay">{t.index}</span>
                  <h3 className="mt-1 text-xl leading-tight md:text-2xl">{t.name}</h3>
                  <p className="mt-1 text-sm text-cream/60">{t.role}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/30 md:h-11 md:w-11 transition-all group-hover:bg-clay group-hover:border-clay">→</span>
              </div>
            </Link>
          ))}
          {[0, 1].map((i) => (
            <div key={`soon-${i}`} data-reveal="up" style={d((therapists.length + i) * 120)} className="w-[66vw] max-w-[21rem] shrink-0 snap-start rounded-3xl border border-dashed border-cream/20 bg-cream/[0.03] p-2.5 md:w-[24vw] md:p-3" aria-label="Nova profissional em breve">
              <div className="grid h-[250px] place-items-center overflow-hidden rounded-2xl border border-dashed border-cream/15 bg-cream/[0.04] mask-arch md:h-[300px]">
                <svg viewBox="0 0 64 64" className="h-20 w-20 text-cream/20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden>
                  <circle cx="32" cy="24" r="9" />
                  <path d="M14 54c2-11 9-17 18-17s16 6 18 17" />
                </svg>
              </div>
              <div className="flex items-end justify-between gap-4 px-2 pb-1 pt-4">
                <div>
                  <span className="font-mono text-sm text-clay/70">{String(therapists.length + i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-xl leading-tight text-cream/60 md:text-2xl">Em breve</h3>
                  <p className="mt-1 text-sm text-cream/40">Novo profissional</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-dashed border-cream/20 text-cream/30 md:h-11 md:w-11" aria-hidden>…</span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ————— 05 Perguntas ————— */}
      <section id="perguntas" className="bg-sand px-5 py-9 md:px-12 md:py-12 lg:px-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
            <div>
              <div data-reveal="left" className="flex items-center gap-3">
                <span className="font-mono text-sm text-clay">05</span>
                <span className="h-px w-8 bg-clay/60" />
                <span className="label-meta">Perguntas</span>
              </div>
              <h2 data-reveal="up" style={d(120)} className="mt-2 text-2xl leading-tight md:text-3xl">Antes da primeira sessão</h2>
            </div>
            <a href={whatsappLink("Olá! Tenho uma dúvida sobre o atendimento.")} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground underline decoration-clay/50 underline-offset-4 transition-colors hover:text-wine hover:decoration-wine">
              Outra dúvida? Fale pelo WhatsApp
            </a>
          </div>
          <div className="mt-5">
            <Faq />
          </div>
        </div>
      </section>

      {/* ————— 06 Contato ————— */}
      <section id="contato" className="bg-background px-3 py-8 md:px-10 md:py-14 lg:px-16">
        <div data-reveal="scale" className="relative mx-auto grid max-w-[1180px] gap-6 overflow-hidden rounded-[1.75rem] bg-coffee p-5 text-cream md:rounded-[2rem] shadow-[0_40px_80px_-50px_rgba(43,22,18,0.7)] md:p-10 lg:grid-cols-12 lg:gap-10">
          {/* brilho decorativo */}
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-clay/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-wine/30 blur-3xl" />

          <div className="relative lg:col-span-7">
            <h2 data-reveal="up" style={d(120)} className="text-[2.1rem] leading-[1] tracking-[-0.02em] md:text-5xl">
              Vamos <em className="text-clay">conversar</em>?
            </h2>
            <p className="mt-2 max-w-md text-[0.9rem] text-cream/70 md:mt-3 md:text-base">O primeiro passo é uma mensagem. Respondemos em horário comercial.</p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2 md:mt-7 md:gap-3">
              {[
                {
                  k: "WhatsApp", v: brand.phoneLabel, href: whatsappLink("Olá! Vim pelo site da Serenitah."),
                  icon: <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2l1.5 3.5-1.8 1.2a9 9 0 0 0 4.1 4.1l1.2-1.8L16 12.5v2c0 .8-.7 1.5-1.5 1.5C8.7 16 4 11.3 4 5.5Z" />,
                },
                {
                  k: "Horário", v: "Seg a sex, 8h às 19h",
                  icon: <><circle cx="10" cy="10" r="6.5" /><path d="M10 6.5V10l2.5 1.5" /></>,
                },
                {
                  k: "E-mail", v: brand.email, href: `mailto:${brand.email}`, wide: true,
                  icon: <><rect x="3" y="5" width="14" height="10" rx="1.5" /><path d="m3.5 6 6.5 5 6.5-5" /></>,
                },
                {
                  k: "Endereço", v: brand.address, wide: true,
                  href: "https://www.google.com/maps?q=SHN%20Asa%20Norte%20Bras%C3%ADlia%2070701-040",
                  icon: <><path d="M10 17s-5.5-4.6-5.5-9a5.5 5.5 0 0 1 11 0c0 4.4-5.5 9-5.5 9Z" /><circle cx="10" cy="8" r="2" /></>,
                },
              ].map((r, ri) => {
                const inner = (
                  <>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-clay/20 md:h-10 md:w-10 text-clay transition-colors group-hover:bg-clay group-hover:text-cream">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{r.icon}</svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cream/50">{r.k}</span>
                      <span className={`mt-1 block text-[0.95rem] leading-snug break-words`}>{r.v}</span>
                    </span>
                  </>
                );
                const cls = `group flex items-center gap-3 rounded-2xl border border-cream/12 bg-cream/[0.06] p-3 md:gap-3.5 md:p-4 transition-colors ${r.wide ? "sm:col-span-2" : ""}`;
                return r.href ? (
                  <a key={r.k} data-reveal="up" style={d(ri * 90)} href={r.href} target="_blank" rel="noreferrer" className={`${cls} hover:border-clay/60 hover:bg-cream/10`}>{inner}</a>
                ) : (
                  <div key={r.k} data-reveal="up" style={d(ri * 90)} className={cls}>{inner}</div>
                );
              })}
            </div>

            <a data-reveal="up" style={d(420)} href={whatsappLink("Olá! Vim pelo site da Serenitah.")} target="_blank" rel="noreferrer" className="btn-solid-light mt-5 max-md:w-full max-md:justify-between md:mt-7">
              Agendar pelo WhatsApp <Arrow />
            </a>
          </div>

          <div data-reveal="right" style={d(200)} className="relative lg:col-span-5">
            <div className="h-full overflow-hidden rounded-[1.5rem] border border-cream/15 lg:min-h-[30rem]">
              <iframe title="Mapa — Serenitah, Asa Norte, Brasília" loading="lazy" className="h-64 w-full lg:h-full lg:min-h-[30rem]" style={{ filter: "grayscale(0.55) sepia(0.2) contrast(0.95)" }} src="https://www.google.com/maps?q=SHN%20Asa%20Norte%20Bras%C3%ADlia%2070701-040&output=embed" />
            </div>
          </div>
        </div>
      </section>

      <footer data-reveal="fade" className="bg-coffee px-5 pb-24 pt-8 text-cream md:px-12 md:pb-8 lg:px-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6">
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
