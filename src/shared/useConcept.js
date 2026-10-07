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
    // Reset after Future mounts; scrolling the outgoing page can be cancelled
    // by its layout teardown, leaving the new concept at the old scroll offset.
    if (concept === "future" && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    if (!readQueryConcept()) writeConceptUrl(concept, "replace");
  }, [concept]);

  useEffect(() => {
    const onPop = () => {
      const next = resolveConcept();
      // Native anchor navigation also emits popstate. In Future, preserve its
      // scroll position when the history entry does not change the concept.
      if (next === "future" && document.documentElement.dataset.concept === "future") return;
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
