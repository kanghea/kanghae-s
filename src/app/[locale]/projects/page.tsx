import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ui";
import { projects } from "@/content/projects";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/projects", { title: dict.projects.title, description: dict.projects.lead });
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <section className="relative overflow-hidden" aria-labelledby="projects-title">
        <div className="glow" style={{ top: "0%" }} aria-hidden="true" />
        <div className="wrap relative z-[1] pt-[clamp(56px,9vw,120px)] pb-[clamp(32px,5vw,56px)]">
          <p className="eyebrow rv">Projects</p>
          <h1 id="projects-title" className="h1 h1-sm rv d1">
            {dict.projects.title}
            <span className="num ml-3 align-top text-[0.4em] text-muted-2">{projects.length}</span>
          </h1>
          <p className="copy rv d2 mt-6">{dict.projects.lead}</p>
        </div>
      </section>
      <section className="pb-[clamp(72px,10vw,120px)]" aria-label={dict.projects.title}>
        <ul className="wrap m-0 grid list-none grid-cols-1 gap-[clamp(12px,1.6vw,20px)] p-0 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.slug} className={`rv ${["", "d1", "d2"][i % 3]}`}>
              <ProjectCard project={p} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
