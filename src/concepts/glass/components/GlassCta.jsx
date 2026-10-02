import { useRef } from "react";
import { GlassButton } from "./GlassButton.jsx";
import { useGlassReveal } from "../motion/useGlassReveal.js";
import styles from "./GlassCta.module.css";

export function GlassCta({ onSurvey }) {
  const rootRef = useRef(null);
  useGlassReveal(rootRef);

  return (
    <section className={styles.section} id="about" ref={rootRef}>
      <div className={styles.orb} aria-hidden="true" data-orb />
      <div className={styles.copy} data-copy>
        <h2 className={styles.title}>
          <span>Начните</span>
          <span>с двух минут.</span>
        </h2>
        <p className={styles.lead}>
          Ответьте на несколько вопросов, и мы покажем подходящий формат сопровождения.
        </p>
        <GlassButton onClick={onSurvey}>Пройти мини-опрос</GlassButton>
      </div>
    </section>
  );
}
