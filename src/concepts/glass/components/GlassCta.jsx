import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../../motion/gsap.js";
import { GlassButton } from "./GlassButton.jsx";
import { LiquidGlass } from "./LiquidGlass.jsx";
import { SignalDot } from "./Signals.jsx";
import styles from "./GlassCta.module.css";
export function GlassCta({onSurvey}) {const root=useRef(null);
  useLayoutEffect(()=>{const mm=gsap.matchMedia();mm.add({motion:"(prefers-reduced-motion: no-preference)",desktop:"(min-width:761px)"},({conditions})=>{
    if(!conditions.motion)return;
    const el=root.current;
    const tl=gsap.timeline({scrollTrigger:{trigger:el,start:"top 75%",end:"center 60%",scrub:conditions.desktop?1:false}});
    el.querySelectorAll("[data-scattered]").forEach((node)=>tl.to(node,{xPercent:Number(node.dataset.x),yPercent:Number(node.dataset.y),opacity:.15,duration:1,ease:"power2.inOut"},0));
    tl.from(el.querySelector("[data-focus-point]"),{opacity:0,scale:.2,duration:.5},.65).from(el.querySelector("[data-focus-label]"),{opacity:0,y:6,duration:.5},.8);
  },root.current);return()=>mm.revert();},[]);
  return <section className={styles.section} id="about" ref={root}>
    <div className={styles.copy}><h2>Начните<br/>с первого сигнала.</h2><p>Ответьте на несколько вопросов,<br/>чтобы определить подходящий<br/>формат сопровождения.</p><GlassButton onClick={onSurvey}>Пройти мини-опрос</GlassButton><span className={styles.commitment}>≈ 2 минуты <i/> Без обязательств</span></div>
    <div className={styles.scene} data-optical-scene><img className={styles.environment} src="/images/glass-atrium.jpg" alt="" loading="lazy" data-optical-source/>
      <span className={`${styles.signal} ${styles.sleep}`} data-scattered data-x="190" data-y="280">Сон <b>7:32</b></span><span className={`${styles.signal} ${styles.energy}`} data-scattered data-x="-190" data-y="170">Энергия <SignalDot/></span><span className={`${styles.signal} ${styles.food}`} data-scattered data-x="160" data-y="-230">Питание <SignalDot/></span><span className={`${styles.signal} ${styles.data}`} data-scattered data-x="-200" data-y="-220">Анализы <b>42</b></span>
      <div className={styles.outer} aria-hidden="true"/><div className={styles.middle} aria-hidden="true"/>
      <LiquidGlass className={styles.lens} radius={"30%"} refraction="low" depth="foreground" blur={12} interactive><div className={styles.center}><span className={styles.focusPoint} data-focus-point/><p data-focus-label>Всё начинается<br/>с вас.</p></div></LiquidGlass>
      <p className={styles.opticCaption}>Сигнал <span>→</span> система <span>→</span> ваш план</p>
    </div>
    <footer className={styles.footer}><span>Healthcode <i>/</i> Glass Lab</span><span>Персональное сопровождение здоровья</span><a href="#top">Наверх ↑</a></footer>
  </section>;
}
