import { useState } from "react";
import { faqs } from "@/data/clinic";

function Row({
  f,
  isOpen,
  onToggle,
  delay = 0,
}: {
  delay?: number;
  f: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li data-reveal="up" style={{ "--d": `${delay}ms` } as React.CSSProperties} className="border-b border-clay/25">
      <button
        data-cursor="cta"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="press flex w-full items-center justify-between gap-4 py-3 text-left"
      >
        <span className="text-[0.95rem] leading-snug">{f.q}</span>
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border border-clay/40 text-sm text-clay transition-all duration-300 ${isOpen ? "rotate-45 bg-coffee text-cream" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-3 pr-8 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
        </div>
      </div>
    </li>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const half = Math.ceil(faqs.length / 2);
  const cols = [faqs.slice(0, half), faqs.slice(half)];

  return (
    <div className="grid gap-x-10 md:grid-cols-2">
      {cols.map((col, c) => (
        <ul key={c} className="self-start border-t border-clay/25">
          {col.map((f, i) => {
            const idx = c * half + i;
            return (
              <Row
                key={f.q}
                delay={i * 70}
                f={f}
                isOpen={open === idx}
                onToggle={() => setOpen(open === idx ? null : idx)}
              />
            );
          })}
        </ul>
      ))}
    </div>
  );
}
