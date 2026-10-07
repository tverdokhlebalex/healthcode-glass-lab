import { useRef } from "react";
import { Button } from "./Button.jsx";
import { Picture } from "./Picture.jsx";
import { FadeUp } from "../motion/FadeUp.jsx";
import { RevealText } from "../motion/RevealText.jsx";
import { useCinematicMotion } from "../motion/useCinematicMotion.js";
import styles from "./CinematicHero.module.css";

// Демо-значения — визуальный концепт, не медицинские данные
const NOTES = [
  { label: "Сон", value: "7 ч 32 мин" },
  { label: "Энергия", value: "Стабильно" },
  { label: "Питание", value: "Фокус" },
  { label: "Восстановление", value: "+12%" },
];

export function CinematicHero({ onSurvey }) {
  const rootRef = useRef(null);
  useCinematicMotion(rootRef);

  return (
    <section className={styles.hero} id="top" ref={rootRef}>
      <div className={styles.canvas} data-canvas>
        <div className={styles.zoom} data-zoom>
          <Picture
            name="hero"
            className={styles.photo}
            alt="Женщина спускается по спиральной лестнице из белого камня в светлом атриуме со стеклом"
            priority
          />
        </div>
      </div>

      <div className={styles.copy} data-copy>
        <RevealText as="h1" className={styles.title} mode="load" delay={0.28} duration={0.92} stagger={0.09}>
          <span>Ваши анализы.</span>
          <span>Понятные рекомендации.</span>
          <span>Персональный план.</span>
        </RevealText>
        <FadeUp as="p" className={styles.lead} immediate delay={0.62}>
          Загрузите результаты анализов и расскажите о своих целях и привычках. Специалист поможет разобраться в показателях и подготовит персональные рекомендации по питанию и витаминам.
        </FadeUp>
        <FadeUp as="div" className={styles.actions} immediate delay={0.74}>
          <Button magnetic onClick={onSurvey}>
            Пройти мини-опрос
          </Button>
          <p className={styles.caption}>3 вопроса · около 2 минут</p>
        </FadeUp>
      </div>

      <div className={styles.path} data-notes>
        <div className={styles.rail}>
          <svg className={styles.line} viewBox="0 0 600 8" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 4H600" data-hero-path />
          </svg>
          <ul className={styles.labels}>
            {NOTES.map((note, index) => (
              <li key={note.label} data-note>
                <span className={styles.dot} aria-hidden="true" />
                <small>{String(index + 1).padStart(2, "0")}</small>
                <span className={styles.noteLabel}>{note.label}</span>
                <strong className={styles.noteValue}>{note.value}</strong>
              </li>
            ))}
          </ul>
          <span className={styles.drop} aria-hidden="true" data-drop>
            <i data-drop-dot />
          </span>
        </div>
        <p className={styles.demo} data-demo>
          Демо-данные
        </p>
      </div>


    </section>
  );
}
