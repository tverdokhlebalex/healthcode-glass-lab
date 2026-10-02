import styles from "./GlassButton.module.css";

export function GlassButton({ children, onClick, tone = "ink", size = "lg" }) {
  return (
    <button className={`${styles.btn} ${styles[tone]} ${styles[size]}`} type="button" onClick={onClick}>
      <span>{children}</span>
      <span className={styles.mark} aria-hidden="true" />
    </button>
  );
}
