import { Header } from "./components/Header.jsx";
import { CinematicHero } from "./components/CinematicHero.jsx";
import { ProductStage } from "./components/ProductStage.jsx";
import { LifeSpread } from "./components/LifeSpread.jsx";
import { Expertise } from "./components/Expertise.jsx";
import { JourneyPath } from "./components/JourneyPath.jsx";
import styles from "../../App.module.css";
import "./healthJourney.css";

export function HealthJourneyPage({ onSurvey }) {
  return (
    <div className={`${styles.page} health-journey`}>
      <Header onSurvey={onSurvey} />
      <main className={styles.main}>
        <CinematicHero onSurvey={onSurvey} />
        <ProductStage />
        <LifeSpread />
        <Expertise onSurvey={onSurvey} />
        <JourneyPath onSurvey={onSurvey} />
      </main>
    </div>
  );
}
