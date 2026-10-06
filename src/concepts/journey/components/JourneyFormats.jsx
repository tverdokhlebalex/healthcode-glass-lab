import { PROGRAM_FORMATS } from "./programFormats.js";
import styles from "./JourneyFormats.module.css";

export function JourneyFormats() {
  return <section className={styles.section} id="formats" aria-labelledby="journey-formats-title">
    <span id="programs" aria-hidden="true"/>
    <h2 id="journey-formats-title">Выберите глубину сопровождения</h2>
    <div className={styles.columns}>{PROGRAM_FORMATS.map(format=><article key={format.id}>
      <span className={styles.dot} aria-hidden="true"/>
      <h3>{format.name}</h3>
      <p>{format.description}</p>
    </article>)}</div>
  </section>;
}
