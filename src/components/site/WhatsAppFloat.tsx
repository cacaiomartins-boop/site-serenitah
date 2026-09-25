import { useEffect, useState } from "react";
import { isWithinHours, whatsappLink } from "@/data/clinic";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(true);

  useEffect(() => setOnline(isWithinHours()), []);

  const note = online
    ? "Estamos online agora — respondemos em minutos."
    : "Estamos fora do horário. Responderemos no próximo dia útil.";
  const msg = online
    ? "Olá! Vim pelo site da Serenitah e gostaria de agendar uma sessão."
    : "Olá! Vim pelo site da Serenitah. Podem me retornar no próximo horário de atendimento?";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {open && (
        <p className="max-w-[15rem] bg-coffee px-4 py-3 text-xs leading-relaxed text-cream shadow-lg">
          {note}
        </p>
      )}
      <a
        href={whatsappLink(msg)}
        target="_blank"
        rel="noreferrer"
        data-cursor="cta"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="press flex h-14 w-14 items-center justify-center rounded-full bg-wine text-cream shadow-xl"
        aria-label="Falar pelo WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2s-1.2.3-3.9-.9c-3.3-1.5-5.3-5-5.5-5.2-.2-.2-1.3-1.7-1.3-3.3 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5l1 2.4c.1.2.1.4 0 .6l-.4.6c-.2.2-.4.4-.2.7.2.4.9 1.5 1.9 2.4 1.3 1.1 2.3 1.5 2.6 1.6.3.2.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2.3 1.1c.3.2.5.2.6.4.1.2.1.6-.1 1.1Z" />
        </svg>
      </a>
    </div>
  );
}
