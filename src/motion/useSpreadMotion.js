import { useLayoutEffect } from "react";
import { revealClip } from "./effects.js";
import { gsap, prefersReducedMotion } from "./gsap.js";

export function useLifeMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const frame = root.querySelector("[data-frame]");
      const shift = root.querySelector("[data-shift]");
      const photo = shift.querySelector("img");
      revealClip(frame, { direction: "up", duration: 1.2, trigger: root, start: "top 78%" });
      gsap.fromTo(
        photo,
        { scale: 1.035 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top top", scrub: 1 } },
      );

      // Заголовок → точка в кадре → нить тянется к рекомендации → рекомендация
      const card = root.querySelector("[data-card]");
      const route = root.querySelector("[data-life-path]");
      const node = root.querySelector("[data-node]");
      const reveal = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 35%", once: true } });
      if (node) reveal.from(node, { scale: 0, duration: 0.5, ease: "power4.out" }, 0.3);
      if (route) {
        const length = route.getTotalLength();
        reveal.fromTo(
          route,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.9, ease: "power3.out" },
          0.45,
        );
      }
      reveal.from(card, { x: -16, opacity: 0, duration: 0.8, ease: "power3.out" }, 1);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 981px)", () => {
        gsap.fromTo(
          shift,
          { y: 12 },
          {
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
      mm.add("(max-width: 980px)", () => {
        gsap.fromTo(
          shift,
          { y: 6 },
          {
            y: -6,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}

export function useExpertiseMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const portrait = root.querySelector("[data-portrait]");
      const rule = root.querySelector("[data-rule]");
      const text = root.querySelector("[data-text]");
      const caps = root.querySelectorAll("[data-caps] li");
      const actions = root.querySelector("[data-actions]");
      const expertPath = root.querySelector("[data-expert-path]");

      revealClip(portrait, { direction: "up", duration: 1.15, trigger: portrait, start: "top 80%" });
      gsap.fromTo(
        portrait.querySelector("img"),
        { scale: 1.035 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: portrait, start: "top 80%", once: true },
          onComplete: () => gsap.set(portrait.querySelector("img"), { clearProps: "scale" }),
        },
      );
      if (expertPath) {
        const length = expertPath.getTotalLength();
        gsap.fromTo(
          expertPath,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: portrait, start: "top 72%", once: true },
          },
        );
      }

      gsap.fromTo(
        rule,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: text, start: "top 86%", once: true },
        },
      );
      gsap.from(text, {
        y: 14,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: text, start: "top 86%", once: true },
      });
      gsap.from(caps, {
        y: 10,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: text, start: "top 84%", once: true },
      });
      gsap.from(actions, {
        y: 12,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: actions, start: "top 90%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
