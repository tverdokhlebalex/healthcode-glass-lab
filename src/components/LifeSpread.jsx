import { useRef } from "react";
import { Picture } from "./Picture.jsx";
import { RevealText } from "../motion/RevealText.jsx";
import { useLifeMotion } from "../motion/useSpreadMotion.js";
import styles from "./LifeSpread.module.css";

export function LifeSpread() {
  const rootRef = useRef(null);
  useLifeMotion(rootRef);

  return (
    <section className={styles.life} id="life" ref={rootRef}>
      <div className={styles.frame} data-frame>
        <div className={styles.shift} data-shift>
          <Picture name="life" alt="Мужчина готовит утренний приём пищи в светлой каменной кухне со стеклом" />
        </div>
      </div>

      <RevealText as="h2" className={styles.title} stagger={0.08} duration={1.05}>
        <span>Рекомендации</span>
        <span>должны</span>
        <span>работать в</span>
        <span>вашей жизни.</span>
        <span data-late>Не только</span>
        <span data-late>на бумаге.</span>
      </RevealText>

      <aside className={styles.recommend}>
        <svg className={styles.route} viewBox="0 0 400 8" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 4H400" data-life-path />
        </svg>
        <span className={styles.node} aria-hidden="true" data-node />
        <div className={styles.card} data-card>
          <p className={styles.today}>Сегодня</p>
          <p className={styles.topic}>Питание</p>
          <p className={styles.hint}>Добавьте источник железа к одному из основных приёмов пищи</p>
          <div className={styles.progress}>
            <span className={styles.steps} aria-hidden="true">
              <i data-on="true" />
              <i data-on="true" />
              <i />
            </span>
            <p className={styles.count}>2 / 3 рекомендаций · демо</p>
          </div>
        </div>
      </aside>
    </section>
  );
}
