import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { brand, therapists, whatsappLink } from "@/data/clinic";

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
    const desc = t.bio[0];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: TherapistPage,
});

function TherapistPage() {
  const { t } = Route.useLoaderData();
  const [curtain, setCurtain] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setCurtain(false), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="grain min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[55] bg-wine transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: curtain ? "translateY(0)" : "translateY(-100%)" }}
      />
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-8 md:px-16">
        <Link to="/" data-cursor="cta" className="label-meta">
          ← Serenitah
        </Link>
        <img src={brand.mark} alt="" className="h-9 w-9" />
      </header>

      <main className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 pb-28 md:grid-cols-12 md:px-16">
        <div className="md:col-span-5">
          <div data-cursor="grow" className="overflow-hidden bg-card mask-arch">
            <img
              src={t.photo}
              alt={t.name}
              className="ken h-[62vh] w-full object-cover object-top"
              style={{ filter: "sepia(0.2) saturate(0.9)" }}
            />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <span className="label-meta">{t.index} — Equipe</span>
          <h1 className="mt-4 text-[10vw] leading-[0.9] md:text-[4.5vw]">
            {t.name}
          </h1>
          <p className="label-meta mt-3">{t.role}</p>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            {t.focus.map((f) => (
              <li key={f} className="label-meta border-l border-clay pl-3">
                {f}
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink(
              `Olá! Gostaria de agendar uma sessão com ${t.name}.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-solid mt-12"
          >
            Agendar com {t.name.split(" ")[0]}
          </a>
        </div>
      </main>
    </div>
  );
}
