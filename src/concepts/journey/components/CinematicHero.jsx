import { Button } from "../../../components/Button.jsx";
import { Picture } from "../../../components/Picture.jsx";
import { FadeUp } from "../../../motion/FadeUp.jsx";
import { ArrowDown, Check } from "lucide-react";
import styles from "./CinematicHero.module.css";

const BENEFITS = [
  ["Меньше поиска. Больше ясности.", "Анализы, рекомендации и история изменений собраны вместе. Не нужно каждый раз искать результаты и начинать разговор со специалистом с нуля."],
  ["Питание, которое подходит вам.", "План учитывает ваши предпочтения, привычный распорядок и цель. Вы понимаете, что можно изменить в повседневном рационе и с чего начать."],
  ["Поддержка на пути к привычке.", "Специалист помогает разобраться в рекомендациях, обсудить сложности и скорректировать действия, если первоначальный план не вписался в жизнь."],
];

export function CinematicHero({ onSurvey }) {
  return <section className={styles.hero} id="top">
    <div className={styles.intro}>
      <FadeUp immediate className={styles.copy}>
        <p className={styles.tag}><span/> Здоровье в вашем ритме</p>
        <h1>Питание и привычки<br/><em>под вашу жизнь.</em></h1>
        <p className={styles.lead}>Разберитесь в своих анализах, выберите посильные изменения в питании и двигайтесь к цели с поддержкой специалиста.</p>
        <p className={styles.detail}>Healthcode соединяет ваши цели, образ жизни и экспертный разбор в один понятный план. Чтобы меньше искать советы и яснее понимать, что делать дальше.</p>
        <div className={styles.actions}>
          <Button data-primary onClick={onSurvey}>Подобрать формат</Button>
          <span>3 вопроса · около 2 минут<br/>В конце — подходящее направление и следующий шаг</span>
        </div>
        <a className={styles.more} href="#programs">Что входит в программу <ArrowDown size={16}/></a>
      </FadeUp>
      <div className={styles.visual}>
        <Picture name="hero" alt="Женщина в светлом пространстве — забота о себе в привычном ритме" priority sizes="(max-width: 760px) 100vw, 48vw" />
        <span className={styles.imageLabel}><Check size={17}/> Ваш день. Ваш темп.</span>
      </div>
    </div>
    <div className={styles.benefits} id="about">
      <div className={styles.benefitsTitle}><span>В чём польза Healthcode</span><ArrowDown size={20}/></div>
      <div className={styles.benefitList}>{BENEFITS.map(([title,text],i)=><article key={title}><span className={styles.number}>0{i+1}</span><h2>{title}</h2><p>{text}</p></article>)}</div>
    </div>
  </section>;
}
