import { useRef } from "react";
import { Picture } from "../../../components/Picture.jsx";
import { HERO_LEAD } from "../../../shared/content.js";
import { useGlassHeroMotion } from "../motion/useGlassHeroMotion.js";
import { GlassButton } from "./GlassButton.jsx";
import styles from "./GlassHero.module.css";

export function GlassHero({ onSurvey }) {
  const rootRef = useRef(null);
  useGlassHeroMotion(rootRef);

  return (
    <section className={styles.hero} id="top" ref={rootRef}>
      <div className={styles.space} data-bg>
        <div className={styles.light} data-light />
        <div className={styles.wall} aria-hidden="true" />
        <div className={styles.wallB} aria-hidden="true" />
        <div className={styles.ghost} data-ghost aria-hidden="true">
          <Picture
            name="hero"
            alt=""
            className={styles.ghostImg}
            priority
          />
        </div>
      </div>

      <div className={styles.plane} data-plane aria-hidden="true" />

      <svg className={styles.gold} viewBox="0 0 1440 900" fill="none" aria-hidden="true" data-gold>
        <path d="M220 210C420 190 610 260 780 240C980 216 1120 140 1280 168" />
        <path d="M180 620C360 560 520 640 740 600C980 548 1160 680 1320 640" />
        <path d="M860 120C900 280 840 420 920 620C960 720 1040 780 1180 820" />
      </svg>

      <div className={styles.copy} data-copy>
        <h1 className={styles.title}>
          <span className={styles.mask}>
            <span data-title-line>Ваше</span>
          </span>
          <span className={styles.mask}>
            <span data-title-line>здоровье</span>
          </span>
          <span className={styles.mask}>
            <span data-title-line>видно</span>
          </span>
        </h1>
        <p className={styles.lead} data-lead>
          {HERO_LEAD}
        </p>
        <div className={styles.actions} data-cta>
          <GlassButton onClick={onSurvey}>Пройти мини-опрос</GlassButton>
          <a className={styles.more} href="#process">
            Как это работает <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <article className={styles.main} data-main>
        <p className={styles.label}>Ферритин</p>
        <p className={styles.value}>
          42
          <small>нг/мл</small>
        </p>
        <p className={styles.meta}>
          <span>Динамика за 3 месяца</span>
          <b>↗</b>
        </p>
        <p className={styles.demo}>Демо-показатель</p>
      </article>

      <aside className={`${styles.chip} ${styles.sleep}`} data-layer>
        <p className={styles.label}>Сон</p>
        <p className={styles.chipValue}>7:32</p>
        <p className={styles.chipNote}>+24 мин</p>
      </aside>

      <aside className={`${styles.chip} ${styles.energy}`} data-layer>
        <p className={styles.label}>Энергия</p>
        <p className={styles.chipWord}>Стабильно</p>
      </aside>

      <aside className={`${styles.chip} ${styles.food}`} data-layer data-hide-mobile>
        <p className={styles.label}>Питание</p>
        <p className={styles.chipWord}>Фокус недели</p>
      </aside>
    </section>
  );
}
