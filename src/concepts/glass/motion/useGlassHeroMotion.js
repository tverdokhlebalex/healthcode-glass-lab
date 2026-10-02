import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion } from "../../../motion/gsap.js";

function draw(path, vars) {
  const length = path.getTotalLength();
  return gsap.fromTo(
    path,
    { strokeDasharray: length, strokeDashoffset: length },
    { strokeDashoffset: 0, ease: "power3.out", ...vars },
  );
}

export function useGlassHeroMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = prefersReducedMotion();
    const desktop = window.matchMedia("(min-width: 981px)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let onMove;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const light = root.querySelector("[data-light]");
      const lines = root.querySelectorAll("[data-title-line]");
      const main = root.querySelector("[data-main]");
      const layers = root.querySelectorAll("[data-layer]");
      const paths = root.querySelectorAll("[data-gold] path");
      const lead = root.querySelector("[data-lead]");
      const cta = root.querySelector("[data-cta]");
      const copy = root.querySelector("[data-copy]");
      const plane = root.querySelector("[data-plane]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(light, { opacity: 0 }, { opacity: 1, duration: 1.1 }, 0);
      tl.fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.15, stagger: 0.08, ease: "power4.out" },
        0.18,
      );
      tl.fromTo(
        main,
        { y: 36, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2 },
        0.42,
      );
      tl.fromTo(layers, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, 0.68);
      paths.forEach((path, index) => {
        draw(path, { duration: 1.25, delay: 0.82 + index * 0.08 });
      });
      tl.fromTo([lead, cta], { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 }, 1.02);

      if (desktop) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=88%",
              scrub: 1.15,
            },
          })
          .to(copy, { y: -72, scale: 0.9, opacity: 0.28, ease: "none" }, 0)
          .to(main, { y: 20, scale: 1.03, ease: "none" }, 0)
          .to(plane, { scale: 1.08, opacity: 0.45, ease: "none" }, 0)
          .to(
            layers,
            {
              x: (index) => (index % 2 ? 36 : -28),
              y: (index) => (index % 2 ? -40 : 48),
              opacity: 0.28,
              ease: "none",
            },
            0,
          );
      }

      if (desktop && fine) {
        const items = [
          { el: root.querySelector("[data-bg]"), amp: 2 },
          { el: plane, amp: 3 },
          { el: main, amp: 4 },
          ...[...layers].map((el, index) => ({ el, amp: 7 + index * 1.4 })),
        ].filter((item) => item.el);

        const movers = items.map((item) => ({
          ...item,
          xTo: gsap.quickTo(item.el, "x", { duration: 0.85, ease: "power3.out" }),
          yTo: gsap.quickTo(item.el, "y", { duration: 0.85, ease: "power3.out" }),
        }));

        onMove = (event) => {
          const rect = root.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;
          movers.forEach((item) => {
            item.xTo(nx * item.amp);
            item.yTo(ny * item.amp);
          });
        };

        root.addEventListener("pointermove", onMove);
      }
    }, root);

    return () => {
      if (onMove) root.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);
}
