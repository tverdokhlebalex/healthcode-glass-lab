import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND_NAME } from "../../../brand.js";
import { NAV } from "../../../shared/content.js";
import { GlassButton } from "./GlassButton.jsx";
import styles from "./GlassHeader.module.css";

export function GlassHeader({ onSurvey }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const dark = document.getElementById("product");
      if (!dark) return;
      const rect = dark.getBoundingClientRect();
      setOnDark(rect.top < 80 && rect.bottom > 48);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`${styles.wrap} ${scrolled ? styles.scrolled : ""} ${onDark ? styles.onDark : ""}`}
    >
      <a className={styles.logo} href="#top" onClick={close}>
        <span className={styles.mark} aria-hidden="true" />
        <span>{BRAND_NAME}</span>
      </a>

      <nav className={styles.nav} aria-label="Основная навигация">
        {NAV.map((item) => (
          <a key={item.id} className={styles.link} href={item.href} onClick={close}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <a className={styles.login} href="#login" onClick={(event) => event.preventDefault()}>
          Войти
        </a>
        <span className={styles.cta}>
          <GlassButton
            size="sm"
            tone={onDark ? "light" : "ink"}
            onClick={() => {
              close();
              onSurvey();
            }}
          >
            Мини-опрос
          </GlassButton>
        </span>
        <button
          className={styles.burger}
          type="button"
          aria-expanded={open}
          aria-controls="glass-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {open ? (
        <div className={styles.menu} id="glass-menu">
          <nav aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <a key={item.id} href={item.href} onClick={close}>
                {item.label}
              </a>
            ))}
            <a
              href="#login"
              onClick={(event) => {
                event.preventDefault();
                close();
              }}
            >
              Войти
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
