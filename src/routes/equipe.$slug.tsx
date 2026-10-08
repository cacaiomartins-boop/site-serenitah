import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { brand, imgSize, therapists, whatsappLink, type Social, type TimelineItem } from "@/data/clinic";
import { personSchema, seoHead } from "@/lib/seo";
import { ScrollReveal } from "@/components/site/Reveal";

export function SocialIcon({ kind }: { kind: Social["kind"] }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (kind === "instagram") return (<svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" /></svg>);
  if (kind === "linkedin") return (<svg {...common}><path d="M7 10v7" /><circle cx="7" cy="7" r="0.7" /><path d="M11 17v-7M11 13a3 3 0 0 1 6 0v4" /></svg>);
  if (kind === "tiktok") return (<svg {...common}><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.5 2.5 2.2 4 5 4.2" /></svg>);
  return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M7 9.5c3.5-1 7-.7 10 1M7.5 12.8c3-.8 6-.5 8.5 1M8.2 15.7c2.5-.6 5-.3 7 .8" /></svg>);
}

export const Route = createFileRoute("/equipe/$slug")({
  loader: ({ params }) => {
    const t = therapists.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return { t };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Perfil indisponível — Serenitah" },
          { name: "robots", content: "noindex" },
        ],
      };
    const { t } = loaderData;
    const title = `${t.name} — ${t.role} | Serenitah`;
    const seo = seoHead({
      title,
      description: t.bio[0] ?? "",
      path: `/equipe/${t.slug}`,
      type: "profile",
    });
    return {
      meta: seo.meta,
      links: seo.links,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(personSchema(t)) }],
    };
  },
  component: TherapistPage,
});

const rise = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-5 border-l border-clay/30 pl-6">
      {items.map((it) => (
        <li key={`${it.period ?? ""}${it.text}`} className="relative">
          <span aria-hidden className="absolute -left-[1.85rem] top-[0.45rem] h-2.5 w-2.5 rounded-full border-2 border-sand bg-clay" />
          {it.period && <span className="font-mono text-xs uppercase tracking-[0.16em] text-clay">{it.period}</span>}
          <p className="mt-0.5 text-[0.95rem] leading-relaxed md:text-base">{it.text}</p>
        </li>
      ))}
    </ol>
  );
}

