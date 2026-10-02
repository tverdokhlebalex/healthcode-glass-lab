import styles from "./Signals.module.css";
export function SignalDot({ className = "", ...props }) { return <i className={`${styles.dot} ${className}`} aria-hidden="true" {...props} />; }
export function MicroSparkline({ className = "", dark = false }) { return <svg viewBox="0 0 160 42" className={`${styles.spark} ${className}`} aria-hidden="true" data-dark={dark}><path d="M1 38H159" className={styles.axis}/><path d="M2 32C18 32 18 21 33 24S48 30 62 20S84 26 99 13S126 21 140 9L158 4"/><circle cx="158" cy="4" r="2.5"/></svg>; }
export function GlassLabel({children}) { return <span className={styles.label}>{children}</span>; }
export function SignalTrack({ progress = 2 / 3 }) { return <span className={styles.track} aria-hidden="true"><span style={{width:`${progress * 100}%`}}/><i style={{left:`${progress * 100}%`}}/></span>; }
