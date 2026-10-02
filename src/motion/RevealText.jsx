import { Children, useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./gsap.js";
import styles from "./motion.module.css";

export function RevealText({
  as: Tag = "div",
  className,
  children,
  mode = "scroll",
  delay = 0,
  stagger = 0.1,
  duration = 1,
  late = 0.12,
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || mode === "manual" || prefersReducedMotion()) return undefined;

    const inners = root.querySelectorAll("[data-reveal-inner]");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay,
        scrollTrigger:
          mode === "load"
            ? undefined
            : {
                trigger: root,
                start: "top 84%",
                once: true,
              },
      });

      inners.forEach((inner, index) => {
        tl.fromTo(
          inner,
          { yPercent: 105 },
          { yPercent: 0, duration, ease: "power4.out" },
          index * stagger + (inner.dataset.late === "true" ? late : 0),
        );
      });
    }, root);

    return () => ctx.revert();
  }, [mode, delay, stagger, duration, late]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {Children.map(children, (child) => (
        <span className={styles.mask}>
          <span
            className={styles.inner}
            data-reveal-inner=""
            data-late={child.props?.["data-late"] != null ? "true" : undefined}
          >
            {child}
          </span>
        </span>
      ))}
    </Tag>
  );
}
