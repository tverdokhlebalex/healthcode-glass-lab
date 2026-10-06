import { assetPath } from "../../../media.js";
import styles from "./JourneySignal.module.css";

const POINTS = [
  { n: "01", title: "Анализы", value: "Ферритин", metric: "42 нг/мл", text: "Один из показателей, который рассматривается вместе с остальными.", kind: "report" },
  { n: "02", title: "Питание", value: "Рацион и привычки", text: "Что и как вы обычно едите.", kind: "meal" },
  { n: "03", title: "Цели", value: "Ваш приоритет", text: "Энергия, питание, режим или другая задача.", kind: "focus" },
  { n: "04", title: "Динамика", value: "История изменений", text: "Можно возвращаться к прошлым результатам и видеть изменения.", kind: "history" },
];

function Graphic({ kind }) {
  if (kind === "report") return <svg className={styles.graphic} viewBox="0 0 132 24" aria-hidden="true"><path d="M2 4H60M2 12H84M2 20H46"/><circle cx="113" cy="12" r="5"/></svg>;
  if (kind === "meal") return <svg className={styles.graphic} viewBox="0 0 132 24" aria-hidden="true"><path d="M8 2V9Q8 15 14 15Q20 15 20 9V2M14 2V22M32 2V22M32 2Q40 12 32 13"/><ellipse cx="81" cy="12" rx="26" ry="9"/></svg>;
  if (kind === "focus") return <svg className={styles.graphic} viewBox="0 0 132 24" aria-hidden="true"><path d="M5 12H124"/><circle cx="15" cy="12" r="3"/><circle cx="65" cy="12" r="3" data-now/><circle cx="115" cy="12" r="3"/></svg>;
  return <svg className={styles.graphic} viewBox="0 0 132 24" aria-hidden="true"><path d="M5 18C25 18 28 7 48 9S85 18 124 5" data-line/><circle cx="48" cy="9" r="3"/><circle cx="124" cy="5" r="3" data-now/></svg>;
}

export function JourneySignal() {
  return <section className={styles.section} id="about">
    <figure className={styles.portrait} data-reveal><img src={assetPath("images/journey-window.webp")} alt="Женщина у окна в светлой комнате" width="864" height="1152" loading="lazy"/></figure>
    <div className={styles.copy}>
      <div className={styles.head}><h2>Показатели важны<br/>в контексте.</h2><p>Специалист рассматривает анализы вместе с вашими целями, рационом и привычным образом жизни — чтобы выделить действительно важное.</p></div>
      <div className={styles.index}>
        <svg data-plot="enter" aria-hidden="true"><path data-track/><path data-under/><path data-over/></svg>
        <ol>{POINTS.map(point=><li key={point.n}>
          <span className={styles.node} data-pin aria-hidden="true"><i/></span>
          <div className={styles.item}>
            <div className={styles.row}><h3><span>{point.n}</span> {point.title}</h3><div className={styles.value}><strong>{point.value}</strong>{point.metric&&<span className={styles.metric}>{point.metric} <small>DEMO</small></span>}</div></div>
            <p>{point.text}</p>
            <Graphic kind={point.kind}/>
          </div>
        </li>)}</ol>
      </div>
      <p className={styles.summary}>Основа персональных рекомендаций по питанию и витаминам.</p>
    </div>
  </section>;
}
