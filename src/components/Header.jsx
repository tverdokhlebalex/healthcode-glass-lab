import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND_NAME } from "../brand.js";
import { gsap, prefersReducedMotion } from "../motion/gsap.js";
import { Button } from "./Button.jsx";
import styles from "./Header.module.css";

const NAV = [
  { id: "how", label: "Как это работает", href: "#process" },
  { id: "programs", label: "Программы" },
  { id: "experts", label: "Эксперты", href: "#expert" },
  { id: "about", label: "О сервисе" },
];

export function Header({ onSurvey }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(el.children, { y: -10, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const product = document.getElementById("product");
      if (!product) return;
      const rect = product.getBoundingClientRect();
      const edge = (wrapRef.current?.offsetHeight ?? 94) / 2;
      setOnDark(rect.top < edge && rect.bottom > edge);
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
    <header className={`${styles.wrap} ${scrolled ? styles.scrolled : ""} ${onDark ? styles.onDark : ""}`} ref={wrapRef}>
      <div className={styles.info}>
        <p>
          <span className={styles.infoDot} aria-hidden="true" />
          Персонализированное сопровождение здоровья
        </p>
        <p className={styles.infoAside}>
          <span className={styles.infoLine} aria-hidden="true" />
          На основе ваших данных
        </p>
      </div>
      <div className={styles.bar}>
          <a className={styles.logo} href="#top" onClick={close}>
            <span className={styles.mark} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M19.4 8.6A8 8 0 1 1 15.4 4.75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="2.4" fill="currentColor" />
                <circle className={styles.markDot} cx="18.2" cy="6.4" r="1.9" />
              </svg>
            </span>
            <span className={styles.word}>{BRAND_NAME}</span>
          </a>

          <nav className={styles.nav} aria-label="Основная навигация">
            {NAV.map((item) => (
              <a
                key={item.id}
                className={styles.link}
                href={item.href ?? `#${item.id}`}
                onClick={(event) => {
                  if (!item.href) event.preventDefault();
                  close();
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a className={styles.login} href="#login" onClick={(event) => event.preventDefault()}>
              Войти
            </a>
            <Button
              size="sm"
              onClick={() => {
                close();
                onSurvey();
              }}
            >
              <span className={styles.ctaFull}>Мини-опрос</span>
              <span className={styles.ctaShort}>Опрос</span>
            </Button>
            <button
              className={styles.burger}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
            </button>
          </div>
      </div>

      {open ? (
        <div className={styles.menu} id="mobile-menu">
          <nav aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <a
                key={item.id}
                className={styles.menuLink}
                href={item.href ?? `#${item.id}`}
                onClick={(event) => {
                  if (!item.href) event.preventDefault();
                  close();
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              className={styles.menuLink}
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
