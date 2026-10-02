import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion } from "../../../motion/gsap.js";

function countTo(node, from, to) {
  const proxy = { value: from };
  gsap.killTweensOf(node);
  gsap.to(proxy, {
    value: to,
    duration: 0.85,
    ease: "power3.out",
    onUpdate: () => {
      node.textContent = String(Math.round(proxy.value));
    },
  });
}

function drawTrend(path) {
  if (!path) return;
  const length = path.getTotalLength();
  gsap.killTweensOf(path);
  gsap.fromTo(
    path,
    { strokeDasharray: length, strokeDashoffset: length },
    { strokeDashoffset: 0, duration: 1.05, ease: "power3.out" },
  );
}

export function useGlassBiomarkerMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const values = [...root.querySelectorAll("[data-value]")];
    const notes = [...root.querySelectorAll("[data-note]")];
    const indexes = [...root.querySelectorAll("[data-index]")];
    const trends = [...root.querySelectorAll("[data-trend]")];
    const nums = values.map((el) => el.querySelector("[data-num]"));
    let current = 0;

    const show = (next) => {
      if (next === current) return;
      const prevNum = Number(nums[current]?.dataset.num ?? 0);
      values.forEach((el, i) => el.setAttribute("data-on", i === next ? "true" : "false"));
      notes.forEach((el, i) => el.setAttribute("data-on", i === next ? "true" : "false"));
      indexes.forEach((el, i) => el.setAttribute("data-on", i === next ? "true" : "false"));
      trends.forEach((el, i) => el.setAttribute("data-on", i === next ? "true" : "false"));
      if (nums[next] && !prefersReducedMotion()) {
        countTo(nums[next], prevNum, Number(nums[next].dataset.num));
        drawTrend(trends[next]);
      }
      current = next;
    };

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      drawTrend(trends[0]);

      if (window.matchMedia("(max-width: 980px)").matches) {
        gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "bottom 40%",
            onUpdate: (self) => {
              show(Math.min(values.length - 1, Math.floor(self.progress * values.length)));
            },
          },
        });
        return;
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${values.length * 70}%`,
          pin: true,
          scrub: 1.05,
          onUpdate: (self) => {
            show(Math.min(values.length - 1, Math.floor(self.progress * 0.999 * values.length)));
          },
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);
}
