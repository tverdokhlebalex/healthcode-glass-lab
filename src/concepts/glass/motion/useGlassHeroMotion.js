import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion } from "../../../motion/gsap.js";

function curve(from, to) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  return `M ${from.x} ${from.y} Q ${midX + (-dy / len) * 22} ${midY + (dx / len) * 22} ${to.x} ${to.y}`;
}

function center(el, origin) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 - origin.left,
    y: rect.top + rect.height / 2 - origin.top,
  };
}

export function useGlassHeroMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = prefersReducedMotion();
    const desktop = window.matchMedia("(min-width: 981px)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let drawn = reduced;
    let onMove;
    let onResize;

    const layoutPaths = (mode) => {
      const svg = root.querySelector("[data-gold]");
      const paths = [...root.querySelectorAll("[data-path]")];
      const links = [
        ["sleep", "left"],
        ["food", "left"],
        ["energy", "right"],
      ].map(([from, side]) => ({
        from: root.querySelector(`[data-from="${from}"]`),
        to: root.querySelector(`[data-anchor="${side}"]`),
      }));
      if (!svg || paths.length !== 3 || links.some((link) => !link.from || !link.to)) return;
      const box = svg.getBoundingClientRect();
      if (box.width < 8) return;

      links.forEach((link, index) => {
        const path = paths[index];
        path.setAttribute("d", curve(center(link.from, box), center(link.to, box)));
        const length = path.getTotalLength() || 1;
        const progress = mode === "full" || drawn ? 1 : 0;
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${(1 - progress) * length}`;
      });
    };

    const ctx = gsap.context(() => {
      layoutPaths(reduced ? "full" : "hidden");
      if (reduced) return;

      const lines = root.querySelectorAll("[data-title-line]");
      const main = root.querySelector("[data-main]");
      const secondary = root.querySelector("[data-secondary]");
      const signals = root.querySelectorAll("[data-signal]");
      const paths = root.querySelectorAll("[data-path]");
      const lead = root.querySelector("[data-lead]");
      const cta = root.querySelector("[data-cta]");
      const light = root.querySelector("[data-light]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (light) tl.fromTo(light, { opacity: 0 }, { opacity: 1, duration: 0.9 }, 0);
      tl.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.08, ease: "power4.out" }, 0.12);
      tl.fromTo(main, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.15 }, 0.42);
      tl.fromTo([secondary, ...signals], { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 }, 0.72);
      paths.forEach((path, index) => {
        const length = path.getTotalLength?.() || 0;
        if (!length) return;
        tl.fromTo(
          path,
          { strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1.05, ease: "power3.out" },
          0.96 + index * 0.08,
        );
      });
      tl.fromTo([lead, cta], { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 1.2);
      tl.call(() => {
        drawn = true;
        layoutPaths("full");
      });

      if (desktop) {
        const bg = root.querySelector('[data-scroll="bg"]');
        const sheet = root.querySelector('[data-scroll="sheet"]');
        const sleep = root.querySelector('[data-scroll="secondary"]');
        const plane = root.querySelector('[data-scroll="main"]');
        const marks = root.querySelector('[data-scroll="signals"]');
        const copy = root.querySelector('[data-scroll="fore"]');

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=70%",
              scrub: 1,
              onUpdate: () => {
                if (drawn) layoutPaths("full");
              },
            },
          })
          .to(bg, { y: 18, ease: "none" }, 0)
          .to(sheet, { y: 34, ease: "none" }, 0)
          .to(sleep, { y: -26, x: -14, ease: "none" }, 0)
          .to(plane, { y: 16, ease: "none" }, 0)
          .to(marks, { y: 30, x: 12, ease: "none" }, 0)
          .to(copy, { y: -42, ease: "none" }, 0);
      }

      if (desktop && fine) {
        const pans = [
          { el: root.querySelector('[data-pan="bg"]'), max: 2 },
          { el: root.querySelector('[data-pan="sheet"]'), max: 3 },
          { el: root.querySelector('[data-pan="secondary"]'), max: 5 },
          { el: root.querySelector('[data-scroll="signals"] [data-pan="secondary"]'), max: 5 },
          { el: root.querySelector('[data-pan="main"]'), max: 7 },
          { el: root.querySelector('[data-pan="fore"]'), max: 3 },
        ].filter((item) => item.el);

        const movers = pans.map((item) => ({
          ...item,
          xTo: gsap.quickTo(item.el, "x", { duration: 0.9, ease: "power3.out" }),
          yTo: gsap.quickTo(item.el, "y", { duration: 0.9, ease: "power3.out" }),
        }));

        onMove = (event) => {
          const rect = root.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;
          movers.forEach((item) => {
            item.xTo(nx * 2 * item.max);
            item.yTo(ny * 2 * item.max);
          });
          if (drawn) layoutPaths("full");
        };
        root.addEventListener("pointermove", onMove);
      }

      onResize = () => layoutPaths(drawn ? "full" : "hidden");
      window.addEventListener("resize", onResize);
    }, root);

    return () => {
      if (onResize) window.removeEventListener("resize", onResize);
      if (onMove) root.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);
}
