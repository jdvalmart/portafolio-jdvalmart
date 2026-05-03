import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

interface StatsBarProps {
  stats: Stat[];
}

/**
 * Animated counter that counts from 0 to the target value
 * when triggered by the IntersectionObserver.
 */
function AnimatedCounter({
  value,
  suffix = "",
  animate,
}: {
  value: number;
  suffix?: string;
  animate: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const duration = 1000; // ms
    const fps = 60;
    const totalSteps = Math.ceil(duration / (1000 / fps));
    const increment = value / totalSteps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= totalSteps) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, Math.floor(duration / totalSteps));

    return () => clearInterval(timer);
  }, [animate, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function StatCard({ stat, animate }: { stat: Stat; animate: boolean }) {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        min-w-[140px] px-6 py-5
        bg-white rounded-2xl
        shadow-md shadow-zinc-200/50
        border border-zinc-100
        dark:bg-zinc-800 dark:border-zinc-700 dark:shadow-zinc-900/50
      "
    >
      <span
        className="
          text-3xl sm:text-4xl font-extrabold
          text-teal-600
          dark:text-teal-400
          tabular-nums
        "
      >
        <AnimatedCounter value={stat.value} suffix={stat.suffix} animate={animate} />
      </span>
      <span
        className="
          mt-1.5 text-sm font-medium
          text-zinc-500
          dark:text-zinc-400
        "
      >
        {stat.label}
      </span>
    </div>
  );
}

export function StatsBar({ stats }: StatsBarProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-12 px-4"
    >
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} animate={isVisible} />
        ))}
      </div>
    </section>
  );
}

export default StatsBar;
