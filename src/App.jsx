import { useCallback, useState } from "react";
import "./shared/chrome.css";
import { FutureHealthPage } from "./concepts/future/FutureHealthPage.jsx";
import { GlassLabPage } from "./concepts/glass/GlassLabPage.jsx";
import { HealthJourneyPage } from "./concepts/journey/HealthJourneyPage.jsx";
import { ConceptSwitcher } from "./shared/ConceptSwitcher.jsx";
import { useConcept } from "./shared/useConcept.js";
import { SurveyModal } from "./components/SurveyModal.jsx";
import { JourneySurvey } from "./concepts/journey/components/JourneySurvey.jsx";

export default function App() {
  const [concept, setConcept] = useConcept();
  const [surveyOpen, setSurveyOpen] = useState(false);
  const openSurvey = useCallback(() => setSurveyOpen(true), []);
  const closeSurvey = useCallback(() => setSurveyOpen(false), []);

  return (
    <>
      {concept === "future" ? <FutureHealthPage onSurvey={openSurvey} /> : null}
      {concept === "glass" ? <GlassLabPage onSurvey={openSurvey} /> : null}
      {concept === "journey" ? <HealthJourneyPage onSurvey={openSurvey} /> : null}
      <ConceptSwitcher concept={concept} onChange={setConcept} />
      {concept === "journey"
        ? <JourneySurvey open={surveyOpen} onClose={closeSurvey} />
        : <SurveyModal open={surveyOpen} onClose={closeSurvey} />}
    </>
  );
}
