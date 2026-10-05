import test from "node:test";
import assert from "node:assert/strict";
import { getSurveyResult, isValidAnswer, surveyQuestions } from "../src/concepts/journey/components/surveyModel.js";

test("survey rejects missing and unknown answers before producing a result", () => {
  for (const answers of [undefined, null, {}, { goal: "nutrition", obstacle: "time" }, { goal: "diagnosis", obstacle: "time", support: "expert" }, { goal: "nutrition", obstacle: "time", support: "booking" }]) {
    assert.equal(getSurveyResult(answers), null);
  }
  assert.equal(isValidAnswer("goal", "nutrition"), true);
  assert.equal(isValidAnswer("goal", "time"), false);
  assert.equal(isValidAnswer("unknown", "nutrition"), false);
});

test("every available answer combination yields three concrete deliverables and an accurate summary", () => {
  for (const goal of surveyQuestions[0].options) for (const obstacle of surveyQuestions[1].options) for (const support of surveyQuestions[2].options) {
    const result = getSurveyResult({ goal: goal.value, obstacle: obstacle.value, support: support.value });
    assert.ok(result);
    for (const key of ["focus", "tool", "support"]) {
      assert.ok(result[key].title.length > 5);
      assert.ok(result[key].text.length > 50);
    }
    assert.deepEqual(result.answers.map((answer) => answer.label), [goal.label, obstacle.label, support.label]);
  }
});

test("each answer changes its relevant recommendation without overriding other preferences", () => {
  const answers = { goal: "nutrition", obstacle: "time", support: "independent" };
  const original = getSurveyResult(answers);
  const changedGoal = getSurveyResult({ ...answers, goal: "routine" });
  assert.notDeepEqual(original.focus, changedGoal.focus);
  assert.deepEqual(original.tool, changedGoal.tool);
  assert.deepEqual(original.support, changedGoal.support);
  const changedObstacle = getSurveyResult({ ...answers, obstacle: "consistency" });
  assert.notDeepEqual(original.tool, changedObstacle.tool);
  assert.deepEqual(original.focus, changedObstacle.focus);
  const changedSupport = getSurveyResult({ ...answers, support: "expert" });
  assert.notDeepEqual(original.support, changedSupport.support);
  assert.deepEqual(original.focus, changedSupport.focus);
  assert.deepEqual(original.tool, changedSupport.tool);
});

test("result generation preserves the user's answers", () => {
  const answers = Object.freeze({ goal: "energy", obstacle: "choice", support: "expert" });
  assert.ok(getSurveyResult(answers));
  assert.deepEqual(answers, { goal: "energy", obstacle: "choice", support: "expert" });
});
