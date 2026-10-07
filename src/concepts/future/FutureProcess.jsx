import { Button } from "../../components/Button.jsx";
import styles from "./FutureProcess.module.css";

const STEPS = [
  ["Мини-опрос", "Ответьте на 3 вопроса о целях, глубине разбора и нужной поддержке."],
  ["Выбор подходящего формата", "Посмотрите результат опроса и выберите формат программы."],
  ["Загрузка анализов", "Добавьте результаты и расскажите о привычках и самочувствии."],
  ["Разбор специалистом", "Специалист рассмотрит показатели вместе с вашей анкетой."],
  ["Персональный план", "Получите рекомендации по питанию и витаминам, а также конкретные действия."],
  ["Сопровождение", "Обсуждайте результаты, задавайте вопросы и корректируйте план."],
];

export function FutureProcess({ onSurvey }) {
  return (
    <section className={styles.process} id="process" aria-labelledby="process-title">
      <div className={styles.intro}>
        <h2 id="process-title">От первого вопроса<br />до персонального плана.</h2>
        <p>Понятный маршрут: вы делитесь своими целями и данными, специалист помогает превратить их в действия.</p>
      </div>
      <ol className={styles.steps}>
        {STEPS.map(([title, text], index) => (
          <li key={title}>
            <div className={styles.rail}><span>{String(index + 1).padStart(2, "0")}</span>{index < 5 && <span aria-hidden="true">→</span>}</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      <div className={styles.actions}>
        <Button onClick={onSurvey}>Пройти мини-опрос</Button>
        <p>Ответьте на 3 вопроса — покажем подходящий формат программы.</p>
      </div>
    </section>
  );
}
