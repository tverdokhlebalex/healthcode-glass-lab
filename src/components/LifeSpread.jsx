import { useRef } from "react";
import { assetPath } from "../media.js";
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
          <img src={assetPath("/images/journey-food.webp")} alt="Лосось с запечёнными овощами, чечевицей и свежей зеленью на керамической тарелке" width="1536" height="1024" loading="lazy" decoding="async" />
        </div>
      </div>

      <div className={styles.copy}>
        <RevealText as="h2" className={styles.title} stagger={0.08} duration={1.05}>
          <span>Питание, которое</span>
          <span>подходит вашей жизни.</span>
        </RevealText>
        <p className={styles.text}>Рекомендации учитывают привычки, любимые продукты, режим дня и цели. Не идеальное меню на бумаге, а изменения, которые реально встроить в повседневность.</p>
      </div>

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
