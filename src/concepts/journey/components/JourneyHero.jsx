import { useEffect, useId, useRef } from "react";
import { Button } from "../../../components/Button.jsx";
import { prefersReducedMotion } from "../../../motion/gsap.js";
import styles from "./JourneyHero.module.css";

const NODES = [
  { id: "profile", n: "01", title: "Профиль", value: "цели и привычки", depth: "1" },
  { id: "analyses", n: "02", title: "Анализы", value: "загрузка результатов", depth: "2" },
  { id: "review", n: "03", title: "Разбор", value: "показатели и дефициты", depth: "1" },
  { id: "plan", n: "04", title: "План", value: "питание и витамины", depth: "3" },
  { id: "care", n: "05", title: "Сопровождение", value: "корректировки вместе", depth: "2" },
];

export function JourneyHero({ onSurvey }) {
  const fieldRef = useRef(null);
  const maskId = `hero-labels-${useId().replace(/:/g, "")}`;

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
          <span>Разобраться в анализах.</span>
          <em>Понять, что делать дальше.</em>
        </h1>
        <p className={styles.lead}>
          Загрузите имеющиеся анализы и расскажите о своих целях и привычках. Специалист поможет увидеть общую картину и сформирует персональные рекомендации по питанию и витаминам.
        </p>
        <div className={styles.actions}>
          <Button data-primary onClick={onSurvey}>Подобрать формат</Button>
          <span>3 вопроса · около 2 минут</span>
        </div>
      </div>
      <div className={styles.field} ref={fieldRef} data-field role="group" aria-label="Профиль, анализы, разбор, план и сопровождение">
        <svg data-plot="load" aria-hidden="true">
          <defs><mask id={maskId} maskUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="white"/><g data-label-cutouts/></mask></defs>
          <g mask={`url(#${maskId})`}><path data-track /><path data-under /><path data-over /></g>
        </svg>
        {NODES.map((node) => (
          <article key={node.id} className={styles.node} data-pin data-place={node.id} data-depth={node.depth} data-active={node.id === "plan" ? "true" : undefined}>
            <i aria-hidden="true" />
            <div className={styles.shift} data-trajectory-label>
              <span className={styles.num}>{node.n}</span>
              <strong>{node.title}</strong>
              <p>{node.value}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
