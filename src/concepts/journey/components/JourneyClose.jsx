import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/Button.jsx";
import styles from "./JourneyClose.module.css";

const ECHO = ["Анализы", "Фокус", "Рекомендации", "План", "Сопровождение"];

export function JourneyClose({ onSurvey }) {
  return (
    <section className={styles.section} id="start">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <h2>
            Начните
            <br />
            <em>со своего запроса.</em>
          </h2>
          <p>Три коротких вопроса помогут определить подходящий формат сопровождения.</p>
        </div>
        <div className={styles.dest}>
          <p className={styles.mark}>05</p>
          <p className={styles.caption}>Точка, с которой начинается ваш маршрут</p>
          <ol>
            {ECHO.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
      </div>
      <div className={styles.arrive}>
        <span className={styles.origin} data-pin aria-hidden="true"><i /></span>
        <div className={styles.cta} data-pin="end">
          <Button data-primary onClick={onSurvey}>Подобрать формат</Button>
        </div>
      </div>
      <svg data-plot="enter" data-bow="down" aria-hidden="true">
        <path data-track />
        <path data-under />
        <path data-over />
      </svg>
      <footer className={styles.footer}>
        <a href="#top">Healthcode <ArrowRight size={16} /></a>
        <p>Персональный маршрут. Демонстрационная версия.</p>
      </footer>
    </section>
  );
}
