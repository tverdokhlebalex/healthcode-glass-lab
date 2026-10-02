import { useRef } from "react";
import { PLAN } from "../../../shared/content.js";
import { useGlassReveal } from "../motion/useGlassReveal.js";
import styles from "./GlassPlan.module.css";

export function GlassPlan() {
  const rootRef = useRef(null);
  useGlassReveal(rootRef);

  return (
    <section className={styles.section} id="plan" ref={rootRef}>
      <div className={styles.surface} data-surface>
        <h2 className={styles.title}>
          <span>В итоге —</span>
          <span>понятный план.</span>
        </h2>
        <ol className={styles.list}>
          {PLAN.map((item) => (
            <li key={item.index} data-row>
              <span className={styles.num}>{item.index}</span>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.action}>
                {item.action}
                <small>Макет · демо</small>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
