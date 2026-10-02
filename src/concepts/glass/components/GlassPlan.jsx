import { useRef } from "react";
import { useGlassReveal } from "../motion/useGlassReveal.js";
import { LiquidGlass } from "./LiquidGlass.jsx";
import { SignalDot, SignalTrack } from "./Signals.jsx";
import styles from "./GlassPlan.module.css";
const ACTIONS=[{name:"Сон",signal:"7:32",focus:"Режим",action:"Стабилизировать время отхода ко сну"},{name:"Питание",signal:"Фокус недели",focus:"Железо",action:"Добавить источник железа"},{name:"Энергия",signal:"После нагрузки",focus:"Восстановление",action:"Пересмотреть режим после нагрузки"}];
export function GlassPlan(){ const root=useRef(null);useGlassReveal(root);
  return <section className={styles.section} id="plan" ref={root}><div className={styles.head} data-copy><h2>От общей картины —<br/>к понятным действиям.</h2><p>Ваш фокус.<br/>На каждый день.</p></div>
    <div className={styles.workspace} data-surface><div className={styles.rear} aria-hidden="true"/><LiquidGlass radius={28} blur={14} interactive className={styles.canvas}><div className={styles.toolbar}><span><SignalDot/> Персональный план</span><span>3 направления <i>·</i> DEMO</span></div>
      <p className={styles.sequence}>Signal <span>→</span> Focus <span>→</span> Action</p>
      <svg viewBox="0 0 1200 360" preserveAspectRatio="none" className={styles.route} aria-hidden="true"><path d="M56 60H265C338 60 358 111 437 111H653C737 111 747 162 812 162H1126"/><circle cx="56" cy="60" r="2.5"/><circle cx="437" cy="111" r="2.5"/><circle cx="812" cy="162" r="2.5"/></svg>
      <ol className={styles.actions}>{ACTIONS.map((item,i)=><li key={item.name} className={styles.action} style={{"--order":i}}><div className={styles.category}><span>0{i+1}</span><h3>{item.name}</h3></div><div className={styles.signal}><span>Signal</span><p>{item.signal}</p></div><div className={styles.focus}><span>Focus</span><p><SignalDot/>{item.focus}</p></div><div className={styles.next}><span>Action</span><p>{item.action}</p></div></li>)}</ol>
      <div className={styles.footer}><p>Небольшие шаги.<br/>Одна понятная система.</p><div><SignalTrack/><span>План адаптируется вместе с вами</span></div><span>Демонстрационный план</span></div>
    </LiquidGlass></div>
  </section>;
}
