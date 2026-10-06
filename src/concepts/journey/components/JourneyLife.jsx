import { assetPath } from "../../../media.js";
import styles from "./JourneyLife.module.css";

const MARKS = [
  ["Предпочтения", "Что уже нравится и что не обсуждается."],
  ["Режим", "Где в дне есть место, а где его нет."],
  ["Замены", "Чем закрыть шаг, если привычного нет под рукой."],
  ["Цель", "Зачем этот шаг именно вам."],
];

export function JourneyLife() {
  return (
    <section className={styles.section} id="life">
      <figure className={styles.photo} data-reveal>
        <img
          src={assetPath("images/journey-life.webp")}
          alt="Мужчина ставит миску на светлый стол у окна"
          width="1152"
          height="864"
          loading="lazy"
        />
      </figure>
      <div className={styles.copy}>
        <h2>
          План должен
          <br />
          работать в жизни.
        </h2>
        <p className={styles.lead}>Не набор блюд. Правила, которые выдерживает обычный день.</p>
        <div className={styles.marks}>
          <svg data-plot="enter" aria-hidden="true">
            <path data-under />
            <path data-over />
          </svg>
          <ul>
            {MARKS.map(([title, text]) => (
              <li key={title}>
                <span className={styles.node} data-pin><i /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
