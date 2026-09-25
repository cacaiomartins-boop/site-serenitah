import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal-line ${className}`}
    >
      {children}
    </div>
  );
}

/** Reveals a paragraph line by line as it enters the viewport. */
export function ReadingReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { ref, shown } = useInView<HTMLParagraphElement>(0.3);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          data-shown={shown}
          className="reveal-line inline-block"
          style={{ transitionDelay: `${Math.min(i * 28, 900)}ms` }}
        >
          {w}&nbsp;
        </span>
      ))}
    </p>
  );
}

/** Revela elementos marcados com data-reveal ao rolar, e aplica um leve parallax no fundo do topo. */
export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | undefined;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => {
        el.dataset.in = "true";
      });
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            el.dataset.in = "true";
            io?.unobserve(el);
            const delay = parseInt(el.style.getPropertyValue("--d")) || 0;
            // depois da animação, devolve o elemento ao estilo normal (hover, etc.)
            window.setTimeout(() => {
              delete el.dataset.reveal;
              delete el.dataset.in;
            }, 1100 + delay);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      els.forEach((el) => io!.observe(el));
    }

    const bg = document.querySelector<HTMLElement>("[data-parallax]");
    let raf = 0;
    const onScroll = () => {
      if (!bg || reduce) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 1200);
        bg.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
