import styles from "./JourneyRoute.module.css";

const STEPS = [
  ["01", "Разобраться", "Что уже известно — без нового обследования на старте."],
  ["02", "Выбрать фокус", "Один приоритет вместо равного внимания ко всему."],
  ["03", "Получить план", "Конкретные действия на ближайший отрезок."],
  ["04", "Встроить в жизнь", "В ваш день, а не в идеальное расписание."],
  ["05", "Корректировать", "Если шаг не сел — маршрут сдвигается."],
];

export function JourneyRoute() {
  return (
    <section className={styles.section} id="programs">
      <div className={styles.head}>
        <div>
          <h2>Пять шагов. Один маршрут.</h2>
          <p>Сначала ясность. Потом шаг, который можно удержать.</p>
        </div>
        <p className={styles.progress}><span data-route-now>01</span> / 05</p>
      </div>
      <div className={styles.track}>
        <svg data-plot="scrub" aria-hidden="true">
          <path data-track />
          <path data-under />
          <path data-over />
        </svg>
        <span className={styles.traveler} data-traveler aria-hidden="true" />
        <ol>
          {STEPS.map(([num, title, text]) => (
            <li key={num} data-step>
              <span className={styles.node} data-pin><i /></span>
              <span className={styles.num}>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
