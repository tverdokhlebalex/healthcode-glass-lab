import { useRef } from "react";
import { Picture } from "../../../components/Picture.jsx";
import { useGlassHeroMotion } from "../motion/useGlassHeroMotion.js";
import { GlassButton } from "./GlassButton.jsx";
import styles from "./GlassHero.module.css";

function Refract({ x = 8, y = -4 }) {
  return (
    <span className={styles.refract} style={{ "--dx": `${x}px`, "--dy": `${y}px` }} aria-hidden="true">
      <img src="/images/hc-hero-1280.webp" alt="" />
    </span>
  );
}

export function GlassHero({ onSurvey }) {
  const rootRef = useRef(null);
  useGlassHeroMotion(rootRef);

  return (
    <section className={styles.hero} id="top" ref={rootRef}>
      <div className={styles.placeBg} data-scroll="bg">
        <div className={styles.shift} data-pan="bg">
          <div className={styles.space}>
            <div className={styles.light} data-light />
            <div className={styles.env} data-env>
              <Picture name="hero" alt="" className={styles.envImg} priority />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.placeSheet} data-scroll="sheet">
          <div className={styles.shift} data-pan="sheet">
            <div className={styles.sheet} data-sheet aria-hidden="true">
              <Refract x={14} y={-8} />
            </div>
          </div>
        </div>

        <svg className={styles.paths} data-gold aria-hidden="true">
          <path data-path />
          <path data-path />
          <path data-path />
        </svg>

        <div className={styles.placeSleep} data-scroll="secondary">
          <div className={styles.shift} data-pan="secondary">
            <aside className={styles.sleep} data-secondary>
              <Refract x={-10} y={6} />
              <div className={styles.pane}>
                <i className={styles.dot} data-from="sleep" />
                <p className={styles.label}>Сон</p>
                <p className={styles.sleepValue}>7:32</p>
                <p className={styles.delta}>+24 мин</p>
              </div>
            </aside>
          </div>
        </div>

        <div className={styles.placeMain} data-scroll="main">
          <div className={styles.shift} data-pan="main">
            <article className={styles.main} data-main>
              <Refract x={-6} y={4} />
              <span className={`${styles.anchor} ${styles.anchorLeft}`} data-anchor="left" />
              <span className={`${styles.anchor} ${styles.anchorRight}`} data-anchor="right" />
              <div className={styles.pane}>
                <p className={styles.label}>Ферритин</p>
                <p className={styles.value}>42</p>
                <p className={styles.unit}>нг/мл</p>
                <span className={styles.rule} aria-hidden="true" />
                <p className={styles.meta}>Динамика за 3 месяца</p>
                <p className={styles.demo}>Demo</p>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.placeSignals} data-scroll="signals">
          <div className={styles.shift} data-pan="secondary">
            <p className={`${styles.signal} ${styles.food}`} data-signal>
              <i className={styles.dot} data-from="food" />
              <span>
                <small>Питание</small>
                Фокус недели
              </span>
            </p>
            <p className={`${styles.signal} ${styles.energy}`} data-signal>
              <i className={styles.dot} data-from="energy" />
              <span>
                <small>Энергия</small>
                Стабильно
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.placeFore} data-scroll="fore">
        <div className={styles.shift} data-pan="fore">
          <div className={styles.copy} data-copy>
            <h1 className={styles.title}>
              <span className={styles.mask}>
                <span data-title-line>Данные</span>
              </span>
              <span className={styles.mask}>
                <span data-title-line>складываются</span>
              </span>
              <span className={styles.mask}>
                <span data-title-line>в целую картину.</span>
              </span>
            </h1>
            <p className={styles.lead} data-lead>
              Анализы, цели и привычки — в одной системе персонального сопровождения.
            </p>
            <div className={styles.actions} data-cta>
              <GlassButton onClick={onSurvey}>Пройти мини-опрос</GlassButton>
              <a className={styles.more} href="#process">
                Как это работает <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
