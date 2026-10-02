# Glass Lab architecture and isolation boundary

Checkpoint before redesign: `d736ca6`. The project is a React 19 / Vite application with CSS modules and GSAP 3. No routing package or new dependency is needed.

## Entry points and shared behavior

- `src/main.jsx` loads global styling and `App.jsx`.
- `src/App.jsx` conditionally mounts exactly one concept page. It owns the shared survey state and renders `ConceptSwitcher` and `SurveyModal` outside the concept page.
- `src/shared/concepts.js` defines `future`, `glass`, and `journey`; query parameters take precedence over saved selection, then default to `future`. Invalid query values fall back to storage/default. URL writes retain other parameters and intentionally clear the hash. Explicit selection pushes history; missing/invalid query normalization replaces history.
- `src/shared/useConcept.js` handles selection, browser back/forward, document metadata, scroll reset and ScrollTrigger refresh.
- `src/shared/ConceptSwitcher.jsx` is the persistent, collapsible concept navigation. Its own saved collapsed state is separate from the selected concept.
- `src/components/SurveyModal.jsx` receives the same callback flow from each supported page. Glass header, hero and final CTA receive `onSurvey` through `GlassLabPage`.
- `src/shared/chrome.css` contains existing per-concept document chrome; it remains unchanged.

## Glass section map at checkpoint

`src/concepts/glass/GlassLabPage.jsx` composes these sections in order inside `.glass-lab`:

| Section | Component | Styling | Motion owner |
| --- | --- | --- | --- |
| Header | `components/GlassHeader.jsx` | matching `.module.css` | Component menu state |
| Hero / ferritin plane / secondary signals | `components/GlassHero.jsx` | matching `.module.css` | `motion/useGlassHeroMotion.js` |
| Data constellation / profile core | `components/GlassData.jsx` | matching `.module.css` | `motion/useGlassDataMotion.js` |
| Dark biomarker laboratory | `components/GlassBiomarker.jsx` | matching `.module.css` | `motion/useGlassBiomarkerMotion.js` |
| Expert | `components/GlassExpert.jsx` | matching `.module.css` | `motion/useGlassReveal.js` |
| Personal plan | `components/GlassPlan.jsx` | matching `.module.css` | `motion/useGlassReveal.js` |
| Lifestyle | `components/GlassLife.jsx` | matching `.module.css` | `motion/useGlassReveal.js` |
| Final CTA | `components/GlassCta.jsx` | matching `.module.css` | `motion/useGlassReveal.js` |

The original material is repeated in section CSS modules; `glass.css` supplies scoped color/font tokens. Existing opacity-heavy surfaces and per-section styling are the replacement boundary for a reusable optical material. `GlassButton` is already local to Glass. Shared `Picture`/`media.js` expose campaign photographs and must remain unchanged; Glass may consume them without changing their source assets.

## Motion boundaries

- Shared `src/motion/gsap.js` registers ScrollTrigger and exposes reduced-motion detection. Do not change it for Glass.
- Hero owns DOM-measured connector paths, staged entrance, desktop scroll depth and fine-pointer parallax. Its GSAP context and native listeners must be cleaned up on concept unmount.
- Constellation owns scoped node/path/core selectors, desktop scrub and simpler small-screen reveal.
- Biomarker section owns value/trend/interpretation state and its pinned desktop sequence at the checkpoint.
- Shared Glass reveal hook owns only descendants of each passed section root.
- Reduced motion must expose readable final states without pointer parallax, scroll scrub, or complex transforms. Changes to these behaviors belong in Glass hooks, not global motion utilities.
- New optical primitives belong in `src/concepts/glass/components/`; their styles and image/refraction handling stay inside that subtree. Expensive optical work should be limited to a few large surfaces, with mobile simplification.

## Protected files and verification

Future uses `src/concepts/future/FutureHealthPage.jsx`, existing `src/components/*`, `src/App.module.css`, `src/motion/*`, `src/media.js` and original `public/images/hc-*` assets. Journey remains its existing placeholder. Shared routing, switcher, survey, global CSS, dependencies and all original assets are protected.

Run `node --test scripts/glass-regression.mjs`. The dependency-free tests exercise query precedence/fallback, parameter preservation, history semantics, storage failure and per-concept metadata using minimal browser mocks. They also compare every tracked non-Glass file byte-for-byte against the checkpoint and check tracked/untracked changes against the allowed Glass, new Glass image, documentation and script paths. This verifies source isolation, not browser appearance; viewport screenshots and interaction checks remain necessary for the visual redesign.
