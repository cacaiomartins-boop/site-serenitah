import { useState } from "react";
import { brand, whatsappLink } from "@/data/clinic";

const field =
  "mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-base outline-none placeholder:text-muted-foreground focus:border-clay transition-colors";

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
          className="btn-solid"
        >
          Enviar pelo WhatsApp <span className="btn-dot">→</span>
        </button>
        <a
          href={`mailto:${brand.email}`}
          className="text-sm text-muted-foreground underline underline-offset-4"
        >
          ou escreva para {brand.email}
        </a>
      </div>
    </form>
  );
}
