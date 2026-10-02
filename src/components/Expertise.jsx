import { useRef } from "react";
import { Button } from "./Button.jsx";
import { Picture } from "./Picture.jsx";
import { RevealText } from "../motion/RevealText.jsx";
import { useExpertiseMotion } from "../motion/useSpreadMotion.js";
import styles from "./Expertise.module.css";

export function Expertise({ onSurvey }) {
  const rootRef = useRef(null);
  useExpertiseMotion(rootRef);

  return (
    <section className={styles.expert} id="expert" ref={rootRef}>
      <div className={styles.portrait} data-portrait>
        <svg className={styles.dataPath} viewBox="0 0 1000 1334" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path
            data-expert-path
            d="M640 390C720 372 780 430 860 418C930 408 970 368 1000 376"
          />
        </svg>
        <Picture
          name="expert"
          alt="Эксперт в светлом пространстве смотрит данные на планшете"
          sizes="(max-width: 800px) 100vw, 55vw"
        />
        <p className={styles.tag} data-tag>
          <span aria-hidden="true" />
          Экспертная интерпретация
        </p>
      </div>
      <div className={styles.copy}>
        <RevealText as="h2" className={styles.title} stagger={0.1} duration={1.05} late={0.35}>
          <span>За данными</span>
          <span>всегда стоит</span>
          <span className={styles.human} data-late>
            человек.
          </span>
        </RevealText>
        <span className={styles.rule} data-rule />
        <p className={styles.text} data-text>
          Экспертный разбор, персональная интерпретация и сопровождение в течение программы.
        </p>
        <ul className={styles.caps} data-caps>
          <li>Разбор</li>
          <li>Рекомендации</li>
          <li>Сопровождение</li>
        </ul>
        <div className={styles.actions} data-actions>
          <Button onClick={onSurvey}>Пройти мини-опрос</Button>
        </div>
      </div>
    </section>
  );
}
