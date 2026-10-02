import { useRef } from "react";
import { Picture } from "../../../components/Picture.jsx";
import { useGlassReveal } from "../motion/useGlassReveal.js";
import { LiquidGlass } from "./LiquidGlass.jsx";
import { GlassLabel, MicroSparkline, SignalDot } from "./Signals.jsx";
import styles from "./GlassExpert.module.css";
export function GlassExpert() {
  const root=useRef(null);useGlassReveal(root);
  return <section className={styles.section} id="expert" ref={root}>
    <div className={styles.copy} data-copy><h2>За цифрами<br/>важно увидеть<br/>человека.</h2><p>Эксперт смотрит на показатели вместе: учитывает цели, питание, сон и образ жизни.</p><div className={styles.connection}><SignalDot/><span>Данные</span><i/><span>Интерпретация</span><i/><span>Вы</span></div></div>
    <div className={styles.scene} data-visual><div className={styles.portrait}><Picture name="expert" alt="Эксперт изучает данные на планшете" sizes="(max-width: 760px) 100vw, 50vw"/></div>
      <LiquidGlass variant="frosted" blur={20} radius={18} className={styles.frost} aria-hidden="true"/>
      <LiquidGlass blur={1} radius={22} className={styles.clear} interactive><div className={styles.annotation}><GlassLabel>От данных к пониманию</GlassLabel><div><span>42<small>нг/мл · DEMO</small></span><MicroSparkline/></div><p><SignalDot/> Ферритин + питание + ваш ритм</p></div></LiquidGlass>
      <span className={styles.portraitCaption}>Экспертная интерпретация</span>
    </div>
  </section>;
}
