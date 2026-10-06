import { assetPath } from "../../../media.js";
import styles from "./JourneyLife.module.css";

const MARKS = [
  ["Предпочтения", "Какие продукты и блюда вам нравятся и что точно не подходит."],
  ["Режим", "Когда вы обычно едите, готовите дома или выбираете еду вне дома."],
  ["Замены", "Чем заменить привычный продукт, чтобы план не ломался из-за одного исключения."],
  ["Цель", "Каждая рекомендация должна быть связана с вашей задачей, а не существовать сама по себе."],
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
        <p className={styles.lead}>Рекомендации учитывают не только показатели анализов, но и ваш обычный рацион, режим и предпочтения.</p>
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
        <p className={styles.note}>Не идеальное меню. Реалистичные изменения, которые можно сохранить в обычной жизни.</p>
      </div>
    </section>
  );
}
