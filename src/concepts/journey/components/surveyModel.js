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
    id: "obstacle",
    title: "Что чаще мешает двигаться к цели?",
    hint: "Это поможет выбрать удобный инструмент для старта.",
    options: [
      { value: "time", label: "Мало времени", description: "Нужны простые решения без долгой подготовки." },
      { value: "choice", label: "Неясно, что выбрать", description: "Советов много — хочется понять, что подходит мне." },
      { value: "consistency", label: "Сложно сохранять привычку", description: "Начинаю, но не всегда получается продолжать." },
    ],
  },
  {
    id: "support",
    title: "Как вам удобнее двигаться дальше?",
    hint: "Вы выбираете формат поддержки. Его можно обсудить и изменить.",
    options: [
      { value: "independent", label: "Самостоятельно, с понятным планом", description: "Хочу опираться на рекомендации и отмечать свой прогресс." },
      { value: "expert", label: "Вместе со специалистом", description: "Хочу задавать вопросы и обсуждать изменения по ходу программы." },
    ],
  },
];

const focusByGoal = {
  nutrition: { title: "Питание в вашем ритме", text: "В программе стоит начать с разбора привычного рациона и рекомендаций по составу приёмов пищи с учётом ваших предпочтений." },
  energy: { title: "Питание, отдых и нагрузка", text: "В программе стоит начать с дневника самочувствия и разбора привычек: когда вы едите, отдыхаете и испытываете нагрузку." },
  routine: { title: "Посильный режим дня", text: "В программе стоит начать с плана сна, регулярных приёмов пищи и восстановления, который можно встроить в ваше расписание." },
};

const toolByObstacle = {
  time: { title: "Короткий план на неделю", text: "Небольшой список приоритетных действий и заготовок, чтобы тратить меньше времени на ежедневный выбор." },
  choice: { title: "Личный список ориентиров", text: "Конкретные примеры и варианты замены, чтобы понимать, что выбрать и как применить рекомендацию в обычный день." },
  consistency: { title: "Трекер одной привычки", text: "Небольшие шаги и отметки выполнения, чтобы видеть, что получается, и вовремя упрощать слишком сложные задачи." },
};

const supportByChoice = {
  independent: { title: "Самостоятельный старт", text: "Ищите формат с письменными рекомендациями и инструментами самопроверки. Вы сможете возвращаться к плану в удобное время." },
  expert: { title: "Сопровождение специалиста", text: "Ищите формат с обратной связью: вопросы по рекомендациям, обсуждение трудностей и корректировка плана по ходу программы." },
};

export function isValidAnswer(questionId, value) {
  return surveyQuestions.some((question) => question.id === questionId && question.options.some((option) => option.value === value));
}

export function getSurveyResult(answers) {
  if (!answers || !surveyQuestions.every((question) => isValidAnswer(question.id, answers[question.id]))) return null;
  return {
    focus: focusByGoal[answers.goal],
    tool: toolByObstacle[answers.obstacle],
    support: supportByChoice[answers.support],
    answers: surveyQuestions.map((question) => ({
      question: question.title,
      label: question.options.find((option) => option.value === answers[question.id]).label,
    })),
  };
}