function TherapistPage() {
  const { t } = Route.useLoaderData();
  const [curtain, setCurtain] = useState(true);
  const first = t.name.split(" ")[0];
  const others = therapists.filter((x) => x.slug !== t.slug);

  useEffect(() => {
    const id = setTimeout(() => setCurtain(false), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="grain min-h-screen overflow-x-hidden bg-background">
      <ScrollReveal />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[55] bg-wine transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: curtain ? "translateY(0)" : "translateY(-100%)" }}
      />

      {/* ————— Abertura ————— */}
      <section className="relative overflow-hidden bg-coffee px-5 pb-12 pt-5 text-cream md:px-12 md:pb-20 lg:px-20">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-clay/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-wine/30 blur-3xl" />
        <div className="relative mx-auto max-w-[1180px]">
          <header className="enter flex items-center justify-between gap-4 border-b border-cream/20 pb-4 md:pb-5">
            <Link to="/" data-cursor="cta" className="flex items-center gap-3">
              <img src={brand.mark} alt="" {...imgSize(brand.mark)} className="h-10 w-10 rounded-full bg-cream/95 p-1.5" />
              <span className="font-display text-lg leading-none">
                Serenitah
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream/60">Terapias Integradas</span>
              </span>
            </Link>
            <Link to="/" hash="equipe" className="btn-line-light max-md:!px-4 max-md:!py-2 max-md:!text-[0.7rem]">← Equipe</Link>
          </header>

          <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-center md:gap-12">
            <div className="enter md:col-span-5" style={rise(150)}>
              <div data-cursor="grow" className="mx-auto max-w-[24rem] overflow-hidden rounded-2xl bg-sand mask-arch md:max-w-none">
                <img
                  src={t.photo}
                  alt={t.name}
                  {...imgSize(t.photo)}
                  fetchPriority="high"
                  decoding="async"
                  className="h-[46vh] max-h-[520px] w-full object-cover object-top md:h-[58vh]"
                  style={{ filter: "sepia(0.2) saturate(0.9)" }}
                />
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="enter flex flex-wrap items-center gap-2.5" style={rise(250)}>
                <span className="font-mono text-sm text-clay">{t.index}</span>
                <span className="h-px w-8 bg-clay/60" />
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-cream/60">Equipe</span>
              </div>
              <h1 className="enter mt-3 text-[2.4rem] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-[3.4vw]" style={rise(350)}>
                {t.name}
              </h1>
              <div className="enter mt-4 flex flex-wrap items-center gap-2" style={rise(450)}>
                <span className="chip border-cream/25 bg-cream/90 text-coffee"><span className="h-2 w-2 rounded-full bg-wine" /> {t.role}</span>
                <span className="rounded-full border border-cream/25 px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-cream/75">{t.crp}</span>
              </div>
              <div className="enter mt-6 max-w-xl space-y-4 text-[0.98rem] leading-relaxed text-cream/80 md:text-lg" style={rise(550)}>
                {t.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="enter mt-6 flex flex-wrap gap-2" style={rise(650)}>
                {t.focus.map((f) => (
                  <li key={f} className="rounded-full border border-cream/20 bg-cream/[0.06] px-3.5 py-1.5 text-[0.8rem] text-cream/85">
                    {f}
                  </li>
                ))}
              </ul>
              <div className="enter mt-8 flex flex-col gap-3 md:flex-row md:items-center" style={rise(750)}>
                <a
                  href={whatsappLink(`Olá! Gostaria de agendar uma sessão com ${t.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-solid-light max-md:w-full max-md:justify-center"
                >
                  Agendar com {first}
                </a>
                <a href="#formacao" className="btn-line-light max-md:hidden">Ver formação</a>
              </div>
              {t.socials && (
                <div className="enter mt-5 flex flex-wrap gap-2" style={rise(850)}>
                  {t.socials.map((so) => (
                    <a key={so.kind} href={so.href} target="_blank" rel="noreferrer" aria-label={`${so.label} de ${first}`} className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-3.5 py-2 text-[0.8rem] text-cream/85 transition-colors hover:bg-cream hover:text-coffee">
                      <SocialIcon kind={so.kind} /> {so.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ————— Formação e trajetória ————— */}
      <section id="formacao" className="bg-sand px-5 py-12 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div data-reveal="left" className="flex items-center gap-3">
              <span className="h-px w-8 bg-clay/60" />
              <span className="label-meta">Formação</span>
            </div>
            <h2 data-reveal="up" style={rise(100)} className="mt-3 text-[1.9rem] leading-tight md:text-4xl">Onde estudou</h2>
            <div data-reveal="up" style={rise(200)} className="mt-6">
              <Timeline items={t.education} />
            </div>
          </div>

          <div className="space-y-10">
            {t.trajectory && (
              <div>
                <div data-reveal="left" className="flex items-center gap-3">
                  <span className="h-px w-8 bg-clay/60" />
                  <span className="label-meta">Trajetória</span>
                </div>
                <h2 data-reveal="up" style={rise(100)} className="mt-3 text-[1.9rem] leading-tight md:text-4xl">{t.trajectory.title}</h2>
                <div data-reveal="up" style={rise(200)} className="mt-6">
                  <Timeline items={t.trajectory.items} />
                </div>
              </div>
            )}

            {t.services && (
              <div data-reveal="up">
                <span className="label-meta">Atendimentos</span>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.services.map((sv) => (
                    <li key={sv} className="rounded-full border border-border bg-paper px-3.5 py-2 text-[0.85rem]">{sv}</li>
                  ))}
                </ul>
              </div>
            )}

            {t.languages && (
              <div data-reveal="up">
                <span className="label-meta">Idiomas</span>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.languages.map((l) => (
                    <li key={l} className="rounded-full border border-border bg-paper px-3.5 py-2 text-[0.85rem]">{l}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ————— Contato ————— */}
      <section className="bg-background px-3 py-8 md:px-10 md:py-14 lg:px-16">
        <div data-reveal="scale" className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[1.75rem] bg-coffee p-6 text-cream md:rounded-[2rem] md:p-10">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-clay/25 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <h2 className="text-[2rem] leading-[1] tracking-[-0.02em] md:text-4xl">
                Vamos <em className="text-clay">conversar</em>?
              </h2>
              <p className="mt-3 max-w-md text-[0.95rem] text-cream/70">
                {brand.address}
              </p>
              <p className="mt-1 text-[0.95rem] text-cream/70">{brand.phoneLabel} · {brand.email}</p>
            </div>
            <div className="md:col-span-5 md:justify-self-end">
              <a
                href={whatsappLink(`Olá! Gostaria de agendar uma sessão com ${t.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="btn-solid-light max-md:w-full max-md:justify-center"
              >
                Agendar com {first}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ————— Outras profissionais ————— */}
      <section className="bg-background px-5 pb-24 pt-2 md:px-12 md:pb-16 lg:px-20">
        <div className="mx-auto max-w-[1180px]">
          <span data-reveal="left" className="label-meta">Conheça também</span>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {others.map((o, i) => (
              <Link
                key={o.slug}
                to="/equipe/$slug"
                params={{ slug: o.slug }}
                data-reveal="up"
                style={rise(i * 100)}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-paper p-3 transition-colors hover:border-clay/60"
              >
                <img src={o.photo} alt={o.name} {...imgSize(o.photo)} loading="lazy" decoding="async" className="h-16 w-16 shrink-0 rounded-xl object-cover object-top" />
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-xs text-clay">{o.index}</span>
                  <p className="font-display text-lg leading-tight">{o.name}</p>
                  <p className="text-sm text-muted-foreground">{o.role}</p>
                </div>
                <span aria-hidden className="pr-2 font-mono text-clay transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
