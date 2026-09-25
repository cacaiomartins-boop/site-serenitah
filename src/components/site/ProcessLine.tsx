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
    <div ref={ref} className="relative grid gap-16 md:grid-cols-3 md:gap-10">
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
        <div key={s.n} className="relative pt-0 md:pt-16"><div className="panel h-full p-7">
          <span
            className={`absolute left-0 top-[6px] hidden h-3 w-3 rounded-full transition-colors duration-500 md:block ${
              p > (i + 0.4) / 3 ? "bg-wine" : "bg-border"
            }`}
          />
          <span className="font-mono text-sm text-clay">{s.n}</span>
          <h3 className="mt-3 font-display text-3xl md:text-4xl">{s.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {s.text}
          </p>
        </div></div>
      ))}
    </div>
  );
}
