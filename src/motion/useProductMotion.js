import { useLayoutEffect } from "react";
import { revealClip } from "./effects.js";
import { gsap, prefersReducedMotion, ScrollTrigger } from "./gsap.js";

const STEP = 0.8;

const SCAN = { from: 36, to: 594 };

function countTo(node, from, to) {
  const proxy = { value: from };
  gsap.killTweensOf(node);
  gsap.to(proxy, {
    value: to,
    duration: STEP,
    ease: "power3.out",
    onUpdate: () => {
      node.textContent = String(Math.round(proxy.value));
    },
  });
}

function sweep(scan) {
  gsap.killTweensOf(scan);
  gsap.fromTo(scan, { x: SCAN.from, opacity: 0.9 }, { x: SCAN.to, duration: STEP, ease: "power3.out" });
  gsap.to(scan, { opacity: 0, duration: 0.3, delay: STEP - 0.05 });
}

function drawSeries(series) {
  const line = series.querySelector("[data-trend]");
  const area = series.querySelector("[data-area]");
  const points = series.querySelectorAll("[data-point]");
  const ends = series.querySelectorAll("[data-end]");
  const length = line.getTotalLength();

  gsap.killTweensOf([series, line, area, points, ends]);
  gsap.set(series, { opacity: 1 });
  gsap.fromTo(line, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: STEP, ease: "power3.out" });
  gsap.fromTo(area, { opacity: 0 }, { opacity: 1, duration: STEP, delay: 0.25, ease: "power3.out" });
  gsap.fromTo(
    points,
    { scale: 0, transformOrigin: "50% 50%" },
    { scale: 1, duration: 0.4, stagger: 0.12, delay: 0.12, ease: "power3.out" },
  );
  gsap.fromTo(
    ends,
    { scale: 0, transformOrigin: "50% 50%" },
    { scale: 1, duration: 0.5, delay: STEP - 0.1, ease: "power4.out" },
  );
}

export function useProductMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const instrument = root.querySelector("[data-instrument]");
      const hello = root.querySelector("[data-hello]");
      const rows = root.querySelectorAll("[data-row]");
      const panels = root.querySelectorAll("[data-panel]");
      const axis = root.querySelectorAll("[data-axis] li");
      const series = [...root.querySelectorAll("[data-series]")];
      const values = [...root.querySelectorAll("[data-value]")];
      const insights = [...root.querySelectorAll("[data-insight]")];
      const recs = [...root.querySelectorAll("[data-rec]")];
      const switches = [...root.querySelectorAll("[data-switch-item]")];
      const nums = values.map((node) => node.querySelector("[data-num]"));
      const counter = root.querySelector("[data-counter]");
      const progress = root.querySelector("[data-progress]");
      const scan = root.querySelector("[data-scan]");
      let current = -1;

      const show = (index) => {
        if (index === current) return;
        const previous = current;
        current = index;
        counter.textContent = String(index + 1).padStart(2, "0");
        const target = Number(nums[index].dataset.num);
        countTo(nums[index], previous < 0 ? 0 : Number(nums[previous].dataset.num), target);
        sweep(scan);

        // Фокус месяца перестраивается под выбранный показатель
        const focus = values[index].dataset.focus.split(",").map(Number);
        const lead = Number(values[index].dataset.lead);
        rows.forEach((row, i) => {
          row.dataset.on = i === lead ? "true" : "false";
          if (previous < 0) return;
          const fill = row.querySelector("[data-fill]");
          const dot = row.querySelector("[data-dot]");
          const track = row.querySelector("[data-track]");
          const base = Number(fill.dataset.ratio);
          gsap.to(fill, { scaleX: focus[i], duration: STEP, delay: i * 0.06, ease: "power3.out", overwrite: true });
          gsap.to(dot, {
            x: (focus[i] - base) * track.offsetWidth,
            xPercent: -50,
            yPercent: -50,
            duration: STEP,
            delay: i * 0.06,
            ease: "power3.out",
            overwrite: true,
          });
        });
        [values, insights, recs].forEach((nodes) => {
          nodes.forEach((node, i) => {
            const on = i === index;
            node.dataset.on = on ? "true" : "false";
            node.setAttribute("aria-hidden", on ? "false" : "true");
            gsap.fromTo(
              node,
              { y: on ? 12 : 0 },
              { y: on ? 0 : -8, opacity: on ? 1 : 0, duration: STEP, ease: "power3.out", overwrite: "auto" },
            );
          });
        });
        switches.forEach((node, i) => {
          node.dataset.on = i === index ? "true" : "false";
        });
        series.forEach((group, i) => {
          group.dataset.on = i === index ? "true" : "false";
          if (i === index) {
            gsap.set(group, { y: 0 });
            drawSeries(group);
          } else gsap.to(group, { opacity: 0, y: -6, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        });
      };

      const pick = (progress) => Math.min(series.length - 1, Math.floor(progress * series.length * 0.999));

      revealClip(instrument, { direction: "up", duration: 1.1, trigger: root, start: "top 72%" });

      const enter = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 72%", once: true } });
      enter.from(hello, { y: 16, opacity: 0, duration: 0.65, ease: "power3.out" }, 0.2);
      enter.from(switches, { y: 8, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }, 0.3);
      enter.from(panels, { y: 14, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 0.4);
      enter.add(() => show(0), 0.45);
      enter.from(axis, { opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.6);

      rows.forEach((row, index) => {
        const fill = row.querySelector("[data-fill]");
        const dot = row.querySelector("[data-dot]");
        const track = row.querySelector("[data-track]");
        const ratio = Number(fill.dataset.ratio);
        enter.fromTo(fill, { scaleX: 0 }, { scaleX: ratio, duration: 1.15, ease: "power3.out" }, 0.5 + index * 0.12);
        enter.fromTo(
          dot,
          { x: () => -track.offsetWidth * ratio, xPercent: -50, yPercent: -50 },
          { x: 0, xPercent: -50, yPercent: -50, duration: 1.15, ease: "power3.out" },
          0.5 + index * 0.12,
        );
      });

      // Keep the cabinet in normal flow: longer explanatory copy must not be pinned
      // outside a short viewport. Scrolling still reveals all three demo trends.
      ScrollTrigger.create({
        trigger: instrument,
        start: "top 70%",
        end: "bottom 30%",
        onUpdate: (self) => {
          show(pick(self.progress));
          gsap.to(progress, { scaleX: self.progress, duration: 0.4, ease: "power3.out", overwrite: true });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
