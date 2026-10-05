import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { getSurveyResult, isValidAnswer, surveyQuestions } from "./surveyModel.js";
import styles from "./JourneySurvey.module.css";

export function JourneySurvey({ open, onClose }) {
  return open ? <JourneySurveyDialog onClose={onClose} /> : null;
}

function JourneySurveyDialog({ onClose }) {
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const previousFocusRef = useRef(null);
  const id = useId();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const complete = step === surveyQuestions.length;
  const question = surveyQuestions[step];
  const result = complete ? getSurveyResult(answers) : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      previousFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      const content = headingRef.current?.closest(`.${styles.content}`);
      if (content) content.scrollTop = 0;
    });
    return () => cancelAnimationFrame(frame);
  }, [step]);

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const showPrograms = () => {
    onClose();
    // Hash navigation retains the current concept and every other query parameter.
    window.location.hash = "programs";
    requestAnimationFrame(() => {
      const programs = document.getElementById("programs");
      programs?.scrollIntoView({ behavior: "instant", block: "start" });
      const title = programs?.querySelector("h2");
      if (title) {
        title.setAttribute("tabindex", "-1");
        title.focus({ preventScroll: true });
        title.addEventListener("blur", () => title.removeAttribute("tabindex"), { once: true });
      }
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== dialogRef.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <span className={styles.brand}>Healthcode <span>/ Мини-опрос</span></span>
          <button className={styles.close} type="button" aria-label="Закрыть мини-опрос" onClick={onClose}><X size={20} /></button>
        </header>
        <div className={styles.content}>
          <div className={styles.progressLabel} aria-live="polite">{complete ? "Ваш ориентир готов" : `Шаг ${step + 1} из 3 · около 2 минут`}</div>
          <div className={styles.progress} aria-hidden="true">
            {surveyQuestions.map((item, index) => <span key={item.id} className={index <= step ? styles.filled : ""} />)}
          </div>
          <h2 ref={headingRef} tabIndex={-1} id={`${id}-title`} className={styles.title}>{complete ? "Вот с чего можно начать" : question.title}</h2>
          {complete && result ? (
            <>
              <p className={styles.hint}>По вашим ответам мы собрали ориентир для выбора программы. Это ещё не персональная рекомендация специалиста.</p>
              <div className={styles.result}>
                {[["Фокус программы", result.focus], ["Практический инструмент", result.tool], ["Ваш формат поддержки", result.support]].map(([label, item], index) => (
                  <section key={label} className={styles.resultItem}>
                    <span className={styles.resultNumber}>0{index + 1}</span>
                    <div><span className={styles.resultLabel}>{label}</span><h3>{item.title}</h3><p>{item.text}</p></div>
                  </section>
                ))}
              </div>
              <details className={styles.summary}>
                <summary>На каких ответах основан результат</summary>
                <dl>{result.answers.map((answer) => <div key={answer.question}><dt>{answer.question}</dt><dd>{answer.label}</dd></div>)}</dl>
              </details>
              <p className={styles.note}>Ответы остаются только в этом окне. Опрос ничего не отправляет и не оформляет запись.</p>
            </>
          ) : (
            <>
              <p className={styles.hint}>{step === 0 ? "Три коротких вопроса помогут выбрать фокус программы, полезный инструмент и формат поддержки. Контакты не понадобятся." : question.hint}</p>
              <fieldset className={styles.options} aria-labelledby={`${id}-title`}>
                {question.options.map((option) => (
                  <label key={option.value} className={styles.option}>
                    <input type="radio" name={`${id}-${question.id}`} value={option.value} checked={answers[question.id] === option.value} onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.value }))} />
                    <span className={styles.radio} aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                    <span><strong>{option.label}</strong><span className={styles.description}>{option.description}</span></span>
                  </label>
                ))}
              </fieldset>
              <p className={styles.nextHint}>{step === 0 ? "Далее: что мешает вам двигаться к цели" : step === 1 ? "Далее: подходящий формат поддержки" : "Далее: ваш ориентир для выбора программы"}</p>
            </>
          )}
        </div>
        <footer className={styles.footer}>
          {complete ? (
            <><button type="button" className={styles.back} onClick={restart}>Пройти заново</button><button type="button" className={styles.primary} onClick={showPrograms}>Посмотреть программы <ArrowRight size={18} /></button></>
          ) : (
            <><button type="button" className={styles.back} onClick={() => step > 0 ? setStep(step - 1) : onClose()}><ArrowLeft size={16} /> {step > 0 ? "Назад" : "Закрыть"}</button><button type="button" className={styles.primary} disabled={!isValidAnswer(question.id, answers[question.id])} onClick={() => setStep(step + 1)}>{step === 2 ? "Получить ориентир" : "Продолжить"}<ArrowRight size={18} /></button></>
          )}
        </footer>
      </div>
    </dialog>
  );
}
