import assert from "node:assert/strict";
import { beforeEach, afterEach, test } from "node:test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  CONCEPT_IDS,
  DEFAULT_CONCEPT,
  STORAGE_KEY,
  applyConceptChrome,
  isConcept,
  persistConcept,
  readQueryConcept,
  readStoredConcept,
  resolveConcept,
  writeConceptUrl,
} from "../src/shared/concepts.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const checkpoint = "d736ca6";
const originalGlobals = new Map(["window", "document", "localStorage"].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
let calls;
let storage;
let theme;

function location(href) {
  const url = new URL(href, "https://health.example");
  globalThis.window.location = { href: url.href, search: url.search };
}

beforeEach(() => {
  calls = [];
  storage = new Map();
  theme = {};
  globalThis.window = {
    history: Object.fromEntries(["pushState", "replaceState"].map((method) => [method, (...args) => calls.push({ method, args })])),
  };
  globalThis.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
  };
  globalThis.document = {
    documentElement: { dataset: {} },
    title: "",
    querySelector: (selector) => selector === 'meta[name="theme-color"]' ? { setAttribute: (key, value) => { theme[key] = value; } } : null,
  };
  location("/");
});

afterEach(() => {
  for (const [key, descriptor] of originalGlobals) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
});

test("explicit valid query wins over persisted concept for all three routes", () => {
  for (const concept of CONCEPT_IDS) {
    storage.set(STORAGE_KEY, concept === "future" ? "glass" : "future");
    location(`/health?campaign=autumn&concept=${concept}`);
    assert.equal(readQueryConcept(), concept);
    assert.equal(resolveConcept(), concept);
  }
});

test("invalid or missing query falls back to stored concept then Future", () => {
  for (const query of ["", "?concept=unknown", "?concept=Glass", "?concept="]) {
    location(`/health${query}`);
    assert.equal(readQueryConcept(), null);
    storage.set(STORAGE_KEY, "glass");
    assert.equal(resolveConcept(), "glass");
    storage.set(STORAGE_KEY, "invalid");
    assert.equal(readStoredConcept(), null);
    assert.equal(resolveConcept(), DEFAULT_CONCEPT);
    storage.clear();
    assert.equal(resolveConcept(), "future");
  }
  assert.equal(isConcept("journey"), true);
  assert.equal(isConcept(null), false);
});

test("push navigation preserves path and unrelated query parameters and clears stale hash", () => {
  location("/health/overview?campaign=autumn&tag=one&concept=future&tag=two&ref=hello%20world#old-section");
  writeConceptUrl("glass");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].method, "pushState");
  assert.deepEqual(calls[0].args.slice(0, 2), [{ concept: "glass" }, ""]);
  const target = new URL(calls[0].args[2], "https://health.example");
  assert.equal(target.pathname, "/health/overview");
  assert.equal(target.searchParams.get("concept"), "glass");
  assert.equal(target.searchParams.get("campaign"), "autumn");
  assert.equal(target.searchParams.get("ref"), "hello world");
  assert.deepEqual(target.searchParams.getAll("tag"), ["one", "two"]);
  assert.equal(target.hash, "");
});

test("initial URL normalization uses replace and retains marketing parameters", () => {
  location("/health?utm_source=demo&concept=unknown#section");
  writeConceptUrl("future", "replace");
  assert.deepEqual(calls, [{ method: "replaceState", args: [{ concept: "future" }, "", "/health?utm_source=demo&concept=future"] }]);
});

test("selection persists; disabled and unavailable storage cannot break routing", () => {
  persistConcept("glass");
  assert.equal(storage.get(STORAGE_KEY), "glass");
  globalThis.localStorage = {
    getItem: () => { throw new Error("Storage disabled"); },
    setItem: () => { throw new Error("Storage disabled"); },
  };
  assert.equal(readStoredConcept(), null);
  assert.doesNotThrow(() => persistConcept("glass"));
  assert.equal(resolveConcept(), "future");
  location("/?concept=glass");
  assert.equal(resolveConcept(), "glass");
  delete globalThis.localStorage;
  assert.equal(readStoredConcept(), null);
  assert.doesNotThrow(() => persistConcept("glass"));
});

test("concept chrome applies per-route metadata and tolerates absent theme meta", () => {
  applyConceptChrome("glass");
  assert.equal(document.documentElement.dataset.concept, "glass");
  assert.equal(document.title, "Healthcode — Glass Lab");
  assert.equal(theme.content, "#F7F8F7");
  applyConceptChrome("future");
  assert.equal(document.documentElement.dataset.concept, "future");
  assert.equal(document.title, "Healthcode — персональное сопровождение здоровья");
  assert.equal(theme.content, "#FAFAF8");
  document.querySelector = () => null;
  assert.doesNotThrow(() => applyConceptChrome("journey"));
});

function git(...args) {
  return execFileSync("git", args, { cwd: root, maxBuffer: 16 * 1024 * 1024 });
}
function paths(output) {
  return output.toString("utf8").split("\0").filter(Boolean);
}
function allowed(path) {
  return path.startsWith("src/concepts/glass/") ||
    /^public\/images\/glass-[^/]+\.(?:avif|webp|png|jpg|jpeg|svg)$/.test(path) ||
    path.startsWith("docs/") || path.startsWith("scripts/") ||
    path === ".openai/hosting.json" || path === ".github/workflows/deploy-pages.yml" ||
    path === "index.html" || path === "src/media.js" || path === "vite.config.js";
}

test("tracked diff and untracked additions remain inside the Glass redesign scope", () => {
  const changed = paths(git("diff", "--name-only", "--no-renames", "-z", checkpoint, "--"));
  const added = paths(git("ls-files", "--others", "--exclude-standard", "-z"));
  assert.deepEqual([...new Set([...changed, ...added])].filter((path) => !allowed(path)), [], "Unexpected edits outside Glass scope");
});

test("Future, Journey, shared routing, survey, global CSS, motion, dependencies and original assets match checkpoint bytes", () => {
  const baseline = paths(git("ls-tree", "-r", "--name-only", "-z", checkpoint));
  const deploymentFiles = new Set([".openai/hosting.json", ".github/workflows/deploy-pages.yml", "index.html", "src/media.js", "vite.config.js"]);
  const protectedFiles = baseline.filter((path) => !path.startsWith("src/concepts/glass/") && !deploymentFiles.has(path));
  assert.ok(protectedFiles.some((path) => path.startsWith("src/concepts/future/")));
  assert.ok(protectedFiles.some((path) => path.startsWith("src/shared/")));
  assert.ok(protectedFiles.some((path) => path.startsWith("public/images/")));
  for (const path of protectedFiles) {
    const expected = git("show", `${checkpoint}:${path}`);
    const actual = readFileSync(new URL(path, new URL("../", import.meta.url)));
    assert.ok(expected.equals(actual), `${path} changed from checkpoint ${checkpoint}`);
  }
});
