import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { ContactForm } from "@/components/site/ContactForm";
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

function Home() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="grain min-h-screen overflow-x-hidden">
      <ProgressRail />
      <WhatsAppFloat />

      {/* ————— Abertura ————— */}
      <header className="relative px-6 pb-24 pt-8 md:px-16 lg:px-24">
        <div className="flex items-center justify-between">
          <img src={brand.mark} alt="Serenitah" className="h-10 w-10" />
          <a
            href="#contato"
            data-cursor="cta"
            className="label-meta press border-b border-wine pb-1 text-foreground"
          >
            Agendar sessão
          </a>
        </div>

        <div className="relative mt-16 md:mt-24">
          <span className="label-meta">Psicanálise · Brasília — DF</span>
          <h1
            className="mt-6 max-w-[16ch] text-[15vw] leading-[0.86] tracking-[-0.02em] md:text-[9.5vw]"
            style={{ transform: `translateY(${y * -0.06}px)` }}
          >
            Reencontrar o <em className="text-wine">equilíbrio</em> leva tempo.
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-1">
              Terapia profissional para quem quer entender a própria história
              sem pressa. Atendimento individual, de casais, presencial ou
              online.
            </p>
            <div
              className="relative md:col-span-7 md:col-start-6"
              style={{ transform: `translateY(${y * -0.12}px)` }}
            >
              <div
                data-cursor="grow"
                data-cursor-label="o espaço"
                className="mask-arch overflow-hidden"
              >
                <img
                  src={brand.room}
                  alt="Consultório da Serenitah em Brasília"
                  className="ken h-[46vh] w-full object-cover md:h-[62vh]"
                  style={{ filter: "sepia(0.22) saturate(0.9) contrast(1.02)" }}
                />
              </div>
              <span className="label-meta absolute -left-6 top-6 hidden rotate-180 [writing-mode:vertical-rl] md:block">
                SHN · Asa Norte
              </span>
            </div>
          </div>

          {/* pilares como anotações */}
          <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-3 md:mt-0 md:max-w-xs">
            {[
              "Auto conhecimento",
              "Confidencial",
              "Acolhimento",
              "Bem-estar",
            ].map((p, i) => (
              <li key={p} className="label-meta">
                <sup className="mr-1 text-clay">{i + 1}</sup>
                {p}
              </li>
            ))}
          </ul>

          <nav className="mt-20 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-5">
            {chapters.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                data-cursor="cta"
                className="label-meta press hover:text-foreground"
              >
                {c.n} {c.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ————— 01 Sobre ————— */}
      <section id="sobre" className="px-6 py-28 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="label-meta">01 — Quem somos</span>
            <ul className="mt-8 space-y-2">
              {[
                "Análise Individual",
                "Saúde Mental e Bem-estar",
                "Psicoterapia Especializada",
                "Suporte Emocional",
              ].map((t) => (
                <li
                  key={t}
                  className="label-meta border-l border-clay pl-3 normal-case tracking-normal"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <ReadingReveal
              text="Estamos aqui para cuidar de você. A Serenitah é uma clínica de psicanálise em Brasília dedicada à escuta: do que se diz, do que se cala e do que se repete."
              className="font-display text-3xl leading-[1.2] md:text-5xl"
            />
            <Reveal delay={120}>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Atendemos adultos, casais, adolescentes e famílias, no
                consultório da Asa Norte ou online. Cada processo é conduzido
                por psicanalistas, com sigilo integral e sem fórmulas prontas —
                o percurso é construído no ritmo de quem o vive.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div
                data-cursor="grow"
                className="mt-12 overflow-hidden mask-organic"
              >
                <img
                  src={brand.session}
                  alt="Atendimento na Serenitah"
                  loading="lazy"
                  className="ken h-[40vh] w-full object-cover md:h-[52vh]"
                  style={{ filter: "sepia(0.25) saturate(0.85)" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— 02 Cuidados ————— */}
      <section
        id="cuidados"
        className="bg-secondary/60 px-6 py-28 md:px-16 lg:px-24"
      >
        <span className="label-meta">02 — Cuidados</span>
        <h2 className="mt-4 max-w-[12ch] text-[12vw] leading-[0.9] md:text-[7vw]">
          Como podemos te ajudar?
        </h2>
        <div className="mt-20 space-y-24">
          {services.map((s, i) => (
            <Reveal key={s.n}>
              <article
                className={`grid items-end gap-6 md:grid-cols-12 ${
                  i % 2 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="md:col-span-5 md:[direction:ltr]">
                  <span className="label-meta">{s.n}</span>
                  <h3 className="mt-2 font-display text-4xl md:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                  <a
                    href={whatsappLink(
                      `Olá! Gostaria de saber mais sobre ${s.title}.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="cta"
                    className="label-meta press mt-6 inline-block border-b border-wine pb-1 text-foreground"
                  >
                    Conversar sobre isso
                  </a>
                </div>
                <div className="md:col-span-6 md:col-start-7 md:[direction:ltr]">
                  <div
                    data-cursor="grow"
                    className={`overflow-hidden ${i % 2 ? "mask-organic" : "mask-arch"}`}
                  >
                    <img
                      src={i % 2 ? brand.session : brand.room}
                      alt={s.title}
                      loading="lazy"
                      className="ken h-[34vh] w-full object-cover md:h-[46vh]"
                      style={{ filter: "sepia(0.24) saturate(0.88)" }}
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— 03 Processo ————— */}
      <section id="processo" className="px-6 py-28 md:px-16 lg:px-24">
        <span className="label-meta">03 — Processo</span>
        <h2 className="mb-20 mt-4 font-display text-[10vw] leading-none md:text-[6vw]">
          Conheça nosso processo
        </h2>
        <ProcessLine />
      </section>

      {/* ————— 04 Equipe ————— */}
      <section id="equipe" className="px-6 py-28 md:pl-16 lg:pl-24">
        <div className="flex items-end justify-between pr-6 md:pr-16">
          <div>
            <span className="label-meta">04 — Equipe</span>
            <h2 className="mt-4 font-display text-[11vw] leading-none md:text-[6vw]">
              Quem escuta
            </h2>
          </div>
          <span className="label-meta hidden md:block">arraste →</span>
        </div>
        <DragRow className="mt-14">
          {therapists.map((t) => (
            <Link
              key={t.slug}
              to="/equipe/$slug"
              params={{ slug: t.slug }}
              data-cursor="grow"
              data-cursor-label="ver mais"
              className="group w-[78vw] shrink-0 snap-start md:w-[34vw]"
            >
              <div className="overflow-hidden bg-card mask-arch">
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  draggable={false}
                  className="ken h-[52vh] w-full object-cover object-top"
                  style={{ filter: "sepia(0.2) saturate(0.9)" }}
                />
              </div>
              <div className="mt-4 transition-transform duration-500 group-hover:-translate-y-1">
                <span className="label-meta">{t.index}</span>
                <h3 className="font-display text-2xl">{t.name}</h3>
                <p className="label-meta mt-1">{t.role}</p>
              </div>
            </Link>
          ))}
        </DragRow>
      </section>

      {/* ————— 05 Perguntas ————— */}
      <section
        id="perguntas"
        className="bg-secondary/60 px-6 py-28 md:px-16 lg:px-24"
      >
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="label-meta">05 — Perguntas</span>
            <h2 className="mt-4 font-display text-5xl leading-none">
              Antes da
              <br />
              primeira
              <br />
              sessão
            </h2>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <Faq />
          </div>
        </div>
      </section>

      {/* ————— 06 Contato ————— */}
      <section id="contato" className="px-6 py-28 md:px-16 lg:px-24">
        <span className="label-meta">06 — Contato</span>
        <h2 className="mt-4 text-[13vw] leading-none md:text-[8vw]">
          Vamos conversar?
        </h2>
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <div className="space-y-8 md:col-span-4">
            <div>
              <span className="label-meta">Telefone</span>
              <a
                href={whatsappLink("Olá! Vim pelo site da Serenitah.")}
                target="_blank"
                rel="noreferrer"
                data-cursor="cta"
                className="block font-display text-3xl"
              >
                {brand.phoneLabel}
              </a>
            </div>
            <div>
              <span className="label-meta">E-mail</span>
              <a
                href={`mailto:${brand.email}`}
                data-cursor="cta"
                className="block break-all text-lg"
              >
                {brand.email}
              </a>
            </div>
            <div>
              <span className="label-meta">Endereço</span>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {brand.address}
              </p>
            </div>
            <iframe
              title="Mapa — Serenitah, Asa Norte, Brasília"
              loading="lazy"
              className="h-56 w-full border border-border grayscale-[0.4]"
              src="https://www.google.com/maps?q=SHN%20Asa%20Norte%20Bras%C3%ADlia%2070701-040&output=embed"
            />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-border px-6 py-10 md:px-16 lg:px-24">
        <img
          src={brand.mark}
          alt="Serenitah"
          data-cursor="cta"
          className="h-10 w-10 transition-transform duration-1000 hover:scale-110"
        />
        <p className="label-meta">
          © {new Date().getFullYear()} {brand.name} — Todos os direitos
          reservados
        </p>
      </footer>
    </div>
  );
}
