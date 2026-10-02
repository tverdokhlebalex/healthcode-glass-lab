import { useCallback, useState } from "react";
import "./shared/chrome.css";
import { FutureHealthPage } from "./concepts/future/FutureHealthPage.jsx";
import { GlassLabPage } from "./concepts/glass/GlassLabPage.jsx";
import { HealthJourneyPlaceholder } from "./concepts/journey/HealthJourneyPlaceholder.jsx";
import { ConceptSwitcher } from "./shared/ConceptSwitcher.jsx";
import { useConcept } from "./shared/useConcept.js";
import { SurveyModal } from "./components/SurveyModal.jsx";

export default function App() {
  const [concept, setConcept] = useConcept();
  const [surveyOpen, setSurveyOpen] = useState(false);
  const openSurvey = useCallback(() => setSurveyOpen(true), []);
  const closeSurvey = useCallback(() => setSurveyOpen(false), []);

  return (
    <>
      {concept === "future" ? <FutureHealthPage onSurvey={openSurvey} /> : null}
      {concept === "glass" ? <GlassLabPage onSurvey={openSurvey} /> : null}
      {concept === "journey" ? <HealthJourneyPlaceholder onSelect={setConcept} /> : null}
      <ConceptSwitcher concept={concept} onChange={setConcept} />
      <SurveyModal open={surveyOpen} onClose={closeSurvey} />
    </>
  );
}
