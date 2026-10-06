import { ArrowRight } from "lucide-react";
import { useId } from "react";
import { Button } from "../../../components/Button.jsx";
import styles from "./JourneyClose.module.css";

const ECHO = ["Профиль", "Анализы", "Разбор", "План", "Сопровождение"];

export function JourneyClose({ onSurvey }) {
  const maskId = `close-labels-${useId().replace(/:/g, "")}`;
  return <section className={styles.section} id="start">
    <div className={styles.grid}>
      <div className={styles.copy}>
        <h2>Начните<br/><em>с короткого опроса.</em></h2>
        <p>Ответьте на три вопроса — покажем, какой формат программы может подойти именно вам.</p>
        <div className={styles.cta}><Button data-primary onClick={onSurvey}>Подобрать формат</Button><span>Около 2 минут · без регистрации</span></div>
      </div>
      <div className={styles.dest} role="group" aria-label="Профиль, анализы, разбор, план и сопровождение — ваш формат">
        <svg data-plot="enter" aria-hidden="true"><defs><mask id={maskId} maskUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="white"/><g data-label-cutouts/></mask></defs><g mask={`url(#${maskId})`}><path data-track/><path data-under/><path data-over/></g></svg>
        <ol>{ECHO.map((item,index)=><li key={item} data-position={index}><span data-pin aria-hidden="true"><i/></span><span data-trajectory-label>{item}</span></li>)}</ol>
        <p className={styles.caption}><span data-pin aria-hidden="true"><i/></span><span data-trajectory-label>Ваш формат</span></p>
      </div>
    </div>
    <footer className={styles.footer}><a href="#top">Healthcode <ArrowRight size={16}/></a><p>Онлайн-сопровождение по питанию и витаминам.</p></footer>
  </section>;
}
