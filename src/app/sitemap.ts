import type { MetadataRoute } from "next";
import { decks } from "@/content/gallery";
import { projects } from "@/content/projects";
import { locales } from "@/i18n/config";
import { siteUrl, type SitePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: SitePath[] = ["", "/profile", "/projects", "/gallery", ...projects.map((p) => `/projects/${p.slug}` as const), ...decks.map((d) => `/gallery/${d.slug}` as const)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])) },
    })),
  );
}
