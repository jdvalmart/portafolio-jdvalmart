import { useEffect, useRef, useState } from "react";

interface ScrollRevealResult<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>;
  isVisible: boolean;
}

/**
 * IntersectionObserver hook that tracks when an element enters the viewport.
 * Returns a ref to attach to the target element and an isVisible flag.
 *
 * Configured with:
 * - threshold: 0.1 (trigger when 10% of the element is visible)
 * - rootMargin: "0px 0px -50px 0px" (trigger slightly before the element enters)
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(): ScrollRevealResult<T> {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing to keep the element visible
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
}
