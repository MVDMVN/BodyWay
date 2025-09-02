import { camelToKebab } from "./_utils/case";

/** Ключи ответов (camelCase) */
export type StepKey =
  | "stepAgeRange"
  | "stepGoal"
  | "stepBodyType"
  | "stepBodyWant"
  | "stepTargetZones"
  | "stepPraise"
  | "stepDaytimeActivity"
  | "stepPerfectWeight"; // добавляйте сюда новые ключи

export type OptionDetail = {
  value: string;
  label: string;
  image?: string;
  icon?: string;
};

export type GenderOptions = {
  male: OptionDetail[];
  female: OptionDetail[];
};

/** Описание одного шага */
export type StepConfig =
  | {
      kind: "single";
      title: string;
      description?: string;
      sideImageMale?: string;
      sideImageFemale?: string;
      options: GenderOptions;
      tooltipTitle?: string;
      tooltipText?: string;
      tooltipIcon?: string;
      tooltipNote?: string;
      validate?: (value: string | undefined) => boolean;
    }
  | {
      kind: "multi";
      title: string;
      description?: string;
      options: GenderOptions;
      min?: number; // минимум выбранных ответов для прохода дальше
    }
  | {
      kind: "praise";
      title: string;
      description?: string;
      imageMale: string;
      imageFemale: string;
    };
// | {
//     kind: "input";
//     title: string;
//     description?: string;
//     placeholder?: string;
//     validate?: (value: string | number | undefined) => boolean;
//     pattern?: RegExp; // например, /^\d{2,3}$/
//   };

