import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "../motion/gsap.js";
import styles from "./Button.module.css";

export function Button({ children, size = "lg", className = "", magnetic = false, ...props }) {
  const ref = useRef(null);
  const classes = [styles.ink, styles[size], className].filter(Boolean).join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic || prefersReducedMotion()) return undefined;
    if (!window.matchMedia("(pointer: fine) and (min-width: 981px)").matches) return undefined;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      xTo(gsap.utils.clamp(-3, 3, dx * 0.12));
      yTo(gsap.utils.clamp(-3, 3, dy * 0.18));
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "x,y" });
    };
  }, [magnetic]);

  return (
    <button className={classes} type="button" ref={ref} {...props}>
      <span>{children}</span>
      <span className={styles.disc} aria-hidden="true">
        <ArrowRight size={size === "sm" ? 14 : 16} strokeWidth={1.75} />
      </span>
    </button>
  );
}
