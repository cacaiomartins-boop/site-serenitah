import { brand, therapists, type Therapist } from "@/data/clinic";

export const siteUrl = "https://www.serenitah.com";
export const ogImage = `${siteUrl}/og-image.jpg`;
const orgId = `${siteUrl}/#organization`;

export const homeTitle = "Serenitah Terapias Integradas — Psicanálise em Brasília";
export const homeDescription =
  "Clínica de psicanálise na Asa Norte, Brasília: análise individual e de casais, transtornos alimentares, home saúde e parentalidade. Presencial e online.";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "profile";
};

/** Corta o texto no limite (em palavra inteira) para caber na descrição do Google. */
export function clip(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Meta tags (SEO, Open Graph, Twitter) e canonical de uma página. */
export function seoHead({ title, description, path, image = ogImage, imageAlt, type = "website" }: PageSeo) {
  const url = `${siteUrl}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: clip(description) },
      { property: "og:type", content: type },
      { property: "og:title", content: title },
      { property: "og:description", content: clip(description) },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: imageAlt ?? "Equipe da Serenitah Terapias Integradas" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: clip(description) },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": orgId,
    name: brand.name,
    alternateName: brand.short,
    url: `${siteUrl}/`,
    description: homeDescription,
    image: ogImage,
    logo: `${siteUrl}/favicon.png`,
    telephone: "+5561994026563",
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "SHN, Edifício Fusion Work e Live, Asa Norte",
      addressLocality: "Brasília",
      addressRegion: "DF",
      postalCode: "70701-040",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    areaServed: { "@type": "City", name: "Brasília" },
    hasMap: "https://www.google.com/maps?q=SHN%20Asa%20Norte%20Bras%C3%ADlia%2070701-040",
    sameAs: [brand.instagram],
    employee: therapists.map((t) => ({
      "@type": "Person",
      "@id": `${siteUrl}/equipe/${t.slug}#person`,
      name: t.name,
      jobTitle: t.role,
      url: `${siteUrl}/equipe/${t.slug}`,
    })),
  };
}

export function personSchema(t: Therapist) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/equipe/${t.slug}#person`,
        name: t.name,
        jobTitle: t.role,
        description: t.bio[0] ?? "",
        identifier: t.crp,
        url: `${siteUrl}/equipe/${t.slug}`,
        image: `${siteUrl}${t.photo}`,
        worksFor: { "@id": orgId },
        ...(t.socials?.length ? { sameAs: t.socials.map((s) => s.href) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Equipe", item: `${siteUrl}/#equipe` },
          { "@type": "ListItem", position: 3, name: t.name, item: `${siteUrl}/equipe/${t.slug}` },
        ],
      },
    ],
  };
}
