import { useLayoutEffect } from "react";
import { gsap } from "../../../motion/gsap.js";
export function useGlassBiomarkerMotion(rootRef, selected) {
  useLayoutEffect(()=>{
    const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      const path=rootRef.current.querySelector("[data-trend]");
      const length=path.getTotalLength();
      gsap.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:1.2,ease:"power2.out",scrollTrigger:{trigger:rootRef.current,start:"top 60%",once:true}});
    },rootRef.current);
    return ()=>mm.revert();
  },[rootRef,selected]);
}
