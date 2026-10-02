import { useRef } from "react";
import { useGlassReveal } from "../motion/useGlassReveal.js";
import { LiquidGlass } from "./LiquidGlass.jsx";
import { SignalDot, SignalTrack } from "./Signals.jsx";
import styles from "./GlassPlan.module.css";
const ACTIONS=[{name:"Сон",signal:"7:32",focus:"Режим",action:"Стабилизировать время отхода ко сну"},{name:"Питание",signal:"Фокус недели",focus:"Железо",action:"Добавить источник железа"},{name:"Энергия",signal:"После нагрузки",focus:"Восстановление",action:"Пересмотреть режим после нагрузки"}];
export function GlassPlan(){ const root=useRef(null);useGlassReveal(root);
  return <section className={styles.section} id="plan" ref={root}><div className={styles.head} data-copy><h2>Из сложных данных —<br/>простые действия.</h2><p>Ваш фокус.<br/>На каждый день.</p></div>
    <div className={styles.workspace} data-surface><div className={styles.rear} aria-hidden="true"/><LiquidGlass radius={28} blur={14} interactive className={styles.canvas}><div className={styles.toolbar}><span><SignalDot/> Персональный план</span><span>3 направления <i>·</i> DEMO</span></div>
      <svg viewBox="0 0 1200 480" preserveAspectRatio="none" className={styles.route} aria-hidden="true"><path d="M56 68H285Q370 68 400 150T720 245T1135 330"/><circle cx="56" cy="68" r="3"/><circle cx="437" cy="182" r="3"/><circle cx="812" cy="288" r="3"/></svg>
      <ol className={styles.actions}>{ACTIONS.map((item,i)=><li key={item.name} className={styles.action} style={{"--order":i}}><div className={styles.category}><span>0{i+1}</span><h3>{item.name}</h3></div><div className={styles.signal}><span>Signal</span><p>{item.signal}</p></div><div className={styles.focus}><span>Focus</span><p><SignalDot/>{item.focus}</p></div><div className={styles.next}><span>Action</span><p>{item.action}</p></div></li>)}</ol>
      <div className={styles.footer}><p>Небольшие шаги.<br/>Одна понятная система.</p><div><SignalTrack/><span>План адаптируется вместе с вами</span></div><span>Демонстрационный план</span></div>
    </LiquidGlass></div>
  </section>;
}
