import { useRef } from "react";
import { useGlassHeroMotion } from "../motion/useGlassHeroMotion.js";
import { GlassButton } from "./GlassButton.jsx";
import { LiquidGlass } from "./LiquidGlass.jsx";
import { SignalDot, MicroSparkline, GlassLabel } from "./Signals.jsx";
import styles from "./GlassHero.module.css";
import { assetPath } from "../../../media.js";

export function GlassHero({ onSurvey }) {
  const rootRef = useRef(null);
  useGlassHeroMotion(rootRef);
  return <section className={styles.hero} id="top" ref={rootRef} data-optical-scene>
    <div className={styles.environment} data-pan="2" data-environment><img src={assetPath("/images/glass-atrium.jpg")} alt="" data-optical-source fetchPriority="high"/><div className={styles.wash}/></div>
    <div className={styles.copy}>
      <p className={styles.edition}><SignalDot/> Healthcode <span>/</span> Glass Lab</p>
      <h1 className={styles.title}><span className={styles.mask}><span data-title-line>Данные</span></span><span className={styles.mask}><span data-title-line>складываются</span></span><span className={styles.mask}><span data-title-line>в целую картину.</span></span></h1>
      <p className={styles.lead}>Анализы, цели и привычки —<br/>в одной системе персонального сопровождения.</p>
      <div className={styles.actions} data-cta><GlassButton onClick={onSurvey}>Пройти мини-опрос</GlassButton><a href="#process">Как это работает <span aria-hidden="true">↗</span></a></div>
    </div>
    <div className={styles.field}>
      <div className={styles.rear} data-pan="4" data-rear><LiquidGlass radius={36} blur={12} className={styles.sheet}><span className={styles.sheetCaption}>Персональная система <span>01 / 05</span></span><span className={styles.sheetRule}/></LiquidGlass></div>
      <svg className={styles.paths} data-gold aria-hidden="true"><path data-path/><g data-path-nodes/></svg>
      <div className={styles.sleep} data-pan="6" data-secondary><LiquidGlass radius={16} blur={12}><div className={styles.sleepInner}><GlassLabel>Сон</GlassLabel><p>7:32</p><span className={styles.delta}><SignalDot data-connect="sleep"/> +24 мин</span></div></LiquidGlass></div>
      <div className={styles.primary} data-pan="9" data-primary><LiquidGlass radius={"30px"} depth="foreground" refraction="medium" interactive className={styles.lens}><div className={styles.metric}>
        <div className={styles.metricTop}><GlassLabel>Ферритин</GlassLabel><span className={styles.demo}>DEMO</span></div>
        <p className={styles.value}>42<span>нг/мл</span></p>
        <MicroSparkline/>
        <div className={styles.metricFoot}><SignalDot data-connect="biomarker"/><p>Динамика<br/>за 3 месяца</p><span>↗</span></div>
      </div></LiquidGlass></div>
      <div className={styles.nutrition} data-pan="5" data-secondary><SignalDot data-connect="food"/><div><GlassLabel>Питание</GlassLabel><p>Фокус недели</p><span className={styles.smallLine}/></div></div>
      <div className={styles.energy} data-pan="7" data-secondary><SignalDot data-connect="energy"/><div><GlassLabel>Энергия</GlassLabel><p>Стабильно</p></div></div>
      <p className={styles.foreground} data-pan="4">Ваши сигналы.<br/>В едином контексте.</p>
    </div>
    <div className={styles.footer}><a href="#process"><span>↓</span> От сигнала — к действию</a><span>Демонстрационные данные</span></div>
  </section>;
}
