import { useLayoutEffect, useRef } from "react";
import { staggerIn } from "./effects.js";
import { gsap, prefersReducedMotion } from "./gsap.js";

export function StaggerGroup({
  as: Tag = "div",
  className,
  children,
  selector = "[data-stagger]",
  y = 10,
  stagger = 0.1,
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      staggerIn(root.querySelectorAll(selector), { y, stagger, trigger: root });
    }, root);

    return () => ctx.revert();
  }, [selector, y, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
