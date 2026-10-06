import { useRef } from "react";
import styles from "../../App.module.css";
import { Header } from "./components/Header.jsx";
import { JourneyHero } from "./components/JourneyHero.jsx";
import { JourneySignal } from "./components/JourneySignal.jsx";
import { JourneyLife } from "./components/JourneyLife.jsx";
import { JourneyRoute } from "./components/JourneyRoute.jsx";
import { JourneyClose } from "./components/JourneyClose.jsx";
import { useJourneyMotion } from "./motion/useJourneyMotion.js";
import "./healthJourney.css";

export function HealthJourneyPage({ onSurvey }) {
  const rootRef = useRef(null);
  useJourneyMotion(rootRef);

  return (
    <div ref={rootRef} className={`${styles.page} health-journey`}>
      <Header onSurvey={onSurvey} />
      <main className={styles.main}>
        <JourneyHero onSurvey={onSurvey} />
        <JourneySignal />
        <JourneyLife />
        <JourneyRoute />
        <JourneyClose onSurvey={onSurvey} />
      </main>
    </div>
  );
}
