import { useRef } from "react";
import { Picture } from "../../../components/Picture.jsx";
import { useGlassReveal } from "../motion/useGlassReveal.js";
import styles from "./GlassLife.module.css";

export function GlassLife() {
  const rootRef = useRef(null);
  useGlassReveal(rootRef);

  return (
    <section className={styles.section} id="life" ref={rootRef}>
      <div className={styles.visual} data-visual>
        <Picture name="life" alt="Человек готовит в светлой кухне — данные возвращаются в повседневную жизнь" />
        <div className={styles.wash} aria-hidden="true" />
      </div>
      <h2 className={styles.title} data-copy>
        <span>Данные важны,</span>
        <span>когда они меняют</span>
        <span>реальную жизнь.</span>
      </h2>
    </section>
  );
}
