import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "@/data/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project || !project.detail) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.detail.overview.slice(0, 160),
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project || !project.detail) {
    notFound();
  }

  const categoryLabel = project.category === "ai-ml" ? "AI & ML" : "Full Stack";

  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium mb-8"
      >
        ← Back to projects
      </Link>

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">{project.title}</h1>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-2.5 py-1 rounded-full">
          {categoryLabel}
        </span>
        {project.status && (
          <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-full">
            {project.status}
          </span>
        )}
        {project.year && (
          <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-full">
            {project.year}
          </span>
        )}
      </div>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
        {project.detail.overview}
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 space-y-8">
          {project.detail.problem && (
            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
                The problem
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.detail.problem}
              </p>
            </div>
          )}

          <div>
            <h2 className="font-display text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
              How I built it
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.detail.architecture}
            </p>
          </div>

          {project.detail.challenges && (
            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
                What was hard
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.detail.challenges}
              </p>
            </div>
          )}

          {project.detail.learnings && (
            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
                What I learned
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.detail.learnings}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
              Highlights
            </h2>
            <ul className="space-y-2">
              {project.detail.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400"
                >
                  <span className="text-teal-500 mt-1 shrink-0">▹</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
              Role
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.detail.role}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techs.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-sm font-medium px-4 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition text-center"
              >
                View Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-sm font-medium px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-center"
              >
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
