import { useLayoutEffect } from "react";
import { gsap } from "../../../motion/gsap.js";

export function useGlassHeroMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const path = root.querySelector("[data-path]");
    const svg = root.querySelector("[data-gold]");
    const align = () => {
      const box = svg.getBoundingClientRect();
      const points = ["sleep", "food", "energy", "biomarker"].map((name) => {
        const r = root.querySelector(`[data-connect="${name}"]`).getBoundingClientRect();
        return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top];
      });
      path.setAttribute("d", points.map(([x,y],i)=>`${i ? "L" : "M"}${x} ${y}`).join(" "));
      root.dispatchEvent(new Event("optical-align"));
    };
    const resize = new ResizeObserver(align);
    resize.observe(root);
    const mm = gsap.matchMedia();
    mm.add({ desktop:"(min-width: 981px) and (pointer: fine)", motion:"(prefers-reduced-motion: no-preference)" }, ({conditions}) => {
      align();
      if (!conditions.motion) return undefined;
      const tl = gsap.timeline({defaults:{ease:"power3.out"},onComplete:align});
      tl.from(root.querySelector("[data-environment]"),{opacity:0,duration:1.2},0)
        .from(root.querySelectorAll("[data-title-line]"),{yPercent:110,duration:1.2,stagger:.09},.15)
        .from(root.querySelector("[data-rear]"),{opacity:0,y:18,duration:1.2},.35)
        .from(root.querySelector("[data-primary]"),{opacity:0,y:24,scale:.98,filter:"blur(5px)",duration:1.1},.6)
        .from(root.querySelectorAll("[data-secondary]"),{opacity:0,y:14,duration:.9,stagger:.1},.85)
        .from(path,{strokeDasharray:path.getTotalLength(),strokeDashoffset:path.getTotalLength(),duration:1.3},1.05)
        .from(root.querySelector("[data-cta]"),{opacity:0,y:10,duration:.8},1.2);
      if (!conditions.desktop) return undefined;
      const movers = [...root.querySelectorAll("[data-pan]")].map(el=>({max:Number(el.dataset.pan),x:gsap.quickTo(el,"x",{duration:1.1,ease:"power3.out"}),y:gsap.quickTo(el,"y",{duration:1.1,ease:"power3.out"})}));
      let frame = 0;
      const move = (event) => {
        const r = root.getBoundingClientRect();
        const x = (event.clientX-r.left)/r.width-.5, y=(event.clientY-r.top)/r.height-.5;
        movers.forEach(m=>{m.x(x*2*m.max);m.y(y*2*m.max);});
        root.style.setProperty("--light-x",`${x*36}px`);
        root.style.setProperty("--light-y",`${y*28}px`);
        if (!frame) frame=requestAnimationFrame(()=>{align();frame=0;});
      };
      const leave=()=>movers.forEach(m=>{m.x(0);m.y(0);});
      root.addEventListener("pointermove",move); root.addEventListener("pointerleave",leave);
      return ()=>{root.removeEventListener("pointermove",move);root.removeEventListener("pointerleave",leave);cancelAnimationFrame(frame);};
    },root);
    return ()=>{mm.revert();resize.disconnect();};
  },[rootRef]);
}
