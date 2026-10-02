import { useLayoutEffect } from "react";
import { gsap } from "../../../motion/gsap.js";
export function useGlassDataMotion(rootRef) {
  useLayoutEffect(()=>{
    const root=rootRef.current;
    const mm=gsap.matchMedia();
    mm.add({motion:"(prefers-reduced-motion: no-preference)",desktop:"(min-width:761px)"},({conditions})=>{
      if(!conditions.motion)return;
      const nodes=root.querySelectorAll("[data-node]");
      const core=root.querySelector("[data-core]");
      if(!conditions.desktop){ gsap.from([core,...nodes],{opacity:0,y:12,duration:.9,stagger:.05,scrollTrigger:{trigger:root,start:"top 70%",once:true},onComplete:()=>core.closest("section").querySelector("[data-optical-scene]").dispatchEvent(new Event("optical-align"))});return; }
      const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top 65%",end:"bottom 85%",scrub:1}});
      tl.from(nodes,{opacity:.25,y:20,stagger:.06,duration:.6},0);
      [...root.querySelectorAll("[data-path]")].forEach((path,i)=>{
        const length=path.getTotalLength();
        tl.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:.7},.1+i*.08);
        const point=root.querySelector(`[data-impulse="${i}"]`),state={t:0};
        tl.to(state,{t:1,duration:.8,ease:"none",onUpdate:()=>{const p=path.getPointAtLength(state.t*length);point.setAttribute("cx",p.x);point.setAttribute("cy",p.y);}},.2+i*.08);
        tl.fromTo(point,{opacity:0},{opacity:1,duration:.1},.2+i*.08).to(point,{opacity:0,duration:.12},.9+i*.08);
      });
      tl.fromTo(core,{opacity:.5,filter:"blur(2px)"},{opacity:1,filter:"blur(0px)",duration:.9},.3).from(root.querySelector("[data-assembled]"),{opacity:0,y:7,duration:.4},1.2);
    },root);
    return ()=>mm.revert();
  },[rootRef]);
}
