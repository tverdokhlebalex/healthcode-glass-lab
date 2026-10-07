import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { getSurveyResult, isValidAnswer, surveyQuestions } from "../journey/components/surveyModel.js";
import styles from "./FutureSurvey.module.css";

export function FutureSurvey({ open, onClose }) {
  return open ? <FutureSurveyDialog onClose={onClose} /> : null;
}

function FutureSurveyDialog({ onClose }) {
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
          <div className={styles.progressLabel} aria-live="polite">{complete ? "Подходящий формат" : `Вопрос ${step + 1} из 3 · около 2 минут`}</div>
          <div className={styles.progress} aria-hidden="true">
            {surveyQuestions.map((item, index) => <span key={item.id} className={index <= step ? styles.filled : ""} />)}
          </div>
          <h2 ref={headingRef} tabIndex={-1} id={`${id}-title`} className={styles.title}>{complete ? `Вам может подойти «${result.program.name}»` : question.title}</h2>
          {complete && result ? (
            <>
              <p className={styles.hint}>{result.reason}</p>
              <div className={styles.result}>
                {[["Что входит", { title: result.program.name, text: result.program.description }], ["Что обсудить со специалистом", result.focus]].map(([label, item], index) => (
                  <section key={label} className={styles.resultItem}>
                    <span className={styles.resultNumber}>0{index + 1}</span>
                    <div><span className={styles.resultLabel}>{label}</span><h3>{item.title}</h3><p>{item.text}</p></div>
                  </section>
                ))}
              </div>
              <p className={styles.hint}>Следующий этап программы — загрузка анализов и анкета для специалиста. Затем вы получаете разбор и персональный план.</p>
              <details className={styles.summary}>
                <summary>На каких ответах основан результат</summary>
                <dl>{result.answers.map((answer) => <div key={answer.question}><dt>{answer.question}</dt><dd>{answer.label}</dd></div>)}</dl>
              </details>
              <p className={styles.note}>Это предварительный подбор по вашим предпочтениям. Ответы не отправляются, запись не оформляется.</p>
            </>
          ) : (
            <>
              <p className={styles.hint}>{step === 0 ? "Три вопроса о вашей цели, глубине разбора и поддержке помогут подобрать формат программы. Контакты не понадобятся." : question.hint}</p>
              <fieldset className={styles.options} aria-labelledby={`${id}-title`}>
                {question.options.map((option) => (
                  <label key={option.value} className={styles.option}>
                    <input type="radio" name={`${id}-${question.id}`} value={option.value} checked={answers[question.id] === option.value} onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.value }))} />
                    <span className={styles.radio} aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                    <span><strong>{option.label}</strong><span className={styles.description}>{option.description}</span></span>
                  </label>
                ))}
              </fieldset>
              <p className={styles.nextHint}>{step === 0 ? "Далее: желаемая глубина разбора" : step === 1 ? "Далее: нужен ли вам специалист на время программы" : "Далее: подходящий формат и объяснение выбора"}</p>
            </>
          )}
        </div>
        <footer className={styles.footer}>
          {complete ? (
            <><button type="button" className={styles.back} onClick={restart}>Пройти заново</button><button type="button" className={styles.primary} onClick={onClose}>Готово <ArrowRight size={18} /></button></>
          ) : (
            <><button type="button" className={styles.back} onClick={() => step > 0 ? setStep(step - 1) : onClose()}><ArrowLeft size={16} /> {step > 0 ? "Назад" : "Закрыть"}</button><button type="button" className={styles.primary} disabled={!isValidAnswer(question.id, answers[question.id])} onClick={() => setStep(step + 1)}>{step === 2 ? "Подобрать формат" : "Продолжить"}<ArrowRight size={18} /></button></>
          )}
        </footer>
      </div>
    </dialog>
  );
}
