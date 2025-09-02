export const ORDER = ["stepAgeRange", "stepGoal", "result"] as const;

export type StepKey = (typeof ORDER)[number];

export const SEGMENT_TO_KEY: Record<string, StepKey> = {
  "step-age-range": "stepAgeRange",
  "step-goal": "stepGoal",
  // добавляй остальные: "step-gender": "stepGender", ...
};

export const KEY_TO_SEGMENT: Record<StepKey, string> = {
  stepAgeRange: "step-age-range",
  stepGoal: "step-goal",
  // обратная мапа
  result: "result",
};

export const pathOf = (key: StepKey) => `/quiz/${KEY_TO_SEGMENT[key] ?? key}`;
export const nextKey = (key: StepKey) => {
  const i = ORDER.indexOf(key);
  return i >= 0 && i < ORDER.length - 1 ? ORDER[i + 1] : null;
};
export const prevKey = (key: StepKey) => {
  const i = ORDER.indexOf(key);
  return i > 0 ? ORDER[i - 1] : null;
};
