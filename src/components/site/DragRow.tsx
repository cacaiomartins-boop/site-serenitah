import { useRef, type ReactNode } from "react";

/** Horizontal drag scroller with inertia (native momentum + pointer drag). */
export function DragRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    v: 0,
    last: 0,
    raf: 0,
  });

  const glide = () => {
    const el = ref.current;
    const s = state.current;
    if (!el) return;
    s.v *= 0.94;
    el.scrollLeft -= s.v;
    if (Math.abs(s.v) > 0.4) s.raf = requestAnimationFrame(glide);
  };

  return (
    <div
      ref={ref}
      data-cursor="grow"
      data-cursor-label="arraste"
      className={`flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden ${className}`}
      onPointerDown={(e) => {
        const el = ref.current!;
        cancelAnimationFrame(state.current.raf);
        state.current = {
          down: true,
          startX: e.clientX,
          startLeft: el.scrollLeft,
          v: 0,
          last: e.clientX,
          raf: 0,
        };
        el.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const s = state.current;
        if (!s.down || !ref.current) return;
        s.v = e.clientX - s.last;
        s.last = e.clientX;
        ref.current.scrollLeft = s.startLeft - (e.clientX - s.startX);
      }}
      onPointerUp={() => {
        state.current.down = false;
        state.current.raf = requestAnimationFrame(glide);
      }}
    >
      {children}
    </div>
  );
}
