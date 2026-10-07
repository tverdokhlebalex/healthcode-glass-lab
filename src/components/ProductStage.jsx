import { useRef } from "react";
import { RevealText } from "../motion/RevealText.jsx";
import { useProductMotion } from "../motion/useProductMotion.js";
import styles from "./ProductStage.module.css";

const CHART = { width: 640, height: 172, floor: 160 };
const DATES = ["12 марта", "2 апреля", "18 мая", "3 июня"];
const XS = [36, 222, 408, 594];

// Плавная кривая через точки замеров (Catmull-Rom → Безье)
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

const TRENDS = [
  {
    id: "ferritin",
    name: "Ферритин",
    value: "42",
    unit: "нг/мл",
    insight: "Связать показатель с одним приёмом пищи на этой неделе. Демо-экран, не заключение.",
    rec: "Источник железа в одном из основных приёмов пищи",
    recLabel: "Рекомендация недели · питание",
    ys: [132, 104, 92, 40],
    focus: [0.78, 0.62, 0.7],
    lead: 0,
  },
  {
    id: "d",
    name: "Витамин D",
    value: "38",
    unit: "нг/мл",
    insight: "Смотреть динамику рядом с режимом дня. Значения демонстрационные.",
    rec: "10–15 минут дневного света до полудня",
    recLabel: "Рекомендация недели · восстановление",
    ys: [112, 130, 78, 58],
    focus: [0.64, 0.82, 0.58],
    lead: 1,
  },
  {
    id: "b12",
    name: "B12",
    value: "480",
    unit: "пг/мл",
    insight: "Оставить показатель в общей картине месяца. Это макет, не вывод.",
    rec: "Белок в первом приёме пищи после нагрузки",
    recLabel: "Рекомендация недели · энергия",
    ys: [76, 96, 60, 34],
    focus: [0.7, 0.56, 0.86],
    lead: 2,
  },
].map((trend) => {
  const points = trend.ys.map((y, i) => [XS[i], y]);
  const line = smooth(points);
  return { ...trend, points, line, area: `${line}L${XS[3]} ${CHART.floor}L${XS[0]} ${CHART.floor}Z` };
});

const FOCUS = ["Энергия", "Сон", "Питание"].map((name, i) => ({ name, end: TRENDS[0].focus[i] }));

