import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND_NAME } from "../../../brand.js";
import { Button } from "../../../components/Button.jsx";
import styles from "./Header.module.css";

const NAV = [
  { id: "about", label: "О платформе" },
  { id: "life", label: "Жизнь" },
  { id: "programs", label: "Маршрут" },
  { id: "start", label: "Старт" },
];

export function Header({ onSurvey }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find(entry => entry.isIntersecting);
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-100px 0px -60% 0px", threshold: 0 });
    NAV.forEach(item => { const section=document.getElementById(item.id); if(section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const close = event => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const links = NAV.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active===item.id?"location":undefined} onClick={()=>setOpen(false)}>{item.label}</a>);
  return <header className={styles.wrap}>
    <div className={styles.bar}>
      <a className={styles.logo} href="#top" onClick={()=>{setOpen(false);setActive("");}}><span className={styles.mark} aria-hidden="true" /><span>{BRAND_NAME}</span></a>
      <nav className={styles.nav} aria-label="Основная навигация">{links}</nav>
      <div className={styles.actions}>
        <Button data-primary size="sm" onClick={()=>{setOpen(false);onSurvey();}}><span className={styles.full}>Подобрать формат</span><span className={styles.short}>Начать</span></Button>
        <button className={styles.burger} type="button" aria-expanded={open} aria-controls="journey-menu" aria-label={open?"Закрыть меню":"Открыть меню"} onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button>
      </div>
    </div>
    {open&&<nav className={styles.menu} id="journey-menu" aria-label="Мобильная навигация">{links}</nav>}
  </header>;
}
