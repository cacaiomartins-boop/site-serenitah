import { useState } from "react";
import { brand, whatsappLink } from "@/data/clinic";

const field =
  "w-full border-b border-border bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground focus:border-wine transition-colors";

export function ContactForm() {
  const [form, setForm] = useState({
    nome: "",
    celular: "",
    email: "",
    mensagem: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, sou ${form.nome}.\nCelular: ${form.celular}\nE-mail: ${form.email}\n\n${form.mensagem}`;
    window.open(whatsappLink(text), "_blank", "noopener");
  };

  return (
    <form onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label className="label-meta">Nome</label>
        <input
          required
          value={form.nome}
          onChange={set("nome")}
          className={field}
          placeholder="Como podemos te chamar"
        />
      </div>
      <div>
        <label className="label-meta">Celular</label>
        <input
          required
          value={form.celular}
          onChange={set("celular")}
          className={field}
          placeholder="(61) 90000-0000"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="label-meta">E-mail</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={set("email")}
          className={field}
          placeholder="seu@email.com"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="label-meta">Mensagem</label>
        <textarea
          rows={4}
          value={form.mensagem}
          onChange={set("mensagem")}
          className={field}
          placeholder="Conte brevemente o que te traz aqui"
        />
      </div>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          data-cursor="cta"
          className="press bg-wine px-8 py-4 text-sm uppercase tracking-[0.2em] text-cream"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Enviar mensagem
        </button>
        <a
          href={`mailto:${brand.email}`}
          className="label-meta underline underline-offset-4"
        >
          ou escreva para {brand.email}
        </a>
      </div>
    </form>
  );
}
