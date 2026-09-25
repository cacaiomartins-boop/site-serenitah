import { useEffect, useState } from "react";
import { chapters } from "@/data/clinic";

export function ProgressRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("sobre");

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1));
      let current = chapters[0]?.id ?? "sobre";
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4)
          current = c.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-px w-full bg-border/60">
        <div
          className="h-px bg-wine transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {chapters.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            data-cursor="cta"
            className="group flex items-center gap-2 label-meta press"
          >
            <span
              className={`h-px transition-all duration-500 ${
                active === c.id ? "w-8 bg-wine" : "w-3 bg-border"
              }`}
            />
            <span
              className={`transition-opacity duration-300 ${
                active === c.id
                  ? "text-foreground opacity-100"
                  : "opacity-0 group-hover:opacity-70"
              }`}
            >
              {c.n} {c.label}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}
