"use client";
import { useQuiz } from "../quiz/QuizContext";
import { QUIZ, type StepKey } from "../quiz/schema";
import u from "./quiz-ui.module.css"; // общий набор (title/description и т.п.)
import s from "./StepInput.module.css"; // локальные стили для инпута

type Props = { stepKey: StepKey };

export default function StepInput({ stepKey }: Props) {
  const { answers, setAnswer } = useQuiz();
  const cfg = QUIZ[stepKey];

  // этот компонент рендерит ТОЛЬКО input-шаг
  if (cfg.kind !== "input") return null;

  const value = (answers[stepKey] ?? "") as string | number;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const onlyDigits = raw.replace(/[^\d]/g, "");
    setAnswer(stepKey, onlyDigits);
  }

  let bmi: number | null = null;
  let bmiText: string | null = null;

  if (stepKey === "stepWeight") {
    const weight = Number(value);
    const heightCm = Number(answers["stepHeight"]); // <- зависит от шага с ростом
    if (weight > 0 && heightCm > 0) {
      const heightM = heightCm / 100;
      bmi = +(weight / (heightM * heightM)).toFixed(2);

      if (bmi < 18.5) bmiText = `Your BMI is ${bmi}, which is considered underweight.`;
      else if (bmi < 25) bmiText = `Your BMI is ${bmi}, which is considered normal.`;
      else if (bmi < 30) bmiText = `Your BMI is ${bmi}, which is considered overweight.`;
      else bmiText = `Your BMI is ${bmi}, which is considered obese.`;
    }
  }

  const hasTooltip = !!cfg.tooltipTitle || !!cfg.tooltipText;

  return (
    <>
      <h1 className={u.title}>{cfg.title}</h1>

      <div className={s.field}>
        <label htmlFor={`${stepKey}-input`} className={s.label}>
          {cfg.description && cfg.description}
        </label>

        <div className={s.inputWrap}>
          <input
            id={`${stepKey}-input`}
            className={s.input}
            inputMode='numeric'
            pattern='\d*'
            placeholder={cfg.placeholder ?? (cfg.unit ? "0" : "")}
            value={String(value)}
            onChange={onChange}
          />
          {cfg.unit && <span className={s.suffix}>{cfg.unit}</span>}
        </div>
      </div>

      {hasTooltip && stepKey !== "stepWeight" && (
        <div className={s.tip} role='status'>
          {cfg.tooltipIcon && <span className={s.tipIcon}>{cfg.tooltipIcon}</span>}
          <div>
            {cfg.tooltipTitle && <div className={s.tipTitle}>{cfg.tooltipTitle}</div>}
            {cfg.tooltipText && <div className={s.tipText}>{cfg.tooltipText}</div>}
          </div>
        </div>
      )}

      {stepKey === "stepWeight" && bmi && (
        <div className={s.tip} role='status'>
          {cfg.tooltipIcon && <span className={s.tipIcon}>{cfg.tooltipIcon}</span>}
          <div>
            <div className={s.tipTitle}>{bmiText}</div>
            <div className={s.tipText}>We will use your BMI to personalize your program.</div>
          </div>
        </div>
      )}
    </>
  );
}
