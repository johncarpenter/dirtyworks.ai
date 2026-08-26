import { useEffect, useRef, type ReactNode } from 'react';

export interface EvidenceRailIslandProps {
  children?: ReactNode;
}

/**
 * Resolves the evidence rail into alignment on scroll.
 *
 * The rail's markup is server-rendered by EvidenceRail.astro in its finished, aligned state, and
 * this island never re-renders it — it only sets `data-animate` on the rail once it intersects,
 * which runs the fragments through the `dw-slide-into-alignment` keyframes and lands them exactly
 * where they already are. With no JavaScript, no IntersectionObserver, or a reduced-motion
 * preference, this is a no-op and the rail is already correct.
 */
export default function EvidenceRail({ children }: EvidenceRailIslandProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = hostRef.current?.querySelector<HTMLElement>('[data-evidence-rail]');
    if (!rail) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          rail.setAttribute('data-animate', 'true');
          observer.disconnect();
          return;
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  return <div ref={hostRef}>{children}</div>;
}
