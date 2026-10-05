import { Button } from "../../../components/Button.jsx";
import { Picture } from "../../../components/Picture.jsx";
import { FadeUp } from "../../../motion/FadeUp.jsx";
import { ArrowDown, Check } from "lucide-react";
import styles from "./Expertise.module.css";

const DELIVERABLES = [
  ["Разбор вашей ситуации", "Специалист рассматривает имеющиеся анализы вместе с целями, питанием и образом жизни.", "На выходе: понятные приоритеты — чему уделить внимание в первую очередь."],
  ["Персональный план действий", "Конкретные рекомендации по питанию и привычкам, которые можно встроить в ваш распорядок.", "В работе: список действий, варианты замены продуктов и фокус на ближайший период."],
  ["Поддержка и корректировки", "В формате с сопровождением вы обсуждаете вопросы и отмечаете, что получается, а что пока трудно.", "На выходе: уточнённый план с учётом вашего опыта и изменений."],
];

export function Expertise({ onSurvey }) {
  return <section className={styles.expert} id="programs">
    <div className={styles.sectionBar}><span>Что вы получаете в программе</span><ArrowDown size={20}/></div>
    <div className={styles.layout}>
      <div className={styles.portrait} id="expert">
        <Picture name="expert" alt="Специалист изучает результаты и готовит персональные рекомендации" sizes="(max-width: 760px) 100vw, 40vw"/>
        <div className={styles.tag}><Check size={18}/><p>Рядом — специалист.<span>У рекомендаций есть объяснение.</span></p></div>
      </div>
      <FadeUp className={styles.copy}>
        <h2>От понимания —<br/>к вашему плану.</h2>
        <p className={styles.intro}>Программа — это конкретные инструменты для повседневной жизни. Вот как устроена работа и что остаётся у вас после каждого этапа.</p>
        <ol className={styles.deliverables}>{DELIVERABLES.map(([title,text,result],i)=><li key={title}><span className={styles.number}>0{i+1}</span><div><h3>{title}</h3><p>{text}</p><p className={styles.result}>{result}</p></div></li>)}</ol>
        <div className={styles.actions}><Button data-primary onClick={onSurvey}>Найти свой формат</Button><p>Короткий опрос поможет выбрать направление.<br/>Состав программы уточняется индивидуально.</p></div>
      </FadeUp>
    </div>
  </section>;
}
