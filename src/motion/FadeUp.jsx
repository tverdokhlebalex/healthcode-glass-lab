import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./gsap.js";

export function FadeUp({
  as: Tag = "div",
  className,
  children,
  immediate = false,
  delay = 0,
  y = 14,
  duration = 0.9,
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: el,
              start: "top 86%",
              once: true,
            },
      });
    });

    return () => ctx.revert();
  }, [immediate, delay, y, duration]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
