import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "../motion/gsap.js";
import {
  applyConceptChrome,
  persistConcept,
  readQueryConcept,
  resolveConcept,
  writeConceptUrl,
} from "./concepts.js";

export function useConcept() {
  const [concept, setConceptState] = useState(() => {
    const id = resolveConcept();
    applyConceptChrome(id);
    return id;
  });

  useEffect(() => {
    applyConceptChrome(concept);
    if (!readQueryConcept()) writeConceptUrl(concept, "replace");
  }, [concept]);

  useEffect(() => {
    const onPop = () => {
      const next = resolveConcept();
      setConceptState(next);
      applyConceptChrome(next);
      window.scrollTo(0, 0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setConcept = useCallback((next) => {
    setConceptState((current) => {
      if (current === next) return current;
      persistConcept(next);
      writeConceptUrl(next, "push");
      applyConceptChrome(next);
      window.scrollTo(0, 0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return next;
    });
  }, []);

  return [concept, setConcept];
}
