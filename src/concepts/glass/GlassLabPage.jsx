import "./glass.css";
import { GlassHeader } from "./components/GlassHeader.jsx";
import { GlassHero } from "./components/GlassHero.jsx";
import { GlassData } from "./components/GlassData.jsx";
import { GlassBiomarker } from "./components/GlassBiomarker.jsx";
import { GlassExpert } from "./components/GlassExpert.jsx";
import { GlassPlan } from "./components/GlassPlan.jsx";
import { GlassLife } from "./components/GlassLife.jsx";
import { GlassCta } from "./components/GlassCta.jsx";

export function GlassLabPage({ onSurvey }) {
  return (
    <div className="glass-lab">
      <GlassHeader onSurvey={onSurvey} />
      <main>
        <GlassHero onSurvey={onSurvey} />
        <GlassData />
        <GlassBiomarker />
        <GlassExpert />
        <GlassPlan />
        <GlassLife />
        <GlassCta onSurvey={onSurvey} />
      </main>
    </div>
  );
}
