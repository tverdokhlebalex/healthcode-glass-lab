import { useLayoutEffect, useRef } from "react";
import { revealClip } from "./effects.js";
import { gsap, prefersReducedMotion } from "./gsap.js";

export function RevealImage({
  as: Tag = "div",
  children,
  className,
  direction = "up",
  duration = 1.2,
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const media = el.querySelector("[data-reveal-media]");
    const ctx = gsap.context(() => {
      revealClip(el, { direction, duration, trigger: el, start: "top 82%" });
      if (media) {
        gsap.fromTo(
          media,
          { scale: 1.05 },
          {
            scale: 1,
            duration,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [direction, duration]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
