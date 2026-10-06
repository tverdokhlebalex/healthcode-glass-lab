export const CONCEPTS = [
  { id: "future", code: "01", name: "Future", full: "Future Health" },
  { id: "glass", code: "02", name: "Glass", full: "Glass Lab" },
  { id: "journey", code: "03", name: "Journey", full: "Health Journey" },
];

export const CONCEPT_IDS = CONCEPTS.map((item) => item.id);
export const DEFAULT_CONCEPT = "future";
export const STORAGE_KEY = "hc-concept";
export const SWITCHER_KEY = "hc-switcher-collapsed";

const TITLES = {
  future: "Healthcode — персональное сопровождение здоровья",
  glass: "Healthcode — Glass Lab",
  journey: "Healthcode — Health Journey",
};

const THEMES = {
  future: "#FAFAF8",
  glass: "#F7F8F7",
  journey: "#F4F6F5",
};

export function isConcept(value) {
  return CONCEPT_IDS.includes(value);
}

export function readQueryConcept() {
  const value = new URLSearchParams(window.location.search).get("concept");
  return isConcept(value) ? value : null;
}

export function readStoredConcept() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isConcept(value) ? value : null;
  } catch {
    return null;
  }
}

export function resolveConcept() {
  return readQueryConcept() ?? readStoredConcept() ?? DEFAULT_CONCEPT;
}

export function persistConcept(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* private mode */
  }
}

export function writeConceptUrl(id, mode = "push") {
  const url = new URL(window.location.href);
  url.searchParams.set("concept", id);
  url.hash = "";
  const next = `${url.pathname}${url.search}`;
  if (mode === "replace") {
    window.history.replaceState({ concept: id }, "", next);
    return;
  }
  window.history.pushState({ concept: id }, "", next);
}

export function applyConceptChrome(id) {
  document.documentElement.dataset.concept = id;
  document.title = TITLES[id] ?? TITLES.future;
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) theme.setAttribute("content", THEMES[id] ?? THEMES.future);
}
