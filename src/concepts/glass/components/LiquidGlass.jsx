import { useId, useLayoutEffect, useRef } from "react";
import styles from "./LiquidGlass.module.css";

/** Optical content is sampled from the same scene, never from an unrelated crop.
 * SVG displacement runs on a static image replica, not on text or a live backdrop.
 * Only surfaces with refraction enabled allocate that replica/filter. */
export function LiquidGlass({ children, className = "", variant = "clear", depth = "middle", blur = 16, refraction = "none", radius = 24, highlight = true, interactive = false, style, ...props }) {
  const root = useRef(null);
  const replica = useRef(null);
  const id = `glass-${useId().replace(/:/g, "")}`;
  const optical = refraction !== "none";
  const strength = { low: 2, medium: 4, high: 6 }[refraction] ?? 4;

  useLayoutEffect(() => {
    if (!optical) return undefined;
    const pane = root.current;
    const scene = pane.closest("[data-optical-scene]");
    const source = scene?.querySelector("[data-optical-source]");
    if (!source) return undefined;
    const align = () => {
      const a = source.getBoundingClientRect();
      const b = pane.getBoundingClientRect();
      const sourceStyle = getComputedStyle(source);
      Object.assign(replica.current.style, {
        backgroundImage: `url("${source.currentSrc || source.src}")`,
        backgroundPosition: sourceStyle.objectPosition,
        opacity: sourceStyle.opacity,
        maskImage: sourceStyle.maskImage,
        width: `${a.width}px`, height: `${a.height}px`,
        left: `${a.left - b.left}px`, top: `${a.top - b.top}px`,
        transformOrigin: `${b.left - a.left + b.width / 2}px ${b.top - a.top + b.height / 2}px`,
      });
      replica.current.style.setProperty("--source-filter", sourceStyle.filter === "none" ? "brightness(1)" : sourceStyle.filter);
    };
    align();
    const observer = new ResizeObserver(align);
    observer.observe(scene);
    observer.observe(pane);
    source.addEventListener("load", align);
    // Re-align after entrance transforms settle, and on scene parallax updates.
    scene.addEventListener("optical-align", align);
    return () => { observer.disconnect(); source.removeEventListener("load", align); scene.removeEventListener("optical-align", align); };
  }, [optical]);

  const moveLight = (event) => {
    if (!interactive || !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--light-x", `${((event.clientX - box.left) / box.width - .5) * 36}px`);
    event.currentTarget.style.setProperty("--light-y", `${((event.clientY - box.top) / box.height - .5) * 28}px`);
  };
  const resetLight = () => {
    root.current?.style.setProperty("--light-x", "0px");
    root.current?.style.setProperty("--light-y", "0px");
  };

  return <div ref={root} className={`${styles.glass} ${className}`} data-liquid-glass data-variant={variant} data-depth={depth} data-refraction={refraction}
    style={{ "--glass-blur": `${blur}px`, "--glass-radius": typeof radius === "number" ? `${radius}px` : radius, ...style }}
    onPointerMove={moveLight} onPointerLeave={resetLight} {...props}>
    {optical && <>
      <svg className={styles.defs} aria-hidden="true"><defs><filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".008 .013" numOctaves="2" seed="12" result="grain" /><feDisplacementMap in="SourceGraphic" in2="grain" scale={strength} xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>
      <span className={styles.transmission} aria-hidden="true"><span ref={replica} className={styles.replica} style={{ "--distortion": `url(#${id})` }} /></span>
    </>}
    <span className={styles.tint} aria-hidden="true" />
    {highlight && <span className={styles.specular} aria-hidden="true" />}
    <span className={styles.edge} aria-hidden="true" />
    <div className={styles.content}>{children}</div>
  </div>;
}
