import Link from "next/link";
import type { ComponentProps } from "react";

function Anchor({ href = "", children, ...props }: ComponentProps<"a">) {
  const className = "text-teal-600 dark:text-teal-400 font-medium hover:underline";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="font-display text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="font-display text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-5" {...props} />
  ),
  a: Anchor,
  ul: (props: ComponentProps<"ul">) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-teal-500 pl-5 italic text-zinc-600 dark:text-zinc-400 my-6"
      {...props}
    />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr className="border-zinc-200 dark:border-zinc-800 my-10" {...props} />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-zinc-900 dark:text-zinc-100" {...props} />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-sm text-teal-700 dark:text-teal-300"
      {...props}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="overflow-x-auto rounded-xl bg-zinc-900 dark:bg-zinc-950 p-4 mb-6 text-sm leading-relaxed text-zinc-100 border border-zinc-800"
      {...props}
    />
  ),
};
