import { site, t } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <p>© 2026 {site.name}</p>
          <p>{t.footer.builtWith}</p>
          <div className="flex items-center gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={site.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              HuggingFace
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-teal-600 dark:hover:text-teal-400 transition"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
