import { useLayoutEffect } from "react";
import { revealClip } from "./effects.js";
import { gsap, prefersReducedMotion } from "./gsap.js";

function drawIn(path, vars) {
  const length = path.getTotalLength();
  return gsap.fromTo(
    path,
    { strokeDasharray: length, strokeDashoffset: length },
    { strokeDashoffset: 0, ease: "power3.out", ...vars },
  );
}

export function useCinematicMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const canvas = root.querySelector("[data-canvas]");
      const zoom = root.querySelector("[data-zoom]");
      const photo = root.querySelector("img");
      const copy = root.querySelector("[data-copy]");
      const notes = root.querySelectorAll("[data-note]");
      const path = root.querySelector("[data-hero-path]");
      const drop = root.querySelector("[data-drop]");
      const dropDot = root.querySelector("[data-drop-dot]");
      const values = root.querySelectorAll("[data-note] strong");
      const steps = root.querySelectorAll("[data-sequence] li");

      // Порядок: шапка → строки заголовка → подзаголовок → CTA → метки → кадр
      revealClip(canvas, { direction: "left", duration: 1.2, delay: 0.2 });
      gsap.fromTo(photo, { scale: 1.035 }, { scale: 1, duration: 1.2, delay: 0.2, ease: "power3.out", clearProps: "scale" });

      const tl = gsap.timeline({ delay: 0.86 });
      tl.add(drawIn(path, { duration: 1.1 }), 0);
      tl.from(notes, { y: 8, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 0.12);
      tl.from(values, { yPercent: 60, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power4.out" }, 0.35);
      tl.from("[data-demo]", { opacity: 0, duration: 0.6 }, 0.9);
      tl.from(steps, { y: 8, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }, 0.4);

      const scrub = { trigger: root, start: "top top", end: "bottom top", scrub: 1 };
      const mm = gsap.matchMedia();

      mm.add("(min-width: 801px)", () => {
        // На старте видна лишь «завязка» нити; при прокрутке она дорисовывается в тёмную секцию
        gsap.set(drop, { scaleY: 0.18 });
        tl.from(drop, { opacity: 0, duration: 0.6 }, 1);
        gsap.to(drop, {
          scaleY: 1,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: root, start: "top top", end: "bottom 60%", scrub: 1 },
        });
        gsap.fromTo(
          dropDot,
          { y: 0 },
          {
            y: () => drop.offsetHeight * 0.7,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom 60%", scrub: 1, invalidateOnRefresh: true },
          },
        );
        // Архитектура чуть медленнее, фигура — чуть быстрее: 15–25px
        gsap.fromTo(zoom, { y: 0, scale: 1 }, { y: -12, scale: 1.02, ease: "none", scrollTrigger: scrub });
        gsap.fromTo(photo, { y: 0 }, { y: -22, ease: "none", scrollTrigger: scrub });
        gsap.to(copy, { y: -24, ease: "none", scrollTrigger: scrub });
        gsap.to(root.querySelector("[data-notes]"), { y: -12, ease: "none", scrollTrigger: scrub });
      });

      mm.add("(max-width: 800px)", () => {
        gsap.fromTo(
          zoom,
          { scale: 1 },
          { scale: 1.03, ease: "none", scrollTrigger: { trigger: canvas, start: "top bottom", end: "bottom top", scrub: 1 } },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
