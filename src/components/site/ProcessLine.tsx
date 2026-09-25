import { useEffect, useRef, useState } from "react";
import { steps } from "@/data/clinic";

export function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight * 0.5;
      const passed = window.innerHeight * 0.85 - r.top;
      setP(Math.min(Math.max(passed / total, 0), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="relative grid gap-6 max-md:pl-8 md:grid-cols-3 md:gap-6">
      <div aria-hidden className="absolute bottom-2 left-[9px] top-2 w-px bg-border md:hidden">
        <div className="w-px bg-wine transition-[height] duration-200" style={{ height: `${p * 100}%` }} />
      </div>
      <svg
        className="pointer-events-none absolute left-0 top-6 hidden h-6 w-full md:block"
        viewBox="0 0 1000 20"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M10 10 C 200 -8, 300 26, 500 10 S 800 -6, 990 10"
          fill="none"
          stroke="currentColor"
          className="text-border"
          strokeWidth="1"
        />
        <path
          d="M10 10 C 200 -8, 300 26, 500 10 S 800 -6, 990 10"
          fill="none"
          stroke="currentColor"
          className="text-wine"
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - p}
        />
      </svg>
      {steps.map((s, i) => (
        <div key={s.n} data-reveal="up" style={{ "--d": `${i * 140}ms` } as React.CSSProperties} className="relative pt-0 md:pt-14"><span aria-hidden className={`absolute -left-8 top-1 h-[19px] w-[19px] rounded-full border-[3px] border-blush bg-clip-padding transition-colors duration-500 md:hidden ${p > (i + 0.2) / 3 ? "bg-wine" : "bg-border"}`} /><div className="panel h-full p-5 max-md:border-0 max-md:bg-transparent max-md:p-0 max-md:shadow-none">
          <span
            className={`absolute left-0 top-[30px] hidden h-3 w-3 -translate-y-1 rounded-full md:left-1/2 md:-translate-x-1/2 transition-colors duration-500 md:block ${
              p > (i + 0.4) / 3 ? "bg-wine" : "bg-border"
            }`}
          />
          <span className="font-mono text-sm text-clay">{s.n}</span>
          <h3 className="mt-1 font-display text-[1.45rem] md:mt-2 md:text-3xl">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {s.text}
          </p>
        </div></div>
      ))}
    </div>
  );
}
