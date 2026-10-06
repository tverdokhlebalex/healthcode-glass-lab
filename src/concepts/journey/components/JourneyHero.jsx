import { useEffect, useRef } from "react";
import { Button } from "../../../components/Button.jsx";
import { prefersReducedMotion } from "../../../motion/gsap.js";
import styles from "./JourneyHero.module.css";

const NODES = [
  { id: "analyses", n: "01", title: "Анализы", value: "42", note: "нг/мл", depth: "1" },
  { id: "focus", n: "02", title: "Фокус", value: "Энергия", note: "месяц", depth: "2" },
  { id: "advice", n: "03", title: "Рекомендации", value: "1", note: "шаг", depth: "1" },
  { id: "plan", n: "04", title: "План", value: "7", note: "дней", depth: "3" },
  { id: "care", n: "05", title: "Сопровождение", value: "рядом", note: "", depth: "2" },
];

export function JourneyHero({ onSurvey }) {
  const fieldRef = useRef(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || prefersReducedMotion()) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const onMove = (event) => {
      const box = field.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      field.style.setProperty("--mx", x.toFixed(3));
      field.style.setProperty("--my", y.toFixed(3));
    };
    const onLeave = () => {
      field.style.setProperty("--mx", "0");
      field.style.setProperty("--my", "0");
    };

    field.addEventListener("pointermove", onMove);
    field.addEventListener("pointerleave", onLeave);
    return () => {
      field.removeEventListener("pointermove", onMove);
      field.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className={styles.hero} id="top">
      <div className={styles.copy}>
        <p className={styles.kicker}>Health Journey</p>
        <h1>
          От состояния
          <br />
          к своему
          <br />
          <em>маршруту.</em>
        </h1>
        <p className={styles.lead}>
          От того, что есть сейчас, — к понятным шагам, которые можно встроить в обычную жизнь.
        </p>
        <div className={styles.actions}>
          <Button data-primary onClick={onSurvey}>Подобрать формат</Button>
          <span>3 вопроса · около 2 минут</span>
        </div>
      </div>
      <div className={styles.field} ref={fieldRef} data-field>
        <svg data-plot="load" aria-hidden="true">
          <path data-track />
          <path data-under />
          <path data-over />
        </svg>
        {NODES.map((node) => (
          <article key={node.id} className={styles.node} data-pin data-place={node.id} data-depth={node.depth}>
            <div className={styles.shift}>
              <i />
              <span className={styles.num}>{node.n}</span>
              <strong>{node.title}</strong>
              <em>{node.value}{node.note ? <small>{node.note}</small> : null}</em>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
