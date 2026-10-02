import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "./Button.jsx";
import styles from "./SurveyModal.module.css";

export function SurveyModal({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();

    document.body.classList.toggle("scroll-lock", open);
    return () => document.body.classList.remove("scroll-lock");
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="survey-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <button className={styles.close} type="button" aria-label="Закрыть" onClick={onClose}>
        <X size={18} strokeWidth={1.6} />
      </button>
      <h2 id="survey-title" className={styles.title}>
        Начнем с нескольких вопросов
      </h2>
      <p className={styles.text}>
        Это поможет определить, какой формат сопровождения подойдет вам лучше всего.
      </p>
      <Button className={styles.start}>Начать</Button>
    </dialog>
  );
}
