import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion } from "../../../motion/gsap.js";

export function useGlassDataMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = prefersReducedMotion();
    const desktop = window.matchMedia("(min-width: 981px)").matches;

    const ctx = gsap.context(() => {
      const nodes = root.querySelectorAll("[data-node]");
      const paths = root.querySelectorAll("[data-path]");
      const core = root.querySelector("[data-core]");
      const assembled = root.querySelector("[data-assembled]");

      if (reduced) return;

      gsap.set(assembled, { opacity: 0 });
      gsap.set(core, { opacity: 0.45 });

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      if (!desktop) {
        gsap.from(nodes, {
          y: 16,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        });
        gsap.to([core, assembled], {
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: core, start: "top 86%", once: true },
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 55%",
          scrub: 1.1,
        },
      });

      nodes.forEach((node, index) => {
        tl.fromTo(node, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, ease: "none" }, index * 0.16);
        const path = paths[index];
        if (!path) return;
        tl.to(path, { strokeDashoffset: 0, duration: 0.9, ease: "none" }, index * 0.16 + 0.08);
      });
      tl.to(core, { opacity: 1, duration: 0.6, ease: "none" }, 0.85);
      tl.to(assembled, { opacity: 1, duration: 0.5, ease: "none" }, 1.05);
    }, root);

    return () => ctx.revert();
  }, []);
}
