import { Header } from "../../components/Header.jsx";
import { CinematicHero } from "../../components/CinematicHero.jsx";
import { ProductStage } from "../../components/ProductStage.jsx";
import { LifeSpread } from "../../components/LifeSpread.jsx";
import { Expertise } from "../../components/Expertise.jsx";
import { FutureProcess } from "./FutureProcess.jsx";
import "./future.css";
import styles from "../../App.module.css";

export function FutureHealthPage({ onSurvey }) {
  return (
    <div className={styles.page}>
      <div className={styles.grain} aria-hidden="true" />
      <Header onSurvey={onSurvey} />
      <main className={styles.main}>
        <CinematicHero onSurvey={onSurvey} />
        <ProductStage />
        <LifeSpread />
        <Expertise onSurvey={onSurvey} />
        <FutureProcess onSurvey={onSurvey} />
      </main>
    </div>
  );
}
