import { useEffect, useState } from "react";
import { CONCEPTS, SWITCHER_KEY } from "./concepts.js";
import styles from "./ConceptSwitcher.module.css";

function readCollapsed() {
  try {
    return localStorage.getItem(SWITCHER_KEY) === "1";
  } catch {
    return false;
  }
}

export function ConceptSwitcher({ concept, onChange }) {
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const current = CONCEPTS.find((item) => item.id === concept) ?? CONCEPTS[0];

  useEffect(() => {
    try {
      localStorage.setItem(SWITCHER_KEY, collapsed ? "1" : "0");
    } catch {
      /* private mode */
    }
  }, [collapsed]);

  return (
    <div className={`${styles.wrap} ${collapsed ? styles.collapsed : ""}`}>
      <p className={styles.kicker}>Design</p>
      <div className={styles.row} role="tablist" aria-label="Дизайн-концепции">
        {CONCEPTS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === concept}
            className={`${styles.tab} ${item.id === concept ? styles.on : ""}`}
            title={item.full}
            onClick={() => onChange(item.id)}
          >
            <span className={styles.code}>{item.code}</span>
            <span className={styles.name}>{item.name}</span>
          </button>
        ))}
      </div>
      <button
        className={styles.toggle}
        type="button"
        aria-expanded={!collapsed}
        aria-label={collapsed ? "Развернуть переключатель концепций" : "Свернуть переключатель концепций"}
        onClick={() => setCollapsed((value) => !value)}
      >
        {collapsed ? current.code : "–"}
      </button>
    </div>
  );
}
