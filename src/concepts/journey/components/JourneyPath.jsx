import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "../../../components/Button.jsx";
import styles from "./JourneyPath.module.css";

const STEPS = [
  ["Расскажите, что важно вам", "Три вопроса о вашей цели, главной сложности и удобном формате поддержки. Анализы и контакты для этого не нужны."],
  ["Получите понятный ориентир", "Увидите фокус программы, полезный инструмент для старта и подходящий вариант поддержки — с объяснением выбора."],
  ["Выберите следующий шаг", "Посмотрите, что входит в программу. Персональный план формируется отдельно, после разбора вашей ситуации специалистом."],
];

export function JourneyPath({ onSurvey }) {
  return <>
    <section className={styles.section} id="process">
      <div className={styles.topline}><span>Ваш первый шаг</span><ArrowDown size={20}/></div>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <h2>Начните с того,<br/>что важно вам.</h2>
          <p>Не нужно заранее знать, какая программа подойдёт. Ответьте на три вопроса — и получите ориентир, с которым проще принять решение.</p>
          <Button data-primary onClick={onSurvey}>Ответить на 3 вопроса</Button>
          <span className={styles.note}>Около 2 минут · без регистрации</span>
        </div>
        <ol className={styles.steps}>{STEPS.map(([title,text],i)=><li key={title}><span className={styles.number}>{i+1}</span><div><h3>{title}</h3><p>{text}</p>{i<2&&<ArrowDown size={17} className={styles.arrow} aria-hidden="true"/>}</div></li>)}</ol>
      </div>
    </section>
    <footer className={styles.footer}><a href="#top">Healthcode <ArrowRight size={17}/></a><p>Персональный подход к питанию и привычкам</p><span>Демонстрационная версия</span></footer>
  </>;
}
