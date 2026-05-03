import type { Certification } from "../data/certifications";
import { certifications } from "../data/certifications";
import { useScrollReveal } from "../hooks/useScrollReveal";

function CertBadge({ cert, animate }: { cert: Certification; animate: boolean }) {
  return (
    <div
      className={`
        flex flex-col items-center gap-2
        p-4 rounded-xl
        bg-teal-50 dark:bg-teal-950
        border border-teal-100 dark:border-teal-900
        text-center
        transition-all duration-500 ease-out
        ${
          animate
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }
      `}
    >
      <span
        className="
          w-12 h-12 rounded-full
          bg-teal-600 dark:bg-teal-500
          text-white text-sm font-bold
          flex items-center justify-center
        "
        aria-label={cert.name}
      >
        {cert.icon}
      </span>
      <span
        className="
          text-sm font-semibold leading-tight
          text-zinc-800 dark:text-zinc-200
        "
      >
        {cert.name}
      </span>
      <span
        className="
          text-xs font-medium
          text-zinc-500 dark:text-zinc-400
        "
      >
        {cert.issuer}
      </span>
    </div>
  );
}

export function CertBadges() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2
        className="
          text-2xl sm:text-3xl font-bold text-center mb-10
          text-zinc-900 dark:text-zinc-100
        "
      >
        Certifications
      </h2>

      <div
        ref={ref}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {certifications.map((cert) => (
          <CertBadge
            key={cert.name}
            cert={cert}
            animate={isVisible}
          />
        ))}
      </div>
    </section>
  );
}

export default CertBadges;
