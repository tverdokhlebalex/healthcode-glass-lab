import { useRef } from "react";
import { SOURCES } from "../../../shared/content.js";
import { useGlassDataMotion } from "../motion/useGlassDataMotion.js";
import styles from "./GlassData.module.css";

const PATHS = [
  "M144 304C220 280 300 320 420 340C500 354 560 360 600 400",
  "M456 96C470 180 520 260 600 400",
  "M936 224C860 260 760 300 600 400",
  "M864 576C800 540 720 500 600 400",
  "M264 624C340 580 460 500 600 400",
];

export function GlassData() {
  const rootRef = useRef(null);
  useGlassDataMotion(rootRef);

  return (
    <section className={styles.section} id="process" ref={rootRef}>
      <div className={styles.head}>
        <h2 className={styles.title}>
          <span>Разные показатели.</span>
          <span>Одна картина.</span>
        </h2>
      </div>

      <div className={styles.field} data-field>
        <svg className={styles.lines} viewBox="0 0 1200 800" fill="none" aria-hidden="true">
          {PATHS.map((d) => (
            <path key={d} d={d} data-path />
          ))}
        </svg>

        {SOURCES.map((source) => (
          <p
            key={source.id}
            className={styles.node}
            style={{ left: `${source.x}%`, top: `${source.y}%` }}
            data-node
          >
            <span className={styles.dot} aria-hidden="true" />
            <strong>{source.label}</strong>
            <small>{source.note}</small>
          </p>
        ))}

        <div className={styles.core} data-core>
          <p className={styles.coreLabel}>Ваш профиль</p>
          <p className={styles.coreText} data-assembled>
            Картина собрана
          </p>
        </div>
      </div>
    </section>
  );
}
