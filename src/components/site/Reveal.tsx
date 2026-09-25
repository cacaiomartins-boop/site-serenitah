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
