import test from "node:test";
import assert from "node:assert/strict";
import { getSurveyResult, isValidAnswer, surveyQuestions } from "../src/concepts/journey/components/surveyModel.js";
import { PROGRAM_FORMATS } from "../src/concepts/journey/components/programFormats.js";

test("survey rejects missing and unknown answers before producing a result", () => {
  for (const answers of [undefined, null, {}, { goal: "nutrition", depth: "basic" }, { goal: "diagnosis", depth: "basic", support: "expert" }, { goal: "nutrition", depth: "basic", support: "booking" }, { goal: "nutrition", depth: "diagnosis", support: "expert" }]) {
    assert.equal(getSurveyResult(answers), null);
  }
  assert.equal(isValidAnswer("goal", "nutrition"), true);
  assert.equal(isValidAnswer("goal", "time"), false);
  assert.equal(isValidAnswer("unknown", "nutrition"), false);
});

test("all 18 answer combinations select an existing format and preserve the complete answer summary", () => {
  for (const goal of surveyQuestions[0].options) for (const depth of surveyQuestions[1].options) for (const support of surveyQuestions[2].options) {
    const result = getSurveyResult({ goal: goal.value, depth: depth.value, support: support.value });
    assert.ok(result);
    assert.deepEqual(result.program, PROGRAM_FORMATS.find((program) => program.id === result.program.id));
    assert.ok(result.reason.length > 50);
    assert.ok(result.focus.title.length > 5);
    assert.ok(result.focus.text.length > 50);
    assert.deepEqual(result.answers.map((answer) => answer.label), [goal.label, depth.label, support.label]);
  }
});

test("depth and ongoing support determine the format with explicit premium precedence", () => {
  const cases = [
    ["basic", "independent", "basic"],
    ["extended", "independent", "standard"],
    ["deep", "independent", "premium"],
    ["basic", "expert", "premium"],
    ["extended", "expert", "premium"],
    ["deep", "expert", "premium"],
  ];
  for (const goal of ["nutrition", "energy", "routine"]) {
    for (const [depth, support, expected] of cases) {
      assert.equal(getSurveyResult({ goal, depth, support }).program.id, expected);
    }
  }
  assert.match(getSurveyResult({ goal: "nutrition", depth: "deep", support: "independent" }).reason, /необходимость можно обсудить отдельно/);
  assert.match(getSurveyResult({ goal: "nutrition", depth: "basic", support: "expert" }).reason, /Сопровождение входит/);
});

test("the goal changes the discussion focus without making health-based format decisions", () => {
  const answers = { goal: "nutrition", depth: "basic", support: "independent" };
  const original = getSurveyResult(answers);
  const changedGoal = getSurveyResult({ ...answers, goal: "routine" });
  assert.notDeepEqual(original.focus, changedGoal.focus);
  assert.deepEqual(original.program, changedGoal.program);
  assert.equal(original.reason, changedGoal.reason);
});

test("results do not mutate answers or expose mutable shared program and focus objects", () => {
  const answers = Object.freeze({ goal: "energy", depth: "extended", support: "expert" });
  const original = getSurveyResult(answers);
  const modified = getSurveyResult(answers);
  modified.program.name = "changed";
  modified.focus.title = "changed";
  modified.answers[0].label = "changed";
  assert.deepEqual(getSurveyResult(answers), original);
  assert.deepEqual(answers, { goal: "energy", depth: "extended", support: "expert" });
});
