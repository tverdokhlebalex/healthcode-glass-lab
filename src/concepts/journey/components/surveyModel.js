import { PROGRAM_FORMATS } from "./programFormats.js";

export const surveyQuestions = [
  {
    id: "goal",
    title: "С чего вы хотите начать?",
    hint: "Выберите то, что сейчас важнее всего.",
    options: [
      { value: "nutrition", label: "Наладить питание", description: "Подобрать рацион под свои привычки и ритм жизни." },
      { value: "energy", label: "Уделить внимание энергии", description: "Разобраться, как питание, отдых и нагрузка связаны с самочувствием." },
      { value: "routine", label: "Выстроить режим", description: "Найти место для сна, еды и восстановления в обычном дне." },
    ],
  },
  {
    id: "depth",
    title: "Насколько подробный разбор вам нужен?",
    hint: "Выберите желаемую глубину работы. Это поможет сравнить форматы программы.",
    options: [
      { value: "basic", label: "Основные показатели и рекомендации", description: "Хочу разобраться в главном и получить понятные рекомендации." },
      { value: "extended", label: "Расширенный анализ и план питания", description: "Хочу подробный разбор и персональный план питания." },
      { value: "deep", label: "Глубокий разбор и расширенный план", description: "Хочу подробно обсудить показатели и привычки, получить расширенный план." },
    ],
  },
  {
    id: "support",
    title: "Нужно ли вам сопровождение специалиста?",
    hint: "Вы выбираете формат поддержки. Его можно обсудить и изменить.",
    options: [
      { value: "independent", label: "Самостоятельно, с понятным планом", description: "Хочу опираться на рекомендации и отмечать свой прогресс." },
      { value: "expert", label: "Да, хочу сопровождение", description: "Хочу задавать вопросы и корректировать план вместе со специалистом." },
    ],
  },
];

const focusByGoal = {
  nutrition: { title: "Питание в вашем ритме", text: "В программе стоит начать с разбора привычного рациона и рекомендаций по составу приёмов пищи с учётом ваших предпочтений." },
  energy: { title: "Питание, отдых и нагрузка", text: "В программе стоит начать с дневника самочувствия и разбора привычек: когда вы едите, отдыхаете и испытываете нагрузку." },
  routine: { title: "Посильный режим дня", text: "В программе стоит начать с плана сна, регулярных приёмов пищи и восстановления, который можно встроить в ваше расписание." },
};

export function isValidAnswer(questionId, value) {
  return surveyQuestions.some((question) => question.id === questionId && question.options.some((option) => option.value === value));
}

export function getSurveyResult(answers) {
  if (!answers || !surveyQuestions.every((question) => isValidAnswer(question.id, answers[question.id]))) return null;
  const wantsSupport = answers.support === "expert";
  const wantsDeepAnalysis = answers.depth === "deep";
  const programId = wantsSupport || wantsDeepAnalysis ? "premium" : answers.depth === "extended" ? "standard" : "basic";
  const reason = wantsSupport && wantsDeepAnalysis
    ? "Вы выбрали глубокий разбор и сопровождение: этот формат включает расширенный план и возможность обсуждать его со специалистом."
    : wantsSupport
      ? "Вы хотите обсуждать прогресс и корректировать план со специалистом. Сопровождение входит в формат «Премиум»."
      : wantsDeepAnalysis
        ? "Вы выбрали глубокий разбор и расширенный план. Они входят в формат «Премиум» вместе с сопровождением; его необходимость можно обсудить отдельно."
        : answers.depth === "extended"
          ? "Вы выбрали расширенный анализ и персональный план питания без постоянного сопровождения. Это соответствует формату «Стандартный»."
          : "Вам нужен разбор основных показателей и рекомендации, которыми можно пользоваться самостоятельно. Это соответствует формату «Базовый».";
  return {
    program: { ...PROGRAM_FORMATS.find((program) => program.id === programId) },
    reason,
    focus: { ...focusByGoal[answers.goal] },
    answers: surveyQuestions.map((question) => ({
      question: question.title,
      label: question.options.find((option) => option.value === answers[question.id]).label,
    })),
  };
}
