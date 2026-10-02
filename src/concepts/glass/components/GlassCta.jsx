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
    tl.from(el.querySelectorAll("[data-signal-node]"),{opacity:.3,y:6,stagger:.08,duration:.7},0);
    tl.fromTo(el.querySelectorAll("[data-connection]"),{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,stagger:.05,duration:.8,ease:"none"},.1);
    tl.from(el.querySelector("[data-focus-point]"),{opacity:0,scale:.2,duration:.5},.65).from(el.querySelector("[data-focus-label]"),{opacity:0,y:6,duration:.5},.8);
  },root.current);return()=>mm.revert();},[]);
  return <section className={styles.section} id="about" ref={root}>
    <div className={styles.copy}><h2>Начните<br/>с первого сигнала.</h2><p>Ответьте на несколько вопросов,<br/>чтобы определить подходящий<br/>формат сопровождения.</p><GlassButton onClick={onSurvey}>Пройти мини-опрос</GlassButton><span className={styles.commitment}>≈ 2 минуты <i/> Без обязательств</span></div>
    <div className={styles.scene} data-optical-scene><img className={styles.environment} src="/images/glass-atrium.jpg" alt="" loading="lazy" data-optical-source/>
      <div className={styles.rear} aria-hidden="true"/>
      <LiquidGlass className={styles.lens} radius={24} refraction="medium" depth="foreground" blur={12} interactive>
        <svg className={styles.connections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path data-connection pathLength="1" d="M15 23H27Q32 23 32 29V43Q32 49 39 49H50"/>
          <path data-connection pathLength="1" d="M85 23H73Q68 23 68 29V43Q68 49 61 49H50"/>
          <path data-connection pathLength="1" d="M15 78H28Q32 78 32 73V58Q32 53 39 53H50"/>
          <path data-connection pathLength="1" d="M85 78H72Q68 78 68 73V58Q68 53 61 53H50"/>
        </svg>
        <span className={`${styles.signal} ${styles.sleep}`} data-signal-node><SignalDot/> Сон <b>7:32</b></span>
        <span className={`${styles.signal} ${styles.data}`} data-signal-node><SignalDot/> Анализы <b>42</b></span>
        <span className={`${styles.signal} ${styles.food}`} data-signal-node><SignalDot/> Питание</span>
        <span className={`${styles.signal} ${styles.energy}`} data-signal-node><SignalDot/> Энергия</span>
        <div className={styles.center}><span className={styles.focusPoint} data-focus-point/><p data-focus-label><span>Ваш первый шаг</span><span className={styles.arrow} aria-hidden="true">→</span><strong>Мини-опрос</strong></p></div>
      </LiquidGlass>
      <p className={styles.opticCaption}>Сигнал <span>→</span> система <span>→</span> ваш план</p>
    </div>
    <footer className={styles.footer}><span>Healthcode <i>/</i> Glass Lab</span><span>Персональное сопровождение здоровья</span><a href="#top">Наверх ↑</a></footer>
  </section>;
}
