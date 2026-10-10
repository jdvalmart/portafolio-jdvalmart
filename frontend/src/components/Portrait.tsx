"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Professional portrait with a graceful fallback.
 *
 * Drop the photo at `public/portrait.jpg`. Until then (or if it fails to
 * load) an initials block is shown instead of a broken image.
 */
export function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-600 to-amber-500 text-white">
          <span className="font-display text-6xl font-bold tracking-tight">JDV</span>
        </div>
      ) : (
        <Image
          src="/portrait.jpg"
          alt="Portrait of Juan David Valencia"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
