import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type ErrorComponentProps,
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { brand } from "@/data/clinic";
import { homeDescription, homeTitle, ogImage, siteUrl } from "@/lib/seo";

const fontsHref =
  "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Archivo:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap";

// Marca o HTML como "com JavaScript" (os efeitos de rolagem só escondem o conteúdo
// quando o JS está ativo) e carrega as fontes sem bloquear a primeira renderização.
const bootScript = `document.documentElement.classList.add("js");(function(){var l=document.createElement("link");l.rel="stylesheet";l.href="${fontsHref}";document.head.appendChild(l)})();`;

const pageShell = "flex min-h-screen items-center justify-center bg-coffee px-6 text-cream";
const solidButton =
  "inline-flex items-center justify-center rounded-full bg-cream px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-coffee transition-colors hover:bg-clay hover:text-cream";

function NotFoundComponent() {
  return (
    <main className={pageShell}>
      <div className="max-w-md text-center">
        <p className="font-mono text-sm text-clay">404</p>
        <h1 className="mt-3 font-display text-4xl leading-tight">Página não encontrada</h1>
        <p className="mt-3 text-cream/70">
          O endereço que você acessou não existe ou foi movido. Volte para o início para continuar.
        </p>
        <div className="mt-8">
          <Link to="/" className={solidButton}>
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <main className={pageShell}>
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl leading-tight">Esta página não carregou</h1>
        <p className="mt-3 text-cream/70">
          Algo deu errado do nosso lado. Tente atualizar ou volte para o início.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={solidButton}
          >
            Tentar de novo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-cream/30 px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-coffee"
          >
            Ir para o início
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#39261e" },
      { title: homeTitle },
      { name: "description", content: homeDescription },
      { name: "google-site-verification", content: "G-rs8olwiLM-hsCZdQn9swHM3ku9Rzr5EsDbRpmE22c" },
      { property: "og:site_name", content: brand.name },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: homeTitle },
      { property: "og:description", content: homeDescription },
      { property: "og:url", content: `${siteUrl}/` },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", as: "style", href: fontsHref },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "256x256" },
      { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [{ children: bootScript }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
