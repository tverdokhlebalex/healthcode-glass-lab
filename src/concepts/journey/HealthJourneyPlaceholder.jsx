import { BRAND_NAME } from "../../brand.js";
import styles from "./journey.module.css";

export function HealthJourneyPlaceholder({ onSelect }) {
  return (
    <div className={styles.page}>
      <p className={styles.brand}>{BRAND_NAME}</p>
      <p className={styles.code}>03</p>
      <h1 className={styles.title}>Health Journey</h1>
      <p className={styles.lead}>
        Интерактивная история:
        <br />
        от анализов до персонального плана.
      </p>
      <p className={styles.note}>Концепция в разработке.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => onSelect("future")}>
          Вернуться к Future Health
        </button>
        <button type="button" onClick={() => onSelect("glass")}>
          Посмотреть Glass Lab
        </button>
      </div>
    </div>
  );
}
