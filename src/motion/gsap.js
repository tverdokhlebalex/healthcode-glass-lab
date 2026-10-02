import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function motionScale() {
  return window.matchMedia("(max-width: 980px)").matches ? 0.35 : 1;
}

export { gsap, ScrollTrigger };
