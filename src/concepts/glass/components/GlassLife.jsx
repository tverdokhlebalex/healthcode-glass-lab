import { useRef } from "react";
import { useGlassReveal } from "../motion/useGlassReveal.js";
import { LiquidGlass } from "./LiquidGlass.jsx";
import { GlassLabel, SignalDot, SignalTrack } from "./Signals.jsx";
import { assetPath } from "../../../media.js";
import styles from "./GlassLife.module.css";
export function GlassLife(){const root=useRef(null);useGlassReveal(root);
  return <section className={styles.section} id="life" ref={root} data-optical-scene><img className={styles.image} data-optical-source src={assetPath("/images/hc-life-1280.webp")} alt="Приготовление еды в светлой кухне" loading="lazy"/><div className={styles.shade}/>
    <h2 className={styles.title} data-copy>План,<br/>который живёт<br/>вместе с вами.</h2>
    <div className={styles.ribbonWrap} data-surface><LiquidGlass className={styles.ribbon} radius={28} refraction="medium" depth="foreground" interactive><div className={styles.inside}><div className={styles.today}><SignalDot/><span>Сегодня</span><span>DEMO</span></div><div className={styles.action}><GlassLabel>Питание</GlassLabel><p>Добавить источник железа <br/>к одному из основных <br/>приёмов пищи.</p></div><div className={styles.progress}><p>2 <span>/ 3</span></p><SignalTrack/><span>В вашем ритме</span></div></div></LiquidGlass></div>
    <p className={styles.caption}>Рекомендации становятся частью повседневности.</p>
  </section>;
}
