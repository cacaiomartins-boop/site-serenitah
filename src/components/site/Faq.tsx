import { useMemo, useState } from "react";
import { faqs } from "@/data/clinic";

export function Faq() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return faqs;
    return faqs.filter(
      (f) => f.q.toLowerCase().includes(t) || f.a.toLowerCase().includes(t),
    );
  }, [q]);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar uma pergunta"
        className="w-full rounded-full border border-border bg-paper px-6 py-4 text-lg outline-none placeholder:text-muted-foreground focus:border-clay"
      />
      <ul className="mt-6 space-y-3">
        {list.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className="panel px-6">
              <button
                data-cursor="cta"
                onClick={() => setOpen(isOpen ? null : i)}
                className="press flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-xl leading-snug md:text-2xl">
                  {f.q}
                </span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-lg transition-all duration-300 ${isOpen ? "rotate-45 bg-coffee text-cream" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-500"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
        {list.length === 0 && (
          <li className="py-8 text-sm text-muted-foreground">
            Nada encontrado. Fale com a gente pelo WhatsApp.
          </li>
        )}
      </ul>
    </div>
  );
}
