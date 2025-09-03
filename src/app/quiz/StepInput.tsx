"use client";
import { useMemo, useState } from "react";
import { useQuiz } from "../quiz/QuizContext";
import { QUIZ, type StepKey } from "../quiz/schema";
import u from "./quiz-ui.module.css";
import s from "./StepInput.module.css";

type Props = { stepKey: StepKey };

export default function StepInput({ stepKey }: Props) {
  const { answers, setAnswer } = useQuiz();
  const cfg = QUIZ[stepKey];
  if (cfg.kind !== "input") return null;

  const value = (answers[stepKey] ?? "") as string | number;

  // новый флаг: поле уже трогали
  const [touched, setTouched] = useState(false);

  const isNumber = (cfg as any).inputType === "number" || (!!cfg.unit && (cfg as any).inputType !== "text");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!touched) setTouched(true);
    const raw = e.target.value;
    const next = isNumber ? raw.replace(/[^\d]/g, "") : raw;
    setAnswer(stepKey, next);
  }

  // ошибка через schema.validate
  const error: string | null = useMemo(() => {
    if (!touched) return null; // ⬅️ не показываем, пока поле не трогали
    if (typeof cfg.validate !== "function") return null;

    const res = cfg.validate(value as any);
    if (res === true || res === undefined) return null;
    if (res === false) return "Invalid value";
    return res;
  }, [cfg, value, touched]);

  // BMI для веса
  const bmiInfo = useMemo(() => {
    if (stepKey !== "stepWeight") return null;
    const weight = Number(value);
    const heightCm = Number(answers["stepHeight"]);
    if (!(weight > 0 && heightCm > 0)) return null;

    const h = heightCm / 100;
    const bmi = +(weight / (h * h)).toFixed(2);

    let text: string;
    if (bmi < 18.5) text = `Your BMI is ${bmi}, which is considered underweight.`;
    else if (bmi < 25) text = `Your BMI is ${bmi}, which is considered normal.`;
    else if (bmi < 30) text = `Your BMI is ${bmi}, which is considered overweight.`;
    else text = `Your BMI is ${bmi}, which is considered obese.`;

    return { bmi, text };
  }, [stepKey, value, answers]);

  const hasTooltip = !!cfg.tooltipTitle || !!cfg.tooltipText;

  return (
    <>
      <h1 className={u.title}>{cfg.title}</h1>

      <div className={s.field}>
        {cfg.description && (
          <label htmlFor={`${stepKey}-input`} className={s.label}>
            {cfg.description}
          </label>
        )}

        <div className={s.inputWrap}>
          <input
            id={`${stepKey}-input`}
            className={`${s.input} ${error ? s.inputInvalid : ""}`}
            inputMode={isNumber ? "numeric" : "text"}
            pattern={isNumber ? "\\d*" : undefined}
            placeholder={cfg.placeholder ?? (cfg.unit ? "0" : "")}
            value={String(value)}
            onChange={onChange}
            aria-invalid={error ? "true" : "false"}
          />
          {cfg.unit && <span className={s.suffix}>{cfg.unit}</span>}
        </div>

        {error && <p className={s.err}>{error}</p>}
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

      {stepKey === "stepWeight" && bmiInfo && (
        <div className={s.tip} role='status'>
          {cfg.tooltipIcon && <span className={s.tipIcon}>{cfg.tooltipIcon}</span>}
          <div>
            <div className={s.tipTitle}>{bmiInfo.text}</div>
            <div className={s.tipText}>We will use your BMI to personalize your program.</div>
          </div>
        </div>
      )}
    </>
  );
}
