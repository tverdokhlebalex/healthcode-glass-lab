import { useId, useRef, useState } from "react";
import { useGlassBiomarkerMotion } from "../motion/useGlassBiomarkerMotion.js";
import { LiquidGlass } from "./LiquidGlass.jsx";
import { GlassLabel, SignalDot } from "./Signals.jsx";
import { assetPath } from "../../../media.js";
import styles from "./GlassBiomarker.module.css";

const DATES=["12 июля","9 августа","6 сентября","2 октября"];
const SERIES=[
  {name:"Ferritin",label:"Ферритин",unit:"нг/мл",values:[18,24,31,42],max:60,focus:"Питание + нагрузка",note:"Один показатель. Больше контекста.",text:"Эксперт рассматривает динамику вместе с питанием, самочувствием и нагрузкой."},
  {name:"Vitamin D",label:"Витамин D",unit:"нг/мл",values:[22,20,30,38],max:60,focus:"Режим + восстановление",note:"Динамика в ритме вашей жизни.",text:"История замеров дополняется режимом дня и контекстом восстановления."},
  {name:"B12",label:"Витамин B12",unit:"пг/мл",values:[320,360,410,480],max:600,focus:"Энергия + питание",note:"Связи важнее отдельной цифры.",text:"Показатель помогает обсудить питание и энергию вместе с остальными сигналами."},
];
function curve(points) { return points.reduce((d,p,i)=> {if(!i)return `M${p[0]} ${p[1]}`;const prev=points[i-1],x=(prev[0]+p[0])/2;return `${d}C${x} ${prev[1]} ${x} ${p[1]} ${p[0]} ${p[1]}`;},""); }
export function GlassBiomarker() {
  const root=useRef(null), [selected,setSelected]=useState(0), [active,setActive]=useState(3);
  const fillId=`history-${useId().replace(/:/g,"")}`;
  useGlassBiomarkerMotion(root,selected);
  const item=SERIES[selected];
  const points=item.values.map((v,i)=>[34+i*196,218-v/item.max*185]);
  const line=curve(points);
  return <section className={styles.section} id="product" ref={root} data-optical-scene>
    <img className={styles.environment} src={assetPath("/images/glass-atrium.jpg")} alt="" loading="lazy" data-optical-source/>
    <div className={styles.head}><h2>У каждого значения<br/>есть своя история.</h2><span><SignalDot/> Optical data lab <b>DEMO</b></span></div>
    <div className={styles.lab}>
      <nav className={styles.index} aria-label="Выбрать демонстрационный биомаркер">{SERIES.map((series,i)=><button type="button" key={series.name} aria-pressed={selected===i} onClick={()=>{setSelected(i);setActive(3);}}><span>0{i+1}</span><span>{series.name}</span><i aria-hidden="true">↗</i></button>)}</nav>
      <div className={styles.data}>
        <div className={styles.metric}><div><GlassLabel>{item.label}</GlassLabel><p className={styles.value}>{item.values[active]}<span>{item.unit}</span></p></div><p className={styles.period}>Динамика<br/>за 3 месяца<span>{DATES[active]} · DEMO</span></p></div>
        <div className={styles.chartWrap}>
          <svg className={styles.chart} viewBox="0 0 660 270" aria-label={`Демонстрационная история: ${item.label}. Выберите точку для просмотра значения.`} role="group">
            <defs><linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b89450" stopOpacity=".17"/><stop offset="100%" stopColor="#b89450" stopOpacity="0"/></linearGradient></defs>
            {[0,1,2,3].map(i=><g key={i}><path className={styles.grid} d={`M34 ${218-i*61.67}H632`}/><text className={styles.axisLabel} x="0" y={221-i*61.67}>{Math.round(i*item.max/3)}</text></g>)}
            <path d={`${line}L622 218H34Z`} fill={`url(#${fillId})`}/>
            <path className={styles.trend} data-trend d={line}/>
            <path className={styles.cursor} d={`M${points[active][0]} 18V222`}/>
            {points.map(([x,y],i)=><g key={DATES[i]} className={styles.measurement} role="button" tabIndex={0} aria-label={`${DATES[i]}: ${item.values[i]} ${item.unit}, демо`} aria-pressed={active===i} onPointerEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={()=>setActive(i)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setActive(i);}}}>
              <circle cx={x} cy={y} r="18" fill="transparent"/><circle className={styles.point} cx={x} cy={y} r={active===i?5:3}/>{active===i&&<circle className={styles.halo} cx={x} cy={y} r="11"/>}<text x={x} y="250" textAnchor={i===0?"start":i===3?"end":"middle"}>{DATES[i]}</text>
            </g>)}
          </svg>
          <p className={styles.chartHint}>4 замера <span>Наведите или выберите точку</span></p>
        </div>
      </div>
      <LiquidGlass className={styles.interpretation} variant="smoked" refraction="low" depth="foreground" radius={22} interactive><div className={styles.interpretInner}><GlassLabel>Интерпретация</GlassLabel><p className={styles.note}>{item.note}</p><p className={styles.context}>{item.text}</p><div className={styles.focus}><SignalDot/><span>{item.focus}</span></div><p className={styles.disclaimer}>Демонстрационный пример.<br/>Не медицинское заключение.</p></div></LiquidGlass>
    </div>
    <div className={styles.timeline}><span>Контекст периода</span><p><SignalDot/> Анализы</p><i/><p>Питание</p><i/><p>Нагрузка</p><i/><p>Самочувствие</p><span>Июль — октябрь</span></div>
  </section>;
}
