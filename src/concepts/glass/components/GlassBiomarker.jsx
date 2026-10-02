import { useRef } from "react";
import { BIOMARKERS } from "../../../shared/content.js";
import { useGlassBiomarkerMotion } from "../motion/useGlassBiomarkerMotion.js";
import styles from "./GlassBiomarker.module.css";

const CHART = { width: 720, height: 220, floor: 200 };
const XS = [40, 250, 470, 680];

function smooth(points) {
  return points.reduce((d, point, i) => {
    if (i === 0) return `M${point[0]} ${point[1]}`;
    const p0 = points[i - 2] ?? points[i - 1];
    const p1 = points[i - 1];
    const p3 = points[i + 1] ?? point;
    const c1 = [p1[0] + (point[0] - p0[0]) / 6, p1[1] + (point[1] - p0[1]) / 6];
    const c2 = [point[0] - (p3[0] - p1[0]) / 6, point[1] - (p3[1] - p1[1]) / 6];
    return `${d}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${point[0]} ${point[1]}`;
  }, "");
}

const SERIES = BIOMARKERS.map((item) => {
  const points = item.ys.map((y, i) => [XS[i], y]);
  return { ...item, points, line: smooth(points) };
});

export function GlassBiomarker() {
  const rootRef = useRef(null);
  useGlassBiomarkerMotion(rootRef);

  return (
    <section className={styles.section} id="product" ref={rootRef}>
      <div className={styles.room} data-room>
        <ol className={styles.index} aria-label="Биомаркеры, демо">
          {SERIES.map((item, index) => (
            <li key={item.id} data-index data-on={index === 0 ? "true" : "false"}>
              <span>{item.index}</span>
              {item.name}
            </li>
          ))}
        </ol>

        <div className={styles.figure}>
          {SERIES.map((item, index) => (
            <p key={item.id} className={styles.value} data-value data-on={index === 0 ? "true" : "false"}>
              <b data-num={item.value}>{item.value}</b>
              <span>
                {item.name}
                <small>{item.unit} · демо</small>
              </span>
            </p>
          ))}
        </div>

        <svg
          className={styles.chart}
          viewBox={`0 0 ${CHART.width} ${CHART.height}`}
          role="img"
          aria-label="Демонстрационная динамика выбранного показателя"
        >
          {[50, 100, 150].map((y) => (
            <path key={y} className={styles.grid} d={`M0 ${y}H${CHART.width}`} />
          ))}
          {SERIES.map((item, index) => (
            <path
              key={item.id}
              className={styles.trend}
              d={item.line}
              data-trend
              data-on={index === 0 ? "true" : "false"}
            />
          ))}
        </svg>

        <aside className={styles.side} data-side>
          {SERIES.map((item, index) => (
            <div key={item.id} className={styles.note} data-note data-on={index === 0 ? "true" : "false"}>
              <p>{item.insight}</p>
              <p className={styles.context}>{item.context}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
