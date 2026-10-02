import { gsap } from "./gsap.js";

function radiusOf(el) {
  const radius = getComputedStyle(el).borderTopLeftRadius;
  return radius || "0px";
}

export function revealClip(el, { direction = "left", duration = 1.2, delay = 0, trigger, start = "top 82%" } = {}) {
  const radius = radiusOf(el);
  const from =
    direction === "up"
      ? `inset(100% 0% 0% 0% round ${radius})`
      : `inset(0% 100% 0% 0% round ${radius})`;

  return gsap.fromTo(
    el,
    { clipPath: from },
    {
      clipPath: `inset(0% 0% 0% 0% round ${radius})`,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
      onComplete: () => gsap.set(el, { clearProps: "clipPath" }),
    },
  );
}

export function staggerIn(targets, { y = 10, stagger = 0.1, duration = 0.7, delay = 0, trigger, start = "top 86%" } = {}) {
  if (!targets || targets.length === 0) return null;

  return gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: "power3.out",
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  });
}
