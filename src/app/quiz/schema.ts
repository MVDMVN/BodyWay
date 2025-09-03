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
  | "stepPerfectWeight"
  | "stepWorkout"
  | "stepEnergyLevel"
  | "stepHeight"
  | "stepWeight"
  | "stepWeightGoal"
  | "stepAge"
  | "stepSecondPraise"
  | "stepTend"
  | "stepSleep"
  | "stepWater"
  | "stepGraphic"
  | "stepProgress"
  | "stepEmail"; // добавляйте сюда новые ключи

export type OptionDetail = {
  value: string;
  label: string;
  labelDesc?: string;
  image?: string;
  icon?: string;
  group?: string;
};

export type GenderOptions = {
  male: OptionDetail[];
  female: OptionDetail[];
};

export type TooltipBlock = {
  title: string;
  text?: string;
  note?: string;
  iconSrc?: string;
};

type XY = { top: number; left: number };

type StepUi = {
  hideHeader?: boolean; // прячет всю верхнюю шапку (стрелка, лого, счетчик)
  hideNextBtn?: boolean; // прячет кнопку Next внизу
  width?: string; // можно задать ширину и по условиню давать эту или оставлять исходную
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
      validate?: (value: string | undefined) => boolean;
      tooltipByGroup?: Record<string, TooltipBlock>;
      tooltipTitle?: string;
      tooltipText?: string;
      tooltipIcon?: string;
      ui?: StepUi;
    }
  | {
      kind: "multi";
      title: string;
      description?: string;
      options: GenderOptions;
      hasUltiButton: boolean;
      min?: number; // минимум выбранных ответов для прохода дальше
      ui?: StepUi;
    }
  | {
      kind: "praise";
      title: string;
      description?: string;
      imageMale: string;
      imageFemale: string;
      ui?: StepUi;
    }
  | {
      kind: "input";
      title: string;
      description?: string;
      placeholder?: string;
      validate?: (value: string | number | undefined) => boolean;
      pattern?: RegExp;
      unit?: string;
      tooltipTitle?: string;
      tooltipText?: string;
      tooltipIcon?: string;
      ui?: StepUi;
    }
  | {
      kind: "graphic";
      title: string;
      description?: string;
      note?: string;
      unit?: "kg" | "lb";
      currentKey: StepKey;
      targetKey: StepKey;
      imageLoss: string;
      imageGain: string;
      positions?: {
        loss?: { start: XY; end: XY };
        gain?: { start: XY; end: XY };
      };
      ui?: StepUi;
    }
  | {
      kind: "progress";
      title: string;
      subtitle?: string;
      durationMs?: number; // длительность анимации
      afterDelayMs?: number; // пауза после 100% до перехода
      stars?: number; // 0..5 для карточек
      socialProofTitle?: string;
      socialProofCaption?: string;
      legalNote?: string;
      reviews?: Array<{
        name: string;
        text: string;
        avatar?: string;
        badge?: string; // например “★★★★★” или “Verified”
      }>;
      ui?: StepUi;
    }
  | {
      kind: "email";
      title: string;
      label?: string;
      placeholder?: string;
      description?: string;
      descriptionIcon?: string;
      ui?: StepUi;
    };

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
    hasUltiButton: false,
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
    ui: { hideHeader: true },
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
    title: "Do you workout?",
    description: "Workouts boost your weight loss results. We can help you make it a daily habit.",
    options: {
      male: [
        { value: "No, i don't", label: "No, i don't", group: "g1", icon: "/images/step-do-you-workout/male/not.svg" },
        {
          value: "Only walks",
          label: "Obly walks",
          group: "g1",
          icon: "/images/step-do-you-workout/male/only-walk.svg",
        },
        {
          value: "1-2 times a week",
          label: "1-2 times a wekk",
          group: "g2",
          icon: "/images/step-do-you-workout/male/1-2-times.svg",
        },
        {
          value: "3-5 times a week",
          label: "3-5 times a wekk",
          group: "g2",
          icon: "/images/step-do-you-workout/male/3-5-times.svg",
        },
        {
          value: "More than 5 times a week",
          label: "More than 5 times a week",
          group: "g2",
          icon: "/images/step-do-you-workout/male/more-5.svg",
        },
      ],
      female: [
        { value: "No, i don't", label: "No, i don't", group: "g1", icon: "/images/step-do-you-workout/female/not.svg" },
        {
          value: "Only walks",
          label: "Obly walks",
          group: "g1",
          icon: "/images/step-do-you-workout/female/only-walk.svg",
        },
        {
          value: "1-2 times a week",
          label: "1-2 times a wekk",
          group: "g2",
          icon: "/images/step-do-you-workout/female/1-2-times.svg",
        },
        {
          value: "3-5 times a week",
          label: "3-5 times a wekk",
          group: "g2",
          icon: "/images/step-do-you-workout/female/3-5-times.svg",
        },
        {
          value: "More than 5 times a week",
          label: "More than 5 times a week",
          group: "g2",
          icon: "/images/step-do-you-workout/female/more-5.svg",
        },
      ],
    },
    tooltipByGroup: {
      g1: {
        title: "37% of users*",
        text: "responded in the same way. BodyWay will help you create a habit of working out",
        note: "*users of BodyWay who took the quiz",
        iconSrc: "💪",
      },
      g2: {
        title: "You’ve worked out more than 62% of users",
        text: "It will be easier for you to maintain a workout plan",
        iconSrc: "💪",
      },
    },
  },
  stepEnergyLevel: {
    kind: "single",
    title: "How tired do you typically feel during the day?",
    description: "Our weight loss programs help you keep your energy level steady throughout the day.",
    options: {
      male: [
        {
          value: "I feel tired all day long",
          label: "I feel tired all day long",
          icon: "/images/step-energy-level/male/tired.svg",
        },
        {
          value: "I feel tired before meals",
          label: "I feel tired before meals",
          icon: "/images/step-energy-level/male/meal.svg",
        },
        {
          value: "I have a couple of afternoon yawns",
          label: "I have a couple of afternoon yawns",
          icon: "/images/step-energy-level/male/yawns.svg",
        },
        {
          value: "I'm a ball of fire all day long",
          label: "I'm a ball of fire all day long",
          icon: "/images/step-energy-level/male/fire.svg",
        },
      ],
      female: [
        {
          value: "I feel tired all day long",
          label: "I feel tired all day long",
          icon: "/images/step-energy-level/female/tired.svg",
        },
        {
          value: "I feel tired before meals",
          label: "I feel tired before meals",
          icon: "/images/step-energy-level/female/meal.svg",
        },
        {
          value: "I have a couple of afternoon yawns",
          label: "I have a couple of afternoon yawns",
          icon: "/images/step-energy-level/female/yawns.svg",
        },
        {
          value: "I'm a ball of fire all day long",
          label: "I'm a ball of fire all day long",
          icon: "/images/step-energy-level/female/fire.svg",
        },
      ],
    },
  },
  stepHeight: {
    kind: "input",
    title: "What is your height?",
    description: "Height (cm)",
    placeholder: "__",
    unit: "cm",
    validate: (v) => {
      const n = typeof v === "number" ? v : Number(String(v).replace(/[^\d]/g, ""));
      return Number.isFinite(n) && n >= 120 && n <= 230;
    },
    tooltipTitle: "Calculating your body mass index",
    tooltipText: "BMI is widely used as a risk indicator for the development or prevalence of several health issues.",
    tooltipIcon: "☝️",
  },
  stepWeight: {
    kind: "input",
    title: "What is your current weight?",
    description: "Current weight (kg)",
    placeholder: "__",
    unit: "kg",
    validate: (v) => {
      const n = typeof v === "number" ? v : Number(String(v).replace(/[^\d]/g, ""));
      return Number.isFinite(n) && n >= 60 && n <= 200;
    },
    tooltipIcon: "☝️",
  },
  stepWeightGoal: {
    kind: "input",
    title: "What is your desired weight?",
    description: "Goal weight kg",
    placeholder: "__",
    unit: "kg",
    validate: (v) => {
      const n = typeof v === "number" ? v : Number(String(v).replace(/[^\d]/g, ""));
      return Number.isFinite(n) && n >= 60 && n <= 200;
    },
  },
  stepAge: {
    kind: "input",
    title: "What is your age?",
    description: "Age",
    placeholder: "0 y.o.",
    validate: (v) => {
      const n = typeof v === "number" ? v : Number(String(v).replace(/[^\d]/g, ""));
      return Number.isFinite(n) && n >= 18 && n <= 80;
    },
    tooltipTitle: "We ask your age to create your personal plan",
    tooltipText: "Older people tend to have more body fat than younger people with the same BMI.",
    tooltipIcon: "☝️",
  },
  stepSecondPraise: {
    kind: "praise",
    title: "Great job! 👏",
    description: "Most people quit halfway, but you’re still going strong.",
    imageMale: "/images/step-second-praise/male.webp",
    imageFemale: "/images/step-second-praise/female.webp",
    ui: { hideHeader: true },
  },
  stepTend: {
    kind: "multi",
    title: "Select all that you tend to do:",
    hasUltiButton: true,
    options: {
      male: [
        { value: "I eat late at night", label: "I eat late at night", icon: "/images/step-tend/male/eat-night.svg" },
        {
          value: "I can't give up eating sweets",
          label: "I can't give up eating sweets",
          icon: "/images/step-tend/male/sweets.svg",
        },
        {
          value: "I love soft drinks",
          label: "I love soft drinks",
          icon: "/images/step-tend/male/soft-drinks.svg",
        },
        {
          value: "I consume hard drinks from time to time",
          label: "I consume hard drinks from time to time",
          icon: "/images/step-tend/male/hard-drinks.svg",
        },
        {
          value: "I love fatty or salty foods",
          label: "I love fatty or salty foods",
          icon: "/images/step-tend/male/salty.svg",
        },
      ],
      female: [
        { value: "I eat late at night", label: "I eat late at night", icon: "/images/step-tend/female/eat-night.svg" },
        {
          value: "I can't give up eating sweets",
          label: "I can't give up eating sweets",
          icon: "/images/step-tend/female/sweets.svg",
        },
        {
          value: "I love soft drinks",
          label: "I love soft drinks",
          icon: "/images/step-tend/female/soft-drinks.svg",
        },
        {
          value: "I consume hard drinks from time to time",
          label: "I consume hard drinks from time to time",
          icon: "/images/step-tend/female/hard-drinks.svg",
        },
        {
          value: "I love fatty or salty foods",
          label: "I love fatty or salty foods",
          icon: "/images/step-tend/female/salty.svg",
        },
      ],
    },
  },
  stepSleep: {
    kind: "single",
    title: "How much do you usually sleep?",
    options: {
      male: [
        { value: "Less than 5 hours", label: "Less than 5 hours" },
        { value: "5-6 hours", label: "5-6 hours" },
        { value: "7-8 hours", label: "7-8 hours" },
        { value: "More than 8 hours", label: "More than 8 hours" },
      ],
      female: [
        { value: "Less than 5 hours", label: "Less than 5 hours" },
        { value: "5-6 hours", label: "5-6 hours" },
        { value: "7-8 hours", label: "7-8 hours" },
        { value: "More than 8 hours", label: "More than 8 hours" },
      ],
    },
  },
  stepWater: {
    kind: "single",
    title: "How much water do you drink daily?",
    description: "We mean clean water, excluding coffee, tea, and other drinks",
    options: {
      male: [
        {
          value: "Only coffee or tea",
          label: "Only coffee or tea",
          group: "g1",
          icon: "/images/step-water/coffee-tea.svg",
        },
        {
          value: "Less than 0.5 L",
          label: "Less than 0.5 L",
          labelDesc: "Fewer than 2 glasses",
          group: "g1",
          icon: "/images/step-water/2-glasses.svg",
        },
        {
          value: "0.5 - 1.5 L",
          label: "0.5 - 1.5 L",
          labelDesc: "2-6 glasses",
          group: "g2",
          icon: "/images/step-water/6-glasses.svg",
        },
        {
          value: "1.5 - 2.5 L",
          label: "1.5 - 2.5 L",
          labelDesc: "7-10 glasses",
          group: "g2",
          icon: "/images/step-water/10-glasses.svg",
        },
        {
          value: "I don't count, it depends",
          label: "I don't count, it depends",
          icon: "/images/step-water/depends.svg",
        },
      ],
      female: [
        {
          value: "Only coffee or tea",
          label: "Only coffee or tea",
          group: "g1",
          icon: "/images/step-water/coffee-tea.svg",
        },
        {
          value: "Less than 0.5 L",
          label: "Less than 0.5 L",
          labelDesc: "Fewer than 2 glasses",
          group: "g1",
          icon: "/images/step-water/2-glasses.svg",
        },
        {
          value: "0.5 - 1.5 L",
          label: "0.5 - 1.5 L",
          labelDesc: "2-6 glasses",
          group: "g2",
          icon: "/images/step-water/6-glasses.svg",
        },
        {
          value: "1.5 - 2.5 L",
          label: "1.5 - 2.5 L",
          labelDesc: "7-10 glasses",
          group: "g2",
          icon: "/images/step-water/10-glasses.svg",
        },
        {
          value: "I don't count, it depends",
          label: "I don't count, it depends",
          icon: "/images/step-water/depends.svg",
        },
      ],
    },
    tooltipByGroup: {
      g1: {
        title: "Drinking water is essential",
        text: "If you're not hydrated, your body can't perform at its highest level. BodyWay will remind you to drink enough water.",
        note: "*users of BodyWay who took the quiz",
        iconSrc: "💧",
      },
      g2: {
        title: "Wow! Impressive!",
        text: "You drink more water than 75% of users*. Keep it up!",
        note: "*users of BodyWay who took the quiz",
        iconSrc: "💧",
      },
    },
  },
  stepGraphic: {
    kind: "graphic",
    title: "The one and only plan you’ll ever need to get in shape",
    description: "According to the information you have provided us, you’ll achieve your goal weight of",
    note: "This is a tentative timeline based on your answers.",
    currentKey: "stepWeight", // ключ для вопроса с реальным весом
    targetKey: "stepWeightGoal", // ключ для вопроса с желаемым весом
    imageLoss: "/images/step-graphic/down.png",
    imageGain: "/images/step-graphic/up.png",
    positions: {
      loss: { start: { top: 13.5, left: 9.5 }, end: { top: 54.5, left: 86 } },
      gain: { start: { top: 53, left: 9 }, end: { top: 10, left: 84.5 } },
    },
  },
  stepProgress: {
    kind: "progress",
    title: "Analyzing your answers",
    subtitle: "Building your personal plan…",
    durationMs: 4000,
    socialProofTitle: "30 million users",
    reviews: [
      {
        name: "Katie Barr",
        text: "The meals are lovely and similar to what I normally buy, and the recipes are easy to follow. I've lost 6 kg in less than a week. I'll admit, I was skeptical at first, but this is by far the most effective and best-priced diet.",
        avatar: "/images/reviews/review-1.webp",
        badge: "★★★★★",
      },
      {
        name: "Marcus Hart",
        text: "Helping me with my day-to-day meal planning. It is user-friendly and easy to read. Nothing extra fancy and direct. The exercises are practical and you feel the results. I love it.",
        avatar: "/images/reviews/review-2.webp",
        badge: "★★★★★",
      },
      {
        name: "Prettypink Elois",
        text: "I love this App, it keeps me motivated, keeps me on track, this app makes me on top of my schedule. These exercises on this app are amazing 👏🙌😍 I also love the yummy meals plan 😊 #Loveit!!!",
        avatar: "/images/reviews/review-3.webp",
        badge: "★★★★★",
      },
    ],
    ui: { hideHeader: true, hideNextBtn: true, width: "1000px" },
  },
  stepEmail: {
    kind: "email",
    title: "Enter your email to get your personal Weight-Loss plan!",
    label: "Your email",
    placeholder: "your@email.com",
    description:
      "We respect your privacy and use your email only to send you the Unimeal program and other important emails. You won't receive spam.",
    descriptionIcon: "/images/email/email-desc-icon.svg",
    ui: { hideNextBtn: true, width: "720px" },
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
  "stepWorkout",
  "stepEnergyLevel",
  "stepHeight",
  "stepWeight",
  "stepWeightGoal",
  "stepAge",
  "stepSecondPraise",
  "stepTend",
  "stepSleep",
  "stepWater",
  "stepGraphic",
  "stepProgress",
  "stepEmail",
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
