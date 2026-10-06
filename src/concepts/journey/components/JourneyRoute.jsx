import styles from "./JourneyRoute.module.css";

const STEPS = [
  ["01", "Расскажите о себе", "Цели, самочувствие, привычки и то, что вы хотите изменить."],
  ["02", "Загрузите анализы", "Используем уже имеющиеся результаты — не нужно начинать всё заново."],
  ["03", "Выберите формат", "Подберём программу по глубине разбора и необходимому уровню сопровождения."],
  ["04", "Получите план", "Персональные рекомендации по питанию, витаминам и следующим действиям."],
  ["05", "Корректируйте вместе", "В формате сопровождения можно обсуждать прогресс, вопросы и менять план при необходимости."],
];

export function JourneyRoute() {
  return (
    <section className={styles.section} id="process">
      <div className={styles.head}>
        <div>
          <h2>Как работает<br />Healthcode.</h2>
          <p>Весь процесс — от первого короткого опроса до персонального плана и сопровождения.</p>
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