export function ProductStage() {
  const rootRef = useRef(null);
  useProductMotion(rootRef);

  return (
    <section className={styles.product} id="product" ref={rootRef}>
      <div className={styles.stage} data-stage>
        <RevealText as="h2" className={styles.statement} stagger={0.09} duration={1}>
          <span>Не просто показатели —</span>
          <span>а их значение для вас.</span>
        </RevealText>

        <p className={styles.intro}>Мы рассматриваем анализы вместе с рационом, самочувствием, привычками и вашими целями. Так становится понятно, на что действительно стоит обратить внимание.</p>
        <ol className={styles.connection} aria-label="Как связаны данные в кабинете">
          <li><span>01</span> Показатели</li>
          <li><span>02</span> Контекст вашей жизни</li>
          <li><span>03</span> Рекомендации специалиста</li>
        </ol>
        <div className={styles.instrument} data-instrument>
          <span className={styles.progress} aria-hidden="true" data-progress />
          <header className={styles.head} data-hello>
            <div className={styles.greet}>
              <p className={styles.hello}>Добрый день, Анна</p>
              <p className={styles.meta}>Октябрь 2026 · демо-кабинет</p>
            </div>

            <div className={styles.focus}>
              <p className={styles.label}>Ваш фокус на месяц</p>
              <div className={styles.metrics}>
                {FOCUS.map((item, index) => (
                  <div
                    className={styles.metric}
                    key={item.name}
                    data-row
                    data-on={TRENDS[0].lead === index ? "true" : "false"}
                  >
                    <span>{item.name}</span>
                    <span className={styles.track} data-track>
                      <span className={styles.fill} data-fill data-ratio={item.end} style={{ "--end": item.end }} />
                      <span className={styles.dot} data-dot style={{ "--end": item.end }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className={styles.status}>
              <span aria-hidden="true" />
              Сопровождение активно
            </p>
          </header>

          <div className={styles.body}>
            <div className={styles.main}>
              <div className={styles.mainHead}>
                <p className={styles.label}>
                  Биомаркеры{" "}
                  <span className={styles.counter} data-counter>
                    01
                  </span>
                  <span className={styles.counterTotal}>{` / 0${TRENDS.length}`}</span>
                </p>
                <div className={styles.switch} data-switch>
                  {TRENDS.map((item, index) => (
                    <span key={item.id} data-switch-item data-on={index === 0 ? "true" : "false"}>
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.figure}>
                {TRENDS.map((item, index) => (
                  <p
                    key={item.id}
                    className={styles.value}
                    data-value
                    data-focus={item.focus.join(",")}
                    data-lead={item.lead}
                    data-on={index === 0 ? "true" : "false"}
                    aria-hidden={index === 0 ? undefined : true}
                  >
                    <span className={styles.valueNum} data-num={item.value}>
                      {item.value}
                    </span>
                    <span className={styles.unit}>
                      <b>{item.unit}</b>
                      {item.name} · демо
                    </span>
                  </p>
                ))}
                <p className={styles.meta}>История · 4 замера</p>
              </div>

              <div className={styles.plot}>
                <svg
                  className={styles.chart}
                  viewBox={`0 0 ${CHART.width} ${CHART.height}`}
                  role="img"
                  aria-label="Демонстрационная динамика выбранного показателя"
                  data-chart
                >
                  <defs>
                    <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b79252" stopOpacity="0.14" />
                      <stop offset="100%" stopColor="#b79252" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[40, 80, 120].map((y) => (
                    <path key={y} className={styles.grid} d={`M0 ${y}H${CHART.width}`} />
                  ))}
                  <path className={styles.base} d={`M0 ${CHART.floor}H${CHART.width}`} />
                  <path className={styles.scan} d={`M0 8V${CHART.floor}`} data-scan />
                  {TRENDS.map((item, index) => (
                    <g key={item.id} data-series data-on={index === 0 ? "true" : "false"}>
                      <path className={styles.area} d={item.area} data-area />
                      <path className={styles.trend} d={item.line} data-trend />
                      {item.points.slice(0, -1).map(([x, y]) => (
                        <circle key={x} className={styles.point} cx={x} cy={y} r="3.5" data-point />
                      ))}
                      <circle className={styles.halo} cx={item.points[3][0]} cy={item.points[3][1]} r="9" data-end />
                      <circle className={styles.end} cx={item.points[3][0]} cy={item.points[3][1]} r="4.5" data-end />
                    </g>
                  ))}
                </svg>
                <ol className={styles.axis} data-axis>
                  {DATES.map((date, i) => (
                    <li key={date} style={{ left: `${(XS[i] / CHART.width) * 100}%` }}>
                      {date}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className={styles.side}>
              <div className={styles.section} data-panel>
                <p className={styles.label}>На что обратить внимание</p>
                <div className={styles.insightBox}>
                  {TRENDS.map((item, index) => (
                    <p
                      key={item.id}
                      className={styles.insightText}
                      data-insight
                      data-on={index === 0 ? "true" : "false"}
                      aria-hidden={index === 0 ? undefined : true}
                    >
                      {item.insight}
                    </p>
                  ))}
                </div>
                <div className={styles.nextBox}>
                  {TRENDS.map((item, index) => (
                    <p
                      key={item.id}
                      className={styles.next}
                      data-rec
                      data-on={index === 0 ? "true" : "false"}
                      aria-hidden={index === 0 ? undefined : true}
                    >
                      <span aria-hidden="true" />
                      <span>
                        <b>{item.recLabel}</b>
                        {item.rec}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              <div className={`${styles.section} ${styles.expert}`} data-panel>
                <p className={styles.label}>Ваш эксперт</p>
                <dl className={styles.facts}>
                  <div>
                    <dt>Эксперт</dt>
                    <dd>Алексей · макет</dd>
                  </div>
                  <div>
                    <dt>Следующая консультация</dt>
                    <dd>15 октября · макет</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
