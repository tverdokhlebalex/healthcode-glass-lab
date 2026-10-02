import { useRef } from "react";
import { Picture } from "../../../components/Picture.jsx";
import { useGlassReveal } from "../motion/useGlassReveal.js";
import styles from "./GlassExpert.module.css";

export function GlassExpert() {
  const rootRef = useRef(null);
  useGlassReveal(rootRef);

  return (
    <section className={styles.section} id="expert" ref={rootRef}>
      <div className={styles.scene}>
        <div className={styles.face} data-face>
          <Picture
            name="expert"
            alt="Эксперт за стеклом смотрит на данные"
            sizes="(max-width: 800px) 100vw, 70vw"
          />
        </div>

        <div className={styles.veil} aria-hidden="true" />

        <p className={styles.behind} data-behind>
          <span>Сон</span>
          7:32
        </p>

        <p className={styles.fore} data-fore>
          <span>Ферритин · демо</span>
          42
        </p>

        <div className={styles.copy} data-copy>
          <h2 className={styles.title}>
            <span>Данные</span>
            <span>не объясняют</span>
            <span>себя сами.</span>
          </h2>
          <p className={styles.text}>
            Эксперт смотрит на показатели вместе: учитывает цели, питание, сон и образ жизни.
          </p>
        </div>
      </div>
    </section>
  );
}
