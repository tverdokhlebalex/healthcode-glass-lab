import { useRef } from "react";
import { useGlassDataMotion } from "../motion/useGlassDataMotion.js";
import { LiquidGlass } from "./LiquidGlass.jsx";
import { SignalDot, MicroSparkline, GlassLabel } from "./Signals.jsx";
import styles from "./GlassData.module.css";

const PATHS = ["M190 170H310Q350 170 350 210V250Q350 290 390 290H600", "M407 78V130Q407 155 440 155H525Q560 155 560 190V270", "M180 450H305Q345 450 345 410V360Q345 335 390 335H610", "M1015 150H885Q855 150 855 190V250Q855 285 815 285H690", "M1050 460H900Q865 460 865 425V375Q865 350 825 350H690"];
export function GlassData() {
  const root = useRef(null); useGlassDataMotion(root);
  return <section className={styles.section} id="process" ref={root}>
    <div className={styles.head}><h2>Разрозненные сигналы<br/>становятся системой.</h2><p>Каждый сигнал важен.<br/>Вместе — они значат больше.</p></div>
    <div className={styles.field} data-optical-scene>
      <img className={styles.environment} data-optical-source src="/images/glass-atrium.jpg" alt="" loading="lazy"/>
      <div className={styles.horizon} aria-hidden="true"/>
      <svg className={styles.lines} viewBox="0 0 1200 580" preserveAspectRatio="none" aria-hidden="true">{PATHS.map((d,i)=><g key={d}><path d={d} data-path/><circle r="3" data-impulse={i}/></g>)}</svg>
      <div className={`${styles.node} ${styles.labs}`} data-node><span className={styles.nodeIndex}>01</span><GlassLabel>Анализы</GlassLabel><p><strong>24</strong> показателя</p><MicroSparkline/><SignalDot/></div>
      <div className={`${styles.node} ${styles.sleep}`} data-node><LiquidGlass radius={14} blur={12}><div className={styles.strip}><span className={styles.nodeIndex}>02</span><GlassLabel>Сон</GlassLabel><strong>7:32</strong><SignalDot/></div></LiquidGlass></div>
      <div className={`${styles.node} ${styles.food}`} data-node><span className={styles.nodeIndex}>03</span><GlassLabel>Питание</GlassLabel><p>Фокус недели</p><span className={styles.foodRule}/><SignalDot/></div>
      <div className={styles.coreWrap} data-core><div className={styles.coreRear} aria-hidden="true"/><LiquidGlass refraction="low" depth="foreground" radius={34} interactive className={styles.core}><div className={styles.coreInside}><div className={styles.coreHeading}><GlassLabel>Ваш профиль</GlassLabel><span>DEMO</span></div><p className={styles.total}>27<span>сигналов</span></p><div className={styles.coreBottom}><p><strong>5</strong> категорий</p><svg viewBox="0 0 72 26" aria-hidden="true"><path d="M4 20L20 8L36 14L52 4L68 12"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="8" r="2"/><circle cx="36" cy="14" r="2"/><circle cx="52" cy="4" r="2"/><circle cx="68" cy="12" r="2"/></svg></div></div></LiquidGlass><p className={styles.assembled} data-assembled><SignalDot/> Единая картина</p></div>
      <div className={`${styles.node} ${styles.goals}`} data-node><span className={styles.nodeIndex}>04</span><GlassLabel>Цели</GlassLabel><p>Энергия /<br/>восстановление</p><SignalDot/></div>
      <div className={`${styles.node} ${styles.life}`} data-node><span className={styles.nodeIndex}>05</span><GlassLabel>Образ жизни</GlassLabel><p>Режим / нагрузка</p><div className={styles.rhythm} aria-hidden="true">{[16,25,20,38,29,42,25,19,32,23].map((h,i)=><i key={i} style={{height:h}}/>)}</div><SignalDot/></div>
    </div>
    <p className={styles.caption}>Анализы + повседневный контекст <span>→</span> персональный профиль</p>
  </section>;
}
