import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../../../motion/gsap.js";

function bowDown(points) {
  if (points.length < 2) return "";
  const [a, b] = [points[0], points[points.length - 1]];
  const mx = (a.x + b.x) / 2;
  const my = Math.max(a.y, b.y) + 28;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

function curve(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const next = points[i];
    const mx = (prev.x + next.x) / 2;
    const my = (prev.y + next.y) / 2;
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const horizontal = Math.abs(dx) > Math.abs(dy) * 1.8;
    const bend = horizontal ? Math.min(36, len * 0.12) : Math.min(64, len * 0.22);
    const sign = horizontal ? 1 : (i % 2 === 0 ? 1 : -1);
    d += ` Q ${mx + (-dy / len) * bend * sign} ${my + (dx / len) * bend * sign} ${next.x} ${next.y}`;
  }
  return d;
}

function readPoints(svg, pins) {
  const box = svg.getBoundingClientRect();
  return pins.map((pin) => {
    const dot = pin.querySelector("i");
    const rect = (dot || pin).getBoundingClientRect();
    const end = pin.dataset.pin === "end";
    return {
      x: (end ? rect.right : rect.left + rect.width / 2) - box.left,
      y: rect.top + rect.height / 2 - box.top,
    };
  });
}

export function useJourneyMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = prefersReducedMotion();
    const paints = [];

    const ctx = gsap.context(() => {
      root.querySelectorAll("[data-reveal]").forEach((frame) => {
        const img = frame.querySelector("img");
        if (!img || reduced) return;
        if (frame.dataset.reveal !== "load") {
          gsap.fromTo(frame, { clipPath: "inset(8% 6% 8% 6%)" }, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: frame, start: "top 84%", once: true },
            onComplete: () => gsap.set(frame, { clearProps: "clipPath" }),
          });
        }
        gsap.fromTo(img, { yPercent: 4 }, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      if (!reduced) {
        gsap.from(root.querySelectorAll("#top [data-pin]"), {
          y: 16,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          delay: 0.35,
          ease: "power3.out",
        });
      }

      root.querySelectorAll("[data-plot]").forEach((svg) => {
        const section = svg.closest("section");
        const pins = [...section.querySelectorAll("[data-pin]")];
        const mode = svg.dataset.plot;
        let progress = 0;
        let drawn = reduced;
        let tweening = false;

        const paint = () => {
          if (pins.length < 2 || svg.getBoundingClientRect().width < 8) return;
          const box = svg.getBoundingClientRect();
          svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
          svg.setAttribute("preserveAspectRatio", "none");
          const d = svg.dataset.bow === "down"
            ? bowDown(readPoints(svg, pins))
            : curve(readPoints(svg, pins));
          const track = svg.querySelector("[data-track]");
          if (track) track.setAttribute("d", d);
          const paths = [...svg.querySelectorAll("[data-under], [data-over]")];
          paths.forEach((path) => path.setAttribute("d", d));
          const main = svg.querySelector("[data-over]");
          const prevLength = Number.parseFloat(main?.style.strokeDasharray || "0");
          const prevOffset = Number.parseFloat(main?.style.strokeDashoffset || "0");
          const length = main && d ? main.getTotalLength() : 0;
          let offset = 0;
          if (mode === "scrub" && !reduced) offset = length * (1 - progress);
          else if (tweening && prevLength) offset = length * (prevOffset / prevLength);
          else if (!reduced && !drawn) offset = length;
          else offset = 0;
          paths.forEach((path) => {
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${offset}`;
          });
          if (mode === "scrub" || reduced) {
            let current = 0;
            pins.forEach((pin, index) => {
              const host = pin.closest("[data-step]") || pin;
              const threshold = pins.length === 1 ? 0 : index / (pins.length - 1);
              const on = reduced || progress + 0.03 >= threshold;
              if (on) current = index;
              host.dataset.on = on ? "true" : "false";
            });
            const now = section.querySelector("[data-route-now]");
            if (now) now.textContent = String(current + 1).padStart(2, "0");
            const traveler = section.querySelector("[data-traveler]");
            if (traveler && main && length) {
              const point = main.getPointAtLength(length * Math.min(1, Math.max(0, progress)));
              traveler.style.transform = `translate(${point.x}px, ${point.y}px)`;
            }
          }
        };

        paint();
        paints.push(paint);

        if (!reduced && mode === "load") {
          tweening = true;
          gsap.to(svg.querySelectorAll("path"), {
            strokeDashoffset: 0,
            duration: 1.7,
            delay: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
              drawn = true;
              tweening = false;
            },
          });
        }

        if (!reduced && mode === "enter") {
          tweening = true;
          gsap.to(svg.querySelectorAll("path"), {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 74%", once: true },
            onComplete: () => {
              drawn = true;
              tweening = false;
            },
          });
        }

        if (!reduced && mode === "scrub") {
          const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.4,
            onUpdate: (self) => {
              progress = self.progress;
              paint();
            },
          });
          progress = trigger.progress;
          paint();
        }
      });
    }, root);

    const refresh = () => paints.forEach((paint) => paint());
    window.addEventListener("resize", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [rootRef]);
}
