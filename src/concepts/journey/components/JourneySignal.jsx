import { assetPath } from "../../../media.js";
import styles from "./JourneySignal.module.css";

const POINTS = [
  {
    n: "01",
    t: "Анализы",
    d: "То, что уже есть на руках.",
    value: "42",
    unit: "нг/мл · демо",
    kind: "bar",
  },
  {
    n: "02",
    t: "Фокус",
    d: "Один приоритет на этот месяц.",
    value: "Энергия",
    unit: "72%",
    kind: "ring",
  },
  {
    n: "03",
    t: "Рекомендации",
    d: "Следующее действие, не длинный список.",
    value: "1 шаг",
    unit: "7 дней",
    kind: "steps",
  },
  {
    n: "04",
    t: "Динамика",
    d: "Как картина сдвигается со временем.",
    value: "4",
    unit: "замера · демо",
    kind: "chart",
  },
];

function Graphic({ kind }) {
  if (kind === "bar") {
    return (
      <svg className={styles.graphic} viewBox="0 0 148 28" aria-hidden="true">
        <line x1="2" y1="18" x2="146" y2="18" />
        <circle cx="78" cy="18" r="4.5" />
        <text x="70" y="10">42</text>
      </svg>
    );
  }
  if (kind === "ring") {
    return (
      <svg className={`${styles.graphic} ${styles.ring}`} viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="16" />
        <circle cx="22" cy="22" r="16" data-arc="true" />
      </svg>
    );
  }
  if (kind === "steps") {
    return (
      <svg className={styles.graphic} viewBox="0 0 92 16" aria-hidden="true">
        <line x1="6" y1="8" x2="86" y2="8" />
        <circle cx="6" cy="8" r="3.5" data-on="true" />
        <circle cx="46" cy="8" r="4.5" data-now="true" />
        <circle cx="86" cy="8" r="3.5" />
      </svg>
    );
  }
  return (
    <svg className={styles.graphic} viewBox="0 0 148 40" aria-hidden="true">
      <path d="M2 32 C 28 32, 36 20, 58 22 S 100 8, 146 12" data-line="true" />
      <circle cx="58" cy="22" r="3" />
      <circle cx="146" cy="12" r="3.5" data-now="true" />
    </svg>
  );
}

export function JourneySignal() {
  return (
    <section className={styles.section} id="about">
      <figure className={styles.portrait} data-reveal>
        <img
          src={assetPath("images/journey-window.webp")}
          alt="Женщина у высокого окна в светлой комнате"
          width="864"
          height="1152"
          loading="lazy"
        />
      </figure>
      <div className={styles.copy}>
        <div className={styles.head}>
          <h2>
            Всё важное —
            <br />
            в одной картине.
          </h2>
          <p>Четыре точки вместо разрозненных заметок.</p>
        </div>
        <div className={styles.index}>
          <svg data-plot="enter" aria-hidden="true">
            <path data-track />
            <path data-under />
            <path data-over />
          </svg>
          <ol>
            {POINTS.map((point) => (
              <li key={point.n}>
                <span className={styles.node} data-pin><i /></span>
                <div className={styles.item}>
                  <div className={styles.row}>
                    <h3><span>{point.n}</span> {point.t}</h3>
                    <strong>{point.value}</strong>
                  </div>
                  <p>{point.d} <em>{point.unit}</em></p>
                  <Graphic kind={point.kind} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
