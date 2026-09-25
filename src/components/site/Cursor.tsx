import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [mode, setMode] = useState<"idle" | "grow" | "cta">("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (t) {
        const v = t.getAttribute("data-cursor") || "";
        setMode(v === "cta" ? "cta" : "grow");
        setLabel(t.getAttribute("data-cursor-label"));
      } else {
        setMode("idle");
        setLabel(null);
      }
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const size = mode === "grow" ? 92 : mode === "cta" ? 56 : 12;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden items-center justify-center rounded-full border border-cream/60 bg-clay/85 text-[0.6rem] uppercase tracking-[0.2em] text-cream mix-blend-normal transition-[width,height,opacity] duration-300 md:flex"
      style={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        fontFamily: "var(--font-mono)",
      }}
    >
      {label}
    </div>
  );
}
