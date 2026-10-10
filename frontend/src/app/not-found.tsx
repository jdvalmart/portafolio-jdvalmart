import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto py-32 px-6 text-center">
      <p className="text-6xl font-extrabold text-teal-600 dark:text-teal-400 mb-4">404</p>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Page not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition"
      >
        Back home
      </Link>
    </div>
  );
}
