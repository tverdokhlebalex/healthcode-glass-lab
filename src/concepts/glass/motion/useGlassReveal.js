import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion } from "../../../motion/gsap.js";

export function useGlassReveal(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const copy = root.querySelector("[data-copy]");
      const extras = root.querySelectorAll("[data-face], [data-fore], [data-behind], [data-surface], [data-visual], [data-orb]");

      if (copy) {
        gsap.from(copy, {
          y: 24,
          opacity: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: copy, start: "top 84%", once: true },
        });
      }

      extras.forEach((el) => {
        gsap.from(el, {
          y: 18,
          opacity: 0,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);
}