/** Единый источник информации для всего объекта */
export const QUIZ: Record<StepKey, StepConfig> = {
  stepAgeRange: {
    kind: "single",
    title: "Weight-loss plan according to your age",
    options: {
      male: [
        { value: "18-29", label: "18-29", image: "/images/step-age/male/18-25.png" },
        { value: "30-39", label: "30-39", image: "/images/step-age/male/26-35.png" },
        { value: "40-54", label: "40-54", image: "/images/step-age/male/36-45.png" },
        { value: "55+", label: "55+", image: "/images/step-age/male/46+.png" },
      ],
      female: [
        { value: "18-29", label: "18-29", image: "/images/step-age/female/18-29.webp" },
        { value: "30-39", label: "30-39", image: "/images/step-age/female/30-39.webp" },
        { value: "40-54", label: "40-54", image: "/images/step-age/female/40-54.webp" },
        { value: "55+", label: "55+", image: "/images/step-age/female/55+.webp" },
      ],
    },
  },
  stepGoal: {
    kind: "single",
    title: "Сhoose your goal",
    options: {
      male: [
        { value: "Muscle Gain", label: "Muscle Gain", image: "/images/step-goal/male/swole.webp" },
        { value: "Weight Loss", label: "Weight Loss", image: "/images/step-goal/male/heavier.webp" },
      ],
      female: [
        { value: "Weight Loss", label: "Weight Loss", image: "/images/step-goal/female/slim.webp" },
        { value: "Fit Body", label: "Fit Body", image: "/images/step-goal/female/fit.webp" },
        { value: "Tone Muscles", label: "Tone Muscles", image: "/images/step-goal/female/muscular.webp" },
      ],
    },
  },
  stepBodyType: {
    kind: "single",
    title: "Choose your body type",
    options: {
      male: [
        { value: "Muscle Gain", label: "Muscle Gain", image: "/images/step-goal/male/swole.webp" },
        { value: "Weight Loss", label: "Weight Loss", image: "/images/step-goal/male/heavier.webp" },
      ],
      female: [
        { value: "Regular", label: "Regular", image: "/images/step-bodytype/female/regular.webp" },
        { value: "Plump", label: "Plump", image: "/images/step-bodytype/female/plump.webp" },
        { value: "Extra Plump", label: "Extra Plump", image: "/images/step-bodytype/female/extra.webp" },
      ],
    },
  },
  stepBodyWant: {
    kind: "single",
    title: "Choose the body you want",
    options: {
      male: [
        { value: "Muscle Gain", label: "Muscle Gain", image: "/images/step-goal/male/swole.webp" },
        { value: "Weight Loss", label: "Weight Loss", image: "/images/step-goal/male/heavier.webp" },
      ],
      female: [
        { value: "Fit", label: "Fit", image: "/images/step-body-want/female/fit.webp" },
        { value: "Muscular", label: "Muscular", image: "/images/step-body-want/female/muscular.webp" },
        { value: "Shapely", label: "Shapely", image: "/images/step-body-want/female/shapely.webp" },
      ],
    },
  },
  stepTargetZones: {
    kind: "multi",
    title: "Choose your target zones",
    options: {
      male: [
        { value: "Muscle Gain", label: "Muscle Gain", image: "/images/step-goal/male/swole.webp" },
        { value: "Weight Loss", label: "Weight Loss", image: "/images/step-goal/male/heavier.webp" },
      ],
      female: [
        { value: "Slim Legs", label: "Slim Legs", image: "/images/step-target-zones/female/legs.webp" },
        { value: "Toned Butt", label: "Toned Butt", image: "/images/step-target-zones/female/butt.webp" },
        { value: "Perky Breasts", label: "Perky Breasts", image: "/images/step-target-zones/female/breasts.webp" },
        { value: "Flat Belly", label: "Flat Belly", image: "/images/step-target-zones/female/belly.webp" },
      ],
    },
  },
  stepPraise: {
    kind: "praise",
    title: "Great!",
    description: "You’ve already taken 5 steps toward your goal 💪",
    imageMale: "/images/gap/social_male.webp",
    imageFemale: "/images/gap/social_female.webp",
  },
  stepDaytimeActivity: {
    kind: "single",
    title: "How do you typically spend your day?",
    description: "Choose what takes up most of your time.",
    options: {
      male: [
        {
          value: "Sitting all day long at work",
          label: "Sitting all day long at work",
          icon: "/images/step-daytime-activity/male/sitting.svg",
        },
        {
          value: "I'm always on my feet",
          label: "I'm always on my feet",
          icon: "/images/step-daytime-activity/male/on-feet.svg",
        },
        {
          value: "Doing lots of physical activity",
          label: "Doing lots of physical activity",
          icon: "/images/step-daytime-activity/male/a-lot.svg",
        },
        {
          value: "Staying at home",
          label: "Staying at home",
          icon: "/images/step-daytime-activity/male/at-home.svg",
        },
      ],
      female: [
        {
          value: "Sitting all day long at work",
          label: "Sitting all day long at work",
          icon: "/images/step-daytime-activity/female/sitting.svg",
        },
        {
          value: "I'm always on my feet",
          label: "I'm always on my feet",
          icon: "/images/step-daytime-activity/female/on-feet.svg",
        },
        {
          value: "Doing lots of physical activity",
          label: "Doing lots of physical activity",
          icon: "/images/step-daytime-activity/female/a-lot.svg",
        },
        {
          value: "Staying at home",
          label: "Staying at home",
          icon: "/images/step-daytime-activity/female/at-home.svg",
        },
      ],
    },
  },
  stepPerfectWeight: {
    kind: "single",
    title: "When was the last time you were content with your body weight?",
    sideImageMale: "/images/step-perfect-weight/male/perfect-weight-male.webp",
    sideImageFemale: "/images/step-perfect-weight/female/perfect-weight-female.webp",
    options: {
      male: [
        { value: "Less than a year ago", label: "Less than a year ago" },
        { value: "1-3 years ago", label: "1-3 years ago" },
        { value: "More than 3 years ago", label: "1-3 years ago" },
        { value: "Never", label: "Never" },
      ],
      female: [
        { value: "Less than a year ago", label: "Less than a year ago" },
        { value: "1-3 years ago", label: "1-3 years ago" },
        { value: "More than 3 years ago", label: "1-3 years ago" },
        { value: "Never", label: "Never" },
      ],
    },
    tooltipTitle: "Thanks for sharing!",
    tooltipText:
      "We learned that a lot of people have faced the same as well. BodyWay has a clear weight loss plan that is easy to follow. Also, the program will help you with motivation during this journey.",
    tooltipIcon: "🙌",
  },
  stepWorkout: {
    kind: "single",
    title: "When was the last time you were content with your body weight?",
    sideImageMale: "/images/step-perfect-weight/male/perfect-weight-male.webp",
    sideImageFemale: "/images/step-perfect-weight/female/perfect-weight-female.webp",
    options: {
      male: [
        { value: "Less than a year ago", label: "Less than a year ago" },
        { value: "1-3 years ago", label: "1-3 years ago" },
        { value: "More than 3 years ago", label: "1-3 years ago" },
        { value: "Never", label: "Never" },
      ],
      female: [
        { value: "Less than a year ago", label: "Less than a year ago" },
        { value: "1-3 years ago", label: "1-3 years ago" },
        { value: "More than 3 years ago", label: "1-3 years ago" },
        { value: "Never", label: "Never" },
      ],
    },
    tooltipTitle: "Thanks for sharing!",
    tooltipText:
      "We learned that a lot of people have faced the same as well. BodyWay has a clear weight loss plan that is easy to follow. Also, the program will help you with motivation during this journey.",
    tooltipIcon: "💪",
    tooltipNote: "users of Unimeal who took the quiz",
  },
};

/** Порядок шагов: меняем ЗДЕСЬ — меняется везде */
export const ORDER: StepKey[] = [
  "stepAgeRange",
  "stepGoal",
  "stepBodyType",
  "stepBodyWant",
  "stepTargetZones",
  "stepPraise",
  "stepDaytimeActivity",
  "stepPerfectWeight",
];

export const pathOf = (key: StepKey) => `/quiz/${camelToKebab(key)}`;

export const nextKey = (key: StepKey) => {
  const i = ORDER.indexOf(key);
  return i >= 0 && i < ORDER.length - 1 ? ORDER[i + 1] : null;
};
export const prevKey = (key: StepKey) => {
  const i = ORDER.indexOf(key);
  return i > 0 ? ORDER[i - 1] : null;
};
